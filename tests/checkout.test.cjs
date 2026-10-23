/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHmac } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Run the real route handlers without a Next server or payment credentials.
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...rest) {
  return resolve.call(this, name.startsWith('@/') ? path.resolve(__dirname, '../src', name.slice(2)) : name, ...rest);
};
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { NextRequest } = require('next/server');
const { paireCheckout, PAIRE_PLANS } = require('../src/lib/paire.ts');
const entry = require('../src/app/pay/start/route.ts');
const legacyEntry = require('../src/app/pay/paire/route.ts');
const callback = require('../src/app/pay/checkout/callback/route.ts');
const legacyCallback = require('../src/app/pay/paire/callback/route.ts');
const { middleware } = require('../src/middleware.ts');
const retiredPage = require('../src/app/paire/route.ts');

test('new and historical product IDs retain strict price and order validation', () => {
  const lifetime = PAIRE_PLANS.find(plan => plan.id === 'lifetime');
  assert.equal(lifetime.amountPaise, 149900);
  assert.equal(lifetime.days, null);
  for (const plan of PAIRE_PLANS) {
    for (const prefix of ['kraftai', 'paire']) {
      const order = { id: 'order_CHECKOUT001', amount: plan.amountPaise, currency: 'INR', status: 'created', notes: { product: plan.kind === 'chat' ? `${prefix}_unlimited_chat` : `${prefix}_plus`, plan: plan.id } };
      assert.deepEqual(paireCheckout(order), { ok: true, plan });
      assert.deepEqual(paireCheckout({ ...order, amount: plan.amountPaise + 1 }), { ok: false, reason: 'price-mismatch' });
      assert.deepEqual(paireCheckout({ ...order, status: 'paid' }), { ok: false, reason: 'already-paid' });
      for (const product of ['other_product', '__proto__', 'constructor']) {
        assert.deepEqual(paireCheckout({ ...order, notes: { product, plan: plan.id } }), { ok: false, reason: 'not-paire' });
      }
    }
  }
});

test('entry and legacy links redirect to the neutral page with no-referrer', () => {
  for (const route of [entry, legacyEntry]) {
    const response = route.GET(new NextRequest('https://kraftai.in/pay/start?order=order_CHECKOUT001&source=paire'));
    assert.equal(response.headers.get('location'), 'https://kraftai.in/?order=order_CHECKOUT001');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    assert.equal(response.headers.get('cache-control'), 'no-store');
  }
});

test('new prices and exact historical day/month quotes stay valid without accepting arbitrary amounts', () => {
  assert.equal(PAIRE_PLANS.find(plan => plan.id === 'day').amountPaise, 2000);
  assert.equal(PAIRE_PLANS.find(plan => plan.id === 'month').amountPaise, 39900);
  assert.equal(PAIRE_PLANS.find(plan => plan.id === 'halfyear').amountPaise, 79900);
  for (const [id, historicalAmount] of [['day', 2900], ['month', 29900]]) {
    for (const product of ['kraftai_plus', 'paire_plus']) {
      const order = { id: 'order_CHECKOUT001', amount: historicalAmount, currency: 'INR', status: 'attempted', notes: { product, plan: id } };
      const result = paireCheckout(order);
      assert.equal(result.ok, true);
      assert.equal(result.plan.amountPaise, historicalAmount);
      assert.equal(result.plan.priceInr, historicalAmount / 100);
      assert.equal(result.plan.days, id === 'month' ? 60 : 1);
      for (const amount of [1, historicalAmount - 1, historicalAmount + 1]) assert.deepEqual(paireCheckout({ ...order, amount }), { ok: false, reason: 'price-mismatch' });
      assert.deepEqual(paireCheckout({ ...order, currency: 'USD' }), { ok: false, reason: 'price-mismatch' });
      assert.deepEqual(paireCheckout({ ...order, notes: { product, plan: 'week' } }), { ok: false, reason: 'price-mismatch' });
      assert.deepEqual(paireCheckout({ ...order, status: 'paid' }), { ok: false, reason: 'already-paid' });
    }
  }
});

test('root payment links rewrite to validated checkout without changing the normal homepage', async () => {
  const response = await middleware(new NextRequest('https://kraftai.in/?order=order_CHECKOUT001&source=paire'));
  assert.equal(response.headers.get('x-middleware-rewrite'), 'https://kraftai.in/pay/checkout?order=order_CHECKOUT001');
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  const referred = await middleware(new NextRequest('https://kraftai.in/?order=order_CHECKOUT001&source=paire', { headers: { referer: 'https://www.paire.in/app/' } }));
  assert.equal(referred.status, 303);
  assert.equal(referred.headers.get('location'), 'https://kraftai.in/?order=order_CHECKOUT001');
  assert.equal(referred.headers.get('referrer-policy'), 'no-referrer');
  assert.equal((await middleware(new NextRequest('https://kraftai.in/'))).headers.get('x-middleware-rewrite'), null);
  const retired = retiredPage.GET(new NextRequest('https://kraftai.in/paire'));
  assert.equal(retired.status, 308);
  assert.equal(retired.headers.get('location'), 'https://kraftai.in/');
});

test('current and legacy callbacks still verify signatures and exact order IDs', async () => {
  process.env.RAZORPAY_KEY_SECRET = 'local-checkout-test-secret';
  const order = 'order_CHECKOUT001', payment = 'pay_CHECKOUT001';
  const signature = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${order}|${payment}`).digest('hex');
  for (const route of [callback, legacyCallback]) {
    for (const [submittedOrder, expected] of [[order, 'paid'], ['order_DIFFERENT01', 'failed']]) {
      const response = await route.POST(new NextRequest(`https://kraftai.in/pay/checkout/callback?kind=plus&order=${order}`, {
        method: 'POST', body: new URLSearchParams({ razorpay_order_id: submittedOrder, razorpay_payment_id: payment, razorpay_signature: signature }),
      }));
      assert.equal(new URL(response.headers.get('location')).searchParams.get('kraftai'), expected);
      assert.equal(response.status, 303);
      assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    }
  }
});

test('the server fetch forwards no user cookie or referrer', async () => {
  const old = global.fetch;
  try {
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://api.razorpay.com/v1/orders/order_CHECKOUT001');
      assert.equal(options.credentials, 'omit');
      assert.equal(options.referrerPolicy, 'no-referrer');
      assert.deepEqual(Object.keys(options.headers), ['authorization', 'user-agent', 'accept']);
      assert.equal(options.headers['user-agent'], 'KraftAI/1.0');
      return new Response(JSON.stringify({ id: 'order_CHECKOUT001' }));
    };
    const { fetchCheckoutOrder } = require('../src/lib/checkout-server.ts');
    assert.deepEqual(await fetchCheckoutOrder('order_CHECKOUT001'), { id: 'order_CHECKOUT001' });
  } finally { global.fetch = old; }
});

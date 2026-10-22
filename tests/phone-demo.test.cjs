/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
const { INITIAL_STATE, transition, parseSavedState } = require('../src/app/phone/demo-model.ts');
const time = '2026-10-22T12:00:00.000Z';
const change = (state, action) => transition(state, { ...action, at: time });

test('a quote must be approved before a repair starts, and a part is used exactly once', () => {
  let state = structuredClone(INITIAL_STATE);
  const original = structuredClone(state);
  assert.equal(change(state, { type: 'advance', id: 'DP-1042', target: 'In repair' }).ok, false);
  state = change(state, { type: 'advance', id: 'DP-1042', target: 'Approved' }).state;
  assert.equal(state.parts[0].stock.Bromsgrove, 2);
  const started = change(state, { type: 'advance', id: 'DP-1042', target: 'In repair' });
  assert.equal(started.ok, true);
  state = started.state;
  assert.equal(state.parts[0].stock.Bromsgrove, 1);
  assert.equal(change(state, { type: 'advance', id: 'DP-1042', target: 'In repair' }).ok, false);
  state = change(state, { type: 'advance', id: 'DP-1042', target: 'Ready to collect' }).state;
  assert.equal(state.repairs[0].stage, 'Ready to collect');
  state = change(state, { type: 'advance', id: 'DP-1042', target: 'Collected' }).state;
  assert.equal(state.repairs[0].stage, 'Collected');
  assert.equal(state.parts[0].stock.Bromsgrove, 1);
  assert.deepEqual(INITIAL_STATE, original, 'seed records remain unchanged');
});

test('a repair cannot start without a part at its own branch', () => {
  const state = structuredClone(INITIAL_STATE);
  state.repairs[0].stage = 'Approved';
  state.parts[0].stock.Bromsgrove = 0;
  const blocked = change(state, { type: 'advance', id: 'DP-1042', target: 'In repair' });
  assert.equal(blocked.ok, false);
  assert.equal(blocked.state, state);
  const replenished = change(state, { type: 'transfer', partId: 'iphone-14-screen', from: 'Evesham', to: 'Bromsgrove', quantity: 1 });
  const started = change(replenished.state, { type: 'advance', id: 'DP-1042', target: 'In repair' });
  assert.equal(started.ok, true);
  assert.equal(started.state.parts[0].stock.Bromsgrove, 0);
});

test('transfers preserve inventory totals and reject overdrawn, fractional or same-store moves', () => {
  const state = structuredClone(INITIAL_STATE);
  const move = { type: 'transfer', partId: 'iphone-14-screen', from: 'Evesham', to: 'Newark', quantity: 2 };
  const valid = change(state, move);
  assert.equal(valid.ok, true);
  assert.equal(valid.state.parts[0].stock.Evesham, 3);
  assert.equal(valid.state.parts[0].stock.Newark, 2);
  assert.equal(Object.values(valid.state.parts[0].stock).reduce((a, b) => a + b), Object.values(state.parts[0].stock).reduce((a, b) => a + b));
  assert.equal(valid.state.transfers.length, 1);
  for (const quantity of [0, -1, 0.5, 6, NaN, Infinity]) assert.equal(change(state, { ...move, quantity }).ok, false);
  assert.equal(change(state, { ...move, to: 'Evesham' }).ok, false);
});

test('diagnosis can prepare a quote once; prices must be finite and non-negative', () => {
  const state = structuredClone(INITIAL_STATE);
  for (const labour of [-1, NaN, Infinity, 1001]) assert.equal(change(state, { type: 'quote', id: 'DP-1040', labour }).ok, false);
  const result = change(state, { type: 'quote', id: 'DP-1040', labour: 35.555 });
  assert.equal(result.ok, true);
  assert.equal(result.state.repairs.find(r => r.id === 'DP-1040').labour, 35.56);
  assert.equal(result.state.repairs.find(r => r.id === 'DP-1040').stage, 'Awaiting approval');
  assert.equal(change(result.state, { type: 'quote', id: 'DP-1040', labour: 25 }).ok, false);
});

test('corrupt browser data is ignored and a reset restores the sample workspace', () => {
  assert.deepEqual(parseSavedState(JSON.stringify(INITIAL_STATE)), INITIAL_STATE);
  for (const value of [null, 'oops', '{}', '{"version":2}', JSON.stringify({ ...INITIAL_STATE, repairs: [{}] }), JSON.stringify({ ...INITIAL_STATE, parts: [] }), JSON.stringify({ ...INITIAL_STATE, activity: [{ label: 'invalid' }] })]) assert.equal(parseSavedState(value), null);
  const changed = change(INITIAL_STATE, { type: 'advance', id: 'DP-1042', target: 'Approved' });
  const reset = transition(changed.state, { type: 'reset' });
  assert.deepEqual(reset.state, INITIAL_STATE);
  assert.notEqual(reset.state, INITIAL_STATE);
});

import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { fetchCheckoutOrder } from "@/lib/checkout-server";
import { CheckoutRefusal, isRazorpayId, paireCheckout } from "@/lib/paire";
import { Checkout } from "./Checkout";
import { PAYMENT_NAMES } from "@/lib/payment-names";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Secure checkout",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

const REFUSALS: Record<CheckoutRefusal | "unavailable", { title: string; body: string }> = {
  "already-paid": { title: "This order is already paid", body: "Nothing more to pay. Return to your app: your purchase is on your account." },
  "price-mismatch": { title: "We couldn't open this checkout", body: "This order doesn't match our published prices, so we won't charge it. Start again from your app for a fresh order." },
  "not-paire": { title: "We couldn't find this order", body: "Start again from your app for a fresh checkout link." },
  invalid: { title: "We couldn't find this order", body: "Start again from your app for a fresh checkout link." },
  unavailable: { title: "Checkout is busy right now", body: "We couldn't reach the payment service. You haven't been charged. Please try again in a moment." },
};

async function origin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "kraftai.in";
  const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
  return local ? `http://${host}` : "https://kraftai.in";
}

export default async function SecureCheckoutPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams;

  let verdict: ReturnType<typeof paireCheckout> | { ok: false; reason: "unavailable" };
  if (!isRazorpayId(orderId, "order")) {
    verdict = { ok: false, reason: "invalid" };
  } else {
    try {
      // The order itself is the hand-off: only a holder of our key can have created it.
      verdict = paireCheckout(await fetchCheckoutOrder(orderId));
    } catch (error) {
      const status = (error as { statusCode?: number }).statusCode;
      const missing = status === 400 || status === 404;
      if (!missing) console.error("Secure checkout: order fetch failed", { status });
      verdict = { ok: false, reason: missing ? "invalid" : "unavailable" };
    }
  }

  // Resolve the app destination only on the server after leaving this page.
  const back = new URLSearchParams();
  if (verdict.ok) back.set("kind", verdict.plan.kind);
  if (isRazorpayId(orderId, "order")) back.set("order", orderId);
  const backUrl = `/pay/checkout/callback?${back}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-lg px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <img src="/icon.svg" alt="" width={24} height={24} />
            KraftAI
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            Secure checkout
          </span>
        </div>
      </header>

      <div className="flex-1 mx-auto w-full max-w-lg px-4 py-8 sm:py-12">
        {verdict.ok ? (
          <Checkout
            keyId={process.env.RAZORPAY_KEY_ID ?? ""}
            orderId={orderId!}
            plan={{ description: verdict.plan.razorpayDescription, amountPaise: verdict.plan.amountPaise, priceInr: verdict.plan.priceInr, detail: verdict.plan.detail }}
            merchantName={PAYMENT_NAMES.hostedMerchant}
            callbackUrl={`${await origin()}/pay/checkout/callback?order=${orderId}&kind=${verdict.plan.kind}`}
            backUrl={backUrl}
          />
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-lg font-semibold">{REFUSALS[verdict.reason].title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">{REFUSALS[verdict.reason].body}</p>
            <a href={backUrl} className="mt-5 inline-flex h-11 items-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800">
              Return to app
            </a>
          </section>
        )}

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Payments are processed by KraftAI through Razorpay. This is a one-time digital membership purchase for your app.
        </p>
      </div>
    </main>
  );
}

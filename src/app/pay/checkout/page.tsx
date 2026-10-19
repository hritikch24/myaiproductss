import type { Metadata } from "next";
import { headers } from "next/headers";
import { fetchCheckoutOrder } from "@/lib/checkout-server";
import { CheckoutRefusal, isRazorpayId, paireCheckout } from "@/lib/paire";
import { Checkout } from "./Checkout";
import { PAYMENT_NAMES } from "@/lib/payment-names";
import { PAYMENT_ICON, PaymentIcon } from "./PaymentIcon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Secure payment" },
  icons: { icon: PAYMENT_ICON, shortcut: PAYMENT_ICON, apple: PAYMENT_ICON },
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
    <main className="min-h-dvh bg-white text-slate-900 grid place-items-center p-6">
      {verdict.ok ? (
        <Checkout
          keyId={process.env.RAZORPAY_KEY_ID ?? ""}
          orderId={orderId!}
          plan={{ description: verdict.plan.razorpayDescription, amountPaise: verdict.plan.amountPaise }}
          merchantName={PAYMENT_NAMES.hostedMerchant}
          callbackUrl={`${await origin()}/pay/checkout/callback?order=${orderId}&kind=${verdict.plan.kind}`}
          backUrl={backUrl}
        />
      ) : (
        <>
          <p id="checkout-refusal" role="alert" className="sr-only">{REFUSALS[verdict.reason].title}. {REFUSALS[verdict.reason].body}</p>
          <a href={backUrl} aria-label="Return to app" aria-describedby="checkout-refusal" className="rounded-3xl outline-offset-8 focus-visible:outline-2 focus-visible:outline-slate-900">
            <PaymentIcon />
          </a>
        </>
      )}
    </main>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { razorpay } from "@/lib/razorpay";
import { CheckoutRefusal, isRazorpayId, PAIRE_SITE, paireCheckout, paireReturnUrl } from "@/lib/paire";
import { PaireCheckout } from "./PaireCheckout";
import { PAYMENT_NAMES } from "@/lib/payment-names";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Secure checkout",
  robots: { index: false, follow: false },
};

const REFUSALS: Record<CheckoutRefusal | "unavailable", { title: string; body: string }> = {
  "already-paid": { title: "This order is already paid", body: "Nothing more to pay. Head back to Paire: your purchase is on your account." },
  "price-mismatch": { title: "We couldn't open this checkout", body: "This order doesn't match our published prices, so we won't charge it. Start again from Paire and you'll get a fresh order." },
  "not-paire": { title: "We couldn't find this order", body: "Start again from Paire and you'll get a fresh checkout link." },
  invalid: { title: "We couldn't find this order", body: "Start again from Paire and you'll get a fresh checkout link." },
  unavailable: { title: "Checkout is busy right now", body: "We couldn't reach the payment service. You haven't been charged. Please try again in a moment." },
};

async function origin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "kraftai.in";
  const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
  return `${local ? "http" : "https"}://${host}`;
}

export default async function PaireCheckoutPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderId } = await searchParams;

  let verdict: ReturnType<typeof paireCheckout> | { ok: false; reason: "unavailable" };
  if (!isRazorpayId(orderId, "order")) {
    verdict = { ok: false, reason: "invalid" };
  } else {
    try {
      // The order itself is the hand-off: only a holder of our key can have created it.
      verdict = paireCheckout(await razorpay.orders.fetch(orderId));
    } catch (error) {
      const status = (error as { statusCode?: number }).statusCode;
      const missing = status === 400 || status === 404;
      if (!missing) console.error("Paire checkout: order fetch failed", { status });
      verdict = { ok: false, reason: missing ? "invalid" : "unavailable" };
    }
  }

  const backToPaire = paireReturnUrl({
    status: "cancelled",
    kind: verdict.ok ? verdict.plan.kind : null,
    orderId: isRazorpayId(orderId, "order") ? orderId : null,
  });

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
          <PaireCheckout
            keyId={process.env.RAZORPAY_KEY_ID ?? ""}
            orderId={orderId!}
            plan={verdict.plan}
            merchantName={PAYMENT_NAMES.hostedMerchant}
            callbackUrl={`${await origin()}/pay/paire/callback?order=${orderId}&kind=${verdict.plan.kind}`}
            backUrl={backToPaire}
          />
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-lg font-semibold">{REFUSALS[verdict.reason].title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">{REFUSALS[verdict.reason].body}</p>
            <a href={backToPaire} className="mt-5 inline-flex h-11 items-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800">
              Back to Paire
            </a>
          </section>
        )}

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Paire is a KraftAI product. Payments are processed by KraftAI through Razorpay, so your bank statement shows KraftAI.
          <br />
          <Link href="/paire" className="underline underline-offset-2 hover:text-slate-700">Paire pricing</Link>
          {" · "}
          <a href={`${PAIRE_SITE}/refunds/`} className="underline underline-offset-2 hover:text-slate-700">Refunds</a>
          {" · "}
          <a href={`${PAIRE_SITE}/terms/`} className="underline underline-offset-2 hover:text-slate-700">Terms</a>
        </p>
      </div>
    </main>
  );
}

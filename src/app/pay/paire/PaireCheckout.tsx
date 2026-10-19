"use client";

import { useCallback, useEffect, useState } from "react";
import type { PairePlan } from "@/lib/paire";

type RazorpayCtor = new (options: Record<string, unknown>) => { open: () => void };

const SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpay(): Promise<RazorpayCtor> {
  const existing = (window as unknown as { Razorpay?: RazorpayCtor }).Razorpay;
  if (existing) return Promise.resolve(existing);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.onload = () => {
      const loaded = (window as unknown as { Razorpay?: RazorpayCtor }).Razorpay;
      if (loaded) resolve(loaded);
      else reject(new Error("load"));
    };
    script.onerror = () => reject(new Error("load"));
    document.body.appendChild(script);
  });
}

type Phase = "loading" | "open" | "closed" | "error";

export function PaireCheckout({ keyId, orderId, plan, callbackUrl, backUrl }: {
  keyId: string;
  orderId: string;
  plan: PairePlan;
  callbackUrl: string;
  backUrl: string;
}) {
  const [phase, setPhase] = useState<Phase>("loading");

  // Opens Checkout; callers set the "loading" phase first (it starts there).
  const open = useCallback(async () => {
    try {
      const Razorpay = await loadRazorpay();
      new Razorpay({
        key: keyId,
        order_id: orderId,
        amount: plan.amountPaise,
        currency: "INR",
        name: "KraftAI",
        description: plan.label,
        image: `${window.location.origin}/icon.svg`,
        // Redirect mode: Razorpay POSTs the result to our callback, which survives
        // UPI app switches on phones better than an in-page handler.
        callback_url: callbackUrl,
        redirect: true,
        theme: { color: "#0f172a" },
        modal: { ondismiss: () => setPhase("closed") },
      }).open();
      setPhase("open");
    } catch {
      setPhase("error");
    }
  }, [keyId, orderId, plan, callbackUrl]);

  // Open Checkout as soon as the page is up (cancelled and re-run cleanly under Strict Mode).
  useEffect(() => {
    const timer = setTimeout(() => void open(), 0);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">You&apos;re paying for</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold leading-snug">{plan.label}</h1>
            <p className="mt-1 text-sm text-slate-600">{plan.detail}</p>
          </div>
          <p className="text-2xl font-semibold tabular-nums">₹{plan.priceInr}</p>
        </div>
        <ul className="mt-5 space-y-1.5 text-sm text-slate-600">
          <li>One-time payment. Nothing auto-renews.</li>
          <li>UPI, cards, netbanking and wallets via Razorpay.</li>
          <li>You&apos;ll go straight back to Paire after paying.</li>
        </ul>
      </div>
      <div className="border-t border-slate-100 p-6">
        {phase === "error" ? (
          <p role="alert" className="mb-4 text-sm text-red-700">The payment window didn&apos;t load. Check your connection and try again. You haven&apos;t been charged.</p>
        ) : null}
        {phase === "closed" ? (
          <p className="mb-4 text-sm text-slate-600">Payment window closed. If you completed a UPI payment, it will still reach your Paire account within a few minutes.</p>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setPhase("loading");
            void open();
          }}
          disabled={phase === "loading"}
          className="h-12 w-full rounded-xl bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {phase === "loading" ? "Opening secure payment…" : `Pay ₹${plan.priceInr}`}
        </button>
        <a href={backUrl} className="mt-3 flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
          Cancel and go back to Paire
        </a>
      </div>
    </section>
  );
}

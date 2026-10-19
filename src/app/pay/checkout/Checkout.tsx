"use client";

import { useCallback, useEffect, useState } from "react";
import type { CheckoutPlan } from "@/lib/checkout";

type RazorpayCtor = new (options: Record<string, unknown>) => { open: () => void };

const SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
let scriptLoad: Promise<RazorpayCtor> | undefined;

function loadRazorpay(): Promise<RazorpayCtor> {
  const existing = (window as unknown as { Razorpay?: RazorpayCtor }).Razorpay;
  if (existing) return Promise.resolve(existing);
  if (scriptLoad) return scriptLoad;
  scriptLoad = new Promise<RazorpayCtor>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.referrerPolicy = "no-referrer";
    script.onload = () => {
      const loaded = (window as unknown as { Razorpay?: RazorpayCtor }).Razorpay;
      if (loaded) resolve(loaded);
      else reject(new Error("load"));
    };
    script.onerror = () => reject(new Error("load"));
    document.body.appendChild(script);
  }).catch((error) => {
    scriptLoad = undefined;
    throw error;
  });
  return scriptLoad;
}

type Phase = "loading" | "open" | "closed" | "error";

export function Checkout({ keyId, orderId, plan, merchantName, callbackUrl, backUrl }: {
  keyId: string;
  orderId: string;
  plan: CheckoutPlan;
  merchantName: string;
  callbackUrl: string;
  backUrl: string;
}) {
  const [phase, setPhase] = useState<Phase>("loading");

  // Opens Checkout; callers set the "loading" phase first (it starts there).
  const open = useCallback(async (stillActive: () => boolean = () => true) => {
    try {
      const Razorpay = await loadRazorpay();
      if (!stillActive()) return;
      new Razorpay({
        key: keyId,
        order_id: orderId,
        amount: plan.amountPaise,
        currency: "INR",
        name: merchantName,
        description: plan.description,
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
      if (stillActive()) setPhase("error");
    }
  }, [keyId, orderId, plan, merchantName, callbackUrl]);

  // Open Checkout as soon as the page is up (cancelled and re-run cleanly under Strict Mode).
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => void open(() => active), 0);
    return () => { active = false; clearTimeout(timer); };
  }, [open]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">You&apos;re paying for</p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold leading-snug">{plan.description}</h1>
            <p className="mt-1 text-sm text-slate-600">{plan.detail}</p>
          </div>
          <p className="text-2xl font-semibold tabular-nums">₹{plan.priceInr}</p>
        </div>
        <ul className="mt-5 space-y-1.5 text-sm text-slate-600">
          <li>One-time payment. Nothing auto-renews.</li>
          <li>UPI, cards, netbanking and wallets via Razorpay.</li>
          <li>You&apos;ll return to your app after paying.</li>
        </ul>
      </div>
      <div className="border-t border-slate-100 p-6">
        {phase === "error" ? (
          <p role="alert" className="mb-4 text-sm text-red-700">The payment window didn&apos;t load. Check your connection and try again. You haven&apos;t been charged.</p>
        ) : null}
        {phase === "closed" ? (
          <p className="mb-4 text-sm text-slate-600">Payment window closed. If you completed a UPI payment, your access will update within a few minutes.</p>
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
          Cancel and return to app
        </a>
      </div>
    </section>
  );
}

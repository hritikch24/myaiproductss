"use client";

import { useCallback, useEffect, useState } from "react";
import type { CheckoutPlan } from "@/lib/checkout";
import { PAYMENT_ICON, PaymentIcon } from "./PaymentIcon";

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

type Phase = "loading" | "open" | "error";

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
        image: `${window.location.origin}${PAYMENT_ICON}`,
        // Redirect mode: Razorpay POSTs the result to our callback, which survives
        // UPI app switches on phones better than an in-page handler.
        callback_url: callbackUrl,
        redirect: true,
        theme: { color: "#0f172a" },
        modal: { ondismiss: () => window.location.assign(backUrl) },
      }).open();
      setPhase("open");
    } catch {
      if (stillActive()) setPhase("error");
    }
  }, [keyId, orderId, plan, merchantName, callbackUrl, backUrl]);

  // Open Checkout as soon as the page is up (cancelled and re-run cleanly under Strict Mode).
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => void open(() => active), 0);
    return () => { active = false; clearTimeout(timer); };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={phase === "error" ? "Retry secure payment" : "Opening secure payment"}
        aria-busy={phase === "loading"}
        onClick={() => {
          setPhase("loading");
          void open();
        }}
        disabled={phase !== "error"}
        className="rounded-3xl outline-offset-8 focus-visible:outline-2 focus-visible:outline-slate-900"
      >
        <PaymentIcon />
      </button>
      {phase === "error" ? <p role="alert" className="sr-only">The payment window didn&apos;t load. Check your connection, then activate the icon to retry. You haven&apos;t been charged.</p> : null}
    </>
  );
}

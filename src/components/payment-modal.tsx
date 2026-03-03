"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X, CreditCard } from "lucide-react";
import { DOC_PRICE_DISPLAY } from "@/lib/pricing";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
  theme?: { color?: string };
  prefill?: { name?: string; email?: string };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface PaymentModalProps {
  docType: string;
  formData: Record<string, string>;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
}

export function PaymentModal({
  docType,
  formData,
  onClose,
  userName,
  userEmail,
}: PaymentModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const price = DOC_PRICE_DISPLAY[docType] || "99";
  const docTypeName = docType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Load Razorpay checkout script
  useEffect(() => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setError("Failed to load payment gateway");
    document.body.appendChild(script);
  }, []);

  async function handlePayment() {
    if (!scriptLoaded) return;
    setLoading(true);
    setError("");

    try {
      // Create order
      const orderRes = await fetch("/legal-docs/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType, formData }),
      });

      if (!orderRes.ok) {
        const body = await orderRes.json();
        throw new Error(body.error || "Failed to create order");
      }

      const { orderId, amount, currency, keyId } = await orderRes.json();

      // Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        name: "KraftAI LegalDocs",
        description: `${docTypeName} Document`,
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          // Verify payment and generate document
          setLoading(true);
          try {
            const verifyRes = await fetch("/legal-docs/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              const body = await verifyRes.json();
              throw new Error(body.error || "Payment verification failed");
            }

            const { documentId } = await verifyRes.json();
            router.push(`/legal-docs/dashboard/documents/${documentId}`);
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Payment verification failed"
            );
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: { color: "#ea580c" },
        prefill: {
          name: userName,
          email: userEmail,
        },
      });

      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="relative mx-4 w-full max-w-md glass-card rounded-2xl p-6 sm:p-8 shadow-2xl shadow-orange-500/5">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Upgrade to Continue
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">
            You&apos;ve used your free documents. Pay once to generate this {docTypeName}.
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-slate-200">{docTypeName}</span>
              <p className="mt-0.5 text-[11px] text-slate-500">
                One-time payment &middot; Includes PDF download
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">&#8377;{price}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <div className="space-y-2.5">
          <button
            onClick={handlePayment}
            disabled={loading || !scriptLoaded}
            className="btn-gradient w-full flex items-center justify-center gap-2 rounded-xl h-11 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Pay &#8377;{price}
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center rounded-xl h-10 text-[13px] text-slate-500 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            Cancel
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] text-slate-600">
          Secured by Razorpay &middot; 256-bit encryption
        </p>
      </div>
    </div>
  );
}

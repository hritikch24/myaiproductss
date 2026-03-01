"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
      const orderRes = await fetch("/api/payments/create-order", {
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
        name: "KanoonSimplified",
        description: `${docTypeName} Document`,
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          // Verify payment and generate document
          setLoading(true);
          try {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              const body = await verifyRes.json();
              throw new Error(body.error || "Payment verification failed");
            }

            const { documentId } = await verifyRes.json();
            router.push(`/dashboard/documents/${documentId}`);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
            <CreditCard className="h-6 w-6 text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Payment Required</h2>
          <p className="mt-1 text-sm text-slate-400">
            You&apos;ve used your free documents. Pay to generate this {docTypeName}.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">{docTypeName}</span>
            <span className="text-2xl font-bold text-white">
              Rs.{price}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            One-time payment. Includes PDF download.
          </p>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}

        <div className="space-y-3">
          <Button
            onClick={handlePayment}
            disabled={loading || !scriptLoaded}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay Rs.${price}`
            )}
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-slate-400 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

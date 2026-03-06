"use client";

import { useState, useEffect } from "react";
import { Crown, ChevronLeft, Loader2, Check, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
declare var Razorpay: any;
export default function PremiumPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    checkPremium();
    loadRazorpayScript();
  }, []);

  function loadRazorpayScript() {
    if (window.Razorpay) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }

  async function checkPremium() {
    try {
      const res = await fetch("/api/padhai/premium");
      const data = await res.json();
      setIsPremium(data.isPremium);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpgrade() {
    setProcessing(true);
    try {
      const res = await fetch("/api/padhai/premium", { method: "POST" });
      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Failed to create order");
        setProcessing(false);
        return;
      }

      const razorpay = new Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "Padhai Premium",
        description: "Monthly subscription - ₹149/month",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/padhai/premium", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setIsPremium(true);
          } else {
            alert(verifyData.error || "Payment verification failed");
          }
          setProcessing(false);
        },
        prefill: {
          name: "Student",
        },
        theme: {
          color: "#f59e0b",
        },
      });

      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment");
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Crown className="h-10 w-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">You&apos;re Premium!</h2>
          <p className="text-slate-400 mb-8">
            Thank you for supporting Padhai. You now have access to all features.
          </p>
          <button
            onClick={() => router.push("/padhai/dashboard")}
            className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/padhai/dashboard" className="text-slate-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              <span className="text-lg font-bold text-white">Premium</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Unlock All Features</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Go Premium</h1>
          <p className="text-slate-400">
            Support Padhai and unlock all features for just ₹149/month
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Free vs Premium</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Subjects</span>
              <span className="text-slate-500">1</span>
              <span className="text-amber-400 font-medium">All 3-4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Quiz questions</span>
              <span className="text-slate-500">5</span>
              <span className="text-amber-400 font-medium">15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Parent reports</span>
              <span className="text-slate-500">✗</span>
              <span className="text-amber-400 font-medium">✓ Weekly</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Streak tracking</span>
              <span className="text-amber-400 font-medium">✓</span>
              <span className="text-amber-400 font-medium">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Study photos</span>
              <span className="text-amber-400 font-medium">✓</span>
              <span className="text-amber-400 font-medium">✓</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-white mb-2">₹149<span className="text-lg font-normal text-slate-400">/month</span></div>
          <p className="text-sm text-slate-500">Cancel anytime. No hidden fees.</p>
        </div>

        <button
          onClick={handleUpgrade}
          disabled={processing}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-4 text-lg font-bold text-white hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Crown className="h-5 w-5" />
              Upgrade Now
            </>
          )}
        </button>

        <p className="text-xs text-slate-500 mt-4 text-center">
          🔒 Secure payment powered by Razorpay
        </p>

        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <p className="text-sm text-slate-400 italic mb-2">
            &quot;Padhai helped me stay consistent with my JEE preparation. The weekly reports kept my parents informed without any pressure!&quot;
          </p>
          <p className="text-xs text-slate-500">— A Class 12 JEE Student</p>
        </div>
      </main>
    </div>
  );
}

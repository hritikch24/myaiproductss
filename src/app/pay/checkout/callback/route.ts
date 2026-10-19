import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { isPaireKind, isRazorpayId, paireReturnUrl } from "@/lib/paire";

/**
 * Razorpay Checkout (redirect mode) POSTs here after a Paire payment attempt.
 * Success: razorpay_order_id, razorpay_payment_id, razorpay_signature.
 * Failure: error[code], error[description], error[metadata] ({"order_id", "payment_id"}).
 *
 * We check Checkout's signature so a forged success never leaves kraftai.in,
 * then hand the buyer back to Paire. Paire's server checks the signature again,
 * asks Razorpay the payment is captured for that exact order and amount, and
 * only then grants. Razorpay's webhook to Paire covers closed tabs.
 */

function validSignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

const back = (url: string) => {
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Cache-Control", "no-store");
  return response;
};

export async function POST(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const expectedOrder = query.get("order");
  const kindHint = query.get("kind");
  const kind = isPaireKind(kindHint) ? kindHint : null;
  const orderId = isRazorpayId(expectedOrder, "order") ? expectedOrder : null;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return back(paireReturnUrl({ status: "failed", kind, orderId }));
  }
  const field = (name: string) => {
    const value = form.get(name);
    return typeof value === "string" ? value : "";
  };

  const paidOrder = field("razorpay_order_id");
  const paymentId = field("razorpay_payment_id");
  const signature = field("razorpay_signature");

  if (paymentId && signature) {
    // The order must be the one this checkout was opened for, and the signature Razorpay's.
    if (kind && orderId && paidOrder === orderId && isRazorpayId(paymentId, "pay") && validSignature(orderId, paymentId, signature)) {
      return back(paireReturnUrl({ status: "paid", kind, orderId, paymentId, signature }));
    }
    console.error("Secure checkout: callback signature or order mismatch", { orderId, paidOrder });
    return back(paireReturnUrl({ status: "failed", kind, orderId }));
  }

  // A declined or abandoned payment. Nothing was charged; the buyer can try again from Paire.
  console.warn("Secure checkout: payment failed", { orderId, code: field("error[code]"), reason: field("error[reason]") });
  return back(paireReturnUrl({ status: "failed", kind, orderId }));
}

// Someone opening the callback address directly: send them back to Paire.
export function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order");
  const kind = req.nextUrl.searchParams.get("kind");
  return back(paireReturnUrl({ status: "cancelled", kind: isPaireKind(kind) ? kind : null, orderId: isRazorpayId(orderId, "order") ? orderId : null }));
}

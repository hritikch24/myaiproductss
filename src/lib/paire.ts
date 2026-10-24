/**
 * Paire (paire.in) is a KraftAI product. Its web payments run through KraftAI's
 * Razorpay account, so Checkout opens here on kraftai.in:
 *
 *   paire.in  ──(Paire's server creates the Razorpay order)──▶  kraftai.in/?order=…
 *   kraftai.in ──(internal rewrite)──▶ /pay/checkout ──(Razorpay)──▶ /pay/checkout/callback
 *   kraftai.in ──(signature checked)──▶  paire.in/app/?kraftai=paid&… (Paire's server verifies again and grants)
 *
 * KraftAI holds no Paire data and grants nothing: the Razorpay order (only a
 * key holder can create one) is the whole hand-off, and Paire's server stays
 * the only thing that decides what a payment unlocks.
 *
 * PRICES MUST MATCH PAIRE: PLUS_PASSES in muse/firebase/functions/src/lib/razorpay.ts
 * and CHAT_UNLOCK in muse/firebase/functions/src/config.ts. Checkout refuses any
 * order whose amount differs from this table, so a mismatch can never be charged.
 */

import { PAYMENT_NAMES } from "./payment-names";

export type PaireKind = "plus" | "chat";

export type PairePlan = {
  id: "day" | "week" | "month" | "halfyear" | "lifetime" | "chat";
  kind: PaireKind;
  /** Retained app catalog label, independent of website builder credits. */
  label: string;
  /** Description sent to Razorpay; may differ from our UI label. */
  razorpayDescription: string;
  amountPaise: number;
  priceInr: number;
  /** Days the pass runs on the web (paid days + offer days). Unlimited Chat has no expiry. */
  days: number | null;
  detail: string;
};

export const PAIRE_PLANS: readonly PairePlan[] = [
  { id: "day", kind: "plus", label: PAYMENT_NAMES.labels.day, razorpayDescription: PAYMENT_NAMES.razorpayLabels.day, amountPaise: 3500, priceInr: 35, days: 1, detail: "24 hours · try it" },
  { id: "week", kind: "plus", label: PAYMENT_NAMES.labels.week, razorpayDescription: PAYMENT_NAMES.razorpayLabels.week, amountPaise: 9900, priceInr: 99, days: 7, detail: "7 days · about ₹14 a day" },
  { id: "month", kind: "plus", label: PAYMENT_NAMES.labels.month, razorpayDescription: PAYMENT_NAMES.razorpayLabels.month, amountPaise: 39900, priceInr: 399, days: 60, detail: "60 days · ₹6.65 a day" },
  { id: "halfyear", kind: "plus", label: PAYMENT_NAMES.labels.halfyear, razorpayDescription: PAYMENT_NAMES.razorpayLabels.halfyear, amountPaise: 79900, priceInr: 799, days: 180, detail: "180 days · about ₹4.44 a day" },
  { id: "lifetime", kind: "plus", label: PAYMENT_NAMES.labels.lifetime, razorpayDescription: PAYMENT_NAMES.razorpayLabels.lifetime, amountPaise: 149900, priceInr: 1499, days: null, detail: "Pay once · Plus with no expiry" },
  { id: "chat", kind: "chat", label: PAYMENT_NAMES.labels.chat, razorpayDescription: PAYMENT_NAMES.razorpayLabels.chat, amountPaise: 4900, priceInr: 49, days: null, detail: "Once, for all your matches · no expiry" },
];

/** The `notes.product` Paire's server writes on each Razorpay order. */
const PRODUCTS: Record<string, PaireKind> = {
  kraftai_plus: "plus", kraftai_unlimited_chat: "chat",
  // Existing orders and payment callbacks remain valid during the migration.
  paire_plus: "plus", paire_unlimited_chat: "chat"
};

export const PAIRE_SITE = "https://www.paire.in";

/** Where buyers go back to after Checkout. Overridable for local testing only. */
export function paireAppUrl(): URL {
  const raw = process.env.PAIRE_APP_URL || `${PAIRE_SITE}/app/`;
  const url = new URL(raw);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !(local && url.protocol === "http:")) throw new Error("PAIRE_APP_URL must be https");
  return url;
}

export type PaireReturn =
  | { status: "paid"; kind: PaireKind; orderId: string; paymentId: string; signature: string }
  | { status: "failed" | "cancelled"; kind: PaireKind | null; orderId: string | null };

/** The Paire app URL a buyer is sent back to. The app re-verifies everything with Paire's server. */
export function paireReturnUrl(result: PaireReturn): string {
  const url = paireAppUrl();
  url.searchParams.set("kraftai", result.status);
  if (result.kind) url.searchParams.set("kind", result.kind);
  if (result.orderId) url.searchParams.set("order", result.orderId);
  if (result.status === "paid") {
    url.searchParams.set("payment", result.paymentId);
    url.searchParams.set("signature", result.signature);
  }
  return url.toString();
}

export function isRazorpayId(value: unknown, prefix: "order" | "pay"): value is string {
  return typeof value === "string" && new RegExp(`^${prefix}_[A-Za-z0-9]{6,40}$`).test(value);
}

export const isPaireKind = (value: unknown): value is PaireKind => value === "plus" || value === "chat";

type RazorpayOrder = {
  id?: string;
  amount?: number | string;
  currency?: string;
  status?: string;
  notes?: Record<string, unknown> | unknown[];
};

export type CheckoutRefusal = "not-paire" | "price-mismatch" | "already-paid" | "invalid";

/**
 * Whether Checkout may open for this Razorpay order: a Paire order (by the
 * product Paire's server recorded), still unpaid, in INR, at exactly the price
 * this site publishes for it.
 */
export function paireCheckout(order: RazorpayOrder): { ok: true; plan: PairePlan } | { ok: false; reason: CheckoutRefusal } {
  if (!isRazorpayId(order.id, "order")) return { ok: false, reason: "invalid" };
  const notes = order.notes && !Array.isArray(order.notes) ? order.notes : {};
  const kind = typeof notes.product === "string" && Object.prototype.hasOwnProperty.call(PRODUCTS, notes.product) ? PRODUCTS[notes.product] : undefined;
  if (!kind) return { ok: false, reason: "not-paire" };
  if (order.status === "paid") return { ok: false, reason: "already-paid" };
  if (order.status !== "created" && order.status !== "attempted") return { ok: false, reason: "invalid" };
  const plan = kind === "chat" ? PAIRE_PLANS.find((item) => item.id === "chat") : PAIRE_PLANS.find((item) => item.kind === "plus" && item.id === notes.plan);
  // Only these exact historical server quotes remain payable. Never accept a
  // browser price or another plan's amount. Existing purchases keep their days.
  const amount = Number(order.amount);
  const legacyQuote = (plan?.id === "day" && [2000, 2900].includes(amount)) || (plan?.id === "month" && amount === 29900);
  if (!plan || order.currency !== "INR" || (amount !== plan.amountPaise && !legacyQuote)) return { ok: false, reason: "price-mismatch" };
  return { ok: true, plan: legacyQuote ? { ...plan, amountPaise: amount, priceInr: amount / 100,
    detail: plan.id === "month" ? "60 days · original ₹299 quote" : `24 hours · original ₹${amount / 100} quote` } : plan };
}

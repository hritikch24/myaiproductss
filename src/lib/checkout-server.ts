import type { paireCheckout } from "./paire";

/** Read an order using only merchant credentials; never forward the browser's headers. */
export async function fetchCheckoutOrder(orderId: string): Promise<Parameters<typeof paireCheckout>[0]> {
  const response = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
    headers: {
      authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")}`,
      "user-agent": "KraftAI/1.0",
      accept: "application/json",
    },
    credentials: "omit",
    referrerPolicy: "no-referrer",
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw Object.assign(new Error("Payment order unavailable"), { statusCode: response.status });
  return response.json();
}

import Image from "next/image";

/** The supplied artwork is shared by the hand-off page and Razorpay Checkout. */
export const PAYMENT_ICON = "/payments/checkout-icon.jpg";

export function PaymentIcon() {
  return <Image src={PAYMENT_ICON} alt="" width={160} height={160} unoptimized priority className="block h-40 w-40 rounded-3xl" />;
}

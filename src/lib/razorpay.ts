import Razorpay from "razorpay";

export { DOC_PRICES, DOC_PRICE_DISPLAY } from "./pricing";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

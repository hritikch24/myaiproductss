import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import { DOC_PRICES } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { docType, formData } = await req.json();

  if (!docType || !DOC_PRICES[docType]) {
    return NextResponse.json({ error: "Invalid document type" }, { status: 400 });
  }

  if (!formData || typeof formData !== "object") {
    return NextResponse.json({ error: "Form data is required" }, { status: 400 });
  }

  const amount = DOC_PRICES[docType];

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `doc_${Date.now()}`,
    });

    // Store order with form data for later use
    await pool.query(
      `INSERT INTO payments (user_id, razorpay_order_id, amount, doc_type, form_data, status)
       VALUES ($1, $2, $3, $4, $5, 'created')`,
      [session.user.id, order.id, amount, docType, JSON.stringify(formData)]
    );

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}

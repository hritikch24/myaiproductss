import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/padhai-db";
import { auth } from "@/lib/auth";
import { razorpay } from "@/lib/razorpay";

const PREMIUM_PRICE_INR = 149;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentResult = await pool.query(
      "SELECT id, is_premium FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const student = studentResult.rows[0];

    if (student.is_premium) {
      return NextResponse.json({ error: "Already premium" }, { status: 400 });
    }

    const amountPaise = PREMIUM_PRICE_INR * 100;

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `premium_${student.id}_${Date.now()}`,
      notes: {
        student_id: student.id,
        email: session.user.email,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Premium order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });
    }

    const crypto = await import("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await pool.query(
      "UPDATE padhai_students SET is_premium = true, premium_started_at = NOW() WHERE email = $1",
      [session.user.email]
    );

    return NextResponse.json({ success: true, message: "Premium activated!" });
  } catch (error) {
    console.error("Premium activation error:", error);
    return NextResponse.json({ error: "Failed to activate premium" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentResult = await pool.query(
      "SELECT is_premium FROM padhai_students WHERE email = $1",
      [session.user.email]
    );

    return NextResponse.json({ 
      isPremium: studentResult.rows[0]?.is_premium || false
    });
  } catch (error) {
    console.error("Get premium status error:", error);
    return NextResponse.json({ error: "Failed to get premium status" }, { status: 500 });
  }
}

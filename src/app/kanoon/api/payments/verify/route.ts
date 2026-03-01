import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPTS, buildUserMessage, DocType } from "@/lib/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clientIp = getClientIp(req);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json(
      { error: "Missing payment details" },
      { status: 400 }
    );
  }

  // Verify HMAC signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json(
      { error: "Invalid payment signature" },
      { status: 400 }
    );
  }

  // Get payment record with form data
  const { rows: paymentRows } = await pool.query(
    `SELECT * FROM payments
     WHERE razorpay_order_id = $1 AND user_id = $2 AND status = 'created'`,
    [razorpay_order_id, session.user.id]
  );

  if (!paymentRows.length) {
    return NextResponse.json(
      { error: "Payment record not found" },
      { status: 404 }
    );
  }

  const payment = paymentRows[0];
  const docType = payment.doc_type as DocType;
  const formData = payment.form_data;

  try {
    // Generate document with Gemini
    const systemPrompt = PROMPTS[docType];
    const userMessage = buildUserMessage(docType, formData);

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(userMessage);
    const generatedContent = result.response.text();

    // Save document with IP address
    const { rows: docRows } = await pool.query(
      `INSERT INTO documents (user_id, doc_type, form_data, generated_content, status, ip_address)
       VALUES ($1, $2, $3, $4, 'completed', $5)
       RETURNING id`,
      [session.user.id, docType, JSON.stringify(formData), generatedContent, clientIp]
    );

    const documentId = docRows[0].id;

    // Update payment record
    await pool.query(
      `UPDATE payments
       SET razorpay_payment_id = $1,
           razorpay_signature = $2,
           status = 'paid',
           document_id = $3
       WHERE id = $4`,
      [razorpay_payment_id, razorpay_signature, documentId, payment.id]
    );

    return NextResponse.json({ documentId });
  } catch (err) {
    console.error("Document generation after payment error:", err);
    // Mark payment as failed but keep record
    await pool.query(
      `UPDATE payments
       SET razorpay_payment_id = $1,
           razorpay_signature = $2,
           status = 'generation_failed'
       WHERE id = $3`,
      [razorpay_payment_id, razorpay_signature, payment.id]
    );

    return NextResponse.json(
      { error: "Payment verified but document generation failed. Please contact support." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPTS, buildUserMessage, DocType } from "@/lib/prompts";

const VALID_DOC_TYPES: DocType[] = [
  "rental_agreement",
  "nda",
  "freelancer_contract",
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const FREE_LIMIT_PER_USER = 2;
const FREE_LIMIT_PER_IP = 3;

function getClientIp(req: NextRequest): string {
  // x-forwarded-for is set by proxies/load balancers (Vercel, Nginx, etc.)
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  // x-real-ip is set by some proxies
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { docType, formData } = body;

  if (!docType || !VALID_DOC_TYPES.includes(docType)) {
    return NextResponse.json({ error: "Invalid document type" }, { status: 400 });
  }

  if (!formData || typeof formData !== "object") {
    return NextResponse.json({ error: "Form data is required" }, { status: 400 });
  }

  const userId = session.user.id;
  const clientIp = getClientIp(req);

  // Check per-user free doc limit
  const { rows: userRows } = await pool.query(
    "SELECT free_docs_used FROM users WHERE id = $1",
    [userId]
  );

  if (!userRows.length) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const freeDocsUsed = userRows[0].free_docs_used;

  // Check per-IP free doc limit (prevents multiple accounts from same IP)
  const { rows: ipRows } = await pool.query(
    `SELECT COUNT(*)::int AS count FROM documents
     WHERE ip_address = $1
       AND id NOT IN (SELECT document_id FROM payments WHERE status = 'paid' AND document_id IS NOT NULL)`,
    [clientIp]
  );
  const freeDocsFromIp = ipRows[0]?.count ?? 0;

  if (freeDocsUsed >= FREE_LIMIT_PER_USER || freeDocsFromIp >= FREE_LIMIT_PER_IP) {
    return NextResponse.json(
      { error: "Free document limit reached", requiresPayment: true },
      { status: 402 }
    );
  }

  // Generate with Gemini
  const systemPrompt = PROMPTS[docType as DocType];
  const userMessage = buildUserMessage(docType as DocType, formData);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(userMessage);
    const generatedContent = result.response.text();

    // Save document with IP address for abuse tracking
    const { rows: docRows } = await pool.query(
      `INSERT INTO documents (user_id, doc_type, form_data, generated_content, status, ip_address)
       VALUES ($1, $2, $3, $4, 'completed', $5)
       RETURNING id`,
      [userId, docType, JSON.stringify(formData), generatedContent, clientIp]
    );

    // Increment free_docs_used
    await pool.query(
      "UPDATE users SET free_docs_used = free_docs_used + 1 WHERE id = $1",
      [userId]
    );

    return NextResponse.json({ documentId: docRows[0].id });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "Failed to generate document. Please try again." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are DocSamajho — an AI document analyst that helps ordinary people understand confusing official documents.

You will receive a document (as text or image). Analyze it and respond in the following JSON format:

{
  "summary": "2-3 sentence plain-language explanation of what this document says. Use simple words. Avoid legal/technical jargon. If the document is in Hindi or another language, still explain in the user's preferred language.",
  "document_type": "What type of document this is (e.g., 'Income Tax Notice', 'Legal Notice', 'Bank Statement', 'Medical Report', etc.)",
  "from": "Who sent this document (organization/person name)",
  "urgency": "LOW | MEDIUM | HIGH | CRITICAL",
  "urgency_reason": "Why this urgency level — mention any deadlines",
  "deadline": "Specific deadline date if mentioned, or null",
  "action_items": [
    "Step 1: What the person needs to do first",
    "Step 2: Next step",
    "Step 3: Any other steps"
  ],
  "scam_check": {
    "is_suspicious": false,
    "confidence": "LOW | MEDIUM | HIGH",
    "reasons": ["Reason 1 if suspicious"]
  },
  "reply_needed": true,
  "reply_draft": "A professional reply/response draft if a reply is needed. Written formally but clearly. Include placeholders like [YOUR NAME] where needed. If no reply is needed, set to null.",
  "key_amounts": ["Any monetary amounts mentioned, e.g., '₹15,000 penalty'"],
  "important_references": ["Any reference numbers, case numbers, order numbers mentioned"],
  "explain_like_5": "Explain the document as if talking to someone with zero knowledge of legal/official language. Use everyday analogies. 2-3 sentences max."
}

IMPORTANT RULES:
- Always respond with valid JSON only, no markdown formatting
- If you cannot read the document clearly, still try your best and mention uncertainty
- For scam detection, check: fake letterheads, urgency manipulation, suspicious payment demands, grammar errors in official docs, mismatched sender info
- Deadline detection is critical — never miss a deadline
- reply_draft should be ready to use with minimal editing
- Explain in the language the user requested (default: English)
- If amounts are in the document, always extract them into key_amounts`;

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];
    let preferredLanguage = "English";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      preferredLanguage = (formData.get("language") as string) || "English";

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = file.type;

      if (mimeType === "application/pdf") {
        const pdfParse = require("pdf-parse");
        const data = await pdfParse(buffer);
        const text = data.text;

        if (!text || text.trim().length === 0) {
          return NextResponse.json(
            { error: "Could not extract text from PDF. The file may be a scanned image — try uploading a photo instead." },
            { status: 400 }
          );
        }

        parts = [{ text: `Analyze this document. Respond in ${preferredLanguage}.\n\nDocument text:\n${text}` }];
      } else if (mimeType.startsWith("image/")) {
        const base64 = buffer.toString("base64");
        parts = [
          { text: `Analyze this document image. Respond in ${preferredLanguage}.` },
          { inlineData: { mimeType, data: base64 } },
        ];
      } else {
        return NextResponse.json(
          { error: "Unsupported file type. Please upload a PDF or image (JPG, PNG)." },
          { status: 400 }
        );
      }
    } else {
      const body = await req.json();
      preferredLanguage = body.language || "English";

      if (body.text) {
        parts = [{ text: `Analyze this document. Respond in ${preferredLanguage}.\n\nDocument text:\n${body.text}` }];
      } else if (body.image) {
        const mimeType = body.mimeType || "image/jpeg";
        parts = [
          { text: `Analyze this document image. Respond in ${preferredLanguage}.` },
          { inlineData: { mimeType, data: body.image } },
        ];
      } else {
        return NextResponse.json({ error: "No document provided" }, { status: 400 });
      }
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(parts);
    const responseText = result.response.text();

    const cleaned = responseText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const analysis = JSON.parse(cleaned);

    return NextResponse.json({ analysis });
  } catch (err: unknown) {
    console.error("DocSamajho analysis error:", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI returned an invalid response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze document. Please try again." },
      { status: 500 }
    );
  }
}

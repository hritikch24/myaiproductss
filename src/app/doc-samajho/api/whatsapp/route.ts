import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "docsamajho_verify_2024";
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;

const SYSTEM_PROMPT = `You are DocSamajho WhatsApp bot. A user has sent you a document image or text. Analyze it and respond in a friendly, concise WhatsApp message format.

Structure your response like this:

📄 *Document Type:* [type]
📨 *From:* [sender]

📝 *Kya Likha Hai (Summary):*
[2-3 line plain language summary]

⚠️ *Urgency:* [LOW/MEDIUM/HIGH/CRITICAL]
📅 *Deadline:* [date if any, or "No deadline"]

✅ *Kya Karna Hai:*
1. [action 1]
2. [action 2]
3. [action 3]

🔍 *Scam Check:* [Safe ✅ / Suspicious ⚠️ — reason]

💰 *Amounts:* [any amounts mentioned]

✉️ *Reply Draft:*
[draft reply if needed, or "No reply needed"]

Keep it under 1500 characters. Use Hindi-English mix (Hinglish) for Indian users. Be warm and helpful.`;

async function sendWhatsAppMessage(to: string, message: string) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) return;

  await fetch(
    `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      }),
    }
  );
}

async function downloadWhatsAppMedia(mediaId: string): Promise<{ buffer: Buffer; mimeType: string }> {
  const mediaResponse = await fetch(
    `https://graph.facebook.com/v21.0/${mediaId}`,
    { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
  );
  const mediaData = await mediaResponse.json();

  const fileResponse = await fetch(mediaData.url, {
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
  });
  const arrayBuffer = await fileResponse.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    mimeType: mediaData.mime_type || "image/jpeg",
  };
}

// Webhook verification (GET)
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Incoming messages (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) {
      return NextResponse.json({ status: "no message" });
    }

    const from = message.from;
    const messageType = message.type;

    await sendWhatsAppMessage(from, "📄 DocSamajho yahan hai! Aapka document analyze ho raha hai... ek minute dijiye.");

    let analysisText = "";

    if (messageType === "image" || messageType === "document") {
      const mediaId = messageType === "image" ? message.image.id : message.document.id;
      const { buffer, mimeType } = await downloadWhatsAppMedia(mediaId);

      if (mimeType === "application/pdf") {
        const { createRequire } = await import("module");
        const require = createRequire(import.meta.url);
        const pdfParse = require("pdf-parse");
        const data = await pdfParse(buffer);

        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: SYSTEM_PROMPT,
        });
        const result = await model.generateContent(`Analyze this document:\n\n${data.text}`);
        analysisText = result.response.text();
      } else {
        const base64 = buffer.toString("base64");
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: SYSTEM_PROMPT,
        });
        const result = await model.generateContent([
          { text: "Analyze this document image:" },
          { inlineData: { mimeType, data: base64 } },
        ]);
        analysisText = result.response.text();
      }
    } else if (messageType === "text") {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_PROMPT,
      });
      const result = await model.generateContent(
        `User sent this text, analyze if it's a document or help them:\n\n${message.text.body}`
      );
      analysisText = result.response.text();
    } else {
      await sendWhatsAppMessage(from, "🙏 Please send a photo of your document, a PDF file, or paste the text. I'll explain it for you!");
      return NextResponse.json({ status: "unsupported type" });
    }

    if (analysisText.length > 4000) {
      analysisText = analysisText.substring(0, 3997) + "...";
    }

    await sendWhatsAppMessage(from, analysisText);

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("WhatsApp webhook error:", err);
    return NextResponse.json({ status: "error" }, { status: 200 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/kraftai-db";

const SYSTEM_PROMPT = `You are KraftAI's sales assistant chatbot on kraftai.in. You help potential clients understand our services, pricing, and process.

ABOUT KRAFTAI:
- Premium web development agency
- Services: Websites ($499+), Business Sites ($1,499+), E-Commerce ($2,999+), Web Apps ($4,999+), Mobile Apps ($3,999+), AI Solutions ($1,999+), UI/UX Design ($799+)
- 100% code ownership - clients get all source code
- Fixed-price projects, no hourly billing
- Delivery: Landing pages 5-7 days, business sites 2-3 weeks, complex apps 4-8 weeks
- Tech stack: React, Next.js, TypeScript, Node.js, Python, Flutter, PostgreSQL, AWS, OpenAI, Claude AI
- Payment: 50% upfront, 50% on delivery. Accept wire transfer, PayPal, Stripe, crypto
- 24/7 support, maintenance plans from $99/month
- Money-back guarantee if deliverables don't match agreement
- Talk directly to the senior engineer, no middlemen

RULES:
- Be concise, friendly, and professional
- Always try to capture the lead - ask for their name, email, or suggest WhatsApp chat
- If they describe a project, give a rough estimate and encourage them to get a detailed quote
- For complex questions, suggest they book a free 30-min discovery call via WhatsApp
- WhatsApp: +91 8859820935
- Email: hritikchaudhary016@gmail.com
- Never make up features or prices not listed above
- Keep responses under 150 words
- If asked about competitors, focus on KraftAI's strengths (ownership, pricing, direct access) rather than criticizing others`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, session_id, history } = body;

    if (!message || !session_id) {
      return NextResponse.json({ error: "Missing message or session_id" }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json({
        reply: "Thanks for your interest! Our chat is being set up. Please reach us on WhatsApp at +91 8859820935 or email hritikchaudhary016@gmail.com for instant support.",
        fallback: true,
      });
    }

    // Save user message
    await pool.query(
      "INSERT INTO kraftai_chats (session_id, role, content) VALUES ($1, $2, $3)",
      [session_id, "user", message]
    );

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).slice(-8).map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", errText);
      return NextResponse.json({
        reply: "I'm having a moment! Please try again or reach us on WhatsApp at +91 8859820935.",
        fallback: true,
      });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";

    // Save assistant reply
    await pool.query(
      "INSERT INTO kraftai_chats (session_id, role, content) VALUES ($1, $2, $3)",
      [session_id, "assistant", reply]
    );

    // Track as event
    await pool.query(
      "INSERT INTO kraftai_events (session_id, event_type, event_data, page) VALUES ($1, $2, $3, $4)",
      [session_id, "chat_message", JSON.stringify({ user_message: message.substring(0, 200) }), "/"]
    );

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({
      reply: "Something went wrong. Please reach us on WhatsApp at +91 8859820935 for instant help!",
      fallback: true,
    }, { status: 500 });
  }
}

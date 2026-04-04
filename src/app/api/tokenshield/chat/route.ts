// AI Chatbot endpoint for TokenShield
import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are TokenShield AI — a helpful assistant for TokenShield, an AI API cost optimization proxy.

TokenShield sits between your app and AI APIs (Claude, OpenAI). It saves 40-60% on API costs through:
1. Smart Caching — same input = cached response (free)
2. Model Routing — simple tasks auto-routed to cheaper models
3. Prompt Optimization — trims whitespace, deduplicates, truncates old messages

Setup: Change one line — set baseURL to point to TokenShield proxy.
Pricing: 10% of what we save you. If we save nothing, you pay nothing.
URL: https://kraftai.in/tokenshield

Keep responses short (2-3 sentences max). Be helpful and direct.`;

function getFallback(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("pay") || lower.includes("charge"))
    return "Simple — we charge 10% of what we save you. If we save you nothing, you pay $0. Zero risk.";
  if (lower.includes("how") || lower.includes("work"))
    return "Your app sends API calls to our proxy instead of directly to Claude/OpenAI. We cache duplicate calls, route simple tasks to cheaper models, and trim bloated prompts. Same results, way cheaper.";
  if (lower.includes("setup") || lower.includes("install") || lower.includes("integrate") || lower.includes("start"))
    return "One line change: set baseURL in your Anthropic or OpenAI client to point to https://kraftai.in/api/tokenshield/v1. That's it — no other code changes needed.";
  if (lower.includes("cache"))
    return "We hash your request inputs. If we've seen the exact same request before, we return the cached response instantly — cost: $0, latency: ~0ms.";
  if (lower.includes("rout") || lower.includes("model"))
    return "We use simple rules (not AI) to detect simple tasks: short inputs, classification prompts, single-turn chats. These get routed to cheaper models like Haiku or GPT-4o-mini automatically.";
  if (lower.includes("safe") || lower.includes("secure") || lower.includes("trust"))
    return "Your API keys pass through our proxy to the AI provider. We never store them. The proxy is open-source so you can audit the code or self-host.";
  return "TokenShield is a drop-in proxy for Claude & OpenAI that cuts your API costs by 40-60%. Change one line of code to start saving. Ask me about pricing, setup, or how it works!";
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // Try Gemini if key available
    if (GEMINI_API_KEY) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}\n\nAssistant:` }] }],
              generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
            }),
          }
        );
        const data = await res.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiResponse) return NextResponse.json({ response: aiResponse });
      } catch {
        // Fall through to rule-based
      }
    }

    // Rule-based fallback
    return NextResponse.json({ response: getFallback(message) });
  } catch {
    return NextResponse.json({ response: "TokenShield saves 40-60% on AI API costs. Ask me how!" });
  }
}

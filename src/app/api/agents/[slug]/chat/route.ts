import { NextRequest } from "next/server";
import { getAgentBySlug, getMessages, saveMessage } from "@/lib/agents-db";
import { needsWebSearch, webSearch, formatSearchContext } from "@/lib/web-search";

// POST /api/agents/[slug]/chat — streaming chat with agent
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { message, sessionId, attachments } = await request.json();

    if (!message || !sessionId) {
      return new Response(
        JSON.stringify({ error: "Missing message or sessionId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build enhanced message with attachment context
    let enhancedMessage = message;
    if (attachments && Array.isArray(attachments) && attachments.length > 0) {
      const attachmentContext = attachments
        .map((att: { name: string; type: string; content: string }) => {
          if (att.type === "image") {
            return `[Attached image: ${att.name}]`;
          }
          return `\n--- Attached file: ${att.name} ---\n${att.content}\n--- End of ${att.name} ---`;
        })
        .join("\n");
      enhancedMessage = `${message}\n\n${attachmentContext}`;
    }

    const agent = await getAgentBySlug(slug);
    if (!agent) {
      return new Response(
        JSON.stringify({ error: "Agent not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Save user message (original, without attachment content bloat)
    await saveMessage(agent.id, sessionId, "user", message);

    // Get conversation history (last 20 messages for context)
    const history = await getMessages(agent.id, sessionId, 20);

    // Build messages array for the AI — replace the last user message with enhanced version
    const messages = history.map((msg, idx) => ({
      role: msg.role as "user" | "assistant",
      content: idx === history.length - 1 && msg.role === "user" ? enhancedMessage : msg.content,
    }));

    // Safety guardrail system prompt wrapper
    const safetyWrapper = `${agent.system_prompt}

SAFETY GUIDELINES:
- Never provide advice that could be illegal, harmful, or dangerous.
- If asked about medical emergencies, direct users to call emergency services (112 in India).
- Do not provide specific investment advice — always recommend consulting professionals.
- If you're not certain about something, say so clearly.
- Be respectful and inclusive in all responses.
- Do not generate content that is hateful, discriminatory, or sexually explicit.`;

    // RAG-lite: Search the web for real-time context if the query needs it
    let systemPromptWithContext = safetyWrapper;
    if (needsWebSearch(message)) {
      try {
        const searchQuery = `${agent.category} ${message}`;
        const searchResults = await webSearch(searchQuery);
        const searchContext = formatSearchContext(searchResults, message);
        if (searchContext) {
          systemPromptWithContext = safetyWrapper + searchContext;
          console.log(`[RAG] Web search for "${message.slice(0, 50)}..." returned ${searchResults.length} results`);
        }
      } catch (err) {
        console.error("[RAG] Web search failed, continuing without:", err);
      }
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback: return a simulated response if no API key
      const fallbackResponse = `I'm **${agent.name}** — your ${agent.category} expert. I'm currently in demo mode as no AI API key is configured.\n\nTo enable full AI responses, add an \`OPENAI_API_KEY\` or \`GEMINI_API_KEY\` to your environment variables.\n\nYour question: "${message}"\n\nIn full mode, I would provide detailed, expert-level guidance on this topic using my specialized knowledge in ${agent.category.toLowerCase()}.`;

      await saveMessage(agent.id, sessionId, "assistant", fallbackResponse);

      return new Response(
        JSON.stringify({ response: fallbackResponse, agent: { name: agent.name, icon: agent.icon } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Try Groq (OpenAI-compatible), then OpenAI, then Gemini
    try {
      if (process.env.GROQ_API_KEY) {
        return await streamOpenAI(agent, messages, systemPromptWithContext, sessionId, "https://api.groq.com/openai/v1/chat/completions", process.env.GROQ_API_KEY, process.env.GROQ_MODEL || "llama-3.3-70b-versatile");
      } else if (process.env.OPENAI_API_KEY) {
        return await streamOpenAI(agent, messages, systemPromptWithContext, sessionId, "https://api.openai.com/v1/chat/completions", process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || "gpt-4o-mini");
      } else {
        return await streamGemini(agent, messages, systemPromptWithContext, sessionId, message);
      }
    } catch (aiError) {
      console.error("AI API error, falling back to demo:", aiError);
      const demoResponse = `I'm **${agent.name}**, your ${agent.category} expert. The AI service is temporarily unavailable (rate limit or connectivity issue).\n\nPlease try again in a moment. In the meantime, here's what I can help you with:\n\n- Expert guidance in **${agent.category}**\n- Detailed, actionable advice\n- Step-by-step explanations\n\nYour question: "${message}"\n\nI'll be ready to give you a thorough answer shortly!`;
      await saveMessage(agent.id, sessionId, "assistant", demoResponse);
      return new Response(
        JSON.stringify({ response: demoResponse, agent: { name: agent.name, icon: agent.icon } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: "Chat failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

async function streamOpenAI(
  agent: { id: number; name: string; icon: string },
  messages: { role: string; content: string }[],
  systemPrompt: string,
  sessionId: string,
  apiUrl = "https://api.openai.com/v1/chat/completions",
  apiKey = process.env.OPENAI_API_KEY!,
  model = process.env.OPENAI_MODEL || "gpt-4o-mini"
) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("OpenAI error:", err);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  let fullResponse = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              // Save complete response
              if (fullResponse) {
                await saveMessage(agent.id, sessionId, "assistant", fullResponse);
              }
              controller.close();
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }

        // Save if stream ended without [DONE]
        if (fullResponse) {
          await saveMessage(agent.id, sessionId, "assistant", fullResponse);
        }
        controller.close();
      } catch (error) {
        console.error("Stream error:", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

async function streamGemini(
  agent: { id: number; name: string; icon: string },
  messages: { role: string; content: string }[],
  systemPrompt: string,
  sessionId: string,
  latestMessage: string
) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  // Convert messages to Gemini format
  const geminiHistory = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [
          ...geminiHistory,
          { role: "user", parts: [{ text: latestMessage }] },
        ],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini error:", err);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  let fullResponse = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      try {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);

            try {
              const parsed = JSON.parse(data);
              const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (content) {
                fullResponse += content;
                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }

        if (fullResponse) {
          await saveMessage(agent.id, sessionId, "assistant", fullResponse);
        }
        controller.close();
      } catch (error) {
        console.error("Gemini stream error:", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// GET /api/agents/[slug]/chat?sessionId=xxx — get chat history
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "Missing sessionId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const agent = await getAgentBySlug(slug);
    if (!agent) {
      return new Response(
        JSON.stringify({ error: "Agent not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const messages = await getMessages(agent.id, sessionId);
    return new Response(
      JSON.stringify({ messages, agent: { name: agent.name, icon: agent.icon, category: agent.category } }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Get chat history error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch messages" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

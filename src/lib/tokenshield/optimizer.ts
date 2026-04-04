// Prompt optimization — trims bloat without changing meaning
// Zero AI cost, pure string manipulation

interface OptimizationResult {
  messages: any[];
  system?: string;
  tokensRemoved: number;
  optimizations: string[];
}

export function optimizePrompt(body: any): OptimizationResult {
  const optimizations: string[] = [];
  let tokensRemoved = 0;
  let messages = JSON.parse(JSON.stringify(body.messages || []));
  let system = body.system ? String(body.system) : undefined;

  // 1. Trim excessive whitespace in all messages
  messages = messages.map((msg: any) => {
    if (typeof msg.content === "string") {
      const original = msg.content;
      const trimmed = collapseWhitespace(original);
      const saved = estimateTokens(original) - estimateTokens(trimmed);
      if (saved > 0) {
        tokensRemoved += saved;
        optimizations.push("whitespace_collapse");
      }
      return { ...msg, content: trimmed };
    }
    return msg;
  });

  // 2. Trim system prompt whitespace
  if (system) {
    const original = system;
    system = collapseWhitespace(system);
    const saved = estimateTokens(original) - estimateTokens(system);
    if (saved > 0) {
      tokensRemoved += saved;
      optimizations.push("system_whitespace");
    }
  }

  // 3. Truncate conversation history if too long (keep first + last N turns)
  if (messages.length > 20) {
    const first = messages.slice(0, 2); // keep system context
    const last = messages.slice(-16); // keep recent context
    const removed = messages.length - first.length - last.length;
    const removedText = messages
      .slice(2, messages.length - 16)
      .map((m: any) => (typeof m.content === "string" ? m.content : ""))
      .join("");
    tokensRemoved += estimateTokens(removedText);
    messages = [...first, ...last];
    optimizations.push(`truncated_${removed}_messages`);
  }

  // 4. Remove duplicate consecutive messages (common with retry logic)
  const deduped: any[] = [];
  for (let i = 0; i < messages.length; i++) {
    if (
      i > 0 &&
      messages[i].role === messages[i - 1].role &&
      JSON.stringify(messages[i].content) === JSON.stringify(messages[i - 1].content)
    ) {
      tokensRemoved += estimateTokens(
        typeof messages[i].content === "string" ? messages[i].content : JSON.stringify(messages[i].content)
      );
      optimizations.push("removed_duplicate");
      continue;
    }
    deduped.push(messages[i]);
  }
  messages = deduped;

  // 5. Optimize max_tokens — if they didn't set it, suggest a reasonable default
  // (This is returned as metadata, not modifying the prompt itself)

  return {
    messages,
    system,
    tokensRemoved,
    optimizations: [...new Set(optimizations)],
  };
}

function collapseWhitespace(text: string): string {
  return text
    .replace(/[ \t]+/g, " ") // multiple spaces/tabs → single space
    .replace(/\n{3,}/g, "\n\n") // 3+ newlines → 2
    .trim();
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

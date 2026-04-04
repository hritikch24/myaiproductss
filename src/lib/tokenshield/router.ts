// Rule-based model routing — zero AI cost
// Downgrades expensive models to cheaper ones when the task is simple

interface RoutingDecision {
  originalModel: string;
  routedModel: string;
  reason: string;
  estimatedSavings: number; // percentage
}

// Cost per 1M tokens (input/output) — approximate USD
const MODEL_COSTS: Record<string, { input: number; output: number }> = {
  // Anthropic
  "claude-opus-4-6": { input: 15, output: 75 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5-20251001": { input: 0.8, output: 4 },
  // OpenAI
  "gpt-4o": { input: 2.5, output: 10 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4-turbo": { input: 10, output: 30 },
  "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
};

// Cheaper alternatives
const DOWNGRADE_MAP: Record<string, string> = {
  "claude-opus-4-6": "claude-haiku-4-5-20251001",
  "claude-sonnet-4-6": "claude-haiku-4-5-20251001",
  "gpt-4o": "gpt-4o-mini",
  "gpt-4-turbo": "gpt-4o-mini",
};

// Patterns that indicate a simple task (safe to downgrade)
const SIMPLE_TASK_PATTERNS = [
  /\b(classify|classification|categorize|categorise)\b/i,
  /\b(extract|extraction|parse)\b/i,
  /\b(yes or no|true or false|boolean)\b/i,
  /\b(translate|translation)\b/i,
  /\b(summarize|summary|summarise|tldr)\b/i,
  /\b(sentiment|positive|negative|neutral)\b/i,
  /\b(format|reformat|convert)\b/i,
  /\b(label|tag|annotate)\b/i,
];

function estimateTokens(text: string): number {
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
}

function getMessagesText(messages: any[]): string {
  if (!messages) return "";
  return messages
    .map((m: any) => (typeof m.content === "string" ? m.content : JSON.stringify(m.content)))
    .join(" ");
}

export function routeModel(body: any): RoutingDecision {
  const originalModel = body.model || "";
  const cheaper = DOWNGRADE_MAP[originalModel];

  // No cheaper alternative known — pass through
  if (!cheaper) {
    return {
      originalModel,
      routedModel: originalModel,
      reason: "no_cheaper_alternative",
      estimatedSavings: 0,
    };
  }

  const messagesText = getMessagesText(body.messages);
  const systemText = body.system || "";
  const fullText = systemText + " " + messagesText;
  const inputTokens = estimateTokens(fullText);
  const maxTokens = body.max_tokens || 4096;

  // Rule 1: Short input + short output = simple task
  if (inputTokens < 300 && maxTokens <= 500) {
    return {
      originalModel,
      routedModel: cheaper,
      reason: "short_io",
      estimatedSavings: calculateSavings(originalModel, cheaper),
    };
  }

  // Rule 2: System prompt matches simple task patterns
  const isSimpleTask = SIMPLE_TASK_PATTERNS.some((p) => p.test(fullText));
  if (isSimpleTask) {
    return {
      originalModel,
      routedModel: cheaper,
      reason: "simple_task_pattern",
      estimatedSavings: calculateSavings(originalModel, cheaper),
    };
  }

  // Rule 3: Single-turn conversation with short input
  if (body.messages && body.messages.length <= 2 && inputTokens < 500) {
    return {
      originalModel,
      routedModel: cheaper,
      reason: "single_turn_short",
      estimatedSavings: calculateSavings(originalModel, cheaper),
    };
  }

  // Default: keep original model
  return {
    originalModel,
    routedModel: originalModel,
    reason: "kept_original",
    estimatedSavings: 0,
  };
}

function calculateSavings(original: string, routed: string): number {
  const origCost = MODEL_COSTS[original];
  const routedCost = MODEL_COSTS[routed];
  if (!origCost || !routedCost) return 0;

  const avgOriginal = (origCost.input + origCost.output) / 2;
  const avgRouted = (routedCost.input + routedCost.output) / 2;
  return Math.round(((avgOriginal - avgRouted) / avgOriginal) * 100);
}

export function getModelCost(model: string): { input: number; output: number } {
  return MODEL_COSTS[model] || { input: 5, output: 15 }; // default estimate
}

export { MODEL_COSTS };

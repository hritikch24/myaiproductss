// Cost calculation for AI API calls
import { MODEL_COSTS } from "./router";

export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const costs = MODEL_COSTS[model] || { input: 5, output: 15 };
  // Costs are per 1M tokens
  const inputCost = (inputTokens / 1_000_000) * costs.input;
  const outputCost = (outputTokens / 1_000_000) * costs.output;
  return inputCost + outputCost;
}

export function estimateTokensFromText(text: string): number {
  return Math.ceil(text.length / 4);
}

export function extractTokenUsage(
  provider: "anthropic" | "openai",
  responseBody: any
): { inputTokens: number; outputTokens: number } {
  if (provider === "anthropic") {
    return {
      inputTokens: responseBody?.usage?.input_tokens || 0,
      outputTokens: responseBody?.usage?.output_tokens || 0,
    };
  }
  // OpenAI
  return {
    inputTokens: responseBody?.usage?.prompt_tokens || 0,
    outputTokens: responseBody?.usage?.completion_tokens || 0,
  };
}

// Request logging and analytics — in-memory for MVP
// Swap with PostgreSQL/ClickHouse in production

export interface RequestLog {
  id: string;
  timestamp: number;
  apiKey: string; // hashed, never stored raw
  provider: "anthropic" | "openai";
  originalModel: string;
  routedModel: string;
  routingReason: string;
  inputTokens: number;
  outputTokens: number;
  originalCost: number; // USD
  actualCost: number; // USD
  savedCost: number; // USD
  cacheHit: boolean;
  latencyMs: number;
  optimizations: string[];
  tokensOptimized: number;
  endpoint: string;
}

// In-memory store (replace with DB in production)
const logs: RequestLog[] = [];
const MAX_LOGS = 100000;

export function logRequest(entry: RequestLog): void {
  if (logs.length >= MAX_LOGS) {
    logs.shift(); // remove oldest
  }
  logs.push(entry);
}

export function getAnalytics(apiKeyHash?: string, days: number = 30) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  let filtered = logs.filter((l) => l.timestamp >= cutoff);

  if (apiKeyHash) {
    filtered = filtered.filter((l) => l.apiKey === apiKeyHash);
  }

  const totalRequests = filtered.length;
  const cacheHits = filtered.filter((l) => l.cacheHit).length;
  const totalOriginalCost = filtered.reduce((sum, l) => sum + l.originalCost, 0);
  const totalActualCost = filtered.reduce((sum, l) => sum + l.actualCost, 0);
  const totalSaved = filtered.reduce((sum, l) => sum + l.savedCost, 0);
  const totalTokensOptimized = filtered.reduce((sum, l) => sum + l.tokensOptimized, 0);

  // Per-model breakdown
  const modelBreakdown: Record<string, { requests: number; originalCost: number; actualCost: number; saved: number }> =
    {};
  for (const log of filtered) {
    const key = log.originalModel;
    if (!modelBreakdown[key]) {
      modelBreakdown[key] = { requests: 0, originalCost: 0, actualCost: 0, saved: 0 };
    }
    modelBreakdown[key].requests++;
    modelBreakdown[key].originalCost += log.originalCost;
    modelBreakdown[key].actualCost += log.actualCost;
    modelBreakdown[key].saved += log.savedCost;
  }

  // Per-day breakdown
  const dailyBreakdown: Record<string, { requests: number; originalCost: number; actualCost: number; saved: number }> =
    {};
  for (const log of filtered) {
    const day = new Date(log.timestamp).toISOString().split("T")[0];
    if (!dailyBreakdown[day]) {
      dailyBreakdown[day] = { requests: 0, originalCost: 0, actualCost: 0, saved: 0 };
    }
    dailyBreakdown[day].requests++;
    dailyBreakdown[day].originalCost += log.originalCost;
    dailyBreakdown[day].actualCost += log.actualCost;
    dailyBreakdown[day].saved += log.savedCost;
  }

  // Savings by method
  const routedRequests = filtered.filter((l) => l.originalModel !== l.routedModel).length;
  const routingSaved = filtered
    .filter((l) => l.originalModel !== l.routedModel)
    .reduce((sum, l) => sum + l.savedCost, 0);
  const cacheSaved = filtered.filter((l) => l.cacheHit).reduce((sum, l) => sum + l.savedCost, 0);
  const optimizationSaved = totalSaved - routingSaved - cacheSaved;

  return {
    totalRequests,
    cacheHits,
    cacheHitRate: totalRequests > 0 ? Math.round((cacheHits / totalRequests) * 100) : 0,
    totalOriginalCost: round(totalOriginalCost),
    totalActualCost: round(totalActualCost),
    totalSaved: round(totalSaved),
    savingsPercent: totalOriginalCost > 0 ? Math.round((totalSaved / totalOriginalCost) * 100) : 0,
    totalTokensOptimized,
    routedRequests,
    savingsByMethod: {
      caching: round(cacheSaved),
      routing: round(routingSaved),
      optimization: round(optimizationSaved),
    },
    modelBreakdown,
    dailyBreakdown,
  };
}

export function getRecentLogs(limit: number = 50): RequestLog[] {
  return logs.slice(-limit).reverse();
}

function round(n: number): number {
  return Math.round(n * 10000) / 10000;
}

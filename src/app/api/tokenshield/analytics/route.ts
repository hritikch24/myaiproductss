import { NextRequest, NextResponse } from "next/server";
import { getAnalytics, getRecentLogs } from "@/lib/tokenshield/logger";
import { hashApiKey } from "@/lib/tokenshield/auth";
import { getCacheStats } from "@/lib/tokenshield/cache";

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key") || req.nextUrl.searchParams.get("key");
  const days = parseInt(req.nextUrl.searchParams.get("days") || "30");
  const apiKeyHash = apiKey ? hashApiKey(apiKey) : undefined;

  return NextResponse.json({
    ...getAnalytics(apiKeyHash, days),
    cacheStats: getCacheStats(),
    recentLogs: getRecentLogs(20).map((l) => ({
      id: l.id, timestamp: l.timestamp, provider: l.provider,
      originalModel: l.originalModel, routedModel: l.routedModel,
      routingReason: l.routingReason, inputTokens: l.inputTokens,
      outputTokens: l.outputTokens, originalCost: l.originalCost,
      actualCost: l.actualCost, savedCost: l.savedCost,
      cacheHit: l.cacheHit, latencyMs: l.latencyMs, optimizations: l.optimizations,
    })),
  });
}

// OpenAI API Proxy — /api/tokenshield/v1/chat/completions
import { NextRequest, NextResponse } from "next/server";
import { generateCacheKey, getCached, setCache } from "@/lib/tokenshield/cache";
import { routeModel } from "@/lib/tokenshield/router";
import { optimizePrompt } from "@/lib/tokenshield/optimizer";
import { calculateCost, extractTokenUsage } from "@/lib/tokenshield/cost";
import { logRequest, type RequestLog } from "@/lib/tokenshield/logger";
import { authenticateRequest, hashApiKey } from "@/lib/tokenshield/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: { message: "Missing auth", type: "auth_error" } }, { status: 401 });
    }

    const rawKey = authHeader.replace(/^Bearer\s+/i, "").trim();
    const customer = authenticateRequest(authHeader);
    const apiKeyHash = hashApiKey(rawKey);
    const openaiKey = customer?.openaiKey || rawKey;

    const body = await req.json();
    const originalModel = body.model || "gpt-4o";

    const noCache = req.headers.get("x-tokenshield-no-cache") === "true";
    const cacheEnabled = customer?.settings.cacheEnabled !== false && !noCache && !body.stream;

    if (cacheEnabled) {
      const cacheKey = generateCacheKey(body);
      const cached = getCached(cacheKey);
      if (cached) {
        const usage = extractTokenUsage("openai", cached);
        const wouldHaveCost = calculateCost(originalModel, usage.inputTokens, usage.outputTokens);
        logRequest({
          id: crypto.randomUUID(), timestamp: Date.now(), apiKey: apiKeyHash,
          provider: "openai", originalModel, routedModel: originalModel,
          routingReason: "cache_hit", inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens, originalCost: wouldHaveCost,
          actualCost: 0, savedCost: wouldHaveCost, cacheHit: true,
          latencyMs: Date.now() - startTime, optimizations: ["cache_hit"],
          tokensOptimized: 0, endpoint: "/v1/chat/completions",
        });
        const response = NextResponse.json(cached);
        response.headers.set("x-tokenshield-cache", "HIT");
        return response;
      }
    }

    let optimizedBody = { ...body };
    let tokensOptimized = 0;
    const optimizations: string[] = [];
    if (customer?.settings.optimizationEnabled !== false) {
      const result = optimizePrompt(body);
      optimizedBody.messages = result.messages;
      tokensOptimized = result.tokensRemoved;
      optimizations.push(...result.optimizations);
    }

    let routedModel = originalModel;
    let routingReason = "kept_original";
    if (customer?.settings.routingEnabled !== false) {
      const routing = routeModel(optimizedBody);
      routedModel = routing.routedModel;
      routingReason = routing.reason;
    }
    optimizedBody.model = routedModel;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
      body: JSON.stringify(optimizedBody),
    });
    const responseBody = await openaiResponse.json();

    const usage = extractTokenUsage("openai", responseBody);
    const originalCost = calculateCost(originalModel, usage.inputTokens, usage.outputTokens);
    const actualCost = calculateCost(routedModel, usage.inputTokens, usage.outputTokens);

    if (cacheEnabled && openaiResponse.ok) setCache(generateCacheKey(body), responseBody);

    logRequest({
      id: crypto.randomUUID(), timestamp: Date.now(), apiKey: apiKeyHash,
      provider: "openai", originalModel, routedModel, routingReason,
      inputTokens: usage.inputTokens, outputTokens: usage.outputTokens,
      originalCost, actualCost, savedCost: originalCost - actualCost, cacheHit: false,
      latencyMs: Date.now() - startTime, optimizations, tokensOptimized,
      endpoint: "/v1/chat/completions",
    });

    return NextResponse.json(responseBody, { status: openaiResponse.status });
  } catch (error: any) {
    return NextResponse.json({ error: { message: error.message, type: "proxy_error" } }, { status: 502 });
  }
}

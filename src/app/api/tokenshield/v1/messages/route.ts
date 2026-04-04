// Anthropic Claude API Proxy — /api/tokenshield/v1/messages
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
    const apiKey = req.headers.get("x-api-key") || req.headers.get("authorization");
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key." }, { status: 401 });
    }

    const rawKey = apiKey.replace(/^Bearer\s+/i, "").trim();
    const customer = authenticateRequest(apiKey);
    const apiKeyHash = hashApiKey(rawKey);
    const anthropicKey = customer?.anthropicKey || rawKey;

    const body = await req.json();
    const originalModel = body.model || "claude-sonnet-4-6";

    // Cache check
    const noCache = req.headers.get("x-tokenshield-no-cache") === "true";
    const cacheEnabled = customer?.settings.cacheEnabled !== false && !noCache;

    if (cacheEnabled) {
      const cacheKey = generateCacheKey(body);
      const cached = getCached(cacheKey);
      if (cached) {
        const usage = extractTokenUsage("anthropic", cached);
        const wouldHaveCost = calculateCost(originalModel, usage.inputTokens, usage.outputTokens);
        logRequest({
          id: crypto.randomUUID(), timestamp: Date.now(), apiKey: apiKeyHash,
          provider: "anthropic", originalModel, routedModel: originalModel,
          routingReason: "cache_hit", inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens, originalCost: wouldHaveCost,
          actualCost: 0, savedCost: wouldHaveCost, cacheHit: true,
          latencyMs: Date.now() - startTime, optimizations: ["cache_hit"],
          tokensOptimized: 0, endpoint: "/v1/messages",
        });
        const response = NextResponse.json(cached);
        response.headers.set("x-tokenshield-cache", "HIT");
        response.headers.set("x-tokenshield-saved", `$${wouldHaveCost.toFixed(6)}`);
        return response;
      }
    }

    // Optimize
    let optimizedBody = { ...body };
    let tokensOptimized = 0;
    const optimizations: string[] = [];
    if (customer?.settings.optimizationEnabled !== false) {
      const result = optimizePrompt(body);
      optimizedBody.messages = result.messages;
      if (result.system !== undefined) optimizedBody.system = result.system;
      tokensOptimized = result.tokensRemoved;
      optimizations.push(...result.optimizations);
    }

    // Route
    let routedModel = originalModel;
    let routingReason = "kept_original";
    const noRoute = req.headers.get("x-tokenshield-no-route") === "true";
    if (customer?.settings.routingEnabled !== false && !noRoute) {
      const routing = routeModel(optimizedBody);
      routedModel = routing.routedModel;
      routingReason = routing.reason;
      if (routedModel !== originalModel) optimizations.push(`routed_to_${routedModel}`);
    }
    optimizedBody.model = routedModel;

    // Forward to Anthropic
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": req.headers.get("anthropic-version") || "2023-06-01",
      },
      body: JSON.stringify(optimizedBody),
    });
    const responseBody = await anthropicResponse.json();

    // Calculate costs
    const usage = extractTokenUsage("anthropic", responseBody);
    const originalCost = calculateCost(originalModel, usage.inputTokens, usage.outputTokens);
    const actualCost = calculateCost(routedModel, usage.inputTokens, usage.outputTokens);
    const savedCost = originalCost - actualCost;

    if (cacheEnabled && anthropicResponse.ok) {
      setCache(generateCacheKey(body), responseBody);
    }

    logRequest({
      id: crypto.randomUUID(), timestamp: Date.now(), apiKey: apiKeyHash,
      provider: "anthropic", originalModel, routedModel, routingReason,
      inputTokens: usage.inputTokens, outputTokens: usage.outputTokens,
      originalCost, actualCost, savedCost, cacheHit: false,
      latencyMs: Date.now() - startTime, optimizations, tokensOptimized,
      endpoint: "/v1/messages",
    });

    const response = NextResponse.json(responseBody, { status: anthropicResponse.status });
    response.headers.set("x-tokenshield-cache", "MISS");
    response.headers.set("x-tokenshield-model", routedModel);
    response.headers.set("x-tokenshield-saved", `$${savedCost.toFixed(6)}`);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: "Proxy error", message: error.message }, { status: 502 });
  }
}

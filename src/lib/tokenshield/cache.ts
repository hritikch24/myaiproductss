import crypto from "crypto";

// In-memory cache for MVP (swap with Redis/Upstash in production)
const cache = new Map<string, { response: any; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour default
const MAX_CACHE_SIZE = 10000;

export function generateCacheKey(body: any): string {
  const relevant = {
    model: body.model,
    messages: body.messages,
    system: body.system,
    temperature: body.temperature,
    tools: body.tools,
  };
  return crypto.createHash("sha256").update(JSON.stringify(relevant)).digest("hex");
}

export function getCached(key: string): any | null {
  const entry = cache.get(key);
  if (!entry) return null;

  // Check TTL
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.response;
}

export function setCache(key: string, response: any): void {
  // Evict oldest if at capacity
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }
  cache.set(key, { response, timestamp: Date.now() });
}

export function getCacheStats() {
  return {
    size: cache.size,
    maxSize: MAX_CACHE_SIZE,
    ttlMs: CACHE_TTL,
  };
}

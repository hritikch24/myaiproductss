// Simple API key auth for TokenShield proxy
// Customers register and get a TokenShield API key
// They also provide their own AI provider keys

import crypto from "crypto";

export interface Customer {
  id: string;
  email: string;
  tokenshieldKey: string; // our key they use to auth with proxy
  anthropicKey?: string;
  openaiKey?: string;
  settings: {
    cacheEnabled: boolean;
    routingEnabled: boolean;
    optimizationEnabled: boolean;
    cacheTtlMinutes: number;
    neverDowngradeModels: string[]; // models to never route to cheaper
    noRouteEndpoints: string[]; // endpoints/tags to never route
  };
  createdAt: number;
}

// In-memory store for MVP
const customers = new Map<string, Customer>();

// Demo customer for testing
const demoCustomer: Customer = {
  id: "demo",
  email: "demo@tokenshield.dev",
  tokenshieldKey: "ts_demo_key_12345",
  settings: {
    cacheEnabled: true,
    routingEnabled: true,
    optimizationEnabled: true,
    cacheTtlMinutes: 60,
    neverDowngradeModels: [],
    noRouteEndpoints: [],
  },
  createdAt: Date.now(),
};
customers.set(demoCustomer.tokenshieldKey, demoCustomer);

export function hashApiKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex").slice(0, 16);
}

export function authenticateRequest(
  authHeader: string | null
): Customer | null {
  if (!authHeader) return null;

  // Support both "Bearer ts_..." and "x-api-key: sk-ant-..." patterns
  const key = authHeader.replace(/^Bearer\s+/i, "").trim();

  // Check if it's a TokenShield key
  if (key.startsWith("ts_")) {
    return customers.get(key) || null;
  }

  // If it's a raw AI provider key, create/find an anonymous customer
  const hash = hashApiKey(key);
  const anonId = `anon_${hash}`;

  if (!customers.has(anonId)) {
    const isAnthropic = key.startsWith("sk-ant-");
    const isOpenAI = key.startsWith("sk-");

    const anon: Customer = {
      id: anonId,
      email: "",
      tokenshieldKey: anonId,
      anthropicKey: isAnthropic ? key : undefined,
      openaiKey: !isAnthropic && isOpenAI ? key : undefined,
      settings: {
        cacheEnabled: true,
        routingEnabled: true,
        optimizationEnabled: true,
        cacheTtlMinutes: 60,
        neverDowngradeModels: [],
        noRouteEndpoints: [],
      },
      createdAt: Date.now(),
    };
    customers.set(anonId, anon);
  }

  return customers.get(anonId) || null;
}

export function registerCustomer(
  email: string,
  anthropicKey?: string,
  openaiKey?: string
): Customer {
  const id = crypto.randomUUID();
  const tokenshieldKey = `ts_${crypto.randomBytes(24).toString("hex")}`;

  const customer: Customer = {
    id,
    email,
    tokenshieldKey,
    anthropicKey,
    openaiKey,
    settings: {
      cacheEnabled: true,
      routingEnabled: true,
      optimizationEnabled: true,
      cacheTtlMinutes: 60,
      neverDowngradeModels: [],
      noRouteEndpoints: [],
    },
    createdAt: Date.now(),
  };

  customers.set(tokenshieldKey, customer);
  return customer;
}

export function getCustomerByKey(key: string): Customer | null {
  return customers.get(key) || null;
}

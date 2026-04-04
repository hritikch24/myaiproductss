"use client";

import { useState, useEffect, useCallback } from "react";

interface Analytics {
  totalRequests: number;
  cacheHits: number;
  cacheHitRate: number;
  totalOriginalCost: number;
  totalActualCost: number;
  totalSaved: number;
  savingsPercent: number;
  totalTokensOptimized: number;
  routedRequests: number;
  savingsByMethod: { caching: number; routing: number; optimization: number };
  modelBreakdown: Record<string, { requests: number; originalCost: number; actualCost: number; saved: number }>;
  recentLogs: Array<{
    id: string; timestamp: number; provider: string; originalModel: string;
    routedModel: string; routingReason: string; inputTokens: number;
    outputTokens: number; originalCost: number; actualCost: number;
    savedCost: number; cacheHit: boolean; latencyMs: number; optimizations: string[];
  }>;
}

function GlassCard({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        boxShadow: glow ? "0 0 40px rgba(0,255,200,0.06)" : "none",
      }}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/tokenshield/analytics?days=${days}`);
      setData(await res.json());
    } catch { /* ignore */ }
    setLoading(false);
  }, [days]);

  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 5000);
    return () => clearInterval(i);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#04060f" }}>
        <div className="animate-pulse text-xl" style={{ color: "#00ffc8" }}>Loading dashboard...</div>
      </div>
    );
  }

  const d = data!;

  return (
    <div className="min-h-screen text-white" style={{ background: "#04060f" }}>
      {/* Grid bg */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Header */}
      <header className="relative z-10 px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/tokenshield" className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-black"
                style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}
              >
                TS
              </div>
              <span className="text-lg font-bold">TokenShield</span>
            </a>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,255,200,0.1)", color: "#00ffc8", border: "1px solid rgba(0,255,200,0.2)" }}>
              Dashboard
            </span>
          </div>
          <div className="flex gap-2">
            {[7, 30, 90].map((n) => (
              <button
                key={n}
                onClick={() => setDays(n)}
                className="px-4 py-2 text-sm rounded-lg transition font-medium"
                style={
                  days === n
                    ? { background: "linear-gradient(135deg, #00ffc8, #00b4d8)", color: "#000" }
                    : { background: "rgba(255,255,255,0.04)", color: "#999", border: "1px solid rgba(255,255,255,0.06)" }
                }
              >
                {n}d
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Hero stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Saved", value: `$${d.totalSaved.toFixed(2)}`, sub: `${d.savingsPercent}% reduction`, color: "#00ffc8" },
            { label: "Without TokenShield", value: `$${d.totalOriginalCost.toFixed(2)}`, sub: "would have paid", color: "#ff5f57" },
            { label: "With TokenShield", value: `$${d.totalActualCost.toFixed(2)}`, sub: "actually paid", color: "#00b4d8" },
            { label: "Total Requests", value: d.totalRequests.toLocaleString(), sub: `${d.cacheHitRate}% cache hit rate`, color: "#7b61ff" },
          ].map((s) => (
            <GlassCard key={s.label} glow={s.color === "#00ffc8"}>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
              <p
                className="text-3xl font-black mt-2 tracking-tight"
                style={{ color: s.color, textShadow: `0 0 20px ${s.color}30` }}
              >
                {s.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
            </GlassCard>
          ))}
        </div>

        {/* Savings breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Saved by Caching", value: d.savingsByMethod.caching, sub: `${d.cacheHits} cache hits`, color: "#00ffc8" },
            { label: "Saved by Routing", value: d.savingsByMethod.routing, sub: `${d.routedRequests} routed`, color: "#00b4d8" },
            { label: "Saved by Optimization", value: d.savingsByMethod.optimization, sub: `${d.totalTokensOptimized} tokens trimmed`, color: "#7b61ff" },
          ].map((s) => (
            <GlassCard key={s.label}>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold mt-2" style={{ color: s.color }}>${s.value.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
            </GlassCard>
          ))}
        </div>

        {/* Model breakdown */}
        <GlassCard>
          <h2 className="text-base font-semibold mb-4 tracking-wide">Cost by Model</h2>
          {Object.keys(d.modelBreakdown).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No requests yet.</p>
              <p className="text-gray-600 text-xs mt-2">Send your first API call through the proxy to see data here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Model", "Requests", "Original", "Actual", "Saved"].map((h) => (
                      <th key={h} className={`py-3 text-xs text-gray-500 uppercase tracking-wider font-medium ${h === "Model" ? "text-left" : "text-right"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(d.modelBreakdown).map(([model, stats]) => (
                    <tr key={model} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td className="py-3 font-mono text-xs text-gray-300">{model}</td>
                      <td className="text-right py-3">{stats.requests}</td>
                      <td className="text-right py-3 text-gray-400">${stats.originalCost.toFixed(4)}</td>
                      <td className="text-right py-3 text-gray-300">${stats.actualCost.toFixed(4)}</td>
                      <td className="text-right py-3" style={{ color: "#00ffc8" }}>${stats.saved.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>

        {/* Recent requests */}
        <GlassCard>
          <h2 className="text-base font-semibold mb-4 tracking-wide">Recent Requests</h2>
          {d.recentLogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Waiting for requests...</p>
              <div className="mt-6 text-left max-w-lg mx-auto">
                <p className="text-xs text-gray-600 mb-2">Quick test with curl:</p>
                <pre className="text-xs p-4 rounded-xl overflow-x-auto font-mono" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "#00ffc8" }}>curl</span>{" -X POST "}<span style={{ color: "#00b4d8" }}>https://kraftai.in/api/tokenshield/v1/messages</span>{" \\\n  -H "}
                  <span className="text-gray-400">{'"x-api-key: YOUR_ANTHROPIC_KEY"'}</span>{" \\\n  -H "}
                  <span className="text-gray-400">{'"Content-Type: application/json"'}</span>{" \\\n  -d "}
                  <span className="text-gray-400">{"'{\"model\":\"claude-sonnet-4-6\",\"max_tokens\":100,\"messages\":[{\"role\":\"user\",\"content\":\"Hi\"}]}'"}</span>
                </pre>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Time", "Model", "Action", "Tokens", "Cost", "Saved", "Latency"].map((h) => (
                      <th key={h} className={`py-3 text-xs text-gray-500 uppercase tracking-wider font-medium ${h === "Time" || h === "Model" || h === "Action" ? "text-left" : "text-right"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.recentLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td className="py-3 text-gray-400 text-xs">{new Date(log.timestamp).toLocaleTimeString()}</td>
                      <td className="py-3 font-mono text-xs">
                        {log.originalModel !== log.routedModel ? (
                          <>
                            <span className="text-gray-600 line-through">{log.originalModel}</span>
                            <span className="mx-1" style={{ color: "#00b4d8" }}>-&gt;</span>
                            <span style={{ color: "#00b4d8" }}>{log.routedModel}</span>
                          </>
                        ) : (
                          <span className="text-gray-300">{log.originalModel}</span>
                        )}
                      </td>
                      <td className="py-3">
                        {log.cacheHit ? (
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(0,255,200,0.1)", color: "#00ffc8", border: "1px solid rgba(0,255,200,0.2)" }}>
                            CACHE
                          </span>
                        ) : log.originalModel !== log.routedModel ? (
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(0,180,216,0.1)", color: "#00b4d8", border: "1px solid rgba(0,180,216,0.2)" }}>
                            ROUTED
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "#666", border: "1px solid rgba(255,255,255,0.06)" }}>
                            DIRECT
                          </span>
                        )}
                      </td>
                      <td className="text-right py-3 text-gray-400 text-xs">{(log.inputTokens + log.outputTokens).toLocaleString()}</td>
                      <td className="text-right py-3 text-xs">${log.actualCost.toFixed(4)}</td>
                      <td className="text-right py-3 text-xs" style={{ color: log.savedCost > 0 ? "#00ffc8" : "#666" }}>
                        {log.savedCost > 0 ? `$${log.savedCost.toFixed(4)}` : "—"}
                      </td>
                      <td className="text-right py-3 text-xs text-gray-400">{log.latencyMs}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>

        {/* Quick setup */}
        <GlassCard glow>
          <h2 className="text-base font-semibold mb-6 tracking-wide">Quick Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Anthropic (Claude)",
                code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: 'your-anthropic-key',
  baseURL: 'https://kraftai.in/api/tokenshield/v1'
});

// Use client normally — TokenShield optimizes every call`,
              },
              {
                title: "OpenAI",
                code: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'your-openai-key',
  baseURL: 'https://kraftai.in/api/tokenshield/v1'
});

// Use client normally — TokenShield optimizes every call`,
              },
            ].map((s) => (
              <div key={s.title}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{s.title}</p>
                <pre
                  className="text-xs p-4 rounded-xl overflow-x-auto font-mono leading-6"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <code className="text-gray-300">{s.code}</code>
                </pre>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: "rgba(0,255,200,0.04)", border: "1px solid rgba(0,255,200,0.1)", color: "#00ffc8" }}>
            Override per-request: <code className="px-1 rounded" style={{ background: "rgba(0,0,0,0.3)" }}>x-tokenshield-no-cache: true</code> or <code className="px-1 rounded" style={{ background: "rgba(0,0,0,0.3)" }}>x-tokenshield-no-route: true</code>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}

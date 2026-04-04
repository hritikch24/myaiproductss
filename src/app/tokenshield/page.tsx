"use client";

import { useState, useRef, useEffect } from "react";

// ─── CHATBOT ────────────────────────────────────────────
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hey! I'm TokenShield AI. Ask me anything — pricing, setup, how the proxy works." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((p) => [...p, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/tokenshield/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "ai", text: data.response }]);
    } catch {
      setMessages((p) => [...p, { role: "ai", text: "Something went wrong. Try again!" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
          boxShadow: "0 0 30px rgba(0,255,200,0.4), 0 0 60px rgba(0,255,200,0.1)",
        }}
      >
        <span className="text-black text-2xl font-bold">{open ? "x" : "AI"}</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[500px] rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "rgba(10,10,30,0.95)",
            border: "1px solid rgba(0,255,200,0.2)",
            boxShadow: "0 0 40px rgba(0,255,200,0.15), inset 0 0 40px rgba(0,255,200,0.03)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{ borderBottom: "1px solid rgba(0,255,200,0.15)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}
            >
              TS
            </div>
            <div>
              <p className="text-white text-sm font-semibold">TokenShield AI</p>
              <p className="text-[10px]" style={{ color: "#00ffc8" }}>
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? {
                          background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
                          color: "#000",
                        }
                      : {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#e0e0e0",
                        }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-2.5 rounded-2xl text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#00ffc8" }}
                >
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3" style={{ borderTop: "1px solid rgba(0,255,200,0.15)" }}>
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about TokenShield..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ─── ANIMATED GRID BACKGROUND ───────────────────────────
function GridBg() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
        style={{
          background: "radial-gradient(ellipse, rgba(0,255,200,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Radial glow bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse, rgba(0,180,216,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Floating orbs */}
      <div
        className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(0,255,200,0.04) 0%, transparent 70%)",
          animationDuration: "4s",
        }}
      />
      <div
        className="absolute top-[60%] right-[15%] w-[200px] h-[200px] rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(0,180,216,0.05) 0%, transparent 70%)",
          animationDuration: "6s",
        }}
      />
    </div>
  );
}

// ─── GLASS CARD ─────────────────────────────────────────
function GlassCard({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-8 ${className}`}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        boxShadow: glow
          ? "0 0 40px rgba(0,255,200,0.08), inset 0 0 40px rgba(0,255,200,0.02)"
          : "0 4px 30px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </div>
  );
}

// ─── NEON STAT ──────────────────────────────────────────
function NeonStat({ value, label, color = "#00ffc8" }: { value: string; label: string; color?: string }) {
  return (
    <div className="text-center">
      <p
        className="text-4xl md:text-5xl font-black tracking-tight"
        style={{ color, textShadow: `0 0 20px ${color}40, 0 0 40px ${color}20` }}
      >
        {value}
      </p>
      <p className="text-sm text-gray-400 mt-2 tracking-wide uppercase">{label}</p>
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────
export default function TokenShieldPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ background: "#04060f" }}>
      <GridBg />

      {/* Nav */}
      <nav className="relative z-10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-black"
              style={{
                background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
                boxShadow: "0 0 20px rgba(0,255,200,0.3)",
              }}
            >
              TS
            </div>
            <span className="text-xl font-bold tracking-tight">TokenShield</span>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full tracking-widest uppercase"
              style={{ background: "rgba(0,255,200,0.1)", color: "#00ffc8", border: "1px solid rgba(0,255,200,0.2)" }}
            >
              Beta
            </span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#how" className="text-sm text-gray-400 hover:text-white transition tracking-wide">
              How
            </a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition tracking-wide">
              Pricing
            </a>
            <a
              href="/tokenshield/dashboard"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl text-black transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}
            >
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-8"
            style={{
              background: "rgba(0,255,200,0.06)",
              border: "1px solid rgba(0,255,200,0.15)",
              color: "#00ffc8",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00ffc8", boxShadow: "0 0 8px #00ffc8" }} />
            Now saving teams 40-60% on AI API costs
          </div>

          <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter">
            <span className="text-white">Your AI bill</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00ffc8, #00b4d8, #7b61ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              cut in half.
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Drop-in proxy for Claude & OpenAI. One line change.
            <br />
            Same results. <span style={{ color: "#00ffc8" }}>40-60% cheaper.</span> Pay only 10% of savings.
          </p>

          {/* CTA */}
          <div className="mt-12">
            {submitted ? (
              <GlassCard glow className="max-w-md mx-auto">
                <p className="text-lg font-semibold" style={{ color: "#00ffc8" }}>
                  You&apos;re in.
                </p>
                <p className="text-gray-400 mt-1 text-sm">We&apos;ll reach out when your slot is ready.</p>
              </GlassCard>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="flex gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-5 py-4 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none transition"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-bold text-sm text-black transition hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
                    boxShadow: "0 0 30px rgba(0,255,200,0.3)",
                  }}
                >
                  Get Early Access
                </button>
              </form>
            )}
          </div>

          {/* Code window */}
          <div className="mt-20 max-w-2xl mx-auto">
            <GlassCard glow>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span className="ml-3 text-[11px] text-gray-500 tracking-wider font-mono">ONE LINE CHANGE</span>
              </div>
              <pre className="text-sm text-left overflow-x-auto font-mono leading-7">
                <code>
                  <span className="text-gray-500">{"// Before — full price"}</span>{"\n"}
                  <span style={{ color: "#7b61ff" }}>const</span>{" "}
                  <span className="text-gray-300">client</span>{" = "}
                  <span style={{ color: "#7b61ff" }}>new</span>{" "}
                  <span style={{ color: "#00b4d8" }}>Anthropic</span>
                  {"({"}{"\n"}
                  {"  "}apiKey: <span style={{ color: "#00ffc8" }}>&apos;sk-ant-...&apos;</span>{"\n"}
                  {"});"}{"\n\n"}
                  <span style={{ color: "#00ffc8" }}>{"// After — 50% cheaper"}</span>{"\n"}
                  <span style={{ color: "#7b61ff" }}>const</span>{" "}
                  <span className="text-gray-300">client</span>{" = "}
                  <span style={{ color: "#7b61ff" }}>new</span>{" "}
                  <span style={{ color: "#00b4d8" }}>Anthropic</span>
                  {"({"}{"\n"}
                  {"  "}apiKey: <span style={{ color: "#00ffc8" }}>&apos;sk-ant-...&apos;</span>,{"\n"}
                  {"  "}
                  <span
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(0,255,200,0.1)",
                      border: "1px solid rgba(0,255,200,0.2)",
                      color: "#00ffc8",
                      textShadow: "0 0 10px rgba(0,255,200,0.3)",
                    }}
                  >
                    baseURL: &apos;https://kraftai.in/api/tokenshield/v1&apos;
                  </span>{"\n"}
                  {"});"}{"\n\n"}
                  <span className="text-gray-500">{"// Same code. Same results. Half the cost."}</span>
                </code>
              </pre>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 px-6 py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          <NeonStat value="0ms" label="Added latency on cache" />
          <NeonStat value="1 line" label="To integrate" color="#00b4d8" />
          <NeonStat value="$0" label="If we save nothing" color="#7b61ff" />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#00ffc8" }}>
            The Engine
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight mb-20">
            Three layers. Zero AI cost.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Smart Cache",
                desc: "SHA-256 hash of inputs. Same request = instant cached response. Zero API call. Most apps see 20-40% cache hits.",
                saving: "20-40%",
                color: "#00ffc8",
              },
              {
                num: "02",
                title: "Model Router",
                desc: "Rule-based routing. Short inputs, classification tasks, single-turn chats get auto-routed to Haiku or GPT-4o-mini. No AI needed to decide.",
                saving: "60-90%",
                color: "#00b4d8",
              },
              {
                num: "03",
                title: "Prompt Trim",
                desc: "Collapse whitespace, truncate old history, deduplicate messages. Fewer tokens in = lower cost. Pure string manipulation.",
                saving: "10-30%",
                color: "#7b61ff",
              },
            ].map((f) => (
              <GlassCard key={f.num} className="group hover:scale-[1.02] transition-transform duration-300">
                <span className="text-sm font-mono tracking-wider" style={{ color: f.color, opacity: 0.5 }}>
                  {f.num}
                </span>
                <h3 className="text-2xl font-bold mt-3 mb-4" style={{ color: f.color }}>
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                <div
                  className="mt-6 inline-block px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: `${f.color}10`,
                    border: `1px solid ${f.color}30`,
                    color: f.color,
                  }}
                >
                  Save {f.saving} per call
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How the proxy flow works */}
      <section className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#00b4d8" }}>
            Architecture
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-center tracking-tight mb-16">
            How your request flows
          </h2>

          <GlassCard glow>
            <pre className="text-sm md:text-base font-mono leading-8 overflow-x-auto">
              <code>
                <span className="text-gray-400">{"Your App"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  │"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  ▼"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"TokenShield Proxy"}</span>
                <span className="text-gray-500">{" ─── kraftai.in/api/tokenshield/v1"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  │"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  ├─"}</span>
                <span className="text-white">{" Cache hit?"}</span>
                <span className="text-gray-400">{" ──▶ Return instantly (cost: $0)"}</span>{"\n"}
                <span style={{ color: "#00b4d8" }}>{"  ├─"}</span>
                <span className="text-white">{" Simple task?"}</span>
                <span className="text-gray-400">{" ──▶ Route to cheaper model"}</span>{"\n"}
                <span style={{ color: "#7b61ff" }}>{"  ├─"}</span>
                <span className="text-white">{" Bloated prompt?"}</span>
                <span className="text-gray-400">{" ──▶ Trim & optimize"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  │"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  ▼"}</span>{"\n"}
                <span className="text-gray-400">{"Claude / OpenAI API"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  │"}</span>{"\n"}
                <span style={{ color: "#00ffc8" }}>{"  ▼"}</span>{"\n"}
                <span className="text-gray-400">{"Response → cached → returned to your app"}</span>
              </code>
            </pre>
          </GlassCard>
        </div>
      </section>

      {/* Savings calculator */}
      <section className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#7b61ff" }}>
            Calculator
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-center tracking-tight mb-16">
            Your potential savings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { spend: "$1K", save: "$400-600", fee: "$40-60", highlight: false },
              { spend: "$10K", save: "$4K-6K", fee: "$400-600", highlight: true },
              { spend: "$50K", save: "$20K-30K", fee: "$2K-3K", highlight: false },
            ].map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-[1.03] ${tier.highlight ? "" : ""}`}
                style={{
                  background: tier.highlight ? "rgba(0,255,200,0.04)" : "rgba(255,255,255,0.02)",
                  border: tier.highlight
                    ? "2px solid rgba(0,255,200,0.2)"
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: tier.highlight ? "0 0 50px rgba(0,255,200,0.08)" : "none",
                }}
              >
                <p className="text-xs text-gray-500 uppercase tracking-widest">Monthly spend</p>
                <p className="text-3xl font-black mt-2 text-white">{tier.spend}<span className="text-gray-500 text-lg">/mo</span></p>
                <div className="my-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                <p className="text-xs text-gray-500 uppercase tracking-widest">We save you</p>
                <p className="text-3xl font-black mt-2" style={{ color: "#00ffc8", textShadow: "0 0 20px rgba(0,255,200,0.3)" }}>
                  {tier.save}
                </p>
                <div className="my-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                <p className="text-xs text-gray-500 uppercase tracking-widest">Our fee (10%)</p>
                <p className="text-xl font-bold mt-2 text-gray-300">{tier.fee}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#00ffc8" }}>
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">
            Zero risk. Always.
          </h2>

          <GlassCard glow className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#00ffc8" }}>
              Pay-for-savings
            </p>
            <p className="text-7xl font-black">
              <span
                style={{
                  background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                10
              </span>
              <span className="text-2xl text-gray-500">%</span>
            </p>
            <p className="text-gray-400 mt-3">of what we save you. Nothing more.</p>

            <div className="mt-10 space-y-4 text-left">
              {[
                "Unlimited API calls",
                "Claude + OpenAI + Gemini support",
                "Smart caching + model routing + prompt trim",
                "Real-time savings dashboard",
                "Custom routing rules",
                "Zero risk — no savings = $0",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "rgba(0,255,200,0.1)", color: "#00ffc8", border: "1px solid rgba(0,255,200,0.2)" }}
                  >
                    +
                  </div>
                  <span className="text-gray-300 text-sm">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-10 w-full py-4 rounded-xl font-bold text-black transition hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
                boxShadow: "0 0 30px rgba(0,255,200,0.3)",
              }}
            >
              Get Early Access
            </button>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold text-black"
              style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}
            >
              TS
            </div>
            <span>TokenShield</span>
          </div>
          <p>
            Built by{" "}
            <span className="text-white">Hritik</span>
            {" "}@ KraftAI
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

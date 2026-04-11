"use client";

import { useState, useRef, useEffect } from "react";

// ════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════

const PREDICTIONS_2028 = [
  {
    id: "agents-code",
    title: "AI agents will write 70% of production code",
    subtitle: "Developers become architects. The IDE becomes a conversation.",
    body: "By 2028, AI won't just autocomplete — it will own entire features end-to-end. Engineers will define intent, review output, and handle edge cases. Junior developer roles will transform into AI-operator roles. The 10x engineer becomes the 100x engineer, not by typing faster, but by directing better.",
    category: "Engineering",
    impact: "Extreme",
    confidence: 85,
    timeframe: "2027-2028",
  },
  {
    id: "ai-drug",
    title: "First fully AI-discovered drug enters Phase 3 trials",
    subtitle: "From molecule design to clinical candidate — zero human hypothesis.",
    body: "AlphaFold was the starting gun. By 2028, an AI system will have designed a novel drug candidate from scratch — identifying the target, designing the molecule, predicting toxicity, and optimizing bioavailability — that reaches late-stage human trials. The pharma industry's $2.6B average cost per drug starts collapsing.",
    category: "Healthcare",
    impact: "Extreme",
    confidence: 70,
    timeframe: "2028",
  },
  {
    id: "realtime-translate",
    title: "Real-time universal translation becomes invisible",
    subtitle: "Earbuds that make language barriers a memory.",
    body: "Not the clunky Google Translate of 2024. We're talking sub-200ms latency, preserving tone, sarcasm, and cultural nuance across 50+ languages. Business meetings, travel, immigration — the friction of language disappears. The geopolitical implications are staggering: talent becomes truly global overnight.",
    category: "Consumer",
    impact: "High",
    confidence: 90,
    timeframe: "2027-2028",
  },
  {
    id: "ai-energy",
    title: "AI datacenters consume more electricity than most countries",
    subtitle: "The hidden cost of intelligence at scale.",
    body: "Training GPT-4 used ~50 GWh. By 2028, frontier model training runs will consume 1-5 TWh each — more than many small nations use in a year. Nuclear SMRs and dedicated AI power plants won't be a Silicon Valley fantasy; they'll be under construction. The carbon math forces a reckoning the industry isn't ready for.",
    category: "Infrastructure",
    impact: "High",
    confidence: 92,
    timeframe: "2027-2028",
  },
  {
    id: "synthetic-media",
    title: "You won't be able to tell what's real anymore",
    subtitle: "AI-generated video, audio, and images reach perfect fidelity.",
    body: "Sora was the demo. By 2028, generating a photorealistic 10-minute video of anyone saying anything will take minutes and cost cents. Elections, journalism, courts, insurance — every institution that relies on 'seeing is believing' will need to rebuild trust infrastructure from scratch. Provenance and watermarking become as critical as encryption.",
    category: "Society",
    impact: "Extreme",
    confidence: 95,
    timeframe: "2027",
  },
  {
    id: "open-source-parity",
    title: "Open-source models match frontier labs on 90% of tasks",
    subtitle: "The moat isn't the model anymore. It's the ecosystem.",
    body: "Llama, Mistral, and their successors will be good enough for almost everything. The gap between open and closed shrinks to specialized reasoning and agentic tasks. OpenAI and Anthropic pivot hard toward platform, enterprise, and safety tooling. The real value shifts from weights to workflows — who can deploy, monitor, and orchestrate AI at scale.",
    category: "Industry",
    impact: "High",
    confidence: 80,
    timeframe: "2028",
  },
  {
    id: "ai-tutor",
    title: "AI tutors outperform human teachers on standardized outcomes",
    subtitle: "Personalized education at near-zero marginal cost.",
    body: "A study in 2028 will show that students using AI tutors for 6+ months score 20-30% higher on standardized tests than the classroom average. Not because AI is smarter than great teachers — but because it's infinitely patient, always available, and adapts in real-time. The debate shifts from 'does it work?' to 'is it equitable?'",
    category: "Education",
    impact: "Extreme",
    confidence: 75,
    timeframe: "2028",
  },
  {
    id: "ai-ciso",
    title: "Every Fortune 500 company has a Chief AI Officer",
    subtitle: "AI governance becomes a board-level function.",
    body: "Not a rebadged CTO. A dedicated C-suite role responsible for AI strategy, risk, compliance (EU AI Act, executive orders), vendor management, and internal capability building. Companies without one will face regulatory scrutiny, insurance premium hikes, and talent flight. AI governance frameworks become as standardized as financial auditing.",
    category: "Enterprise",
    impact: "High",
    confidence: 88,
    timeframe: "2027-2028",
  },
];

const AI_NEWS = [
  {
    id: 1,
    title: "Anthropic's Claude 4.6 sets new benchmark in agentic coding",
    source: "Anthropic",
    category: "Models",
    time: "This week",
    summary: "Claude Opus 4.6 demonstrates near-human performance on complex multi-file software engineering tasks, with a 30% improvement in agentic tool use over previous generations.",
    hot: true,
  },
  {
    id: 2,
    title: "EU AI Act enforcement begins — first compliance deadlines hit",
    source: "European Commission",
    category: "Regulation",
    time: "This month",
    summary: "High-risk AI systems now require conformity assessments. Companies face fines up to 7% of global revenue for non-compliance. The race to build governance tooling has begun.",
    hot: true,
  },
  {
    id: 3,
    title: "Google DeepMind achieves breakthrough in materials discovery",
    source: "Nature",
    category: "Research",
    time: "Recent",
    summary: "GNoME system identifies 2.2 million new stable crystal structures, 380,000 of which are experimentally validated. Accelerates battery, semiconductor, and superconductor research by decades.",
    hot: false,
  },
  {
    id: 4,
    title: "OpenAI launches real-time voice API with emotion detection",
    source: "OpenAI",
    category: "Product",
    time: "This month",
    summary: "Sub-300ms voice-to-voice with emotional tone analysis. Customer service, therapy, and accessibility applications already in pilot with major enterprises.",
    hot: false,
  },
  {
    id: 5,
    title: "India becomes world's third-largest AI talent pool",
    source: "Stanford HAI",
    category: "Talent",
    time: "Recent",
    summary: "India surpasses the UK in AI research output and developer count. Bangalore, Hyderabad, and Delhi-NCR emerge as global AI hubs with 340,000+ AI practitioners.",
    hot: false,
  },
  {
    id: 6,
    title: "AI-generated code now accounts for 25% of all new GitHub commits",
    source: "GitHub",
    category: "Engineering",
    time: "This quarter",
    summary: "Copilot, Claude Code, and Cursor collectively generate a quarter of new code on GitHub. Average developer productivity up 55% year-over-year.",
    hot: true,
  },
];

// ════════════════════════════════════════════════════════
// COMPONENTS
// ════════════════════════════════════════════════════════

function GridBg() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,1) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px]" style={{
        background: "radial-gradient(ellipse, rgba(0,255,200,0.06) 0%, transparent 70%)",
      }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px]" style={{
        background: "radial-gradient(circle, rgba(120,80,255,0.04) 0%, transparent 70%)",
      }} />
    </div>
  );
}

function PredictionCard({ prediction, index }: { prediction: typeof PREDICTIONS_2028[0]; index: number }) {
  const [vote, setVote] = useState<"agree" | "disagree" | null>(null);
  const [agreeCount, setAgreeCount] = useState(Math.floor(Math.random() * 400) + 100);
  const [disagreeCount, setDisagreeCount] = useState(Math.floor(Math.random() * 150) + 30);

  const total = agreeCount + disagreeCount;
  const agreePercent = Math.round((agreeCount / total) * 100);

  const handleVote = (v: "agree" | "disagree") => {
    if (vote) return;
    setVote(v);
    if (v === "agree") setAgreeCount((c) => c + 1);
    else setDisagreeCount((c) => c + 1);
  };

  const impactColors: Record<string, string> = {
    Extreme: "#ff3366",
    High: "#ff9500",
    Medium: "#00b4d8",
  };

  const categoryColors: Record<string, string> = {
    Engineering: "#00ffc8",
    Healthcare: "#ff3366",
    Consumer: "#00b4d8",
    Infrastructure: "#ff9500",
    Society: "#c084fc",
    Industry: "#00ffc8",
    Education: "#fbbf24",
    Enterprise: "#60a5fa",
  };

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
      style={{
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="p-8">
        {/* Header tags */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full" style={{
            color: categoryColors[prediction.category] || "#00ffc8",
            background: `${categoryColors[prediction.category] || "#00ffc8"}10`,
            border: `1px solid ${categoryColors[prediction.category] || "#00ffc8"}25`,
          }}>
            {prediction.category}
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full" style={{
            color: impactColors[prediction.impact],
            background: `${impactColors[prediction.impact]}10`,
            border: `1px solid ${impactColors[prediction.impact]}25`,
          }}>
            {prediction.impact} Impact
          </span>
          <span className="text-[10px] text-gray-500 tracking-wider ml-auto">{prediction.timeframe}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-white mb-2">
          {prediction.title}
        </h3>
        <p className="text-sm text-gray-400 mb-5 italic">{prediction.subtitle}</p>

        {/* Body */}
        <p className="text-sm text-gray-400 leading-relaxed mb-6">{prediction.body}</p>

        {/* Confidence bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Our confidence</span>
            <span className="font-mono" style={{ color: "#00ffc8" }}>{prediction.confidence}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${prediction.confidence}%`,
                background: `linear-gradient(90deg, #00ffc8, ${prediction.confidence > 80 ? "#00b4d8" : "#7b61ff"})`,
                boxShadow: "0 0 10px rgba(0,255,200,0.3)",
              }}
            />
          </div>
        </div>

        {/* Vote section */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} className="pt-5">
          <p className="text-xs text-gray-500 mb-3 tracking-wide">Do you agree this will happen by 2028?</p>
          <div className="flex gap-3">
            <button
              onClick={() => handleVote("agree")}
              disabled={!!vote}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
              style={
                vote === "agree"
                  ? { background: "rgba(0,255,200,0.15)", color: "#00ffc8", border: "1px solid rgba(0,255,200,0.3)" }
                  : vote === "disagree"
                  ? { background: "rgba(255,255,255,0.02)", color: "#555", border: "1px solid rgba(255,255,255,0.04)" }
                  : { background: "rgba(0,255,200,0.06)", color: "#00ffc8", border: "1px solid rgba(0,255,200,0.15)", cursor: "pointer" }
              }
            >
              {vote ? `Agree ${agreePercent}%` : "Agree"}
            </button>
            <button
              onClick={() => handleVote("disagree")}
              disabled={!!vote}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
              style={
                vote === "disagree"
                  ? { background: "rgba(255,51,102,0.15)", color: "#ff3366", border: "1px solid rgba(255,51,102,0.3)" }
                  : vote === "agree"
                  ? { background: "rgba(255,255,255,0.02)", color: "#555", border: "1px solid rgba(255,255,255,0.04)" }
                  : { background: "rgba(255,51,102,0.06)", color: "#ff3366", border: "1px solid rgba(255,51,102,0.15)", cursor: "pointer" }
              }
            >
              {vote ? `Disagree ${100 - agreePercent}%` : "Disagree"}
            </button>
          </div>
          {vote && (
            <div className="mt-3 h-1.5 rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="h-full rounded-l-full transition-all duration-700" style={{ width: `${agreePercent}%`, background: "#00ffc8" }} />
              <div className="h-full rounded-r-full transition-all duration-700" style={{ width: `${100 - agreePercent}%`, background: "#ff3366" }} />
            </div>
          )}
          {vote && <p className="text-[11px] text-gray-600 mt-2">{total + 1} votes</p>}
        </div>
      </div>
    </div>
  );
}

function NewsCard({ article }: { article: typeof AI_NEWS[0] }) {
  const catColors: Record<string, string> = {
    Models: "#00ffc8",
    Regulation: "#ff9500",
    Research: "#c084fc",
    Product: "#00b4d8",
    Talent: "#fbbf24",
    Engineering: "#60a5fa",
  };

  return (
    <div
      className="rounded-xl p-6 transition-all duration-300 hover:scale-[1.01] group"
      style={{
        background: "rgba(255,255,255,0.015)",
        border: article.hot ? "1px solid rgba(255,51,102,0.15)" : "1px solid rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full" style={{
          color: catColors[article.category] || "#00ffc8",
          background: `${catColors[article.category] || "#00ffc8"}10`,
          border: `1px solid ${catColors[article.category] || "#00ffc8"}20`,
        }}>
          {article.category}
        </span>
        {article.hot && (
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full" style={{
            color: "#ff3366", background: "rgba(255,51,102,0.1)", border: "1px solid rgba(255,51,102,0.2)",
          }}>
            Hot
          </span>
        )}
        <span className="text-[10px] text-gray-600 ml-auto">{article.time}</span>
      </div>
      <h4 className="text-base font-semibold text-white leading-snug mb-2 group-hover:text-[#00ffc8] transition-colors">
        {article.title}
      </h4>
      <p className="text-xs text-gray-500 leading-relaxed mb-3">{article.summary}</p>
      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Source: {article.source}</p>
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Ask me anything about AI — trends, predictions, or TokenShield." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

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
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
          boxShadow: "0 0 30px rgba(0,255,200,0.4), 0 0 60px rgba(0,255,200,0.1)",
        }}
      >
        <span className="text-black text-lg font-black">{open ? "X" : "AI"}</span>
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[500px] rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "rgba(10,10,30,0.95)", border: "1px solid rgba(0,255,200,0.15)",
            boxShadow: "0 0 40px rgba(0,255,200,0.12)", backdropFilter: "blur(20px)",
          }}
        >
          <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(0,255,200,0.1)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-black" style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}>AI</div>
            <div>
              <p className="text-white text-sm font-semibold">KraftAI Assistant</p>
              <p className="text-[10px]" style={{ color: "#00ffc8" }}>Online</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed" style={
                  m.role === "user"
                    ? { background: "linear-gradient(135deg, #00ffc8, #00b4d8)", color: "#000" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#e0e0e0" }
                }>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl text-sm animate-pulse" style={{ background: "rgba(255,255,255,0.05)", color: "#00ffc8" }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="p-3" style={{ borderTop: "1px solid rgba(0,255,200,0.1)" }}>
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about AI..." className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
              <button type="submit" className="px-4 py-2.5 rounded-xl text-sm font-semibold text-black" style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}>Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════

export default function TokenShieldPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen text-white relative" style={{ background: "#04060f" }}>
      <GridBg />

      {/* Nav */}
      <nav className="relative z-10 px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-black" style={{
              background: "linear-gradient(135deg, #00ffc8, #00b4d8)", boxShadow: "0 0 20px rgba(0,255,200,0.25)",
            }}>K</div>
            <div>
              <span className="text-lg font-bold tracking-tight">KraftAI</span>
              <span className="text-gray-500 text-sm ml-2 hidden md:inline">/ Intelligence</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#predictions" className="text-sm text-gray-400 hover:text-white transition">Predictions</a>
            <a href="#news" className="text-sm text-gray-400 hover:text-white transition">News</a>
            <a href="#tools" className="text-sm text-gray-400 hover:text-white transition">Tools</a>
            <a href="/tokenshield/dashboard" className="text-sm font-semibold px-5 py-2.5 rounded-xl text-black" style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}>
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-8" style={{
            background: "rgba(0,255,200,0.05)", border: "1px solid rgba(0,255,200,0.12)", color: "#00ffc8",
          }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00ffc8", boxShadow: "0 0 6px #00ffc8" }} />
            The state of AI — curated by KraftAI
          </div>

          <h1 className="text-5xl md:text-8xl font-black leading-[0.92] tracking-tighter">
            <span className="text-white">What happens</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00ffc8, #00b4d8, #7b61ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              when AI grows up?
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Bold predictions for 2028. Curated AI news. No hype, no fluff — just the signal that matters.
            <br />
            <span style={{ color: "#00ffc8" }}>Vote on predictions. Shape the conversation.</span>
          </p>

          {/* Subscribe */}
          <div className="mt-10">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl" style={{
                background: "rgba(0,255,200,0.06)", border: "1px solid rgba(0,255,200,0.15)", color: "#00ffc8",
              }}>
                Subscribed. We&apos;ll send you the signal weekly.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex gap-3 max-w-lg mx-auto">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                  className="flex-1 px-5 py-4 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none transition"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                />
                <button type="submit" className="px-8 py-4 rounded-xl font-bold text-sm text-black transition hover:opacity-90" style={{
                  background: "linear-gradient(135deg, #00ffc8, #00b4d8)", boxShadow: "0 0 25px rgba(0,255,200,0.25)",
                }}>
                  Get Weekly Signal
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Predictions */}
      <section id="predictions" className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00ffc8" }}>Predictions</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                2028: What we believe
              </h2>
            </div>
            <p className="text-sm text-gray-500 hidden md:block max-w-xs text-right">
              Each prediction includes our confidence level. Vote to add yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PREDICTIONS_2028.map((p, i) => (
              <PredictionCard key={p.id} prediction={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00b4d8" }}>Signal</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">AI news that matters</h2>
            </div>
            <p className="text-sm text-gray-500 hidden md:block">Curated. No noise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_NEWS.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools / TokenShield */}
      <section id="tools" className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#7b61ff" }}>Tools</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">Built by KraftAI</h2>

          {/* TokenShield card */}
          <div className="rounded-2xl overflow-hidden" style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,255,200,0.1)",
            boxShadow: "0 0 60px rgba(0,255,200,0.05)",
          }}>
            <div className="p-10 md:p-14">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-black" style={{
                  background: "linear-gradient(135deg, #00ffc8, #00b4d8)",
                }}>TS</div>
                <div>
                  <h3 className="text-2xl font-black">TokenShield</h3>
                  <p className="text-sm text-gray-400">AI API Cost Optimization Proxy</p>
                </div>
                <span className="ml-auto text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full" style={{
                  color: "#00ffc8", background: "rgba(0,255,200,0.08)", border: "1px solid rgba(0,255,200,0.15)",
                }}>Live</span>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                Drop-in proxy for Claude & OpenAI. Change one line of code, save 40-60% on API costs.
                Smart caching, model routing, prompt optimization — zero AI cost on our end.
                <span className="block mt-2" style={{ color: "#00ffc8" }}>You only pay 10% of what we save. No savings = $0.</span>
              </p>

              {/* Code snippet */}
              <div className="rounded-xl overflow-hidden mb-8" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                  <span className="ml-2 text-[10px] text-gray-600 tracking-wider font-mono">ONE LINE CHANGE</span>
                </div>
                <pre className="p-6 text-sm font-mono leading-7 overflow-x-auto"><code>
                  <span className="text-gray-500">{"// Add baseURL — that's it"}</span>{"\n"}
                  <span style={{ color: "#7b61ff" }}>const</span>{" client = "}
                  <span style={{ color: "#7b61ff" }}>new</span>{" "}
                  <span style={{ color: "#00b4d8" }}>Anthropic</span>{"({"}{"\n"}
                  {"  apiKey: "}<span style={{ color: "#00ffc8" }}>&apos;sk-ant-...&apos;</span>,{"\n"}
                  {"  "}<span className="px-1 py-0.5 rounded" style={{ background: "rgba(0,255,200,0.08)", color: "#00ffc8" }}>
                    baseURL: &apos;https://kraftai.in/api/tokenshield/v1&apos;
                  </span>{"\n"}
                  {"});"}{"\n"}
                  <span className="text-gray-600">{"// Same results. 50% cheaper."}</span>
                </code></pre>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "0ms", label: "Latency on cache hit", color: "#00ffc8" },
                  { value: "40-60%", label: "Average savings", color: "#00b4d8" },
                  { value: "$0", label: "If we save nothing", color: "#7b61ff" },
                ].map((s) => (
                  <div key={s.label} className="text-center py-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <p className="text-2xl font-black" style={{ color: s.color, textShadow: `0 0 15px ${s.color}30` }}>{s.value}</p>
                    <p className="text-[11px] text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <a href="/tokenshield/dashboard" className="inline-block px-8 py-4 rounded-xl font-bold text-sm text-black transition hover:opacity-90" style={{
                background: "linear-gradient(135deg, #00ffc8, #00b4d8)", boxShadow: "0 0 25px rgba(0,255,200,0.25)",
              }}>
                Open Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            The future is being built now.
          </h2>
          <p className="text-gray-400 mb-8">Get the weekly AI signal — predictions, breakthroughs, and tools. No spam. Pure signal.</p>
          {subscribed ? (
            <p style={{ color: "#00ffc8" }} className="text-sm">You&apos;re in. First issue lands this week.</p>
          ) : (
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="px-8 py-4 rounded-xl font-bold text-sm text-black" style={{
              background: "linear-gradient(135deg, #00ffc8, #00b4d8)", boxShadow: "0 0 25px rgba(0,255,200,0.25)",
            }}>
              Subscribe to KraftAI Intelligence
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold text-black" style={{ background: "linear-gradient(135deg, #00ffc8, #00b4d8)" }}>K</div>
            <span>KraftAI Intelligence</span>
          </div>
          <p>Curated by <span className="text-gray-400">Hritik</span></p>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

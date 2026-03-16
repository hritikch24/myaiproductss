import Link from "next/link";
import { ArrowLeft, Brain, Bot, Sparkles, ChevronRight, ChevronLeft, Hexagon, Cpu, Rocket, MessageCircle, Mail, Mic, MessageSquare, Image, TrendingUp, Shield, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Development Company India | Artificial Intelligence Solutions",
  description: "Professional AI development services in India. Chatbot development, machine learning, computer vision, voice AI. Integrate smart AI features into your products. Free consultation.",
  keywords: ["AI development company India", "artificial intelligence services", "machine learning development", "chatbot development India", "AI solutions business", "computer vision development", "voice AI"],
  metadataBase: new URL("https://kraftai.in"),
};

const themes = [
  {
    id: "smart-chat",
    name: "Smart Chatbot",
    desc: "AI-powered customer support chatbot",
    colors: ["#8b5cf6", "#a855f7", "#c084fc"],
    features: ["24/7 support", "Learn from data", "Multi-language", "Voice support"],
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    desc: "Personal AI assistant for your users",
    colors: ["#06b6d4", "#0891b2", "#0e7490"],
    features: ["Task automation", "Smart suggestions", "Personalization", "Context awareness"],
  },
  {
    id: "voice-ai",
    name: "Voice AI",
    desc: "Voice-enabled interfaces",
    colors: ["#f472b6", "#ec4899", "#db2777"],
    features: ["Voice commands", "Speech synthesis", "Real-time transcription", "Multi-voice"],
  },
  {
    id: "image-ai",
    name: "Image AI",
    desc: "AI image generation & processing",
    colors: ["#f59e0b", "#fbbf24", "#fcd34d"],
    features: ["Image generation", "Style transfer", "Upscaling", "Background removal"],
  },
  {
    id: "predictive",
    name: "Predictive AI",
    desc: "AI analytics & predictions",
    colors: ["#22c55e", "#16a34a", "#15803d"],
    features: ["Trend prediction", "User behavior", "Recommendations", "Forecasting"],
  },
  {
    id: "security-ai",
    name: "Security AI",
    desc: "AI-powered security & fraud detection",
    colors: ["#ef4444", "#f87171", "#fca5a5"],
    features: ["Fraud detection", "Anomaly detection", "Threat prevention", "Auto-response"],
  },
];

export default function AISolutionsPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(6,182,212,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial_gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <Hexagon className="w-10 h-10 text-purple-400 fill-purple-400/20" />
          <Cpu className="absolute inset-2 w-4 h-4 text-cyan-400" />
          <span className="text-2xl font-bold">Kraft<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span></span>
        </div>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
            <Brain className="w-4 h-4" />
            <span>AI Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">Artificial</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Intelligence</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Smart AI-powered features that make your products smarter, faster, and more powerful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 p-8">
                <div className="flex gap-2 mb-4">
                  {theme.colors.map((color, cidx) => (
                    <div key={cidx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{theme.name}</h3>
                <p className="text-slate-400 mb-4">{theme.desc}</p>
                <ul className="space-y-2 mb-6">
                  {theme.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/ai-solutions/${theme.id}`}>
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">AI Technologies We Use</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Bot, title: "GPT/LLMs", desc: "Language models" },
              { icon: Mic, title: "Voice AI", desc: "Speech processing" },
              { icon: Image, title: "Computer Vision", desc: "Image AI" },
              { icon: TrendingUp, title: "ML Models", desc: "Custom learning" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-cyan-900/40 border border-white/10 backdrop-blur-xl text-center">
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Make Your Product Smart</h2>
          <p className="text-slate-300 mb-6">Integrate AI into your existing product or build something new.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-full font-semibold">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-semibold">
              <Mail className="w-5 h-5" />
              Email
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p>© {new Date().getFullYear()} KraftAI. Built for the future.</p>
        </div>
      </footer>
    </div>
  );
}

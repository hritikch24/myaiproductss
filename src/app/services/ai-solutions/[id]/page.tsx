import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Bot, Send, User, Mic, Image, TrendingUp, Shield, MessageCircle } from "lucide-react";

const aiData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
}> = {
  "smart-chat": { name: "Smart Chatbot", desc: "AI-powered customer support", colors: ["#8b5cf6", "#a855f7", "#c084fc"], features: ["24/7 support", "Learn from data", "Multi-language"] },
  "ai-assistant": { name: "AI Assistant", desc: "Personal AI assistant", colors: ["#06b6d4", "#0891b2", "#0e7490"], features: ["Task automation", "Smart suggestions", "Personalization"] },
  "voice-ai": { name: "Voice AI", desc: "Voice-enabled interfaces", colors: ["#f472b6", "#ec4899", "#db2777"], features: ["Voice commands", "Speech synthesis", "Real-time transcription"] },
  "image-ai": { name: "Image AI", desc: "AI image generation", colors: ["#f59e0b", "#fbbf24", "#fcd34d"], features: ["Image generation", "Style transfer", "Upscaling"] },
  "predictive": { name: "Predictive AI", desc: "AI analytics & predictions", colors: ["#22c55e", "#16a34a", "#15803d"], features: ["Trend prediction", "User behavior", "Forecasting"] },
  "security-ai": { name: "Security AI", desc: "AI-powered security", colors: ["#ef4444", "#f87171", "#fca5a5"], features: ["Fraud detection", "Anomaly detection", "Threat prevention"] },
};

export default function AIPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "smart-chat";
  const theme = aiData[id] || aiData["smart-chat"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />

      <nav className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Link href="/services/ai-solutions" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <Hexagon className="w-6 h-6 md:w-8 md:h-8 text-purple-400 fill-purple-400/20" />
          <span className="font-bold text-sm md:text-base">KraftAI</span>
        </div>
      </nav>

      <div className="relative z-10 px-4 md:px-6 py-6 md:py-8 text-center">
        <div className="flex justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 md:w-10 md:h-10 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{theme.name}</h1>
        <p className="text-slate-400 text-sm md:text-base px-4">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-4 md:px-6 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-slate-300">{feature}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-2 md:px-6 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-t-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a15]">
            <div className="p-3 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm md:text-base">AI Assistant</p>
                  <p className="text-xs md:text-sm" style={{ color: theme.colors[0] }}>Online</p>
                </div>
              </div>

              <div className="space-y-3 mb-4 h-48 md:h-64 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 bg-purple-500/30 flex items-center justify-center">
                    <Bot className="w-4 h-4" style={{ color: theme.colors[0] }} />
                  </div>
                  <div className="p-3 rounded-2xl max-w-[80%]" style={{ backgroundColor: `${theme.colors[0]}20`, border: `1px solid ${theme.colors[0]}30` }}>
                    <p className="text-xs md:text-sm">Hello! How can I help you today?</p>
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 bg-cyan-500/30 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl max-w-[80%]" style={{ backgroundColor: `${theme.colors[1]}20`, border: `1px solid ${theme.colors[1]}30` }}>
                    <p className="text-xs md:text-sm">I need help with my order</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 bg-purple-500/30 flex items-center justify-center">
                    <Bot className="w-4 h-4" style={{ color: theme.colors[0] }} />
                  </div>
                  <div className="p-3 rounded-2xl max-w-[80%]" style={{ backgroundColor: `${theme.colors[0]}20`, border: `1px solid ${theme.colors[0]}30` }}>
                    <p className="text-xs md:text-sm">Of course! I can help you track your order. Could you please share your order number?</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs md:text-sm"
                />
                <button className="p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                  <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-8 md:pb-16 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-sm md:text-lg hover:scale-105 transition-transform">
          Get This AI <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    </div>
  );
}

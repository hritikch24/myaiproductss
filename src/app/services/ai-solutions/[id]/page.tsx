import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Brain, Bot, Mic, Image as ImageIcon, TrendingUp, Shield, MessageCircle, Send, User, ChevronRight } from "lucide-react";

const aiData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  element: React.ReactNode;
}> = {
  "smart-chat": {
    name: "Smart Chatbot",
    desc: "AI-powered customer support chatbot",
    colors: ["#8b5cf6", "#a855f7", "#c084fc"],
    element: <SmartChatbot />,
  },
  "ai-assistant": {
    name: "AI Assistant",
    desc: "Personal AI assistant for your users",
    colors: ["#06b6d4", "#0891b2", "#0e7490"],
    element: <AIAssistant />,
  },
  "voice-ai": {
    name: "Voice AI",
    desc: "Voice-enabled interfaces",
    colors: ["#f472b6", "#ec4899", "#db2777"],
    element: <VoiceAI />,
  },
  "image-ai": {
    name: "Image AI",
    desc: "AI image generation & processing",
    colors: ["#f59e0b", "#fbbf24", "#fcd34d"],
    element: <ImageAI />,
  },
  "predictive": {
    name: "Predictive AI",
    desc: "AI analytics & predictions",
    colors: ["#22c55e", "#16a34a", "#15803d"],
    element: <PredictiveAI />,
  },
  "security-ai": {
    name: "Security AI",
    desc: "AI-powered security & fraud detection",
    colors: ["#ef4444", "#f87171", "#fca5a5"],
    element: <SecurityAI />,
  },
};

export default function AIPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "smart-chat";
  const theme = aiData[id] || aiData["smart-chat"];

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/services/ai-solutions" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" /> Back to Themes
        </Link>
        <div className="flex items-center gap-3">
          <Hexagon className="w-8 h-8 text-purple-400 fill-purple-400/20" />
          <span className="font-bold">KraftAI</span>
        </div>
      </nav>

      <div className="px-6 py-8 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-10 h-10 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">{theme.name}</h1>
        <p className="text-slate-400">{theme.desc}</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {theme.element}
        </div>
      </div>

      <div className="text-center pb-16">
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold hover:scale-105 transition-transform">
          Get This AI <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function SmartChatbot() {
  return (
    <div className="bg-[#0a0a15] p-6 min-h-[400px] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-medium">AI Assistant</p>
          <p className="text-purple-400 text-xs">Online</p>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/30 flex-shrink-0" />
          <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 max-w-[80%]">
            <p className="text-white text-sm">Hello! How can I help you today?</p>
          </div>
        </div>
        <div className="flex gap-3 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-cyan-500/30 flex-shrink-0" />
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 max-w-[80%]">
            <p className="text-white text-sm">I need help with my order</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/30 flex-shrink-0" />
          <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 max-w-[80%]">
            <p className="text-white text-sm">Of course! I can help you track your order. Could you please share your order number?</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <input type="text" placeholder="Type your message..." className="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm" />
        <button className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

function AIAssistant() {
  return (
    <div className="bg-[#0a1520] p-6 min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-cyan-400">AI Assistant</span>
        <div className="flex gap-2">
          {['⚡', '🎯', '💡'].map((icon, i) => (
            <span key={i} className="text-xl">{icon}</span>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {[
          { title: 'Schedule Meeting', desc: 'With team at 3pm', status: 'Done' },
          { title: 'Draft Email', desc: 'To client about project', status: 'In Progress' },
          { title: 'Analyze Data', desc: 'Q4 sales report', status: 'Pending' },
        ].map((task, i) => (
          <div key={i} className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-medium">{task.title}</p>
              <span className={`text-xs px-2 py-1 rounded ${task.status === 'Done' ? 'bg-green-500/20 text-green-400' : task.status === 'In Progress' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-500/20 text-slate-400'}`}>
                {task.status}
              </span>
            </div>
            <p className="text-cyan-400 text-sm">{task.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceAI() {
  return (
    <div className="bg-[#120a15] p-6 min-h-[400px] flex flex-col items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-6 animate-pulse">
        <Mic className="w-10 h-10 text-white" />
      </div>
      <p className="text-white font-medium mb-2">Listening...</p>
      <p className="text-pink-400 text-sm mb-6">Speak now</p>
      <div className="w-full space-y-3">
        <div className="p-3 rounded-xl bg-white/5 border border-pink-500/20">
          <p className="text-white text-sm">"What's the weather today?"</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-pink-500/20">
          <p className="text-pink-400 text-sm">"It's sunny, 28°C in your area."</p>
        </div>
      </div>
    </div>
  );
}

function ImageAI() {
  return (
    <div className="bg-[#120f0a] p-6 min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-amber-400">Image AI</span>
        <button className="px-4 py-2 bg-amber-500 text-black rounded-lg text-sm">+ Generate</button>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-amber-400" />
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <p className="text-amber-400 text-sm mb-2">Prompt:</p>
        <p className="text-white text-sm">A futuristic city with neon lights at night...</p>
      </div>
    </div>
  );
}

function PredictiveAI() {
  return (
    <div className="bg-[#0a1509] p-6 min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-green-400">Predictive AI</span>
        <span className="text-green-400 text-sm">Live</span>
      </div>
      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-2">Sales Forecast</p>
        <div className="flex items-end gap-1 h-24">
          {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100, 85, 95].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Jan</span><span>Dec</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-400 text-xs">Accuracy</p>
          <p className="text-white text-xl font-bold">94%</p>
        </div>
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-400 text-xs">Trend</p>
          <p className="text-white text-xl font-bold">+23%</p>
        </div>
      </div>
    </div>
  );
}

function SecurityAI() {
  return (
    <div className="bg-[#150a0a] p-6 min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-red-400">Security AI</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm">Protected</span>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {[
          { type: 'Threat', level: 'High', desc: 'Unusual login attempt detected' },
          { type: 'Alert', level: 'Medium', desc: 'Multiple failed password attempts' },
          { type: 'Info', level: 'Low', desc: 'New device authorized' },
        ].map((alert, i) => (
          <div key={i} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-sm font-medium">{alert.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${alert.level === 'High' ? 'bg-red-500/30 text-red-400' : alert.level === 'Medium' ? 'bg-yellow-500/30 text-yellow-400' : 'bg-blue-500/30 text-blue-400'}`}>
                  {alert.level}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">{alert.desc}</p>
            </div>
            <Shield className="w-5 h-5 text-red-400" />
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-slate-800">
        <p className="text-slate-400 text-xs mb-1">System Status</p>
        <p className="text-green-400 text-sm">All systems secure</p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Home, User, Settings, Bell, Search, Plus, Heart, MessageSquare, ChevronRight } from "lucide-react";

const mobileData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  element: React.ReactNode;
}> = {
  "neon-app": {
    name: "Neon Pulse",
    desc: "High-energy app with vibrant neon accents",
    colors: ["#22d3ee", "#a855f7", "#f472b6"],
    element: <NeonApp />,
  },
  "dark-elegant": {
    name: "Dark Elegant",
    desc: "Premium dark theme with subtle gradients",
    colors: ["#6366f1", "#8b5cf6", "#a78bfa"],
    element: <DarkElegantApp />,
  },
  "glassmorphism": {
    name: "Glass Touch",
    desc: "iOS-inspired glassmorphism design",
    colors: ["#3b82f6", "#0ea5e9", "#06b6d4"],
    element: <GlassApp />,
  },
  "cyber": {
    name: "Cyber Interface",
    desc: "Futuristic cyberpunk-inspired mobile UI",
    colors: ["#ef4444", "#f97316", "#eab308"],
    element: <CyberApp />,
  },
  "nature": {
    name: "Organic Flow",
    desc: "Nature-inspired calming design",
    colors: ["#22c55e", "#10b981", "#14b8a6"],
    element: <NatureApp />,
  },
  "minimal-2050": {
    name: "Minimal 2050",
    desc: "Ultra-minimal futuristic design",
    colors: ["#f8fafc", "#94a3b8", "#475569"],
    element: <MinimalApp />,
  },
};

export default function MobilePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "neon-app";
  const theme = mobileData[id] || mobileData["neon-app"];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-8">
      <nav className="w-full max-w-md flex items-center justify-between px-6 py-4 border-b border-white/10 mb-4">
        <Link href="/services/mobile-apps" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" /> Back
        </Link>
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
          <span className="font-bold text-sm">KraftAI</span>
        </div>
      </nav>

      <div className="text-center mb-6">
        <div className="flex justify-center gap-2 mb-2">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-6 h-6 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-2xl font-bold text-white">{theme.name}</h1>
        <p className="text-slate-400 text-sm">{theme.desc}</p>
      </div>

      <div className="rounded-[3rem] overflow-hidden border-8 border-slate-800 shadow-2xl" style={{ width: '280px', height: '580px' }}>
        {theme.element}
      </div>

      <div className="mt-8">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-semibold">
          Get This App <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function NeonApp() {
  return (
    <div className="bg-[#0a0a12] h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold text-cyan-400">Neon</span>
        <Bell className="w-5 h-5 text-pink-500" />
      </div>
      <div className="flex-1">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 mb-4">
          <h2 className="text-white font-bold text-xl">Welcome Back</h2>
          <p className="text-cyan-400 text-sm">Ready to explore?</p>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-pink-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Item {i}</p>
                <p className="text-cyan-400 text-xs">Description</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-around py-3 border-t border-white/10">
        <Home className="w-6 h-6 text-cyan-400" />
        <Search className="w-6 h-6 text-slate-500" />
        <Plus className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 p-1" />
        <Heart className="w-6 h-6 text-slate-500" />
        <User className="w-6 h-6 text-slate-500" />
      </div>
    </div>
  );
}

function DarkElegantApp() {
  return (
    <div className="bg-[#0f0f15] h-full p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
        <div>
          <p className="text-white font-medium">Hello</p>
          <p className="text-slate-400 text-xs">Premium User</p>
        </div>
      </div>
      <div className="flex-1 space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 rounded-2xl bg-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Card {i}</span>
              <span className="text-purple-400 text-sm">→</span>
            </div>
            <p className="text-slate-500 text-xs">Additional info here</p>
          </div>
        ))}
      </div>
      <div className="flex justify-around py-3">
        {[Home, Heart, Settings].map((Icon, i) => (
          <Icon key={i} className="w-6 h-6 text-slate-400" />
        ))}
      </div>
    </div>
  );
}

function GlassApp() {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <span className="text-white font-semibold">Glass UI</span>
        <Bell className="w-5 h-5 text-white/80" />
      </div>
      <div className="flex-1 space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
            <p className="text-white font-medium">Item {i}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-around py-4 bg-white/20 backdrop-blur-md rounded-2xl">
        {[Home, Search, Plus, Heart, User].map((Icon, i) => (
          <Icon key={i} className="w-6 h-6 text-white" />
        ))}
      </div>
    </div>
  );
}

function CyberApp() {
  return (
    <div className="bg-black h-full p-3 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-red-500">CYBER</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
        </div>
      </div>
      <div className="flex-1">
        <div className="p-3 mb-3 border border-red-500/30 bg-red-500/5">
          <p className="text-red-400 text-xs font-mono">&gt;&gt; SYSTEM ONLINE</p>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-3 rounded border-l-2 border-orange-500 bg-orange-500/5">
              <p className="text-white text-sm font-mono">DATA_{i}</p>
              <p className="text-orange-400 text-xs">ACCESSED</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 py-2 border-t border-slate-800">
        {['⚡', '⌘', '⬡', '⚙'].map((icon, i) => (
          <div key={i} className="text-center text-slate-500 text-lg">{icon}</div>
        ))}
      </div>
    </div>
  );
}

function NatureApp() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-emerald-100 h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-serif text-green-800">Organic</span>
        <User className="w-6 h-6 text-green-700" />
      </div>
      <div className="flex-1 space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-4 rounded-2xl bg-white/80 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100" />
            <div>
              <p className="text-green-900 font-medium">Natural Item {i}</p>
              <p className="text-green-600 text-xs">Pure & simple</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-around py-3 bg-white/60 rounded-2xl">
        {['🏠', '🔍', '＋', '♥', '👤'].map((icon, i) => (
          <span key={i} className="text-xl">{icon}</span>
        ))}
      </div>
    </div>
  );
}

function MinimalApp() {
  return (
    <div className="bg-white h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <span className="text-lg font-medium">App</span>
        <div className="w-8 h-8 rounded-full bg-slate-200" />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-light text-slate-900 mb-2">Hello.</h1>
        <p className="text-slate-500 mb-6">What would you like to see?</p>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
              <span className="text-slate-800">Item {i}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-around py-3 border-t">
        {['●', '○', '○', '○'].map((dot, i) => (
          <span key={i} className={`text-lg ${i === 0 ? 'text-black' : 'text-slate-300'}`}>{dot}</span>
        ))}
      </div>
    </div>
  );
}

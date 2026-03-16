import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Cpu, Sparkles, Menu, X, ChevronRight, User, ShoppingCart, Search, Bell, Home, Settings, CreditCard, Star, MapPin, Phone, Mail, Clock, Check, Star as StarFilled } from "lucide-react";

const themesData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  elements: React.ReactNode;
}> = {
  "cyberpunk": {
    name: "Cyberpunk 2077",
    desc: "Neon lights, dark backgrounds, holographic elements",
    colors: ["#ff00ff", "#00ffff", "#ff0066"],
    elements: <CyberpunkElements />,
  },
  "space": {
    name: "Deep Space",
    desc: "Cosmic vibes with stars, nebulas, and cosmic dust",
    colors: ["#6366f1", "#8b5cf6", "#ec4899"],
    elements: <SpaceElements />,
  },
  "glass": {
    name: "Crystal Glass",
    desc: "Premium glassmorphism with frosted glass effects",
    colors: ["#06b6d4", "#3b82f6", "#8b5cf6"],
    elements: <GlassElements />,
  },
  "neon": {
    name: "Neon Genesis",
    desc: "Vibrant neon gradients with glowing elements",
    colors: ["#22d3ee", "#a855f7", "#f472b6"],
    elements: <NeonElements />,
  },
  "holographic": {
    name: "Holographic",
    desc: "Iridescent surfaces with rainbow reflections",
    colors: ["#fbbf24", "#f472b6", "#34d399"],
    elements: <HolographicElements />,
  },
  "dark-minimal": {
    name: "Dark Minimal 2050",
    desc: "Clean, minimal dark theme with subtle futuristic touches",
    colors: ["#f8fafc", "#94a3b8", "#475569"],
    elements: <DarkMinimalElements />,
  },
};

export default function ThemePreview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = themesData[(async () => { const p = await params; return p.id; })() as unknown as string] ? {} as any : { id: "cyberpunk" };
  const theme = themesData[id] || themesData["cyberpunk"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0f" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/services/websites" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Themes</span>
        </Link>
        <div className="flex items-center gap-3">
          <Hexagon className="w-8 h-8 text-purple-400 fill-purple-400/20" />
          <span className="font-bold">KraftAI</span>
        </div>
      </nav>

      {/* Theme Header */}
      <div className="px-6 py-8 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-10 h-10 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-4xl font-bold mb-2">{theme.name}</h1>
        <p className="text-slate-400">{theme.desc}</p>
      </div>

      {/* Live Preview */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ boxShadow: `0 0 60px ${theme.colors[0]}20` }}>
          {theme.elements}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-16">
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold hover:scale-105 transition-transform">
          Get This Theme <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function CyberpunkElements() {
  return (
    <div className="bg-[#0a0a0f] min-h-[600px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#00ffff] flex items-center justify-center">
            <span className="font-bold text-black">K</span>
          </div>
          <span className="text-xl font-bold text-white">Kraft<span className="text-[#00ffff]">AI</span></span>
        </div>
        <div className="flex gap-4">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <span key={item} className="text-sm text-slate-300 hover:text-[#00ffff] cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="text-center py-16">
        <div className="inline-block px-4 py-1 rounded-full border border-[#ff00ff]/30 bg-[#ff00ff]/10 text-[#ff00ff] text-sm mb-4">
          <Sparkles className="w-4 h-4 inline mr-2" /> NEXT GEN 2050
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-[#ff00ff] to-[#00ffff] bg-clip-text text-transparent">
          Welcome to the Future
        </h1>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Experience next-generation web design with cyberpunk aesthetics
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-[#00ffff] text-black font-semibold rounded-lg hover:shadow-[0_0_30px_#00ffff50] transition-shadow">
            Get Started
          </button>
          <button className="px-6 py-3 border border-[#ff00ff] text-[#ff00ff] font-semibold rounded-lg hover:bg-[#ff00ff]/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl bg-white/5 border border-[#ff00ff]/20 hover:border-[#00ffff]/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#00ffff] mb-4" />
            <h3 className="text-white font-semibold mb-2">Feature {i}</h3>
            <p className="text-sm text-slate-400">Cutting-edge functionality with futuristic design</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpaceElements() {
  return (
    <div className="bg-[#0a0a1a] min-h-[600px] p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }} />
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
            <span className="text-xl font-bold text-white">KraftAI</span>
          </div>
          <div className="flex gap-6 text-slate-300">
            {["Explore", "Discover", "Connect"].map((item) => (
              <span key={item} className="hover:text-[#8b5cf6] cursor-pointer">{item}</span>
            ))}
          </div>
        </div>

        <div className="text-center py-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
            Journey Through Space
          </h1>
          <p className="text-slate-400 text-lg mb-8">Discover cosmic wonders beyond imagination</p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full font-semibold">
            Start Exploration
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-12">
          {["Nebula", "Stars", "Galaxies"].map((item) => (
            <div key={item} className="p-6 rounded-2xl bg-gradient-to-b from-[#6366f1]/20 to-transparent border border-white/10 text-center">
              <h3 className="text-xl font-bold text-white">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GlassElements() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-[600px] p-6">
      <div className="flex items-center justify-between mb-8">
        <span className="text-2xl font-bold text-white">KraftAI</span>
        <div className="flex gap-6 text-slate-300">
          {["Home", "Services", "Portfolio"].map((item) => (
            <span key={item} className="hover:text-white cursor-pointer">{item}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12">
        <div className="py-16">
          <h1 className="text-5xl font-bold text-white mb-6">Crystal Clear Design</h1>
          <p className="text-slate-300 text-lg mb-8">Experience premium glassmorphism</p>
          <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all">
            Explore Now
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <h3 className="text-white font-semibold">Premium Card {i}</h3>
              <p className="text-sm text-slate-300 mt-2">Beautiful frosted glass effect</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NeonElements() {
  return (
    <div className="bg-[#050510] min-h-[600px] p-6">
      <div className="flex items-center justify-between mb-8">
        <span className="text-2xl font-bold text-white">KraftAI</span>
        <div className="flex gap-4">
          {["Home", "About"].map((item) => (
            <span key={item} className="text-slate-400 hover:text-[#22d3ee] cursor-pointer">{item}</span>
          ))}
        </div>
      </div>

      <div className="text-center py-16">
        <h1 className="text-6xl font-bold mb-4" style={{ color: "#22d3ee", textShadow: "0 0 30px #22d3ee, 0 0 60px #22d3ee" }}>
          NEON
        </h1>
        <h1 className="text-6xl font-bold mb-8" style={{ color: "#a855f7", textShadow: "0 0 30px #a855f7, 0 0 60px #a855f7" }}>
          GENESIS
        </h1>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 border-2 text-white font-bold rounded-lg" style={{ borderColor: "#22d3ee", boxShadow: "0 0 20px #22d3ee50" }}>
            Enter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {["Cyber", "Future", "Now"].map((item, i) => (
          <div key={item} className="p-6 rounded-xl border text-center" style={{ borderColor: ["#22d3ee", "#a855f7", "#f472b6"][i], boxShadow: `0 0 20px ${["#22d3ee", "#a855f7", "#f472b6"][i]}30` }}>
            <h3 className="text-white font-bold">{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function HolographicElements() {
  return (
    <div className="bg-gradient-to-br from-amber-100 via-pink-100 to-emerald-100 min-h-[600px] p-6">
      <div className="flex items-center justify-between mb-8">
        <span className="text-2xl font-bold text-slate-800">KraftAI</span>
        <div className="flex gap-6 text-slate-600">
          {["Home", "Shop", "About"].map((item) => (
            <span key={item} className="hover:text-slate-900 cursor-pointer">{item}</span>
          ))}
        </div>
      </div>

      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-500 via-pink-500 to-emerald-500 bg-clip-text text-transparent">
          Holographic Dreams
        </h1>
        <p className="text-slate-600 text-lg mb-8">Iridescent surfaces that catch the light</p>
        <button className="px-8 py-4 bg-gradient-to-r from-amber-400 via-pink-400 to-emerald-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          Discover More
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {["Rainbow", "Prism", "Light"].map((item, i) => (
          <div key={item} className="p-6 rounded-2xl bg-white/80 backdrop-blur shadow-lg" style={{ background: `linear-gradient(135deg, rgba(251,191,36,0.3), rgba(244,114,182,0.3), rgba(52,211,153,0.3))` }}>
            <h3 className="text-slate-800 font-bold text-lg">{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function DarkMinimalElements() {
  return (
    <div className="bg-[#0a0a0a] min-h-[600px] p-6">
      <div className="flex items-center justify-between mb-12">
        <span className="text-xl font-medium text-white">KraftAI</span>
        <div className="flex gap-8 text-sm text-slate-500">
          {["Work", "About", "Contact"].map((item) => (
            <span key={item} className="hover:text-white cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mt-16">
        <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
          Less is<br />more.
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-md">
          Minimal design with maximum impact. Pure simplicity.
        </p>
        <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors">
          Get Started →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-16">
        <div className="aspect-video bg-slate-900 rounded-lg" />
        <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
          <span className="text-slate-600">Video</span>
        </div>
      </div>
    </div>
  );
}

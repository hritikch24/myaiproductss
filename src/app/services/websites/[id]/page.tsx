import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Menu, X, ChevronRight, User, ShoppingCart, Search, Bell, Home, Settings, CreditCard, Star, MapPin, Phone, Mail, Clock, Check } from "lucide-react";

const themesData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
}> = {
  "cyberpunk": {
    name: "Cyberpunk 2077",
    desc: "Neon lights, dark backgrounds, holographic elements",
    colors: ["#ff00ff", "#00ffff", "#ff0066"],
    features: ["Glitch effects", "Holographic cards", "Neon borders", "Animated gradients"],
  },
  "space": {
    name: "Deep Space",
    desc: "Cosmic vibes with stars, nebulas, and cosmic dust",
    colors: ["#6366f1", "#8b5cf6", "#ec4899"],
    features: ["Starfield animation", "Nebula effects", "Floating elements", "Cosmic particles"],
  },
  "glass": {
    name: "Crystal Glass",
    desc: "Premium glassmorphism with frosted glass effects",
    colors: ["#06b6d4", "#3b82f6", "#8b5cf6"],
    features: ["Frosted glass", "Blur layers", "Reflections", "Depth effects"],
  },
  "neon": {
    name: "Neon Genesis",
    desc: "Vibrant neon gradients with glowing elements",
    colors: ["#22d3ee", "#a855f7", "#f472b6"],
    features: ["Neon glow", "Gradient text", "Light trails", "Glowing buttons"],
  },
  "holographic": {
    name: "Holographic",
    desc: "Iridescent surfaces with rainbow reflections",
    colors: ["#fbbf24", "#f472b6", "#34d399"],
    features: ["Rainbow gradients", "Iridescent buttons", "Prism effects", "Reflective surfaces"],
  },
  "dark-minimal": {
    name: "Dark Minimal 2050",
    desc: "Clean, minimal dark theme with subtle futuristic touches",
    colors: ["#f8fafc", "#94a3b8", "#475569"],
    features: ["Minimal layout", "Subtle animations", "Elegant typography", "Clean spacing"],
  },
};

export default function ThemePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "cyberpunk";
  const theme = themesData[id] || themesData["cyberpunk"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Neural Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Link href="/services/websites" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <Hexagon className="w-6 h-6 md:w-8 md:h-8 text-purple-400 fill-purple-400/20" />
          <span className="font-bold text-sm md:text-base">KraftAI</span>
        </div>
      </nav>

      {/* Theme Header */}
      <div className="relative z-10 px-4 md:px-6 py-6 md:py-8 text-center">
        <div className="flex justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 md:w-10 md:h-10 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{theme.name}</h1>
        <p className="text-slate-400 text-sm md:text-base px-4">{theme.desc}</p>
      </div>

      {/* Features */}
      <div className="relative z-10 px-4 md:px-6 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-slate-300">
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Live Preview - Desktop Website Mockup */}
      <div className="relative z-10 px-2 md:px-6 pb-6">
        <div className="max-w-5xl mx-auto">
          {/* Desktop Browser Frame */}
          <div className="rounded-t-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0f]">
            {/* Browser Header */}
            <div className="hidden md:flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 max-w-md mx-4">
                <div className="px-3 py-1 rounded-full bg-slate-800/50 text-xs text-slate-500 text-center">kraftai.in</div>
              </div>
            </div>
            
            {/* Website Content */}
            <div className="p-3 md:p-6">
              {/* Mobile-first website mockup */}
              <div className="w-full max-w-md mx-auto">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                      <span className="font-bold text-black text-sm md:text-base">K</span>
                    </div>
                    <span className="font-bold text-sm md:text-lg">KraftAI</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                      <Menu className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hero */}
                <div className="text-center mb-4 md:mb-6">
                  <h2 className="text-lg md:text-2xl font-bold mb-2" style={{ color: theme.colors[0] }}>Welcome to the Future</h2>
                  <p className="text-xs md:text-sm text-slate-400 mb-3">Amazing {theme.name} design</p>
                  <div className="flex gap-2 justify-center">
                    <button className="px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium" style={{ backgroundColor: theme.colors[0], color: theme.colors[0] === '#f8fafc' ? '#000' : '#000' }}>Get Started</button>
                    <button className="px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium border" style={{ borderColor: theme.colors[1], color: theme.colors[1] }}>Learn More</button>
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-2 md:p-3 rounded-lg bg-white/5 border" style={{ borderColor: `${theme.colors[1]}30` }}>
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded mb-1 md:mb-2" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }} />
                      <p className="text-[10px] md:text-xs font-medium">Feature {i}</p>
                      <p className="text-[8px] md:text-[10px] text-slate-500">Description</p>
                    </div>
                  ))}
                </div>

                {/* Bottom Nav - Mobile */}
                <div className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around py-3 bg-slate-900/90 border-t border-white/10 -mx-3 -mb-6 px-4">
                  <Home className="w-5 h-5" style={{ color: theme.colors[0] }} />
                  <Search className="w-5 h-5 text-slate-500" />
                  <div className="w-10 h-10 rounded-full -mt-5 flex items-center justify-center" style={{ backgroundColor: theme.colors[0] }}>
                    <Plus className="w-5 h-5 text-black" />
                  </div>
                  <Heart className="w-5 h-5 text-slate-500" />
                  <User className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center pb-8 md:pb-16 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-sm md:text-lg hover:scale-105 transition-transform">
          Get This Theme <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    </div>
  );
}

function Plus(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>;}
function Heart(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;}

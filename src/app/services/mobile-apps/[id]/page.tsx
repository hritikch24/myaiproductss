import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Menu, Home, Search, User, Bell, Plus } from "lucide-react";

const mobileData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
}> = {
  "neon-app": { name: "Neon Pulse", desc: "High-energy app with vibrant neon accents", colors: ["#22d3ee", "#a855f7", "#f472b6"], features: ["Neon UI", "Animated transitions", "Glow effects"] },
  "dark-elegant": { name: "Dark Elegant", desc: "Premium dark theme", colors: ["#6366f1", "#8b5cf6", "#a78bfa"], features: ["OLED optimization", "Smooth animations", "Minimal interface"] },
  "glassmorphism": { name: "Glass Touch", desc: "iOS-inspired glassmorphism", colors: ["#3b82f6", "#0ea5e9", "#06b6d4"], features: ["Frosted glass", "Blur layers", "Apple-style"] },
  "cyber": { name: "Cyber Interface", desc: "Futuristic cyberpunk UI", colors: ["#ef4444", "#f97316", "#eab308"], features: ["Glitch effects", "Tech aesthetics", "HUD elements"] },
  "nature": { name: "Organic Flow", desc: "Nature-inspired design", colors: ["#22c55e", "#10b981", "#14b8a6"], features: ["Organic shapes", "Calming colors", "Nature backgrounds"] },
  "minimal-2050": { name: "Minimal 2050", desc: "Ultra-minimal design", colors: ["#f8fafc", "#94a3b8", "#475569"], features: ["Clean layouts", "Bold typography", "Speed focused"] },
};

export default function MobilePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "neon-app";
  const theme = mobileData[id] || mobileData["neon-app"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden flex flex-col items-center py-6">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />

      <nav className="relative z-10 w-full max-w-md flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Link href="/services/mobile-apps" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
          <span className="font-bold text-sm">KraftAI</span>
        </div>
      </nav>

      <div className="relative z-10 px-4 py-6 text-center w-full max-w-md">
        <div className="flex justify-center gap-2 mb-3">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-xl md:text-2xl font-bold mb-1">{theme.name}</h1>
        <p className="text-slate-400 text-xs md:text-sm">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-2 pb-4 w-full max-w-md">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">{feature}</span>
          ))}
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="relative z-10 rounded-[3rem] overflow-hidden border-4 md:border-8 border-slate-800 shadow-2xl" style={{ width: '280px', height: '560px' }}>
        <div className="w-full h-full bg-[#0a0a12] overflow-hidden">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-4 py-2 bg-black/50 text-[10px]">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>📶</span><span>🔋</span>
            </div>
          </div>

          {/* App Content */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg" style={{ color: theme.colors[0] }}>Neon</span>
              <Bell className="w-5 h-5" style={{ color: theme.colors[1] }} />
            </div>
            <div className="p-3 rounded-xl mb-3" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}20, ${theme.colors[1]}20)`, border: `1px solid ${theme.colors[0]}30` }}>
              <h2 className="text-white font-bold text-lg">Welcome Back</h2>
              <p className="text-xs" style={{ color: theme.colors[0] }}>Ready to explore?</p>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-2 rounded-lg bg-white/5 border flex items-center gap-3" style={{ borderColor: `${theme.colors[1]}20` }}>
                  <div className="w-8 h-8 rounded-lg" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }} />
                  <div className="flex-1">
                    <p className="text-xs text-white font-medium">Item {i}</p>
                    <p className="text-[10px]" style={{ color: theme.colors[0] }}>Description</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-around py-3 bg-black/80 border-t border-white/10">
            <Home className="w-6 h-6" style={{ color: theme.colors[0] }} />
            <Search className="w-6 h-6 text-slate-500" />
            <div className="w-12 h-12 rounded-full -mt-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
              <Plus className="w-5 h-5 text-black" />
            </div>
            <User className="w-6 h-6 text-slate-500" />
            <User className="w-6 h-6 text-slate-500" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 text-center pb-6 px-4 w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Get This App <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

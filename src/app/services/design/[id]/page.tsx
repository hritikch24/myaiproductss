import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Eye, Palette, Type, Image } from "lucide-react";

const designData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
}> = {
  "futuristic": { name: "Futuristic 2050", desc: "Next-gen holographic design", colors: ["#a855f7", "#06b6d4", "#22d3ee"], features: ["Holographic cards", "3D elements", "Neon accents"] },
  "glass-elegant": { name: "Glass Elegant", desc: "Premium glassmorphism", colors: ["#3b82f6", "#6366f1", "#8b5cf6"], features: ["Frosted glass", "Blur layers", "Reflections"] },
  "neon-dark": { name: "Neon Dark", desc: "High contrast neon", colors: ["#f472b6", "#22d3ee", "#a855f7"], features: ["Vibrant neon", "Glow effects", "Dark mode"] },
  "minimal-premium": { name: "Minimal Premium", desc: "Clean minimal with luxury", colors: ["#f8fafc", "#cbd5e1", "#fbbf24"], features: ["Clean layout", "Whitespace", "Gold accents"] },
  "cyberpunk": { name: "Cyberpunk UI", desc: "Gritty cyberpunk aesthetic", colors: ["#ef4444", "#f97316", "#eab308"], features: ["Glitch effects", "Tech fonts", "Data overlays"] },
  "organic": { name: "Organic Flow", desc: "Soft, natural design", colors: ["#22c55e", "#10b981", "#14b8a6"], features: ["Organic shapes", "Soft gradients", "Calming vibe"] },
};

export default function DesignPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "futuristic";
  const theme = designData[id] || designData["futuristic"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />

      <nav className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Link href="/services/design" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <Hexagon className="w-6 h-6 md:w-8 md:h-8 text-pink-400 fill-pink-400/20" />
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
        <div className="max-w-5xl mx-auto">
          <div className="rounded-t-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a15] p-4 md:p-8">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500" />
                <span className="font-bold text-lg md:text-xl">FutureUI</span>
              </div>
              <div className="hidden md:flex gap-4 text-sm text-slate-400">
                <span>Home</span><span>Design</span><span>About</span>
              </div>
            </div>
            
            <div className="text-center py-8 md:py-12">
              <div className="inline-block px-4 py-2 rounded-full mb-4 md:mb-6 text-xs md:text-sm" style={{ backgroundColor: `${theme.colors[0]}20`, border: `1px solid ${theme.colors[0]}40`, color: theme.colors[0] }}>
                <Sparkles className="w-3 h-3 inline mr-2" /> NEXT GENERATION
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Design 2050</h1>
              <p className="text-slate-400 mb-4 md:mb-6">Holographic interfaces</p>
              <button className="px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium text-black" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>Explore</button>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3 md:p-4 rounded-xl bg-white/5 border" style={{ borderColor: `${theme.colors[1]}20` }}>
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded mb-2 md:mb-3" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }} />
                  <p className="text-xs md:text-sm font-medium">Feature {i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-8 md:pb-16 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold text-sm md:text-lg hover:scale-105 transition-transform">
          Get This Design <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    </div>
  );
}

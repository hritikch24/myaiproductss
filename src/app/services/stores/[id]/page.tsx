import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Menu, Home, Search, User, ChevronLeft, X } from "lucide-react";

const storesData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
}> = {
  "luxury": { name: "Luxury Elite", desc: "Premium e-commerce with gold accents", colors: ["#fbbf24", "#f59e0b", "#d97706"], features: ["Gold gradients", "Smooth transitions", "Premium fonts"] },
  "tech-store": { name: "Tech Haven", desc: "Gadget & tech store", colors: ["#06b6d4", "#0891b2", "#0e7490"], features: ["3D product views", "Tech animations", "Dark mode"] },
  "fashion": { name: "Fashion Forward", desc: "Trendy fashion store", colors: ["#f472b6", "#ec4899", "#db2777"], features: ["Lookbook", "Size visualizer", "Trending"] },
  "minimal-store": { name: "Minimal Store 2050", desc: "Ultra-clean store", colors: ["#f8fafc", "#cbd5e1", "#64748b"], features: ["Clean grid", "Focus on images", "Fast checkout"] },
  "artisan": { name: "Artisan Craft", desc: "Handmade products", colors: ["#84cc16", "#65a30d", "#4d7c0f"], features: ["Story sections", "Artist profiles", "Custom orders"] },
  "digital": { name: "Digital Goods", desc: "Software & courses", colors: ["#8b5cf6", "#7c3aed", "#6d28d9"], features: ["Instant download", "License keys", "Bundles"] },
};

export default function StorePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "luxury";
  const theme = storesData[id] || storesData["luxury"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />

      <nav className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Link href="/services/stores" className="flex items-center gap-2 text-slate-400 hover:text-white">
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
          <div className="rounded-t-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0f]">
            <div className="hidden md:flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 max-w-md mx-4"><div className="px-3 py-1 rounded-full bg-slate-800/50 text-xs text-slate-500 text-center">store.kraftai.in</div></div>
            </div>
            <div className="p-3 md:p-6">
              <div className="w-full max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg" style={{ color: theme.colors[0] }}>LUXE</span>
                  <div className="flex gap-2"><Menu className="w-5 h-5" /></div>
                </div>
                <div className="text-center mb-4">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: theme.colors[0] }}>New Arrivals</p>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Timeless Elegance</h2>
                  <button className="px-6 py-2 rounded-full text-sm font-medium text-black" style={{ backgroundColor: theme.colors[0] }}>Shop Now</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <div className="aspect-square rounded mb-2" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}30, ${theme.colors[1]}30)` }} />
                      <p className="text-xs font-medium">Product {i}</p>
                      <p className="text-xs" style={{ color: theme.colors[0] }}>$99</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-8 md:pb-16 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-600 to-amber-600 rounded-full font-semibold text-sm md:text-lg hover:scale-105 transition-transform">
          Get This Store <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    </div>
  );
}

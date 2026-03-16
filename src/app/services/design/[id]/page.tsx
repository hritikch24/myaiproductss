import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Eye, Palette, Type, Image, Layers, Figma, MousePointer } from "lucide-react";

const designData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  element: React.ReactNode;
}> = {
  "futuristic": {
    name: "Futuristic 2050",
    desc: "Next-gen design with holographic elements",
    colors: ["#a855f7", "#06b6d4", "#22d3ee"],
    element: <FuturisticDesign />,
  },
  "glass-elegant": {
    name: "Glass Elegant",
    desc: "Premium glassmorphism with refined aesthetics",
    colors: ["#3b82f6", "#6366f1", "#8b5cf6"],
    element: <GlassDesign />,
  },
  "neon-dark": {
    name: "Neon Dark",
    desc: "High contrast neon on dark backgrounds",
    colors: ["#f472b6", "#22d3ee", "#a855f7"],
    element: <NeonDesign />,
  },
  "minimal-premium": {
    name: "Minimal Premium",
    desc: "Clean minimal with luxury touches",
    colors: ["#f8fafc", "#cbd5e1", "#fbbf24"],
    element: <MinimalDesign />,
  },
  "cyberpunk": {
    name: "Cyberpunk UI",
    desc: "Gritty cyberpunk aesthetic",
    colors: ["#ef4444", "#f97316", "#eab308"],
    element: <CyberDesign />,
  },
  "organic": {
    name: "Organic Flow",
    desc: "Soft, natural, calming design",
    colors: ["#22c55e", "#10b981", "#14b8a6"],
    element: <OrganicDesign />,
  },
};

export default function DesignPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "futuristic";
  const theme = designData[id] || designData["futuristic"];

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/services/design" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" /> Back to Themes
        </Link>
        <div className="flex items-center gap-3">
          <Hexagon className="w-8 h-8 text-pink-400 fill-pink-400/20" />
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

      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {theme.element}
        </div>
      </div>

      <div className="text-center pb-16">
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform">
          Get This Design <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function FuturisticDesign() {
  return (
    <div className="bg-[#0a0a15] p-8 min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500" />
          <span className="text-xl font-bold text-white">FutureUI</span>
        </div>
        <div className="flex gap-4">
          {['Home', 'Design', 'About'].map(item => (
            <span key={item} className="text-slate-400 hover:text-white cursor-pointer">{item}</span>
          ))}
        </div>
      </div>
      <div className="text-center py-12">
        <div className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm mb-6">
          <Sparkles className="w-4 h-4 inline mr-2" /> NEXT GENERATION
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          Design 2050
        </h1>
        <p className="text-slate-400 mb-8">Holographic interfaces</p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg">Explore</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-sm">
            <div className="w-8 h-8 rounded bg-gradient-to-r from-purple-500 to-cyan-500 mb-3" />
            <p className="text-white text-sm">Feature {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlassDesign() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 min-h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <span className="text-xl font-bold text-white">GlassUI</span>
      </div>
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Crystal Clear</h1>
        <p className="text-slate-300 mb-6">Elegant glassmorphism</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <p className="text-white font-medium">Card {i}</p>
            <p className="text-slate-400 text-sm">Frosted glass</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeonDesign() {
  return (
    <div className="bg-black p-8 min-h-[400px]">
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold mb-2" style={{ color: '#f472b6', textShadow: '0 0 30px #f472b6' }}>NEON</h1>
        <h1 className="text-6xl font-bold" style={{ color: '#22d3ee', textShadow: '0 0 30px #22d3ee' }}>DARK</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {['Pulse', 'Glow', 'Shine'].map((word, i) => (
          <div key={word} className="p-4 rounded-xl border text-center" style={{ 
            borderColor: ['#f472b6', '#22d3ee', '#a855f7'][i],
            boxShadow: `0 0 20px ${['#f472b6', '#22d3ee', '#a855f7'][i]}30`
          }}>
            <p className="text-white font-bold">{word}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MinimalDesign() {
  return (
    <div className="bg-[#0a0a0a] p-8 min-h-[400px]">
      <div className="mb-12">
        <span className="text-sm text-slate-500">Brand</span>
      </div>
      <div className="py-8">
        <h1 className="text-5xl font-light text-white mb-2">Simple.</h1>
        <h1 className="text-5xl font-light text-white mb-2">Clean.</h1>
        <h1 className="text-5xl font-light text-white">Pure.</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {[1, 2].map(i => (
          <div key={i} className="p-4 rounded-lg bg-slate-900">
            <div className="w-full aspect-video bg-slate-800 rounded mb-3" />
            <p className="text-slate-300 text-sm">Image {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CyberDesign() {
  return (
    <div className="bg-[#050505] p-8 min-h-[400px] font-mono">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-red-500">●</span>
        <span className="text-yellow-500">●</span>
        <span className="text-green-500">●</span>
        <span className="ml-4 text-slate-500 text-sm">root@cyber:~$</span>
      </div>
      <div className="space-y-4">
        <div className="p-4 border-l-2 border-red-500 bg-red-500/5">
          <p className="text-red-400">{'>>'} INIT_SYSTEM</p>
          <p className="text-slate-400 text-sm">Loading cyber interface...</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-3 border border-orange-500/30 bg-orange-500/5 rounded">
              <p className="text-orange-400 text-sm">MOD_{i}</p>
              <p className="text-slate-500 text-xs">Active</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrganicDesign() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 min-h-[400px]">
      <div className="mb-8">
        <span className="text-2xl font-serif text-green-900">Organic</span>
      </div>
      <div className="py-8">
        <h1 className="text-4xl font-serif text-green-900 mb-4">Natural</h1>
        <h1 className="text-4xl font-serif text-green-700 mb-4">Calming</h1>
        <h1 className="text-4xl font-serif text-green-500">Flow</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 rounded-2xl bg-white shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-100 mb-3" />
            <p className="text-green-900 text-sm">Element {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Eye, Palette, Type, Image, Home, Search, User, Bell, Plus, Heart, Settings, Zap, Palette as Pal, Layers, PenTool, Square, Circle, Triangle, Maximize2, Move, RotateCw, ZoomIn, Copy, Layers as LayersIcon, Pen, Brush, Eraser, Droplet, Scissors, Type as TypeIcon, Image as ImageIcon } from "lucide-react";

function CheckIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>; }

const designData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
  preview: {
    header: { title: string; subtitle: string };
    tools: { icon: string; label: string }[];
    canvas: { elements: { type: string; color: string }[] };
    navItems: { icon: string; label: string; active?: boolean }[];
  };
}> = {
  "futuristic": { 
    name: "Futuristic 2050", 
    desc: "Next-gen holographic design", 
    colors: ["#a855f7", "#06b6d4", "#22d3ee"], 
    features: ["Holographic cards", "3D elements", "Neon accents"],
    preview: {
      header: { title: "FUTUREUI", subtitle: "Designer" },
      tools: [
        { icon: "select", label: "Select" },
        { icon: "pen", label: "Pen" },
        { icon: "shape", label: "Shape" },
        { icon: "type", label: "Type" },
        { icon: "layer", label: "Layers" }
      ],
      canvas: {
        elements: [
          { type: "rect", color: "#a855f7" },
          { type: "circle", color: "#06b6d4" },
          { type: "line", color: "#22d3ee" }
        ]
      },
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "design", label: "Design" },
        { icon: "plus", label: "New" },
        { icon: "saved", label: "Saved" },
        { icon: "profile", label: "Profile" }
      ]
    }
  },
  "glass-elegant": { 
    name: "Glass Elegant", 
    desc: "Premium glassmorphism", 
    colors: ["#3b82f6", "#6366f1", "#8b5cf6"], 
    features: ["Frosted glass", "Blur layers", "Reflections"],
    preview: {
      header: { title: "GLASSDESIGN", subtitle: "Studio" },
      tools: [
        { icon: "select", label: "Select" },
        { icon: "brush", label: "Brush" },
        { icon: "shape", label: "Shape" },
        { icon: "type", label: "Type" },
        { icon: "eraser", label: "Eraser" }
      ],
      canvas: {
        elements: [
          { type: "rect", color: "#6366f1" },
          { type: "circle", color: "#8b5cf6" },
          { type: "line", color: "#3b82f6" }
        ]
      },
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "design", label: "Create" },
        { icon: "plus", label: "Add" },
        { icon: "gallery", label: "Gallery" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
  "neon-dark": { 
    name: "Neon Dark", 
    desc: "High contrast neon", 
    colors: ["#f472b6", "#22d3ee", "#a855f7"], 
    features: ["Vibrant neon", "Glow effects", "Dark mode"],
    preview: {
      header: { title: "NEON", subtitle: "Design" },
      tools: [
        { icon: "select", label: "Select" },
        { icon: "zap", label: "Neon" },
        { icon: "shape", label: "Shape" },
        { icon: "glow", label: "Glow" },
        { icon: "layer", label: "Layers" }
      ],
      canvas: {
        elements: [
          { type: "rect", color: "#f472b6" },
          { type: "circle", color: "#22d3ee" },
          { type: "line", color: "#a855f7" }
        ]
      },
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Find" },
        { icon: "plus", label: "Create" },
        { icon: "heart", label: "Likes" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
  "minimal-premium": { 
    name: "Minimal Premium", 
    desc: "Clean minimal with luxury", 
    colors: ["#f8fafc", "#cbd5e1", "#fbbf24"], 
    features: ["Clean layout", "Whitespace", "Gold accents"],
    preview: {
      header: { title: "MINIMAL", subtitle: "Studio" },
      tools: [
        { icon: "select", label: "Select" },
        { icon: "pen", label: "Pen" },
        { icon: "square", label: "Rect" },
        { icon: "type", label: "Text" },
        { icon: "move", label: "Move" }
      ],
      canvas: {
        elements: [
          { type: "rect", color: "#f8fafc" },
          { type: "line", color: "#fbbf24" },
          { type: "circle", color: "#cbd5e1" }
        ]
      },
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "design", label: "Work" },
        { icon: "plus", label: "New" },
        { icon: "saved", label: "Save" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
  "cyberpunk": { 
    name: "Cyberpunk UI", 
    desc: "Gritty cyberpunk aesthetic", 
    colors: ["#ef4444", "#f97316", "#eab308"], 
    features: ["Glitch effects", "Tech fonts", "Data overlays"],
    preview: {
      header: { title: "CYBER", subtitle: "Design" },
      tools: [
        { icon: "scan", label: "Scan" },
        { icon: "glitch", label: "Glitch" },
        { icon: "data", label: "Data" },
        { icon: "tech", label: "Tech" },
        { icon: "hud", label: "HUD" }
      ],
      canvas: {
        elements: [
          { type: "rect", color: "#ef4444" },
          { type: "line", color: "#f97316" },
          { type: "circle", color: "#eab308" }
        ]
      },
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "scan", label: "Scan" },
        { icon: "plus", label: "Hack" },
        { icon: "data", label: "Data" },
        { icon: "profile", label: "User" }
      ]
    }
  },
  "organic": { 
    name: "Organic Flow", 
    desc: "Soft, natural design", 
    colors: ["#22c55e", "#10b981", "#14b8a6"], 
    features: ["Organic shapes", "Soft gradients", "Calming vibe"],
    preview: {
      header: { title: "ORGANIC", subtitle: "Flow" },
      tools: [
        { icon: "select", label: "Select" },
        { icon: "brush", label: "Brush" },
        { icon: "shape", label: "Shape" },
        { icon: "droplet", label: "Color" },
        { icon: "smooth", label: "Smooth" }
      ],
      canvas: {
        elements: [
          { type: "rect", color: "#22c55e" },
          { type: "circle", color: "#10b981" },
          { type: "line", color: "#14b8a6" }
        ]
      },
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "create", label: "Create" },
        { icon: "plus", label: "Add" },
        { icon: "saved", label: "Gallery" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
};

function DesignIcon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const props = { className: className || "w-4 h-4" };
  const style = color ? { color } : {};
  
  switch (name) {
    case "select": return <Square {...props} style={style} />;
    case "pen": return <Pen {...props} style={style} />;
    case "shape": return <Square {...props} style={style} />;
    case "type": return <TypeIcon {...props} style={style} />;
    case "layer": return <LayersIcon {...props} style={style} />;
    case "brush": return <Brush {...props} style={style} />;
    case "eraser": return <Eraser {...props} style={style} />;
    case "zap": return <Zap {...props} style={style} />;
    case "glow": return <Sparkles {...props} style={style} />;
    case "square": return <Square {...props} style={style} />;
    case "move": return <Move {...props} style={style} />;
    case "image": return <ImageIcon {...props} style={style} />;
    case "home": return <Home {...props} style={style} />;
    case "search": return <Search {...props} style={style} />;
    case "plus": return <Plus {...props} style={style} />;
    case "heart": return <Heart {...props} style={style} />;
    case "saved": return <Heart {...props} style={style} />;
    case "profile": return <User {...props} style={style} />;
    case "design": return <Palette {...props} style={style} />;
    case "create": return <Pen {...props} style={style} />;
    case "gallery": return <ImageIcon {...props} style={style} />;
    default: return <Square {...props} style={style} />;
  }
}

export default function DesignPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "futuristic";
  const theme = designData[id] || designData["futuristic"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)' }} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <Link href="/services/design" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-pink-400 fill-pink-400/20" />
          <span className="font-bold text-sm">KraftAI</span>
        </div>
      </nav>

      <div className="relative z-10 px-4 py-6 text-center">
        <div className="flex justify-center gap-2 mb-3">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{theme.name}</h1>
        <p className="text-slate-400 text-sm">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">{feature}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-[300px] mx-auto">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-[2.5rem] blur-xl" />
            <div className="relative bg-black rounded-[2rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center px-3 py-2 bg-black/50 text-[10px] text-slate-400">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2.5 rounded-sm bg-white/20" />
                  <div className="w-0.5 h-2.5 bg-white/60" />
                  <div className="w-0.5 h-2.5 bg-white/60" />
                </div>
              </div>

              <div className="p-3 bg-gradient-to-b from-slate-900 to-[#0a0a12]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: theme.colors[0] }}>{theme.preview.header.title}</span>
                    <span className="text-[10px] text-slate-500">{theme.preview.header.subtitle}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <Bell className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {theme.preview.tools.map((tool, i) => (
                    <div key={i} className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center gap-1">
                      <DesignIcon name={tool.icon} className="w-4 h-4" color={theme.colors[0]} />
                      <span className="text-[7px] text-slate-400">{tool.label}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 mb-3" style={{ minHeight: '140px' }}>
                  <p className="text-[10px] text-slate-400 mb-2">Canvas</p>
                  <div className="flex items-center justify-center gap-4 h-20">
                    {theme.preview.canvas.elements.map((el, i) => (
                      <div key={i} className="flex items-center justify-center" style={{ 
                        width: '40px', 
                        height: el.type === 'circle' ? '40px' : '30px',
                        borderRadius: el.type === 'circle' ? '50%' : '4px',
                        backgroundColor: el.color,
                        boxShadow: `0 0 15px ${el.color}50`
                      }} />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[8px] text-slate-400">Colors</p>
                    <div className="flex gap-1 mt-1">
                      {theme.colors.map((c, i) => (
                        <div key={i} className="w-4 h-4 rounded" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[8px] text-slate-400">Export</p>
                    <p className="text-[10px] text-white mt-1">PNG, SVG</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-around py-2 bg-black/90 border-t border-white/10">
                {theme.preview.navItems.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    {item.icon === "plus" ? (
                      <div className="w-8 h-8 rounded-full -mt-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                        <Plus className="w-3.5 h-3.5 text-black" />
                      </div>
                    ) : (
                      <DesignIcon name={item.icon} className="w-4 h-4" color={item.active ? theme.colors[0] : '#64748b'} />
                    )}
                    <span className="text-[7px]" style={{ color: item.active ? theme.colors[0] : '#64748b' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-12 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Get This Design <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Menu, X, ChevronRight, User, ShoppingCart, Search, Bell, Home, Settings, CreditCard, Star, MapPin, Phone, Mail, Clock, Check, Heart, Plus, Play, Video, Zap, TrendingUp, Award, Users, Target, Globe, Palette, Code, Lightbulb, Rocket, Shield, Eye, Cpu, Cloud, Database, Lock, Fingerprint, BarChart3, MessageSquare, Calendar, FileText, Map, Truck, Package, CreditCard as CardIcon, Smartphone, Mail as MailIcon, Clock3, Sparkle } from "lucide-react";

const themesData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
  preview: {
    header: { title: string; subtitle: string };
    hero: { title: string; subtitle: string; cta: string };
    cards: { title: string; desc: string }[];
    navItems: { icon: string; label: string; active?: boolean }[];
  };
}> = {
  "cyberpunk": {
    name: "Cyberpunk 2077",
    desc: "Neon lights, dark backgrounds, holographic elements",
    colors: ["#ff00ff", "#00ffff", "#ff0066"],
    features: ["Glitch effects", "Holographic cards", "Neon borders", "Animated gradients"],
    preview: {
      header: { title: "NEXUS", subtitle: "Neural Systems" },
      hero: { title: "Welcome to 2077", subtitle: "Experience the future now", cta: "Initialize" },
      cards: [{ title: "Neural Link", desc: "Connect instantly" }, { title: "Quantum Data", desc: "Secure & fast" }, { title: "Holo Vision", desc: "Immersive reality" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Search" }, { icon: "plus", label: "Add" }, { icon: "heart", label: "Saved" }, { icon: "user", label: "Profile" }]
    }
  },
  "space": {
    name: "Deep Space",
    desc: "Cosmic vibes with stars, nebulas, and cosmic dust",
    colors: ["#6366f1", "#8b5cf6", "#ec4899"],
    features: ["Starfield animation", "Nebula effects", "Floating elements", "Cosmic particles"],
    preview: {
      header: { title: "COSMOS", subtitle: "Explore Beyond" },
      hero: { title: "Reach for Stars", subtitle: "Your cosmic journey begins", cta: "Launch" },
      cards: [{ title: "Galaxies", desc: "Explore vast spaces" }, { title: "Nebulas", desc: "Beautiful clouds" }, { title: "Stars", desc: "Infinite light" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Explore" }, { icon: "plus", label: "Create" }, { icon: "heart", label: "Favorites" }, { icon: "user", label: "Profile" }]
    }
  },
  "glass": {
    name: "Crystal Glass",
    desc: "Premium glassmorphism with frosted glass effects",
    colors: ["#06b6d4", "#3b82f6", "#8b5cf6"],
    features: ["Frosted glass", "Blur layers", "Reflections", "Depth effects"],
    preview: {
      header: { title: "CRYSTAL", subtitle: "Pure Elegance" },
      hero: { title: "Crystal Clear", subtitle: "Premium experience", cta: "Discover" },
      cards: [{ title: "Design", desc: "Stunning visuals" }, { title: "Speed", desc: "Lightning fast" }, { title: "Style", desc: "Modern look" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Browse" }, { icon: "plus", label: "Add" }, { icon: "heart", label: "Wishlist" }, { icon: "user", label: "Account" }]
    }
  },
  "neon": {
    name: "Neon Genesis",
    desc: "Vibrant neon gradients with glowing elements",
    colors: ["#22d3ee", "#a855f7", "#f472b6"],
    features: ["Neon glow", "Gradient text", "Light trails", "Glowing buttons"],
    preview: {
      header: { title: "NEON", subtitle: "Glow On" },
      hero: { title: "Light It Up", subtitle: "Shine bright always", cta: "Get Started" },
      cards: [{ title: "Glow", desc: "Be visible" }, { title: "Energy", desc: "Power up" }, { title: "Vibe", desc: "Feel the beat" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Find" }, { icon: "plus", label: "Post" }, { icon: "heart", label: "Likes" }, { icon: "user", label: "Profile" }]
    }
  },
  "holographic": {
    name: "Holographic",
    desc: "Iridescent surfaces with rainbow reflections",
    colors: ["#fbbf24", "#f472b6", "#34d399"],
    features: ["Rainbow gradients", "Iridescent buttons", "Prism effects", "Reflective surfaces"],
    preview: {
      header: { title: "PRISM", subtitle: "Spectrum" },
      hero: { title: "See the Rainbow", subtitle: "Every color matters", cta: "Explore" },
      cards: [{ title: "Spectrum", desc: "All colors" }, { title: "Rainbow", desc: "Vibrant life" }, { title: "Prism", desc: "Light DIVerted" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Search" }, { icon: "plus", label: "Create" }, { icon: "heart", label: "Love" }, { icon: "user", label: "Me" }]
    }
  },
  "dark-minimal": {
    name: "Dark Minimal 2050",
    desc: "Clean, minimal dark theme with subtle futuristic touches",
    colors: ["#f8fafc", "#94a3b8", "#475569"],
    features: ["Minimal layout", "Subtle animations", "Elegant typography", "Clean spacing"],
    preview: {
      header: { title: "MINIMAL", subtitle: "Less is More" },
      hero: { title: "Simplicity Rules", subtitle: "Clean design philosophy", cta: "Start" },
      cards: [{ title: "Focus", desc: "Clear mind" }, { title: "Peace", desc: "Calm design" }, { title: "Clarity", desc: "Pure intent" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Search" }, { icon: "plus", label: "New" }, { icon: "heart", label: "Saved" }, { icon: "user", label: "Profile" }]
    }
  },
};

function IconRenderer({ name, className, color }: { name: string; className?: string; color?: string }) {
  const props = { className: className || "w-4 h-4" };
  const style = color ? { color } : {};
  
  switch (name) {
    case "home": return <Home {...props} style={style} />;
    case "search": return <Search {...props} style={style} />;
    case "plus": return <Plus {...props} style={style} />;
    case "heart": return <Heart {...props} style={style} />;
    case "user": return <User {...props} style={style} />;
    default: return <Home {...props} style={style} />;
  }
}

export default function ThemePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "cyberpunk";
  const theme = themesData[id] || themesData["cyberpunk"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)' }} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <Link href="/services/websites" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-purple-400 fill-purple-400/20" />
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
        <p className="text-slate-400 text-sm px-4">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-[320px] mx-auto">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-[2.5rem] blur-xl" />
            <div className="relative bg-black rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] text-slate-500">kraftai.in</div>
                <div className="w-10" />
              </div>
              
              <div className="p-4 space-y-4 bg-gradient-to-b from-slate-900 to-[#0a0a0f]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                      <span className="font-bold text-black text-xs">K</span>
                    </div>
                    <span className="font-bold text-sm" style={{ color: theme.colors[0] }}>{theme.preview.header.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <Bell className="w-4 h-4 text-slate-500" />
                    <Menu className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-[10px] text-slate-400 mb-2">
                    <Sparkle className="w-3 h-3" style={{ color: theme.colors[1] }} />
                    {theme.preview.header.subtitle}
                  </div>
                  <h2 className="text-lg font-bold mb-1" style={{ color: theme.colors[0] }}>{theme.preview.hero.title}</h2>
                  <p className="text-[10px] text-slate-400 mb-3">{theme.preview.hero.subtitle}</p>
                  <button className="px-4 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: theme.colors[0], color: '#000' }}>{theme.preview.hero.cta}</button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {theme.preview.cards.map((card, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white/5 border" style={{ borderColor: `${theme.colors[1]}30` }}>
                      <div className="w-6 h-6 rounded mb-1" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }} />
                      <p className="text-[10px] font-medium truncate" style={{ color: theme.colors[0] }}>{card.title}</p>
                      <p className="text-[8px] text-slate-500 truncate">{card.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-around py-2 bg-slate-900/50 rounded-full border border-white/5">
                  {theme.preview.navItems.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <IconRenderer name={item.icon} className="w-4 h-4" color={item.active ? theme.colors[0] : '#64748b'} />
                      <span className="text-[8px]" style={{ color: item.active ? theme.colors[0] : '#64748b' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-12 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Get This Theme <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

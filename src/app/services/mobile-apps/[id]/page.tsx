import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Menu, Home, Search, User, Bell, Plus, Heart, Settings, MessageSquare, FileText, Calendar, TrendingUp, Star, Play, MapPin, Phone, Mail, Clock, Sparkle, Code, Lightbulb, Rocket, Shield, Eye, Cpu, Cloud, Database, Lock, Fingerprint, BarChart3, CreditCard, Wallet, Send, Image, Video, Gamepad2, BookOpen, Map, Coffee, Dumbbell, HeartPulse, Bus, Plane, Hotel, ShoppingBag, Tag, Truck, Package } from "lucide-react";

function MusicIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>; }
function RestaurantIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>; }
function CheckIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>; }

const mobileData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
  preview: {
    header: { title: string; subtitle: string };
    hero: { badge: string; title: string; subtitle: string };
    items: { icon: string; title: string; subtitle: string }[];
    navItems: { icon: string; label: string; active?: boolean }[];
  };
}> = {
  "neon-app": { 
    name: "Neon Pulse", 
    desc: "High-energy app with vibrant neon accents", 
    colors: ["#22d3ee", "#a855f7", "#f472b6"], 
    features: ["Neon UI", "Animated transitions", "Glow effects"],
    preview: {
      header: { title: "NEON", subtitle: "Pulse" },
      hero: { badge: "Welcome", title: "Welcome Back", subtitle: "Ready to explore?" },
      items: [
        { icon: "trending", title: "Trending", subtitle: "Hot right now" },
        { icon: "star", title: "Featured", subtitle: "Top picks" },
        { icon: "new", title: "New Arrivals", subtitle: "Just dropped" },
        { icon: "popular", title: "Popular", subtitle: "Everyone loves" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Search" },
        { icon: "plus", label: "Add" },
        { icon: "heart", label: "Saved" },
        { icon: "user", label: "Profile" }
      ]
    }
  },
  "dark-elegant": { 
    name: "Dark Elegant", 
    desc: "Premium dark theme", 
    colors: ["#6366f1", "#8b5cf6", "#a78bfa"], 
    features: ["OLED optimization", "Smooth animations", "Minimal interface"],
    preview: {
      header: { title: "ELEGANT", subtitle: "Dark" },
      hero: { badge: "Premium", title: "Your Space", subtitle: "Curated for you" },
      items: [
        { icon: "calendar", title: "Today", subtitle: "Schedule" },
        { icon: "chart", title: "Analytics", subtitle: "Insights" },
        { icon: "settings", title: "Settings", subtitle: "Customize" },
        { icon: "profile", title: "Profile", subtitle: "Account" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Find" },
        { icon: "plus", label: "Create" },
        { icon: "bell", label: "Alerts" },
        { icon: "user", label: "Profile" }
      ]
    }
  },
  "glassmorphism": { 
    name: "Glass Touch", 
    desc: "iOS-inspired glassmorphism", 
    colors: ["#3b82f6", "#0ea5e9", "#06b6d4"], 
    features: ["Frosted glass", "Blur layers", "Apple-style"],
    preview: {
      header: { title: "GLASS", subtitle: "Touch" },
      hero: { badge: "iOS Style", title: "Crystal Clear", subtitle: "Pure experience" },
      items: [
        { icon: "music", title: "Music", subtitle: "Stream" },
        { icon: "video", title: "Videos", subtitle: "Watch" },
        { icon: "game", title: "Games", subtitle: "Play" },
        { icon: "book", title: "Books", subtitle: "Read" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Browse" },
        { icon: "plus", label: "New" },
        { icon: "heart", label: "Love" },
        { icon: "user", label: "Me" }
      ]
    }
  },
  "cyber": { 
    name: "Cyber Interface", 
    desc: "Futuristic cyberpunk UI", 
    colors: ["#ef4444", "#f97316", "#eab308"], 
    features: ["Glitch effects", "Tech aesthetics", "HUD elements"],
    preview: {
      header: { title: "CYBER", subtitle: "Interface" },
      hero: { badge: "2077", title: "Neural Link", subtitle: "Connected" },
      items: [
        { icon: "cpu", title: "Neural", subtitle: "AI Core" },
        { icon: "shield", title: "Security", subtitle: "Protected" },
        { icon: "database", title: "Data", subtitle: "Storage" },
        { icon: "cloud", title: "Cloud", subtitle: "Synced" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Scan" },
        { icon: "plus", label: "Hack" },
        { icon: "heart", label: "Saved" },
        { icon: "user", label: "User" }
      ]
    }
  },
  "nature": { 
    name: "Organic Flow", 
    desc: "Nature-inspired design", 
    colors: ["#22c55e", "#10b981", "#14b8a6"], 
    features: ["Organic shapes", "Calming colors", "Nature backgrounds"],
    preview: {
      header: { title: "ORGANIC", subtitle: "Flow" },
      hero: { badge: "Nature", title: "Breathe", subtitle: "Find peace" },
      items: [
        { icon: "health", title: "Health", subtitle: "Wellness" },
        { icon: "coffee", title: "Mind", subtitle: "Relax" },
        { icon: "dumbbell", title: "Fitness", subtitle: "Train" },
        { icon: "food", title: "Nutrition", subtitle: "Eat well" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Explore" },
        { icon: "plus", label: "Log" },
        { icon: "heart", label: "Saved" },
        { icon: "user", label: "Profile" }
      ]
    }
  },
  "minimal-2050": { 
    name: "Minimal 2050", 
    desc: "Ultra-minimal design", 
    colors: ["#f8fafc", "#94a3b8", "#475569"], 
    features: ["Clean layouts", "Bold typography", "Speed focused"],
    preview: {
      header: { title: "MINIMAL", subtitle: "2050" },
      hero: { badge: "Essential", title: "Focus", subtitle: "Less noise" },
      items: [
        { icon: "mail", title: "Inbox", subtitle: "Messages" },
        { icon: "calendar", title: "Events", subtitle: "Schedule" },
        { icon: "task", title: "Tasks", subtitle: "To-do" },
        { icon: "note", title: "Notes", subtitle: "Ideas" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Find" },
        { icon: "plus", label: "Add" },
        { icon: "heart", label: "Save" },
        { icon: "user", label: "Me" }
      ]
    }
  },
};

function AppIcon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const props = { className: className || "w-4 h-4" };
  const style = color ? { color } : {};
  
  switch (name) {
    case "home": return <Home {...props} style={style} />;
    case "search": return <Search {...props} style={style} />;
    case "plus": return <Plus {...props} style={style} />;
    case "heart": return <Heart {...props} style={style} />;
    case "user": return <User {...props} style={style} />;
    case "bell": return <Bell {...props} style={style} />;
    case "trending": return <TrendingUp {...props} style={style} />;
    case "star": return <Star {...props} style={style} />;
    case "new": return <Sparkle {...props} style={style} />;
    case "popular": return <Rocket {...props} style={style} />;
    case "calendar": return <Calendar {...props} style={style} />;
    case "chart": return <BarChart3 {...props} style={style} />;
    case "settings": return <Settings {...props} style={style} />;
    case "profile": return <User {...props} style={style} />;
    case "music": return <MusicIcon {...props} style={style} />;
    case "video": return <Video {...props} style={style} />;
    case "game": return <Gamepad2 {...props} style={style} />;
    case "book": return <BookOpen {...props} style={style} />;
    case "cpu": return <Cpu {...props} style={style} />;
    case "shield": return <Shield {...props} style={style} />;
    case "database": return <Database {...props} style={style} />;
    case "cloud": return <Cloud {...props} style={style} />;
    case "health": return <HeartPulse {...props} style={style} />;
    case "coffee": return <Coffee {...props} style={style} />;
    case "dumbbell": return <Dumbbell {...props} style={style} />;
    case "food": return <RestaurantIcon {...props} style={style} />;
    case "mail": return <Mail {...props} style={style} />;
    case "task": return <CheckIcon {...props} style={style} />;
    case "note": return <FileText {...props} style={style} />;
    default: return <Home {...props} style={style} />;
  }
}

export default function MobilePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "neon-app";
  const theme = mobileData[id] || mobileData["neon-app"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)' }} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <Link href="/services/mobile-apps" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
          <span className="font-bold text-sm">KraftAI</span>
        </div>
      </nav>

      <div className="relative z-10 px-4 py-6 text-center">
        <div className="flex justify-center gap-2 mb-3">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}50` }} />
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
        <div className="max-w-[280px] mx-auto">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[3rem] blur-xl" />
            <div className="relative bg-black rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center px-4 py-2 bg-black/50 text-[10px] text-slate-400">
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
                  <Bell className="w-4 h-4 text-slate-500" />
                </div>
                
                <div className="p-3 rounded-xl mb-3" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}15, ${theme.colors[1]}15)`, border: `1px solid ${theme.colors[0]}25` }}>
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkle className="w-3 h-3" style={{ color: theme.colors[0] }} />
                    <span className="text-[10px]" style={{ color: theme.colors[0] }}>{theme.preview.hero.badge}</span>
                  </div>
                  <h2 className="text-white font-bold text-base">{theme.preview.hero.title}</h2>
                  <p className="text-[10px] text-slate-400">{theme.preview.hero.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {theme.preview.items.slice(0, 4).map((item, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                        <AppIcon name={item.icon} className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white font-medium">{item.title}</p>
                        <p className="text-[8px] text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-around py-3 bg-black/90 border-t border-white/10">
                {theme.preview.navItems.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    {item.icon === "plus" ? (
                      <div className="w-10 h-10 rounded-full -mt-5 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                        <Plus className="w-4 h-4 text-black" />
                      </div>
                    ) : (
                      <AppIcon name={item.icon} className="w-5 h-5" color={item.active ? theme.colors[0] : '#64748b'} />
                    )}
                    <span className="text-[8px]" style={{ color: item.active ? theme.colors[0] : '#64748b' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-12 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Get This App <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

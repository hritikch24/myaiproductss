import Link from "next/link";
import { ArrowLeft, Smartphone, Tablet, Watch, Box, Zap, Globe, ChevronRight, Hexagon, Cpu, Sparkles, Rocket, MessageCircle, Mail, Download, Star, Play } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Apps | KraftAI",
  description: "Futuristic mobile apps for iOS and Android with 2050+ design. Cross-platform, fast, beautiful.",
};

const themes = [
  {
    id: "neon-app",
    name: "Neon Pulse",
    desc: "High-energy app with vibrant neon accents",
    colors: ["#22d3ee", "#a855f7", "#f472b6"],
    features: ["Neon UI elements", "Animated transitions", "Glow effects", "Dynamic colors"],
  },
  {
    id: "dark-elegant",
    name: "Dark Elegant",
    desc: "Premium dark theme with subtle gradients",
    colors: ["#6366f1", "#8b5cf6", "#a78bfa"],
    features: ["OLED optimization", "Smooth animations", "Minimal interface", "Focus mode"],
  },
  {
    id: "glassmorphism",
    name: "Glass Touch",
    desc: "iOS-inspired glassmorphism design",
    colors: ["#3b82f6", "#0ea5e9", "#06b6d4"],
    features: ["Frosted glass", "Blur layers", "Translucent cards", "Apple-style polish"],
  },
  {
    id: "cyber",
    name: "Cyber Interface",
    desc: "Futuristic cyberpunk-inspired mobile UI",
    colors: ["#ef4444", "#f97316", "#eab308"],
    features: ["Glitch effects", "Tech aesthetics", "Data visualization", "HUD elements"],
  },
  {
    id: "nature",
    name: "Organic Flow",
    desc: "Nature-inspired calming design",
    colors: ["#22c55e", "#10b981", "#14b8a6"],
    features: ["Organic shapes", "Calming colors", "Nature backgrounds", "Zen experience"],
  },
  {
    id: "minimal-2050",
    name: "Minimal 2050",
    desc: "Ultra-minimal futuristic design",
    colors: ["#f8fafc", "#94a3b8", "#475569"],
    features: ["Clean layouts", "Bold typography", "Subtle micro-interactions", "Speed focused"],
  },
];

export default function MobileAppsPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(168,85,247,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Hexagon className="w-10 h-10 text-cyan-400 fill-cyan-400/20" />
          <Cpu className="absolute inset-2 w-4 h-4 text-purple-400" />
          <span className="text-2xl font-bold">Kraft<span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">AI</span></span>
        </div>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
            <Smartphone className="w-4 h-4" />
            <span>Mobile Apps</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">Mobile Apps</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">2050+ Design</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            iOS & Android apps that look like they're from the future. Beautiful, fast, powerful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 p-8">
                <div className="flex gap-2 mb-4">
                  {theme.colors.map((color, cidx) => (
                    <div key={cidx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{theme.name}</h3>
                <p className="text-slate-400 mb-4">{theme.desc}</p>
                <ul className="space-y-2 mb-6">
                  {theme.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/mobile-apps/${theme.id}`}>
                  <span>Preview Theme</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platforms We Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: "iOS", desc: "iPhone & iPad" },
              { icon: Tablet, title: "Android", desc: "All Android devices" },
              { icon: Watch, title: "Wearables", desc: "Smart watches" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-cyan-900/40 via-slate-900/80 to-purple-900/40 border border-white/10 backdrop-blur-xl text-center">
          <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Build Your Mobile App</h2>
          <p className="text-slate-300 mb-6">From idea to App Store & Play Store deployment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-full font-semibold">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-semibold">
              <Mail className="w-5 h-5" />
              Email
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p>© {new Date().getFullYear()} KraftAI. Built for the future.</p>
        </div>
      </footer>
    </div>
  );
}

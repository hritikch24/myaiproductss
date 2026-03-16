import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Globe, Palette, Zap, Shield, Rocket, ChevronRight, Hexagon, Cpu, Sparkles, Layers, Box, Eye, Monitor, Smartphone, Watch } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Website Development Services India | Professional Web Design",
  description: "Get professional custom website development services in India. Responsive websites, landing pages, web platforms with futuristic 2050+ design. Free consultation. Trusted by startups and businesses.",
  keywords: ["website development services India", "custom website design", "responsive website", "landing page design", "web development company India", "professional web designer", "freelance web developer"],
  metadataBase: new URL("https://kraftai.in"),
};

const themes = [
  {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    desc: "Neon lights, dark backgrounds, holographic elements",
    colors: ["#ff00ff", "#00ffff", "#ff0066"],
    features: ["Neon glow effects", "Animated cyber city", "Glitch typography", "Holographic cards"],
  },
  {
    id: "space",
    name: "Deep Space",
    desc: "Cosmic vibes with stars, nebulas, and cosmic dust",
    colors: ["#6366f1", "#8b5cf6", "#ec4899"],
    features: ["Starfield animation", "Nebula backgrounds", "Floating elements", "Cosmic particles"],
  },
  {
    id: "glass",
    name: "Crystal Glass",
    desc: "Premium glassmorphism with frosted glass effects",
    colors: ["#06b6d4", "#3b82f6", "#8b5cf6"],
    features: ["Frosted glass cards", "Reflections", "Depth layers", "Blur effects"],
  },
  {
    id: "neon",
    name: "Neon Genesis",
    desc: "Vibrant neon gradients with glowing elements",
    colors: ["#22d3ee", "#a855f7", "#f472b6"],
    features: ["Neon borders", "Glow animations", "Gradient text", "Light trails"],
  },
  {
    id: "holographic",
    name: "Holographic",
    desc: "Iridescent surfaces with rainbow reflections",
    colors: ["#fbbf24", "#f472b6", "#34d399"],
    features: ["Rainbow gradients", "Iridescent buttons", "Prism effects", "Reflective surfaces"],
  },
  {
    id: "dark-minimal",
    name: "Dark Minimal 2050",
    desc: "Clean, minimal dark theme with subtle futuristic touches",
    colors: ["#f8fafc", "#94a3b8", "#475569"],
    features: ["Minimal layout", "Subtle animations", "Elegant typography", "Monochrome accents"],
  },
];

export default function WebsitesPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(120,50,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(0,200,255,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Hexagon className="w-10 h-10 text-purple-400 fill-purple-400/20" />
          <Cpu className="absolute inset-2 w-4 h-4 text-cyan-400" />
          <span className="text-2xl font-bold">Kraft<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span></span>
        </div>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
            <Globe className="w-4 h-4" />
            <span>Custom Websites</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">Websites</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Beyond 2050</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Futuristic websites that feel like they're from 2050+. Choose a theme or let us create something unique for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
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
                  <Link href={`/services/websites/${theme.id}`}>
                  <span>Preview Theme</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-cyan-900/40 border border-white/10 backdrop-blur-xl text-center">
          <Box className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Want a Custom Theme?</h2>
          <p className="text-slate-300 mb-6">Tell us your vision and we'll create a unique 2050+ design that stands out.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-full font-semibold">
            Discuss Your Project
          </Link>
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

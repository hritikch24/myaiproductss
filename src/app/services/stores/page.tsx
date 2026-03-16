import Link from "next/link";
import { ArrowLeft, Store, ShoppingBag, CreditCard, Package, Users, BarChart3, ChevronRight, Hexagon, Cpu, Sparkles, Box, Rocket, Palette, Globe, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Stores | KraftAI",
  description: "Futuristic e-commerce stores with 2050+ design. Payments, inventory, everything ready.",
};

const themes = [
  {
    id: "luxury",
    name: "Luxury Elite",
    desc: "Premium e-commerce with gold accents and elegant animations",
    colors: ["#fbbf24", "#f59e0b", "#d97706"],
    features: ["Gold gradients", "Smooth transitions", "Premium fonts", "Exclusive feel"],
  },
  {
    id: "tech-store",
    name: "Tech Haven",
    desc: "Gadget & tech store with futuristic product displays",
    colors: ["#06b6d4", "#0891b2", "#0e7490"],
    features: ["3D product views", "Tech animations", "Dark mode default", "Quick specs"],
  },
  {
    id: "fashion",
    name: "Fashion Forward",
    desc: "Trendy fashion store with model-centric design",
    colors: ["#f472b6", "#ec4899", "#db2777"],
    features: ["Lookbook mode", "Size visualizer", "Trending sections", "Style quiz"],
  },
  {
    id: "minimal-store",
    name: "Minimal Store 2050",
    desc: "Ultra-clean store with focus on products",
    colors: ["#f8fafc", "#cbd5e1", "#64748b"],
    features: ["Clean grid", "Focus on images", "Fast checkout", "Wishlist"],
  },
  {
    id: "artisan",
    name: "Artisan Craft",
    desc: "Handmade & artisanal products with organic feel",
    colors: ["#84cc16", "#65a30d", "#4d7c0f"],
    features: ["Story sections", "Artist profiles", "Craft process", "Custom orders"],
  },
  {
    id: "digital",
    name: "Digital Goods",
    desc: "Software, courses & digital products store",
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9"],
    features: ["Instant download", "License keys", "Reviews", "Bundles"],
  },
];

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(120,50,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(0,200,255,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Hexagon className="w-10 h-10 text-pink-400 fill-pink-400/20" />
          <Cpu className="absolute inset-2 w-4 h-4 text-amber-400" />
          <span className="text-2xl font-bold">Kraft<span className="bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent">AI</span></span>
        </div>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm mb-4">
            <Store className="w-4 h-4" />
            <span>Online Stores</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-pink-200 to-amber-200 bg-clip-text text-transparent">E-Commerce</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">Store Themes</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ready-to-use online stores with payments, inventory & admin panel. Pick a theme and start selling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
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
                      <Sparkles className="w-3 h-3 text-pink-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/stores/${theme.id}`}>
                  <span>Preview Theme</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: CreditCard, title: "Payments", desc: "Razorpay, Stripe integration" },
              { icon: Package, title: "Inventory", desc: "Stock management" },
              { icon: Users, title: "Accounts", desc: "Customer accounts" },
              { icon: BarChart3, title: "Analytics", desc: "Sales tracking" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-pink-400" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-pink-900/40 via-slate-900/80 to-amber-900/40 border border-white/10 backdrop-blur-xl text-center">
          <Rocket className="w-16 h-16 text-pink-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Sell Online?</h2>
          <p className="text-slate-300 mb-6">Get your store up and running in days, not months.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-full font-semibold">
            Start Selling
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

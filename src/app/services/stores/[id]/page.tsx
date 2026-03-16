import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, ShoppingBag, Star, MapPin, Clock, Truck, CreditCard, Shield, HeadphonesIcon } from "lucide-react";

const storesData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  element: React.ReactNode;
}> = {
  "luxury": {
    name: "Luxury Elite",
    desc: "Premium e-commerce with gold accents and elegant animations",
    colors: ["#fbbf24", "#f59e0b", "#d97706"],
    element: <LuxuryStore />,
  },
  "tech-store": {
    name: "Tech Haven",
    desc: "Gadget & tech store with futuristic product displays",
    colors: ["#06b6d4", "#0891b2", "#0e7490"],
    element: <TechStore />,
  },
  "fashion": {
    name: "Fashion Forward",
    desc: "Trendy fashion store with model-centric design",
    colors: ["#f472b6", "#ec4899", "#db2777"],
    element: <FashionStore />,
  },
  "minimal-store": {
    name: "Minimal Store 2050",
    desc: "Ultra-clean store with focus on products",
    colors: ["#f8fafc", "#cbd5e1", "#64748b"],
    element: <MinimalStore />,
  },
  "artisan": {
    name: "Artisan Craft",
    desc: "Handmade & artisanal products with organic feel",
    colors: ["#84cc16", "#65a30d", "#4d7c0f"],
    element: <ArtisanStore />,
  },
  "digital": {
    name: "Digital Goods",
    desc: "Software, courses & digital products store",
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9"],
    element: <DigitalStore />,
  },
};

export default function StorePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "luxury";
  const theme = storesData[id] || storesData["luxury"];

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/services/stores" className="flex items-center gap-2 text-slate-400 hover:text-white">
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
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-amber-600 rounded-full font-semibold hover:scale-105 transition-transform">
          Get This Store <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function LuxuryStore() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 min-h-[600px]">
      <div className="p-6 border-b border-amber-500/20">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-serif text-amber-400">LUXE</span>
          <div className="flex gap-6 text-sm text-slate-300">
            <span>New Arrivals</span><span>Collections</span><span>About</span>
          </div>
          <ShoppingBag className="w-5 h-5 text-amber-400" />
        </div>
      </div>
      <div className="p-12 text-center">
        <p className="text-amber-400 text-sm tracking-[0.3em] mb-4">EXCLUSIVE COLLECTION</p>
        <h1 className="text-5xl font-serif text-white mb-4">Timeless Elegance</h1>
        <p className="text-slate-400 mb-8">Premium products for the discerning</p>
        <button className="px-8 py-3 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition-colors">
          Shop Now
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 px-6 pb-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="aspect-square bg-gradient-to-br from-amber-900/50 to-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-amber-500/50">Product {i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStore() {
  return (
    <div className="bg-[#0a0a12] min-h-[600px]">
      <div className="p-4 flex items-center justify-between border-b border-cyan-500/20">
        <span className="text-xl font-bold text-cyan-400">TECH HAVEN</span>
        <div className="flex gap-4">
          <span className="text-cyan-500">🔍</span>
          <span className="text-cyan-500">🛒</span>
        </div>
      </div>
      <div className="p-8 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs mb-4">NEW</div>
        <h1 className="text-4xl font-bold text-white mb-2">Future Tech</h1>
        <p className="text-cyan-400">Next-gen gadgets await</p>
      </div>
      <div className="grid grid-cols-2 gap-4 px-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <div className="w-full aspect-square bg-gradient-to-br from-cyan-600/30 to-transparent rounded mb-3" />
            <p className="text-white font-medium">Device {i}</p>
            <p className="text-cyan-400">$999</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FashionStore() {
  return (
    <div className="bg-white min-h-[600px]">
      <div className="p-4 flex items-center justify-between">
        <span className="text-xl font-bold text-pink-500">MODE</span>
        <span className="text-sm text-slate-500">Menu</span>
      </div>
      <div className="p-12 text-center">
        <h1 className="text-5xl font-light text-slate-800 mb-4">Spring Collection</h1>
        <p className="text-slate-500 mb-6">Trending styles for the season</p>
        <button className="px-8 py-3 bg-pink-500 text-white rounded-full">Explore</button>
      </div>
      <div className="grid grid-cols-3 gap-2 px-6 pb-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="aspect-[3/4] bg-pink-100 rounded-lg flex items-end p-3">
            <span className="text-pink-700 text-sm">Look {i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MinimalStore() {
  return (
    <div className="bg-[#0a0a0a] min-h-[600px] p-6">
      <div className="flex items-center justify-between mb-16">
        <span className="text-lg text-white">store</span>
        <span className="text-slate-500">3 items</span>
      </div>
      <div className="text-center py-12">
        <h1 className="text-6xl font-light text-white mb-4">Simple.</h1>
        <p className="text-slate-500 mb-8">Just products. Nothing more.</p>
        <button className="px-8 py-4 bg-white text-black rounded-full font-medium">Browse</button>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-900 rounded">
            <span className="text-white">Product {i}</span>
            <span className="text-slate-500">$99</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtisanStore() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-amber-50 min-h-[600px] p-6">
      <div className="flex items-center justify-between mb-12">
        <span className="text-2xl font-serif text-green-800">Artisan</span>
        <span className="text-green-700">Cart (0)</span>
      </div>
      <div className="text-center py-8">
        <h1 className="text-4xl font-serif text-green-900 mb-4">Handcrafted with Love</h1>
        <p className="text-green-700">Unique pieces from local artisans</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-4 bg-white rounded-xl shadow-sm">
            <div className="aspect-square bg-green-100 rounded mb-3" />
            <p className="text-green-900 font-medium">Handmade {i}</p>
            <p className="text-green-700">$49</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DigitalStore() {
  return (
    <div className="bg-[#0f0a1e] min-h-[600px] p-6">
      <div className="flex items-center justify-between mb-12">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DIGITAL</span>
        <span className="text-purple-400">My Account</span>
      </div>
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-4">Digital Products</h1>
        <p className="text-purple-400 mb-6">Instant download. Start now.</p>
      </div>
      <div className="space-y-3">
        {["Premium Course", "Software License", "Template Pack", "E-book Bundle"].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div>
              <p className="text-white font-medium">{item}</p>
              <p className="text-purple-400 text-sm">Instant access</p>
            </div>
            <span className="text-white">$79</span>
          </div>
        ))}
      </div>
    </div>
  );
}

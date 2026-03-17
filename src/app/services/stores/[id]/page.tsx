import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Menu, Home, Search, User, ChevronLeft, X, Heart, Plus, Star, ShoppingBag, Package, Tag, Clock, Truck, CreditCard, Sparkle, Filter, Bell, MessageCircle } from "lucide-react";

const storesData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
  preview: {
    header: { title: string; subtitle: string };
    hero: { badge: string; title: string; cta: string };
    products: { name: string; price: string; image: string }[];
    navItems: { icon: string; label: string; active?: boolean }[];
  };
}> = {
  "luxury": {
    name: "Luxury Elite",
    desc: "Premium e-commerce with gold accents",
    colors: ["#fbbf24", "#f59e0b", "#d97706"],
    features: ["Gold gradients", "Smooth transitions", "Premium fonts"],
    preview: {
      header: { title: "LUXE", subtitle: "Premium Shopping" },
      hero: { badge: "New Collection", title: "Timeless Elegance", cta: "Shop Now" },
      products: [{ name: "Gold Watch", price: "$2,499", image: "gold" }, { name: "Leather Bag", price: "$899", image: "brown" }, { name: "Silk Scarf", price: "$299", image: "cream" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Browse" }, { icon: "bag", label: "Cart" }, { icon: "heart", label: "Saved" }, { icon: "user", label: "Profile" }]
    }
  },
  "tech-store": {
    name: "Tech Haven",
    desc: "Gadget & tech store",
    colors: ["#06b6d4", "#0891b2", "#0e7490"],
    features: ["3D product views", "Tech animations", "Dark mode"],
    preview: {
      header: { title: "TECHHAVEN", subtitle: "Future Tech" },
      hero: { badge: "Latest Drop", title: "Next-Gen Gadgets", cta: "Explore" },
      products: [{ name: "Smart Watch", price: "$599", image: "cyan" }, { name: "Wireless Earbuds", price: "$299", image: "blue" }, { name: "VR Headset", price: "$999", image: "purple" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Search" }, { icon: "bag", label: "Cart" }, { icon: "bell", label: "Alerts" }, { icon: "user", label: "Profile" }]
    }
  },
  "fashion": {
    name: "Fashion Forward",
    desc: "Trendy fashion store",
    colors: ["#f472b6", "#ec4899", "#db2777"],
    features: ["Lookbook", "Size visualizer", "Trending"],
    preview: {
      header: { title: "MODA", subtitle: "Style Hub" },
      hero: { badge: "Summer 2050", title: "Trending Now", cta: "Shop Trends" },
      products: [{ name: "Summer Dress", price: "$149", image: "pink" }, { name: "Designer Bag", price: "$399", image: "rose" }, { name: "Sunglasses", price: "$199", image: "black" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Style" }, { icon: "plus", label: "Post" }, { icon: "heart", label: "Likes" }, { icon: "user", label: "Profile" }]
    }
  },
  "minimal-store": {
    name: "Minimal Store 2050",
    desc: "Ultra-clean store",
    colors: ["#f8fafc", "#cbd5e1", "#64748b"],
    features: ["Clean grid", "Focus on images", "Fast checkout"],
    preview: {
      header: { title: "MINIMAL", subtitle: "Less is More" },
      hero: { badge: "Essentials", title: "Simply Better", cta: "Browse" },
      products: [{ name: "Basic Tee", price: "$49", image: "white" }, { name: "Core Pants", price: "$89", image: "gray" }, { name: "Simple Bag", price: "$59", image: "black" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Find" }, { icon: "bag", label: "Cart" }, { icon: "heart", label: "Save" }, { icon: "user", label: "Me" }]
    }
  },
  "artisan": {
    name: "Artisan Craft",
    desc: "Handmade products",
    colors: ["#84cc16", "#65a30d", "#4d7c0f"],
    features: ["Story sections", "Artist profiles", "Custom orders"],
    preview: {
      header: { title: "CRAFT", subtitle: "Handmade with Love" },
      hero: { badge: "Artisan Made", title: "Unique Pieces", cta: "Discover" },
      products: [{ name: "Ceramic Vase", price: "$129", image: "green" }, { name: "Woven Basket", price: "$79", image: "brown" }, { name: "Handmade Candle", price: "$39", image: "cream" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Artists" }, { icon: "plus", label: "Create" }, { icon: "heart", label: "Favorites" }, { icon: "user", label: "Profile" }]
    }
  },
  "digital": {
    name: "Digital Goods",
    desc: "Software & courses",
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9"],
    features: ["Instant download", "License keys", "Bundles"],
    preview: {
      header: { title: "DIGISTORE", subtitle: "Instant Access" },
      hero: { badge: "New Release", title: "Digital Mastery", cta: "Get Now" },
      products: [{ name: "AI Course", price: "$199", image: "purple" }, { name: "Pro Software", price: "$299", image: "violet" }, { name: "Bundle Pack", price: "$399", image: "indigo" }],
      navItems: [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Browse" }, { icon: "bag", label: "Library" }, { icon: "bell", label: "Updates" }, { icon: "user", label: "Account" }]
    }
  },
};

function StoreIcon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const props = { className: className || "w-4 h-4" };
  const style = color ? { color } : {};
  
  switch (name) {
    case "home": return <Home {...props} style={style} />;
    case "search": return <Search {...props} style={style} />;
    case "plus": return <Plus {...props} style={style} />;
    case "heart": return <Heart {...props} style={style} />;
    case "user": return <User {...props} style={style} />;
    case "bag": return <ShoppingBag {...props} style={style} />;
    case "bell": return <Bell {...props} style={style} />;
    default: return <Home {...props} style={style} />;
  }
}

const getProductBg = (color: string) => {
  switch (color) {
    case "gold": return "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)";
    case "brown": return "linear-gradient(135deg, #92400e 0%, #78350f 100%)";
    case "cream": return "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)";
    case "cyan": return "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)";
    case "blue": return "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
    case "purple": return "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)";
    case "pink": return "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)";
    case "rose": return "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)";
    case "black": return "linear-gradient(135deg, #1f2937 0%, #111827 100%)";
    case "white": return "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)";
    case "gray": return "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)";
    case "green": return "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)";
    case "violet": return "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)";
    case "indigo": return "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)";
    default: return "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)";
  }
};

export default function StorePreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "luxury";
  const theme = storesData[id] || storesData["luxury"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)' }} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <Link href="/services/stores" className="flex items-center gap-2 text-slate-400 hover:text-white">
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
        <p className="text-slate-400 text-sm px-4">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">{feature}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-[320px] mx-auto">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-amber-500/20 to-yellow-500/20 rounded-[2.5rem] blur-xl" />
            <div className="relative bg-black rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] text-slate-500">store.kraftai.in</div>
                <div className="w-10" />
              </div>
              
              <div className="p-4 space-y-4 bg-gradient-to-b from-slate-900 to-[#0a0a0f]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: theme.colors[0] }}>{theme.preview.header.title}</span>
                  <div className="flex gap-2">
                    <Search className="w-4 h-4 text-slate-500" />
                    <Menu className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                <div className="text-center py-3">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-[10px] mb-2" style={{ color: theme.colors[0] }}>
                    <Sparkle className="w-3 h-3" />
                    {theme.preview.hero.badge}
                  </div>
                  <h2 className="text-lg font-bold mb-2">{theme.preview.hero.title}</h2>
                  <button className="px-4 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: theme.colors[0], color: '#000' }}>{theme.preview.hero.cta}</button>
                </div>

                <div className="flex gap-1 items-center text-[10px] text-slate-500">
                  <Truck className="w-3 h-3" />
                  <span>Free shipping on orders $50+</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {theme.preview.products.map((product, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <div className="aspect-square rounded mb-2" style={{ background: getProductBg(product.image) }} />
                      <p className="text-[10px] font-medium truncate">{product.name}</p>
                      <p className="text-[10px] font-bold" style={{ color: theme.colors[0] }}>{product.price}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-around py-2 bg-slate-900/50 rounded-full border border-white/5">
                  {theme.preview.navItems.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <StoreIcon name={item.icon} className="w-4 h-4" color={item.active ? theme.colors[0] : '#64748b'} />
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
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-amber-600 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Get This Store <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

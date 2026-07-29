'use client';

import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  Instagram,
  Facebook,
  MessageSquare,
  Menu as MenuIcon,
  X,
  ArrowRight,
  ArrowUpRight,
  Utensils,
  Truck,
  CalendarDays,
  Users,
  Globe,
  CheckCircle2,
  Minus,
  Plus,
  Flame,
  Leaf,
  Award,
  Heart,
  Mail,
  Timer,
  Sparkles,
  Package,
  ZoomIn,
  ChevronLeft,
} from 'lucide-react';

/* ─── Menu Data ─── */
const CATEGORIES = ['All', 'Mains', 'Small plates', 'Breads', 'Drinks', 'Desserts'] as const;

interface MenuItem {
  name: string;
  price: number;
  desc: string;
  category: string;
  badge?: string;
  spicy?: boolean;
  veg?: boolean;
  popular?: boolean;
}

const MENU: MenuItem[] = [
  { name: 'Heritage Thali', price: 450, desc: 'Twelve-item platter. Dal makhani, seasonal sabzi, raita, papad, rice, roti, pickle, chutney, gulab jamun.', category: 'Mains', badge: 'Signature', popular: true, veg: true },
  { name: 'Slow-cooked Dum Biryani', price: 380, desc: 'Aged basmati layered with saffron, caramelized onions, whole spices. Sealed and slow-cooked for 4 hours.', category: 'Mains', popular: true },
  { name: 'Rogan Josh', price: 420, desc: 'Kashmiri-style braised lamb in aromatic fennel and dried ginger gravy.', category: 'Mains', spicy: true },
  { name: 'Paneer Lababdar', price: 320, desc: 'House-made paneer in rich tomato-cashew gravy with fenugreek.', category: 'Mains', veg: true },
  { name: 'Crispy Samosa', price: 80, desc: 'Hand-folded pastry with spiced potato and pea filling. Served with tamarind and mint chutney.', category: 'Small plates', veg: true, popular: true },
  { name: 'Seekh Kebab', price: 280, desc: 'Charcoal-grilled minced lamb with green chilli, coriander, and a hint of mace.', category: 'Small plates', spicy: true },
  { name: 'Dahi Puri', price: 120, desc: 'Crisp shells topped with yogurt, sev, sweet chutney, and pomegranate.', category: 'Small plates', veg: true },
  { name: 'Amritsari Fish', price: 340, desc: 'Batter-fried river sole with carom seeds, chaat masala, and lime.', category: 'Small plates' },
  { name: 'Garlic Naan', price: 60, desc: 'Clay-oven bread brushed with garlic butter and fresh coriander.', category: 'Breads', veg: true },
  { name: 'Lachha Paratha', price: 70, desc: 'Multi-layered flaky whole wheat bread cooked on tawa.', category: 'Breads', veg: true },
  { name: 'Kulhad Chai', price: 50, desc: 'Strong Assam tea with whole spices, served in traditional clay cup.', category: 'Drinks', veg: true, popular: true },
  { name: 'Fresh Mango Lassi', price: 120, desc: 'Thick yogurt blended with Alphonso pulp and a touch of cardamom.', category: 'Drinks', veg: true, badge: 'Seasonal' },
  { name: 'Rose Falooda', price: 150, desc: 'Layered rose milk, basil seeds, vermicelli, and kulfi ice cream.', category: 'Desserts', veg: true },
  { name: 'Gulab Jamun', price: 100, desc: 'Soft milk-solid dumplings soaked in cardamom-saffron sugar syrup. Served warm.', category: 'Desserts', veg: true },
];

const REVIEWS = [
  { name: 'Priya M.', text: "The thali here is unmatched. Twelve items, each one distinct. We've been coming every Sunday for three years — it's become family tradition.", rating: 5, date: 'Feb 2026', avatar: 'PM' },
  { name: 'Rahul S.', text: "Ordered the biryani for a house party via their site. Arrived on time, piping hot, and the flavor was restaurant-quality. The direct ordering saved us a fortune vs Zomato.", rating: 5, date: 'Jan 2026', avatar: 'RS' },
  { name: 'Sarah K.', text: "Found this place while traveling. The samosa and chai alone were worth the detour. You can taste the difference when everything is made fresh.", rating: 5, date: 'Mar 2026', avatar: 'SK' },
  { name: 'Amit D.', text: "Booked catering for our office Diwali event — 80 people. Flawless execution, incredible food, and they handled everything from setup to cleanup.", rating: 5, date: 'Nov 2025', avatar: 'AD' },
  { name: 'Jenny L.', text: "As a tourist, the website made it so easy to find the menu, hours, and directions. Wish every restaurant in India had this level of online presence.", rating: 4, date: 'Dec 2025', avatar: 'JL' },
];

/* ─── Gallery Data ─── */
interface GalleryItem {
  name: string;
  desc: string;
  gradient: string;
  accent: string;
  img: string;
}

const GALLERY: GalleryItem[] = [
  { name: 'Heritage Thali', desc: '12-item platter served on brass', gradient: 'from-amber-800 via-orange-700 to-yellow-600', accent: 'Signature', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dum Biryani', desc: 'Sealed pot, 4-hour slow cook', gradient: 'from-amber-900 via-amber-700 to-yellow-500', accent: 'Best seller', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Rogan Josh', desc: 'Kashmiri-style braised lamb', gradient: 'from-red-900 via-red-700 to-orange-600', accent: 'Spicy', img: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80' },
  { name: 'Crispy Samosa', desc: 'Hand-folded, served with chutneys', gradient: 'from-yellow-800 via-amber-600 to-orange-400', accent: 'Popular', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { name: 'Seekh Kebab', desc: 'Charcoal-grilled minced lamb', gradient: 'from-stone-800 via-red-900 to-orange-800', accent: 'Chef pick', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kulhad Chai', desc: 'Whole-spice Assam in clay cup', gradient: 'from-amber-950 via-amber-800 to-amber-600', accent: 'Iconic', img: 'https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?auto=format&fit=crop&w=800&q=80' },
];

/* ─── Combo Data ─── */
interface ComboOption {
  category: string;
  items: { name: string; price: number }[];
}

const COMBO_OPTIONS: ComboOption[] = [
  { category: 'Starter', items: [
    { name: 'Crispy Samosa (2pc)', price: 80 },
    { name: 'Dahi Puri', price: 120 },
    { name: 'Seekh Kebab', price: 280 },
    { name: 'Amritsari Fish', price: 340 },
  ]},
  { category: 'Main course', items: [
    { name: 'Heritage Thali', price: 450 },
    { name: 'Dum Biryani', price: 380 },
    { name: 'Rogan Josh + Naan', price: 480 },
    { name: 'Paneer Lababdar + Roti', price: 380 },
  ]},
  { category: 'Drinks', items: [
    { name: 'Kulhad Chai', price: 50 },
    { name: 'Mango Lassi', price: 120 },
    { name: 'Rose Falooda', price: 150 },
    { name: 'Fresh Lime Soda', price: 60 },
  ]},
  { category: 'Dessert', items: [
    { name: 'Gulab Jamun (2pc)', price: 100 },
    { name: 'Rose Falooda', price: 150 },
    { name: 'Kulfi Stick', price: 80 },
    { name: 'Rasmalai (2pc)', price: 120 },
  ]},
];

const PARTY_SIZES = [
  { label: '2 people', multiplier: 1 },
  { label: '4 people', multiplier: 2 },
  { label: '6 people', multiplier: 3 },
  { label: '10 people', multiplier: 5 },
  { label: '20 people', multiplier: 10 },
];

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Components ─── */
function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <div className="group relative flex gap-4 p-4 rounded-2xl hover:bg-stone-50 transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-semibold text-stone-900 text-[15px]">{item.name}</h3>
          {item.veg && (
            <span className="inline-flex items-center justify-center h-4 w-4 rounded-sm border-2 border-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            </span>
          )}
          {item.spicy && <Flame className="h-3.5 w-3.5 text-red-500" />}
          {item.badge && (
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">{item.badge}</span>
          )}
          {item.popular && !item.badge && (
            <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">Popular</span>
          )}
        </div>
        <p className="text-[13px] text-stone-500 leading-relaxed line-clamp-2 pr-4">{item.desc}</p>
        <div className="flex items-center gap-3 mt-2.5">
          <span className="text-[15px] font-semibold text-stone-900">&#8377;{item.price}</span>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-full transition-all duration-150 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
      {/* Subtle decorative line on hover */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-8 bg-stone-900 rounded-full transition-all duration-300" />
    </div>
  );
}

/* ─── Main Page ─── */
export default function DemoPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [scrolled, setScrolled] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [zoomedGallery, setZoomedGallery] = useState(false);
  const [comboSelections, setComboSelections] = useState<Record<string, number>>({});
  const [partySize, setPartySize] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [name, qty]) => {
    const item = MENU.find(m => m.name === name);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const filteredMenu = activeCategory === 'All' ? MENU : MENU.filter(m => m.category === activeCategory);

  const addToCart = (name: string) => {
    setCart(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const toggleComboItem = (catIndex: number, itemIndex: number) => {
    const key = `${catIndex}-${itemIndex}`;
    setComboSelections(prev => {
      const next = { ...prev };
      // Remove other selections in same category
      Object.keys(next).forEach(k => { if (k.startsWith(`${catIndex}-`)) delete next[k]; });
      if (prev[key]) return next;
      next[key] = 1;
      return next;
    });
  };

  const comboTotal = Object.entries(comboSelections).reduce((sum, [key]) => {
    const [catI, itemI] = key.split('-').map(Number);
    return sum + (COMBO_OPTIONS[catI]?.items[itemI]?.price || 0);
  }, 0) * (PARTY_SIZES[partySize]?.multiplier || 1);

  const comboItemCount = Object.keys(comboSelections).length;
  const comboSavings = Math.round(comboTotal * 0.15);

  return (
    <div className="min-h-screen bg-white text-stone-900 antialiased">

      {/* ── Announcement ── */}
      <div className="bg-stone-900 text-center text-[13px] py-2.5 px-4">
        <span className="text-stone-300">Order directly &amp; get </span>
        <span className="text-white font-medium">10% off</span>
        <span className="text-stone-300"> your first order </span>
        <span className="text-stone-500 mx-1.5">·</span>
        <span className="text-stone-400 font-mono text-xs tracking-wider">WELCOME10</span>
      </div>

      {/* ── Navbar ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]' : 'bg-white'}`}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-[64px]">
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-[10px] bg-stone-900 flex items-center justify-center text-white font-semibold text-sm tracking-tight group-hover:scale-105 transition-transform duration-200">
              HK
            </div>
            <div className="leading-none">
              <div className="text-[15px] font-semibold text-stone-900 tracking-[-0.01em]">Heritage Kitchen</div>
              <div className="text-[11px] text-stone-400 mt-0.5 tracking-wide uppercase">Since 1972</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {['Menu', 'Order', 'Story', 'Catering', 'Locations'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-3.5 py-2 text-[13px] font-medium text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-50 transition-all duration-150"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 bg-stone-900 text-white rounded-full pl-4 pr-1.5 py-1.5 text-[13px] font-medium">
                <ShoppingCart className="h-4 w-4" />
                <span>{cartCount} items · &#8377;{cartTotal.toLocaleString()}</span>
                <span className="h-7 w-7 rounded-full bg-white text-stone-900 flex items-center justify-center">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            )}
            {cartCount > 0 && (
              <button className="sm:hidden relative p-2">
                <ShoppingCart className="h-5 w-5 text-stone-700" />
                <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 min-w-[18px] rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-semibold">{cartCount}</span>
              </button>
            )}
            <button className="md:hidden p-2 rounded-lg hover:bg-stone-50" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-stone-100 bg-white px-5 py-3">
            {['Menu', 'Order', 'Story', 'Catering', 'Locations'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block py-2.5 text-[15px] font-medium text-stone-600 hover:text-stone-900">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-32">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 text-stone-600 px-4 py-1.5 text-[13px] font-medium mb-8">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-stone-400 mx-1">·</span>
              4.8 from 2,400+ reviews
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-stone-900 leading-[1.05] tracking-[-0.03em] max-w-3xl">
              Three generations.<br />
              One kitchen.<br />
              <span className="text-stone-400">No shortcuts.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg sm:text-xl text-stone-500 max-w-xl leading-relaxed font-normal">
              We grind our spices every morning, roll our bread by hand, and cook everything to order. Since 1972.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-3 mt-10">
              <a href="#order" className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-7 py-3.5 text-[15px] font-semibold hover:bg-stone-800 transition-all duration-200 active:scale-[0.98]">
                Order online
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-stone-100 text-stone-700 px-7 py-3.5 text-[15px] font-semibold hover:bg-stone-200 transition-all duration-200">
                See the menu
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-14 text-[13px] text-stone-500">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-stone-400" /> Open today 11 AM – 11 PM</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-stone-400" /> 3 locations</span>
              <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-stone-400" /> Free delivery above &#8377;500</span>
            </div>
          </FadeIn>
        </div>

        {/* Decorative grid dots */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 sm:py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { num: '52', label: 'Years of legacy', icon: Award },
            { num: '3', label: 'City locations', icon: MapPin },
            { num: '40+', label: 'Menu items', icon: Utensils },
            { num: '2,400+', label: 'Happy reviews', icon: Heart },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.05}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-9 w-9 rounded-xl bg-stone-50 flex items-center justify-center shrink-0">
                  <s.icon className="h-4.5 w-4.5 text-stone-400" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">{s.num}</div>
                  <div className="text-[13px] text-stone-500 mt-0.5">{s.label}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Flavor Gallery ── */}
      <section className="py-16 sm:py-24 bg-stone-950 text-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-500 mb-3">
                  <ZoomIn className="h-4 w-4" /> Tap any dish to zoom in
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em]">From our kitchen</h2>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setGalleryIndex(i => Math.max(0, i - 1))}
                  className="h-9 w-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-stone-400" />
                </button>
                <button
                  onClick={() => setGalleryIndex(i => Math.min(GALLERY.length - 1, i + 1))}
                  className="h-9 w-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-stone-400" />
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Gallery cards */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory">
            {GALLERY.map((item, i) => (
              <button
                key={item.name}
                onClick={() => { setGalleryIndex(i); setZoomedGallery(true); }}
                className="group relative shrink-0 w-[260px] sm:w-[300px] rounded-2xl overflow-hidden snap-start"
              >
                <div className={`aspect-[4/5] bg-gradient-to-br ${item.gradient} relative`}>
                  {/* Real food image */}
                  <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-semibold text-white/90 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full">{item.accent}</span>
                  </div>
                  {/* Zoom hint */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-8 w-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {/* Info at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-[13px] text-white/70 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-5">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === galleryIndex ? 'w-6 bg-white' : 'w-1.5 bg-stone-700'}`}
              />
            ))}
          </div>
        </div>

        {/* Zoomed overlay */}
        {zoomedGallery && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setZoomedGallery(false)}
          >
            <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <div className={`aspect-[3/4] rounded-3xl bg-gradient-to-br ${GALLERY[galleryIndex].gradient} relative overflow-hidden`}>
                <img src={GALLERY[galleryIndex].img} alt={GALLERY[galleryIndex].name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-[12px] font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">{GALLERY[galleryIndex].accent}</span>
                  <h3 className="text-2xl font-bold text-white mt-3">{GALLERY[galleryIndex].name}</h3>
                  <p className="text-[15px] text-white/70 mt-1">{GALLERY[galleryIndex].desc}</p>
                </div>
              </div>
              <button
                onClick={() => setZoomedGallery(false)}
                className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              {/* Nav arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-14 hidden sm:block">
                <button
                  onClick={() => setGalleryIndex(i => Math.max(0, i - 1))}
                  className="h-10 w-10 rounded-full bg-stone-800/60 hover:bg-stone-700 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-14 hidden sm:block">
                <button
                  onClick={() => setGalleryIndex(i => Math.min(GALLERY.length - 1, i + 1))}
                  className="h-10 w-10 rounded-full bg-stone-800/60 hover:bg-stone-700 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Party Combo Builder ── */}
      <section className="py-16 sm:py-24 border-t border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-4 py-1.5 text-[13px] font-medium mb-4">
                <Sparkles className="h-4 w-4" /> Smart Feature
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-[-0.02em]">
                Party combo builder
              </h2>
              <p className="text-stone-500 mt-2 text-[15px] max-w-lg mx-auto">
                Family gathering? Office lunch? Pick one from each category, set your group size, done. Complete order in one tap.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-5 sm:p-8">
              {/* Party size selector */}
              <div className="mb-8">
                <div className="text-[13px] font-semibold text-stone-900 mb-3">How many people?</div>
                <div className="flex gap-2 flex-wrap">
                  {PARTY_SIZES.map((size, i) => (
                    <button
                      key={size.label}
                      onClick={() => setPartySize(i)}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                        partySize === i
                          ? 'bg-stone-900 text-white'
                          : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category columns */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {COMBO_OPTIONS.map((cat, catI) => {
                  const selectedKey = Object.keys(comboSelections).find(k => k.startsWith(`${catI}-`));
                  return (
                    <div key={cat.category} className="rounded-xl bg-white border border-stone-100 overflow-hidden">
                      <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                        <div className="text-[12px] font-semibold text-stone-500 uppercase tracking-wider">{cat.category}</div>
                      </div>
                      <div className="p-2">
                        {cat.items.map((item, itemI) => {
                          const key = `${catI}-${itemI}`;
                          const selected = !!comboSelections[key];
                          return (
                            <button
                              key={item.name}
                              onClick={() => toggleComboItem(catI, itemI)}
                              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 flex items-center justify-between gap-2 ${
                                selected
                                  ? 'bg-stone-900 text-white'
                                  : 'hover:bg-stone-50 text-stone-700'
                              }`}
                            >
                              <span className="text-[13px] font-medium truncate">{item.name}</span>
                              <span className={`text-[12px] font-semibold shrink-0 ${selected ? 'text-stone-300' : 'text-stone-400'}`}>
                                &#8377;{item.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary bar */}
              <div className="rounded-xl bg-stone-900 text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Package className="h-5 w-5 text-stone-400" />
                    <span className="text-[15px] font-semibold">
                      {comboItemCount === 0
                        ? 'Select items to build your combo'
                        : `${comboItemCount}/4 categories selected`}
                    </span>
                  </div>
                  {comboItemCount > 0 && (
                    <div className="flex items-center gap-3 text-[13px] text-stone-400 ml-8">
                      <span>{PARTY_SIZES[partySize].label}</span>
                      <span className="text-stone-600">·</span>
                      <span>&#8377;{comboTotal.toLocaleString()} total</span>
                      {comboItemCount === 4 && (
                        <>
                          <span className="text-stone-600">·</span>
                          <span className="text-emerald-400 font-medium">Save &#8377;{comboSavings} with combo</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <button
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-200 shrink-0 ${
                    comboItemCount === 4
                      ? 'bg-white text-stone-900 hover:bg-stone-100 active:scale-[0.98]'
                      : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {comboItemCount === 4
                    ? `Add combo · &#8377;${(comboTotal - comboSavings).toLocaleString()}`
                    : `Pick ${4 - comboItemCount} more`}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-[-0.02em]">The menu</h2>
                <p className="text-stone-500 mt-2 text-[15px]">Every dish made from scratch, every day.</p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[13px] text-stone-400">
                <Leaf className="h-4 w-4 text-green-600" /> Veg
                <span className="mx-2 text-stone-200">·</span>
                <Flame className="h-4 w-4 text-red-500" /> Spicy
              </div>
            </div>
          </FadeIn>

          {/* Category pills */}
          <FadeIn delay={0.05}>
            <div className="flex gap-1.5 mb-8 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Menu Grid */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 divide-y sm:divide-y-0 divide-stone-100">
            {filteredMenu.map((item, i) => (
              <FadeIn key={item.name} delay={Math.min(i * 0.03, 0.3)}>
                <MenuCard item={item} onAdd={() => addToCart(item.name)} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Order CTA ── */}
      <section id="order" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
          <FadeIn>
            <div className="rounded-3xl bg-stone-900 text-white px-8 sm:px-14 py-12 sm:py-16 relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-400 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Now accepting orders
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] mb-4">
                  Order directly.<br />Zero commission.
                </h2>
                <p className="text-stone-400 text-[15px] leading-relaxed mb-8">
                  Why pay 25–30% to delivery apps? Order from us directly — same food, same speed, better price. Pickup in 20 minutes or delivery to your door.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full bg-white text-stone-900 px-7 py-3.5 text-[15px] font-semibold hover:bg-stone-100 transition-all duration-200 active:scale-[0.98]">
                    <Timer className="h-4.5 w-4.5" />
                    Order for pickup
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full bg-stone-800 text-white px-7 py-3.5 text-[15px] font-semibold hover:bg-stone-700 transition-all duration-200 border border-stone-700">
                    <Truck className="h-4.5 w-4.5" />
                    Order delivery
                  </button>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Story ── */}
      <section id="story" className="py-16 sm:py-24 border-t border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <div className="text-[13px] font-medium text-stone-400 uppercase tracking-wider mb-4">Our story</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-[-0.02em] mb-6">
                  Started at a street corner.<br />
                  <span className="text-stone-400">Now in three locations.</span>
                </h2>
                <div className="space-y-4 text-[15px] text-stone-600 leading-relaxed">
                  <p>
                    In 1972, our grandmother set up a small stall with one tawa, five dishes, and a belief that honest food speaks for itself. Word spread. The stall became a shop. The shop became a restaurant.
                  </p>
                  <p>
                    Three generations later, we still follow her rules: grind spices fresh every morning, never use frozen ingredients, and treat every plate like it&apos;s going to family. The kitchen has grown, but the standards haven&apos;t changed.
                  </p>
                  <p>
                    Today, Heritage Kitchen serves 800+ meals daily across three locations — and every single one starts with the same recipe book our grandmother wrote by hand.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-4">
                {[
                  { year: '1972', event: 'Founded as a street-side stall with five dishes' },
                  { year: '1985', event: 'Opened first permanent restaurant at Hazratganj' },
                  { year: '2003', event: 'Second location at City Centre Mall' },
                  { year: '2018', event: 'Third location on Airport Road' },
                  { year: '2024', event: 'Launched direct online ordering — 0% commission' },
                  { year: '2026', event: '2,400+ Google reviews, 200+ catered events' },
                ].map((milestone, i) => (
                  <div key={milestone.year} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-stone-100 group-hover:bg-stone-900 text-stone-500 group-hover:text-white flex items-center justify-center text-[11px] font-bold transition-all duration-200 shrink-0">
                        {milestone.year.slice(2)}
                      </div>
                      {i < 5 && <div className="w-px h-full bg-stone-100 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <div className="text-[13px] font-semibold text-stone-900">{milestone.year}</div>
                      <div className="text-[13px] text-stone-500">{milestone.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 sm:py-24 bg-stone-50/50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-[-0.02em]">Reviews</h2>
                <p className="text-stone-500 mt-2 text-[15px]">From Google, unedited.</p>
              </div>
              <a href="#" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-stone-500 hover:text-stone-900 transition-colors">
                All reviews <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.05}>
                <div className="rounded-2xl bg-white border border-stone-100 p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[14px] text-stone-600 leading-relaxed flex-1">{r.text}</p>
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-stone-100">
                    <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-[11px] font-semibold text-stone-500">
                      {r.avatar}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-stone-900">{r.name}</div>
                      <div className="text-[11px] text-stone-400">{r.date}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {REVIEWS.slice(3).map((r, i) => (
                <div key={r.name} className="rounded-2xl bg-white border border-stone-100 p-5 flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-[11px] font-semibold text-stone-500 shrink-0 mt-0.5">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-stone-900">{r.name}</span>
                      <div className="flex gap-0.5">
                        {[...Array(r.rating)].map((_, j) => <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-[13px] text-stone-500 leading-relaxed">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Catering ── */}
      <section id="catering" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-14">
              <div className="grid sm:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="text-[13px] font-medium text-stone-400 uppercase tracking-wider mb-4">Catering</div>
                  <h2 className="text-3xl font-extrabold text-stone-900 tracking-[-0.02em] mb-4">
                    The full experience,<br />at your venue.
                  </h2>
                  <p className="text-[15px] text-stone-500 leading-relaxed mb-8">
                    Weddings, corporate events, festivals. Custom menus from 50 to 500 guests. We handle everything from setup to cleanup.
                  </p>
                  <div className="space-y-2.5 mb-8">
                    {['Custom menu planning with our chef', 'Professional setup and service staff', 'Dietary accommodations (veg, vegan, Jain)', 'Live counters available (chaat, dosa, kebab)'].map(item => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4.5 w-4.5 text-stone-400 mt-0.5 shrink-0" />
                        <span className="text-[14px] text-stone-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-7 py-3.5 text-[15px] font-semibold hover:bg-stone-800 transition-all duration-200 active:scale-[0.98]">
                    <Mail className="h-4.5 w-4.5" />
                    Get a quote
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: '50–500', label: 'Guests', icon: Users },
                    { num: '40+', label: 'Dishes', icon: Utensils },
                    { num: '200+', label: 'Events done', icon: CalendarDays },
                    { num: '4.9', label: 'Event rating', icon: Star },
                  ].map(s => (
                    <div key={s.label} className="rounded-2xl bg-stone-50 p-5 text-center">
                      <s.icon className="h-5 w-5 text-stone-400 mx-auto mb-3" />
                      <div className="text-xl font-bold text-stone-900">{s.num}</div>
                      <div className="text-[12px] text-stone-500 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Locations ── */}
      <section id="locations" className="py-16 sm:py-24 border-t border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-[-0.02em] mb-2">Locations</h2>
            <p className="text-stone-500 text-[15px] mb-10">Three spots, one standard.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Hazratganj', sub: 'Main branch · Flagship', addr: '14 MG Road, Hazratganj', hours: '11 AM – 11 PM', since: 'Since 1985' },
              { name: 'City Centre Mall', sub: 'Food court · Level 3', addr: 'City Centre, Ashok Marg', hours: '10 AM – 10 PM', since: 'Since 2003' },
              { name: 'Airport Road', sub: 'Near Terminal 1', addr: 'Plot 7, Airport Road', hours: '8 AM – 12 AM', since: 'Since 2018' },
            ].map((loc, i) => (
              <FadeIn key={loc.name} delay={i * 0.05}>
                <div className="rounded-2xl border border-stone-100 bg-white p-6 hover:border-stone-300 transition-colors duration-200 group">
                  {/* Map placeholder */}
                  <div className="rounded-xl bg-stone-50 h-36 mb-5 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    <MapPin className="h-6 w-6 text-stone-300 group-hover:text-stone-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-stone-900 text-[15px]">{loc.name}</h3>
                  <div className="text-[12px] text-stone-400 mt-0.5 mb-3">{loc.sub}</div>
                  <div className="space-y-1.5 text-[13px] text-stone-500">
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />{loc.addr}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-stone-400 shrink-0" />{loc.hours}</div>
                  </div>
                  <button className="mt-4 w-full rounded-xl bg-stone-50 text-stone-600 py-2.5 text-[13px] font-medium hover:bg-stone-100 transition-colors flex items-center justify-center gap-2">
                    Get directions <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp ── */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <button className="h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-105 transition-all duration-200">
          <MessageSquare className="h-6 w-6" />
        </button>
        <div className="absolute bottom-full right-0 mb-2 bg-stone-900 text-white text-[12px] font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-8">
          <div className="grid sm:grid-cols-4 gap-10 mb-14">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-[10px] bg-white/10 flex items-center justify-center text-white font-semibold text-sm">HK</div>
                <div>
                  <div className="font-semibold text-[15px]">Heritage Kitchen</div>
                  <div className="text-[11px] text-stone-500 tracking-wide uppercase">Since 1972</div>
                </div>
              </div>
              <p className="text-[13px] text-stone-500 leading-relaxed">Three generations of authentic Indian cuisine. No shortcuts, no compromises.</p>
            </div>
            <div>
              <div className="text-[12px] font-medium text-stone-500 uppercase tracking-wider mb-4">Navigate</div>
              <div className="space-y-2.5 text-[14px]">
                {['Menu', 'Order online', 'Our story', 'Catering', 'Locations'].map(link => (
                  <a key={link} href="#" className="block text-stone-400 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[12px] font-medium text-stone-500 uppercase tracking-wider mb-4">Hours</div>
              <div className="space-y-2 text-[14px] text-stone-400">
                <div>Mon – Thu <span className="text-stone-500 float-right">11a – 10p</span></div>
                <div>Fri – Sat <span className="text-stone-500 float-right">11a – 11p</span></div>
                <div>Sunday <span className="text-stone-500 float-right">10a – 10p</span></div>
              </div>
            </div>
            <div>
              <div className="text-[12px] font-medium text-stone-500 uppercase tracking-wider mb-4">Connect</div>
              <div className="space-y-2.5 text-[14px]">
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"><Phone className="h-4 w-4" /> +91 98XXX XXXXX</a>
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"><Mail className="h-4 w-4" /> hello@heritagekitchen.in</a>
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"><Instagram className="h-4 w-4" /> @heritagekitchen</a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 flex flex-wrap items-center justify-between gap-4 text-[12px] text-stone-600">
            <span>&copy; 2026 Heritage Kitchen</span>
            <div className="flex items-center gap-1.5">
              <span>Website by</span>
              <a href="https://kraftai.in" className="text-stone-400 hover:text-white font-medium transition-colors">KraftAI</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Star, MapPin, Wifi, Car, ChevronLeft, ChevronRight, X, Heart, Share2, Shield, Check, ArrowRight, ArrowUpRight,
  MessageSquare, Calendar, Users, Minus, Plus, Sparkles, Coffee, Utensils, Waves, TreePine, Sun, Moon, Plane,
  Clock, Globe, Zap, Bath, Bed, Home, Camera, Wind, Snowflake, Tv, Lock, Flame, UtensilsCrossed, Baby, PawPrint,
  Mountain, Instagram, Mail, Phone, Eye, Play, ChevronDown,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const P = {
  name: 'The Banyan House',
  tagline: 'A modern Indian home for the curious traveler',
  location: 'Sector 44, Noida',
  region: 'Delhi NCR, India',
  rating: 4.96,
  reviews: 142,
  superhost: true,
  guests: 6, bedrooms: 3, beds: 4, baths: 2,
  price: 89, cleaning: 35, service: 18, minNights: 2,
};

const GALLERY = [
  { label: 'Living room', text: 'Sun-drenched open living with 20ft ceilings', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Master bedroom', text: 'King bed, blackout curtains, city view', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Terrace garden', text: 'Private rooftop with jasmine and string lights', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Kitchen', text: 'Full modular kitchen — cook or we cook for you', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Bathroom', text: 'Rain shower, heated towels, premium amenities', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Neighborhood', text: '12 min to Delhi metro, cafes within walking distance', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80' },
];

const AMENITIES = [
  { icon: Wifi, label: 'Fiber WiFi', sub: '200 Mbps' }, { icon: Snowflake, label: 'Climate control', sub: 'Per room' },
  { icon: Car, label: 'Free parking', sub: 'Covered' }, { icon: Utensils, label: 'Full kitchen', sub: 'Nespresso' },
  { icon: Tv, label: '65" Smart TV', sub: 'Netflix + Prime' }, { icon: Bath, label: 'Rain shower', sub: 'Premium' },
  { icon: Lock, label: 'Smart lock', sub: 'Self check-in' }, { icon: Wind, label: 'Washer + dryer', sub: 'In-unit' },
  { icon: Baby, label: 'Family ready', sub: 'Crib + high chair' }, { icon: Flame, label: 'BBQ grill', sub: 'On terrace' },
  { icon: PawPrint, label: 'Pet friendly', sub: 'Max 2 dogs' }, { icon: Shield, label: '24/7 security', sub: 'Gated + CCTV' },
];

const EXPERIENCES = [
  { title: 'Old Delhi food walk', desc: 'Chandni Chowk street food tour — 8 stops with a local guide.', time: '4h', price: '$35', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { title: 'Sunrise at Taj Mahal', desc: 'Private car at 4 AM. Watch sunrise paint the Taj pink.', time: 'Full day', price: '$120', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80' },
  { title: 'Yoga & chai morning', desc: 'Terrace yoga session followed by masala chai and parathas.', time: '2h', price: '$15', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Delhi by night', desc: 'India Gate, Connaught Place, dinner at Bukhara.', time: '5h', price: '$55', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
];

const REVIEWS = [
  { name: 'Sarah M.', from: 'San Francisco', date: 'May 2026', text: "This place exceeded every expectation. The terrace alone is worth the trip — we had chai there every morning. Already planning our return.", avatar: 'SM' },
  { name: 'James & Lin K.', from: 'Austin, TX', date: 'Apr 2026', text: "Top 3 Airbnb in 30+ countries. Immaculately clean, fast WiFi, the neighborhood felt safe at all hours. The food walk was incredible.", avatar: 'JK' },
  { name: 'Emily R.', from: 'Brooklyn, NY', date: 'Mar 2026', text: "First time in India — Ravi made everything seamless. Airport pickup, smart lock, welcome basket with local snacks and a handwritten note.", avatar: 'ER' },
  { name: 'David P.', from: 'Chicago, IL', date: 'Feb 2026', text: "Worked remotely for 2 weeks. WiFi never dropped, the desk setup was thoughtful, and Sector 44 has great cafes nearby.", avatar: 'DP' },
  { name: 'Mia T.', from: 'Seattle, WA', date: 'Jan 2026', text: "Traveled with a toddler. Crib was set up, baby monitor ready, rooftop fully enclosed. They thought of everything.", avatar: 'MT' },
  { name: 'Carlos V.', from: 'Denver, CO', date: 'Dec 2025', text: "The Taj Mahal sunrise trip was life-changing. Ravi coordinated everything — driver, timing, breakfast afterward. Unforgettable.", avatar: 'CV' },
];

const NEARBY = [
  { name: 'Delhi Metro', dist: '12 min walk' }, { name: 'IGI Airport', dist: '45 min' },
  { name: 'DLF Mall of India', dist: '8 min' }, { name: 'Brahmaputra Market', dist: '5 min walk' },
  { name: 'Okhla Bird Sanctuary', dist: '15 min' }, { name: 'Connaught Place', dist: '25 min metro' },
];

/* ═══════════════════════════════════════════════
   HOOKS & HELPERS
   ═══════════════════════════════════════════════ */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function Reveal({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale' }) {
  const { ref, vis } = useInView();
  const transforms: Record<string, string> = { up: 'translateY(40px)', left: 'translateX(-30px)', right: 'translateX(30px)', scale: 'scale(0.95)' };
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : transforms[direction], transition: `all 0.8s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function AirbnbFuturePage() {
  const [gi, setGi] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [saved, setSaved] = useState(false);
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);
  const [scrollY, setScrollY] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-advance gallery
  useEffect(() => {
    const t = setInterval(() => setGi(i => (i + 1) % GALLERY.length), 5000);
    return () => clearInterval(t);
  }, []);

  const total = P.price * nights + P.cleaning + P.service;
  const next = () => setGi(i => (i + 1) % GALLERY.length);
  const prev = () => setGi(i => (i - 1 + GALLERY.length) % GALLERY.length);

  return (
    <div className="min-h-screen bg-[#050508] text-white antialiased overflow-x-hidden selection:bg-white/20">

      {/* ═══ Global CSS ═══ */}
      <style jsx global>{`
        @keyframes aurora {
          0%, 100% { transform: translateX(-25%) translateY(-25%) rotate(0deg); }
          33% { transform: translateX(25%) translateY(10%) rotate(120deg); }
          66% { transform: translateX(-10%) translateY(25%) rotate(240deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.15); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.3); }
        }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px) saturate(1.5); border: 1px solid rgba(255,255,255,0.06); }
        .glass-strong { background: rgba(255,255,255,0.05); backdrop-filter: blur(40px) saturate(1.8); border: 1px solid rgba(255,255,255,0.08); }
        .text-gradient { background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .text-gradient-accent { background: linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .glow-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), rgba(56,189,248,0.3), transparent); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ═══ Ambient Background ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04] blur-[120px] bg-violet-500" style={{ top: '10%', left: '20%', animation: 'aurora 20s ease-in-out infinite' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[100px] bg-sky-500" style={{ top: '50%', right: '10%', animation: 'aurora 25s ease-in-out infinite reverse' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.02] blur-[80px] bg-amber-500" style={{ bottom: '10%', left: '40%', animation: 'aurora 30s ease-in-out infinite 5s' }} />
      </div>

      {/* ═══ Nav ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 60 ? 'glass-strong' : ''}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-10 flex items-center justify-between h-[72px]">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TreePine className="h-4.5 w-4.5 text-white" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.01em]">{P.name}</span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {['Gallery', 'Space', 'Experiences', 'Reviews', 'Location'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="px-4 py-2 text-[13px] font-medium text-white/40 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/[0.03]">{s}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setSaved(!saved)} className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white/[0.05] transition-all">
              <Heart className={`h-[18px] w-[18px] transition-all duration-300 ${saved ? 'fill-rose-500 text-rose-500 scale-110' : 'text-white/40 hover:text-white/70'}`} />
            </button>
            <a href="#booking" className="relative group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-sky-500 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-sky-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <span className="relative">Reserve</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ Hero ═══ */}
      <section id="gallery" className="relative h-screen">
        {/* Image */}
        {GALLERY.map((slide, i) => (
          <div key={slide.label} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === gi ? 1 : 0 }}>
            <img src={slide.img} alt={slide.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/50 to-transparent" />
          </div>
        ))}

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 pb-16 sm:pb-20 px-6 sm:px-10 z-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[12px] font-medium text-white/70 mb-6" style={{ animation: 'float 6s ease-in-out infinite' }}>
                <div className="flex -space-x-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-white/40 mx-0.5">·</span>
                {P.rating} from {P.reviews} guests
                {P.superhost && <><span className="text-white/40 mx-0.5">·</span><Shield className="h-3 w-3 text-violet-400" /><span>Superhost</span></>}
              </div>

              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] leading-[0.95]">
                <span className="text-gradient">{P.name}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/40 mt-4 font-light tracking-[-0.01em]">{P.tagline}</p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-[13px] text-white/30">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {P.location}</span>
                <span className="flex items-center gap-1.5"><Bed className="h-3.5 w-3.5" /> {P.bedrooms} bed · {P.baths} bath</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Up to {P.guests} guests</span>
              </div>
            </div>

            {/* Gallery dots + nav */}
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center gap-2">
                {GALLERY.map((_, i) => (
                  <button key={i} onClick={() => setGi(i)} className="group relative">
                    <div className={`h-1 rounded-full transition-all duration-500 ${i === gi ? 'w-10 bg-white' : 'w-5 bg-white/20 group-hover:bg-white/40'}`} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prev} className="h-11 w-11 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={next} className="h-11 w-11 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button onClick={() => setLightbox(true)} className="h-11 rounded-full glass flex items-center gap-2 px-4 text-[12px] font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all ml-1">
                  <Camera className="h-4 w-4" /> {gi + 1}/{GALLERY.length}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/20 animate-bounce">
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* ═══ Divider ═══ */}
      <div className="glow-line" />

      {/* ═══ The Space ═══ */}
      <section id="space" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
            <div>
              <Reveal>
                <p className="text-[12px] font-semibold text-violet-400 uppercase tracking-[0.2em] mb-4">The space</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1]">
                  <span className="text-gradient">Designed for travelers</span><br />
                  <span className="text-white/30">who want the real India.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 space-y-5 text-[15px] text-white/40 leading-relaxed max-w-xl">
                  <p>A fully renovated 3-bedroom in one of Noida&apos;s quietest sectors. Western-height beds, water purifier, English labels, strong WiFi in every room, and a smart lock so you never coordinate key handoffs.</p>
                  <p>The neighborhood is walkable, safe, and local — chai stall downstairs, grocery across the street, metro 12 minutes away. Delhi&apos;s best attractions are 30 minutes out. The Taj Mahal is a day trip we arrange for you.</p>
                </div>
              </Reveal>

              {/* Host */}
              <Reveal delay={0.15}>
                <div className="mt-10 glass rounded-2xl p-6 flex items-start gap-4 max-w-md">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-sky-500/20 flex items-center justify-center text-xl font-bold text-white/60 shrink-0 border border-white/[0.06]">R</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-semibold">Hosted by Ravi</h3>
                      <Shield className="h-3.5 w-3.5 text-violet-400" />
                    </div>
                    <p className="text-[12px] text-white/30 mt-0.5">Superhost · 4 years · 142 reviews · responds in 1 hour</p>
                    <p className="text-[12px] text-white/40 mt-2 leading-relaxed">Born in Noida, studied in the US, came back to share my city with travelers.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ═══ Booking Card ═══ */}
            <Reveal delay={0.1} direction="right">
              <div id="booking" className="glass-strong rounded-3xl p-7 sticky top-24" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold tracking-tight">${P.price}</span>
                  <span className="text-white/30 text-[14px]">/ night</span>
                </div>

                <div className="rounded-xl border border-white/[0.06] overflow-hidden mb-4">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-3 border-r border-b border-white/[0.06]">
                      <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Check-in</div>
                      <div className="text-[13px] font-medium text-white/60 mt-1">Select date</div>
                    </div>
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Checkout</div>
                      <div className="text-[13px] font-medium text-white/60 mt-1">Select date</div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Guests</div>
                      <div className="text-[13px] font-medium text-white/60 mt-1">{guests} guest{guests > 1 ? 's' : ''}</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all"><Minus className="h-3 w-3" /></button>
                      <span className="text-[13px] font-semibold w-3 text-center">{guests}</span>
                      <button onClick={() => setGuests(g => Math.min(P.guests, g + 1))} className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>

                {/* Nights */}
                <div className="flex items-center justify-between mb-5 px-1 text-[13px]">
                  <span className="text-white/30">Nights</span>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => setNights(n => Math.max(P.minNights, n - 1))} className="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all"><Minus className="h-3 w-3" /></button>
                    <span className="font-semibold w-3 text-center">{nights}</span>
                    <button onClick={() => setNights(n => Math.min(30, n + 1))} className="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>

                <button className="relative w-full rounded-xl py-3.5 text-[14px] font-semibold overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-sky-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-sky-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  <span className="relative flex items-center justify-center gap-2">Reserve <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></span>
                </button>

                <p className="text-center text-[11px] text-white/20 mt-3">You won&apos;t be charged yet</p>

                <div className="space-y-2 text-[13px] mt-5 pt-5 border-t border-white/[0.06]">
                  <div className="flex justify-between text-white/30"><span>${P.price} &times; {nights} nights</span><span className="text-white/50">${P.price * nights}</span></div>
                  <div className="flex justify-between text-white/30"><span>Cleaning</span><span className="text-white/50">${P.cleaning}</span></div>
                  <div className="flex justify-between text-white/30"><span>Service fee</span><span className="text-white/50">${P.service}</span></div>
                  <div className="flex justify-between font-semibold text-white pt-3 border-t border-white/[0.06]"><span>Total</span><span>${total}</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ Amenities ═══ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal>
            <p className="text-[12px] font-semibold text-sky-400 uppercase tracking-[0.2em] mb-4">Amenities</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-gradient mb-12">Everything you need. Nothing you don&apos;t.</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(showAllAmenities ? AMENITIES : AMENITIES.slice(0, 8)).map((a, i) => (
              <Reveal key={a.label} delay={Math.min(i * 0.03, 0.2)}>
                <div className="glass rounded-2xl p-5 group hover:bg-white/[0.04] transition-all duration-300">
                  <a.icon className="h-5 w-5 text-white/20 group-hover:text-violet-400 transition-colors duration-300 mb-3" />
                  <div className="text-[13px] font-medium text-white/70">{a.label}</div>
                  <div className="text-[11px] text-white/25 mt-0.5">{a.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
          {!showAllAmenities && (
            <Reveal delay={0.2}>
              <button onClick={() => setShowAllAmenities(true)} className="mt-6 glass rounded-xl px-6 py-3 text-[13px] font-medium text-white/40 hover:text-white hover:bg-white/[0.04] transition-all">
                Show all {AMENITIES.length} amenities
              </button>
            </Reveal>
          )}
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ Experiences ═══ */}
      <section id="experiences" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <p className="text-[12px] font-semibold text-amber-400 uppercase tracking-[0.2em]">Curated experiences</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-gradient mb-12">Not just a stay. A story.</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {EXPERIENCES.map((exp, i) => (
              <Reveal key={exp.title} delay={i * 0.05}>
                <div className="group rounded-2xl overflow-hidden glass hover:bg-white/[0.04] transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <img src={exp.img} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <h3 className="text-[16px] font-bold">{exp.title}</h3>
                      <span className="text-[12px] font-semibold text-white/70 glass rounded-full px-3 py-1">{exp.price}</span>
                    </div>
                  </div>
                  <div className="p-5 pt-3">
                    <p className="text-[13px] text-white/35 leading-relaxed">{exp.desc}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[11px] text-white/20 flex items-center gap-1"><Clock className="h-3 w-3" /> {exp.time}</span>
                      <button className="text-[12px] font-medium text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
                        Book <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ Reviews ═══ */}
      <section id="reviews" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <p className="text-[12px] font-semibold text-emerald-400 uppercase tracking-[0.2em] mb-4">Guest reviews</p>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-extrabold tracking-tight text-gradient">{P.rating}</span>
                  <div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-[12px] text-white/30 mt-1">{P.reviews} reviews</p>
                  </div>
                </div>
              </div>
              {/* Category bars */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                {[
                  { l: 'Cleanliness', s: 5.0 }, { l: 'Accuracy', s: 4.9 }, { l: 'Check-in', s: 5.0 },
                  { l: 'Communication', s: 5.0 }, { l: 'Location', s: 4.8 }, { l: 'Value', s: 4.9 },
                ].map(r => (
                  <div key={r.l} className="flex items-center gap-3">
                    <span className="text-[12px] text-white/30 w-28">{r.l}</span>
                    <div className="w-20 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400" style={{ width: `${(r.s / 5) * 100}%` }} />
                    </div>
                    <span className="text-[11px] font-medium text-white/40 w-5">{r.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={Math.min(i * 0.04, 0.2)}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500/20 to-sky-500/20 border border-white/[0.06] flex items-center justify-center text-[11px] font-bold text-white/40">{r.avatar}</div>
                    <div>
                      <div className="text-[13px] font-semibold text-white/80">{r.name}</div>
                      <div className="text-[10px] text-white/25">{r.from} · {r.date}</div>
                    </div>
                  </div>
                  <p className="text-[13px] text-white/35 leading-relaxed flex-1">{r.text}</p>
                  <div className="flex gap-0.5 mt-4 pt-3 border-t border-white/[0.04]">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 fill-amber-400/60 text-amber-400/60" />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ Location ═══ */}
      <section id="location" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal>
            <p className="text-[12px] font-semibold text-sky-400 uppercase tracking-[0.2em] mb-4">Location</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-gradient mb-2">{P.location}</h2>
            <p className="text-[14px] text-white/30 mb-10">{P.region}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="glass rounded-2xl h-64 sm:h-80 flex items-center justify-center relative overflow-hidden mb-8">
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="text-center">
                <MapPin className="h-8 w-8 text-violet-400/30 mx-auto mb-3" />
                <p className="text-[13px] text-white/20">Exact location shared after booking</p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {NEARBY.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.03}>
                <div className="glass rounded-xl px-4 py-3.5 hover:bg-white/[0.04] transition-all">
                  <div className="text-[13px] font-medium text-white/60">{p.name}</div>
                  <div className="text-[11px] text-white/20 mt-0.5">{p.dist}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="glow-line" />

      {/* ═══ House Rules ═══ */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-gradient mb-10">Things to know</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'House rules', items: ['Check-in 2 PM – 10 PM', 'Checkout 11 AM', 'Self check-in (smart lock)', 'No smoking indoors', 'Pets welcome (max 2)'] },
              { title: 'Safety', items: ['Exterior security camera', 'Carbon monoxide alarm', 'Smoke alarm', 'Fire extinguisher', 'First aid kit'] },
              { title: 'Cancellation', items: ['Free cancel within 48h', 'Full refund 7+ days before', '50% refund 3–7 days', 'No refund under 3 days', 'Review full policy'] },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-[14px] font-semibold text-white/70 mb-5">{s.title}</h3>
                  <div className="space-y-3">
                    {s.items.map(item => (
                      <div key={item} className="flex items-start gap-2.5 text-[12px] text-white/30">
                        <Check className="h-3.5 w-3.5 text-white/15 mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Mobile Sticky ═══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong px-5 py-3 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">${P.price}</span>
          <span className="text-[12px] text-white/30"> / night</span>
          <div className="flex items-center gap-1 text-[11px] text-white/25 mt-0.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {P.rating} · {P.reviews} reviews
          </div>
        </div>
        <a href="#booking" className="relative rounded-xl overflow-hidden px-6 py-2.5 text-[13px] font-semibold">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-sky-500" />
          <span className="relative">Reserve</span>
        </a>
      </div>

      {/* ═══ WhatsApp ═══ */}
      <div className="fixed bottom-20 lg:bottom-6 right-5 z-40 group">
        <button className="relative h-12 w-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/20 hover:scale-110 transition-all duration-300">
          <MessageSquare className="h-5 w-5" />
          <div className="absolute -inset-1 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
        </button>
      </div>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-white/[0.04] pb-24 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 pt-14 pb-8">
          <div className="grid sm:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-sky-500/20 border border-white/[0.06] flex items-center justify-center">
                  <TreePine className="h-4 w-4 text-white/50" />
                </div>
                <span className="text-[14px] font-semibold text-white/60">{P.name}</span>
              </div>
              <p className="text-[12px] text-white/20 leading-relaxed">{P.location}<br />{P.region}</p>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-white/20 uppercase tracking-widest mb-4">Contact</div>
              <div className="space-y-2.5 text-[12px]">
                <a href="#" className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors"><Phone className="h-3.5 w-3.5" /> +91 98XXX XXXXX</a>
                <a href="#" className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors"><Mail className="h-3.5 w-3.5" /> stay@thebanyahouse.com</a>
                <a href="#" className="flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors"><Instagram className="h-3.5 w-3.5" /> @thebanyahouse</a>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-white/20 uppercase tracking-widest mb-4">Navigate</div>
              <div className="space-y-2.5 text-[12px]">
                {['Gallery', 'Space', 'Experiences', 'Reviews', 'Location'].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block text-white/25 hover:text-white/60 transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="glow-line mb-6" />
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/15">
            <span>&copy; 2026 {P.name}</span>
            <div className="flex items-center gap-1.5">
              <span>Crafted by</span>
              <a href="https://kraftai.in" className="text-gradient-accent font-medium">KraftAI</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ Lightbox ═══ */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-[#050508]/95 backdrop-blur-xl flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all z-10" onClick={() => setLightbox(false)}>
            <X className="h-5 w-5" />
          </button>
          <div className="max-w-4xl w-full mx-6" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <img src={GALLERY[gi].img} alt={GALLERY[gi].label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-white/50 text-[12px] font-medium">{gi + 1} / {GALLERY.length}</span>
                <h3 className="text-white text-xl font-bold mt-1">{GALLERY[gi].label}</h3>
                <p className="text-white/50 text-[13px] mt-0.5">{GALLERY[gi].text}</p>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={(e) => { e.stopPropagation(); prev(); }} className="h-11 w-11 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} className="h-11 w-11 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

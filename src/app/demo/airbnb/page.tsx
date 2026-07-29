'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Star,
  MapPin,
  Wifi,
  Car,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Share2,
  Shield,
  Check,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Calendar,
  Users,
  Minus,
  Plus,
  Sparkles,
  Coffee,
  Utensils,
  Waves,
  TreePine,
  Sun,
  Moon,
  Plane,
  Clock,
  Globe,
  Zap,
  Bath,
  Bed,
  Home,
  Camera,
  Wind,
  Snowflake,
  Tv,
  Lock,
  Flame,
  UtensilsCrossed,
  Baby,
  PawPrint,
  Mountain,
  Instagram,
  Mail,
  Phone,
} from 'lucide-react';

/* ─── Property Data ─── */
const PROPERTY = {
  name: 'The Banyan House',
  tagline: 'A modern Indian home for the curious traveler',
  location: 'Sector 44, Noida',
  region: 'Delhi NCR, India',
  rating: 4.96,
  reviews: 142,
  superhost: true,
  guests: 6,
  bedrooms: 3,
  beds: 4,
  baths: 2,
  pricePerNight: 89,
  cleaningFee: 35,
  serviceFee: 18,
  minNights: 2,
};

/* ─── Gallery ─── */
interface GallerySlide {
  label: string;
  gradient: string;
  overlayText: string;
  img: string;
}

const GALLERY: GallerySlide[] = [
  { label: 'Living room', gradient: 'from-amber-100 via-orange-50 to-stone-100', overlayText: 'Sun-drenched open living with 20ft ceilings', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Master bedroom', gradient: 'from-slate-200 via-blue-50 to-indigo-100', overlayText: 'King bed, blackout curtains, city view', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Terrace garden', gradient: 'from-emerald-200 via-green-100 to-lime-50', overlayText: 'Private rooftop with jasmine and string lights', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Kitchen', gradient: 'from-stone-100 via-amber-50 to-yellow-50', overlayText: 'Full modular kitchen — cook or we cook for you', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Bathroom', gradient: 'from-cyan-100 via-sky-50 to-white', overlayText: 'Rain shower, heated towels, Aesop amenities', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Neighborhood', gradient: 'from-violet-100 via-pink-50 to-rose-50', overlayText: '12 min to Delhi metro, cafes within walking distance', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80' },
];

/* ─── Amenities ─── */
interface Amenity { icon: React.ElementType; label: string; detail: string }

const AMENITIES: Amenity[] = [
  { icon: Wifi, label: 'High-speed WiFi', detail: '200 Mbps fiber — work-from-anywhere ready' },
  { icon: Snowflake, label: 'Central AC', detail: 'Every room individually climate-controlled' },
  { icon: Car, label: 'Free parking', detail: 'Covered spot in gated community' },
  { icon: Utensils, label: 'Full kitchen', detail: 'Induction, microwave, fridge, Nespresso' },
  { icon: Tv, label: '65" Smart TV', detail: 'Netflix, Prime, Apple TV+ included' },
  { icon: Bath, label: 'Rain shower', detail: 'Instant hot water, premium toiletries' },
  { icon: Lock, label: 'Smart lock', detail: 'Self check-in with digital code' },
  { icon: Wind, label: 'Washer & dryer', detail: 'In-unit, plus ironing station' },
  { icon: Baby, label: 'Family friendly', detail: 'Crib, high chair, outlet covers available' },
  { icon: Flame, label: 'BBQ grill', detail: 'On the terrace — charcoal included' },
  { icon: PawPrint, label: 'Pet friendly', detail: 'Up to 2 dogs welcome, no extra charge' },
  { icon: Shield, label: '24/7 security', detail: 'Gated society with CCTV and guard' },
];

/* ─── Experiences ─── */
interface Experience {
  title: string;
  desc: string;
  duration: string;
  price: string;
  gradient: string;
  icon: React.ElementType;
  img: string;
}

const EXPERIENCES: Experience[] = [
  { title: 'Old Delhi food walk', desc: 'Street food tour through Chandni Chowk with a local guide. Paranthas, jalebis, kebabs — 8 stops.', duration: '4 hours', price: '$35/person', gradient: 'from-orange-200 via-amber-100 to-yellow-50', icon: UtensilsCrossed, img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
  { title: 'Sunrise at Taj Mahal', desc: 'Private car to Agra at 4 AM. Watch sunrise paint the Taj pink. Breakfast at Oberoi.', duration: 'Full day', price: '$120/person', gradient: 'from-pink-200 via-rose-100 to-orange-50', icon: Sun, img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80' },
  { title: 'Yoga & chai morning', desc: 'In-house yoga session on the terrace followed by masala chai and paratha breakfast.', duration: '2 hours', price: '$15/person', gradient: 'from-emerald-200 via-teal-100 to-cyan-50', icon: TreePine, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Delhi by night', desc: 'Qutub Minar, India Gate, Connaught Place. Private guide + driver. Dinner at Bukhara.', duration: '5 hours', price: '$55/person', gradient: 'from-indigo-200 via-violet-100 to-purple-50', icon: Moon, img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
];

/* ─── Reviews ─── */
const GUEST_REVIEWS = [
  { name: 'Sarah M.', from: 'San Francisco, CA', date: 'May 2026', rating: 5, text: "This place exceeded every expectation. The terrace alone is worth the trip — we had chai there every morning watching the sunrise. Ravi's restaurant recommendations were spot-on. Already planning our return.", avatar: 'SM' },
  { name: 'James & Lin K.', from: 'Austin, TX', date: 'Apr 2026', rating: 5, text: "We've stayed at Airbnbs in 30+ countries. The Banyan House is top 3. Immaculately clean, fast WiFi, the neighborhood felt safe at all hours. The Old Delhi food walk was a highlight of our entire India trip.", avatar: 'JK' },
  { name: 'Emily R.', from: 'Brooklyn, NY', date: 'Mar 2026', rating: 5, text: "First time in India and I was nervous — Ravi made everything seamless. Airport pickup was waiting, the smart lock worked perfectly, and there was a welcome basket with local snacks and a handwritten note. Little things matter.", avatar: 'ER' },
  { name: 'David P.', from: 'Chicago, IL', date: 'Feb 2026', rating: 5, text: "Worked remotely from here for 2 weeks. The WiFi never dropped once, the desk setup was thoughtful, and the kitchen saved us a fortune vs eating out every meal. Sector 44 has great cafes nearby too.", avatar: 'DP' },
  { name: 'Mia T.', from: 'Seattle, WA', date: 'Jan 2026', rating: 5, text: "Traveled with a toddler and was worried. The crib was already set up, they had a baby monitor, and the rooftop is fully enclosed. We could relax while our daughter played safely. Thank you for thinking of everything.", avatar: 'MT' },
  { name: 'Carlos & Ana V.', from: 'Denver, CO', date: 'Dec 2025', rating: 5, text: "The Taj Mahal sunrise trip was life-changing. Ravi coordinated everything — the driver was excellent, we had front-row spots, and the drive back included a stop at Agra's best petha shop. Unforgettable.", avatar: 'CV' },
];

/* ─── Neighborhood ─── */
const NEARBY = [
  { name: 'Delhi Metro (Sec 18)', distance: '12 min walk', icon: Plane },
  { name: 'Indira Gandhi Airport', distance: '45 min drive', icon: Plane },
  { name: 'DLF Mall of India', distance: '8 min drive', icon: Home },
  { name: 'Brahmaputra Market', distance: '5 min walk', icon: Coffee },
  { name: 'Okhla Bird Sanctuary', distance: '15 min drive', icon: Mountain },
  { name: 'Connaught Place, Delhi', distance: '25 min metro', icon: Globe },
];

/* ─── Hooks ─── */
function useInView(threshold = 0.12) {
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.6s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* ─── MAIN PAGE ─── */
/* ─────────────────────────────────────────── */
export default function AirbnbDemoPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [saved, setSaved] = useState(false);
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const subtotal = PROPERTY.pricePerNight * nights;
  const total = subtotal + PROPERTY.cleaningFee + PROPERTY.serviceFee;

  const nextSlide = () => setGalleryIndex(i => (i + 1) % GALLERY.length);
  const prevSlide = () => setGalleryIndex(i => (i - 1 + GALLERY.length) % GALLERY.length);

  return (
    <div className="min-h-screen bg-white text-stone-900 antialiased">

      {/* ── Nav ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]' : 'bg-white'}`}>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-[60px]">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-xl bg-stone-900 flex items-center justify-center group-hover:scale-105 transition-transform">
              <TreePine className="h-4 w-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold text-stone-900 tracking-[-0.01em]">{PROPERTY.name}</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {['Photos', 'Amenities', 'Experiences', 'Reviews', 'Location'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="px-3 py-1.5 text-[13px] font-medium text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-50 transition-all">{s}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSaved(!saved)} className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-all">
              <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} /> {saved ? 'Saved' : 'Save'}
            </button>
            <a href="#booking" className="inline-flex items-center gap-1.5 bg-stone-900 text-white rounded-full px-5 py-2 text-[13px] font-semibold hover:bg-stone-800 transition-all">
              Book now
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero Gallery ── */}
      <section id="photos" className="relative">
        {/* Main hero image */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden cursor-pointer" onClick={() => setLightbox(true)}>
          {/* Gradient fallback + real image */}
          <div className={`absolute inset-0 bg-gradient-to-br ${GALLERY[galleryIndex].gradient}`} />
          <img
            src={GALLERY[galleryIndex].img}
            alt={GALLERY[galleryIndex].label}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
          {/* Bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Gallery info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="mx-auto max-w-6xl flex items-end justify-between">
              <div>
                <span className="text-white/70 text-[13px] font-medium">{GALLERY[galleryIndex].label}</span>
                <h2 className="text-white text-lg sm:text-xl font-semibold mt-1 max-w-md">{GALLERY[galleryIndex].overlayText}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 flex items-center justify-center text-white transition-all">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 flex items-center justify-center text-white transition-all">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Photo count badge */}
          <button onClick={(e) => { e.stopPropagation(); setLightbox(true); }} className="absolute top-5 right-5 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1.5 rounded-full hover:bg-white/25 transition-all">
            <Camera className="h-3.5 w-3.5" /> {galleryIndex + 1}/{GALLERY.length}
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="mx-auto max-w-6xl px-5 sm:px-8 -mt-8 relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {GALLERY.map((slide, i) => (
              <button
                key={slide.label}
                onClick={() => setGalleryIndex(i)}
                className={`shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${i === galleryIndex ? 'ring-2 ring-stone-900 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
              >
                <div className={`w-20 h-14 sm:w-24 sm:h-16 bg-gradient-to-br ${slide.gradient} relative`}>
                  <img src={slide.img} alt={slide.label} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Property Header ── */}
      <section className="pt-8 sm:pt-12 pb-8 border-b border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-[-0.02em]">
                  {PROPERTY.name}
                </h1>
                <p className="text-lg text-stone-500 mt-1.5">{PROPERTY.tagline}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 text-[14px]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-stone-900">
                    <Star className="h-4 w-4 fill-stone-900 text-stone-900" /> {PROPERTY.rating}
                  </span>
                  <a href="#reviews" className="text-stone-500 underline decoration-stone-300 underline-offset-2 hover:text-stone-900 transition-colors">
                    {PROPERTY.reviews} reviews
                  </a>
                  {PROPERTY.superhost && (
                    <span className="inline-flex items-center gap-1.5 text-stone-500">
                      <Shield className="h-4 w-4 text-rose-500" />
                      <span className="font-medium">Superhost</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-stone-500">
                    <MapPin className="h-4 w-4" /> {PROPERTY.location}, {PROPERTY.region}
                  </span>
                </div>

                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-stone-100 text-[14px] text-stone-600">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-stone-400" /> {PROPERTY.guests} guests</span>
                  <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-stone-400" /> {PROPERTY.bedrooms} bedrooms</span>
                  <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-stone-400" /> {PROPERTY.beds} beds</span>
                  <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-stone-400" /> {PROPERTY.baths} baths</span>
                </div>
              </div>

              {/* ── Booking Card ── */}
              <div id="booking" className="rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50 p-6 sticky top-20">
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-2xl font-bold text-stone-900">${PROPERTY.pricePerNight}</span>
                  <span className="text-stone-500 text-[14px]">/ night</span>
                </div>

                {/* Date + guests */}
                <div className="rounded-xl border border-stone-200 overflow-hidden mb-4">
                  <div className="grid grid-cols-2 border-b border-stone-200">
                    <div className="px-4 py-3 border-r border-stone-200">
                      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Check-in</div>
                      <div className="text-[14px] font-medium text-stone-900 mt-0.5">Select date</div>
                    </div>
                    <div className="px-4 py-3">
                      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Checkout</div>
                      <div className="text-[14px] font-medium text-stone-900 mt-0.5">Select date</div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Guests</div>
                      <div className="text-[14px] font-medium text-stone-900 mt-0.5">{guests} guest{guests > 1 ? 's' : ''}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="h-7 w-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-[14px] font-semibold w-4 text-center">{guests}</span>
                      <button onClick={() => setGuests(g => Math.min(PROPERTY.guests, g + 1))} className="h-7 w-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nights */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <span className="text-[13px] text-stone-500">Nights</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setNights(n => Math.max(PROPERTY.minNights, n - 1))} className="h-6 w-6 rounded-full border border-stone-300 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-[14px] font-semibold w-4 text-center">{nights}</span>
                    <button onClick={() => setNights(n => Math.min(30, n + 1))} className="h-6 w-6 rounded-full border border-stone-300 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-colors">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3.5 text-[15px] font-semibold hover:from-rose-600 hover:to-pink-700 transition-all active:scale-[0.99] mb-4">
                  Reserve
                </button>

                <p className="text-center text-[12px] text-stone-400 mb-5">You won&apos;t be charged yet</p>

                {/* Price breakdown */}
                <div className="space-y-2.5 text-[14px] border-t border-stone-100 pt-4">
                  <div className="flex justify-between text-stone-600">
                    <span className="underline decoration-stone-300 underline-offset-2">${PROPERTY.pricePerNight} &times; {nights} nights</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span className="underline decoration-stone-300 underline-offset-2">Cleaning fee</span>
                    <span>${PROPERTY.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span className="underline decoration-stone-300 underline-offset-2">Service fee</span>
                    <span>${PROPERTY.serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-stone-900 pt-3 border-t border-stone-100">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-14 sm:py-20 border-b border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <FadeIn>
              <h2 className="text-2xl font-bold text-stone-900 tracking-[-0.01em] mb-5">About this place</h2>
              <div className="space-y-4 text-[15px] text-stone-600 leading-relaxed">
                <p>
                  The Banyan House is a fully renovated 3-bedroom apartment in one of Noida&apos;s quietest residential sectors — designed specifically for international travelers who want the real India without roughing it.
                </p>
                <p>
                  Every detail is intentional: Western-height beds, a water purifier in the kitchen, labels in English, strong WiFi in every room, and a lock on the front door that works with a code so you never need to coordinate key handoffs.
                </p>
                <p>
                  The neighborhood is walkable, safe, and local — not a tourist bubble. There&apos;s a chai stall downstairs, a grocery store across the street, and the metro station is a 12-minute walk. Delhi&apos;s best attractions are 30 minutes away. The Taj Mahal is a day trip we can arrange for you.
                </p>
              </div>
            </FadeIn>

            {/* Host card */}
            <FadeIn delay={0.05}>
              <div className="mt-10 flex items-start gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-lg font-bold text-stone-800 shrink-0">R</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-stone-900">Hosted by Ravi</h3>
                    <Shield className="h-4 w-4 text-rose-500" />
                  </div>
                  <p className="text-[13px] text-stone-500 mt-0.5">Superhost · 4 years hosting · 142 reviews</p>
                  <p className="text-[13px] text-stone-600 mt-2 leading-relaxed">
                    Born in Noida, studied in the US, came back to share my city with travelers. I respond within an hour and can help plan every day of your trip.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section id="amenities" className="py-14 sm:py-20 border-b border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-stone-900 tracking-[-0.01em] mb-8">What this place offers</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {(showAllAmenities ? AMENITIES : AMENITIES.slice(0, 6)).map((a, i) => (
              <FadeIn key={a.label} delay={Math.min(i * 0.03, 0.2)}>
                <div className="flex items-start gap-3.5 py-2">
                  <div className="mt-0.5 h-9 w-9 rounded-xl bg-stone-50 flex items-center justify-center shrink-0">
                    <a.icon className="h-[18px] w-[18px] text-stone-500" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-stone-900">{a.label}</div>
                    <div className="text-[12px] text-stone-400 mt-0.5">{a.detail}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          {!showAllAmenities && (
            <button onClick={() => setShowAllAmenities(true)} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-stone-200 px-6 py-3 text-[14px] font-semibold text-stone-900 hover:bg-stone-50 transition-colors">
              Show all {AMENITIES.length} amenities
            </button>
          )}
        </div>
      </section>

      {/* ── Experiences ── */}
      <section id="experiences" className="py-14 sm:py-20 border-b border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-500 mb-2">
                  <Sparkles className="h-4 w-4 text-amber-500" /> Curated by your host
                </div>
                <h2 className="text-2xl font-bold text-stone-900 tracking-[-0.01em]">Experiences you can book</h2>
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={exp.title} delay={i * 0.05}>
                <div className="group rounded-2xl border border-stone-100 overflow-hidden hover:border-stone-300 hover:shadow-lg hover:shadow-stone-100/80 transition-all duration-300">
                  <div className={`h-40 bg-gradient-to-br ${exp.gradient} relative overflow-hidden`}>
                    <img src={exp.img} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-5">
                      <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <exp.icon className="h-5 w-5 text-stone-800" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 text-[12px] font-medium text-stone-700 bg-white/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {exp.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-semibold text-stone-900 group-hover:text-stone-700 transition-colors">{exp.title}</h3>
                    <p className="text-[13px] text-stone-500 mt-1.5 leading-relaxed">{exp.desc}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[12px] text-stone-400 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {exp.duration}</span>
                      <button className="text-[13px] font-medium text-stone-900 hover:text-rose-600 transition-colors flex items-center gap-1">
                        Book <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="py-14 sm:py-20 border-b border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 fill-stone-900 text-stone-900" />
              <h2 className="text-2xl font-bold text-stone-900">{PROPERTY.rating} · {PROPERTY.reviews} reviews</h2>
            </div>
          </FadeIn>

          {/* Rating bars */}
          <FadeIn delay={0.03}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3 mb-10">
              {[
                { label: 'Cleanliness', score: 5.0 },
                { label: 'Accuracy', score: 4.9 },
                { label: 'Check-in', score: 5.0 },
                { label: 'Communication', score: 5.0 },
                { label: 'Location', score: 4.8 },
                { label: 'Value', score: 4.9 },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between gap-3">
                  <span className="text-[13px] text-stone-600">{r.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full rounded-full bg-stone-900" style={{ width: `${(r.score / 5) * 100}%` }} />
                    </div>
                    <span className="text-[12px] font-semibold text-stone-700 w-6 text-right">{r.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Review cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GUEST_REVIEWS.map((r, i) => (
              <FadeIn key={r.name} delay={Math.min(i * 0.04, 0.2)}>
                <div className="rounded-2xl border border-stone-100 p-5 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-[12px] font-bold text-stone-600">{r.avatar}</div>
                    <div>
                      <div className="text-[14px] font-semibold text-stone-900">{r.name}</div>
                      <div className="text-[11px] text-stone-400">{r.from} · {r.date}</div>
                    </div>
                  </div>
                  <p className="text-[13px] text-stone-600 leading-relaxed flex-1">{r.text}</p>
                  <div className="flex gap-0.5 mt-4 pt-3 border-t border-stone-50">
                    {[...Array(r.rating)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-stone-800 text-stone-800" />)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section id="location" className="py-14 sm:py-20 border-b border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-stone-900 tracking-[-0.01em] mb-2">Where you&apos;ll be</h2>
            <p className="text-[15px] text-stone-500 mb-8">{PROPERTY.location}, {PROPERTY.region}</p>
          </FadeIn>

          {/* Map placeholder */}
          <FadeIn delay={0.05}>
            <div className="rounded-2xl bg-stone-50 border border-stone-100 h-64 sm:h-80 flex items-center justify-center relative overflow-hidden mb-8">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="text-center">
                <MapPin className="h-8 w-8 text-stone-300 mx-auto mb-2" />
                <p className="text-[13px] text-stone-400">Exact location shared after booking</p>
              </div>
            </div>
          </FadeIn>

          {/* Nearby */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {NEARBY.map((place, i) => (
              <FadeIn key={place.name} delay={i * 0.03}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 border border-stone-100">
                  <place.icon className="h-4 w-4 text-stone-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-stone-900 truncate">{place.name}</div>
                    <div className="text-[12px] text-stone-400">{place.distance}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── House Rules ── */}
      <section className="py-14 sm:py-20 border-b border-stone-100">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-stone-900 tracking-[-0.01em] mb-8">Things to know</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: 'House rules', items: ['Check-in: 2:00 PM – 10:00 PM', 'Checkout: 11:00 AM', 'Self check-in with smart lock', 'No smoking indoors', 'Pets allowed (max 2)'] },
              { title: 'Safety & property', items: ['Security camera on exterior', 'Carbon monoxide alarm', 'Smoke alarm', 'Fire extinguisher', 'First aid kit'] },
              { title: 'Cancellation policy', items: ['Free cancellation for 48 hours', 'Full refund if cancelled 7+ days before', '50% refund if cancelled 3–7 days before', 'No refund within 3 days of check-in', 'Review the full policy'] },
            ].map((section, i) => (
              <FadeIn key={section.title} delay={i * 0.05}>
                <div>
                  <h3 className="text-[15px] font-semibold text-stone-900 mb-4">{section.title}</h3>
                  <div className="space-y-2.5">
                    {section.items.map(item => (
                      <div key={item} className="flex items-start gap-2.5 text-[13px] text-stone-600">
                        <Check className="h-4 w-4 text-stone-400 mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile Sticky CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 px-5 py-3 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">${PROPERTY.pricePerNight}</span>
          <span className="text-[13px] text-stone-500"> / night</span>
          <div className="flex items-center gap-1 text-[12px] text-stone-500">
            <Star className="h-3 w-3 fill-stone-900 text-stone-900" /> {PROPERTY.rating} · {PROPERTY.reviews} reviews
          </div>
        </div>
        <a href="#booking" className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2.5 text-[14px] font-semibold">
          Reserve
        </a>
      </div>

      {/* ── WhatsApp Float ── */}
      <div className="fixed bottom-20 lg:bottom-6 right-5 z-40 group">
        <button className="h-12 w-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-105 transition-all">
          <MessageSquare className="h-5 w-5" />
        </button>
        <div className="absolute bottom-full right-0 mb-2 bg-stone-900 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Message Ravi on WhatsApp
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 text-white pb-24 lg:pb-0">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 pb-8">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center">
                  <TreePine className="h-4 w-4 text-white" />
                </div>
                <span className="text-[15px] font-semibold">{PROPERTY.name}</span>
              </div>
              <p className="text-[13px] text-stone-400 leading-relaxed">{PROPERTY.location}<br />{PROPERTY.region}</p>
            </div>
            <div>
              <div className="text-[12px] font-medium text-stone-500 uppercase tracking-wider mb-4">Contact</div>
              <div className="space-y-2.5 text-[13px]">
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"><Phone className="h-4 w-4" /> +91 98XXX XXXXX</a>
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"><Mail className="h-4 w-4" /> stay@thebanyahouse.com</a>
                <a href="#" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"><Instagram className="h-4 w-4" /> @thebanyahouse</a>
              </div>
            </div>
            <div>
              <div className="text-[12px] font-medium text-stone-500 uppercase tracking-wider mb-4">Navigate</div>
              <div className="space-y-2.5 text-[13px]">
                {['Photos', 'Amenities', 'Experiences', 'Reviews', 'Location'].map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="block text-stone-400 hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-6 flex flex-wrap items-center justify-between gap-3 text-[12px] text-stone-600">
            <span>&copy; 2026 {PROPERTY.name}</span>
            <div className="flex items-center gap-1.5">
              <span>Website by</span>
              <a href="https://kraftai.in" className="text-stone-400 hover:text-white font-medium transition-colors">KraftAI</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" onClick={() => setLightbox(false)}>
            <X className="h-5 w-5" />
          </button>
          <div className="max-w-3xl w-full mx-6" onClick={e => e.stopPropagation()}>
            <div className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${GALLERY[galleryIndex].gradient} relative overflow-hidden`}>
              <img src={GALLERY[galleryIndex].img} alt={GALLERY[galleryIndex].label} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-white/70 text-[13px]">{galleryIndex + 1} / {GALLERY.length}</span>
                <h3 className="text-white text-xl font-semibold mt-1">{GALLERY[galleryIndex].label}</h3>
                <p className="text-white/70 text-[14px] mt-0.5">{GALLERY[galleryIndex].overlayText}</p>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={prevSlide} className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={nextSlide} className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ShoppingCart,
  ChevronRight,
  Instagram,
  Facebook,
  MessageSquare,
  Search,
  Menu as MenuIcon,
  X,
  ArrowRight,
  Utensils,
  Truck,
  CalendarDays,
  Users,
  Globe,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

const MENU_ITEMS = [
  {
    category: 'Signatures',
    items: [
      { name: 'Heritage Special Thali', price: '₹450', desc: 'Our legendary platter — 12 items including dal, sabzi, raita, papad, dessert', tag: 'Bestseller', img: '🍛' },
      { name: 'Royal Biryani', price: '₹350', desc: 'Slow-cooked basmati with aromatic spices, saffron & caramelized onions', tag: 'Chef\'s Pick', img: '🍚' },
      { name: 'Tandoori Platter', price: '₹550', desc: 'Assorted kebabs, tikka, and naan fresh from our clay oven', img: '🍢' },
    ],
  },
  {
    category: 'Street Favorites',
    items: [
      { name: 'Kulhad Chai & Samosa', price: '₹80', desc: 'Authentic clay-pot chai served with crispy potato samosa', tag: 'Popular', img: '☕' },
      { name: 'Chole Bhature', price: '₹180', desc: 'Spiced chickpea curry with fluffy deep-fried bread', img: '🫓' },
      { name: 'Pani Puri (6 pcs)', price: '₹60', desc: 'Crispy shells filled with spiced potato, tangy water & chutneys', img: '🥟' },
    ],
  },
  {
    category: 'Fresh Drinks',
    items: [
      { name: 'Mango Lassi', price: '₹120', desc: 'Creamy yogurt blended with Alphonso mango pulp', tag: 'Seasonal', img: '🥭' },
      { name: 'Fresh Sugarcane Juice', price: '₹60', desc: 'Pressed to order with ginger and lime', img: '🧃' },
      { name: 'Rose Falooda', price: '₹150', desc: 'Rose milk, basil seeds, vermicelli, and ice cream', img: '🍨' },
    ],
  },
];

const REVIEWS = [
  { name: 'Priya M.', rating: 5, text: 'Best thali in the city! Been coming here for 15 years and the quality never drops.', date: '2 weeks ago' },
  { name: 'Rahul S.', rating: 5, text: 'The biryani is incredible — perfectly layered, aromatic, generous portions. Worth every rupee.', date: '1 month ago' },
  { name: 'Sarah K.', rating: 5, text: 'Found this gem on Google while traveling. The chai and samosa combo was life-changing!', date: '3 weeks ago' },
  { name: 'Amit D.', rating: 4, text: 'Great food, amazing heritage. Online ordering made it so convenient for our office party.', date: '1 month ago' },
];

export default function DemoPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Signatures');
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ── Top Bar ── */}
      <div className="bg-amber-600 text-white text-center text-sm py-2 px-4">
        <span className="font-medium">Order online & get 10% off your first order!</span>
        <span className="ml-2 opacity-80">Use code: WELCOME10</span>
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Heritage Kitchen</h1>
              <p className="text-xs text-gray-500 leading-tight">Est. 1972 · Authentic Indian</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#menu" className="hover:text-amber-600 transition-colors">Menu</a>
            <a href="#order" className="hover:text-amber-600 transition-colors">Order Online</a>
            <a href="#about" className="hover:text-amber-600 transition-colors">Our Story</a>
            <a href="#catering" className="hover:text-amber-600 transition-colors">Catering</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setCartCount(c => c + 1)}
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 text-sm font-medium text-gray-600">
            <a href="#menu" className="block py-2">Menu</a>
            <a href="#order" className="block py-2">Order Online</a>
            <a href="#about" className="block py-2">Our Story</a>
            <a href="#catering" className="block py-2">Catering</a>
            <a href="#contact" className="block py-2">Contact</a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 px-4 py-1.5 text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              4.8 ★ · 2,400+ Google Reviews
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Authentic Flavors,<br />
              <span className="text-amber-600">50+ Years of Legacy</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              From our grandmother&apos;s kitchen to your table. Serving traditional recipes passed down through three generations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#order"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 text-white px-6 py-3 font-semibold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200"
              >
                <ShoppingCart className="h-5 w-5" />
                Order Online
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-700 px-6 py-3 font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                View Full Menu
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-orange-200/40 blur-2xl" />
      </section>

      {/* ── Quick Info Bar ── */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>Open Today: 11 AM – 11 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span>3 Locations in City</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-amber-400" />
            <span>+91 98XXX XXXXX</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-amber-400" />
            <span>Free Delivery Above ₹500</span>
          </div>
        </div>
      </section>

      {/* ── Menu Section ── */}
      <section id="menu" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Menu</h2>
            <p className="text-gray-500">Authentic recipes, fresh ingredients, made with love</p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {MENU_ITEMS.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.category
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MENU_ITEMS.find(c => c.category === activeCategory)?.items.map((item) => (
              <div
                key={item.name}
                className="group rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-lg hover:border-amber-200 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{item.img}</div>
                  {item.tag && (
                    <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-0.5 text-xs font-medium">
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-600">{item.price}</span>
                  <button
                    className="rounded-lg bg-amber-600 text-white px-4 py-1.5 text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1"
                    onClick={() => setCartCount(c => c + 1)}
                  >
                    Add <ShoppingCart className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors">
              View Full Menu (40+ items) <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Online Ordering CTA ── */}
      <section id="order" className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-3">Order Directly — Zero Commission</h2>
          <p className="text-amber-100 mb-8 max-w-lg mx-auto">
            Skip the middlemen. Order directly from us and save. Pickup in 20 mins or delivery to your door.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white text-amber-700 px-8 py-3.5 font-bold hover:bg-amber-50 transition-colors shadow-lg">
              <ShoppingCart className="h-5 w-5" />
              Order for Pickup
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-amber-800 text-white px-8 py-3.5 font-bold hover:bg-amber-900 transition-colors border border-amber-500">
              <Truck className="h-5 w-5" />
              Order for Delivery
            </button>
          </div>
          <p className="text-amber-200 text-sm mt-4">Use code WELCOME10 for 10% off your first order</p>
        </div>
      </section>

      {/* ── About / Story ── */}
      <section id="about" className="py-16 sm:py-20 bg-amber-50/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What started as a small street stall in 1972 has grown into one of the city&apos;s most beloved restaurants. Our founder believed that great food doesn&apos;t need to be complicated — just honest ingredients, traditional techniques, and a whole lot of heart.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Three generations later, we still grind our spices fresh every morning, make our bread by hand, and cook each dish to order. Some things are worth keeping the old way.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-xl bg-white border border-gray-100">
                  <div className="text-2xl font-bold text-amber-600">50+</div>
                  <div className="text-xs text-gray-500 mt-1">Years</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-gray-100">
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-xs text-gray-500 mt-1">Locations</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-gray-100">
                  <div className="text-2xl font-bold text-amber-600">2.4K+</div>
                  <div className="text-xs text-gray-500 mt-1">Reviews</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-amber-200/60 h-40 flex items-center justify-center text-4xl">🍳</div>
              <div className="rounded-2xl bg-orange-200/60 h-40 flex items-center justify-center text-4xl mt-6">🧑‍🍳</div>
              <div className="rounded-2xl bg-yellow-200/60 h-40 flex items-center justify-center text-4xl -mt-3">🏪</div>
              <div className="rounded-2xl bg-red-200/40 h-40 flex items-center justify-center text-4xl mt-3">🎉</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">What People Say</h2>
            <div className="flex items-center justify-center gap-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400" />
              ))}
              <span className="text-gray-600 text-sm ml-2">4.8/5 from 2,400+ reviews</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-900">{r.name}</span>
                  <span className="text-gray-400 text-xs">{r.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <a href="#" className="inline-flex items-center gap-2 text-sm text-amber-600 font-medium hover:text-amber-700">
              <Search className="h-4 w-4" />
              See all reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* ── Catering ── */}
      <section id="catering" className="bg-gray-900 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Catering & Events</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                From intimate gatherings to corporate events and weddings — we bring the full Heritage Kitchen experience to your venue. Custom menus, professional setup, and the same flavors that made us famous.
              </p>
              <div className="space-y-3 mb-8">
                {['Weddings & Receptions', 'Corporate Events & Meetings', 'Birthday & Anniversary Parties', 'Festival & Holiday Catering'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-amber-600 text-white px-6 py-3 font-semibold hover:bg-amber-700 transition-colors">
                <CalendarDays className="h-5 w-5" />
                Get Catering Quote
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-800 p-6 text-center">
                <Users className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">50–500</div>
                <div className="text-gray-400 text-sm">Guests</div>
              </div>
              <div className="rounded-2xl bg-gray-800 p-6 text-center">
                <Utensils className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">40+</div>
                <div className="text-gray-400 text-sm">Menu Items</div>
              </div>
              <div className="rounded-2xl bg-gray-800 p-6 text-center">
                <Truck className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">Free</div>
                <div className="text-gray-400 text-sm">Setup & Delivery</div>
              </div>
              <div className="rounded-2xl bg-gray-800 p-6 text-center">
                <Star className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-gray-400 text-sm">Events Done</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location & Hours ── */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Find Us</h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Main Branch — Hazratganj', addr: '14 MG Road, Hazratganj', hours: '11 AM – 11 PM', phone: '+91 98XXX XXXXX' },
              { name: 'City Centre Mall', addr: 'Food Court, Level 3', hours: '10 AM – 10 PM', phone: '+91 98XXX XXXXX' },
              { name: 'Airport Road', addr: 'Near Terminal 1, Airport Rd', hours: '8 AM – 12 AM', phone: '+91 98XXX XXXXX' },
            ].map((loc) => (
              <div key={loc.name} className="rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-md transition-shadow">
                {/* Map placeholder */}
                <div className="rounded-xl bg-gray-100 h-32 mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{loc.name}</h3>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                    {loc.addr}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                    {loc.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                    {loc.phone}
                  </div>
                </div>
                <button className="mt-4 w-full rounded-lg bg-gray-100 text-gray-700 py-2 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" /> Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp Floating Button ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="h-14 w-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-105 transform">
          <MessageSquare className="h-7 w-7" />
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  H
                </div>
                <div>
                  <div className="font-bold">Heritage Kitchen</div>
                  <div className="text-xs text-gray-400">Est. 1972</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">Authentic Indian cuisine, passed down through three generations.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-200">Quick Links</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#menu" className="block hover:text-white">Menu</a>
                <a href="#order" className="block hover:text-white">Order Online</a>
                <a href="#catering" className="block hover:text-white">Catering</a>
                <a href="#about" className="block hover:text-white">Our Story</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-200">Hours</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Mon–Thu: 11 AM – 10 PM</div>
                <div>Fri–Sat: 11 AM – 11 PM</div>
                <div>Sunday: 10 AM – 10 PM</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-200">Follow Us</h3>
              <div className="flex gap-3">
                <button className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Globe className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <span>&copy; 2026 Heritage Kitchen. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>Built by</span>
              <a href="https://kraftai.in" className="text-amber-400 font-medium hover:text-amber-300">KraftAI</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import {
  Globe,
  Search,
  TrendingUp,
  Users,
  Phone,
  Mail,
  MapPin,
  Star,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShoppingCart,
  Calendar,
  MessageSquare,
} from 'lucide-react';

interface ProspectPageProps {
  businessName: string;
  tagline: string;
  city: string;
  country: 'India' | 'US';
  cuisine: string;
  established?: string;
  locations: string;
  rating?: string;
  currentProblem: string;
  problems: string[];
  features: string[];
  testimonialConcept: string;
  packagePrice: string;
  packagePriceINR?: string;
}

export default function ProspectPage({
  businessName,
  tagline,
  city,
  country,
  cuisine,
  established,
  locations,
  rating,
  currentProblem,
  problems,
  features,
  testimonialConcept,
  packagePrice,
  packagePriceINR,
}: ProspectPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
              K
            </div>
            <span className="text-sm font-semibold text-slate-300">
              KraftAI <span className="text-slate-600">|</span>{' '}
              <span className="text-indigo-400">Prepared for {businessName}</span>
            </span>
          </div>
          <a
            href="https://wa.me/918859820935?text=Hi%2C%20I%20saw%20the%20proposal%20you%20prepared%20for%20my%20business.%20Let%27s%20talk."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Let&apos;s Talk on WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-indigo-400">
            Custom proposal for
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {businessName}
          </h1>
          <p className="mt-4 text-xl text-slate-400 sm:text-2xl">{tagline}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {city}
            </span>
            {established && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Since {established}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {locations}
            </span>
            {rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-400" /> {rating}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="border-t border-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
              <AlertTriangle className="h-7 w-7 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              The Problem: You&apos;re Invisible Online
            </h2>
            <p className="mt-4 text-lg text-slate-400">{currentProblem}</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-5"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="text-sm text-slate-300">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Customers Leave — Real Stats */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400">
              Industry data
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why Customers Leave Before They Arrive
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              New customers and tourists don&apos;t walk into random restaurants. They search first.
              Here&apos;s what happens when they can&apos;t find you.
            </p>
          </div>

          {/* Big stat callout */}
          <div className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
            <p className="text-5xl sm:text-6xl font-extrabold text-amber-400">77%</p>
            <p className="mt-3 text-lg text-slate-300">
              of diners check a restaurant&apos;s website before visiting
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Source: Restaurant Dive — National Survey
            </p>
          </div>

          {/* Stats grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
              <p className="text-3xl font-bold text-indigo-400">64%</p>
              <p className="mt-2 text-sm text-slate-300">
                of diners check Google Search or Google Maps before deciding where to eat
              </p>
              <p className="mt-1 text-xs text-slate-600">Source: Restroworks — Google Restaurant Search Statistics</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
              <p className="text-3xl font-bold text-red-400">76%</p>
              <p className="mt-2 text-sm text-slate-300">
                of people who search &quot;restaurant near me&quot; visit a place within 24 hours
              </p>
              <p className="mt-1 text-xs text-slate-600">Source: Google / On The Map Marketing</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
              <p className="text-3xl font-bold text-amber-400">500M</p>
              <p className="mt-2 text-sm text-slate-300">
                restaurant searches on Google Maps every month — and you&apos;re not showing up properly
              </p>
              <p className="mt-1 text-xs text-slate-600">Source: SQ Magazine — Google Maps Statistics 2026</p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
              <p className="text-3xl font-bold text-emerald-400">0%</p>
              <p className="mt-2 text-sm text-slate-300">
                of Google Maps &quot;Menu&quot; buttons work without a website — customers tap it, get nothing, and leave
              </p>
              <p className="mt-1 text-xs text-slate-600">Source: Marketpath — Why Restaurants Need A Website</p>
            </div>
          </div>

          {/* The journey callout */}
          <div className="mt-10 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-5">
              What a new customer sees right now
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
              {[
                { step: '1', text: `Searches "${businessName}" on Google Maps`, color: 'text-slate-300' },
                { step: '2', text: 'Taps "Website" button', color: 'text-slate-300' },
                { step: '3', text: 'Nothing loads — no website exists', color: 'text-red-400' },
                { step: '4', text: 'Goes to the next restaurant that has one', color: 'text-red-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 sm:flex-1">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i < 2 ? 'bg-slate-700 text-slate-300' : 'bg-red-500/20 text-red-400'}`}>
                    {item.step}
                  </div>
                  <p className={`text-sm ${item.color}`}>{item.text}</p>
                  {i < 3 && (
                    <ArrowRight className="hidden sm:block h-4 w-4 text-slate-600 shrink-0 ml-auto mr-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We'd Build */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
              <Globe className="h-7 w-7 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              What Your Business Could Look Like Online
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              A complete digital presence built for {cuisine} lovers searching for you.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const icons = [Globe, Search, ShoppingCart, Calendar, MessageSquare, TrendingUp, Users, Star];
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 transition-colors hover:border-indigo-500/30"
                >
                  <Icon className="mb-3 h-6 w-6 text-indigo-400" />
                  <p className="text-sm text-slate-300">{feature}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search Simulation */}
      <section className="border-t border-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            What Happens When Someone Googles You
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {/* Without */}
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-red-400">
                Without a Website (Today)
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-slate-800/50 p-3">
                  <p className="text-xs text-slate-500">Google Search Result</p>
                  <p className="text-sm text-blue-400">{businessName} - Zomato / Yelp</p>
                  <p className="text-xs text-slate-500">
                    Third-party site takes 25-30% commission on every order
                  </p>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-3">
                  <p className="text-xs text-slate-500">Google Search Result</p>
                  <p className="text-sm text-blue-400">{businessName} - Facebook Page</p>
                  <p className="text-xs text-slate-500">
                    Outdated info, hard to find menu/hours
                  </p>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-3">
                  <p className="text-xs text-red-400">No official website found</p>
                  <p className="text-xs text-slate-500">
                    Customer leaves and tries a competitor instead
                  </p>
                </div>
              </div>
            </div>

            {/* With */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-emerald-400">
                With KraftAI Website
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-slate-800/50 p-3">
                  <p className="text-xs text-slate-500">Google Search Result #1</p>
                  <p className="text-sm text-blue-400">
                    {businessName} - Official Website
                  </p>
                  <p className="text-xs text-emerald-400">
                    Full menu, online ordering, location map, reviews
                  </p>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-3">
                  <p className="text-xs text-slate-500">Google Search Result #2</p>
                  <p className="text-sm text-blue-400">
                    Order from {businessName} | Free Delivery
                  </p>
                  <p className="text-xs text-emerald-400">
                    Direct orders = 0% commission, 100% profit
                  </p>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-3">
                  <p className="text-xs text-slate-500">Google Maps</p>
                  <p className="text-sm text-blue-400">{businessName} ★★★★★</p>
                  <p className="text-xs text-emerald-400">
                    Website link drives traffic directly to you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">The Numbers Speak</h2>
          <p className="mt-4 text-lg text-slate-400">{testimonialConcept}</p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
              <p className="text-3xl font-bold text-indigo-400">30%</p>
              <p className="mt-2 text-sm text-slate-400">
                more orders from direct website vs aggregator-only
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
              <p className="text-3xl font-bold text-emerald-400">
                {country === 'India' ? '₹0' : '$0'}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                commission on direct orders (vs 25-30% on Zomato/DoorDash)
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
              <p className="text-3xl font-bold text-yellow-400">24/7</p>
              <p className="mt-2 text-sm text-slate-400">
                your menu, hours & location available to customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package & Pricing */}
      <section className="border-t border-slate-800 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Your Custom Package</h2>
          <p className="mt-4 text-slate-400">
            Everything you need to go from invisible to unforgettable — website, AI automation, and ongoing support.
          </p>

          <div className="mt-10 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-900 p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
              Full Package
            </p>
            <p className="mt-4 text-4xl font-extrabold">{packagePrice}</p>
            {packagePriceINR && (
              <p className="mt-1 text-indigo-400 text-sm font-medium">{packagePriceINR}</p>
            )}
            <p className="mt-1 text-sm text-slate-500">per month, cancel anytime</p>

            <ul className="mt-8 space-y-3 text-left">
              {[
                'Custom website with your branding, menu & photos',
                'Online ordering system (0% commission)',
                'Google Business Profile optimization',
                'AI chatbot for customer queries & reservations',
                'WhatsApp integration for orders',
                'Monthly analytics & performance reports',
                'SEO to rank #1 for your business name',
                '60-day money-back guarantee',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/918859820935?text=Hi%2C%20I%20saw%20the%20proposal%20for%20my%20business.%20I%27m%20interested%20in%20the%20full%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Get Started on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Talk?</h2>
          <p className="mt-3 text-slate-400">
            No pressure, no contracts. Let&apos;s have a quick chat about what we can build for {businessName}.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href="tel:+13314318078"
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Phone className="h-4 w-4" /> +1 (331) 431-8078
            </a>
            <a
              href="https://wa.me/918859820935"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="mailto:hey@kraftai.in"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-300 transition-colors"
            >
              <Mail className="h-4 w-4" /> hey@kraftai.in
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs text-slate-600">
            This page was prepared exclusively for {businessName} by KraftAI.{' '}
            <a href="https://kraftai.in" className="text-indigo-400 hover:text-indigo-300">
              kraftai.in
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

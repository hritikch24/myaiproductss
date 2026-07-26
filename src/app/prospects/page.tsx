import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Globe, ArrowUpRight, TrendingUp, Building2, Utensils, IndianRupee, DollarSign, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Prospect Pipeline | KraftAI',
  description: 'KraftAI prospect pipeline — businesses ready for digital transformation.',
};

interface Prospect {
  id: string;
  name: string;
  type: string;
  city: string;
  rating: string;
  locations: string;
  cuisine: string;
  packageValue: string;
  established?: string;
  highlight?: string;
}

const indiaProspects: Prospect[] = [
  {
    id: 'nandhana-palace',
    name: 'Nandhana Palace',
    type: 'Multi-location chain',
    city: 'Bangalore',
    rating: '4.2★',
    locations: '10+ locations',
    cuisine: 'Andhra',
    packageValue: '₹75,000/mo',
    established: '2000s',
    highlight: 'Dead domain — times out',
  },
  {
    id: 'biryani-nawaabs',
    name: 'Biryani Nawaabs',
    type: 'Restaurant',
    city: 'Lucknow',
    rating: '4.7★ · 820+ reviews',
    locations: '1 location',
    cuisine: 'Biryani / Mughlai',
    packageValue: '₹35,000/mo',
    established: '2010s',
  },
  {
    id: 'lalla-biryani',
    name: 'Lalla Biryani',
    type: 'Heritage restaurant',
    city: 'Lucknow',
    rating: 'Since 1985',
    locations: '1 location',
    cuisine: 'Biryani',
    packageValue: '₹35,000/mo',
    established: '1985',
    highlight: '40-year legacy',
  },
  {
    id: 'haji-shabrati',
    name: 'Haji Shabrati Nihari Wale',
    type: 'Heritage restaurant',
    city: 'Old Delhi',
    rating: 'Globally featured',
    locations: '1 location',
    cuisine: 'Nihari / Mughlai',
    packageValue: '₹35,000/mo',
    established: '1957',
    highlight: 'Near Jama Masjid — 68 years',
  },
  {
    id: 'haji-ali-juice',
    name: 'Haji Ali Juice Centre',
    type: 'Iconic juice bar',
    city: 'Mumbai',
    rating: '28,000+ reviews',
    locations: 'Multiple branches',
    cuisine: 'Juices & Shakes',
    packageValue: '₹50,000/mo',
    established: '1960s',
    highlight: 'Mumbai landmark',
  },
  {
    id: 'lucky-dhaba',
    name: 'Lucky Dhaba',
    type: 'Highway dhaba',
    city: 'Jalandhar',
    rating: '#24 on TripAdvisor',
    locations: '1 location · NH1',
    cuisine: 'Pure Veg Punjabi',
    packageValue: '₹30,000/mo',
    established: '1967',
  },
  {
    id: 'sharma-ji-chai',
    name: 'Sharma Ji Ki Chai',
    type: 'Iconic chai stall',
    city: 'Lucknow',
    rating: 'PM Vajpayee, Kartik Aaryan visited',
    locations: '1 · Hazratganj',
    cuisine: 'Kulhad Chai',
    packageValue: '₹25,000/mo',
    established: '1970s',
    highlight: 'UP Tourism endorsed',
  },
  {
    id: 'ratna-cafe',
    name: 'Ratna Cafe',
    type: 'Heritage chain',
    city: 'Chennai',
    rating: '75+ year legacy',
    locations: '4+ branches',
    cuisine: 'South Indian Veg',
    packageValue: '₹40,000/mo',
    established: '1948',
    highlight: "Chennai's oldest veg chain",
  },
];

const usProspects: Prospect[] = [
  {
    id: 'cheap-charlies',
    name: "Cheap Charlie's Taco Shop",
    type: 'Multi-location restaurant',
    city: 'Nashville, TN',
    rating: 'Strong reviews',
    locations: '4 locations',
    cuisine: 'Tacos / Mexican',
    packageValue: '$499/mo',
    highlight: '4 spots, 0 web presence',
  },
  {
    id: 'tonys-catch',
    name: "Tony's Catch",
    type: 'Food truck',
    city: 'Kapaa, Kauai, HI',
    rating: '#1 Food Truck in US (Yelp)',
    locations: '1 truck',
    cuisine: 'Seafood / Fish Tacos',
    packageValue: '$449/mo',
    highlight: '#1 in entire USA — no site',
  },
];

const totalPipeline =
  indiaProspects.reduce((s, p) => {
    const match = p.packageValue.match(/[\d,]+/);
    return s + (match ? parseInt(match[0].replace(/,/g, '')) : 0);
  }, 0) +
  usProspects.reduce((s, p) => {
    const match = p.packageValue.match(/[\d,]+/);
    return s + (match ? parseInt(match[0].replace(/,/g, '')) : 0);
  }, 0);

function ProspectRow({ prospect, index }: { prospect: Prospect; index: number }) {
  return (
    <Link
      href={`/prospects/${prospect.id}`}
      className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[2rem_1fr_minmax(100px,auto)_minmax(80px,auto)_minmax(100px,auto)_2.5rem] items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-stone-50 transition-colors duration-150 border-b border-stone-100 last:border-0"
    >
      {/* Index */}
      <span className="hidden sm:block text-[13px] text-stone-400 font-mono tabular-nums text-right">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Name + meta */}
      <div className="min-w-0 col-span-2 sm:col-span-1">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[14px] font-semibold text-stone-900 group-hover:text-stone-700 transition-colors truncate">
            {prospect.name}
          </h3>
          {prospect.highlight && (
            <span className="hidden lg:inline-flex shrink-0 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
              {prospect.highlight}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 text-[12px] text-stone-400">
          <span>{prospect.cuisine}</span>
          <span className="text-stone-200">·</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{prospect.city}</span>
          <span className="text-stone-200">·</span>
          <span>{prospect.locations}</span>
        </div>
      </div>

      {/* Rating — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-stone-500 justify-end">
        <Star className="h-3 w-3 text-amber-400 shrink-0" />
        <span className="truncate text-right">{prospect.rating}</span>
      </div>

      {/* Type — hidden on mobile */}
      <div className="hidden sm:block text-[12px] text-stone-400 text-right truncate">
        {prospect.type}
      </div>

      {/* Price */}
      <div className="hidden sm:block text-right">
        <span className="text-[13px] font-semibold text-stone-900 tabular-nums">{prospect.packageValue}</span>
      </div>

      {/* Arrow */}
      <div className="hidden sm:flex justify-end">
        <ArrowUpRight className="h-4 w-4 text-stone-300 group-hover:text-stone-600 transition-colors" />
      </div>

      {/* Mobile price + arrow */}
      <div className="sm:hidden flex items-center justify-end gap-2">
        <span className="text-[13px] font-semibold text-stone-900">{prospect.packageValue}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-stone-300" />
      </div>
    </Link>
  );
}

export default function ProspectsPage() {
  const total = indiaProspects.length + usProspects.length;
  const locations = indiaProspects.reduce((s, p) => {
    const m = p.locations.match(/\d+/);
    return s + (m ? parseInt(m[0]) : 1);
  }, 0) + usProspects.reduce((s, p) => {
    const m = p.locations.match(/\d+/);
    return s + (m ? parseInt(m[0]) : 1);
  }, 0);

  return (
    <div className="min-h-screen bg-white text-stone-900 antialiased">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-stone-900 flex items-center justify-center">
              <span className="text-white text-[11px] font-bold tracking-tight">K</span>
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold text-stone-900">KraftAI</span>
              <span className="text-stone-300">/</span>
              <span className="text-stone-500">Pipeline</span>
            </div>
          </div>
          <a
            href="/demo"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stone-500 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Demo site <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 sm:px-8 py-10 sm:py-14">

        {/* ── Title ── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-[-0.02em]">
            Prospect pipeline
          </h1>
          <p className="mt-1.5 text-[15px] text-stone-500">
            {total} verified businesses with no working website. Each links to a custom proposal.
          </p>
        </div>

        {/* ── Summary cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: 'Total prospects', value: String(total), icon: Users },
            { label: 'Combined locations', value: `${locations}+`, icon: Building2 },
            { label: 'India pipeline', value: `₹${(indiaProspects.reduce((s, p) => { const m = p.packageValue.match(/[\d,]+/); return s + (m ? parseInt(m[0].replace(/,/g, '')) : 0); }, 0) / 1000).toFixed(0)}K/mo`, icon: IndianRupee },
            { label: 'US pipeline', value: `$${usProspects.reduce((s, p) => { const m = p.packageValue.match(/[\d,]+/); return s + (m ? parseInt(m[0].replace(/,/g, '')) : 0); }, 0).toLocaleString()}/mo`, icon: DollarSign },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-stone-100 bg-stone-50/50 px-4 py-3.5">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-3.5 w-3.5 text-stone-400" />
                <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-xl font-bold text-stone-900 tracking-tight">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* ── India ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <h2 className="text-[13px] font-semibold text-stone-900 uppercase tracking-wider">India</h2>
            <span className="text-[12px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{indiaProspects.length}</span>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white overflow-hidden">
            {/* Table header — desktop only */}
            <div className="hidden sm:grid grid-cols-[2rem_1fr_minmax(100px,auto)_minmax(80px,auto)_minmax(100px,auto)_2.5rem] items-center gap-x-4 px-5 py-2.5 bg-stone-50/80 text-[11px] font-medium text-stone-400 uppercase tracking-wider border-b border-stone-100">
              <span className="text-right">#</span>
              <span>Business</span>
              <span className="text-right">Rating</span>
              <span className="text-right">Type</span>
              <span className="text-right">Value</span>
              <span></span>
            </div>
            {indiaProspects.map((p, i) => (
              <ProspectRow key={p.id} prospect={p} index={i} />
            ))}
          </div>
        </section>

        {/* ── US ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <h2 className="text-[13px] font-semibold text-stone-900 uppercase tracking-wider">United States</h2>
            <span className="text-[12px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{usProspects.length}</span>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white overflow-hidden">
            <div className="hidden sm:grid grid-cols-[2rem_1fr_minmax(100px,auto)_minmax(80px,auto)_minmax(100px,auto)_2.5rem] items-center gap-x-4 px-5 py-2.5 bg-stone-50/80 text-[11px] font-medium text-stone-400 uppercase tracking-wider border-b border-stone-100">
              <span className="text-right">#</span>
              <span>Business</span>
              <span className="text-right">Rating</span>
              <span className="text-right">Type</span>
              <span className="text-right">Value</span>
              <span></span>
            </div>
            {usProspects.map((p, i) => (
              <ProspectRow key={p.id} prospect={p} index={i + indiaProspects.length} />
            ))}
          </div>
        </section>

        {/* ── Demo link ── */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-semibold text-stone-900 mb-1">Sample restaurant website</h3>
            <p className="text-[13px] text-stone-500">Show prospects what their website could look like.</p>
          </div>
          <a
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 py-2.5 text-[13px] font-semibold hover:bg-stone-800 transition-all duration-200 shrink-0"
          >
            View demo <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-100 py-6 mt-4">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-[12px] text-stone-400">
          <span>KraftAI · Internal pipeline</span>
          <div className="flex items-center gap-4">
            <a href="https://kraftai.in" className="hover:text-stone-700 transition-colors">kraftai.in</a>
            <a href="mailto:hey@kraftai.in" className="hover:text-stone-700 transition-colors">hey@kraftai.in</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

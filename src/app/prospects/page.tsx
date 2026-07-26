import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Globe, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Prospect Dashboard | KraftAI',
  description: 'KraftAI prospect pipeline — businesses ready for a digital transformation.',
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
}

const indiaProspects: Prospect[] = [
  {
    id: 'nandhana-palace',
    name: 'Nandhana Palace',
    type: 'Multi-location Restaurant',
    city: 'Bangalore',
    rating: '4.2★',
    locations: '10+ locations',
    cuisine: 'Andhra',
    packageValue: '₹75,000/mo',
  },
  {
    id: 'biryani-nawaabs',
    name: 'Biryani Nawaabs',
    type: 'Restaurant',
    city: 'Lucknow',
    rating: '4.7★ (820+ reviews)',
    locations: '1 location',
    cuisine: 'Biryani / Mughlai',
    packageValue: '₹35,000/mo',
  },
  {
    id: 'lalla-biryani',
    name: 'Lalla Biryani',
    type: 'Heritage Restaurant',
    city: 'Lucknow',
    rating: 'Legendary since 1985',
    locations: '1 location',
    cuisine: 'Biryani',
    packageValue: '₹35,000/mo',
  },
  {
    id: 'haji-shabrati',
    name: 'Haji Shabrati Nihari Wale',
    type: 'Heritage Restaurant',
    city: 'Old Delhi',
    rating: 'Since 1957 — globally featured',
    locations: '1 location',
    cuisine: 'Nihari / Mughlai',
    packageValue: '₹35,000/mo',
  },
  {
    id: 'haji-ali-juice',
    name: 'Haji Ali Juice Centre',
    type: 'Iconic Juice Bar',
    city: 'Mumbai',
    rating: '28,000+ reviews',
    locations: 'Multiple branches',
    cuisine: 'Fresh Juices & Shakes',
    packageValue: '₹50,000/mo',
  },
  {
    id: 'lucky-dhaba',
    name: 'Lucky Dhaba',
    type: 'Highway Dhaba',
    city: 'Jalandhar, Punjab',
    rating: 'Legendary since 1967',
    locations: '1 location — NH1',
    cuisine: 'Pure Veg Punjabi',
    packageValue: '₹30,000/mo',
  },
  {
    id: 'sharma-ji-chai',
    name: 'Sharma Ji Ki Chai',
    type: 'Iconic Chai Stall',
    city: 'Lucknow',
    rating: 'Visited by PM Vajpayee, Kartik Aaryan',
    locations: '1 iconic location — Hazratganj',
    cuisine: 'Kulhad Chai, Bun Makkhan',
    packageValue: '₹25,000/mo',
  },
  {
    id: 'ratna-cafe',
    name: 'Ratna Cafe',
    type: 'Heritage Restaurant Chain',
    city: 'Chennai',
    rating: '75+ year legacy, multi-generational',
    locations: '4+ branches',
    cuisine: 'South Indian Vegetarian',
    packageValue: '₹40,000/mo',
  },
];

const usProspects: Prospect[] = [
  {
    id: 'cheap-charlies',
    name: "Cheap Charlie's Taco Shop",
    type: 'Multi-location Restaurant',
    city: 'Nashville, TN',
    rating: 'Strong reviews',
    locations: '4 locations',
    cuisine: 'Tacos / Mexican',
    packageValue: '$499/mo',
  },
  {
    id: 'ooowee-bbq',
    name: 'OooWee BBQ',
    type: 'Food Truck',
    city: 'Charlotte, NC',
    rating: '10+ years, strong Yelp reviews',
    locations: '2 trucks',
    cuisine: 'BBQ',
    packageValue: '$349/mo',
  },
  {
    id: 'boteco-atx',
    name: 'Boteco Food Truck',
    type: 'Food Truck — DDD Featured',
    city: 'Austin, TX',
    rating: '463+ Yelp reviews, TV featured',
    locations: '1 truck',
    cuisine: 'Brazilian',
    packageValue: '$449/mo',
  },
  {
    id: 'la-pinata',
    name: 'La Piñata Taqueria',
    type: 'Food Truck — #6 in US',
    city: 'Vallejo, CA',
    rating: '#6 Best Food Truck in US (Yelp)',
    locations: '1 truck',
    cuisine: 'Mexican',
    packageValue: '$399/mo',
  },
  {
    id: 'capitol-burger',
    name: 'Capitol Burger',
    type: 'Food Truck — #1 in Torrey',
    city: 'Torrey, UT',
    rating: '4.9★ TripAdvisor, 282+ Yelp reviews',
    locations: '1 truck — near Capitol Reef NP',
    cuisine: 'Gourmet Burgers',
    packageValue: '$399/mo',
  },
  {
    id: 'tonys-catch',
    name: "Tony's Catch",
    type: 'Food Truck — #1 in US',
    city: 'Kapaa, Kauai, HI',
    rating: '#1 Food Truck in America (Yelp 2025)',
    locations: '1 truck',
    cuisine: 'Seafood / Fish Tacos',
    packageValue: '$449/mo',
  },
];

function ProspectCard({ prospect }: { prospect: Prospect }) {
  return (
    <Link
      href={`/prospects/${prospect.id}`}
      className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-indigo-500/40 hover:bg-slate-900"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {prospect.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {prospect.type} &middot; {prospect.cuisine}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
          No website
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-slate-600" />
          {prospect.city}
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-3.5 w-3.5 text-yellow-500" />
          {prospect.rating}
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-slate-600" />
          {prospect.locations}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-sm font-semibold text-indigo-400">{prospect.packageValue}</span>
        <span className="inline-flex items-center gap-1 text-xs text-slate-500 group-hover:text-indigo-400 transition-colors">
          View proposal <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

export default function ProspectsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
            K
          </div>
          <span className="text-sm font-semibold text-slate-300">
            KraftAI <span className="text-slate-600">|</span>{' '}
            <span className="text-indigo-400">Prospect Pipeline</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Prospect Dashboard
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            {indiaProspects.length + usProspects.length} businesses with great reviews but no
            website. Each card links to a custom proposal page.
          </p>
        </div>

        {/* India Prospects */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-white">India Prospects</h2>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-0.5 text-xs font-medium text-indigo-400">
              {indiaProspects.length}
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {indiaProspects.map((p) => (
              <ProspectCard key={p.id} prospect={p} />
            ))}
          </div>
        </section>

        {/* US Prospects */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-white">US Prospects</h2>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-0.5 text-xs font-medium text-indigo-400">
              {usProspects.length}
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {usProspects.map((p) => (
              <ProspectCard key={p.id} prospect={p} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs text-slate-600">
            KraftAI Prospect Pipeline &mdash; Internal Use Only &mdash;{' '}
            <a href="https://kraftai.in" className="text-indigo-400 hover:text-indigo-300">
              kraftai.in
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

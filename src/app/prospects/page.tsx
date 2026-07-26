import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const prospects = [
  { id: 'nandhana-palace', name: 'Nandhana Palace', city: 'Bangalore', country: 'India', type: '10+ location Andhra chain', status: 'Dead website' },
  { id: 'biryani-nawaabs', name: 'Biryani Nawaabs', city: 'Lucknow', country: 'India', type: '4.7★ biryani restaurant', status: 'No website' },
  { id: 'lalla-biryani', name: 'Lalla Biryani', city: 'Lucknow', country: 'India', type: 'Since 1985', status: 'No website' },
  { id: 'haji-shabrati', name: 'Haji Shabrati Nihari Wale', city: 'Old Delhi', country: 'India', type: 'Since 1957', status: 'No website' },
  { id: 'cheap-charlies', name: "Cheap Charlie's Taco Shop", city: 'Nashville, TN', country: 'US', type: '4-location taco chain', status: 'No website' },
  { id: 'ooowee-bbq', name: 'OooWee BBQ', city: 'Charlotte, NC', country: 'US', type: 'BBQ food trucks (10+ years)', status: 'No website' },
];

export default function ProspectsIndex() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-2xl font-bold">KraftAI Prospect Pipeline</h1>
          <p className="mt-1 text-sm text-slate-400">
            Businesses verified to have NO working website — each page is a custom sales proposal.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prospects.map((p) => (
            <Link
              key={p.id}
              href={`/prospects/${p.id}`}
              className="group rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-indigo-500/30 hover:bg-slate-800/50"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {p.name}
                </h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  p.country === 'India' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {p.country}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3 w-3" /> {p.city}
              </div>
              <p className="mt-2 text-sm text-slate-400">{p.type}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                  {p.status}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
                  View proposal <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

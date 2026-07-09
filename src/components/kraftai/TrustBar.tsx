'use client';

import { Shield, Lock, Clock, Award, Headphones } from 'lucide-react';

interface TrustBarProps {
  variant?: 'light' | 'dark';
}

const TRUST_ITEMS = [
  { icon: Shield, text: '60-Day Money-Back Guarantee' },
  { icon: Lock, text: 'SOC 2 Compliant Infrastructure' },
  { icon: Headphones, text: 'US Business Hours Support' },
  { icon: Clock, text: 'Live in 48 Hours' },
  { icon: Award, text: 'No Long-Term Contracts' },
];

/**
 * Horizontal trust badge bar — shows credibility markers
 * aimed at US SMBs who might be hesitant about a new vendor.
 */
export default function TrustBar({ variant = 'dark' }: TrustBarProps) {
  const bgClass = variant === 'dark'
    ? 'bg-slate-900/50 border-slate-800/50'
    : 'bg-slate-800/30 border-slate-700/30';

  return (
    <section className={`border-y ${bgClass} py-5`} aria-label="Trust signals">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-slate-400">
              <item.icon className="h-4 w-4 text-emerald-400/80 shrink-0" aria-hidden="true" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

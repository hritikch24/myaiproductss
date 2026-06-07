import { Shield, Clock, Award, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  nicheName: string;
}

const trustBadges = [
  { icon: Award, label: 'Trusted by 500+ US businesses', stat: '500+' },
  { icon: Shield, label: 'SOC 2 Compliant', stat: 'SOC 2' },
  { icon: Clock, label: '24/7 AI-Powered Support', stat: '24/7' },
  { icon: CheckCircle2, label: '14-Day Free Trial', stat: 'Free Trial' },
];

export default function HeroSection({
  headline,
  subheadline,
  ctaText,
  nicheName,
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-20 sm:py-28"
      aria-label={`${nicheName} hero`}
    >
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Background decoration */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Niche badge for context */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-medium text-indigo-300">
            AI Automation for {nicheName}
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto sm:text-xl">
          {subheadline}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#lead-form"
            className="inline-flex items-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            {ctaText}
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-xl border border-slate-600 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            See How It Works
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-slate-400">
              <badge.icon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

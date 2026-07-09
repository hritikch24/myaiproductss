'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface StickyCTAProps {
  ctaText?: string;
  /** Short urgency line shown on desktop */
  urgencyText?: string;
}

export default function StickyMobileCTA({
  ctaText = 'Get Your Free Audit',
  urgencyText = 'Limited founding-client spots available',
}: StickyCTAProps) {
  const [show, setShow] = useState(false);
  const [nearForm, setNearForm] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 600);

      // Hide when the lead form is visible to avoid overlap
      const form = document.getElementById('lead-form');
      if (form) {
        const rect = form.getBoundingClientRect();
        setNearForm(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show || nearForm) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150]">
      {/* Mobile */}
      <div className="sm:hidden bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-4 py-3 safe-area-pb">
        <a
          href="#lead-form"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-transform"
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block bg-slate-950/95 backdrop-blur-lg border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="h-4 w-4 text-amber-400" aria-hidden="true" />
            <span className="text-sm text-slate-300">{urgencyText}</span>
          </div>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-colors"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

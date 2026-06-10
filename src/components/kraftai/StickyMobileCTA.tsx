'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function StickyMobileCTA({ ctaText = 'Get Your Free Audit' }: { ctaText?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (~600px)
      setShow(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] sm:hidden">
      <div className="bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-4 py-3 safe-area-pb">
        <a
          href="#lead-form"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-transform"
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

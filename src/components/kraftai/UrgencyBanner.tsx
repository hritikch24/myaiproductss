'use client';

import { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';

export default function UrgencyBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if user dismissed this session
    if (sessionStorage.getItem('_kraft_banner_dismissed')) {
      return;
    }
    // Show after a small delay for impact
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('_kraft_banner_dismissed', '1');
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${dismissed ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
    >
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-lg shadow-indigo-500/20">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 justify-center">
            <span className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-amber-300 fill-amber-300" aria-hidden="true" />
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">Free</span>
            </span>
            <p className="text-sm sm:text-base font-semibold text-white">
              Get a <span className="text-amber-300 font-extrabold">free automation audit</span> — see exactly where your leads leak
            </p>
            <a
              href="#lead-form"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-sm"
            >
              Book Mine
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 rounded-full p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

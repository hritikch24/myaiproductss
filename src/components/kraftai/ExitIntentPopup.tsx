'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Gift } from 'lucide-react';

interface ExitIntentPopupProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
}

export default function ExitIntentPopup({
  headline = "Wait — don't leave empty-handed",
  subtext = 'Get a free automation audit showing exactly how much time and revenue you\'re leaving on the table. Takes 30 minutes, zero obligation.',
  ctaText = 'Claim My Free Audit',
}: ExitIntentPopupProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const dismiss = useCallback(() => {
    setClosing(true);
    sessionStorage.setItem('_kraft_exit_dismissed', '1');
    setTimeout(() => setVisible(false), 300);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('_kraft_exit_dismissed')) return;

    // Desktop: mouse leaves viewport from top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !visible) {
        setVisible(true);
      }
    };

    // Mobile fallback: show after 45s on page if they haven't scrolled to form
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768 && !visible) {
        const form = document.getElementById('lead-form');
        if (form) {
          const rect = form.getBoundingClientRect();
          // Only show if form is NOT in viewport
          if (rect.top > window.innerHeight || rect.bottom < 0) {
            setVisible(true);
          }
        }
      }
    }, 45000);

    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center p-4 transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Special offer"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-indigo-500/10 overflow-hidden transition-transform duration-300 ${closing ? 'scale-95' : 'scale-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top bar */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/15 flex items-center justify-center mb-6">
            <Gift className="h-8 w-8 text-indigo-400" aria-hidden="true" />
          </div>

          <h3 className="text-2xl font-bold text-white leading-tight">
            {headline}
          </h3>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            {subtext}
          </p>

          <a
            href="#lead-form"
            onClick={dismiss}
            className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-colors"
          >
            {ctaText}
          </a>

          <button
            onClick={dismiss}
            className="mt-3 text-sm text-slate-500 hover:text-slate-400 transition-colors"
          >
            No thanks, I&apos;ll figure it out myself
          </button>
        </div>
      </div>
    </div>
  );
}

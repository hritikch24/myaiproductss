'use client';

import { useState, useEffect, useCallback, useRef, type FormEvent } from 'react';
import { X, Gift, Loader2, CheckCircle2, Shield, Clock } from 'lucide-react';

interface ExitIntentPopupProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  source?: string;
}

export default function ExitIntentPopup({
  headline = "Wait — get your free AI audit first",
  subtext = "We'll show you exactly how much time and revenue you're leaving on the table. 30 minutes, zero obligation.",
  ctaText = 'Send My Free Audit',
  source = 'exit-intent',
}: ExitIntentPopupProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const shown = useRef(false);

  const dismiss = useCallback(() => {
    setClosing(true);
    try { sessionStorage.setItem('_kraft_exit_dismissed', '1'); } catch {}
    setTimeout(() => setVisible(false), 300);
  }, []);

  const show = useCallback(() => {
    if (shown.current) return;
    try { if (sessionStorage.getItem('_kraft_exit_dismissed')) return; } catch {}
    shown.current = true;
    setVisible(true);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = (fd.get('email') as string).trim();
    const name = (fd.get('name') as string).trim();
    if (!email || !name) return;

    setFormStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone: '', company: '', message: 'Exit intent capture', source }),
      });
      if (!res.ok) throw new Error();
      setFormStatus('success');
      try { sessionStorage.setItem('_kraft_exit_dismissed', '1'); } catch {}
    } catch {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    try { if (sessionStorage.getItem('_kraft_exit_dismissed')) return; } catch {}

    const onMouseLeave = (e: MouseEvent) => { if (e.clientY <= 5) show(); };

    let maxScroll = 0;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = window.scrollY / total;
      if (pct > maxScroll) maxScroll = pct;
      if (maxScroll > 0.4 && pct < maxScroll - 0.15) show();
    };

    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) {
        const form = document.getElementById('lead-form');
        if (!form) { show(); return; }
        const rect = form.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) show();
      }
    }, 15000);

    let leftAt = 0;
    const onVisChange = () => {
      if (document.hidden) { leftAt = Date.now(); }
      else if (leftAt && Date.now() - leftAt > 5000) show();
    };

    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisChange);
      clearTimeout(mobileTimer);
    };
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center p-4 transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Special offer"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className={`relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl shadow-indigo-500/10 overflow-hidden transition-transform duration-300 ${closing ? 'scale-95' : 'scale-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:text-white hover:bg-slate-800 transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 text-center">
          {formStatus === 'success' ? (
            <>
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold text-white">You&apos;re in!</h3>
              <p className="mt-3 text-sm text-slate-400">We&apos;ll send your personalized AI audit within 24 hours.</p>
              <button onClick={dismiss} className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-colors">
                Got it
              </button>
            </>
          ) : (
            <>
              <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-500/15 flex items-center justify-center mb-5">
                <Gift className="h-7 w-7 text-indigo-400" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-bold text-white leading-tight">{headline}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{subtext}</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Work email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-colors disabled:opacity-60"
                >
                  {formStatus === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : ctaText}
                </button>
                {formStatus === 'error' && (
                  <p className="text-xs text-red-400 text-center">Something went wrong — try again.</p>
                )}
              </form>

              <div className="mt-5 flex items-center justify-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><Shield className="h-3 w-3" /> No spam</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> 30-min call</span>
              </div>

              <button onClick={dismiss} className="mt-4 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                No thanks, I&apos;ll keep doing it manually
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastMessage {
  city: string;
  action: string;
  timeAgo: string;
}

interface SocialProofToastProps {
  messages: ToastMessage[];
  /** Delay before first toast (ms) */
  initialDelay?: number;
  /** Interval between toasts (ms) */
  interval?: number;
}

/**
 * Fake-live social proof notifications — "Someone in Dallas just booked an audit"
 * Shows bottom-left toasts that slide in/out.
 */
export default function SocialProofToast({
  messages,
  initialDelay = 8000,
  interval = 25000,
}: SocialProofToastProps) {
  const [current, setCurrent] = useState<ToastMessage | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let idx = 0;
    let dismissed = false;
    try { dismissed = !!sessionStorage.getItem('_kraft_toast_off'); } catch {}
    if (dismissed) return;

    const showToast = () => {
      setCurrent(messages[idx % messages.length]);
      setVisible(true);
      idx++;
      // Auto-hide after 5s
      setTimeout(() => setVisible(false), 5000);
    };

    const firstTimer = setTimeout(showToast, initialDelay);
    const repeater = setInterval(showToast, interval);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(repeater);
    };
  }, [messages, initialDelay, interval]);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem('_kraft_toast_off', '1'); } catch {}
  };

  if (!current) return null;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-4 z-[100] max-w-xs transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
      }`}
    >
      <div className="rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-lg shadow-xl p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white leading-snug">
            Someone in <span className="font-semibold text-indigo-400">{current.city}</span> {current.action}
          </p>
          <p className="text-xs text-slate-500 mt-1">{current.timeAgo}</p>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 text-slate-600 hover:text-slate-400 text-xs"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

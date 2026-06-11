'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g. "3x", "65%", "< 30s", "$50K"
  label: string;
  className?: string;
}

/**
 * Animates a number from 0 to target when it scrolls into view.
 * Handles formats like "3x", "65%", "< 30s", "$125K", "2x", "340+"
 */
export default function AnimatedCounter({ value, label, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animateValue();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function animateValue() {
    // Extract numeric part
    const match = value.match(/(\d+(?:\.\d+)?)/);
    if (!match) { setDisplay(value); return; }

    const target = parseFloat(match[1]);
    const prefix = value.substring(0, match.index);
    const suffix = value.substring((match.index ?? 0) + match[0].length);
    const duration = 1200; // ms
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      // Format: keep decimals if target has them
      const formatted = target % 1 !== 0
        ? current.toFixed(1)
        : Math.round(current).toString();

      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value); // ensure exact final value
      }
    }
    requestAnimationFrame(tick);
  }

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <p className="text-3xl sm:text-4xl font-bold text-indigo-400 tabular-nums">{display}</p>
      <p className="mt-1 text-sm font-medium text-white">{label}</p>
    </div>
  );
}

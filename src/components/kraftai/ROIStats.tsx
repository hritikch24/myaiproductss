'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface ROIStatsProps {
  stats: Stat[];
}

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;

    // Extract numeric part and suffix (e.g., "95%" -> 95, "%")
    const match = value.match(/^([<>]?)(\d+(?:\.\d+)?)(.*)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isDecimal = match[2].includes('.');
    const duration = 1200;
    const startTime = Date.now();

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isDecimal) {
        setDisplay(`${prefix}${current.toFixed(1)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.round(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, inView]);

  return <>{display}</>;
}

export default function ROIStats({ stats }: ROIStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Key statistics">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-700/50 bg-slate-900 p-6 text-center transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
          >
            <p className="text-4xl font-bold text-indigo-400 sm:text-5xl">
              <AnimatedValue value={stat.value} inView={inView} />
            </p>
            <p className="mt-2 text-base font-semibold text-white">{stat.label}</p>
            <p className="mt-1 text-sm text-slate-400 leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

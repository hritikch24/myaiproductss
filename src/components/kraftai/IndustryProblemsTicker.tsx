'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface TickerItem {
  stat: string;
  text: string;
}

interface IndustryProblemsTickerProps {
  items: TickerItem[];
  /** Optional label like "Industry Reality" */
  label?: string;
}

/**
 * A horizontally scrolling ticker showing real industry pain-point stats.
 * Auto-scrolls continuously. Pauses on hover.
 */
export default function IndustryProblemsTicker({
  items,
  label = 'Industry Reality',
}: IndustryProblemsTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame: number;
    let pos = 0;
    const speed = 0.5; // px per frame

    const step = () => {
      if (!paused) {
        pos += speed;
        // Reset when first copy has scrolled out
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden bg-red-950/40 border-b border-red-500/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="marquee"
      aria-label={label}
    >
      {/* Left label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-red-950/90 via-red-950/80 to-transparent pl-4 pr-8">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-400">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </span>
      </div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-red-950/90 to-transparent" />

      {/* Scrolling track */}
      <div ref={trackRef} className="flex items-center whitespace-nowrap py-2.5 will-change-transform">
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 mx-8 shrink-0">
            <span className="text-sm font-bold text-red-400">{item.stat}</span>
            <span className="text-xs text-red-300/70">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

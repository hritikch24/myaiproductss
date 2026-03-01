"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-03-31T00:00:00+05:30");

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {blocks.map((block) => (
        <div
          key={block.label}
          className="flex flex-col items-center rounded-lg bg-white/10 px-3 py-2 backdrop-blur sm:px-5 sm:py-3"
        >
          <span className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="text-xs text-orange-200">{block.label}</span>
        </div>
      ))}
    </div>
  );
}

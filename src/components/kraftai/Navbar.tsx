'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  nicheName: string;
  nicheSlug: string;
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Metrics', href: '/kraftai-metrics' },
];

export default function Navbar({ nicheName, nicheSlug }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3"
        aria-label={`${nicheName} navigation`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="KraftAI home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Kraft<span className="text-indigo-400">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={scrollToCTA}
            className="ml-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={scrollToCTA}
              className="mt-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

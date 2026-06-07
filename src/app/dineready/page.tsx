'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// ── helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

const ACCENT = '#FF6B35';
const BG = '#0a0a0a';
const TEXT = '#f5f0eb';
const ACCENT_RGB = hexToRgb(ACCENT);
const TEXT_RGB = hexToRgb(TEXT);

// ── inline SVG icons ─────────────────────────────────────────────────────────

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={ACCENT} stroke={ACCENT} strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── main component ───────────────────────────────────────────────────────────

export default function DineReadyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', city: '' });
  const [heroEmail, setHeroEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, city: formData.city }),
      });
      setSubmittedName(formData.name);
      setSubmitted(true);
    } catch {
      // silent
    }
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroEmail) {
      setFormData((prev) => ({ ...prev, email: heroEmail }));
      const el = document.getElementById('waitlist');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── styles ──

  const sectionPadding: React.CSSProperties = {
    padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)',
    maxWidth: 1200,
    margin: '0 auto',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
  };

  const bodyFont: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
  };

  // ── render ──

  return (
    <>
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={{ background: BG, color: TEXT, minHeight: '100vh', ...bodyFont }}>
        {/* ──── NAV ──── */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: '16px clamp(20px, 5vw, 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: scrolled ? `rgba(${hexToRgb(BG)}, 0.85)` : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            transition: 'background 0.3s, backdrop-filter 0.3s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="15" fill="none" stroke={ACCENT} strokeWidth="2" />
              <circle cx="16" cy="16" r="6" fill={ACCENT} />
            </svg>
            <span style={{ ...headingStyle, fontSize: 22, letterSpacing: '-0.5px' }}>DineReady</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <Link
              href="/dineready/customer"
              style={{ color: `rgba(${TEXT_RGB}, 0.7)`, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
            >
              Customer App
            </Link>
            <Link
              href="/dineready/restaurant"
              style={{ color: `rgba(${TEXT_RGB}, 0.7)`, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
            >
              Restaurant Dashboard
            </Link>
            <a
              href="#waitlist"
              style={{
                background: ACCENT,
                color: '#fff',
                padding: '10px 22px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                transition: 'opacity 0.2s',
              }}
            >
              Get Early Access
            </a>
          </div>
        </nav>

        {/* ──── HERO ──── */}
        <section
          style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 'clamp(30px, 5vw, 60px)',
            ...sectionPadding,
            paddingTop: 'clamp(120px, 15vw, 180px)',
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: `rgba(${ACCENT_RGB}, 0.1)`,
                border: `1px solid rgba(${ACCENT_RGB}, 0.25)`,
                borderRadius: 100,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 500,
                color: ACCENT,
                marginBottom: 28,
              }}
            >
              <PinIcon />
              Launching across India
            </div>

            <h1
              style={{
                ...headingStyle,
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                margin: '0 0 24px',
              }}
            >
              Order on the way.
              <br />
              Eat the moment
              <br />
              <span style={{ color: ACCENT }}>you arrive.</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                color: `rgba(${TEXT_RGB}, 0.65)`,
                maxWidth: 480,
                margin: '0 0 36px',
              }}
            >
              Reserve a table, pick your meal while commuting — DineReady syncs your GPS with the
              kitchen so every dish lands the moment you sit down.
            </p>

            <form onSubmit={handleHeroSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420 }}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: 10,
                  border: `1px solid rgba(${TEXT_RGB}, 0.12)`,
                  background: `rgba(${TEXT_RGB}, 0.05)`,
                  color: TEXT,
                  fontSize: 15,
                  outline: 'none',
                  ...bodyFont,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 24px',
                  borderRadius: 10,
                  border: 'none',
                  background: ACCENT,
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  ...bodyFont,
                }}
              >
                Join <ArrowIcon />
              </button>
            </form>
          </div>

          {/* Right — Phone Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 280,
                background: '#0e0e0e',
                borderRadius: 32,
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '12px 16px 16px',
                boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`,
              }}
            >
              {/* Status bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 11,
                  color: `rgba(${TEXT_RGB}, 0.5)`,
                  marginBottom: 14,
                  padding: '0 4px',
                }}
              >
                <span style={{ fontWeight: 600 }}>9:41</span>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <rect x="0" y="6" width="3" height="4" rx="0.5" fill="rgba(255,255,255,0.5)" />
                    <rect x="4" y="4" width="3" height="6" rx="0.5" fill="rgba(255,255,255,0.5)" />
                    <rect x="8" y="2" width="3" height="8" rx="0.5" fill="rgba(255,255,255,0.5)" />
                    <rect x="12" y="0" width="2" height="10" rx="0.5" fill="rgba(255,255,255,0.3)" />
                  </svg>
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <rect x="0" y="0" width="18" height="10" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                    <rect x="2" y="2" width="12" height="6" rx="1" fill="#4ade80" />
                    <rect x="19" y="3" width="1.5" height="4" rx="0.5" fill="rgba(255,255,255,0.3)" />
                  </svg>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <PinIcon />
                <span style={{ fontSize: 13, fontWeight: 600 }}>Bengaluru</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Search */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: 16,
                }}
              >
                Search restaurants...
              </div>

              {/* Restaurant Card */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 12,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Meghana Foods</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Biryani &middot; Andhra</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: 'rgba(74,222,128,0.1)',
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#4ade80',
                    }}
                  >
                    <StarIcon />
                    4.4
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ClockIcon />
                    30-35 min
                  </span>
                  <span>5.1 km</span>
                </div>
              </div>

              {/* Cart Summary */}
              <div
                style={{
                  background: `rgba(${ACCENT_RGB}, 0.08)`,
                  border: `1px solid rgba(${ACCENT_RGB}, 0.2)`,
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 600, color: ACCENT, marginBottom: 8 }}>Your Order</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>Chicken Biryani</span>
                  <span style={{ fontWeight: 600 }}>&#8377;280</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                  <span>Raita</span>
                  <span style={{ fontWeight: 600 }}>&#8377;40</span>
                </div>
              </div>

              {/* ETA Pill */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                <div
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, #e05a2b)`,
                    borderRadius: 100,
                    padding: '8px 22px',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.05em',
                  }}
                >
                  12 MIN
                </div>
              </div>

              {/* Bottom Nav Strip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: 10,
                }}
              >
                {['Home', 'Search', 'Orders', 'Profile'].map((label) => (
                  <div key={label} style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textAlign: 'center' as const }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: label === 'Home' ? `rgba(${ACCENT_RGB}, 0.15)` : 'rgba(255,255,255,0.06)',
                        margin: '0 auto 4px',
                      }}
                    />
                    <span style={{ color: label === 'Home' ? ACCENT : undefined }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──── HOW IT WORKS ──── */}
        <section style={sectionPadding}>
          <h2
            style={{
              ...headingStyle,
              fontSize: 'clamp(28px, 4vw, 48px)',
              textAlign: 'center',
              marginBottom: 'clamp(40px, 6vw, 72px)',
              letterSpacing: '-0.02em',
            }}
          >
            How it works
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {[
              { num: '01', title: 'Book your table', desc: 'Choose your favourite restaurant and reserve a table for your arrival time.', highlighted: false },
              { num: '02', title: 'Order on the way', desc: 'Browse the menu and place your order while commuting. Our GPS sync starts tracking you.', highlighted: true },
              { num: '03', title: 'Walk in & eat', desc: 'Your food is ready the moment you sit down. No waiting, no cold dishes, just perfect timing.', highlighted: false },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  background: step.highlighted ? '#111' : `rgba(${TEXT_RGB}, 0.03)`,
                  borderRadius: 16,
                  padding: 'clamp(28px, 3vw, 40px)',
                  borderTop: step.highlighted ? `3px solid ${ACCENT}` : '3px solid transparent',
                  border: `1px solid rgba(${TEXT_RGB}, ${step.highlighted ? '0.1' : '0.06'})`,
                  borderTopColor: step.highlighted ? ACCENT : `rgba(${TEXT_RGB}, 0.06)`,
                  borderTopWidth: 3,
                  borderTopStyle: 'solid' as const,
                }}
              >
                <div
                  style={{
                    fontSize: 42,
                    fontWeight: 800,
                    color: step.highlighted ? ACCENT : `rgba(${TEXT_RGB}, 0.08)`,
                    ...headingStyle,
                    marginBottom: 16,
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ ...headingStyle, fontSize: 22, marginBottom: 12, margin: '0 0 12px' }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: `rgba(${TEXT_RGB}, 0.55)`, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ──── COMPARISON ──── */}
        <section style={sectionPadding}>
          <h2
            style={{
              ...headingStyle,
              fontSize: 'clamp(28px, 4vw, 48px)',
              textAlign: 'center',
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Why DineReady?
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: `rgba(${TEXT_RGB}, 0.5)`,
              fontSize: 16,
              marginBottom: 'clamp(40px, 6vw, 64px)',
            }}
          >
            See how we compare
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {[
              { name: 'OpenTable', features: [true, false, false, true], highlight: false },
              { name: 'DineReady', features: [true, true, true, true], highlight: true },
              { name: 'Swiggy / Zomato', features: [false, true, false, false], highlight: false },
            ].map((col) => (
              <div
                key={col.name}
                style={{
                  background: col.highlight ? '#111' : `rgba(${TEXT_RGB}, 0.03)`,
                  borderRadius: 16,
                  padding: 'clamp(24px, 3vw, 36px)',
                  border: col.highlight
                    ? `2px solid ${ACCENT}`
                    : `1px solid rgba(${TEXT_RGB}, 0.06)`,
                  position: 'relative',
                }}
              >
                {col.highlight && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: ACCENT,
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 14px',
                      borderRadius: 100,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Only DineReady
                  </div>
                )}
                <h3
                  style={{
                    ...headingStyle,
                    fontSize: 20,
                    marginBottom: 28,
                    textAlign: 'center',
                    color: col.highlight ? ACCENT : TEXT,
                    margin: '0 0 28px',
                  }}
                >
                  {col.name}
                </h3>
                {['Table reservation', 'Pre-order food', 'GPS kitchen sync', 'True dine-in'].map((feature, i) => (
                  <div
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 0',
                      borderBottom: i < 3 ? `1px solid rgba(${TEXT_RGB}, 0.06)` : 'none',
                      fontSize: 14,
                      color: `rgba(${TEXT_RGB}, 0.7)`,
                    }}
                  >
                    {col.features[i] ? <CheckIcon /> : <XIcon />}
                    {feature}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ──── WAITLIST ──── */}
        <section id="waitlist" style={sectionPadding}>
          <div
            style={{
              maxWidth: 520,
              margin: '0 auto',
              background: `rgba(${TEXT_RGB}, 0.03)`,
              border: `1px solid rgba(${TEXT_RGB}, 0.08)`,
              borderRadius: 20,
              padding: 'clamp(32px, 5vw, 56px)',
            }}
          >
            <h2
              style={{
                ...headingStyle,
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                textAlign: 'center',
                marginBottom: 8,
                letterSpacing: '-0.02em',
              }}
            >
              Join the Waitlist
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: `rgba(${TEXT_RGB}, 0.5)`,
                fontSize: 15,
                marginBottom: 36,
              }}
            >
              Be the first to experience DineReady in your city.
            </p>

            {submitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: 32,
                  background: `rgba(${ACCENT_RGB}, 0.08)`,
                  borderRadius: 14,
                  border: `1px solid rgba(${ACCENT_RGB}, 0.2)`,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>&#127881;</div>
                <h3 style={{ ...headingStyle, fontSize: 22, margin: '0 0 8px' }}>
                  You&apos;re on the list, {submittedName}!
                </h3>
                <p style={{ fontSize: 14, color: `rgba(${TEXT_RGB}, 0.6)`, margin: 0 }}>
                  We&apos;ll notify you when DineReady launches in your city.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 10,
                    border: `1px solid rgba(${TEXT_RGB}, 0.12)`,
                    background: `rgba(${TEXT_RGB}, 0.05)`,
                    color: TEXT,
                    fontSize: 15,
                    outline: 'none',
                    ...bodyFont,
                  }}
                />
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 10,
                    border: `1px solid rgba(${TEXT_RGB}, 0.12)`,
                    background: `rgba(${TEXT_RGB}, 0.05)`,
                    color: TEXT,
                    fontSize: 15,
                    outline: 'none',
                    ...bodyFont,
                  }}
                />
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 10,
                    border: `1px solid rgba(${TEXT_RGB}, 0.12)`,
                    background: `rgba(${TEXT_RGB}, 0.05)`,
                    color: formData.city ? TEXT : `rgba(${TEXT_RGB}, 0.4)`,
                    fontSize: 15,
                    outline: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    ...bodyFont,
                  }}
                >
                  <option value="" disabled>
                    Select your city
                  </option>
                  {['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Other'].map((c) => (
                    <option key={c} value={c} style={{ background: '#1a1a1a', color: TEXT }}>
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  style={{
                    padding: '16px',
                    borderRadius: 10,
                    border: 'none',
                    background: ACCENT,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: 8,
                    ...bodyFont,
                  }}
                >
                  Get Early Access
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ──── FOOTER ──── */}
        <footer
          style={{
            borderTop: `1px solid rgba(${TEXT_RGB}, 0.06)`,
            padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 80px)',
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 24,
              marginBottom: 32,
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="28" height="28" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" fill="none" stroke={ACCENT} strokeWidth="2" />
                <circle cx="16" cy="16" r="6" fill={ACCENT} />
              </svg>
              <span style={{ ...headingStyle, fontSize: 18 }}>DineReady</span>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {['Privacy', 'Terms', 'Contact', 'Blog'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: `rgba(${TEXT_RGB}, 0.45)`,
                    textDecoration: 'none',
                    fontSize: 14,
                    transition: 'color 0.2s',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 18 }}>
              {[
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{ color: `rgba(${TEXT_RGB}, 0.35)`, transition: 'color 0.2s' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              fontSize: 13,
              color: `rgba(${TEXT_RGB}, 0.3)`,
              gap: 8,
            }}
          >
            <span>&copy; 2025 DineReady Technologies Pvt. Ltd.</span>
            <span>Made with &hearts; in Bengaluru</span>
          </div>
        </footer>
      </div>
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Mail, Zap, Code2, Palette, Cpu, Database, Smartphone, Rocket } from 'lucide-react';

/**
 * KraftAI Enhanced Design
 * Combines Organic Loaders design with quotation-focused messaging
 * Features: Custom cursor, bento grid, particles, smooth animations
 */

export default function KraftAIEnhanced() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px';
        cursorDotRef.current.style.top = e.clientY + 'px';
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + 'px';
        cursorRingRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      icon: Code2,
      title: 'Websites',
      desc: 'Professional, conversion-focused web experiences',
      msg: 'Hi! Can you provide a quotation for a website? Here\'s what I need: [business type, features, timeline, budget]'
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      desc: 'iOS & Android apps with great UX',
      msg: 'Hi! I need a quotation for a mobile app. Requirements: [purpose, platforms, features, timeline]'
    },
    {
      icon: Database,
      title: 'Business Apps',
      desc: 'Custom tools for your workflow',
      msg: 'Hi! Can you quote for a custom business tool? Details: [current process, features, team size, budget]'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      desc: 'Beautiful, intuitive interfaces',
      msg: 'Hi! I need a quotation for UI/UX design. Project: [type, style, revisions, timeline & budget]'
    },
    {
      icon: Cpu,
      title: 'AI Solutions',
      desc: 'Smart automation & intelligence',
      msg: 'Hi! Can you quote for AI integration? What I need: [current system, capabilities, ROI, timeline]'
    },
    {
      icon: Rocket,
      title: 'E-Commerce',
      desc: 'Online stores that sell',
      msg: 'Hi! I need a quotation for an online store. Details: [products, features, sales target, launch date]'
    },
  ];

  return (
    <div className="bg-[#050508] text-[#f0f0f8] font-sans overflow-x-hidden" style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 rounded-full bg-[#00ffe0] pointer-events-none z-[99999]"
        style={{
          mixBlendMode: 'screen',
          transition: 'transform 0.08s, width 0.2s, height 0.2s',
        }}
      />
      <div
        ref={cursorRingRef}
        className="fixed w-9 h-9 border-[1.5px] border-[rgba(0,255,224,0.5)] rounded-full pointer-events-none z-[99998]"
        style={{
          transition: 'transform 0.18s ease-out, width 0.25s, height 0.25s',
        }}
      />

      {/* Noise Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-12 py-5">
        <Link href="/" className="font-mono text-base font-bold text-[#f0f0f8] hover:text-[#00ffe0] transition-colors">
          Kraft<span className="text-[#00ffe0]">AI</span>
        </Link>

        <div className="flex gap-10 hidden md:flex">
          <a href="#services" className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)] hover:text-[#f0f0f8] transition-colors">Services</a>
          <a href="#process" className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)] hover:text-[#f0f0f8] transition-colors">Process</a>
          <a href="#contact" className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)] hover:text-[#f0f0f8] transition-colors">Contact</a>
        </div>

        <a
          href="https://wa.me/918859820935?text=Hi! Can you provide a quotation? Please share your details..."
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-wider font-bold px-6 py-3 bg-[#00ffe0] text-black rounded-full hover:shadow-[0_0_32px_rgba(0,255,224,0.5)] hover:-translate-y-0.5 transition-all whitespace-nowrap"
        >
          Get Quote
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-start px-12 pt-24 pb-12">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block">
            <span className="font-mono text-xs uppercase tracking-wider text-[#00ffe0]">
              ✨ KraftAI — Custom Software & Quotations
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            You Think.<br />
            <span className="text-[#00ffe0]">We Quote.</span><br />
            You Decide.
          </h1>

          <p className="text-lg text-[rgba(240,240,248,0.42)] mb-8 max-w-2xl leading-relaxed">
            Get detailed quotations for websites, apps, stores, and custom solutions.
            Share your requirements and receive a comprehensive quote with exact costs and timelines.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="https://wa.me/918859820935?text=Hi! I need a quotation. Here are my details:%0A%0AProject Type: [what you need]%0AKey Features: [list them]%0ATimeline: [when needed]%0ABudget: [your range]%0A%0APlease provide a detailed quote."
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-bold px-6 py-3 bg-[#00ffe0] text-black rounded-lg hover:shadow-[0_0_32px_rgba(0,255,224,0.5)] hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Request Quotation
            </a>
            <a
              href="mailto:hritikchaudhary016@gmail.com?subject=Quotation Request&body=Hi!%0A%0AI'd like to get a quotation for my project.%0A%0AProject Details:%0AType:%0AFeatures:%0ATimeline:%0ABudget:%0A%0APlease provide a detailed quote."
              className="font-mono text-sm font-bold px-6 py-3 border border-[rgba(240,240,248,0.2)] text-[#f0f0f8] rounded-lg hover:border-[#00ffe0] hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Quote
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid - Bento Style */}
      <section id="services" className="relative px-12 py-24">
        <h2 className="text-4xl font-bold mb-16">Services & Solutions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <a
              key={i}
              href={`https://wa.me/918859820935?text=${encodeURIComponent(service.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bento-card relative p-8 rounded-2xl bg-[#0c0c14] border border-[rgba(240,240,248,0.1)] hover:border-[#00ffe0] transition-all hover:-translate-y-1 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,255,224,0.1), transparent 50%)',
                }}
              />

              <service.icon className="w-8 h-8 text-[#00ffe0] mb-4 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{service.title}</h3>
              <p className="text-sm text-[rgba(240,240,248,0.42)] relative z-10">{service.desc}</p>

              <div className="mt-6 flex items-center gap-2 text-[#00ffe0] opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                <span className="text-xs font-mono uppercase">Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative px-12 py-24">
        <h2 className="text-4xl font-bold mb-16">Our Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { num: '01', title: 'Share Details', desc: 'Tell us about your project' },
            { num: '02', title: 'Get Quotation', desc: 'Receive a detailed quote' },
            { num: '03', title: 'Discuss & Refine', desc: 'Clarify scope and timeline' },
            { num: '04', title: 'Build & Deploy', desc: 'We deliver your project' },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="font-mono text-5xl font-bold text-[#00ffe0] opacity-20 mb-4">{step.num}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-[rgba(240,240,248,0.42)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative px-12 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready for Your Quote?</h2>
        <p className="text-lg text-[rgba(240,240,248,0.42)] mb-8 max-w-2xl mx-auto">
          Get a detailed quotation with cost breakdown and timeline.
          Share your requirements and let's build something amazing.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://wa.me/918859820935?text=Hi! I'm ready for a quotation. Here are my project details:%0A%0AProject Type:%0AFeatures:%0ATimeline:%0ABudget:%0A%0APlease provide a detailed quote."
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-bold px-8 py-4 bg-[#00ffe0] text-black rounded-lg hover:shadow-[0_0_32px_rgba(0,255,224,0.5)] hover:-translate-y-1 transition-all"
          >
            Get Started on WhatsApp
          </a>
          <a
            href="mailto:hritikchaudhary016@gmail.com"
            className="font-mono text-sm font-bold px-8 py-4 border border-[#00ffe0] text-[#00ffe0] rounded-lg hover:-translate-y-1 transition-all"
          >
            Send Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[rgba(240,240,248,0.1)] px-12 py-12 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)]">
          © 2026 KraftAI. Get detailed quotes for your projects.
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)] mt-2">
          💬 WhatsApp: +91 8859 820935 | 📧 Email: hritikchaudhary016@gmail.com
        </p>
      </footer>
    </div>
  );
}

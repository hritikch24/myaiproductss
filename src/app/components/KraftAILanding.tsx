"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const WA = "918859820935";
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const NICHES = [
  "Makeup Artists", "Photographers", "Interior Designers",
  "Fitness Coaches", "Dietitians", "Event Planners",
  "Mehendi Artists", "Tutors", "Consultants", "Salons",
];

const PROBLEMS = [
  { stat: "76%", text: "of people Google a service provider before booking", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { stat: "0", text: "results show up when someone Googles your name right now", icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" },
  { stat: "63%", text: "of clients won't book if there's no website to check", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
  { stat: "24hr", text: "is how fast a competitor with a website steals your lead", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const GETS = [
  { title: "Portfolio Website", desc: "Stunning, mobile-first site that shows your best work — not an Instagram link tree, a real website.", icon: "M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.72.608 5.18 1.64" },
  { title: "Google Visibility", desc: "Show up when clients search your name or your service in your city. We handle all the SEO.", icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" },
  { title: "WhatsApp Booking", desc: "One-tap booking button. Client taps, you get a WhatsApp message. No forms, no emails. Done.", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
  { title: "Google Maps Setup", desc: "Your business on Google Maps with reviews, photos, hours — people find you before your competitor.", icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" },
  { title: "Bio Link Hub", desc: "One clean link for your Instagram bio that goes to your site — not Linktree, your own brand.", icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" },
  { title: "You Own Everything", desc: "Code, domain, hosting — all yours. No monthly lock-in. No vendor hostage. It is yours forever.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
];

const PROCESS = [
  { num: "01", title: "Send us your work", desc: "Share your best photos, services, pricing. WhatsApp is fine — no forms, no calls." },
  { num: "02", title: "We build a free mockup", desc: "Within 48 hours, you see a real preview. No payment needed yet." },
  { num: "03", title: "Love it? We go live.", desc: "Pay only if you love it. Live in 3-5 days. Google-indexed. Ready to book." },
];

const FAQ = [
  { q: "I already get clients from Instagram. Why do I need a website?", a: "Instagram is rented land — algorithm changes, account bans, and your reach drops. A website is YOUR property. Plus, 76% of clients Google you before booking. If they find nothing, they go to someone who has a site. You are losing clients you never even knew about." },
  { q: "₹9,999 is cheap. Is this legit?", a: "We use AI-assisted development to build 5x faster than a traditional agency. That is why we can charge ₹9,999 instead of ₹50,000. Same quality, fraction of the cost. And you see a free preview before paying a single rupee." },
  { q: "I'm not techy. How will I update my site?", a: "You WhatsApp us the change and we do it. New photos? Send on WhatsApp. Price update? Send on WhatsApp. It is that simple." },
  { q: "Can I see a demo before paying?", a: "Yes — we build a free mockup for you before you pay anything. If you don't like it, you owe us nothing. Zero risk." },
  { q: "What if I want to cancel later?", a: "There is nothing to cancel. It is a one-time payment. The website is yours forever. Optional maintenance at ₹1,999/month." },
  { q: "How is this different from Wix or a ₹500 freelancer?", a: "Wix sites all look the same and rank poorly on Google. A ₹500 freelancer will ghost you. We build custom, deploy fast, do your Google Business setup, and give you the source code." },
];

const FEATURES_LIST = [
  "Custom portfolio website (not a template)",
  "Mobile-optimized, loads in under 2 seconds",
  "Google Business profile setup",
  "WhatsApp booking integration",
  "Basic SEO — show up on Google",
  "Social links hub for Instagram bio",
  "100% code ownership — yours forever",
  "Live in 5-7 days",
];

/* ── Hooks ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function Reveal({ children, className = "", delay = 0, y = 32 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : `translateY(${y}px)`, transition: `all 0.8s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Animated Grid Background ── */
function GridBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />
      <div className="absolute top-[-40%] left-[-20%] w-[80%] h-[80%] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[70%] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />
    </div>
  );
}

/* ── Floating Particles ── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf = 0;
    const dots: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const resize = () => { c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 40; i++) {
      dots.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 0.5, a: Math.random() * 0.3 + 0.1 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = c.width; if (d.x > c.width) d.x = 0;
        if (d.y < 0) d.y = c.height; if (d.y > c.height) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,50,${d.a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── WhatsApp SVG ── */
const WaSvg = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.632-1.467A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.171 0-4.19-.614-5.913-1.677l-.424-.253-2.746.87.882-2.673-.278-.44A9.723 9.723 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" /></svg>
);

/* ═══════════════════════════════════════════════════════════ */
export default function KraftAILanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [nicheIdx, setNicheIdx] = useState(0);
  const [nicheAnim, setNicheAnim] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setInterval(() => {
      setNicheAnim(false);
      setTimeout(() => { setNicheIdx(i => (i + 1) % NICHES.length); setNicheAnim(true); }, 300);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div className="min-h-screen bg-[#060608] text-white antialiased overflow-x-hidden" onMouseMove={handleMouse}>

      <style jsx global>{`
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes glow-pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes shine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes border-rotate { 0% { --angle: 0deg; } 100% { --angle: 360deg; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes counter-up { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        .gradient-text {
          background: linear-gradient(135deg, #ff6b00, #ff9500, #ffb800, #ff6b00);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shine 4s ease-in-out infinite;
        }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
        .glass-hover:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,140,50,0.15); box-shadow: 0 0 30px rgba(255,107,0,0.05); }
        .glow-border { position: relative; }
        .glow-border::before {
          content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(135deg, rgba(255,107,0,0.3), rgba(139,92,246,0.2), rgba(255,107,0,0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
        }
        .stat-glow { text-shadow: 0 0 40px rgba(255,107,0,0.3); }
        .line-glow { background: linear-gradient(90deg, transparent, rgba(255,107,0,0.2), transparent); height: 1px; }
        .pricing-glow::before {
          content: ''; position: absolute; inset: -2px; border-radius: 20px; padding: 2px;
          background: conic-gradient(from var(--angle, 0deg), #ff6b00, #8b5cf6, #06b6d4, #ff6b00);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          animation: border-rotate 4s linear infinite;
        }
        @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
      `}</style>

      {/* ═══ Nav ═══ */}
      <nav className="sticky top-0 z-50 bg-[#060608]/70 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
          <a href="#" className="text-lg font-black tracking-tight">
            Kraft<span className="gradient-text">AI</span>
          </a>
          <div className="hidden sm:flex items-center gap-8 text-[13px] text-white/30 font-medium">
            <a href="#problem" className="hover:text-white/80 transition-colors duration-300">Why</a>
            <a href="#gets" className="hover:text-white/80 transition-colors duration-300">What You Get</a>
            <a href="#pricing" className="hover:text-white/80 transition-colors duration-300">Pricing</a>
            <a href="#faq" className="hover:text-white/80 transition-colors duration-300">FAQ</a>
          </div>
          <a href={wa("Hi, I want a website for my business")} target="_blank" rel="noopener"
            className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#2ae672] text-white text-[12px] font-bold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]">
            <WaSvg className="h-3.5 w-3.5" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </nav>

      {/* ═══ Hero ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-5 overflow-hidden">
        <GridBg />
        <Particles />

        {/* cursor-follow glow */}
        <div className="pointer-events-none fixed w-[500px] h-[500px] rounded-full opacity-[0.04] transition-all duration-1000 ease-out"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)", left: mousePos.x - 250, top: mousePos.y - 250 }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
              <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[11px] font-semibold text-white/50 tracking-wide uppercase">Free mockup &middot; Pay only if you love it</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05]">
              Your clients are
              <br />
              <span className="gradient-text">Googling you.</span>
              <br />
              <span className="text-white/15">They&apos;re finding nothing.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-[16px] sm:text-[18px] text-white/30 max-w-xl mx-auto leading-relaxed">
              We build stunning websites for{" "}
              <span className="inline-block min-w-[160px] text-left">
                <span className="gradient-text font-bold transition-all duration-300" style={{ opacity: nicheAnim ? 1 : 0, transform: nicheAnim ? "none" : "translateY(-8px)" }}>
                  {NICHES[nicheIdx]}
                </span>
              </span>
              <br className="sm:hidden" />
              that turn Google searches into booked clients.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a href={wa("Hi! I'm interested in getting a website for my business. Can I see a free mockup?")} target="_blank" rel="noopener"
                className="group w-full sm:w-auto relative bg-gradient-to-r from-[#ff6b00] to-[#ff9500] text-white text-[15px] font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.25)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5">
                Get your free mockup
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current transition-transform group-hover:translate-x-1"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
              </a>
              <a href="#demos" className="text-[13px] font-semibold text-white/20 hover:text-white/50 transition-colors duration-300 flex items-center gap-1.5">
                See demo sites
                <svg className="h-3.5 w-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-6 text-[11px] text-white/10 tracking-wide">No payment needed. Preview in 48 hours. Zero risk.</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ Marquee Trust Bar ═══ */}
      <div className="relative border-y border-white/[0.04] bg-white/[0.01] overflow-hidden py-4">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          {[...Array(2)].map((_, ri) => (
            <div key={ri} className="flex items-center gap-8 mr-8">
              {["Custom-built, not templates", "Delivered in 5-7 days", "100% code ownership", "₹9,999 one-time", "Free mockup first", "WhatsApp booking", "Google Maps setup", "No monthly lock-in"].map((t, i) => (
                <span key={i} className="flex items-center gap-3 text-[12px] text-white/20 font-medium">
                  <span className="h-1 w-1 rounded-full bg-[#ff6b00]/40" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Problem ═══ */}
      <section id="problem" className="relative py-24 sm:py-32 px-5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <Reveal>
            <p className="text-[11px] font-bold text-[#ff6b00] uppercase tracking-[0.2em] mb-4">The problem</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-tight max-w-2xl">
              Instagram alone is
              <br />
              <span className="text-white/15">not enough anymore.</span>
            </h2>
            <p className="text-[15px] text-white/25 mt-4 max-w-lg leading-relaxed">
              You are great at what you do. But when a client Googles &quot;makeup artist near me&quot; — you don&apos;t exist. That client books someone who does.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {PROBLEMS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass glass-hover rounded-2xl p-6 transition-all duration-500 group h-full">
                  <div className="h-10 w-10 rounded-xl bg-[#ff6b00]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff6b00]/20 transition-colors">
                    <svg className="h-5 w-5 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                  </div>
                  <div className="text-3xl font-black gradient-text stat-glow tracking-tight">{p.stat}</div>
                  <p className="text-[12px] text-white/30 mt-2 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ═══ Demos ═══ */}
      <section id="demos" className="relative py-24 sm:py-32 px-5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-[#ff6b00] uppercase tracking-[0.2em] mb-4">Live demos</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em]">This is what we build.</h2>
            <p className="text-[14px] text-white/20 mt-2">Real sites. Click to explore.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {[
              { href: "/demo", emoji: "🍽", gradient: "from-amber-500/10 to-orange-600/10", title: "Restaurant Demo", desc: "Full menu, ordering, gallery, reviews — everything a food business needs." },
              { href: "/demo/airbnb", emoji: "🏠", gradient: "from-violet-500/10 to-cyan-500/10", title: "Airbnb / Stay Demo", desc: "Booking widget, gallery, reviews, experiences — futuristic hospitality site." },
            ].map((d, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <a href={d.href} className="group block glass glass-hover rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]">
                  <div className={`h-48 bg-gradient-to-br ${d.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-5xl transition-transform duration-500 group-hover:scale-110" style={{ animation: "float 4s ease-in-out infinite" }}>{d.emoji}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060608] to-transparent opacity-50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[15px] font-bold group-hover:text-[#ff9500] transition-colors duration-300">{d.title}</h3>
                    <p className="text-[12px] text-white/25 mt-1.5 leading-relaxed">{d.desc}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-semibold text-[#ff6b00] group-hover:gap-2.5 transition-all duration-300">
                      View live site
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ═══ What You Get ═══ */}
      <section id="gets" className="relative py-24 sm:py-32 px-5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <Reveal>
            <p className="text-[11px] font-bold text-[#ff6b00] uppercase tracking-[0.2em] mb-4">What you get</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em]">
              Not just a website.
              <br />
              <span className="gradient-text">A client machine.</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
            {GETS.map((g, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="glass glass-hover rounded-2xl p-6 h-full transition-all duration-500 group">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4 group-hover:bg-[#ff6b00]/10 transition-colors duration-500">
                    <svg className="h-5 w-5 text-white/30 group-hover:text-[#ff6b00] transition-colors duration-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={g.icon} /></svg>
                  </div>
                  <h3 className="text-[14px] font-bold">{g.title}</h3>
                  <p className="text-[12px] text-white/25 mt-2 leading-relaxed">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ═══ Pricing ═══ */}
      <section id="pricing" className="relative py-24 sm:py-32 px-5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <Reveal>
            <p className="text-[11px] font-bold text-[#ff6b00] uppercase tracking-[0.2em] mb-4">Simple pricing</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em]">One price. No surprises.</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 relative pricing-glow rounded-[20px]">
              <div className="bg-[#0a0a0f] rounded-[20px] p-8 sm:p-10 text-left relative overflow-hidden">
                {/* inner ambient */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} />

                <div className="relative">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black gradient-text tracking-tight">₹9,999</span>
                    <span className="text-[14px] text-white/20 font-medium">one-time</span>
                  </div>
                  <p className="text-[13px] text-white/25 mt-2">Everything you need to go from invisible on Google to fully booked.</p>

                  <div className="mt-8 space-y-3">
                    {FEATURES_LIST.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-[13px] text-white/40">
                        <div className="h-5 w-5 rounded-full bg-[#ff6b00]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="h-3 w-3 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/[0.04]">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-[11px] text-white/15 uppercase tracking-wider font-semibold">Optional</span>
                      <span className="text-[16px] font-bold">₹1,999<span className="text-white/20 font-medium">/month</span></span>
                    </div>
                    <p className="text-[11px] text-white/15 mt-1">Updates, changes, hosting, support. Cancel anytime.</p>
                  </div>

                  <a href={wa("Hi! I want a website. Here's what I do: ")} target="_blank" rel="noopener"
                    className="mt-8 w-full bg-gradient-to-r from-[#ff6b00] to-[#ff9500] hover:from-[#ff7b20] hover:to-[#ffa520] text-white text-[15px] font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.2)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5">
                    Start with a free mockup
                    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                  </a>
                  <p className="text-[11px] text-white/10 mt-3 text-center">No payment until you see your mockup and love it.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ═══ Process ═══ */}
      <section className="relative py-24 sm:py-32 px-5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-[#ff6b00] uppercase tracking-[0.2em] mb-4">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em]">3 steps. Zero headache.</h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6 mt-14">
            {PROCESS.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass glass-hover rounded-2xl p-6 transition-all duration-500 h-full relative group">
                  <div className="text-[48px] font-black gradient-text opacity-20 leading-none">{s.num}</div>
                  <h3 className="text-[15px] font-bold mt-2">{s.title}</h3>
                  <p className="text-[12px] text-white/25 mt-2 leading-relaxed">{s.desc}</p>
                  {i < 2 && (
                    <div className="hidden sm:block absolute top-1/2 -right-3 text-white/10">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ═══ Who is this for ═══ */}
      <section className="relative py-24 sm:py-28 px-5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-[#ff6b00] uppercase tracking-[0.2em] mb-4">Perfect for</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] max-w-2xl leading-tight">
              Service providers who get clients from Instagram —
              <span className="text-white/15"> but want more.</span>
            </h2>
          </Reveal>

          <div className="flex flex-wrap gap-3 mt-10">
            {NICHES.map((n, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <span className="inline-block glass glass-hover text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-500 cursor-default hover:text-[#ff9500]">{n}</span>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <span className="inline-block text-white/10 text-[13px] font-semibold px-5 py-2.5 rounded-xl border border-white/[0.03]">+ any service business</span>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="relative py-24 sm:py-32 px-5">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-[#ff6b00] uppercase tracking-[0.2em] mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.03em] mb-10">Questions you probably have.</h2>
          </Reveal>

          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="glass rounded-2xl overflow-hidden transition-all duration-500" style={{ borderColor: openFaq === i ? "rgba(255,107,0,0.15)" : undefined }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group">
                    <span className="text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors duration-300">{f.q}</span>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? "bg-[#ff6b00]/20 rotate-180" : "bg-white/[0.04]"}`}>
                      <svg className={`h-3 w-3 ${openFaq === i ? "text-[#ff6b00]" : "text-white/20"}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </button>
                  <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: openFaq === i ? "300px" : "0", opacity: openFaq === i ? 1 : 0 }}>
                    <div className="px-6 pb-5 text-[13px] text-white/25 leading-relaxed border-t border-white/[0.03] pt-4">
                      {f.a}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="relative py-24 sm:py-32 px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(255,107,0,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em]">
              Ready to stop
              <br />
              <span className="gradient-text">being invisible?</span>
            </h2>
            <p className="text-[15px] text-white/20 mt-4 max-w-md mx-auto leading-relaxed">
              Send us a WhatsApp. Tell us what you do. Free mockup of your website within 48 hours.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <a href={wa("Hi! I want a website for my business. Here's what I do: ")} target="_blank" rel="noopener"
              className="inline-flex items-center gap-3 mt-10 bg-[#25D366] hover:bg-[#2ae672] text-white text-[16px] font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(37,211,102,0.2)] hover:scale-[1.02] active:scale-[0.98]">
              <WaSvg className="h-5 w-5" />
              WhatsApp us now
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[11px] text-white/10 mt-6 tracking-wide">hey@kraftai.in &middot; +91 8859820935</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-white/[0.04] py-8 px-5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/10">
          <span>&copy; 2026 KraftAI</span>
          <span>Built by humans + AI. Owned by you.</span>
        </div>
      </footer>

      {/* ═══ WhatsApp Float (mobile) ═══ */}
      <a href={wa("Hi, I want a website for my business")} target="_blank" rel="noopener"
        className="fixed bottom-5 right-5 z-40 h-14 w-14 bg-[#25D366] hover:bg-[#2ae672] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.3)] hover:scale-110 transition-all duration-300 sm:hidden">
        <WaSvg className="h-6 w-6" />
      </a>
    </div>
  );
}

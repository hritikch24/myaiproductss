"use client";

import { useState, useEffect, useRef } from "react";

const WA = "918859820935";
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const NICHES = [
  "Makeup Artists", "Photographers", "Interior Designers",
  "Fitness Coaches", "Dietitians", "Event Planners",
  "Mehendi Artists", "Tutors", "Consultants", "Salons",
];

const PROBLEMS = [
  { stat: "76%", text: "of people Google a service provider before booking", src: "Google" },
  { stat: "0", text: "results show up when someone Googles your name", src: "right now" },
  { stat: "63%", text: "of clients won't book if there's no website", src: "Stanford Web Credibility" },
  { stat: "24hr", text: "is how fast a competitor with a site steals your lead", src: "Google Local" },
];

const GETS = [
  { title: "Portfolio Website", desc: "Stunning, mobile-first site that shows your best work — not an Instagram link tree, a real website." },
  { title: "Google Visibility", desc: "Show up when clients search your name or your service in your city. We handle all the SEO basics." },
  { title: "WhatsApp Booking", desc: "One-tap booking button. No forms, no emails. Client taps, you get a WhatsApp message. Done." },
  { title: "Google Business Setup", desc: "Your business on Google Maps with reviews, photos, hours — so people find you before your competitor." },
  { title: "Social Links Hub", desc: "One clean link for your Instagram bio that goes to your site — not Linktree, your own brand." },
  { title: "Lifetime Ownership", desc: "You own everything. Code, domain, hosting access. No monthly lock-in to us. It is yours." },
];

const PROCESS = [
  { num: "01", title: "You send us your work", desc: "Share your best photos, your services, your pricing. WhatsApp is fine — no forms." },
  { num: "02", title: "We build a free mockup", desc: "Within 48 hours, you see a real preview of your website. No payment needed yet." },
  { num: "03", title: "Love it? We go live.", desc: "Pay only if you like it. We deploy in 3-5 days. Your site is live, Google-indexed, ready." },
];

const FAQ = [
  { q: "I already get clients from Instagram. Why do I need a website?", a: "Instagram is rented land — algorithm changes, account bans, and your reach drops. A website is YOUR property. Plus, 76% of clients Google you before booking. If they find nothing, they go to someone who has a site. You are losing clients you never even knew about." },
  { q: "₹9,999 is cheap. Is this legit?", a: "We use AI-assisted development to build 5x faster than a traditional agency. That is why we can charge ₹9,999 instead of ₹50,000. Same quality, fraction of the cost. And you see a free preview before paying a single rupee." },
  { q: "I'm not techy. How will I update my site?", a: "You WhatsApp us the change and we do it. New photos? Send on WhatsApp. Price update? Send on WhatsApp. It is that simple. Or if you want to do it yourself, we set up a simple dashboard." },
  { q: "Can I see a demo before paying?", a: "Yes — we build a free mockup for you before you pay anything. If you don't like it, you owe us nothing. Zero risk." },
  { q: "What if I want to cancel later?", a: "There is nothing to cancel. It is a one-time payment. The website is yours forever. If you want us to maintain it monthly, that is optional at ₹1,999/month." },
  { q: "How is this different from Wix or a ₹500 freelancer?", a: "Wix sites all look the same and rank poorly on Google. A ₹500 freelancer will ghost you after 3 days. We build custom, deploy on fast hosting, do your Google Business setup, and give you the source code. Big difference." },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: `all 0.7s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

export default function KraftAILanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [nicheIdx, setNicheIdx] = useState(0);

  // Rotate niches
  useEffect(() => {
    const t = setInterval(() => setNicheIdx(i => (i + 1) % NICHES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] antialiased">

      <style jsx global>{`
        @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes slideWord { 0%,20% { opacity:1; transform: translateY(0); } 25%,100% { opacity:0; transform: translateY(-20px); } }
      `}</style>

      {/* ═══ Nav ═══ */}
      <nav className="sticky top-0 z-50 bg-[#fafaf9]/80 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-14">
          <a href="#" className="text-[15px] font-extrabold tracking-tight">Kraft<span className="text-orange-600">AI</span></a>
          <div className="hidden sm:flex items-center gap-6 text-[12.5px] text-black/40 font-medium">
            <a href="#problem" className="hover:text-black transition-colors">Why</a>
            <a href="#gets" className="hover:text-black transition-colors">What You Get</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </div>
          <a href={wa("Hi, I want a website for my business")} target="_blank" rel="noopener" className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.632-1.467A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.171 0-4.19-.614-5.913-1.677l-.424-.253-2.746.87.882-2.673-.278-.44A9.723 9.723 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
            WhatsApp Us
          </a>
        </div>
      </nav>

      {/* ═══ Hero ═══ */}
      <section className="pt-16 sm:pt-24 pb-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/60 rounded-full px-3.5 py-1 text-[11px] font-semibold text-orange-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            Free mockup — pay only if you love it
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] leading-[1.1] text-[#111]">
            Your clients are Googling you.
            <br />
            <span className="text-black/25">They&apos;re finding nothing.</span>
          </h1>

          <p className="mt-5 text-[15px] sm:text-[17px] text-black/40 max-w-xl mx-auto leading-relaxed">
            We build stunning websites for{" "}
            <span className="text-orange-600 font-semibold inline-block min-w-[140px] text-left">
              {NICHES[nicheIdx]}
            </span>{" "}
            that turn Google searches into booked clients. In 5 days. For ₹9,999.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <a href={wa("Hi! I'm interested in getting a website for my business. Can I see a free mockup?")} target="_blank" rel="noopener"
              className="w-full sm:w-auto bg-[#111] hover:bg-[#222] text-white text-[14px] font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
              Get your free mockup
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
            </a>
            <a href="#demos" className="text-[13px] font-semibold text-black/30 hover:text-black/60 transition-colors">
              See demo sites &darr;
            </a>
          </div>

          <p className="mt-5 text-[11px] text-black/20">No payment needed. We send you a preview in 48 hours.</p>
        </div>
      </section>

      {/* ═══ Social Proof Bar ═══ */}
      <div className="border-y border-black/[0.04] bg-white/50">
        <div className="max-w-4xl mx-auto px-5 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] text-black/30 font-medium">
          <span>Custom-built, not templates</span>
          <span className="text-black/10">|</span>
          <span>Delivered in 5-7 days</span>
          <span className="text-black/10">|</span>
          <span>100% code ownership</span>
          <span className="text-black/10">|</span>
          <span>₹9,999 one-time</span>
          <span className="text-black/10">|</span>
          <span>Free mockup first</span>
        </div>
      </div>

      {/* ═══ Problem ═══ */}
      <section id="problem" className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-3">The problem</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em] leading-tight">
              Instagram alone is not enough anymore.
            </h2>
            <p className="text-[14px] text-black/35 mt-3 max-w-lg">
              You are great at what you do. But when a potential client Googles your name or searches &quot;{NICHES[0].toLowerCase()} near me&quot; — you don&apos;t exist. That client goes to someone who does.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {PROBLEMS.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-white rounded-xl p-5 border border-black/[0.04] hover:border-orange-200 transition-colors">
                  <div className="text-3xl font-black text-orange-600 tracking-tight">{p.stat}</div>
                  <p className="text-[12px] text-black/50 mt-2 leading-relaxed">{p.text}</p>
                  <p className="text-[10px] text-black/20 mt-2">Source: {p.src}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Demos ═══ */}
      <section id="demos" className="py-16 sm:py-20 px-5 bg-white border-y border-black/[0.04]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-3">Live demos</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em]">This is what we build.</h2>
            <p className="text-[14px] text-black/35 mt-2">Real sites, not Canva mockups. Click to explore.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <Reveal delay={0.05}>
              <a href="/demo" className="group block bg-[#fafaf9] rounded-xl border border-black/[0.04] overflow-hidden hover:border-orange-200 transition-all hover:shadow-lg hover:shadow-orange-500/5">
                <div className="h-44 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <span className="text-4xl">🍽</span>
                </div>
                <div className="p-5">
                  <h3 className="text-[14px] font-bold group-hover:text-orange-600 transition-colors">Restaurant Demo</h3>
                  <p className="text-[12px] text-black/35 mt-1">Full menu, ordering, gallery, reviews — everything a food business needs.</p>
                  <span className="inline-block mt-3 text-[11px] font-semibold text-orange-600">View live site &rarr;</span>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a href="/demo/airbnb" className="group block bg-[#fafaf9] rounded-xl border border-black/[0.04] overflow-hidden hover:border-orange-200 transition-all hover:shadow-lg hover:shadow-orange-500/5">
                <div className="h-44 bg-gradient-to-br from-violet-100 to-sky-100 flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                <div className="p-5">
                  <h3 className="text-[14px] font-bold group-hover:text-orange-600 transition-colors">Airbnb / Stay Demo</h3>
                  <p className="text-[12px] text-black/35 mt-1">Booking widget, gallery, reviews, experiences — futuristic hospitality site.</p>
                  <span className="inline-block mt-3 text-[11px] font-semibold text-orange-600">View live site &rarr;</span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ What You Get ═══ */}
      <section id="gets" className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-3">What you get</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em]">Not just a website. A client machine.</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {GETS.map((g, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-5 border border-black/[0.04] h-full">
                  <h3 className="text-[13px] font-bold">{g.title}</h3>
                  <p className="text-[12px] text-black/40 mt-2 leading-relaxed">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Pricing ═══ */}
      <section id="pricing" className="py-16 sm:py-24 px-5 bg-white border-y border-black/[0.04]">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-3">Simple pricing</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em]">One price. No surprises.</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 bg-[#fafaf9] rounded-2xl border border-black/[0.06] p-8 text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black">₹9,999</span>
                <span className="text-[14px] text-black/30 font-medium">one-time</span>
              </div>
              <p className="text-[13px] text-black/35 mt-2">Everything you need to go from invisible on Google to fully booked.</p>

              <div className="mt-6 space-y-2.5">
                {["Custom portfolio website (not a template)", "Mobile-optimized, loads in under 2 seconds", "Google Business profile setup", "WhatsApp booking integration", "Basic SEO — show up on Google", "Social links hub for your Instagram bio", "100% code ownership — it is yours forever", "Live in 5-7 days"].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[12.5px] text-black/50">
                    <svg className="h-4 w-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-black/[0.04]">
                <p className="text-[11px] text-black/25 mb-1">Optional add-on</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[15px] font-bold">₹1,999/month</span>
                  <span className="text-[12px] text-black/30">— updates, changes, hosting, support. Cancel anytime.</span>
                </div>
              </div>

              <a href={wa("Hi! I want a website. Here's what I do: ")} target="_blank" rel="noopener"
                className="mt-6 w-full bg-[#111] hover:bg-[#222] text-white text-[14px] font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2">
                Start with a free mockup
                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
              </a>
              <p className="text-[11px] text-black/20 mt-3 text-center">No payment until you see your mockup and love it.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Process ═══ */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-3">How it works</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em]">3 steps. Zero headache.</h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {PROCESS.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div>
                  <div className="text-[32px] font-black text-black/[0.06]">{s.num}</div>
                  <h3 className="text-[14px] font-bold mt-1">{s.title}</h3>
                  <p className="text-[12px] text-black/40 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Who is this for ═══ */}
      <section className="py-16 sm:py-20 px-5 bg-white border-y border-black/[0.04]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-3">Perfect for</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em] mb-8">Service providers who get clients from Instagram — but want more.</h2>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {NICHES.map((n, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <span className="inline-block bg-orange-50 border border-orange-100 text-orange-700 text-[12px] font-semibold px-3.5 py-1.5 rounded-lg">{n}</span>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <span className="inline-block bg-black/[0.03] text-black/30 text-[12px] font-semibold px-3.5 py-1.5 rounded-lg">+ any service business</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-16 sm:py-24 px-5">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em] mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em] mb-8">Questions you probably have.</h2>
          </Reveal>

          <div className="space-y-2">
            {FAQ.map((f, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="border border-black/[0.04] rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between gap-4">
                    <span className="text-[13px] font-semibold">{f.q}</span>
                    <svg className={`h-4 w-4 text-black/20 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-[12.5px] text-black/40 leading-relaxed border-t border-black/[0.03] pt-3">
                      {f.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-16 sm:py-24 px-5 bg-[#111] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.02em]">Ready to stop being invisible?</h2>
          <p className="text-[14px] text-white/40 mt-3 max-w-md mx-auto">Send us a WhatsApp. Tell us what you do. We will send you a free mockup of your website within 48 hours.</p>

          <a href={wa("Hi! I want a website for my business. Here's what I do: ")} target="_blank" rel="noopener"
            className="inline-flex items-center gap-2.5 mt-8 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[15px] font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.632-1.467A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.171 0-4.19-.614-5.913-1.677l-.424-.253-2.746.87.882-2.673-.278-.44A9.723 9.723 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
            WhatsApp us now
          </a>

          <p className="text-[11px] text-white/15 mt-4">hey@kraftai.in · +91 8859820935</p>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-black/[0.04] py-6 px-5">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] text-black/25">
          <span>&copy; 2026 KraftAI</span>
          <span>Built by humans + AI. Owned by you.</span>
        </div>
      </footer>

      {/* ═══ WhatsApp Float ═══ */}
      <a href={wa("Hi, I want a website for my business")} target="_blank" rel="noopener"
        className="fixed bottom-5 right-5 z-40 h-14 w-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 hover:scale-110 transition-all sm:hidden">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.632-1.467A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.171 0-4.19-.614-5.913-1.677l-.424-.253-2.746.87.882-2.673-.278-.44A9.723 9.723 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
      </a>
    </div>
  );
}

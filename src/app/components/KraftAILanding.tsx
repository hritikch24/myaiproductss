"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import KraftAITracker, { trackEvent } from "./KraftAITracker";
import KraftAIChatbot from "./KraftAIChatbot";

const WA_NUM = "918859820935";
const WA_BASE = `https://wa.me/${WA_NUM}?text=`;
const waLink = (msg: string) => `${WA_BASE}${encodeURIComponent(msg)}`;

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Pricing data for instant quote
const pricingTiers = [
  {
    id: "landing",
    name: "Landing Page",
    desc: "Single page, conversion-optimized",
    price: 499,
    delivery: "5-7 days",
    features: ["Responsive design", "SEO optimized", "Contact form", "Analytics setup", "1 round of revisions"],
    popular: false,
  },
  {
    id: "business",
    name: "Business Website",
    desc: "Multi-page professional site",
    price: 1499,
    delivery: "2-3 weeks",
    features: ["Up to 8 pages", "CMS integration", "SEO & analytics", "Blog setup", "2 rounds of revisions", "Speed optimized"],
    popular: true,
  },
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    desc: "Full online store with payments",
    price: 2999,
    delivery: "3-5 weeks",
    features: ["Product catalog", "Payment gateway", "Order management", "Inventory tracking", "Customer accounts", "Admin dashboard"],
    popular: false,
  },
  {
    id: "webapp",
    name: "Web Application",
    desc: "Custom SaaS or internal tool",
    price: 4999,
    delivery: "4-8 weeks",
    features: ["Custom architecture", "User auth & roles", "API integrations", "Real-time features", "Admin panel", "Deployment & CI/CD"],
    popular: false,
  },
];

const addOns = [
  { id: "ai", name: "AI Integration", price: 800, desc: "Chatbot, content gen, or custom AI" },
  { id: "mobile", name: "Mobile App", price: 2500, desc: "iOS + Android companion app" },
  { id: "design", name: "Premium Design", price: 600, desc: "Custom illustrations & animations" },
  { id: "maintenance", name: "6-Month Maintenance", price: 499, desc: "Updates, fixes, monitoring" },
];

const portfolio = [
  { name: "E-Commerce Platform", category: "E-Commerce", tech: "Next.js, Stripe, PostgreSQL", result: "3x conversion rate increase" },
  { name: "AI Customer Support", category: "AI Solution", tech: "React, OpenAI, Node.js", result: "80% tickets auto-resolved" },
  { name: "SaaS Dashboard", category: "Web App", tech: "React, TypeScript, AWS", result: "10,000+ daily active users" },
  { name: "Restaurant Chain App", category: "Mobile App", tech: "Flutter, Firebase", result: "50K+ downloads in 3 months" },
  { name: "Real Estate Platform", category: "Web App", tech: "Next.js, Supabase, Maps", result: "2,000+ listings managed" },
  { name: "HealthTech Portal", category: "Web App", tech: "React, HIPAA-compliant", result: "15 clinics onboarded" },
];

const testimonials = [
  { name: "Alex Morrison", role: "Founder, TechStart", text: "KraftAI delivered our MVP in 3 weeks. The quality was exceptional — our investors were blown away during the demo. Best money we ever spent.", rating: 5 },
  { name: "Sarah Chen", role: "CEO, GreenLeaf", text: "We switched from a $15K agency to KraftAI. Got better results at a fraction of the cost. The team communicates directly — no middlemen, no BS.", rating: 5 },
  { name: "Michael Rodriguez", role: "CTO, DataFlow", text: "The AI integration they built saved us 40 hours/week in manual processing. ROI was positive within the first month. Incredibly sharp team.", rating: 5 },
  { name: "Priya Sharma", role: "Dir. of Ops, FastShip", text: "Our e-commerce store went from idea to live in 4 weeks with KraftAI. Revenue hit $50K in the first quarter. Their work speaks for itself.", rating: 5 },
];

const techPills = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#68a063" },
  { name: "Python", color: "#ffd43b" },
  { name: "Flutter", color: "#02569b" },
  { name: "React Native", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "AWS", color: "#ff9900" },
  { name: "Docker", color: "#2496ed" },
  { name: "OpenAI", color: "#00a67e" },
  { name: "Stripe", color: "#635bff" },
  { name: "Firebase", color: "#ffca28" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "Redis", color: "#dc382d" },
  { name: "Claude AI", color: "#d4a574" },
  { name: "LangChain", color: "#1c3c3c" },
];

const faqItems = [
  { q: "How much does a custom website cost?", a: "Our projects start at $499 for landing pages. Business websites start at $1,499, e-commerce at $2,999, and custom web apps at $4,999. Use our instant quote calculator above for a detailed breakdown, or message us for a custom estimate. All prices are fixed — no hourly billing." },
  { q: "How long does it take to build a website?", a: "Landing pages: 5-7 business days. Business websites: 2-3 weeks. E-commerce stores: 3-5 weeks. Complex web apps: 4-8 weeks. We also offer express delivery for urgent projects." },
  { q: "How are you different from Upwork or Fiverr freelancers?", a: "Fixed-price quotes (no hourly surprises), weekly demos, direct access to senior engineers, money-back guarantee, and 100% code ownership. No middlemen, no ghosting. You talk to the person writing your code." },
  { q: "I have an app idea but I'm not technical. Can you help?", a: "Absolutely. Most of our clients are non-technical founders. We handle everything from requirements to deployment. Start with a free 30-minute discovery call — just describe your idea and we'll map out the entire project." },
  { q: "Can you replace my WordPress or Wix site?", a: "Yes, we frequently migrate from WordPress, Wix, Squarespace to custom-built sites. Custom sites are faster, more secure, fully SEO-optimized, and you never pay recurring platform fees. Migration takes 2-3 weeks." },
  { q: "Can you add AI chatbots or AI features to my website?", a: "Yes. We integrate chatbots, content generation, recommendation engines, and custom LLM solutions using OpenAI, Claude, and open-source models. AI integrations start at $1,999." },
  { q: "Do I own the source code?", a: "Yes, 100%. Every line of code, every asset, every credential is yours. We deploy on your infrastructure with your accounts. Zero vendor lock-in, zero recurring license fees." },
  { q: "What payment methods do you accept?", a: "Wire transfers, PayPal, Stripe, and cryptocurrency. Standard terms: 50% upfront, 50% on delivery. For projects over $10K, milestone-based payments available. All prices in USD." },
  { q: "Do you offer ongoing support?", a: "Yes. Maintenance plans start at $99/month including bug fixes, security updates, performance monitoring, and minor feature additions. 24/7 emergency support available." },
];

const processSteps = [
  { num: "01", title: "Free Discovery Call", desc: "30 minutes. Tell us your idea — no forms, no gatekeeping. We'll understand your goals, timeline, budget, and give you an honest assessment." },
  { num: "02", title: "Quote & Blueprint", desc: "Within 24 hours, you get a detailed proposal with scope, timeline, milestones, and a firm fixed price. No surprises, ever." },
  { num: "03", title: "Build & Iterate", desc: "Weekly demos. You see real working software every week and can steer the direction at any point. Agile sprints, transparent progress." },
  { num: "04", title: "Ship & You Own It", desc: "Deployed on your infrastructure. Full source code, documentation, and credentials handed over. It's yours. Permanently." },
];

export default function KraftAILanding() {
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const [scrambleText, setScrambleText] = useState("Build.");
  const [selectedTier, setSelectedTier] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", company: "", message: "", timeline: "" });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);

  const submitQuoteForm = useCallback(async () => {
    if (!quoteForm.name && !quoteForm.email) return;
    setQuoteSubmitting(true);
    try {
      await fetch("/api/kraftai/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          company: quoteForm.company,
          message: quoteForm.message,
          timeline: quoteForm.timeline,
          selected_tier: pricingTiers[selectedTier].name,
          selected_addons: selectedAddOns.map((id) => addOns.find((a) => a.id === id)?.name).join(", "),
          estimated_total: pricingTiers[selectedTier].price + selectedAddOns.reduce((s, id) => s + (addOns.find((a) => a.id === id)?.price || 0), 0),
          project_type: pricingTiers[selectedTier].name,
          budget: `$${pricingTiers[selectedTier].price + selectedAddOns.reduce((s, id) => s + (addOns.find((a) => a.id === id)?.price || 0), 0)}`,
          source: "quote_form",
        }),
      });
      setQuoteSubmitted(true);
      trackEvent("lead_submitted", { tier: pricingTiers[selectedTier].name, total: pricingTiers[selectedTier].price + selectedAddOns.reduce((s, id) => s + (addOns.find((a) => a.id === id)?.price || 0), 0) });
    } catch { /* will still redirect to WhatsApp */ }
    setQuoteSubmitting(false);
  }, [quoteForm, selectedTier, selectedAddOns]);

  const totalPrice = pricingTiers[selectedTier].price + selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  const quoteMessage = `Hi! I'd like a quote for: ${pricingTiers[selectedTier].name} ($${pricingTiers[selectedTier].price})${selectedAddOns.length ? ` + Add-ons: ${selectedAddOns.map((id) => addOns.find((a) => a.id === id)?.name).join(", ")}` : ""}. Estimated total: $${totalPrice}. Here are my requirements: [describe your project]`;

  // Text scramble
  useEffect(() => {
    const words = ["Build.", "Ship.", "Scale.", "Own."];
    let wordIndex = 0;
    const runScramble = () => {
      const target = words[wordIndex % words.length];
      wordIndex++;
      let iteration = 0;
      const interval = setInterval(() => {
        setScrambleText(
          target.split("").map((char, i) => {
            if (i < iteration) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join("")
        );
        iteration += 1 / 3;
        if (iteration >= target.length) {
          clearInterval(interval);
          setScrambleText(target);
        }
      }, 40);
    };
    runScramble();
    const loop = setInterval(runScramble, 3000);
    return () => clearInterval(loop);
  }, []);

  // Hero canvas
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: 0.5 + Math.random() * 1.5, o: 0.2 + Math.random() * 0.4 });
    }
    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,91,255,${p.o})`; ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,91,255,${0.08 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", onResize); };
  }, []);

  // Process step rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => { const next = (prev + 1) % 4; activeStepRef.current = next; return next; });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("sr-in"); });
    }, { threshold: 0.05, rootMargin: "0px 0px -30px 0px" });
    els.forEach((el) => obs.observe(el));
    setTimeout(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 60 && r.bottom > 0) el.classList.add("sr-in");
      });
    }, 100);
    return () => obs.disconnect();
  }, []);

  // Count-up
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-count]");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0", 10);
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          const start = performance.now();
          const animate = (now: number) => {
            const p = Math.min((now - start) / 1600, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}${suffix}`;
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggleAddOn = useCallback((id: string) => {
    setSelectedAddOns((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --bg: #09090b;
          --bg2: #0f0f12;
          --ink: #fafafa;
          --muted: #a1a1aa;
          --border: rgba(255,255,255,0.08);
          --accent: #635bff;
          --accent2: #00d4aa;
          --accent3: #ff6b35;
          --surface: #18181b;
          --surface2: #1e1e23;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', -apple-system, sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .sr { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .sr-in { opacity: 1; transform: none; }

        /* Nav */
        .k-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 48px;
          background: rgba(9,9,11,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .k-logo { font-family: 'JetBrains Mono', monospace; font-size: 18px; font-weight: 700; color: var(--ink); text-decoration: none; letter-spacing: -0.02em; }
        .k-logo span { color: var(--accent); }
        .k-nav-links { display: flex; gap: 32px; align-items: center; }
        .k-nav-links a { font-size: 14px; color: var(--muted); text-decoration: none; transition: color 0.2s; font-weight: 500; }
        .k-nav-links a:hover { color: var(--ink); }
        .k-nav-cta {
          font-size: 14px; font-weight: 600; background: var(--accent); color: #fff;
          padding: 10px 24px; border-radius: 8px; text-decoration: none;
          transition: all 0.2s; border: none; cursor: pointer;
        }
        .k-nav-cta:hover { background: #7c75ff; transform: translateY(-1px); box-shadow: 0 4px 24px rgba(99,91,255,0.4); }

        .k-hamburger {
          display: none; background: none; border: none; color: var(--ink); cursor: pointer; padding: 8px;
        }
        .k-mobile-menu {
          display: none; position: fixed; top: 60px; left: 0; right: 0; bottom: 0;
          background: rgba(9,9,11,0.98); backdrop-filter: blur(20px); z-index: 999;
          flex-direction: column; align-items: center; justify-content: center; gap: 32px;
        }
        .k-mobile-menu.open { display: flex; }
        .k-mobile-menu a {
          font-size: 20px; color: var(--ink); text-decoration: none; font-weight: 600;
        }

        /* Hero */
        .k-hero {
          position: relative; min-height: 100vh; padding: 140px 48px 80px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .k-hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
        .k-hero-content { position: relative; z-index: 1; max-width: 900px; }
        .k-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600; color: var(--accent2);
          background: rgba(0,212,170,0.1); border: 1px solid rgba(0,212,170,0.2);
          padding: 6px 16px; border-radius: 999px; margin-bottom: 28px;
          animation: fadeUp 0.6s ease both;
        }
        .k-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent2); animation: pulse 2s infinite; }

        .k-hero-h1 {
          font-size: clamp(48px, 7vw, 88px); font-weight: 900;
          line-height: 1.05; letter-spacing: -0.035em;
          margin-bottom: 24px;
        }
        .k-hero-line { display: block; overflow: hidden; }
        .k-hero-line-i { display: block; animation: slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .k-hero-line:nth-child(1) .k-hero-line-i { animation-delay: 0.15s; }
        .k-hero-line:nth-child(2) .k-hero-line-i { animation-delay: 0.3s; }
        .k-hero-line:nth-child(3) .k-hero-line-i { animation-delay: 0.45s; }

        .k-accent { color: var(--accent); }
        .k-accent2 { color: var(--accent2); }
        .k-accent3 { color: var(--accent3); }

        .k-hero-sub {
          font-size: 18px; color: var(--muted); line-height: 1.7;
          max-width: 560px; margin-bottom: 40px;
          animation: fadeUp 0.6s ease both; animation-delay: 0.5s;
        }
        .k-hero-ctas {
          display: flex; gap: 14px; flex-wrap: wrap;
          animation: fadeUp 0.6s ease both; animation-delay: 0.6s;
        }
        .k-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 15px; font-weight: 600; padding: 14px 28px;
          border-radius: 10px; text-decoration: none; cursor: pointer;
          transition: all 0.2s; border: none;
        }
        .k-btn-primary { background: var(--accent); color: #fff; }
        .k-btn-primary:hover { background: #7c75ff; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,91,255,0.3); }
        .k-btn-outline { background: transparent; color: var(--ink); border: 1px solid var(--border); }
        .k-btn-outline:hover { border-color: var(--accent); color: var(--accent); }
        .k-btn-green { background: #25d366; color: #fff; }
        .k-btn-green:hover { background: #20bd5a; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,211,102,0.3); }

        .k-hero-proof {
          display: flex; align-items: center; gap: 16px; margin-top: 48px;
          animation: fadeUp 0.6s ease both; animation-delay: 0.7s;
        }
        .k-avatars { display: flex; }
        .k-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2px solid var(--bg); margin-left: -8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700;
        }
        .k-avatar:first-child { margin-left: 0; }
        .k-proof-text { font-size: 13px; color: var(--muted); line-height: 1.5; }
        .k-proof-text strong { color: var(--ink); font-weight: 600; }

        /* Trust bar */
        .k-trust-bar {
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          background: var(--bg2); padding: 0; overflow: hidden; position: relative; z-index: 1;
        }
        .k-trust-track {
          display: flex; width: max-content; animation: marquee 30s linear infinite;
        }
        .k-trust-item {
          display: flex; align-items: center; gap: 8px;
          padding: 16px 32px; white-space: nowrap;
          font-size: 13px; font-weight: 500; color: var(--muted);
        }
        .k-trust-check { color: var(--accent2); font-weight: 700; }

        /* Stats */
        .k-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid var(--border); position: relative; z-index: 1;
        }
        .k-stat {
          padding: 48px 32px; text-align: center;
          border-right: 1px solid var(--border);
        }
        .k-stat:last-child { border-right: none; }
        .k-stat-num {
          font-size: 48px; font-weight: 900; line-height: 1;
          margin-bottom: 8px; letter-spacing: -0.02em;
        }
        .k-stat-label { font-size: 13px; color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }

        /* Section shared */
        .k-section { padding: 100px 48px; position: relative; z-index: 1; }
        .k-section-header { margin-bottom: 56px; }
        .k-tag {
          font-size: 12px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--accent); margin-bottom: 12px;
        }
        .k-title {
          font-size: clamp(32px, 4vw, 52px); font-weight: 800;
          letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px;
        }
        .k-subtitle { font-size: 16px; color: var(--muted); max-width: 520px; line-height: 1.7; }

        /* Pricing */
        .k-pricing-section { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .k-pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
        .k-price-card {
          background: var(--surface); border: 2px solid var(--border);
          border-radius: 16px; padding: 32px 24px; cursor: pointer;
          transition: all 0.3s; position: relative;
        }
        .k-price-card:hover { border-color: rgba(99,91,255,0.3); transform: translateY(-4px); }
        .k-price-card.selected { border-color: var(--accent); background: rgba(99,91,255,0.05); }
        .k-price-popular {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--accent); color: #fff; font-size: 11px; font-weight: 700;
          padding: 4px 14px; border-radius: 999px; text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .k-price-name { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .k-price-desc { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
        .k-price-amount {
          font-size: 40px; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 4px;
        }
        .k-price-amount span { font-size: 16px; font-weight: 500; color: var(--muted); }
        .k-price-delivery { font-size: 12px; color: var(--accent2); font-weight: 600; margin-bottom: 20px; }
        .k-price-features { list-style: none; }
        .k-price-features li {
          font-size: 13px; color: var(--muted); padding: 6px 0;
          display: flex; align-items: center; gap: 8px;
        }
        .k-check { color: var(--accent2); font-weight: 700; flex-shrink: 0; }

        /* Add-ons */
        .k-addons { margin-bottom: 40px; }
        .k-addon-title { font-size: 18px; font-weight: 700; margin-bottom: 16px; }
        .k-addon-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .k-addon {
          background: var(--surface); border: 2px solid var(--border);
          border-radius: 12px; padding: 20px; cursor: pointer;
          transition: all 0.2s; display: flex; align-items: flex-start; gap: 12px;
        }
        .k-addon:hover { border-color: rgba(99,91,255,0.3); }
        .k-addon.selected { border-color: var(--accent); background: rgba(99,91,255,0.05); }
        .k-addon-check {
          width: 20px; height: 20px; border-radius: 6px;
          border: 2px solid var(--border); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .k-addon.selected .k-addon-check { background: var(--accent); border-color: var(--accent); }
        .k-addon-name { font-size: 14px; font-weight: 600; }
        .k-addon-price { font-size: 13px; color: var(--accent); font-weight: 600; }
        .k-addon-desc { font-size: 12px; color: var(--muted); margin-top: 2px; }

        /* Quote summary */
        .k-quote-summary {
          background: linear-gradient(135deg, rgba(99,91,255,0.1), rgba(0,212,170,0.05));
          border: 1px solid rgba(99,91,255,0.2);
          border-radius: 16px; padding: 32px 40px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 24px;
        }
        .k-quote-total-label { font-size: 14px; color: var(--muted); margin-bottom: 4px; }
        .k-quote-total {
          font-size: 48px; font-weight: 900; letter-spacing: -0.03em;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .k-quote-note { font-size: 12px; color: var(--muted); margin-top: 4px; }
        .k-quote-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        /* Services bento */
        .k-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .k-bento-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 36px 28px;
          transition: all 0.3s; text-decoration: none; color: inherit;
          position: relative; overflow: hidden; display: block;
        }
        .k-bento-card:hover { border-color: rgba(99,91,255,0.3); transform: translateY(-4px); }
        .k-bento-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(99,91,255,0.1), transparent 60%);
          opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        .k-bento-card:hover::before { opacity: 1; }
        .k-bento-featured { grid-column: span 2; }
        .k-bento-icon { margin-bottom: 16px; color: var(--accent); }
        .k-bento-name { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
        .k-bento-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }
        .k-bento-price {
          display: inline-block; margin-top: 16px; font-size: 13px; font-weight: 600;
          color: var(--accent2); background: rgba(0,212,170,0.1); padding: 4px 12px; border-radius: 6px;
        }
        .k-bento-trending {
          display: inline-block; margin-top: 12px; margin-left: 8px;
          font-size: 11px; font-weight: 700; color: var(--accent3);
          background: rgba(255,107,53,0.1); padding: 4px 12px; border-radius: 6px;
          text-transform: uppercase; letter-spacing: 0.05em;
        }

        /* Process */
        .k-process-section { background: var(--bg2); border-top: 1px solid var(--border); }
        .k-process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
        .k-process-step {
          padding: 40px 32px; border-right: 1px solid var(--border);
          cursor: pointer; transition: all 0.3s; position: relative;
        }
        .k-process-step:last-child { border-right: none; }
        .k-process-step::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: var(--accent); transform: scaleX(0); transition: transform 0.4s;
        }
        .k-process-step.active { background: rgba(99,91,255,0.05); }
        .k-process-step.active::after { transform: scaleX(1); }
        .k-process-num { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--accent); margin-bottom: 16px; font-weight: 600; }
        .k-process-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; transition: color 0.3s; }
        .k-process-step:not(.active) .k-process-title { color: var(--muted); }
        .k-process-desc {
          font-size: 13px; color: var(--muted); line-height: 1.7;
          max-height: 0; overflow: hidden; opacity: 0;
          transition: all 0.4s;
        }
        .k-process-step.active .k-process-desc { max-height: 200px; opacity: 1; margin-top: 8px; }

        /* Portfolio */
        .k-portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .k-portfolio-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 32px 28px; transition: all 0.3s;
        }
        .k-portfolio-card:hover { border-color: rgba(99,91,255,0.3); transform: translateY(-4px); }
        .k-portfolio-cat {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--accent); margin-bottom: 12px;
        }
        .k-portfolio-name { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
        .k-portfolio-tech { font-size: 12px; color: var(--muted); margin-bottom: 12px; font-family: 'JetBrains Mono', monospace; }
        .k-portfolio-result {
          font-size: 13px; font-weight: 600; color: var(--accent2);
          display: flex; align-items: center; gap: 6px;
        }

        /* Testimonials */
        .k-testimonials-section { background: var(--bg2); border-top: 1px solid var(--border); }
        .k-testimonial-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 40px; max-width: 640px; margin: 0 auto;
          text-align: center; position: relative;
        }
        .k-testimonial-quote {
          font-size: 72px; color: var(--accent); opacity: 0.3;
          position: absolute; top: 16px; left: 32px; font-family: Georgia, serif; line-height: 1;
        }
        .k-testimonial-text { font-size: 18px; line-height: 1.8; margin-bottom: 24px; font-weight: 500; }
        .k-testimonial-stars { margin-bottom: 16px; color: #fbbf24; font-size: 18px; letter-spacing: 4px; }
        .k-testimonial-name { font-size: 16px; font-weight: 700; }
        .k-testimonial-role { font-size: 13px; color: var(--muted); }
        .k-testimonial-dots { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
        .k-testimonial-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border); cursor: pointer; transition: all 0.3s; border: none;
        }
        .k-testimonial-dot.active { background: var(--accent); width: 24px; border-radius: 4px; }

        /* Tech */
        .k-tech-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .k-tech-pill {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500; color: var(--ink);
          padding: 10px 18px; border: 1px solid var(--border);
          border-radius: 8px; transition: all 0.2s; background: var(--surface);
        }
        .k-tech-pill:hover { border-color: var(--accent); transform: translateY(-2px); }
        .k-tech-dot { width: 8px; height: 8px; border-radius: 50%; }

        /* Why */
        .k-why-section { background: var(--bg2); border-top: 1px solid var(--border); }
        .k-why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .k-why-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 40px 32px; transition: all 0.3s;
        }
        .k-why-card:hover { border-color: rgba(99,91,255,0.3); transform: translateY(-4px); }
        .k-why-num { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--accent); margin-bottom: 16px; font-weight: 600; }
        .k-why-title { font-size: 22px; font-weight: 700; margin-bottom: 10px; }
        .k-why-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

        /* FAQ */
        .k-faq-list { max-width: 720px; }
        .k-faq-item {
          border-bottom: 1px solid var(--border); overflow: hidden;
        }
        .k-faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 0; cursor: pointer; width: 100%;
          background: none; border: none; color: var(--ink);
          font-size: 16px; font-weight: 600; text-align: left;
          font-family: inherit;
        }
        .k-faq-q:hover { color: var(--accent); }
        .k-faq-arrow {
          font-size: 20px; transition: transform 0.3s; color: var(--muted); flex-shrink: 0; margin-left: 16px;
        }
        .k-faq-item.open .k-faq-arrow { transform: rotate(45deg); }
        .k-faq-a {
          font-size: 14px; color: var(--muted); line-height: 1.7;
          max-height: 0; overflow: hidden; transition: all 0.3s;
          padding-bottom: 0;
        }
        .k-faq-item.open .k-faq-a { max-height: 300px; padding-bottom: 20px; }

        /* CTA */
        .k-cta-section {
          text-align: center; padding: 120px 48px;
          position: relative; overflow: hidden; z-index: 1;
        }
        .k-cta-glow {
          position: absolute; width: 700px; height: 700px; border-radius: 50%;
          left: 50%; top: 50%; transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(99,91,255,0.12) 0%, rgba(0,212,170,0.06) 40%, transparent 70%);
          animation: breathe 6s ease-in-out infinite; pointer-events: none;
        }
        .k-cta-h2 {
          font-size: clamp(40px, 6vw, 80px); font-weight: 900;
          letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 20px; position: relative;
        }
        .k-gradient {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .k-cta-p { font-size: 16px; color: var(--muted); max-width: 480px; margin: 0 auto 36px; line-height: 1.7; position: relative; }
        .k-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }

        /* Footer */
        .k-footer {
          background: #050507; border-top: 1px solid var(--border);
          padding: 48px; position: relative; z-index: 1;
        }
        .k-footer-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; flex-wrap: wrap; gap: 32px; }
        .k-footer-brand p { font-size: 13px; color: var(--muted); max-width: 280px; line-height: 1.7; margin-top: 12px; }
        .k-footer-col h4 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; color: var(--ink); }
        .k-footer-col a {
          display: block; font-size: 14px; color: var(--muted);
          text-decoration: none; padding: 4px 0; transition: color 0.2s;
        }
        .k-footer-col a:hover { color: var(--ink); }
        .k-footer-bottom {
          border-top: 1px solid var(--border); padding-top: 24px;
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;
        }
        .k-footer-copy { font-size: 12px; color: var(--muted); }
        .k-footer-payment { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 16px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes breathe { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.15); opacity: 0.6; } }

        @media (max-width: 1024px) {
          .k-pricing-grid { grid-template-columns: repeat(2, 1fr); }
          .k-addon-grid { grid-template-columns: repeat(2, 1fr); }
          .k-process-grid { grid-template-columns: repeat(2, 1fr); }
          .k-process-step { border-bottom: 1px solid var(--border); }
          .k-portfolio-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .k-nav { padding: 12px 20px; }
          .k-nav-links { display: none; }
          .k-hamburger { display: block; }
          .k-hero { padding: 100px 20px 60px; }
          .k-hero-h1 { font-size: clamp(36px, 10vw, 56px); }
          .k-hero-sub { font-size: 15px; }
          .k-section { padding: 72px 20px; }
          .k-stats { grid-template-columns: repeat(2, 1fr); }
          .k-stat { padding: 32px 20px; }
          .k-stat-num { font-size: 36px; }
          .k-pricing-grid { grid-template-columns: 1fr; }
          .k-addon-grid { grid-template-columns: 1fr; }
          .k-bento { grid-template-columns: 1fr; }
          .k-bento-featured { grid-column: span 1; }
          .k-process-grid { grid-template-columns: 1fr; }
          .k-process-step { border-right: none; }
          .k-portfolio-grid { grid-template-columns: 1fr; }
          .k-why-grid { grid-template-columns: 1fr; }
          .k-quote-summary { flex-direction: column; text-align: center; }
          .k-quote-actions { justify-content: center; }
          .k-cta-section { padding: 80px 20px; }
          .k-footer { padding: 36px 20px; }
          .k-footer-top { flex-direction: column; }
        }
      `}</style>

      {/* Nav */}
      <nav className="k-nav">
        <a href="/" className="k-logo">Kraft<span>AI</span></a>
        <div className="k-nav-links">
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#portfolio">Work</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="#pricing" className="k-nav-cta" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          Get Instant Quote
        </a>
        <button className="k-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`k-mobile-menu${mobileMenuOpen ? " open" : ""}`}>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
        <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Work</a>
        <a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a>
        <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        <a href="#pricing" className="k-btn k-btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Instant Quote</a>
      </div>

      {/* Hero */}
      <section className="k-hero">
        <canvas ref={heroCanvasRef} className="k-hero-canvas" />
        <div className="k-hero-content">
          <div className="k-hero-badge">
            <span className="k-badge-dot" />
            Trusted by 50+ businesses worldwide
          </div>
          <h1 className="k-hero-h1">
            <span className="k-hero-line"><span className="k-hero-line-i">You think it.</span></span>
            <span className="k-hero-line"><span className="k-hero-line-i">We <span className="k-accent">{scrambleText}</span></span></span>
            <span className="k-hero-line"><span className="k-hero-line-i">You <span className="k-accent2">own it.</span></span></span>
          </h1>
          <p className="k-hero-sub">
            Premium websites, web apps, mobile apps & AI solutions — built by senior engineers.
            Transparent pricing from <strong style={{ color: "var(--ink)" }}>$499</strong>. Full code ownership. No lock-in.
          </p>
          <div className="k-hero-ctas">
            <a href="#pricing" className="k-btn k-btn-primary">
              Get Instant Quote — Free
            </a>
            <a href={waLink("Hi! I'd like to discuss a project. Here's what I need: [describe your project]")} target="_blank" rel="noopener noreferrer" className="k-btn k-btn-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
            <a href="mailto:hritikchaudhary016@gmail.com" className="k-btn k-btn-outline">
              Send Email
            </a>
          </div>
          <div className="k-hero-proof">
            <div className="k-avatars">
              {["#635bff", "#00d4aa", "#ff6b35", "#fbbf24", "#ec4899"].map((c, i) => (
                <div key={i} className="k-avatar" style={{ background: c }}>
                  {["A", "S", "M", "P", "R"][i]}
                </div>
              ))}
            </div>
            <div className="k-proof-text">
              <strong>4.9/5</strong> from 47+ reviews<br />
              Trusted by startups & enterprises
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="k-trust-bar">
        <div className="k-trust-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} style={{ display: "flex" }}>
              {[
                "100% Code Ownership",
                "Fixed-Price Projects",
                "7-Day Delivery Available",
                "Senior Engineers Only",
                "24/7 Support",
                "Money-Back Guarantee",
                "No Recurring Fees",
                "Free Consultation",
              ].map((item, i) => (
                <span key={i} className="k-trust-item">
                  <span className="k-trust-check">&#10003;</span> {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="k-stats sr">
        <div className="k-stat">
          <div className="k-stat-num" style={{ color: "var(--accent)" }}>
            <span data-count="50" data-suffix="+">0</span>
          </div>
          <div className="k-stat-label">Projects Delivered</div>
        </div>
        <div className="k-stat">
          <div className="k-stat-num" style={{ color: "var(--accent2)" }}>
            <span data-count="98" data-suffix="%">0</span>
          </div>
          <div className="k-stat-label">Client Satisfaction</div>
        </div>
        <div className="k-stat">
          <div className="k-stat-num" style={{ color: "var(--accent3)" }}>
            <span data-count="12" data-suffix="">0</span>
          </div>
          <div className="k-stat-label">Countries Served</div>
        </div>
        <div className="k-stat">
          <div className="k-stat-num">
            <span data-count="7" data-suffix="-day">0</span>
          </div>
          <div className="k-stat-label">Fastest Delivery</div>
        </div>
      </div>

      {/* Services */}
      <section id="services" className="k-section">
        <div className="k-section-header sr">
          <div className="k-tag">Services</div>
          <h2 className="k-title">Everything you need, built right</h2>
          <p className="k-subtitle">From landing pages to enterprise platforms. Click any service to get a quote instantly via WhatsApp.</p>
        </div>
        <div className="k-bento sr">
          <a href={waLink("Hi! I need a custom AI solution. My requirements: [describe your needs, timeline, budget]")} target="_blank" rel="noopener noreferrer" className="k-bento-card k-bento-featured" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
            <div className="k-bento-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 10v2" /><circle cx="12" cy="16" r="4" /><path d="M8 16h.01M16 16h.01M12 20v2M4 12h2M18 12h2" /></svg>
            </div>
            <div className="k-bento-name">AI Solutions</div>
            <div className="k-bento-desc">Custom AI chatbots, content generation, recommendation engines, LLM integrations, and intelligent automation built into your existing systems or from scratch.</div>
            <span className="k-bento-price">From $1,999</span>
            <span className="k-bento-trending">High Demand</span>
          </a>

          <a href={waLink("Hi! I need a professional website. Details: [describe your business, pages needed, timeline]")} target="_blank" rel="noopener noreferrer" className="k-bento-card" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
            <div className="k-bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
            </div>
            <div className="k-bento-name">Websites</div>
            <div className="k-bento-desc">Marketing sites, landing pages, blogs, and portfolios. Lightning-fast, SEO-optimized, mobile-first.</div>
            <span className="k-bento-price">From $499</span>
          </a>

          <a href={waLink("Hi! I need a mobile app for iOS/Android. Details: [describe your app idea, features, timeline]")} target="_blank" rel="noopener noreferrer" className="k-bento-card" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
            <div className="k-bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
            </div>
            <div className="k-bento-name">Mobile Apps</div>
            <div className="k-bento-desc">iOS and Android apps. Flutter, React Native, or fully native. Published to app stores.</div>
            <span className="k-bento-price">From $3,999</span>
          </a>

          <a href={waLink("Hi! I need an e-commerce store with payments. Details: [products, features, timeline]")} target="_blank" rel="noopener noreferrer" className="k-bento-card" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
            <div className="k-bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            </div>
            <div className="k-bento-name">E-Commerce</div>
            <div className="k-bento-desc">Online stores with Stripe/Razorpay, inventory, orders, and admin dashboard.</div>
            <span className="k-bento-price">From $2,999</span>
          </a>

          <a href={waLink("Hi! I need a custom web application. Details: [describe the tool, users, features, timeline]")} target="_blank" rel="noopener noreferrer" className="k-bento-card k-bento-featured" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
            <div className="k-bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
            </div>
            <div className="k-bento-name">Custom Web Apps & SaaS</div>
            <div className="k-bento-desc">Dashboards, CRMs, ERPs, admin panels, SaaS platforms, and internal tools — custom-built for your exact workflow with user auth, APIs, real-time features, and CI/CD.</div>
            <span className="k-bento-price">From $4,999</span>
          </a>

          <a href={waLink("Hi! I need UI/UX design for my project. Details: [describe what you need designed, style, timeline]")} target="_blank" rel="noopener noreferrer" className="k-bento-card" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`); }}>
            <div className="k-bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
            </div>
            <div className="k-bento-name">UI/UX Design</div>
            <div className="k-bento-desc">Beautiful, conversion-focused designs. Figma deliverables, prototypes, and design systems.</div>
            <span className="k-bento-price">From $799</span>
          </a>
        </div>
      </section>

      {/* Pricing / Quote Calculator */}
      <section id="pricing" className="k-section k-pricing-section">
        <div className="k-section-header sr">
          <div className="k-tag">Transparent Pricing</div>
          <h2 className="k-title">Instant Quote Calculator</h2>
          <p className="k-subtitle">Select your project type and add-ons. Get a real price in seconds — no sales calls required.</p>
        </div>

        <div className="k-pricing-grid sr">
          {pricingTiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`k-price-card${selectedTier === i ? " selected" : ""}`}
              onClick={() => setSelectedTier(i)}
            >
              {tier.popular && <div className="k-price-popular">Most Popular</div>}
              <div className="k-price-name">{tier.name}</div>
              <div className="k-price-desc">{tier.desc}</div>
              <div className="k-price-amount">${tier.price.toLocaleString()} <span>USD</span></div>
              <div className="k-price-delivery">Delivery: {tier.delivery}</div>
              <ul className="k-price-features">
                {tier.features.map((f, j) => (
                  <li key={j}><span className="k-check">&#10003;</span> {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="k-addons sr">
          <div className="k-addon-title">Add-ons <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>(optional)</span></div>
          <div className="k-addon-grid">
            {addOns.map((addon) => (
              <div
                key={addon.id}
                className={`k-addon${selectedAddOns.includes(addon.id) ? " selected" : ""}`}
                onClick={() => toggleAddOn(addon.id)}
              >
                <div className="k-addon-check">
                  {selectedAddOns.includes(addon.id) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  )}
                </div>
                <div>
                  <div className="k-addon-name">{addon.name} <span className="k-addon-price">+${addon.price.toLocaleString()}</span></div>
                  <div className="k-addon-desc">{addon.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="k-quote-summary sr">
          <div>
            <div className="k-quote-total-label">Your Estimated Total</div>
            <div className="k-quote-total">${totalPrice.toLocaleString()}</div>
            <div className="k-quote-note">Final price confirmed after discovery call. 50% upfront, 50% on delivery.</div>
          </div>
          <div className="k-quote-actions">
            <button className="k-btn k-btn-primary" onClick={() => { setShowQuoteForm(true); trackEvent("quote_form_opened", { tier: pricingTiers[selectedTier].name, total: totalPrice }); }}>
              Get Detailed Quote
            </button>
            <a href={waLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="k-btn k-btn-green" onClick={() => trackEvent("quote_whatsapp", { tier: pricingTiers[selectedTier].name, total: totalPrice })}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Quick Quote via WhatsApp
            </a>
          </div>
        </div>

        {/* Lead Capture Form Modal */}
        {showQuoteForm && (
          <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={(e) => { if (e.target === e.currentTarget) setShowQuoteForm(false); }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 36, width: 460, maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
              <button onClick={() => setShowQuoteForm(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--muted)", fontSize: 24, cursor: "pointer" }}>&times;</button>
              {quoteSubmitted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Quote Request Received!</h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                    We&apos;ll get back to you within 2 hours with a detailed proposal.<br />
                    For instant discussion, reach us on WhatsApp.
                  </p>
                  <a href={waLink(quoteMessage)} target="_blank" rel="noopener noreferrer" className="k-btn k-btn-green">
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Get Your Detailed Quote</h3>
                  <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 24 }}>
                    {pricingTiers[selectedTier].name} — ${totalPrice.toLocaleString()} estimated
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input placeholder="Your Name *" value={quoteForm.name} onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--ink)", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                      <input placeholder="Email *" type="email" value={quoteForm.email} onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--ink)", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input placeholder="Phone (optional)" value={quoteForm.phone} onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--ink)", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                      <input placeholder="Company (optional)" value={quoteForm.company} onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--ink)", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                    </div>
                    <select value={quoteForm.timeline} onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: quoteForm.timeline ? "var(--ink)" : "var(--muted)", fontSize: 14, outline: "none", fontFamily: "inherit" }}>
                      <option value="">When do you need this?</option>
                      <option value="asap">ASAP (Express)</option>
                      <option value="2weeks">Within 2 weeks</option>
                      <option value="1month">Within a month</option>
                      <option value="flexible">Flexible timeline</option>
                    </select>
                    <textarea placeholder="Tell us about your project... (What do you want built? Any specific features?)" value={quoteForm.message} onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })} rows={4} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--ink)", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                    <button
                      className="k-btn k-btn-primary"
                      style={{ width: "100%", justifyContent: "center", padding: "14px 24px" }}
                      disabled={quoteSubmitting || (!quoteForm.name && !quoteForm.email)}
                      onClick={async () => { await submitQuoteForm(); }}
                    >
                      {quoteSubmitting ? "Submitting..." : "Submit Quote Request"}
                    </button>
                    <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
                      We respond within 2 hours. Your data is never shared.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Process */}
      <section id="process" className="k-section k-process-section">
        <div className="k-section-header sr">
          <div className="k-tag">How It Works</div>
          <h2 className="k-title">From idea to live product in 4 steps</h2>
          <p className="k-subtitle">A clear, transparent process. No surprises, no scope creep, no BS.</p>
        </div>
        <div className="k-process-grid sr">
          {processSteps.map((step, i) => (
            <div
              key={i}
              className={`k-process-step${activeStep === i ? " active" : ""}`}
              onClick={() => { setActiveStep(i); activeStepRef.current = i; }}
            >
              <div className="k-process-num">{step.num}</div>
              <div className="k-process-title">{step.title}</div>
              <div className="k-process-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="k-section">
        <div className="k-section-header sr">
          <div className="k-tag">Our Work</div>
          <h2 className="k-title">Projects that delivered results</h2>
          <p className="k-subtitle">Real projects, real outcomes. Every project comes with full code ownership.</p>
        </div>
        <div className="k-portfolio-grid sr">
          {portfolio.map((p, i) => (
            <div key={i} className="k-portfolio-card">
              <div className="k-portfolio-cat">{p.category}</div>
              <div className="k-portfolio-name">{p.name}</div>
              <div className="k-portfolio-tech">{p.tech}</div>
              <div className="k-portfolio-result">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                {p.result}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="k-section k-testimonials-section">
        <div className="k-section-header sr" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="k-tag">Testimonials</div>
          <h2 className="k-title">What our clients say</h2>
        </div>
        <div className="sr">
          <div className="k-testimonial-card">
            <div className="k-testimonial-quote">&ldquo;</div>
            <div className="k-testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <div className="k-testimonial-text">{testimonials[currentTestimonial].text}</div>
            <div className="k-testimonial-name">{testimonials[currentTestimonial].name}</div>
            <div className="k-testimonial-role">{testimonials[currentTestimonial].role}</div>
          </div>
          <div className="k-testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`k-testimonial-dot${currentTestimonial === i ? " active" : ""}`}
                onClick={() => setCurrentTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="k-section">
        <div className="k-section-header sr">
          <div className="k-tag">Tech Stack</div>
          <h2 className="k-title">Battle-tested technologies</h2>
          <p className="k-subtitle">We use the best tools for each job. No one-size-fits-all — every stack is chosen for your needs.</p>
        </div>
        <div className="k-tech-grid sr">
          {techPills.map((t) => (
            <span key={t.name} className="k-tech-pill">
              <span className="k-tech-dot" style={{ background: t.color }} />
              {t.name}
            </span>
          ))}
        </div>
      </section>

      {/* Why KraftAI */}
      <section className="k-section k-why-section">
        <div className="k-section-header sr">
          <div className="k-tag">Why KraftAI</div>
          <h2 className="k-title">Why 50+ businesses chose us</h2>
          <p className="k-subtitle">We are builders, not an agency. Here is what makes the difference.</p>
        </div>
        <div className="k-why-grid sr">
          {[
            { num: "01", title: "100% Code Ownership", desc: "Every line of code, every asset, every credential is yours. Deployed on your infrastructure. No vendor lock-in, no hostage situations." },
            { num: "02", title: "Fixed-Price, No Surprises", desc: "Get a firm quote before we write a single line. No hourly billing, no scope creep charges, no invoices that magically double." },
            { num: "03", title: "Talk to the Builder", desc: "No account managers, no relay chains. You talk directly to the senior engineer writing your code. Faster decisions, zero miscommunication." },
            { num: "04", title: "Global Quality, Smart Pricing", desc: "World-class engineering at prices that make sense. We compete on skill, not geography. The ROI speaks for itself." },
            { num: "05", title: "7-Day Express Delivery", desc: "Need it yesterday? Our express track delivers landing pages in 5-7 days and MVPs in 2-3 weeks. Speed without sacrificing quality." },
            { num: "06", title: "Money-Back Guarantee", desc: "If we don't deliver what was agreed, you get your money back. Simple. We've never had to use this — and we intend to keep it that way." },
          ].map((card, i) => (
            <div key={i} className="k-why-card">
              <div className="k-why-num">{card.num}</div>
              <div className="k-why-title">{card.title}</div>
              <div className="k-why-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="k-section">
        <div className="k-section-header sr">
          <div className="k-tag">FAQ</div>
          <h2 className="k-title">Frequently asked questions</h2>
          <p className="k-subtitle">Everything you need to know before getting started.</p>
        </div>
        <div className="k-faq-list sr">
          {faqItems.map((faq, i) => (
            <div key={i} className={`k-faq-item${openFaq === i ? " open" : ""}`}>
              <button className="k-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className="k-faq-arrow">+</span>
              </button>
              <div className="k-faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="k-cta-section">
        <div className="k-cta-glow" />
        <h2 className="k-cta-h2" style={{ position: "relative" }}>
          Ready to <span className="k-gradient">build something real?</span>
        </h2>
        <p className="k-cta-p">
          Whether it&apos;s a $499 landing page or a $25K platform — let&apos;s talk. Free consultation, no pressure, no pitch decks.
        </p>
        <div className="k-cta-btns">
          <a href="#pricing" className="k-btn k-btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
            Get Your Free Quote
          </a>
          <a href={waLink("Hi! I'd like a free consultation about my project. Here's what I'm thinking: [describe your idea]")} target="_blank" rel="noopener noreferrer" className="k-btn k-btn-green" style={{ fontSize: 16, padding: "16px 32px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Free Consultation on WhatsApp
          </a>
          <a href="mailto:hritikchaudhary016@gmail.com?subject=Project Inquiry&body=Hi! I'd like to discuss a project..." className="k-btn k-btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4l-10 8L2 4" /></svg>
            Email Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="k-footer">
        <div className="k-footer-top">
          <div className="k-footer-brand">
            <a href="/" className="k-logo" style={{ fontSize: 22 }}>Kraft<span>AI</span></a>
            <p>Premium web development agency. Custom websites, apps & AI solutions from $499. 100% code ownership, zero lock-in.</p>
          </div>
          <div className="k-footer-col">
            <h4>Services</h4>
            <a href="#services">Websites</a>
            <a href="#services">Mobile Apps</a>
            <a href="#services">E-Commerce</a>
            <a href="#services">AI Solutions</a>
            <a href="#services">Web Applications</a>
            <a href="#services">UI/UX Design</a>
          </div>
          <div className="k-footer-col">
            <h4>Company</h4>
            <a href="#process">How It Works</a>
            <a href="#portfolio">Our Work</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="k-footer-col">
            <h4>Contact</h4>
            <a href={waLink("Hi! I have a project inquiry.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:hritikchaudhary016@gmail.com">hritikchaudhary016@gmail.com</a>
          </div>
        </div>
        <div className="k-footer-bottom">
          <div className="k-footer-copy">&copy; 2026 KraftAI. All rights reserved. kraftai.in</div>
          <div className="k-footer-payment">
            Accepts: Wire Transfer &middot; PayPal &middot; Stripe &middot; Crypto
          </div>
        </div>
      </footer>

      {/* Tracker & Chatbot */}
      <KraftAITracker />
      <KraftAIChatbot />
    </>
  );
}

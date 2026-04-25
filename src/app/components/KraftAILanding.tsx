"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const translations = {
  en: {
    cta_whatsapp_msg: "Hi! Can you provide a quotation for building a website/app for my business? Here's what I'm looking for...",
    service_msgs: {
      websites: "Hi! I need a quotation for a professional website. Here's what I need: [describe your business, features, timeline, budget range]",
      stores: "Hi! Can you give me a quotation for building an e-commerce store? Details: [product types, features needed, monthly target, when needed]",
      mobile_apps: "Hi! I need a quotation for a mobile app. Requirements: [app purpose, platforms-iOS/Android/both, key features, launch timeline]",
      business_apps: "Hi! Can you provide a quotation for a custom business tool? What I need: [current process, features required, team size, budget]",
      design: "Hi! I need a quotation for UI/UX design. Project details: [what it's for, design style, revisions, timeline and budget]",
      ai_solutions: "Hi! Can you quote for AI integration? What I need: [current system, AI capabilities required, expected ROI, timeline]",
    },
  },
  hi: {
    cta_whatsapp_msg: "नमस्ते! मुझे वेबसाइट/ऐप के लिए कोटेशन चाहिए। मेरी जरूरत: [अपनी आवश्यकता बताएं]",
    service_msgs: {
      websites: "नमस्ते! मुझे प्रोफेशनल वेबसाइट के लिए कोटेशन चाहिए। मेरा बिजनेस: [टाइप], फीचर्स: [क्या चाहिए], समय सीमा: [कब तक], बजट: [रेंज]",
      stores: "नमस्ते! ऑनलाइन स्टोर के लिए कोटेशन चाहिए। उत्पाद: [कौन से], फीचर्स: [क्या चाहिए], मासिक लक्ष्य: [कितना], लॉन्च: [कब]",
      mobile_apps: "नमस्ते! मोबाइल ऐप के लिए कोटेशन चाहिए। उद्देश्य: [ऐप क्या करेगा], प्लेटफॉर्म: [iOS/Android/दोनों], फीचर्स: [सूची], समय: [कब]",
      business_apps: "नमस्ते! कस्टम टूल के लिए कोटेशन चाहिए। वर्तमान प्रक्रिया: [समझाएं], जरूरी फीचर्स: [सूची], टीम साइज़: [कितने यूजर], बजट: [रेंज]",
      design: "नमस्ते! डिजाइन के लिए कोटेशन चाहिए। प्रोजेक्ट: [किस तरह का], स्टाइल: [पसंद], संशोधन: [कितने], समय और बजट: [विवरण]",
      ai_solutions: "नमस्ते! AI इंटीग्रेशन के लिए कोटेशन चाहिए। वर्तमान सिस्टम: [विवरण], AI क्षमता: [क्या चाहिए], अपेक्षित ROI: [क्या चाहते हैं], समय: [कब]",
    },
  },
  hinglish: {
    cta_whatsapp_msg: "Hi! Mujhe quotation chahiye ek website/app ke liye. Mera requirement: [describe your needs]",
    service_msgs: {
      websites: "Hi! Mujhe quotation chahiye professional website ke liye. Mera business: [type], features: [what you need], timeline: [when], budget: [range]",
      stores: "Hi! Online store quotation chahiye. Products: [what type], features: [required], target sales: [monthly], launch: [when needed]",
      mobile_apps: "Hi! Mobile app quotation chahiye. Purpose: [app kya karega], Platform: [iOS/Android/both], Features: [list], Timeline: [when]",
      business_apps: "Hi! Custom tool quotation chahiye. Current process: [explain], Features needed: [list], Team size: [how many users], Budget: [range]",
      design: "Hi! Design quotation chahiye. Project: [what type], Style: [preferred], Revisions: [how many], Timeline aur Budget: [details]",
      ai_solutions: "Hi! AI integration quotation chahiye. Current system: [details], AI capabilities: [what needed], Expected ROI: [what you expect], Timeline: [when]",
    },
  },
};

const WA_BASE = "https://wa.me/918859820935?text=";
const waLink = (msg: string) => `${WA_BASE}${encodeURIComponent(msg)}`;

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

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
  { name: "OpenAI API", color: "#00a67e" },
  { name: "Stripe", color: "#635bff" },
  { name: "Firebase", color: "#ffca28" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "GraphQL", color: "#e535ab" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "Redis", color: "#dc382d" },
  { name: "LangChain", color: "#1c3c3c" },
];

export default function KraftAILanding() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const orbCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrambleText, setScrambleText] = useState("Build.");
  const activeStepRef = useRef(0);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHoveringInteractive = useRef(false);

  // Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
      const target = e.target as HTMLElement;
      isHoveringInteractive.current = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      );
    };

    let rafId: number;
    const animateRing = () => {
      const lerp = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;
      if (cursorRingRef.current) {
        const size = isHoveringInteractive.current ? 60 : 36;
        cursorRingRef.current.style.width = `${size}px`;
        cursorRingRef.current.style.height = `${size}px`;
        cursorRingRef.current.style.left = `${ringPos.current.x}px`;
        cursorRingRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animateRing);
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = "";
    };
  }, []);

  // Text scramble effect
  useEffect(() => {
    const target = "Build.";
    const runScramble = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setScrambleText(
          target
            .split("")
            .map((char, i) => {
              if (i < iteration) return char;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        iteration += 1 / 3;
        if (iteration >= target.length) {
          clearInterval(interval);
          setScrambleText(target);
        }
      }, 40);
    };

    runScramble();
    const loop = setInterval(runScramble, 7000);
    return () => clearInterval(loop);
  }, []);

  // Hero canvas particles
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        r: 0.5 + Math.random() * 2,
      });
    }

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,224,0.5)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,224,${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Process orb canvas
  useEffect(() => {
    const canvas = orbCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth * 2);
    let h = (canvas.height = canvas.offsetHeight * 2);
    ctx.scale(2, 2);
    const cw = w / 2;
    const ch = h / 2;

    const hues = [185, 210, 260, 40];
    let rafId: number;
    let time = 0;

    const draw = () => {
      time += 0.01;
      const step = activeStepRef.current;
      const hue = hues[step];
      ctx.clearRect(0, 0, cw, ch);

      // Grid
      ctx.strokeStyle = `hsla(${hue}, 60%, 50%, 0.06)`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < cw; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ch);
        ctx.stroke();
      }
      for (let y = 0; y < ch; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
        ctx.stroke();
      }

      const cx = cw / 2;
      const cy = ch / 2;

      // Expanding rings
      for (let i = 0; i < 3; i++) {
        const radius = 40 + ((time * 30 + i * 50) % 120);
        const alpha = 0.3 * (1 - radius / 160);
        if (alpha > 0) {
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Central orb glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      grad.addColorStop(0, `hsla(${hue}, 90%, 65%, 0.6)`);
      grad.addColorStop(0.5, `hsla(${hue}, 80%, 50%, 0.2)`);
      grad.addColorStop(1, `hsla(${hue}, 60%, 40%, 0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 90%, 70%, 0.9)`;
      ctx.fill();

      // Step number
      ctx.font = "bold 120px 'Syne', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `hsla(${hue}, 60%, 50%, 0.06)`;
      ctx.fillText(`0${step + 1}`, cx, cy);

      rafId = requestAnimationFrame(draw);
    };

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * 2;
      h = canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Process step auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % 4;
        activeStepRef.current = next;
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal + count-up
  useEffect(() => {
    const revealEls = document.querySelectorAll(".scroll-reveal");
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObs.observe(el));
    // Trigger reveal for elements already in viewport on mount
    const triggerVisible = () => {
      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > 0) {
          el.classList.add("in");
        }
      });
      countEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const target = parseInt((el as HTMLElement).dataset.count || "0", 10);
          const suffix = (el as HTMLElement).dataset.suffix || "";
          const duration = 1600;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          countObs.unobserve(el);
        }
      });
    };
    setTimeout(triggerVisible, 100);
    // Also trigger on first scroll
    const onFirstScroll = () => { triggerVisible(); window.removeEventListener("scroll", onFirstScroll); };
    window.addEventListener("scroll", onFirstScroll, { passive: true });

    // Count-up
    const countEls = document.querySelectorAll<HTMLElement>("[data-count]");
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.count || "0", 10);
            const suffix = el.dataset.suffix || "";
            const duration = 1600;
            const start = performance.now();
            const animate = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = `${Math.round(target * eased)}${suffix}`;
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            countObs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    countEls.forEach((el) => countObs.observe(el));

    return () => {
      revealObs.disconnect();
      countObs.disconnect();
    };
  }, []);

  const handleCardMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  const processSteps = [
    { num: "01", title: "Discovery Call", desc: "Tell us your idea — no forms, no gatekeeping. A quick conversation to understand your goals, timeline, and constraints." },
    { num: "02", title: "Blueprint & Scope", desc: "We architect the system, design the user flows, and deliver a clear roadmap with milestones and a firm quote." },
    { num: "03", title: "Build & Iterate", desc: "Weekly demos and agile sprints. You see real working software every week and can steer the direction at any point." },
    { num: "04", title: "Ship & You Own It", desc: "We push to your infrastructure. Full source code, docs, and zero vendor lock-in. It's yours. Permanently." },
  ];

  const whyCards = [
    { ghost: "01", title: "You own everything", desc: "Every line of code, every asset, every credential. Deployed on your infrastructure with your accounts. No strings. No hostage situations.", tag: "Ownership", tagColor: "#00ffe0" },
    { ghost: "02", title: "No bloat. No fluff.", desc: "We don't pad hours or stack features you never asked for. Lean builds, sharp code, nothing wasted. You pay for what matters.", tag: "Precision", tagColor: "#ffb830" },
    { ghost: "03", title: "Talk to the builder", desc: "No account managers, no relay chains. You talk directly to the people writing the code. Faster decisions, fewer misunderstandings.", tag: "Direct", tagColor: "#ff2d78" },
    { ghost: "04", title: "India pricing, global quality", desc: "World-class engineering at rates that make sense. We compete on skill, not geography. The value speaks for itself.", tag: "Value", tagColor: "#00ffe0" },
  ];

  const marqueeItems = "Custom Software \u2726 Mobile Apps \u2726 AI Integration \u2726 E-Commerce \u2726 UI / UX Design \u2726 Business Automation \u2726 Full Code Ownership \u2726 Cloud Deployment \u2726 ";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        :root {
          --bg: #050508;
          --ink: #f0f0f8;
          --muted: rgba(240,240,248,0.42);
          --cyan: #00ffe0;
          --amber: #ffb830;
          --magenta: #ff2d78;
          --surface: #0c0c14;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--bg);
          color: var(--ink);
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--cyan);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
        }

        .cursor-ring {
          position: fixed;
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(0,255,224,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s;
        }

        /* Nav */
        .kraft-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 52px;
          background: transparent;
        }
        .kraft-nav::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(5,5,8,0.95), transparent);
          z-index: -1;
          pointer-events: none;
        }
        .nav-logo {
          font-family: 'Space Mono', monospace;
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none;
        }
        .nav-logo span { color: var(--cyan); }
        .nav-links {
          display: flex;
          gap: 36px;
        }
        .nav-links a {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-pill {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: var(--cyan);
          color: #000;
          padding: 10px 24px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          transition: box-shadow 0.3s, transform 0.2s;
          white-space: nowrap;
        }
        .nav-pill:hover {
          box-shadow: 0 0 32px rgba(0,255,224,0.4);
          transform: translateY(-1px);
        }

        /* Hero */
        .hero {
          position: relative;
          min-height: 100vh;
          padding: 120px 52px 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }
        .eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          color: var(--cyan);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
          animation: revealUp 0.7s ease both;
          animation-delay: 0.1s;
        }
        .eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          animation: pulse 2s infinite;
        }

        .hero-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(64px, 9.5vw, 148px);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
          margin-bottom: 0;
        }
        .hero-line {
          display: block;
          overflow: hidden;
        }
        .hero-line-inner {
          display: block;
          animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-line:nth-child(1) .hero-line-inner { animation-delay: 0.2s; }
        .hero-line:nth-child(2) .hero-line-inner { animation-delay: 0.35s; }
        .hero-line:nth-child(3) .hero-line-inner { animation-delay: 0.5s; }

        .text-cyan { color: var(--cyan); }

        .strike-wrap {
          position: relative;
          display: inline;
          color: var(--muted);
        }
        .strike-wrap::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 3px;
          background: var(--magenta);
          transform-origin: left;
          animation: strikeThrough 0.6s ease both;
          animation-delay: 1.4s;
        }

        .hero-right {
          position: absolute;
          right: 52px;
          bottom: 80px;
          text-align: right;
          z-index: 2;
        }
        .hero-desc {
          font-family: 'Space Mono', monospace;
          font-size: 16px;
          color: var(--muted);
          max-width: 320px;
          line-height: 1.75;
          margin-bottom: 28px;
          margin-left: auto;
        }
        .cta-group {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: var(--cyan);
          color: #000;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 700;
          transition: box-shadow 0.3s, transform 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          box-shadow: 0 0 32px rgba(0,255,224,0.4);
          transform: translateY(-2px);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--muted);
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          border: 1px solid rgba(240,240,248,0.18);
          transition: border-color 0.3s, color 0.3s;
          cursor: pointer;
          background: transparent;
        }
        .btn-secondary:hover {
          border-color: var(--cyan);
          color: var(--ink);
        }

        .scroll-indicator {
          position: absolute;
          left: 52px;
          bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 2;
        }
        .scroll-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          writing-mode: vertical-rl;
        }
        .scroll-bar {
          width: 1px;
          height: 48px;
          background: rgba(240,240,248,0.1);
          position: relative;
          overflow: hidden;
        }
        .scroll-bar::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 12px;
          background: var(--cyan);
          animation: scrollDown 1.8s ease infinite;
        }

        /* Marquee */
        .marquee-bar {
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: #08080f;
          overflow: hidden;
          padding: 18px 0;
          position: relative;
          z-index: 1;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: runMarquee 20s linear infinite;
        }
        .marquee-track span {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          white-space: nowrap;
          padding: 0 4px;
        }

        /* Impact Numbers */
        .impact-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #08080f;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
          z-index: 1;
        }
        .impact-cell {
          padding: 52px 36px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .impact-cell:last-child { border-right: none; }
        .impact-num {
          font-family: 'Syne', sans-serif;
          font-size: 64px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 8px;
        }
        .impact-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        /* Section common */
        .section-tag {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--cyan);
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 20px;
        }
        .section-subtitle {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: var(--muted);
          max-width: 480px;
          line-height: 1.7;
          margin-bottom: 52px;
        }

        /* Bento Grid */
        .bento-section {
          padding: 80px 52px;
          position: relative;
          z-index: 1;
        }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .bento-card {
          background: var(--surface);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .bento-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,255,224,0.12), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .bento-card:hover {
          border-color: rgba(0,255,224,0.3);
          transform: translateY(-4px);
        }
        .bento-card:hover::before { opacity: 1; }

        .bento-featured {
          grid-column: span 3;
          grid-row: span 2;
          background: linear-gradient(135deg, #0c0c14 0%, #0f1020 50%, #0c0c14 100%);
        }
        .bento-3 { grid-column: span 3; }
        .bento-2 { grid-column: span 2; }
        .bento-4 { grid-column: span 4; }

        .bento-ghost {
          font-family: 'Syne', sans-serif;
          font-size: 80px;
          font-weight: 800;
          position: absolute;
          right: 24px;
          top: 16px;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
        }
        .bento-featured .bento-ghost {
          font-size: 160px;
          right: 20px;
          top: 10px;
        }
        .bento-icon {
          margin-bottom: 20px;
          color: var(--cyan);
        }
        .bento-num {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .bento-name {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--ink);
        }
        .bento-featured .bento-name {
          font-size: 32px;
        }
        .bento-desc {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.7;
        }
        .bento-badge {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 5px 14px;
          border-radius: 999px;
          background: rgba(0,255,224,0.1);
          color: var(--cyan);
          margin-top: 16px;
        }

        /* Process */
        .process-section {
          background: #07070d;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 80px 52px;
          position: relative;
          z-index: 1;
        }
        .process-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .process-step {
          padding: 24px 28px;
          border-left: 2px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.4s;
          margin-bottom: 8px;
        }
        .process-step.active {
          border-left-color: var(--cyan);
          background: rgba(0,255,224,0.03);
        }
        .process-step-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .process-step-num {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--cyan);
          opacity: 0.6;
        }
        .process-step.active .process-step-num { opacity: 1; }
        .process-step-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--muted);
          transition: color 0.3s;
        }
        .process-step.active .process-step-title { color: var(--ink); }
        .process-step-desc {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.75;
          margin-top: 14px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s ease, opacity 0.4s, margin-top 0.4s;
        }
        .process-step.active .process-step-desc {
          max-height: 200px;
          opacity: 1;
          margin-top: 14px;
        }
        .orb-canvas-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          max-width: 480px;
          margin: 0 auto;
        }
        .orb-canvas {
          width: 100%;
          height: 100%;
        }

        /* Tech */
        .tech-section {
          background: #08080f;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 72px 52px;
          position: relative;
          z-index: 1;
        }
        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: var(--ink);
          padding: 12px 22px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          transition: all 0.3s;
          text-decoration: none;
          background: transparent;
        }
        .tech-pill:hover {
          border-color: var(--cyan);
          background: rgba(0,255,224,0.05);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,255,224,0.1);
        }
        .tech-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* Why */
        .why-section {
          position: relative;
          z-index: 1;
          padding: 80px 52px;
        }
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: rgba(255,255,255,0.04);
        }
        .why-card {
          background: var(--bg);
          padding: 60px 52px;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .why-card:hover { background: #0a0a14; }
        .why-ghost {
          font-family: 'Syne', sans-serif;
          font-size: 96px;
          font-weight: 800;
          line-height: 1;
          -webkit-text-stroke: 1px rgba(255,255,255,0.06);
          color: transparent;
          position: absolute;
          right: 32px;
          top: 24px;
          pointer-events: none;
        }
        .why-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 16px;
        }
        .why-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 14px;
          color: var(--ink);
        }
        .why-desc {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.75;
          max-width: 380px;
        }

        /* CTA */
        .cta-section {
          text-align: center;
          padding: 100px 52px;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .cta-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0,255,224,0.08) 0%, rgba(255,45,120,0.04) 40%, transparent 70%);
          animation: breathe 5s ease-in-out infinite;
          pointer-events: none;
        }
        .cta-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: var(--cyan);
          margin-bottom: 24px;
          position: relative;
        }
        .cta-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(52px, 7vw, 104px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 28px;
          position: relative;
        }
        .cta-gradient {
          background: linear-gradient(135deg, var(--cyan), var(--magenta));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-desc {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: var(--muted);
          max-width: 480px;
          margin: 0 auto 40px;
          line-height: 1.75;
          position: relative;
        }
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }

        /* Footer */
        .kraft-footer {
          background: #030306;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 36px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .footer-logo {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none;
        }
        .footer-logo span { color: var(--cyan); }
        .footer-links {
          display: flex;
          gap: 28px;
        }
        .footer-links a {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-links a:hover { color: var(--ink); }
        .footer-copy {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--muted);
        }

        /* Scroll reveal */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scroll-reveal.in {
          opacity: 1;
          transform: none;
        }

        /* Keyframes */
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(110%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,255,224,0.7); }
          50% { opacity: 0.6; box-shadow: 0 0 8px 4px rgba(0,255,224,0.3); }
        }
        @keyframes strikeThrough {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes runMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
        }
        @keyframes scrollDown {
          0% { top: -100%; }
          100% { top: 200%; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .kraft-nav {
            padding: 16px 20px;
          }
          .nav-links { display: none !important; }

          .hero {
            padding: 100px 20px 60px;
          }
          .hero-right {
            position: relative;
            right: auto;
            bottom: auto;
            text-align: left;
            margin-top: 48px;
          }
          .hero-desc {
            margin-left: 0;
            text-align: left;
          }
          .cta-group {
            align-items: flex-start;
          }
          .scroll-indicator { display: none; }
          .hero-headline {
            font-size: clamp(42px, 12vw, 80px);
          }

          .marquee-bar { padding: 14px 0; }

          .impact-section {
            grid-template-columns: 1fr 1fr;
          }
          .impact-cell {
            padding: 32px 20px;
          }
          .impact-num { font-size: 40px; }

          .bento-section { padding: 60px 20px; }
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-featured,
          .bento-3,
          .bento-2,
          .bento-4 {
            grid-column: span 1;
            grid-row: span 1;
          }

          .process-section { padding: 60px 20px; }
          .process-layout {
            grid-template-columns: 1fr;
          }
          .orb-canvas-wrap { display: none; }

          .tech-section { padding: 60px 20px; }

          .why-section { padding: 60px 20px; }
          .why-grid {
            grid-template-columns: 1fr;
          }
          .why-card { padding: 40px 24px; }

          .cta-section { padding: 80px 20px; }

          .kraft-footer {
            flex-direction: column;
            gap: 16px;
            text-align: center;
            padding: 36px 20px;
          }

          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* Nav */}
      <nav className="kraft-nav">
        <a href="/" className="nav-logo">Kraft<span>AI</span></a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#why-us">Why Us</a>
        </div>
        <a href={waLink(translations.en.cta_whatsapp_msg)} target="_blank" rel="noopener noreferrer" className="nav-pill">
          {"Let's build \u2192"}
        </a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <canvas ref={heroCanvasRef} className="hero-canvas" />
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Custom software &middot; AI solutions &middot; Full ownership
          </div>
          <h1 className="hero-headline">
            <span className="hero-line"><span className="hero-line-inner">You Think.</span></span>
            <span className="hero-line"><span className="hero-line-inner">We <span className="text-cyan">{scrambleText}</span></span></span>
            <span className="hero-line">
              <span className="hero-line-inner">
                You <span className="strike-wrap">Pay Forever</span> Own.
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-right">
          <p className="hero-desc">
            Custom apps, websites, and AI systems — crafted to your exact spec. You get the code. You keep the keys.
          </p>
          <div className="cta-group">
            <a
              href={waLink(translations.en.cta_whatsapp_msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a href="#services" className="btn-secondary">
              Explore what we build &darr;
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-bar" />
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-bar">
        <div className="marquee-track">
          <span>{marqueeItems}</span>
          <span>{marqueeItems}</span>
        </div>
      </div>

      {/* Impact Numbers */}
      <div className="impact-section scroll-reveal">
        <div className="impact-cell">
          <div className="impact-num">
            <span data-count="100" data-suffix="%">0%</span>
          </div>
          <div className="impact-label">Code ownership</div>
        </div>
        <div className="impact-cell">
          <div className="impact-num">
            <span data-count="0" data-suffix="ms" style={{ color: "var(--cyan)" }}>0ms</span>
          </div>
          <div className="impact-label">Compromise</div>
        </div>
        <div className="impact-cell">
          <div className="impact-num">
            <span style={{ color: "var(--ink)" }}>24</span>
            <span style={{ color: "var(--amber)" }}>/7</span>
          </div>
          <div className="impact-label">Support coverage</div>
        </div>
        <div className="impact-cell">
          <div className="impact-num">
            <span style={{ color: "var(--ink)" }}>1</span>
            <span style={{ color: "var(--magenta)" }}>&times;</span>
          </div>
          <div className="impact-label">Pay once, own forever</div>
        </div>
      </div>

      {/* Services Bento */}
      <section id="services" className="bento-section">
        <div className="scroll-reveal">
          <div className="section-tag">{"\u2726"} What we build</div>
          <div className="section-title">The full stack, your way</div>
          <div className="section-subtitle">
            Every service comes with full source code handover. No lock-in, no recurring license fees, no surprises.
          </div>
        </div>

        <div className="bento-grid scroll-reveal">
          {/* AI Solutions - Featured */}
          <a
            href={waLink(translations.en.service_msgs.ai_solutions)}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-featured"
            onMouseMove={handleCardMouse}
          >
            <span className="bento-ghost">{"\u2605"}</span>
            <div className="bento-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 10v2" />
                <circle cx="12" cy="16" r="4" />
                <path d="M8 16h.01M16 16h.01" />
                <path d="M12 20v2" />
                <path d="M4 12h2M18 12h2" />
              </svg>
            </div>
            <div className="bento-name" style={{ fontSize: "32px" }}>AI Solutions</div>
            <div className="bento-desc">
              Intelligent automation, custom LLMs, chatbots, and AI-powered features integrated into your existing systems or built from scratch.
            </div>
            <span className="bento-badge">Trending</span>
          </a>

          {/* Websites */}
          <a
            href={waLink(translations.en.service_msgs.websites)}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-3"
            onMouseMove={handleCardMouse}
          >
            <span className="bento-ghost">01</span>
            <div className="bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="bento-num">01</div>
            <div className="bento-name">Websites</div>
            <div className="bento-desc">Marketing sites, landing pages, dashboards, and web apps. Fast, responsive, SEO-optimized.</div>
          </a>

          {/* Mobile Apps */}
          <a
            href={waLink(translations.en.service_msgs.mobile_apps)}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-2"
            onMouseMove={handleCardMouse}
          >
            <span className="bento-ghost">02</span>
            <div className="bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div className="bento-num">02</div>
            <div className="bento-name">Mobile Apps</div>
            <div className="bento-desc">Native and cross-platform apps for iOS and Android. Flutter, React Native, or fully native.</div>
          </a>

          {/* E-Commerce */}
          <a
            href={waLink(translations.en.service_msgs.stores)}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-2"
            onMouseMove={handleCardMouse}
          >
            <span className="bento-ghost">03</span>
            <div className="bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="bento-num">03</div>
            <div className="bento-name">E-Commerce</div>
            <div className="bento-desc">Online stores with payments, inventory, and order management. Stripe, Razorpay, custom checkout.</div>
          </a>

          {/* Business Applications */}
          <a
            href={waLink(translations.en.service_msgs.business_apps)}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-4"
            onMouseMove={handleCardMouse}
          >
            <span className="bento-ghost">04</span>
            <div className="bento-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div className="bento-num">04</div>
            <div className="bento-name">Business Applications</div>
            <div className="bento-desc">CRMs, ERPs, internal dashboards, admin panels, and custom workflow tools tailored to your operations.</div>
          </a>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="process-section">
        <div className="scroll-reveal">
          <div className="section-tag">{"\u2726"} How it works</div>
          <div className="section-title">From idea to production</div>
          <div className="section-subtitle">
            A clear, four-step process designed for speed and transparency. No surprises, no scope creep.
          </div>
        </div>

        <div className="process-layout">
          <div>
            {processSteps.map((step, i) => (
              <div
                key={i}
                className={`process-step${activeStep === i ? " active" : ""}`}
                onClick={() => {
                  setActiveStep(i);
                  activeStepRef.current = i;
                }}
              >
                <div className="process-step-header">
                  <span className="process-step-num">{step.num}</span>
                  <span className="process-step-title">{step.title}</span>
                </div>
                <div className="process-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
          <div className="orb-canvas-wrap">
            <canvas ref={orbCanvasRef} className="orb-canvas" />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-section">
        <div className="scroll-reveal">
          <div className="section-tag">{"\u2726"} Our stack</div>
          <div className="section-title">Technologies we&apos;ve mastered</div>
          <div className="section-subtitle">
            Battle-tested tools chosen for reliability, performance, and developer experience.
          </div>
        </div>
        <div className="tech-grid scroll-reveal">
          {techPills.map((t) => (
            <span key={t.name} className="tech-pill">
              <span className="tech-dot" style={{ background: t.color }} />
              {t.name}
            </span>
          ))}
        </div>
      </section>

      {/* Why KraftAI */}
      <section id="why-us" className="why-section">
        <div className="scroll-reveal">
          <div className="section-tag">{"\u2726"} Why us</div>
          <div className="section-title">Why KraftAI</div>
          <div className="section-subtitle">
            We are builders, not agencies. Here is what makes us different.
          </div>
        </div>
        <div className="why-grid scroll-reveal">
          {whyCards.map((card, i) => (
            <div key={i} className="why-card">
              <span className="why-ghost">{card.ghost}</span>
              <div className="why-tag" style={{ color: card.tagColor }}>{card.tag}</div>
              <div className="why-title">{card.title}</div>
              <div className="why-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-eyebrow" style={{ position: "relative" }}>{"// Your idea deserves to exist"}</div>
        <h2 className="cta-headline" style={{ position: "relative" }}>
          {"Let's make "}
          <span className="cta-gradient">something real.</span>
        </h2>
        <p className="cta-desc">
          {"Whether it's a landing page, a full-stack platform, or an AI-powered system — let's talk. No pressure, no pitch decks. Just a conversation."}
        </p>
        <div className="cta-buttons">
          <a
            href={waLink(translations.en.cta_whatsapp_msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <a
            href="mailto:hritikchaudhary016@gmail.com"
            className="btn-secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4l-10 8L2 4" />
            </svg>
            Send an email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="kraft-footer">
        <a href="/" className="footer-logo">Kraft<span>AI</span></a>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#why-us">Why Us</a>
        </div>
        <div className="footer-copy">&copy; 2026 KraftAI &middot; kraftai.in</div>
      </footer>
    </>
  );
}

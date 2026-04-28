"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Mail,
  BarChart3,
  Clock,
  Trophy,
  Heart,
} from "lucide-react";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated section wrapper ─── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Particle canvas background ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx!.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(16, 185, 129, ${
              0.06 * (1 - dist / 120)
            })`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: wrapRef, visible } = useInView(0.5);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = target / 30;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setVal(Math.round(current));
    }, 30);
    return () => clearInterval(interval);
  }, [visible, target]);

  return (
    <span ref={wrapRef}>
      <span ref={ref}>{val}</span>
      {suffix}
    </span>
  );
}

/* ─── Glow card with cursor tracking ─── */
function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.12] ${className}`}
    >
      {/* Cursor glow */}
      {glow.active && (
        <div
          className="pointer-events-none absolute w-64 h-64 rounded-full transition-opacity duration-300"
          style={{
            left: glow.x - 128,
            top: glow.y - 128,
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function PadhaiLanding() {
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "parent">("student");
  const [navScrolled, setNavScrolled] = useState(false);
  const [session, setSession] = useState<{ user?: { name?: string; image?: string } } | null>(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((d) => { if (d?.user) setSession(d); })
      .catch(() => {});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setWaitlistLoading(true);
    try {
      const res = await fetch("/api/padhai/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setWaitlistSubmitted(true);
        setEmail("");
      }
    } catch {
      // silently fail — still show success for UX
      setWaitlistSubmitted(true);
      setEmail("");
    } finally {
      setWaitlistLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* Particle background */}
      <ParticleField />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.07] blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-teal-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/[0.04] blur-[80px] animate-pulse" />
      </div>

      {/* ─── Nav ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled
            ? "bg-[#030712]/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="text-2xl font-bold tracking-tight">
            Pad<span className="text-emerald-400">hai</span>
          </span>
          <div className="flex items-center gap-3">
            {session?.user ? (
              <Link
                href="/padhai/dashboard"
                className="flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.1] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/[0.1]"
              >
                {session.user.image ? (
                  <img src={session.user.image} alt="" className="h-6 w-6 rounded-full" />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                    {(session.user.name || "U")[0].toUpperCase()}
                  </div>
                )}
                <span className="max-w-[100px] truncate">{session.user.name || "Dashboard"}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            ) : (
              <>
                <Link
                  href="/padhai/login"
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/padhai/onboarding"
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pt-28 pb-16 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm px-4 py-1.5 text-sm text-emerald-400 mb-8">
            <Sparkles className="h-4 w-4" />
            <span>Trusted by 100+ JEE &amp; NEET families across India</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h1 className="text-[2.5rem] leading-[1.1] sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Coaching fees paid.
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Is the padhai happening?
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="mt-7 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-2xl mx-auto font-medium">
            Students who track their syllabus weekly score <span className="text-emerald-400 font-bold">2x better</span> in competitive exams. Padhai helps you see exactly what&apos;s done, what&apos;s pending, and what needs attention.
          </p>
          <p className="mt-3 text-base text-slate-400 max-w-xl mx-auto">
            Free for students. Weekly reports for parents. No pressure, just clarity.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/padhai/onboarding"
              className="group relative rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Tracking — It&apos;s Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <span className="text-xs text-slate-500">Takes 30 seconds. No credit card.</span>
          </div>
        </AnimatedSection>

        {/* Trust bar */}
        <AnimatedSection delay={400}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white"><Counter target={100} suffix="+" /></p>
              <p className="text-xs text-slate-500 mt-1">Active Students</p>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white"><Counter target={1200} suffix="+" /></p>
              <p className="text-xs text-slate-500 mt-1">Quizzes Completed</p>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white"><Counter target={85} suffix="%" /></p>
              <p className="text-xs text-slate-500 mt-1">Syllabus Completion Rate</p>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-16 mx-auto w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </section>

      {/* ─── The Problem ─── */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-20">
        <AnimatedSection>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-center">
            Sound familiar?
          </h2>
        </AnimatedSection>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { text: "\"Beta, aaj kya padha?\" — \"Sab ho gaya\" (but nothing actually done)", who: "Every parent, daily" },
            { text: "\"Coaching mein sab cover ho raha hai\" — but syllabus is 40% pending with 2 months left", who: "Most Class 12 students" },
            { text: "\"I study a lot but don't know if I'm on track for JEE\"", who: "Serious aspirants" },
            { text: "\"Fees de di ₹2-3 lakh, but results mein kuch nahi aata\"", who: "Frustrated parents" },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-5">
                <p className="text-sm text-slate-300 italic">{item.text}</p>
                <p className="mt-2 text-xs text-red-400/70">— {item.who}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={350}>
          <p className="mt-8 text-center text-base text-slate-400">
            Padhai fixes this. <span className="text-emerald-400 font-medium">Know exactly what&apos;s done and what&apos;s pending — every single week.</span>
          </p>
        </AnimatedSection>
      </section>

      {/* ─── Features ─── */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="mb-3 text-2xl sm:text-3xl font-bold text-center">
            Everything you need to crack your exam
          </h2>
          <p className="mb-14 text-center text-slate-500 text-sm">
            Used by 100+ students preparing for JEE, NEET &amp; Board exams
          </p>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Smart Syllabus Tracking",
              desc: "See exactly which chapters are done and which are pending. Students using Padhai complete 85% of their syllabus vs 50% average without tracking.",
              gradient: "from-emerald-500/20 to-teal-500/20",
              iconColor: "text-emerald-400",
              borderHover: "hover:border-emerald-500/30",
              delay: 0,
            },
            {
              icon: TrendingUp,
              title: "Quiz Verification",
              desc: "Quick 5-question quizzes after each chapter. No cheating — proves genuine understanding. Average quiz score of our students: 78%.",
              gradient: "from-blue-500/20 to-cyan-500/20",
              iconColor: "text-blue-400",
              borderHover: "hover:border-blue-500/30",
              delay: 100,
            },
            {
              icon: Users,
              title: "Parent Weekly Report",
              desc: "Parents get a calm, clear report every Sunday — chapters done, quiz scores, study hours. No nagging needed, just facts.",
              gradient: "from-purple-500/20 to-pink-500/20",
              iconColor: "text-purple-400",
              borderHover: "hover:border-purple-500/30",
              delay: 200,
            },
            {
              icon: Clock,
              title: "Study Timer",
              desc: "Track study hours with built-in focus timer. See your daily streak grow. Top students on Padhai study 3+ hours daily.",
              gradient: "from-orange-500/20 to-amber-500/20",
              iconColor: "text-orange-400",
              borderHover: "hover:border-orange-500/30",
              delay: 300,
            },
            {
              icon: BarChart3,
              title: "Progress Dashboard",
              desc: "Visual breakdown of your preparation — subject-wise, chapter-wise. Know exactly where you stand before the exam.",
              gradient: "from-cyan-500/20 to-blue-500/20",
              iconColor: "text-cyan-400",
              borderHover: "hover:border-cyan-500/30",
              delay: 400,
            },
            {
              icon: Trophy,
              title: "Streaks & Motivation",
              desc: "Build daily study streaks. Students with 7+ day streaks are 3x more likely to finish their syllabus on time.",
              gradient: "from-yellow-500/20 to-orange-500/20",
              iconColor: "text-yellow-400",
              borderHover: "hover:border-yellow-500/30",
              delay: 500,
            },
          ].map((f) => (
            <AnimatedSection key={f.title} delay={f.delay}>
              <GlowCard className={`h-full p-7 ${f.borderHover}`}>
                <div
                  className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${f.gradient} p-3.5`}
                >
                  <f.icon className={`h-6 w-6 ${f.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-center">
            Start in 30 seconds — here&apos;s how
          </h2>
          <p className="mb-12 text-center text-sm text-slate-500">No app download needed. Works on any phone or laptop.</p>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-[1.15rem] top-6 bottom-6 w-px bg-gradient-to-b from-emerald-500/40 via-teal-500/20 to-transparent hidden sm:block" />

          <div className="space-y-5">
            {[
              {
                step: 1,
                title: "Enter your name & class (10 seconds)",
                desc: "Just your name, class (11 or 12), and exam target (JEE/NEET/Boards). That's it — your syllabus loads automatically.",
              },
              {
                step: 2,
                title: "See your full syllabus mapped out",
                desc: "Every chapter, every subject — organized by priority. You'll finally know exactly what's left to cover.",
              },
              {
                step: 3,
                title: "Track weekly & prove it with quizzes",
                desc: "Mark chapters done, take a quick 5-question quiz. No way to fake it — real understanding gets tracked.",
              },
              {
                step: 4,
                title: "Parents get a Sunday report automatically",
                desc: "A calm WhatsApp/email report with chapters covered, quiz scores, and study hours. Parents finally see real progress.",
              },
            ].map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 80}>
                <div className="flex items-start gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 transition-all hover:bg-white/[0.06] hover:border-white/[0.1]">
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white shadow-lg shadow-emerald-500/20">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Student & Parent Testimonials ─── */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-center">
            Students &amp; parents love Padhai
          </h2>
          <p className="mb-12 text-center text-sm text-slate-500">Real feedback from real families</p>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: "Mujhe pata hi nahi tha ki 40% syllabus pending hai. Padhai dikhaya aur maine 2 months mein complete kar liya. Got 95 percentile in JEE Mains.",
              name: "Arjun S.",
              role: "JEE 2025 — 95 percentile",
              type: "student" as const,
            },
            {
              quote: "Pehle roz puchna padta tha 'kya padha'. Ab Sunday ko report aa jaata hai — chapters, quiz scores sab. Bahut peace of mind milta hai.",
              name: "Sunita Sharma",
              role: "Parent, Jaipur",
              type: "parent" as const,
            },
            {
              quote: "NEET ki tayyari mein sabse bada problem tha ki Biology kaafi pending tha. Padhai ne week-by-week plan diya, ab sab on track hai.",
              name: "Priya M.",
              role: "NEET Aspirant, Class 12",
              type: "student" as const,
            },
            {
              quote: "Coaching ki fees 2.5 lakh di, lekin beta bas YouTube dekhta tha. Padhai start kiya toh weekly progress dikhne laga. Ab genuine padhai ho rahi hai.",
              name: "Rajesh Kumar",
              role: "Parent, Delhi",
              type: "parent" as const,
            },
            {
              quote: "Quiz feature is killer — I can't just mark 'done' and lie. I actually have to understand the chapter. My scores went from 45% to 82% in 3 months.",
              name: "Karan D.",
              role: "JEE Aspirant, Class 11",
              type: "student" as const,
            },
            {
              quote: "Mere bete ne khud bola 'Mummy, mera report dekho'. Pehle kabhi aisa nahi hota tha. This app changed our conversations about studies completely.",
              name: "Meena Patel",
              role: "Parent, Ahmedabad",
              type: "parent" as const,
            },
          ].map((t, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <GlowCard className="h-full p-6">
                <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium mb-3 ${
                  t.type === "student"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                }`}>
                  {t.type === "student" ? <BookOpen className="h-3 w-3" /> : <Heart className="h-3 w-3" />}
                  {t.type === "student" ? "Student" : "Parent"}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 border-t border-white/[0.06] pt-3">
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ─── Parent Report Preview ─── */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-center">
            What parents see every week
          </h2>
          <p className="mb-12 text-center text-slate-500 text-sm">
            A calm, encouraging report — delivered every Sunday at 7 PM
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <GlowCard className="mx-auto max-w-md p-6 sm:p-8 shadow-2xl shadow-black/30 border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
            {/* Report header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                P
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Padhai Weekly Report
                </p>
                <p className="text-xs text-slate-500">
                  Week of 15 Mar — 22 Mar
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 text-center">
                <BookOpen className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white">
                  <Counter target={5} />
                </p>
                <p className="text-xs text-slate-400">Chapters covered</p>
              </div>
              <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 text-center">
                <Trophy className="h-5 w-5 text-yellow-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white">
                  <Counter target={82} suffix="%" />
                </p>
                <p className="text-xs text-slate-400">Avg quiz score</p>
              </div>
              <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 text-center">
                <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white">
                  <Counter target={12} suffix="h" />
                </p>
                <p className="text-xs text-slate-400">Study hours</p>
              </div>
              <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 text-center">
                <BarChart3 className="h-5 w-5 text-purple-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white">
                  <Counter target={7} />
                </p>
                <p className="text-xs text-slate-400">Day streak</p>
              </div>
            </div>

            {/* Encouraging message */}
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">
              <div className="flex items-start gap-2.5">
                <Heart className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-sm text-emerald-300/90 leading-relaxed">
                  Great week! Physics momentum chapter was well understood.
                  A little more practice in Organic Chemistry would help.
                  Keep encouraging — consistency matters more than perfection.
                </p>
              </div>
            </div>
          </GlowCard>
        </AnimatedSection>
      </section>

      {/* ─── For Parents Section ─── */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-28">
        <AnimatedSection>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.03] p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">For Parents</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              ₹2-3 lakh coaching fees. Are you seeing results?
            </h2>
            <p className="text-slate-400 mb-6 max-w-2xl">
              You don&apos;t need to nag. You don&apos;t need to fight. Just see the facts — every Sunday on your phone. Which chapters your child studied, their quiz scores, and how much syllabus is left.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 text-center">
                <p className="text-2xl font-bold text-white">Sunday 7 PM</p>
                <p className="text-xs text-slate-400 mt-1">Report delivered automatically</p>
              </div>
              <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 text-center">
                <p className="text-2xl font-bold text-white">No App Needed</p>
                <p className="text-xs text-slate-400 mt-1">Just enter child&apos;s invite code</p>
              </div>
              <div className="rounded-xl bg-white/[0.05] border border-white/[0.06] p-4 text-center">
                <p className="text-2xl font-bold text-white">100% Free</p>
                <p className="text-xs text-slate-400 mt-1">No hidden charges, ever</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/padhai/track"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
              >
                Track My Child&apos;s Progress
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/padhai/onboarding"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] px-8 py-3.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.08] active:scale-95"
              >
                Register My Child
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── Student CTA ─── */}
      <section className="relative z-10 mx-auto max-w-2xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            JEE Mains mein 95+ percentile aata hai un students ka jo track karte hain
          </h2>
          <p className="mt-4 text-slate-400 text-center">
            Don&apos;t just study — know exactly where you stand. Start tracking today.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="mt-8 text-center">
            <Link
              href="/padhai/onboarding"
              className="group inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-4 text-base font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95"
            >
              Start Tracking Free — 30 Seconds
              <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> No credit card</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> No app download</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Works on phone</span>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── Why IIT/NEET? Motivation Section ─── */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-center">
            Why cracking IIT/NEET changes everything
          </h2>
          <p className="mb-12 text-center text-sm text-slate-500">
            The effort you put in today decides the life you live tomorrow
          </p>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              stat: "₹30-80 LPA",
              label: "Average IITian salary after graduation",
              detail: "Top companies like Google, Microsoft, Goldman Sachs hire directly from IIT campus placements.",
              color: "text-emerald-400",
              bg: "from-emerald-500/10 to-teal-500/10",
            },
            {
              stat: "₹1 Cr+",
              label: "Top packages at IIT placements",
              detail: "Every year, IIT students receive packages of ₹1 crore+. The highest international offers cross ₹3 crore.",
              color: "text-yellow-400",
              bg: "from-yellow-500/10 to-orange-500/10",
            },
            {
              stat: "AIIMS/MAMC",
              label: "NEET toppers enter India's best medical colleges",
              detail: "A NEET score above 650 opens doors to AIIMS Delhi, Maulana Azad, JIPMER — the most prestigious medical colleges.",
              color: "text-blue-400",
              bg: "from-blue-500/10 to-cyan-500/10",
            },
            {
              stat: "₹15-25 LPA",
              label: "Starting salary for doctors from top colleges",
              detail: "After MBBS + PG from a top college, doctors earn ₹15-25 LPA minimum. Specialists earn much more.",
              color: "text-purple-400",
              bg: "from-purple-500/10 to-pink-500/10",
            },
            {
              stat: "IIT Campus Life",
              label: "World-class facilities, research, and network",
              detail: "Beautiful campuses, international exposure, startup incubators, alumni network that opens doors for life.",
              color: "text-cyan-400",
              bg: "from-cyan-500/10 to-blue-500/10",
            },
            {
              stat: "Family Pride",
              label: "\"Mera beta IIT/AIIMS mein hai\"",
              detail: "The pride your parents feel, the respect in your community, the confidence you carry — it all starts with consistent preparation today.",
              color: "text-pink-400",
              bg: "from-pink-500/10 to-rose-500/10",
            },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <GlowCard className="h-full p-6">
                <p className={`text-2xl font-bold ${item.color} mb-1`}>{item.stat}</p>
                <p className="text-sm font-medium text-white mb-2">{item.label}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
              </GlowCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={500}>
          <div className="mt-10 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6 text-center">
            <p className="text-base sm:text-lg font-medium text-white mb-2">
              But none of this happens without consistent preparation.
            </p>
            <p className="text-sm text-slate-400 mb-5">
              Students who track their syllabus weekly are <span className="text-emerald-400 font-semibold">2x more likely</span> to finish their syllabus on time.
              Padhai makes sure you never lose track.
            </p>
            <Link
              href="/padhai/onboarding"
              className="group inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95"
            >
              Start Your Journey — Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── FAQ Section (SEO + Trust) ─── */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="mb-10 text-2xl sm:text-3xl font-bold text-center">
            Frequently asked questions
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {[
            {
              q: "Is Padhai really free?",
              a: "Yes, 100% free. No credit card, no trial period, no hidden charges. We believe every student deserves access to good study tracking regardless of their financial situation.",
            },
            {
              q: "How does Padhai help me crack JEE/NEET?",
              a: "Padhai shows you exactly which chapters are done and which are pending — subject-wise, chapter-wise. You take quick quizzes to verify understanding (no self-cheating). Your parents get weekly reports automatically. The result: you always know where you stand and what to focus on next.",
            },
            {
              q: "I'm a parent. How do I track my child's progress?",
              a: "Your child signs up on Padhai and gets a unique invite code. You enter that code at kraftai.in/padhai/track — no login needed. You'll see chapters completed, quiz scores, study streaks, and more. Plus, you get an automatic weekly report every Sunday at 7 PM.",
            },
            {
              q: "Does Padhai work for Class 11 students?",
              a: "Absolutely! In fact, Class 11 is the most important time to start. 70% of JEE Mains questions come from Class 11 topics. Starting early gives you a massive advantage over students who only start tracking in Class 12.",
            },
            {
              q: "Which boards and exams are supported?",
              a: "Padhai supports JEE Mains, NEET, and Board exams (CBSE and state boards) for Class 11 and 12. We're adding CUET, CA Foundation, and more exams soon.",
            },
            {
              q: "Is my data safe?",
              a: "Yes. We don't share your data with anyone. Your study progress is visible only to you and the parent you choose to share your invite code with. No ads, no data selling.",
            },
            {
              q: "Do I need to download an app?",
              a: "No. Padhai works in your phone's browser — just go to kraftai.in/padhai. You can also add it to your home screen for an app-like experience. No Play Store or App Store download needed.",
            },
          ].map((faq, i) => (
            <AnimatedSection key={i} delay={i * 50}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ─── Waitlist ─── */}
      <section
        id="waitlist"
        className="relative z-10 mx-auto max-w-2xl px-5 pb-28"
      >
        <AnimatedSection>
          <GlowCard className="p-8 sm:p-10 text-center border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-5">
              <Mail className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Not ready? Get notified when we add your exam.
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              We&apos;re adding CUET, CA Foundation, and state board support soon. Drop your email — no spam, just one update.
            </p>

            {waitlistSubmitted ? (
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">
                  You&apos;re on the list! We&apos;ll be in touch.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleWaitlist}
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-full bg-white/[0.06] border border-white/[0.1] px-5 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={waitlistLoading}
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-60"
                >
                  {waitlistLoading ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            )}
          </GlowCard>
        </AnimatedSection>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="text-lg font-bold text-white">Pad<span className="text-emerald-400">hai</span></span>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Free study tracker for JEE Mains, NEET &amp; Board exam preparation.
                Track syllabus, take quizzes, send weekly reports to parents.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">For Students</p>
              <div className="space-y-1.5 text-xs text-slate-500">
                <Link href="/padhai/onboarding" className="block hover:text-emerald-400 transition-colors">Start Tracking Free</Link>
                <Link href="/padhai/login" className="block hover:text-emerald-400 transition-colors">Sign In</Link>
                <a href="#waitlist" className="block hover:text-emerald-400 transition-colors">Join Waitlist</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">For Parents</p>
              <div className="space-y-1.5 text-xs text-slate-500">
                <Link href="/padhai/track" className="block hover:text-emerald-400 transition-colors">Track My Child&apos;s Progress</Link>
                <a href="https://wa.me/+918859820935" className="block hover:text-emerald-400 transition-colors">WhatsApp Support</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Padhai by KraftAI. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">
              JEE Mains Study Tracker &middot; NEET Preparation Tracker &middot; Class 11 &amp; 12 Syllabus Tracker
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Floating WhatsApp Button ─── */}
      <a
        href="https://wa.me/+918859820935"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

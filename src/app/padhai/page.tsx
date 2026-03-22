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

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
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
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pt-28 pb-24 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm px-4 py-1.5 text-sm text-emerald-400 mb-8">
            <Sparkles className="h-4 w-4" />
            <span>For Class 11, 12, JEE &amp; NEET Students</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h1 className="text-[2.5rem] leading-[1.1] sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Study smarter,
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              not harder
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="mt-7 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-2xl mx-auto font-medium">
            Coaching laga di, fees bhar di — but kya sach mein padhai ho rahi hai?
          </p>
          <p className="mt-2 text-base text-slate-500 max-w-xl mx-auto">
            Track goals, verify with quizzes, keep parents updated. No pressure, just progress.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={250}>
          <p className="mt-5 text-base sm:text-lg font-medium bg-gradient-to-r from-emerald-400/80 to-teal-400/80 bg-clip-text text-transparent italic">
            &ldquo;Bacche ki padhai ka haal, har hafte apne phone pe&rdquo;
          </p>
        </AnimatedSection>

        <AnimatedSection delay={350}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/padhai/onboarding"
              className="group relative rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Tracking Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <a
              href="#waitlist"
              className="text-sm font-medium text-slate-500 hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-emerald-500"
            >
              or join the waitlist
            </a>
          </div>
        </AnimatedSection>

        {/* Fading gradient line */}
        <div className="mt-20 mx-auto w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </section>

      {/* ─── Features ─── */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="mb-3 text-2xl sm:text-3xl font-bold text-center">
            Everything you need to stay on track
          </h2>
          <p className="mb-14 text-center text-slate-500 text-sm">
            Built for Indian students preparing for competitive exams
          </p>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Weekly Goals",
              desc: "Set achievable weekly targets based on your syllabus. AI suggests chapters based on what you have covered.",
              gradient: "from-emerald-500/20 to-teal-500/20",
              iconColor: "text-emerald-400",
              borderHover: "hover:border-emerald-500/30",
              delay: 0,
            },
            {
              icon: TrendingUp,
              title: "Quick Quiz Verification",
              desc: "5-question rapid quizzes to verify you studied. Color-coded results show your genuine understanding.",
              gradient: "from-blue-500/20 to-cyan-500/20",
              iconColor: "text-blue-400",
              borderHover: "hover:border-blue-500/30",
              delay: 100,
            },
            {
              icon: Users,
              title: "Parent Updates",
              desc: "Weekly calm, supportive reports sent to your parents. No pressure, just progress updates they will appreciate.",
              gradient: "from-purple-500/20 to-pink-500/20",
              iconColor: "text-purple-400",
              borderHover: "hover:border-purple-500/30",
              delay: 200,
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
          <h2 className="mb-14 text-2xl sm:text-3xl font-bold text-center">
            How Padhai works
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[1.15rem] top-6 bottom-6 w-px bg-gradient-to-b from-emerald-500/40 via-teal-500/20 to-transparent hidden sm:block" />

          <div className="space-y-5">
            {[
              {
                step: 1,
                title: "Choose your class & exam",
                desc: "Select Class 11 or 12, and whether you are preparing for JEE, NEET, or Board exams.",
              },
              {
                step: 2,
                title: "Set weekly goals",
                desc: "AI suggests chapters based on your syllabus. You can modify and confirm your weekly plan.",
              },
              {
                step: 3,
                title: "Study & verify",
                desc: "Mark tasks as done, take quick quizzes to verify understanding, upload study photos.",
              },
              {
                step: 4,
                title: "Parents stay informed",
                desc: "Every Sunday, parents receive a calm, encouraging report with tips on how to support you.",
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

      {/* ─── Student or Parent Toggle + CTA ─── */}
      <section className="relative z-10 mx-auto max-w-2xl px-5 pb-28">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Ready to start your journey?
          </h2>
          <p className="mt-4 text-slate-400 text-center">
            Early access — be among the first to try Padhai
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex rounded-full bg-white/[0.05] border border-white/[0.08] p-1 backdrop-blur-sm">
              <button
                onClick={() => setUserType("student")}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  userType === "student"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                I&apos;m a Student
              </button>
              <button
                onClick={() => setUserType("parent")}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  userType === "parent"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                I&apos;m a Parent
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 mb-5">
              {userType === "student"
                ? "Track your goals, ace quizzes, build study streaks."
                : "Get weekly reports on your child's study progress."}
            </p>
            <Link
              href={`/padhai/onboarding?role=${userType}`}
              className="group inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95"
            >
              Get Started Free
              <ArrowRight className="ml-2 inline h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>
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
              Not ready yet? Join the waitlist.
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              We&apos;ll notify you when new features drop. No spam.
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
      <footer className="relative z-10 border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} Padhai by KraftAI. All rights
            reserved.
          </p>
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

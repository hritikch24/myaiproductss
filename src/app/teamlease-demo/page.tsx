'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Users, GraduationCap, Briefcase, Stethoscope, Hotel, Building2, ArrowRight, ArrowUpRight,
  ChevronDown, Menu, X, Phone, Mail, MapPin, Linkedin, Facebook, Twitter, MessageCircle,
  CheckCircle2, Star, Globe, Zap, Shield, TrendingUp, Award, Heart, Clock, Target,
  BookOpen, UserCheck, HeartPulse, ChefHat, Send, Play, Sparkles, Rocket,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const NAV_ITEMS = ['Home', 'About', 'Recruitment', 'Education', 'Contact'];

const STATS = [
  { value: 500, suffix: '+', label: 'Placements Made' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: '+', label: 'Partner Institutions' },
  { value: 12, suffix: '+', label: 'Years Experience' },
];

const RECRUITMENT_SERVICES = [
  {
    icon: HeartPulse,
    title: 'Healthcare Recruitment',
    desc: 'Doctors, nurses, surgeons, medical technicians, and para-medical staff placed across NHS and private hospitals throughout the UK.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Stethoscope,
    title: 'Medical Recruitment',
    desc: 'Specialized doctor placement services with rigorous vetting — multiple levels of tests and interviews ensure only the best candidates.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Briefcase,
    title: 'HR Recruitment',
    desc: 'Streamlined talent acquisition for startups and enterprises. We find the right people who align with your culture and vision.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Hotel,
    title: 'Hospitality Recruitment',
    desc: 'From five-star hotels to boutique restaurants — we staff the hospitality industry with experienced, passionate professionals.',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

const EDUCATION_SERVICES = [
  {
    icon: GraduationCap,
    title: 'University Admissions',
    desc: 'End-to-end guidance for UK university applications — from shortlisting to offer acceptance.',
    features: ['UCAS Application Support', 'Personal Statement Review', 'University Shortlisting'],
  },
  {
    icon: BookOpen,
    title: 'Course Counselling',
    desc: 'Expert advice on choosing the right course aligned with your career goals and academic background.',
    features: ['Career Path Mapping', 'Course Comparison', 'Scholarship Guidance'],
  },
  {
    icon: Globe,
    title: 'Visa & Immigration',
    desc: 'Complete visa support for international students — documentation, interview prep, and compliance.',
    features: ['Student Visa Processing', 'Document Preparation', 'Compliance Advisory'],
  },
  {
    icon: Target,
    title: 'Career Placement',
    desc: 'Bridging education and employment — we help graduates land their first role in the UK job market.',
    features: ['CV Building', 'Interview Coaching', 'Job Matching'],
  },
];

const TESTIMONIALS = [
  { name: 'Dr. Sarah Mitchell', role: 'NHS Trust Manager', text: 'Team Lease found us 12 qualified doctors within weeks. Their understanding of healthcare recruitment is unmatched.', rating: 5 },
  { name: 'Rahul Sharma', role: 'International Student', text: 'From university selection to visa approval — they guided me through every step. Now studying at University of Northampton!', rating: 5 },
  { name: 'James Crawford', role: 'Hotel Operations Director', text: 'Reliable, professional, and fast. They staffed our entire new property launch with top-tier hospitality talent.', rating: 5 },
  { name: 'Priya Patel', role: 'Medical Graduate', text: 'Their education consulting helped me choose the right postgraduate program, and their recruitment arm placed me right after.', rating: 5 },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'We understand your needs, goals, and timeline through a detailed consultation.' },
  { step: '02', title: 'Strategy', desc: 'Custom recruitment or education pathway designed specifically for you.' },
  { step: '03', title: 'Execution', desc: 'Rigorous screening, matching, and placement with continuous support.' },
  { step: '04', title: 'Success', desc: 'Ongoing relationship management ensuring long-term satisfaction.' },
];

/* ═══════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════ */

function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView();
  const count = useCountUp(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-sm text-white/60 mt-2 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
      <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-all duration-500 h-full">
        {children}
      </div>
    </div>
  );
}

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function TeamLeasePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'recruitment' | 'education'>('recruitment');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden selection:bg-cyan-500/30">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.5; }
          75% { transform: translateY(-30px) translateX(15px); opacity: 0.7; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.1); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.3); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-gradient-x { animation: gradient-x 6s ease infinite; background-size: 200% 200%; }
        .animate-orbit { animation: orbit 20s linear infinite; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#030712]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-cyan-500/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/25">
              TL
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">Team Lease</span>
              <span className="hidden sm:block text-[10px] text-white/40 uppercase tracking-[0.2em]">Consulting</span>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-300">
                {item}
              </button>
            ))}
            <a href="https://wa.me/447466066023" target="_blank" rel="noopener noreferrer" className="ml-4 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
              Get Started
            </a>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05]">
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-t border-white/[0.06] animate-slide-up">
            <div className="px-6 py-4 space-y-1">
              {NAV_ITEMS.map(item => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="block w-full text-left px-4 py-3 text-white/70 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">
                  {item}
                </button>
              ))}
              <a href="https://wa.me/447466066023" target="_blank" rel="noopener noreferrer" className="block w-full text-center mt-4 px-5 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold rounded-xl">
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center grid-bg">
        <ParticleField />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.04] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
          </div>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8 animate-slide-up">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs text-white/60 uppercase tracking-widest">UK&apos;s Leading Dual-Service Consultancy</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="block">Recruitment</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-x">
              &amp; Education
            </span>
            <span className="block mt-2 text-white/90">United.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mt-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            One partner for your entire UK journey — from finding the right course to landing the right career.
            We place the right candidate in the right organisation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={() => scrollTo('recruitment')} className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2">
              Explore Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollTo('contact')} className="px-8 py-4 border border-white/[0.1] rounded-2xl font-semibold text-lg text-white/80 hover:bg-white/[0.05] hover:border-white/[0.2] transition-all duration-500 flex items-center justify-center gap-2">
              <MessageCircle size={20} /> Book Consultation
            </button>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 text-white/30 text-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2"><Shield size={16} className="text-cyan-400/60" /> UK Registered</div>
            <div className="hidden sm:flex items-center gap-2"><Award size={16} className="text-violet-400/60" /> ISO Compliant</div>
            <div className="flex items-center gap-2"><Globe size={16} className="text-fuchsia-400/60" /> Global Network</div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-white/20" />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative py-20 border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map(s => <StatCounter key={s.label} {...s} />)}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs uppercase tracking-widest mb-6">
                <Zap size={12} /> About Us
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                A New Experience of{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Human Resource
                </span>
              </h2>
              <p className="text-white/50 text-lg mt-6 leading-relaxed">
                TL Consulting is a dynamic UK-based consultancy that uniquely combines recruitment expertise
                with education consulting. We serve as the vital conduit between organisations seeking top talent
                and individuals pursuing career excellence through the right education and placement.
              </p>
              <p className="text-white/40 mt-4 leading-relaxed">
                Operating across the UK, we specialise in healthcare, medical, HR, and hospitality recruitment
                while also guiding international students through university admissions, visa processes, and
                career placement — creating a seamless journey from education to employment.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: UserCheck, label: 'Vetted Candidates' },
                  { icon: Clock, label: 'Fast Turnaround' },
                  { icon: Shield, label: 'Compliance First' },
                  { icon: Heart, label: 'Long-term Support' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-white/60">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-cyan-400" />
                    </div>
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 md:p-12">
                <div className="space-y-6">
                  {[
                    { num: '01', title: 'Recruitment', desc: 'Healthcare, Medical, HR & Hospitality staffing across the UK.', color: 'text-cyan-400' },
                    { num: '02', title: 'Education', desc: 'University admissions, course counselling & visa support.', color: 'text-violet-400' },
                    { num: '03', title: 'Placement', desc: 'Bridging education and employment for lasting careers.', color: 'text-fuchsia-400' },
                  ].map(item => (
                    <div key={item.num} className="flex gap-5 group">
                      <div className={`text-3xl font-black ${item.color} opacity-30 group-hover:opacity-100 transition-opacity`}>{item.num}</div>
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES TABS ─── */}
      <section id="recruitment" className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs uppercase tracking-widest mb-6">
              <Rocket size={12} /> Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Two Pillars,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">One Vision</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">Whether you&apos;re hiring top talent or pursuing higher education — we&apos;re your single point of excellence.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/[0.04] border border-white/[0.06] rounded-2xl p-1.5">
              {(['recruitment', 'education'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-sm font-semibold capitalize transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {tab === 'recruitment' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Recruitment Cards */}
          {activeTab === 'recruitment' && (
            <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
              {RECRUITMENT_SERVICES.map(s => (
                <GlowCard key={s.title}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <s.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-white/45 leading-relaxed">{s.desc}</p>
                  <button onClick={() => scrollTo('contact')} className="mt-6 text-cyan-400 text-sm font-semibold flex items-center gap-1.5 group/btn hover:gap-3 transition-all">
                    Learn More <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </GlowCard>
              ))}
            </div>
          )}

          {/* Education Cards */}
          {activeTab === 'education' && (
            <div id="education" className="grid md:grid-cols-2 gap-6 animate-slide-up">
              {EDUCATION_SERVICES.map(s => (
                <GlowCard key={s.title}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center mb-6 shadow-lg">
                    <s.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-white/45 leading-relaxed mb-4">{s.desc}</p>
                  <div className="space-y-2">
                    {s.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircle2 size={14} className="text-violet-400 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </GlowCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs uppercase tracking-widest mb-6">
              <TrendingUp size={12} /> How We Work
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Process</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((p, i) => (
              <div key={p.step} className="relative group">
                {i < 3 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />}
                <div className="text-5xl font-black bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent mb-4">{p.step}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="relative py-24 md:py-32 border-y border-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 text-fuchsia-400 text-xs uppercase tracking-widest mb-6">
              <Star size={12} /> Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Hundreds</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(t => (
              <GlowCard key={t.name}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/60 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.role}</div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 border border-white/[0.08] p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Ready to Start Your{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">UK Journey?</span>
              </h2>
              <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg">
                Whether you&apos;re an employer seeking talent or a student pursuing dreams — let&apos;s make it happen together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="https://wa.me/447466066023" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> WhatsApp Us
                </a>
                <a href="tel:+447466066023" className="px-8 py-4 border border-white/[0.15] rounded-2xl font-semibold text-lg text-white/80 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone size={20} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs uppercase tracking-widest mb-6">
                <Send size={12} /> Get In Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Let&apos;s{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className="text-white/50 mt-4 text-lg">Have a question or ready to start? Reach out and we&apos;ll get back to you within 24 hours.</p>

              <div className="space-y-6 mt-10">
                {[
                  { icon: MapPin, label: 'Address', value: 'Abington Street, Northampton, NN1 2AJ, United Kingdom' },
                  { icon: Phone, label: 'Phone', value: '+44 7466 066023', href: 'tel:+447466066023' },
                  { icon: Mail, label: 'Email', value: 'contact@teamlease.uk', href: 'mailto:contact@teamlease.uk' },
                  { icon: MessageCircle, label: 'WhatsApp', value: '+44 7466 066023', href: 'https://wa.me/447466066023' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                      <Icon size={20} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 uppercase tracking-widest">{label}</div>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-white/70 hover:text-cyan-400 transition-colors mt-1 block">
                          {value}
                        </a>
                      ) : (
                        <div className="text-white/70 mt-1">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-10">
                {[
                  { icon: Facebook, href: 'https://facebook.com/teamleaseconsulting' },
                  { icon: Twitter, href: 'https://twitter.com/lease_ltd' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/team-lease-consulting' },
                ].map(({ icon: Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.12] transition-all">
                    <Icon size={18} className="text-white/50" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <GlowCard>
                <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                <form onSubmit={e => { e.preventDefault(); window.open(`https://wa.me/447466066023?text=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`)}`, '_blank'); }} className="space-y-4">
                  {[
                    { key: 'name', placeholder: 'Your Name', type: 'text' },
                    { key: 'email', placeholder: 'Your Email', type: 'email' },
                    { key: 'subject', placeholder: 'Subject', type: 'text' },
                  ].map(({ key, placeholder, type }) => (
                    <input
                      key={key}
                      type={type}
                      placeholder={placeholder}
                      value={formData[key as keyof typeof formData]}
                      onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all"
                      required
                    />
                  ))}
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all resize-none"
                    required
                  />
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-2">
                    <Send size={18} /> Send via WhatsApp
                  </button>
                </form>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.04] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-black text-lg">
                  TL
                </div>
                <div>
                  <span className="text-lg font-bold">Team Lease</span>
                  <span className="block text-[10px] text-white/40 uppercase tracking-[0.2em]">Consulting</span>
                </div>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Hiring the best for the best. Your trusted partner for recruitment services and
                education consulting across the United Kingdom.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Services</h4>
              <ul className="space-y-3">
                {['Healthcare Recruitment', 'Medical Recruitment', 'HR Recruitment', 'Hospitality Recruitment', 'Education Consulting'].map(s => (
                  <li key={s}><button onClick={() => scrollTo('recruitment')} className="text-white/35 hover:text-white/70 transition-colors text-sm">{s}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_ITEMS.map(item => (
                  <li key={item}><button onClick={() => scrollTo(item.toLowerCase())} className="text-white/35 hover:text-white/70 transition-colors text-sm">{item}</button></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-sm">&copy; {new Date().getFullYear()} Team Lease Consulting. All rights reserved.</p>
            <p className="text-white/15 text-xs">Abington Street, Northampton, NN1 2AJ, UK</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

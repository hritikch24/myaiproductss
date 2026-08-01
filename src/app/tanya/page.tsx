'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Sparkles, Star, Sun, Moon, Music, Coffee, Flower2, Crown, Infinity, ChevronRight, ChevronLeft, Gift, Mail, BookOpen, Camera, Gamepad2, MessageCircleHeart, ArrowRight, Check, X, ChevronDown } from 'lucide-react';

/* ═══════════════════════════════════════════════
   FLOATING HEARTS CANVAS
   ═══════════════════════════════════════════════ */

function Hearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    const hearts: { x: number; y: number; s: number; a: number; dx: number; dy: number; o: number; r: number }[] = [];
    for (let i = 0; i < 22; i++) {
      hearts.push({ x: Math.random() * w, y: Math.random() * h, s: 8 + Math.random() * 14, a: Math.random() * Math.PI * 2, dx: (Math.random() - 0.5) * 0.3, dy: -0.15 - Math.random() * 0.4, o: 0.05 + Math.random() * 0.08, r: Math.random() * 0.008 });
    }
    function drawHeart(cx: number, cy: number, size: number, opacity: number, angle: number) {
      if (!ctx) return;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle); ctx.globalAlpha = opacity;
      ctx.beginPath(); const s = size / 15;
      ctx.moveTo(0, -3 * s); ctx.bezierCurveTo(-8 * s, -14 * s, -18 * s, -4 * s, 0, 10 * s);
      ctx.moveTo(0, -3 * s); ctx.bezierCurveTo(8 * s, -14 * s, 18 * s, -4 * s, 0, 10 * s);
      ctx.fillStyle = '#fb7185'; ctx.fill(); ctx.restore();
    }
    let raf: number;
    function loop() {
      if (!ctx) return; ctx.clearRect(0, 0, w, h);
      hearts.forEach(p => {
        p.x += p.dx + Math.sin(p.a) * 0.3; p.y += p.dy; p.a += p.r;
        if (p.y < -30) { p.y = h + 30; p.x = Math.random() * w; }
        drawHeart(p.x, p.y, p.s, p.o, p.a);
      });
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" />;
}

/* ═══════════════════════════════════════════════
   SPARKLE ON TAP
   ═══════════════════════════════════════════════ */

function SparkBurst({ x, y }: { x: number; y: number }) {
  return (
    <div className="fixed pointer-events-none z-[60]" style={{ left: x, top: y }}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 25 + Math.random() * 25;
        return (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{
            background: ['#fb7185', '#f9a8d4', '#fbbf24', '#c084fc', '#38bdf8'][i % 5],
            animation: 'sparkle-fly 0.7s ease-out forwards',
            '--tx': `${Math.cos(angle) * dist}px`, '--ty': `${Math.sin(angle) * dist}px`,
          } as any} />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const PHOTOS = [
  { src: '/tanya/lake-portrait.jpeg', caption: 'The way you look at the world' },
  { src: '/tanya/portrait-hat.jpeg', caption: 'Main character energy, always' },
  { src: '/tanya/door-sitting.jpeg', caption: 'That smile. That vibe. That girl.' },
  { src: '/tanya/back-view.jpeg', caption: 'Every view is better with you in it' },
  { src: '/tanya/collage.jpeg', caption: 'Amer Fort, Jaipur — our adventure' },
];

const REASONS = [
  { icon: Sun, text: 'Your smile that makes the worst days feel okay', color: 'from-amber-400 to-orange-500' },
  { icon: Coffee, text: 'How you remember every little thing I say', color: 'from-amber-600 to-rose-500' },
  { icon: Music, text: 'Your laugh — the sound I never want to stop hearing', color: 'from-pink-400 to-rose-500' },
  { icon: Star, text: 'The way you believe in me even when I forget to', color: 'from-violet-400 to-purple-500' },
  { icon: Flower2, text: 'How you turn ordinary moments into memories', color: 'from-rose-400 to-pink-500' },
  { icon: Moon, text: 'Your patience, your warmth, your quiet magic', color: 'from-blue-400 to-violet-500' },
  { icon: Crown, text: 'Because you chose me. Every single day.', color: 'from-amber-400 to-rose-500' },
];

const QUIZ = [
  { q: "What does Hritik love most about you?", opts: ['Your looks', 'Your cooking', 'Everything about you', 'Your WiFi password'], ans: 2 },
  { q: "What would Hritik do without you?", opts: ['Be totally fine', 'Probably cry', 'Forget to eat', 'All of the above (except the first one)'], ans: 3 },
  { q: "How much does Hritik love you?", opts: ['A lot', 'More than pizza', 'More than sleep', 'Beyond measurement'], ans: 3 },
  { q: "What is Hritik's favorite place?", opts: ['The beach', 'The mountains', 'Home', 'Wherever you are'], ans: 3 },
];

const TIMELINE = [
  { label: 'The beginning', desc: 'When I first saw you and thought — okay, life just got interesting.', img: '/tanya/lake-portrait.jpeg' },
  { label: 'Late-night talks', desc: 'Hours felt like minutes. Silence felt comfortable. That is when I knew.', img: '/tanya/door-sitting.jpeg' },
  { label: 'Adventures together', desc: 'Jaipur, forts, sunsets — every place we go becomes our place.', img: '/tanya/collage.jpeg' },
  { label: 'Right now', desc: 'You, reading this, smiling. This is my favorite moment so far.', img: '/tanya/portrait-hat.jpeg' },
  { label: 'Everything ahead', desc: 'More cities, more memories, more reasons to choose you.', img: '/tanya/back-view.jpeg' },
];

const PAGES = [
  { id: 'cover', icon: Gift, label: 'Open' },
  { id: 'greeting', icon: Heart, label: 'Greeting' },
  { id: 'letter', icon: Mail, label: 'Letter' },
  { id: 'reasons', icon: BookOpen, label: 'Reasons' },
  { id: 'gallery', icon: Camera, label: 'Gallery' },
  { id: 'timeline', icon: Sparkles, label: 'Story' },
  { id: 'quiz', icon: Gamepad2, label: 'Quiz' },
  { id: 'promise', icon: MessageCircleHeart, label: 'Forever' },
];

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function GirlfriendDayPage() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Page state
  const [letterOpen, setLetterOpen] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [galIdx, setGalIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([null, null, null, null]);
  const [quizRevealed, setQuizRevealed] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);

  const goTo = useCallback((idx: number) => {
    if (animating || idx === page || idx < 0 || idx >= PAGES.length) return;
    setDir(idx > page ? 'next' : 'prev');
    setAnimating(true);
    setTimeout(() => { setPage(idx); setTimeout(() => setAnimating(false), 50); }, 300);
  }, [page, animating]);

  const nextPage = () => goTo(page + 1);
  const prevPage = () => goTo(page - 1);

  const handleClick = (e: React.MouseEvent) => {
    const id = Date.now();
    setSparks(s => [...s, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setSparks(s => s.filter(sp => sp.id !== id)), 900);
  };

  const revealNext = () => {
    setRevealed(prev => {
      const next = new Set(prev);
      for (let i = 0; i < REASONS.length; i++) {
        if (!next.has(i)) { next.add(i); return next; }
      }
      return next;
    });
  };

  const answerQuiz = (optIdx: number) => {
    if (quizRevealed.has(quizIdx)) return;
    const newAnswers = [...quizAnswers];
    newAnswers[quizIdx] = optIdx;
    setQuizAnswers(newAnswers);
    setQuizRevealed(prev => new Set(prev).add(quizIdx));
    if (optIdx === QUIZ[quizIdx].ans) setScore(s => s + 1);
  };

  const pageId = PAGES[page].id;

  return (
    <div className="h-screen bg-[#07070c] text-white overflow-hidden select-none" onClick={handleClick}>

      <style jsx global>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-soft { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
        @keyframes glow-breathe { 0%,100% { box-shadow: 0 0 25px rgba(251,113,133,0.1); } 50% { box-shadow: 0 0 50px rgba(251,113,133,0.25); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { opacity:0; transform: scale(0.9); } to { opacity:1; transform: scale(1); } }
        @keyframes slideRight { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: translateX(0); } }
        @keyframes slideLeft { from { opacity:0; transform: translateX(-40px); } to { opacity:1; transform: translateX(0); } }
        @keyframes sparkle-fly { 0% { transform: translate(0,0) scale(1); opacity:1; } 100% { transform: translate(var(--tx),var(--ty)) scale(0); opacity:0; } }
        @keyframes heartBeat { 0%,100% { transform: scale(1); } 14% { transform: scale(1.15); } 28% { transform: scale(1); } 42% { transform: scale(1.1); } }
        @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity:1; } 100% { transform: translateY(350px) rotate(720deg); opacity:0; } }
        @keyframes kenBurns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.06); }
        .glass-strong { background: rgba(255,255,255,0.05); backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.08); }
        .page-enter-next { animation: slideRight 0.5s cubic-bezier(.16,1,.3,1) forwards; }
        .page-enter-prev { animation: slideLeft 0.5s cubic-bezier(.16,1,.3,1) forwards; }
        .page-exit { animation: fadeIn 0.3s ease reverse forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Hearts />
      {sparks.map(s => <SparkBurst key={s.id} x={s.x} y={s.y} />)}

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[100px] bg-rose-500" style={{ top:'10%', left:'20%', animation:'float 18s ease-in-out infinite' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.02] blur-[80px] bg-fuchsia-500" style={{ top:'55%', right:'10%', animation:'float 22s ease-in-out infinite reverse' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-[0.02] blur-[70px] bg-violet-500" style={{ bottom:'10%', left:'40%', animation:'float 25s ease-in-out infinite 3s' }} />
      </div>

      {/* ═══ Nav dots ═══ */}
      {page > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-1.5 py-4 px-6" style={{ animation:'fadeIn 0.5s ease' }}>
          {PAGES.map((p, i) => (
            <button key={p.id} onClick={() => goTo(i)} className="group relative">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i === page ? 'w-8 bg-gradient-to-r from-rose-400 to-pink-500' : i < page ? 'w-3 bg-rose-400/30' : 'w-3 bg-white/10'}`} />
              <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-medium whitespace-nowrap transition-opacity ${i === page ? 'text-white/30 opacity-100' : 'opacity-0 group-hover:opacity-100 text-white/15'}`}>{p.label}</div>
            </button>
          ))}
        </div>
      )}

      {/* ═══ Page content ═══ */}
      <div className={`h-full relative z-10 ${animating ? 'page-exit' : dir === 'next' ? 'page-enter-next' : 'page-enter-prev'}`}>

        {/* ════════ COVER ════════ */}
        {pageId === 'cover' && (
          <div className="h-full relative flex flex-col items-center justify-center px-6 text-center">
            {/* Background image faint */}
            <div className="absolute inset-0 z-0">
              <img src="/tanya/back-view.jpeg" alt="" className="w-full h-full object-cover opacity-[0.08]" style={{ animation:'kenBurns 20s ease-in-out infinite alternate' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/80 to-[#07070c]/60" />
            </div>

            <div className="relative z-10">
              <div style={{ animation:'float 3s ease-in-out infinite' }}>
                <div className="relative">
                  <Gift className="h-16 w-16 text-rose-400/60 mx-auto" style={{ filter:'drop-shadow(0 0 25px rgba(251,113,133,0.3))' }} />
                </div>
              </div>
              <p className="text-[11px] text-white/20 uppercase tracking-[0.25em] mt-10 mb-3">August 1, 2026</p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-white/70">You have a gift</h1>
              <p className="text-[14px] text-white/20 mt-3 max-w-xs mx-auto">Someone made this just for you. It has 8 pages.</p>

              <button onClick={nextPage} className="mt-12 group relative mx-auto">
                <div className="glass-strong rounded-full px-8 py-4 flex items-center gap-3 hover:bg-white/[0.06] transition-all" style={{ animation:'glow-breathe 3s ease-in-out infinite' }}>
                  <Heart className="h-5 w-5 text-rose-400" fill="currentColor" style={{ animation:'heartBeat 1.5s ease-in-out infinite' }} />
                  <span className="text-[15px] font-semibold text-white/70">Open your gift</span>
                  <ChevronRight className="h-4 w-4 text-white/30 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ════════ GREETING ════════ */}
        {pageId === 'greeting' && (
          <div className="h-full relative flex flex-col items-center justify-center px-6 text-center">
            {/* Her photo as hero bg */}
            <div className="absolute inset-0 z-0">
              <img src="/tanya/lake-portrait.jpeg" alt="" className="w-full h-full object-cover object-top opacity-[0.15]" style={{ animation:'kenBurns 25s ease-in-out infinite alternate' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/70 to-[#07070c]/50" />
            </div>

            <div className="relative z-10">
              <div className="space-y-2 mb-8">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} className="h-5 w-5 text-rose-400 mx-auto" fill="currentColor"
                    style={{ animation:`pulse-soft 2s ease-in-out infinite ${i * 0.3}s`, opacity: 1 - i * 0.2, filter:'drop-shadow(0 0 10px rgba(251,113,133,0.3))' }} />
                ))}
              </div>

              <p className="text-[12px] font-semibold text-rose-400/50 uppercase tracking-[0.3em] mb-5" style={{ animation:'fadeUp 0.6s ease-out 0.1s both' }}>Happy Girlfriend&apos;s Day</p>

              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[-0.04em] leading-[0.95]" style={{ animation:'fadeUp 0.7s ease-out 0.2s both' }}>
                <span style={{ background:'linear-gradient(135deg, #fb7185 0%, #f9a8d4 40%, #c084fc 70%, #818cf8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Tanya Rai
                </span>
              </h1>

              <p className="text-[15px] text-white/25 mt-6 max-w-sm leading-relaxed mx-auto" style={{ animation:'fadeUp 0.7s ease-out 0.4s both' }}>
                A tiny corner of the internet, built just for you.
                <br />Because you deserve way more than a text.
              </p>

              <button onClick={nextPage} className="mt-12 flex items-center gap-2 text-[13px] text-rose-300/40 hover:text-rose-300/70 transition-colors group mx-auto" style={{ animation:'fadeUp 0.7s ease-out 0.6s both' }}>
                Keep going <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* ════════ LETTER ════════ */}
        {pageId === 'letter' && (
          <div className="h-full flex flex-col items-center justify-center px-6 overflow-y-auto no-scrollbar py-20">
            <div className="max-w-lg w-full mx-auto">
              <div className="text-center mb-8" style={{ animation:'fadeUp 0.5s ease-out' }}>
                <Mail className="h-6 w-6 text-pink-400/40 mx-auto mb-4" />
                <p className="text-[12px] font-semibold text-pink-400/50 uppercase tracking-[0.2em]">A letter for you</p>
              </div>

              {!letterOpen ? (
                <div className="text-center" style={{ animation:'scaleIn 0.5s ease-out 0.2s both' }}>
                  <button onClick={() => setLetterOpen(true)} className="glass-strong rounded-2xl px-12 py-10 hover:scale-[1.02] transition-all duration-300 group" style={{ animation:'glow-breathe 3s ease-in-out infinite' }}>
                    <Mail className="h-10 w-10 text-rose-400/60 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[14px] text-white/30 font-medium">Tap to read</p>
                  </button>
                </div>
              ) : (
                <div className="glass-strong rounded-2xl p-7 sm:p-9" style={{ animation:'scaleIn 0.6s cubic-bezier(.16,1,.3,1)' }}>
                  <p className="text-[14px] text-white/25 italic mb-5">Dear Tanya,</p>
                  <div className="space-y-4 text-[14px] text-white/35 leading-relaxed">
                    <p>You probably didn&apos;t even know Girlfriend&apos;s Day was a thing. Neither did most people. But I figured — any excuse to remind you how incredible you are? I&apos;ll take it.</p>
                    <p>You&apos;re not just someone I love. You&apos;re someone I admire. Your strength, your softness, the way you hold the world together while making it look effortless — it&apos;s everything.</p>
                    <p>So today isn&apos;t about grand gestures. It&apos;s just me, making sure you know: <span className="text-rose-300/60 font-medium">you are seen, you are valued, you are so deeply loved.</span></p>
                    <p>Keep clicking. There&apos;s more.</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/[0.04]">
                    <p className="text-[13px] text-white/25">With all my love,</p>
                    <p className="text-[15px] font-semibold mt-1" style={{ background:'linear-gradient(135deg, #fb7185, #c084fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Hritik</p>
                  </div>
                </div>
              )}

              {letterOpen && (
                <div className="text-center mt-8" style={{ animation:'fadeUp 0.5s ease-out 0.4s both' }}>
                  <button onClick={nextPage} className="flex items-center gap-2 mx-auto text-[13px] text-rose-300/40 hover:text-rose-300/70 transition-colors group">
                    Next: 7 reasons I love you <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════ REASONS ════════ */}
        {pageId === 'reasons' && (
          <div className="h-full flex flex-col items-center justify-center px-6 overflow-y-auto no-scrollbar py-20">
            <div className="max-w-lg w-full mx-auto">
              <div className="text-center mb-8" style={{ animation:'fadeUp 0.5s ease-out' }}>
                <BookOpen className="h-6 w-6 text-violet-400/40 mx-auto mb-4" />
                <p className="text-[12px] font-semibold text-violet-400/50 uppercase tracking-[0.2em] mb-3">7 reasons</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em]" style={{ background:'linear-gradient(135deg, #fff, rgba(255,255,255,0.5))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Why you&apos;re irreplaceable
                </h2>
                <p className="text-[12px] text-white/15 mt-2">Tap each heart to reveal</p>
              </div>

              <div className="space-y-3">
                {REASONS.map((reason, i) => {
                  const isRevealed = revealed.has(i);
                  const Icon = reason.icon;
                  return (
                    <div key={i} className={`glass rounded-xl p-4 transition-all duration-500 ${isRevealed ? 'bg-white/[0.03]' : ''}`} style={{ animation:`fadeUp 0.4s ease-out ${0.1 + i * 0.05}s both` }}>
                      <div className="flex items-center gap-3.5">
                        <button onClick={(e) => { e.stopPropagation(); revealNext(); }} className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-500 ${isRevealed ? `bg-gradient-to-br ${reason.color} scale-110 shadow-lg shadow-rose-500/15` : 'border border-white/10 hover:border-rose-400/30'}`}>
                          {isRevealed ? <Heart className="h-3.5 w-3.5 text-white" fill="currentColor" /> : <span className="text-[12px] font-bold text-white/20">{i + 1}</span>}
                        </button>
                        <div className="flex-1 min-h-[20px]">
                          {isRevealed ? (
                            <div className="flex items-center gap-2.5" style={{ animation:'fadeUp 0.4s ease-out' }}>
                              <Icon className="h-3.5 w-3.5 text-rose-300/35 shrink-0" />
                              <p className="text-[13px] text-white/45 leading-relaxed">{reason.text}</p>
                            </div>
                          ) : (
                            <div className="h-2.5 w-3/4 rounded-full bg-white/[0.03]" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {revealed.size === REASONS.length && (
                <div className="text-center mt-8" style={{ animation:'fadeUp 0.6s ease-out' }}>
                  <p className="text-[13px] text-rose-300/30 italic mb-6">...and a thousand more I run out of space for.</p>
                  <button onClick={nextPage} className="flex items-center gap-2 mx-auto text-[13px] text-rose-300/40 hover:text-rose-300/70 transition-colors group">
                    Next: Your gallery <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════ GALLERY ════════ */}
        {pageId === 'gallery' && (
          <div className="h-full flex flex-col items-center justify-center px-6">
            <div className="max-w-lg w-full mx-auto">
              <div className="text-center mb-6" style={{ animation:'fadeUp 0.5s ease-out' }}>
                <Camera className="h-6 w-6 text-amber-400/40 mx-auto mb-4" />
                <p className="text-[12px] font-semibold text-amber-400/50 uppercase tracking-[0.2em] mb-2">Your photos</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em]" style={{ background:'linear-gradient(135deg, #fbbf24, #fb923c, #fb7185)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  Main character, always
                </h2>
              </div>

              {/* Main photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[55vh] mx-auto mb-4" style={{ animation:'scaleIn 0.5s ease-out 0.2s both' }}>
                <img src={PHOTOS[galIdx].src} alt={PHOTOS[galIdx].caption} className="w-full h-full object-cover" style={{ animation:'kenBurns 15s ease-in-out infinite alternate' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[14px] font-medium text-white/70">{PHOTOS[galIdx].caption}</p>
                  <p className="text-[11px] text-white/25 mt-1">{galIdx + 1} / {PHOTOS.length}</p>
                </div>
                {/* Nav arrows on image */}
                <button onClick={(e) => { e.stopPropagation(); setGalIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setGalIdx(i => (i + 1) % PHOTOS.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2 mb-6">
                {PHOTOS.map((p, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setGalIdx(i); }} className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === galIdx ? 'border-rose-400/50 scale-110' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                    <img src={p.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="text-center" style={{ animation:'fadeUp 0.5s ease-out 0.4s both' }}>
                <button onClick={nextPage} className="flex items-center gap-2 mx-auto text-[13px] text-rose-300/40 hover:text-rose-300/70 transition-colors group">
                  Next: Our story <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════ TIMELINE ════════ */}
        {pageId === 'timeline' && (
          <div className="h-full flex flex-col items-center justify-center px-6 overflow-y-auto no-scrollbar py-20">
            <div className="max-w-md w-full mx-auto">
              <div className="text-center mb-8" style={{ animation:'fadeUp 0.5s ease-out' }}>
                <Sparkles className="h-6 w-6 text-violet-400/40 mx-auto mb-4" />
                <p className="text-[12px] font-semibold text-violet-400/50 uppercase tracking-[0.2em] mb-3">Our story</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em]" style={{ background:'linear-gradient(135deg, #c084fc, #818cf8, #38bdf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  How we got here
                </h2>
              </div>

              <div className="relative">
                <div className="absolute left-[28px] top-4 bottom-4 w-px bg-gradient-to-b from-rose-400/20 via-violet-400/20 to-transparent" />
                <div className="space-y-5">
                  {TIMELINE.map((t, i) => (
                    <div key={i} className="relative flex gap-4" style={{ animation:`fadeUp 0.5s ease-out ${0.15 + i * 0.1}s both` }}>
                      <div className="relative z-10 h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-white/[0.08]">
                        <img src={t.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-[14px] font-semibold text-white/60">{t.label}</h3>
                        <p className="text-[12px] text-white/25 mt-1 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-10" style={{ animation:'fadeUp 0.5s ease-out 0.7s both' }}>
                <button onClick={nextPage} className="flex items-center gap-2 mx-auto text-[13px] text-rose-300/40 hover:text-rose-300/70 transition-colors group">
                  Next: A little quiz <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════ QUIZ ════════ */}
        {pageId === 'quiz' && (
          <div className="h-full flex flex-col items-center justify-center px-6 overflow-y-auto no-scrollbar py-20">
            <div className="max-w-md w-full mx-auto">
              <div className="text-center mb-8" style={{ animation:'fadeUp 0.5s ease-out' }}>
                <Gamepad2 className="h-6 w-6 text-sky-400/40 mx-auto mb-4" />
                <p className="text-[12px] font-semibold text-sky-400/50 uppercase tracking-[0.2em] mb-3">Quick quiz</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em]" style={{ background:'linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  How well do you know us?
                </h2>
              </div>

              {/* Quiz dots */}
              <div className="flex items-center gap-2 justify-center mb-6">
                {QUIZ.map((_, i) => (
                  <button key={i} onClick={() => setQuizIdx(i)} className={`h-2 rounded-full transition-all duration-300 ${i === quizIdx ? 'w-8 bg-gradient-to-r from-sky-400 to-violet-400' : quizRevealed.has(i) ? 'w-4 bg-sky-400/30' : 'w-4 bg-white/10'}`} />
                ))}
              </div>

              <div className="glass-strong rounded-2xl p-6" style={{ animation:'scaleIn 0.4s ease-out' }} key={quizIdx}>
                <p className="text-[10px] text-white/15 uppercase tracking-widest mb-3">Question {quizIdx + 1} of {QUIZ.length}</p>
                <h3 className="text-[16px] font-semibold text-white/60 mb-6">{QUIZ[quizIdx].q}</h3>
                <div className="space-y-2.5">
                  {QUIZ[quizIdx].opts.map((opt, oi) => {
                    const isAnswered = quizRevealed.has(quizIdx);
                    const isCorrect = oi === QUIZ[quizIdx].ans;
                    const isSelected = quizAnswers[quizIdx] === oi;
                    return (
                      <button key={oi} onClick={(e) => { e.stopPropagation(); answerQuiz(oi); }}
                        className={`w-full text-left rounded-xl px-4 py-3 text-[13px] transition-all duration-300 flex items-center gap-3
                        ${isAnswered && isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300/70' : ''}
                        ${isAnswered && isSelected && !isCorrect ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300/50' : ''}
                        ${!isAnswered ? 'glass hover:bg-white/[0.05] text-white/40' : ''}
                        ${isAnswered && !isCorrect && !isSelected ? 'glass text-white/20' : ''}`}>
                        <span className="h-5 w-5 rounded-full border border-current/20 flex items-center justify-center shrink-0 text-[10px]">
                          {isAnswered && isCorrect ? <Check className="h-3 w-3" /> : isAnswered && isSelected && !isCorrect ? <X className="h-3 w-3" /> : String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button onClick={() => setQuizIdx(i => Math.max(0, i - 1))} className={`text-[12px] text-white/20 hover:text-white/40 transition-colors flex items-center gap-1 ${quizIdx === 0 ? 'invisible' : ''}`}>
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </button>
                {quizIdx < QUIZ.length - 1 ? (
                  <button onClick={() => setQuizIdx(i => Math.min(QUIZ.length - 1, i + 1))} className="text-[12px] text-white/20 hover:text-white/40 transition-colors flex items-center gap-1">
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                ) : quizRevealed.size === QUIZ.length ? (
                  <div style={{ animation:'fadeUp 0.4s ease-out' }} className="flex flex-col items-end gap-1">
                    <span className="text-[12px] text-white/30">{score}/{QUIZ.length} correct</span>
                    <button onClick={nextPage} className="text-[13px] text-rose-300/50 hover:text-rose-300/70 transition-colors flex items-center gap-1 group">
                      Final page <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* ════════ PROMISE ════════ */}
        {pageId === 'promise' && (
          <div className="h-full relative flex flex-col items-center justify-center px-6 text-center">
            {/* Her photo faint bg */}
            <div className="absolute inset-0 z-0">
              <img src="/tanya/portrait-hat.jpeg" alt="" className="w-full h-full object-cover object-top opacity-[0.1]" style={{ animation:'kenBurns 20s ease-in-out infinite alternate' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/80 to-[#07070c]/60" />
            </div>

            {/* Confetti */}
            <div className="fixed inset-0 pointer-events-none z-[5]">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="absolute rounded-full" style={{
                  width: `${4 + Math.random() * 4}px`, height: `${4 + Math.random() * 4}px`,
                  background: ['#fb7185','#f9a8d4','#fbbf24','#c084fc','#38bdf8','#34d399'][i % 6],
                  left: `${5 + Math.random() * 90}%`, top: '-10px',
                  animation: `confetti ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s both`,
                }} />
              ))}
            </div>

            <div className="relative z-10">
              <Infinity className="h-10 w-10 text-violet-400/25 mx-auto mb-8" style={{ animation:'float 4s ease-in-out infinite', filter:'drop-shadow(0 0 15px rgba(139,92,246,0.2))' }} />

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] mb-4" style={{ animation:'fadeUp 0.6s ease-out 0.2s both', background:'linear-gradient(135deg, #c084fc, #818cf8, #38bdf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Today and every day
              </h2>

              <p className="text-[15px] text-white/30 leading-relaxed max-w-sm mx-auto" style={{ animation:'fadeUp 0.6s ease-out 0.4s both' }}>
                I don&apos;t need a special day to love you — but I&apos;ll gladly use one to make sure you feel it. You&apos;re my favorite person, my best decision, my Tanya.
              </p>

              <div className="mt-10 flex items-center justify-center gap-3" style={{ animation:'fadeUp 0.6s ease-out 0.6s both' }}>
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="text-rose-400" fill="currentColor" style={{
                    width: `${14 + (i < 3 ? i * 4 : (4 - i) * 4)}px`, height: `${14 + (i < 3 ? i * 4 : (4 - i) * 4)}px`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.15}s`,
                    filter:'drop-shadow(0 0 8px rgba(251,113,133,0.3))',
                  }} />
                ))}
              </div>

              <div className="mt-16" style={{ animation:'fadeUp 0.6s ease-out 0.8s both' }}>
                <p className="text-[11px] text-white/10">Made with <Heart className="inline h-2.5 w-2.5 text-rose-400/40 -mt-0.5" fill="currentColor" /> for Tanya Rai</p>
                <p className="text-[10px] text-white/[0.06] mt-1.5">Happy Girlfriend&apos;s Day 2026</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ Bottom nav ═══ */}
      {page > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
          <button onClick={prevPage} className={`glass rounded-full h-10 w-10 flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/[0.05] transition-all ${page <= 0 ? 'invisible' : ''}`}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-[10px] text-white/10 font-medium">{page + 1} / {PAGES.length}</span>
          <button onClick={nextPage} className={`glass rounded-full h-10 w-10 flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/[0.05] transition-all ${page >= PAGES.length - 1 ? 'invisible' : ''}`}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

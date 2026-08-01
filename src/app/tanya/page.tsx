'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Sparkles, Star, Sun, Moon, Music, Coffee, Flower2, Crown, Infinity, ChevronRight, ChevronLeft, Gift, Mail, BookOpen, Camera, Gamepad2, MessageCircleHeart, ArrowRight, Check, X } from 'lucide-react';

/* ═══════════════════════════════════════════════
   HEARTS CANVAS
   ═══════════════════════════════════════════════ */

function Hearts() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const onR = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener('resize', onR);
    const pts: { x:number;y:number;s:number;a:number;dx:number;dy:number;o:number;r:number }[] = [];
    for (let i = 0; i < 20; i++) pts.push({ x: Math.random()*w, y: Math.random()*h, s: 6+Math.random()*12, a: Math.random()*Math.PI*2, dx: (Math.random()-0.5)*0.25, dy: -0.12-Math.random()*0.35, o: 0.04+Math.random()*0.07, r: Math.random()*0.006 });
    function heart(cx:number,cy:number,sz:number,op:number,an:number){
      if(!ctx)return;ctx.save();ctx.translate(cx,cy);ctx.rotate(an);ctx.globalAlpha=op;
      ctx.beginPath();const s=sz/15;
      ctx.moveTo(0,-3*s);ctx.bezierCurveTo(-8*s,-14*s,-18*s,-4*s,0,10*s);
      ctx.moveTo(0,-3*s);ctx.bezierCurveTo(8*s,-14*s,18*s,-4*s,0,10*s);
      ctx.fillStyle='#fb7185';ctx.fill();ctx.restore();
    }
    let raf:number;
    (function loop(){ctx.clearRect(0,0,w,h);pts.forEach(p=>{p.x+=p.dx+Math.sin(p.a)*0.25;p.y+=p.dy;p.a+=p.r;if(p.y<-25){p.y=h+25;p.x=Math.random()*w;}heart(p.x,p.y,p.s,p.o,p.a);});raf=requestAnimationFrame(loop);})();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',onR);};
  },[]);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-[1]" />;
}

/* ═══════════════════════════════════════════════
   SPARKLE BURST
   ═══════════════════════════════════════════════ */

function Sparks({x,y}:{x:number;y:number}){
  return(
    <div className="fixed pointer-events-none z-[60]" style={{left:x,top:y}}>
      {[...Array(10)].map((_,i)=>{
        const a=(i/10)*Math.PI*2, d=20+Math.random()*30;
        return <div key={i} className="absolute rounded-full" style={{width:3+Math.random()*3,height:3+Math.random()*3,background:['#fb7185','#f9a8d4','#fbbf24','#c084fc','#38bdf8','#34d399'][i%6],animation:'spark .7s ease-out forwards','--tx':`${Math.cos(a)*d}px`,'--ty':`${Math.sin(a)*d}px`} as any}/>;
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const IMGS=[
  {src:'/tanya/lake-portrait.jpeg',cap:'Every angle, effortlessly perfect'},
  {src:'/tanya/portrait-hat.jpeg',cap:'Main character energy. Always.'},
  {src:'/tanya/door-sitting.jpeg',cap:'That smile. That vibe. Meri jaan.'},
  {src:'/tanya/back-view.jpeg',cap:'Every view is better with you in it'},
  {src:'/tanya/collage.jpeg',cap:'Jaipur memories we keep going back to'},
];

const REASONS=[
  {icon:Sun,text:'Your smile makes even the worst days feel okay',color:'from-amber-400 to-orange-500'},
  {icon:Coffee,text:'You remember every little thing I say — even I forget sometimes',color:'from-amber-600 to-rose-500'},
  {icon:Music,text:'Your laugh — literally my favorite sound in this whole world',color:'from-pink-400 to-rose-500'},
  {icon:Star,text:'Jab mujhe khud pe believe nahi hota, tab bhi tum karti ho',color:'from-violet-400 to-purple-500'},
  {icon:Flower2,text:'You turn normal, ordinary moments into unforgettable ones',color:'from-rose-400 to-pink-500'},
  {icon:Moon,text:'Your patience, warmth, aur vo quiet magic — it is only yours',color:'from-blue-400 to-violet-500'},
  {icon:Crown,text:'Because you chose me. Roz. Every single day. Without giving up.',color:'from-amber-400 to-rose-500'},
];

const QUIZ=[
  {q:'What does Hritik love most about you?',opts:['Your looks','Your cooking','Everything about you','Your WiFi password'],ans:2},
  {q:'What would Hritik do without you?',opts:['Be totally fine','Probably cry','Forget to eat','All of the above (minus the first one)'],ans:3},
  {q:'How much does Hritik love you?',opts:['A lot','More than pizza','More than sleep','Beyond measurement'],ans:3},
  {q:'Hritik ki favorite jagah?',opts:['Beach','Mountains','Home','Wherever you are'],ans:3},
];

const TIMELINE=[
  {label:'Everything changed',desc:'The day I first saw you — life got interesting real quick.',img:'/tanya/lake-portrait.jpeg'},
  {label:'Late-night talks',desc:'Hours felt like minutes. Silence felt comfortable. That is when I knew.',img:'/tanya/door-sitting.jpeg'},
  {label:'Adventures together',desc:'Jaipur, forts, sunsets — har jagah humari jagah ban gayi.',img:'/tanya/collage.jpeg'},
  {label:'Right now',desc:'You, reading this, smiling at your phone. My favorite moment so far.',img:'/tanya/portrait-hat.jpeg'},
  {label:'Everything ahead',desc:'More cities, more memories, more reasons to choose you.',img:'/tanya/back-view.jpeg'},
];

const PAGES=[
  {id:'cover',icon:Gift,label:'Open'},
  {id:'greeting',icon:Heart,label:'Hi Shona'},
  {id:'letter',icon:Mail,label:'Letter'},
  {id:'reasons',icon:BookOpen,label:'7 Reasons'},
  {id:'gallery',icon:Camera,label:'Photos'},
  {id:'timeline',icon:Sparkles,label:'Story'},
  {id:'quiz',icon:Gamepad2,label:'Quiz'},
  {id:'promise',icon:MessageCircleHeart,label:'Forever'},
];

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function TanyaPage(){
  const[page,setPage]=useState(0);
  const[dir,setDir]=useState<'next'|'prev'>('next');
  const[anim,setAnim]=useState(false);
  const[sparks,setSparks]=useState<{id:number;x:number;y:number}[]>([]);
  const[letterOpen,setLetterOpen]=useState(false);
  const[revealed,setRevealed]=useState<Set<number>>(new Set());
  const[gi,setGi]=useState(0);
  const[qi,setQi]=useState(0);
  const[qAns,setQAns]=useState<(number|null)[]>([null,null,null,null]);
  const[qDone,setQDone]=useState<Set<number>>(new Set());
  const[score,setScore]=useState(0);

  const go=useCallback((i:number)=>{
    if(anim||i===page||i<0||i>=PAGES.length)return;
    setDir(i>page?'next':'prev');setAnim(true);
    setTimeout(()=>{setPage(i);setTimeout(()=>setAnim(false),50);},280);
  },[page,anim]);

  const next=()=>go(page+1);
  const prev=()=>go(page-1);

  const tap=(e:React.MouseEvent)=>{
    const id=Date.now();
    setSparks(s=>[...s,{id,x:e.clientX,y:e.clientY}]);
    setTimeout(()=>setSparks(s=>s.filter(v=>v.id!==id)),800);
  };

  const revealNext=()=>{
    setRevealed(p=>{const n=new Set(p);for(let i=0;i<REASONS.length;i++){if(!n.has(i)){n.add(i);return n;}}return n;});
  };

  const answer=(oi:number)=>{
    if(qDone.has(qi))return;
    const a=[...qAns];a[qi]=oi;setQAns(a);
    setQDone(p=>new Set(p).add(qi));
    if(oi===QUIZ[qi].ans)setScore(s=>s+1);
  };

  const pid=PAGES[page].id;

  return(
    <div className="h-[100dvh] bg-[#06060b] text-white overflow-hidden select-none" onClick={tap}>

      <style jsx global>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulse-s{0%,100%{opacity:.45}50%{opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 30px rgba(251,113,133,.1),0 0 60px rgba(192,132,252,.05)}50%{box-shadow:0 0 50px rgba(251,113,133,.25),0 0 100px rgba(192,132,252,.1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
        @keyframes slideR{from{opacity:0;transform:translateX(50px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideL{from{opacity:0;transform:translateX(-50px)}to{opacity:1;transform:translateX(0)}}
        @keyframes spark{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0}}
        @keyframes heartBeat{0%,100%{transform:scale(1)}14%{transform:scale(1.18)}28%{transform:scale(1)}42%{transform:scale(1.12)}}
        @keyframes confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(400px) rotate(720deg);opacity:0}}
        @keyframes ken{0%{transform:scale(1)}100%{transform:scale(1.1)}}
        @keyframes holo{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes borderGlow{0%,100%{border-color:rgba(251,113,133,.08)}50%{border-color:rgba(251,113,133,.2)}}
        @keyframes revealLine{from{width:0;opacity:0}to{width:100%;opacity:1}}
        .gl{background:rgba(255,255,255,.025);backdrop-filter:blur(24px) saturate(1.4);border:1px solid rgba(255,255,255,.05)}
        .gl2{background:rgba(255,255,255,.04);backdrop-filter:blur(40px) saturate(1.6);border:1px solid rgba(255,255,255,.07)}
        .pg-next{animation:slideR .45s cubic-bezier(.16,1,.3,1) forwards}
        .pg-prev{animation:slideL .45s cubic-bezier(.16,1,.3,1) forwards}
        .pg-exit{animation:fadeIn .25s ease reverse forwards}
        .noscr::-webkit-scrollbar{display:none}.noscr{-ms-overflow-style:none;scrollbar-width:none}
        .holo-text{background:linear-gradient(90deg,#fb7185,#f9a8d4,#c084fc,#818cf8,#38bdf8,#c084fc,#f9a8d4,#fb7185);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:holo 6s ease-in-out infinite}
        .glow-border{animation:borderGlow 3s ease-in-out infinite}
      `}</style>

      <Hearts/>
      {sparks.map(s=><Sparks key={s.id} x={s.x} y={s.y}/>)}

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] bg-rose-500" style={{top:'5%',left:'15%',animation:'float 20s ease-in-out infinite'}}/>
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.025] blur-[100px] bg-fuchsia-600" style={{top:'50%',right:'5%',animation:'float 24s ease-in-out infinite reverse'}}/>
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-[0.02] blur-[80px] bg-violet-600" style={{bottom:'5%',left:'35%',animation:'float 28s ease-in-out infinite 2s'}}/>
      </div>

      {/* Dot grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]" style={{backgroundImage:'radial-gradient(circle,#fff 0.5px,transparent 0.5px)',backgroundSize:'32px 32px'}}/>

      {/* ═══ Nav ═══ */}
      {page>0&&(
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-1.5 pt-5 pb-3 px-4" style={{animation:'fadeIn .5s ease'}}>
          {PAGES.map((p,i)=>(
            <button key={p.id} onClick={()=>go(i)} className="group relative">
              <div className={`h-[5px] rounded-full transition-all duration-500 ${i===page?'w-9 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 shadow-[0_0_12px_rgba(251,113,133,.3)]':i<page?'w-3.5 bg-rose-400/25':'w-3.5 bg-white/[.07]'}`}/>
            </button>
          ))}
        </div>
      )}

      {/* ═══ Content ═══ */}
      <div className={`h-full relative z-10 ${anim?'pg-exit':dir==='next'?'pg-next':'pg-prev'}`}>

        {/* ════ COVER ════ */}
        {pid==='cover'&&(
          <div className="h-full relative flex flex-col items-center justify-center px-6 text-center">
            <div className="absolute inset-0"><img src="/tanya/back-view.jpeg" alt="" className="w-full h-full object-cover opacity-[0.06]" style={{animation:'ken 25s ease-in-out infinite alternate'}}/><div className="absolute inset-0 bg-gradient-to-t from-[#06060b] via-[#06060b]/85 to-[#06060b]/60"/></div>

            <div className="relative z-10">
              <div style={{animation:'float 3.5s ease-in-out infinite'}}>
                <div className="relative h-20 w-20 mx-auto rounded-2xl gl2 flex items-center justify-center" style={{animation:'glow 4s ease-in-out infinite'}}>
                  <Gift className="h-9 w-9 text-rose-400/70" style={{filter:'drop-shadow(0 0 16px rgba(251,113,133,.35))'}}/>
                </div>
              </div>

              <p className="text-[10px] text-white/15 uppercase tracking-[0.35em] mt-10 mb-3 font-medium">1 August 2026</p>
              <h1 className="text-3xl sm:text-5xl font-black tracking-[-0.04em] text-white/80">You have something waiting</h1>
              <p className="text-[13px] text-white/15 mt-3 max-w-[280px] mx-auto leading-relaxed">Not a boring text. Something I made just for you. 8 pages.</p>

              <button onClick={next} className="mt-14 group mx-auto">
                <div className="gl2 rounded-full px-8 py-4 flex items-center gap-3 hover:bg-white/[0.06] transition-all duration-300" style={{animation:'glow 3s ease-in-out infinite'}}>
                  <Heart className="h-5 w-5 text-rose-400" fill="currentColor" style={{animation:'heartBeat 1.5s ease-in-out infinite'}}/>
                  <span className="text-[14px] font-semibold text-white/70">Open it, babu</span>
                  <ChevronRight className="h-4 w-4 text-white/25 group-hover:translate-x-1 transition-transform"/>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ════ GREETING ════ */}
        {pid==='greeting'&&(
          <div className="h-full relative flex flex-col items-center justify-center px-6 text-center">
            <div className="absolute inset-0"><img src="/tanya/lake-portrait.jpeg" alt="" className="w-full h-full object-cover object-top opacity-[0.12]" style={{animation:'ken 30s ease-in-out infinite alternate'}}/><div className="absolute inset-0 bg-gradient-to-t from-[#06060b] via-[#06060b]/70 to-[#06060b]/50"/></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1.5 mb-8">
                {[...Array(3)].map((_,i)=>(
                  <Heart key={i} className="text-rose-400" fill="currentColor" style={{width:14+i*3-(i===2?6:0),height:14+i*3-(i===2?6:0),animation:`pulse-s 2s ease-in-out infinite ${i*.25}s`,filter:'drop-shadow(0 0 8px rgba(251,113,133,.3))'}}/>
                ))}
              </div>

              <p className="text-[11px] font-semibold text-rose-400/40 uppercase tracking-[0.35em] mb-6" style={{animation:'fadeUp .6s ease-out .1s both'}}>Happy Girlfriend&apos;s Day</p>

              <h1 className="text-5xl sm:text-7xl font-black tracking-[-0.05em] leading-[.9]" style={{animation:'fadeUp .7s ease-out .2s both'}}>
                <span className="holo-text">Tanya Rai</span>
              </h1>

              <p className="text-[14px] text-white/20 mt-7 max-w-xs mx-auto leading-relaxed" style={{animation:'fadeUp .7s ease-out .4s both'}}>
                A tiny corner of the internet, just for you.
                <br/><span className="text-white/12">Because you deserve so much more than a text.</span>
              </p>

              <button onClick={next} className="mt-12 flex items-center gap-2 text-[12px] text-rose-300/35 hover:text-rose-300/60 transition-colors group mx-auto" style={{animation:'fadeUp .7s ease-out .6s both'}}>
                Keep going <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        )}

        {/* ════ LETTER ════ */}
        {pid==='letter'&&(
          <div className="h-full flex flex-col items-center justify-center px-5 overflow-y-auto noscr py-20">
            <div className="max-w-lg w-full mx-auto">
              <div className="text-center mb-8" style={{animation:'fadeUp .5s ease-out'}}>
                <Mail className="h-5 w-5 text-pink-400/30 mx-auto mb-4"/>
                <p className="text-[11px] font-semibold text-pink-400/40 uppercase tracking-[0.25em]">A letter for you</p>
              </div>

              {!letterOpen?(
                <div className="text-center" style={{animation:'scaleIn .5s ease-out .2s both'}}>
                  <button onClick={()=>setLetterOpen(true)} className="gl2 rounded-2xl px-14 py-12 hover:scale-[1.02] transition-all duration-300 group" style={{animation:'glow 3s ease-in-out infinite'}}>
                    <Mail className="h-10 w-10 text-rose-400/50 mx-auto mb-4 group-hover:scale-110 transition-transform" style={{filter:'drop-shadow(0 0 12px rgba(251,113,133,.25))'}}/>
                    <p className="text-[13px] text-white/25 font-medium">Tap to read, shona</p>
                  </button>
                </div>
              ):(
                <div className="gl2 rounded-2xl p-7 sm:p-9" style={{animation:'scaleIn .6s cubic-bezier(.16,1,.3,1)'}}>
                  <p className="text-[13px] text-rose-300/25 italic mb-5">Hey Shona,</p>
                  <div className="space-y-4 text-[13px] sm:text-[14px] text-white/35 leading-[1.75]">
                    <p>You probably didn&apos;t even know Girlfriend&apos;s Day was a thing. Neither did I. But I thought — any excuse to remind you how amazing you are? I&apos;ll take it.</p>
                    <p>You&apos;re not just someone I love. You&apos;re someone I genuinely admire. Teri strength, teri softness, the way you hold everything together so effortlessly — <span className="text-rose-300/50">it&apos;s everything.</span></p>
                    <p>Today is not about grand gestures. It&apos;s just me, making sure you know: <span className="text-rose-300/60 font-medium">you are seen, you matter, and you are so deeply loved.</span></p>
                    <p className="text-white/25">Keep scrolling. There&apos;s more.</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/[0.04]">
                    <p className="text-[12px] text-white/20">Forever yours,</p>
                    <p className="text-[15px] font-bold mt-1 holo-text inline-block">Hritik</p>
                  </div>
                </div>
              )}

              {letterOpen&&(
                <div className="text-center mt-8" style={{animation:'fadeUp .5s ease-out .3s both'}}>
                  <button onClick={next} className="flex items-center gap-2 mx-auto text-[12px] text-rose-300/35 hover:text-rose-300/60 transition-colors group">
                    Next: 7 reasons I love you <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"/>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ REASONS ════ */}
        {pid==='reasons'&&(
          <div className="h-full flex flex-col items-center justify-center px-5 overflow-y-auto noscr py-20">
            <div className="max-w-lg w-full mx-auto">
              <div className="text-center mb-7" style={{animation:'fadeUp .5s ease-out'}}>
                <BookOpen className="h-5 w-5 text-violet-400/30 mx-auto mb-4"/>
                <p className="text-[11px] font-semibold text-violet-400/40 uppercase tracking-[0.25em] mb-3">7 reasons</p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.03em] holo-text inline-block">Why you&apos;re irreplaceable</h2>
                <p className="text-[11px] text-white/12 mt-2.5">Tap anywhere on a line to reveal</p>
              </div>

              <div className="space-y-2.5">
                {REASONS.map((r,i)=>{
                  const open=revealed.has(i);
                  const Icon=r.icon;
                  return(
                    <div key={i} onClick={(e)=>{e.stopPropagation();revealNext();}}
                      className={`gl rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-500 hover:bg-white/[0.03] active:scale-[0.98] glow-border ${open?'bg-white/[0.025]':''}`}
                      style={{animation:`fadeUp .4s ease-out ${.08+i*.04}s both`}}>
                      <div className="flex items-center gap-3.5">
                        <div className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-500 ${open?`bg-gradient-to-br ${r.color} scale-110 shadow-lg shadow-rose-500/15`:'border border-white/[0.08]'}`}>
                          {open?<Heart className="h-3.5 w-3.5 text-white" fill="currentColor"/>:<span className="text-[11px] font-bold text-white/15">{i+1}</span>}
                        </div>
                        <div className="flex-1 min-h-[20px]">
                          {open?(
                            <div className="flex items-center gap-2.5" style={{animation:'fadeUp .35s ease-out'}}>
                              <Icon className="h-3.5 w-3.5 text-rose-300/30 shrink-0"/>
                              <p className="text-[12.5px] text-white/40 leading-relaxed">{r.text}</p>
                            </div>
                          ):(
                            <div className="h-2 w-2/3 rounded-full bg-white/[0.025]"/>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {revealed.size===REASONS.length&&(
                <div className="text-center mt-8" style={{animation:'fadeUp .6s ease-out'}}>
                  <p className="text-[12px] text-rose-300/25 italic mb-5">...and a thousand more that don&apos;t fit on one page</p>
                  <button onClick={next} className="flex items-center gap-2 mx-auto text-[12px] text-rose-300/35 hover:text-rose-300/60 transition-colors group">
                    Next: Your photos <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"/>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════ GALLERY ════ */}
        {pid==='gallery'&&(
          <div className="h-full flex flex-col items-center justify-center px-5">
            <div className="max-w-lg w-full mx-auto">
              <div className="text-center mb-5" style={{animation:'fadeUp .5s ease-out'}}>
                <Camera className="h-5 w-5 text-amber-400/30 mx-auto mb-3"/>
                <p className="text-[11px] font-semibold text-amber-400/40 uppercase tracking-[0.25em] mb-2">Gallery</p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.03em]" style={{background:'linear-gradient(135deg,#fbbf24,#fb923c,#fb7185)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Seriously, how are you this pretty</h2>
              </div>

              {/* Main photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[52vh] mx-auto mb-4 glow-border" style={{animation:'scaleIn .5s ease-out .15s both'}}>
                <img key={gi} src={IMGS[gi].src} alt="" className="w-full h-full object-cover" style={{animation:'ken 18s ease-in-out infinite alternate'}}/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060b] via-transparent to-transparent"/>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[13px] font-medium text-white/60">{IMGS[gi].cap}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <p className="text-[10px] text-white/20">{gi+1} / {IMGS.length}</p>
                    <div className="flex gap-1">{IMGS.map((_,j)=><div key={j} className={`h-1 rounded-full transition-all duration-300 ${j===gi?'w-4 bg-rose-400/50':'w-1.5 bg-white/10'}`}/>)}</div>
                  </div>
                </div>
                <button onClick={(e)=>{e.stopPropagation();setGi(i=>(i-1+IMGS.length)%IMGS.length);}} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full gl flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all active:scale-90">
                  <ChevronLeft className="h-4 w-4"/>
                </button>
                <button onClick={(e)=>{e.stopPropagation();setGi(i=>(i+1)%IMGS.length);}} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full gl flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all active:scale-90">
                  <ChevronRight className="h-4 w-4"/>
                </button>
              </div>

              {/* Thumbs */}
              <div className="flex justify-center gap-2 mb-5">
                {IMGS.map((p,i)=>(
                  <button key={i} onClick={(e)=>{e.stopPropagation();setGi(i);}} className={`h-12 w-12 rounded-lg overflow-hidden transition-all duration-300 ${i===gi?'ring-2 ring-rose-400/40 scale-110':'opacity-40 hover:opacity-70'}`}>
                    <img src={p.src} alt="" className="w-full h-full object-cover"/>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button onClick={next} className="flex items-center gap-2 mx-auto text-[12px] text-rose-300/35 hover:text-rose-300/60 transition-colors group">
                  Next: Our story <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════ TIMELINE ════ */}
        {pid==='timeline'&&(
          <div className="h-full flex flex-col items-center justify-center px-5 overflow-y-auto noscr py-20">
            <div className="max-w-md w-full mx-auto">
              <div className="text-center mb-8" style={{animation:'fadeUp .5s ease-out'}}>
                <Sparkles className="h-5 w-5 text-violet-400/30 mx-auto mb-3"/>
                <p className="text-[11px] font-semibold text-violet-400/40 uppercase tracking-[0.25em] mb-3">Our story</p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.03em]" style={{background:'linear-gradient(135deg,#c084fc,#818cf8,#38bdf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>How we got here</h2>
              </div>

              <div className="relative">
                <div className="absolute left-7 top-5 bottom-5 w-px bg-gradient-to-b from-rose-400/15 via-violet-400/15 to-transparent"/>
                <div className="space-y-4">
                  {TIMELINE.map((t,i)=>(
                    <div key={i} className="relative flex gap-4 group" style={{animation:`fadeUp .5s ease-out ${.12+i*.08}s both`}}>
                      <div className="relative z-10 h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-white/[0.06] group-hover:border-rose-400/20 transition-colors">
                        <img src={t.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-[13px] font-semibold text-white/55">{t.label}</h3>
                        <p className="text-[11.5px] text-white/22 mt-1 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-10" style={{animation:'fadeUp .5s ease-out .6s both'}}>
                <button onClick={next} className="flex items-center gap-2 mx-auto text-[12px] text-rose-300/35 hover:text-rose-300/60 transition-colors group">
                  Next: A little quiz <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"/>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════ QUIZ ════ */}
        {pid==='quiz'&&(
          <div className="h-full flex flex-col items-center justify-center px-5 overflow-y-auto noscr py-20">
            <div className="max-w-md w-full mx-auto">
              <div className="text-center mb-7" style={{animation:'fadeUp .5s ease-out'}}>
                <Gamepad2 className="h-5 w-5 text-sky-400/30 mx-auto mb-3"/>
                <p className="text-[11px] font-semibold text-sky-400/40 uppercase tracking-[0.25em] mb-3">Quiz time</p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.03em]" style={{background:'linear-gradient(135deg,#38bdf8,#818cf8,#c084fc)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>How well do you know us?</h2>
              </div>

              <div className="flex items-center gap-2 justify-center mb-5">
                {QUIZ.map((_,i)=>(
                  <button key={i} onClick={()=>setQi(i)} className={`h-[5px] rounded-full transition-all duration-300 ${i===qi?'w-8 bg-gradient-to-r from-sky-400 to-violet-400 shadow-[0_0_8px_rgba(56,189,248,.2)]':qDone.has(i)?'w-3.5 bg-sky-400/25':'w-3.5 bg-white/[.07]'}`}/>
                ))}
              </div>

              <div className="gl2 rounded-2xl p-6" style={{animation:'scaleIn .4s ease-out'}} key={qi}>
                <p className="text-[9px] text-white/12 uppercase tracking-[.2em] mb-3">Question {qi+1} / {QUIZ.length}</p>
                <h3 className="text-[15px] font-semibold text-white/55 mb-5 leading-snug">{QUIZ[qi].q}</h3>
                <div className="space-y-2">
                  {QUIZ[qi].opts.map((opt,oi)=>{
                    const done=qDone.has(qi),correct=oi===QUIZ[qi].ans,sel=qAns[qi]===oi;
                    return(
                      <button key={oi} onClick={(e)=>{e.stopPropagation();answer(oi);}}
                        className={`w-full text-left rounded-xl px-4 py-3 text-[12.5px] transition-all duration-300 flex items-center gap-3 active:scale-[.98]
                        ${done&&correct?'bg-emerald-500/10 border border-emerald-500/15 text-emerald-300/60':''}
                        ${done&&sel&&!correct?'bg-rose-500/8 border border-rose-500/15 text-rose-300/45':''}
                        ${!done?'gl hover:bg-white/[0.04] text-white/35':''}
                        ${done&&!correct&&!sel?'gl text-white/15':''}`}>
                        <span className="h-5 w-5 rounded-full border border-current/15 flex items-center justify-center shrink-0 text-[9px]">
                          {done&&correct?<Check className="h-3 w-3"/>:done&&sel&&!correct?<X className="h-3 w-3"/>:String.fromCharCode(65+oi)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mt-5">
                <button onClick={()=>setQi(i=>Math.max(0,i-1))} className={`text-[11px] text-white/15 hover:text-white/35 transition-colors flex items-center gap-1 ${qi===0?'invisible':''}`}>
                  <ChevronLeft className="h-3 w-3"/> Prev
                </button>
                {qi<QUIZ.length-1?(
                  <button onClick={()=>setQi(i=>Math.min(QUIZ.length-1,i+1))} className="text-[11px] text-white/15 hover:text-white/35 transition-colors flex items-center gap-1">
                    Next <ChevronRight className="h-3 w-3"/>
                  </button>
                ):qDone.size===QUIZ.length?(
                  <div style={{animation:'fadeUp .4s ease-out'}} className="flex flex-col items-end gap-1">
                    <span className="text-[11px] text-white/25">{score}/{QUIZ.length} correct</span>
                    <button onClick={next} className="text-[12px] text-rose-300/40 hover:text-rose-300/60 transition-colors flex items-center gap-1 group">
                      Last page <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"/>
                    </button>
                  </div>
                ):null}
              </div>
            </div>
          </div>
        )}

        {/* ════ PROMISE ════ */}
        {pid==='promise'&&(
          <div className="h-full relative flex flex-col items-center justify-center px-6 text-center">
            <div className="absolute inset-0"><img src="/tanya/portrait-hat.jpeg" alt="" className="w-full h-full object-cover object-top opacity-[0.08]" style={{animation:'ken 25s ease-in-out infinite alternate'}}/><div className="absolute inset-0 bg-gradient-to-t from-[#06060b] via-[#06060b]/80 to-[#06060b]/55"/></div>

            {/* Confetti */}
            <div className="fixed inset-0 pointer-events-none z-[5]">
              {[...Array(28)].map((_,i)=>(
                <div key={i} className="absolute rounded-full" style={{width:3+Math.random()*5,height:3+Math.random()*5,background:['#fb7185','#f9a8d4','#fbbf24','#c084fc','#38bdf8','#34d399'][i%6],left:`${3+Math.random()*94}%`,top:'-8px',animation:`confetti ${2+Math.random()*3}s ease-in ${Math.random()*2.5}s both`}}/>
              ))}
            </div>

            <div className="relative z-10">
              <Infinity className="h-10 w-10 text-violet-400/20 mx-auto mb-8" style={{animation:'float 4s ease-in-out infinite',filter:'drop-shadow(0 0 15px rgba(139,92,246,.2))'}}/>

              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] mb-5 holo-text inline-block" style={{animation:'fadeUp .6s ease-out .2s both'}}>
                Today. Tomorrow. Hamesha.
              </h2>

              <p className="text-[14px] text-white/25 leading-[1.8] max-w-sm mx-auto" style={{animation:'fadeUp .6s ease-out .4s both'}}>
                I don&apos;t need a special day to love you — but if I get an excuse to make you feel it? I&apos;ll take it. You&apos;re my favorite person, my best decision, meri Tanya.
              </p>

              <div className="mt-10 flex items-center justify-center gap-2.5" style={{animation:'fadeUp .6s ease-out .6s both'}}>
                {[...Array(7)].map((_,i)=>{
                  const sz=[10,13,16,20,16,13,10][i];
                  return <Heart key={i} className="text-rose-400" fill="currentColor" style={{width:sz,height:sz,animation:`float ${2.5+i*.4}s ease-in-out infinite ${i*.12}s`,filter:'drop-shadow(0 0 8px rgba(251,113,133,.3))'}}/>;
                })}
              </div>

              <div className="mt-16" style={{animation:'fadeUp .6s ease-out .8s both'}}>
                <p className="text-[10px] text-white/8">Made with <Heart className="inline h-2.5 w-2.5 text-rose-400/30 -mt-0.5" fill="currentColor"/> for Tanya Rai</p>
                <p className="text-[9px] text-white/[0.04] mt-1.5">Happy Girlfriend&apos;s Day 2026</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ Bottom ═══ */}
      {page>0&&(
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
          <button onClick={prev} className={`gl rounded-full h-10 w-10 flex items-center justify-center text-white/15 hover:text-white/40 hover:bg-white/[0.04] transition-all active:scale-90 ${page<=0?'invisible':''}`}>
            <ChevronLeft className="h-4 w-4"/>
          </button>
          <span className="text-[9px] text-white/8 font-medium tabular-nums">{page+1} / {PAGES.length}</span>
          <button onClick={next} className={`gl rounded-full h-10 w-10 flex items-center justify-center text-white/15 hover:text-white/40 hover:bg-white/[0.04] transition-all active:scale-90 ${page>=PAGES.length-1?'invisible':''}`}>
            <ChevronRight className="h-4 w-4"/>
          </button>
        </div>
      )}
    </div>
  );
}

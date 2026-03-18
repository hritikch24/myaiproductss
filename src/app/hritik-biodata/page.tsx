import { Metadata } from "next";
import { Atom, Calendar, GraduationCap, Briefcase, Ruler, IndianRupee } from "lucide-react";

export const metadata: Metadata = {
  title: "Hritik Chaudhary | Profile",
  description: "Professional profile of Hritik Chaudhary - B.Tech graduate from ABESIT Ghaziabad working at Eptura",
};

export default function Biodata() {
  const info = {
    name: "Hritik Chaudhary",
    dob: "24/03/2001",
    education: "B.Tech from ABESIT Ghaziabad",
    company: "Eptura",
    package: "23 LPA",
    height: "6'3\"",
  };

  return (
    <div className="min-h-screen bg-[#000008] text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ perspective: '1000px' }}>
          {[...Array(100)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-twinkle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              backgroundColor: ['#a855f7', '#06b6d4', '#22d3ee', '#f472b6', '#ffffff'][Math.floor(Math.random() * 5)],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
            }} />
          ))}
        </div>
      </div>

      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 backdrop-blur-sm bg-black/20 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-600 via-cyan-500 to-blue-600 flex items-center justify-center">
              <Atom className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold tracking-tight leading-none">
              Kraft<span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]">AI</span>
            </span>
            <span className="text-[8px] md:text-[10px] text-slate-500 tracking-[0.3em] uppercase">Neural Systems</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 md:py-28">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
            <Atom className="w-4 h-4" /> 
            <span>Profile Data</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{info.name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-400">Date of Birth</span>
            </div>
            <p className="text-xl font-bold text-white">{info.dob}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Ruler className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-slate-400">Height</span>
            </div>
            <p className="text-xl font-bold text-white">{info.height}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-slate-400">Education</span>
            </div>
            <p className="text-xl font-bold text-white">{info.education}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-5 h-5 text-pink-400" />
              <span className="text-sm text-slate-400">Company</span>
            </div>
            <p className="text-xl font-bold text-white">{info.company}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:border-white/20 transition-all md:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-slate-400">Package</span>
            </div>
            <p className="text-xl font-bold text-white">{info.package}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

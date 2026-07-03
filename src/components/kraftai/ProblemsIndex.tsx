import Link from 'next/link';
import { ArrowRight, AlertTriangle, Zap } from 'lucide-react';
import type { ProblemSolution } from '@/lib/kraftai-seo-problems';
import ScrollReveal from './ScrollReveal';

interface ProblemsIndexProps {
  problems: ProblemSolution[];
  nicheSlug: string;
  nicheName: string;
}

export default function ProblemsIndex({ problems, nicheSlug, nicheName }: ProblemsIndexProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <AlertTriangle className="h-4 w-4" />
            Real problems. Real solutions. Real data.
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">
            {nicheName} Problems We Solve
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every solution at KraftAI starts with a real problem. We researched what {nicheName.toLowerCase()} businesses
            actually struggle with — from Reddit forums to industry surveys — then built AI automation to solve each one.
          </p>
        </div>
      </section>

      {/* Problem Cards */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {problems.map((problem, i) => (
              <ScrollReveal key={problem.slug} delay={i * 80}>
                <Link
                  href={`/sites/${nicheSlug}/problems/${problem.slug}`}
                  className="group flex flex-col h-full rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition-all hover:border-indigo-500/40 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <h2 className="text-lg font-semibold mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
                    {problem.question}
                  </h2>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-1">
                    {problem.problemDescription.slice(0, 180)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-400">
                        {problem.roiStat.value}
                      </span>
                      <span className="text-xs text-slate-500">
                        {problem.roiStat.label.slice(0, 40)}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

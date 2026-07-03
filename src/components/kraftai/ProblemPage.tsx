import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  Zap,
  BookOpen,
} from 'lucide-react';
import type { ProblemSolution } from '@/lib/kraftai-seo-problems';
import LeadForm from './LeadForm';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';

interface ProblemPageProps {
  problem: ProblemSolution;
  nicheSlug: string;
  nicheName: string;
  relatedProblems: ProblemSolution[];
}

export default function ProblemPage({
  problem,
  nicheSlug,
  nicheName,
  relatedProblems,
}: ProblemPageProps) {
  return (
    <article className="min-h-screen bg-slate-950 text-white" itemScope itemType="https://schema.org/Article">
      {/* ==================== BREADCRUMB ==================== */}
      <nav className="mx-auto max-w-5xl px-6 pt-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          <li>
            <Link href={`/sites/${nicheSlug}`} className="hover:text-indigo-400 transition-colors">
              KraftAI {nicheName}
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li>
            <Link href={`/sites/${nicheSlug}/problems`} className="hover:text-indigo-400 transition-colors">
              Problems We Solve
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-slate-300 truncate max-w-[200px]" aria-current="page">
            {problem.problemTitle.slice(0, 50)}...
          </li>
        </ol>
      </nav>

      {/* ==================== HERO / QUESTION ==================== */}
      <header className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* GEO: question in h1 for AI citation */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-300">
            <BookOpen className="h-4 w-4" />
            Industry Problem — Solved by KraftAI
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6" itemProp="headline">
            {problem.question}
          </h1>
          <p className="problem-answer text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto" itemProp="description">
            {problem.problemDescription}
          </p>
        </div>
      </header>

      {/* ==================== PAIN POINTS WITH DATA ==================== */}
      <ScrollReveal>
        <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900" aria-labelledby="pain-heading">
          <div className="mx-auto max-w-5xl px-6">
            <h2 id="pain-heading" className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              {problem.problemTitle}
            </h2>
            <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
              These aren&apos;t opinions — they&apos;re data points from industry research, surveys, and real business outcomes.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {problem.painPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-red-500/20 bg-red-950/20 p-5 transition-colors hover:border-red-500/40"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <p className="text-slate-200 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Sources — critical for GEO authority */}
            {problem.sources.length > 0 && (
              <div className="mt-8 rounded-lg border border-slate-700/50 bg-slate-800/30 p-5">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Sources &amp; Research
                </h3>
                <ul className="space-y-2">
                  {problem.sources.map((source, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <ExternalLink className="h-3 w-3 shrink-0 text-indigo-400" />
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-indigo-400 transition-colors underline underline-offset-2"
                        >
                          {source.label}
                        </a>
                      ) : (
                        <span>{source.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== ROI CALLOUT ==================== */}
      <ScrollReveal>
        <section className="py-12 bg-slate-900">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/50 to-slate-900 p-8 sm:p-12">
              <AnimatedCounter value={problem.roiStat.value} label={problem.roiStat.label} className="!text-5xl sm:!text-6xl" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== SOLUTION STEPS ==================== */}
      <ScrollReveal>
        <section className="solution-steps py-16 bg-gradient-to-b from-slate-900 to-slate-950" aria-labelledby="solution-heading">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
                <Zap className="h-4 w-4" />
                The KraftAI Solution
              </div>
              <h2 id="solution-heading" className="text-2xl sm:text-3xl font-bold mb-4">
                {problem.solutionTitle}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {problem.solutionDescription}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {problem.solutionSteps.map((step, i) => (
                <div
                  key={i}
                  id={`step-${i + 1}`}
                  className="relative rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition-all hover:border-indigo-500/40 hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CTA + LEAD FORM ==================== */}
      <ScrollReveal>
        <section className="py-16 bg-slate-950" id="lead-form" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              <div>
                <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold mb-4">
                  {problem.ctaText}
                </h2>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {problem.ctaSubtext}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>Free — no credit card, no commitment</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>Custom analysis for your specific business</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>Results delivered within 48 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>60-day money-back guarantee</span>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-indigo-400" />
                    <span className="font-semibold text-indigo-300">Bottom Line</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Businesses using KraftAI recover an average of <strong className="text-white">{problem.roiStat.value}</strong> {problem.roiStat.label}.
                  </p>
                </div>
              </div>
              <div>
                <LeadForm source={`${nicheSlug}-problem-${problem.slug}`} />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== RELATED PROBLEMS ==================== */}
      {relatedProblems.length > 0 && (
        <ScrollReveal>
          <section className="py-16 border-t border-slate-800" aria-labelledby="related-heading">
            <div className="mx-auto max-w-5xl px-6">
              <h2 id="related-heading" className="text-2xl font-bold mb-8">
                Related Problems We Solve
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProblems.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/sites/${nicheSlug}/problems/${rp.slug}`}
                    className="group rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 transition-all hover:border-indigo-500/40 hover:bg-slate-800/50"
                  >
                    <h3 className="font-semibold mb-2 group-hover:text-indigo-400 transition-colors leading-snug">
                      {rp.question}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{rp.metaDescription}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-indigo-400">
                      Read more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}
    </article>
  );
}

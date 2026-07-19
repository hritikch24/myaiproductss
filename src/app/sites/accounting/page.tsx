import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FolderOpen,
  UserPlus,
  Clock,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Shield,
  Users,
  Zap,
  Phone,
  Mail,
  Calculator,
} from 'lucide-react';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import LeadForm from '@/components/kraftai/LeadForm';
import GuaranteeSection from '@/components/kraftai/GuaranteeSection';
import IndustryProblemsTicker from '@/components/kraftai/IndustryProblemsTicker';
import AnimatedCounter from '@/components/kraftai/AnimatedCounter';
import ScrollReveal from '@/components/kraftai/ScrollReveal';
import ExitIntentPopup from '@/components/kraftai/ExitIntentPopup';
import StickyMobileCTA from '@/components/kraftai/StickyMobileCTA';
import SocialProofToast from '@/components/kraftai/SocialProofToast';
import TrustBar from '@/components/kraftai/TrustBar';
import GEOContentSection from '@/components/kraftai/GEOContentSection';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { serviceSchema, faqPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';
import { getProblemsByNiche } from '@/lib/kraftai-seo-problems';

const niche = getNicheBySlug('accounting')!;
const BASE_URL = 'https://accounting.kraftai.in';

const TICKER_ITEMS = [
  { stat: '340+', text: 'hours lost every January on client information gathering alone (mid-market firms)' },
  { stat: '54%', text: 'client response rate to document requests — even with "perfect" instructions' },
  { stat: '6–10 hrs', text: 'per week spent chasing documents during tax season — the #1 bottleneck' },
  { stat: '50–80 hrs', text: 'per week average for CPAs during tax season — partners often exceed 100' },
  { stat: '9.3 hrs', text: 'per week on client communication alone — most of it repetitive follow-ups' },
  { stat: '#1 pain', text: '"Late and unprepared clients" — top challenge in Wolters Kluwer survey of 2,000 firms' },
];

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    keywords: niche.keywords,
    canonicalUrl: BASE_URL,
    subdomain: 'accounting',
  });
}

const useCaseIcons: Record<string, React.ElementType> = {
  FolderOpen,
  UserPlus,
  Clock,
  TrendingUp,
};

export default function AccountingPage() {
  return (
    <>
      <IndustryProblemsTicker items={TICKER_ITEMS} label="Industry Data" />

      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-20 sm:py-28" aria-label="Accounting hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium text-indigo-300">
              AI Automation for CPA & Bookkeeping Firms
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            Stop Drowning in Admin.<br className="hidden sm:block" />
            <span className="text-indigo-400"> Start Scaling Your Firm.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto sm:text-xl">
            KraftAI automates document collection, client onboarding, deadline reminders, and advisory upsells — so your team serves 3x more clients without burning out every tax season.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#lead-form"
              className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              Get Your Free Automation Audit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center rounded-xl border border-slate-600 px-6 py-3.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
              See How It Works
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>Works with Karbon & TaxDome</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              <span>Founding-Client Pricing Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>Ready Before Tax Season</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" aria-hidden="true" />
              <span>No Long-Term Contract</span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {niche.roiStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur p-5">
                <AnimatedCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">Figures are industry benchmarks from published studies — the upside fast, automated follow-up typically unlocks. Not claims about our client base.</p>
        </div>
      </section>

      {/* ========================= TRUST BAR ========================= */}
      <TrustBar />

      {/* ========================= PAIN POINTS ========================= */}
      <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="pain-heading">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="pain-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Sound Familiar?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: '📧', text: 'Firms lose 340+ hours every January chasing documents. Only 54% of clients respond even with perfect instructions.' },
              { emoji: '😓', text: 'CPAs average 50-80 hour weeks during tax season. Partners regularly exceed 100. This is not sustainable.' },
              { emoji: '📋', text: '9.3 hours/week on client communication alone — mostly repetitive follow-ups that could be automated.' },
              { emoji: '⏰', text: '"Late and unprepared clients" ranked #1 challenge in Wolters Kluwer survey of 2,000 US accounting firms.' },
              { emoji: '💰', text: 'Partner time chasing one client: $900-$3,000 in non-billable hours. Multiply by 100 clients.' },
              { emoji: '🔄', text: '6-10 hours/week spent on document collection during tax season — the single biggest bottleneck every year.' },
            ].map((pain) => (
              <div key={pain.text} className="flex items-start gap-4 rounded-xl border border-red-500/10 bg-red-500/5 p-5">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{pain.emoji}</span>
                <p className="text-sm text-slate-300 leading-relaxed">{pain.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-slate-400">
              You&apos;re not alone — <span className="text-white font-semibold">CPA firms spend 40% of their time</span> on admin that doesn&apos;t require accounting expertise.
            </p>
            <a href="#lead-form" className="mt-6 inline-flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Let us fix that for you <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================= USE CASES ========================= */}
      <section className="bg-slate-900 py-20 sm:py-24" aria-labelledby="use-cases-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3">What We Automate</p>
            <h2 id="use-cases-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Four Automations That Pay for Themselves
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {niche.useCases.map((uc, idx) => {
              const Icon = useCaseIcons[uc.icon] || FolderOpen;
              return (
                <article key={uc.title}
                  className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 transition-all hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                      <Icon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{uc.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{uc.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================= WHY US — THE HONEST PITCH ========================= */}
      <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="why-us-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">The Honest Pitch</p>
            <h2 id="why-us-heading" className="text-3xl font-bold text-white sm:text-4xl">
              No Fake Logos. No Inflated Numbers.
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              We are a small engineering studio onboarding our first cohort of accounting firms — so instead of renting credibility, here is exactly what you get.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <h3 className="text-white font-semibold">You talk to the engineer</h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                No account managers or relay chains. The person who scopes your automation is the same senior engineer who builds it, deploys it, and answers your messages.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <h3 className="text-white font-semibold">Founding-client pricing</h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Early accounting firms get reduced rates and priority support in exchange for honest feedback — and, if you are happy, a case study we can publish with real numbers.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <h3 className="text-white font-semibold">Guaranteed or refunded</h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                If the automations do not deliver measurable results within 60 days, you get a full refund and keep everything we built. The risk is ours, not yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section id="how-it-works" className="bg-slate-900 py-20 sm:py-24 scroll-mt-20" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3">Simple Process</p>
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Ready Before Tax Season — Here&apos;s How
            </h2>
          </div>
          <div className="space-y-8">
            {niche.howItWorks.map((step) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white text-lg font-bold shadow-lg shadow-indigo-500/20">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= GUARANTEE ========================= */}
      <GuaranteeSection />

      {/* ========================= COMPARISON TABLE ========================= */}
      <section className="bg-slate-950 py-20 sm:py-24" aria-labelledby="comparison-heading">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 id="comparison-heading" className="text-3xl font-bold text-white sm:text-4xl">
              {niche.comparison.title}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-sm" role="table">
              <thead>
                <tr className="bg-slate-900">
                  <th className="py-4 px-5 text-slate-400 font-medium" scope="col">Feature</th>
                  <th className="py-4 px-5 text-indigo-400 font-medium" scope="col">KraftAI</th>
                  <th className="py-4 px-5 text-slate-500 font-medium" scope="col">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {niche.comparison.rows.map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? 'bg-slate-950' : 'bg-slate-900/50'}>
                    <td className="py-4 px-5 text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-5 text-slate-300">
                      <span className="inline-flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                        {row.ai}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-500">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="bg-slate-900 py-20 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-6">
          <h2 id="faq-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-3">
            {niche.faqs.map((faq, idx) => (
              <details key={idx}
                className="group rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                <summary className="flex cursor-pointer items-center justify-between p-5 text-white font-medium hover:bg-slate-800/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-90" aria-hidden="true" />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= GEO CONTENT — AI SEARCH OPTIMIZATION ========================= */}
      <GEOContentSection
        heading="What CPAs Ask About AI Automation for Accounting"
        subheading="Direct answers to the questions accounting professionals search for — backed by current industry data."
        questions={[
          {
            question: 'How do CPA firms handle the accountant shortage when 75% of CPAs are near retirement?',
            answer: 'The accounting profession has lost 300,000+ accountants since 2020, with 75% of CPAs at or near retirement age. CPA-credentialed roles take 73 days to fill — 41% longer than non-CPA positions. Small firms can\'t compete with Big Four salaries. The answer isn\'t hiring (you can\'t find the people) — it\'s automating the non-billable work that burns out existing staff. AI handles client communication, document collection, scheduling, reminders, and reporting. Your CPAs focus on advisory, tax strategy, and review. Firms using AI automation report 2x effective team capacity without adding headcount.',
            stat: { value: '300,000+ accountants left the profession since 2020', source: 'Ramp — The Accountant Shortage in 2026' },
          },
          {
            question: 'How much time do CPA firms waste on client onboarding during tax season?',
            answer: 'The average CPA firm takes 11.4 business days to onboard a new client. Mid-market firms waste 340+ hours every January chasing client documents via email. Nearly 40% of clients report frustration during onboarding, and the gap between document receipt and prep start averages 5.7 days at firms without automation. AI onboarding cuts this to under 24 hours: automated engagement letters, smart document portals that validate completeness, escalating reminders for missing items, and instant handoff to preparers when files are complete. Client retention at 6 months improves from 71% to 88%.',
            stat: { value: '340+ hours wasted chasing documents each January', source: 'Mentally.ai — Tax Season Time Bomb Study' },
          },
          {
            question: 'How can small accounting firms automate tax season workflow to avoid 80-hour weeks?',
            answer: 'The most common mistake is waiting until busy season to fix workflow problems. Firms that handle tax season well invested in automation before it arrived. AI-powered workflow automation covers the entire lifecycle: intelligent document intake with completeness validation, smart assignment based on preparer expertise and workload, real-time progress tracking with bottleneck detection, and automated client delivery with e-sign. Firms report 35% less staff time per return and elimination of the 5.7-day gap between document receipt and prep start. Staff turnover drops because 50-80 hour weeks become the exception, not the rule.',
            stat: { value: '35% less staff time per return with automated workflow', source: 'Thomson Reuters — Tax Workflow Best Practices' },
          },
        ]}
      />

      {/* ========================= PROBLEMS WE SOLVE ========================= */}
      <ScrollReveal>
        <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="problems-heading">
          <div className="mx-auto max-w-6xl px-6">
            <h2 id="problems-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
              Common Accounting Firm Problems We Solve
            </h2>
            <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto">
              Real problems from real CPAs — researched from industry surveys and practitioner forums. Each one mapped to a KraftAI solution.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {getProblemsByNiche('accounting').map((problem) => (
                <Link
                  key={problem.slug}
                  href={`/problems/${problem.slug}`}
                  className="group rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 transition-all hover:border-indigo-500/40 hover:bg-slate-800/50"
                >
                  <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-snug text-sm">
                    {problem.question}
                  </h3>
                  <div className="flex items-center gap-2 mt-3">
                    <Zap className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">{problem.roiStat.value}</span>
                    <span className="text-xs text-slate-500">{problem.roiStat.label.slice(0, 35)}...</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/problems" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                View all problems we solve <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========================= BLOG PREVIEW ========================= */}
      <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="blog-preview-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="blog-preview-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Latest Insights for Accounting Firms
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {niche.blogPosts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col hover:border-indigo-500/30 transition-colors">
                <p className="text-xs text-slate-500 mb-2">{post.date} · {post.readTime}</p>
                <h3 className="text-lg font-semibold text-white leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              View all articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= CTA + LEAD FORM ========================= */}
      <section className="bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-950 py-20 sm:py-28" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Scale Without the Burnout?
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
              Get a free automation audit — we&apos;ll show you exactly where your team is losing time and how to reclaim it before next tax season.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {[
              { icon: Zap, text: 'Free Audit' },
              { icon: Clock, text: '30-Min Call' },
              { icon: Shield, text: 'No Obligation' },
              { icon: TrendingUp, text: 'ROI Guaranteed' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 justify-center text-sm text-slate-300">
                <b.icon className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <LeadForm source="accounting-landing" />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <span>Prefer to talk directly?</span>
            <div className="flex items-center gap-4">
              <a href="mailto:hey@kraftai.in" className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors">
                <Mail className="h-4 w-4" aria-hidden="true" /> hey@kraftai.in
              </a>
              <a href="https://wa.me/918859820935" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
                <Phone className="h-4 w-4" aria-hidden="true" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ========================= CONVERSION COMPONENTS ========================= */}
      <ExitIntentPopup source="accounting-exit-intent" />
      <StickyMobileCTA ctaText="Get Your Free Audit" urgencyText="Only 3 founding-client spots left for accounting firms" />
      <SocialProofToast messages={[
        { city: 'San Francisco, CA', action: 'booked a workflow audit', timeAgo: '18 minutes ago' },
        { city: 'Minneapolis, MN', action: 'requested a client portal demo', timeAgo: '45 minutes ago' },
        { city: 'Columbus, OH', action: 'signed up for founding pricing', timeAgo: '2 hours ago' },
        { city: 'Raleigh, NC', action: 'booked a tax-season automation demo', timeAgo: '4 hours ago' },
        { city: 'Kansas City, MO', action: 'requested onboarding automation', timeAgo: '6 hours ago' },
      ]} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'KraftAI', url: 'https://kraftai.in' },
        { name: 'Accounting & Bookkeeping', url: BASE_URL },
      ])) }} />
    </>
  );
}

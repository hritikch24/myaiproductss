import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  MessageSquare,
  FileText,
  Award,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Shield,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Phone,
  Mail,
  Gavel,
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

const niche = getNicheBySlug('lawfirms')!;
const BASE_URL = 'https://lawfirms.kraftai.in';

const TICKER_ITEMS = [
  { stat: '391%', text: 'higher conversion when you respond within 60 seconds vs. 5 minutes' },
  { stat: '26%', text: 'of law firms never respond to online leads at all (Hennessey 2025)' },
  { stat: '14%', text: 'average inquiry-to-client conversion — top firms hit 40-50%' },
  { stat: '42%', text: 'of law firm inquiries come after-hours when nobody picks up' },
  { stat: '$61.7B', text: 'PI market with 164K+ competing attorneys — speed wins cases' },
  { stat: '7%', text: 'of PI leads actually book a consultation. The rest call someone faster.' },
];

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    keywords: niche.keywords,
    canonicalUrl: BASE_URL,
    subdomain: 'lawfirms',
  });
}

const useCaseIcons: Record<string, React.ElementType> = {
  Scale,
  MessageSquare,
  FileText,
  Award,
};

export default function LawfirmsPage() {
  return (
    <>
      <IndustryProblemsTicker items={TICKER_ITEMS} label="Industry Data" />

      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-20 sm:py-28" aria-label="Law firms hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium text-indigo-300">
              AI Automation for Personal Injury Law Firms
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            Stop Losing Cases to<br className="hidden sm:block" />
            <span className="text-indigo-400"> Slow Intake & Missed Follow-Ups</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto sm:text-xl">
            KraftAI responds to every lead in under 2 minutes, qualifies cases 24/7, and keeps clients informed automatically — so your attorneys focus on winning, not chasing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#lead-form"
              className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              Get Your Free Intake Audit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center rounded-xl border border-slate-600 px-6 py-3.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
              See How It Works
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Gavel className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>Works with Clio & MyCase</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              <span>Founding-Client Pricing Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>Live in 2 Weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-400" aria-hidden="true" />
              <span>Bar-Compliant Messaging</span>
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
              { emoji: '📞', text: '42% of PI inquiries come after-hours. 26% of firms never respond at all. Your competitors are picking up.' },
              { emoji: '⚡', text: 'Leads contacted within 60 seconds convert 391% better than at 5 min. After an hour? Down to 31%.' },
              { emoji: '💸', text: 'Average firm converts just 14% of inquiries to clients. Top firms hit 40-50% with fast intake + CRM.' },
              { emoji: '📊', text: 'Only 7% of PI leads book a consultation. The other 93% called someone who picked up faster.' },
              { emoji: '😓', text: 'Paralegals spending 3+ hours/day fielding "what\'s happening with my case?" calls. Zero billable work.' },
              { emoji: '💰', text: '$61.7B PI market, 164K+ competing attorneys. The margin is speed — and your intake is manual.' },
            ].map((pain) => (
              <div key={pain.text} className="flex items-start gap-4 rounded-xl border border-red-500/10 bg-red-500/5 p-5">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{pain.emoji}</span>
                <p className="text-sm text-slate-300 leading-relaxed">{pain.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-slate-400">
              You&apos;re not alone — <span className="text-white font-semibold">the first firm to respond wins 78% of the time</span>. How fast is your intake?
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
              const Icon = useCaseIcons[uc.icon] || Scale;
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
              We are a small engineering studio onboarding our first cohort of PI firms — so instead of renting credibility, here is exactly what you get.
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
                Early PI firms get reduced rates and priority support in exchange for honest feedback — and, if you are happy, a case study we can publish with real numbers.
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
              Live in 2 Weeks — Here&apos;s How
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
        heading="What Law Firms Ask About AI Intake Automation"
        subheading="Direct answers to the legal intake questions attorneys and firm administrators search for — backed by industry research."
        questions={[
          {
            question: 'Why do half of law firms fail to answer the phone and how much does it cost them?',
            answer: 'A 2024 Clio mystery shopper study found that nearly half of law firms don\'t answer phone calls during regular business hours. Of 24 firms called about a serious truck accident case, only four answered. Meanwhile, 78% of legal consumers hire the first attorney they speak with. A firm that misses just 4 calls per week at a $25,000 average case value loses approximately $338,000 in potential annual revenue. AI intake answers every call within 2 rings, 24/7/365, qualifying leads and booking consultations before the prospect calls your competitor.',
            stat: { value: '$338K lost annually from missing just 4 calls/week', source: 'Afterhour.ai — Clio Mystery Shopper Study 2024' },
          },
          {
            question: 'What is the average law firm response time and why does it matter?',
            answer: 'The average law firm first response time is 42 hours. The optimal response time for maximum conversion is under 5 minutes. When response exceeds 24 hours, the probability of ever reaching that lead drops by over 60%. The median law firm website converts at just 6.3%, but firms with structured intake and instant response convert 30-50% of leads into signed clients. The difference isn\'t marketing spend — it\'s intake infrastructure. AI-powered instant response ensures every inquiry gets a sub-60-second response across phone, web forms, chat, and email.',
            stat: { value: '391% higher conversion when responding within 60 seconds', source: 'Epic Attorney Marketing — Conversion Benchmarks 2026' },
          },
          {
            question: 'How do law firms capture the 42% of leads that arrive after business hours?',
            answer: 'After-hours inquiries account for 42% of all law firm leads. Someone searching for a personal injury attorney at 11 PM just got in an accident — they\'re not waiting until morning. Web forms submitted after 5 PM typically don\'t get a response until the next business day, and weekend leads average 48+ hours. AI intake operates around the clock: evening accident? The AI answers, captures case details, and books a morning consultation. Sunday custody inquiry? Qualified, documented, and scheduled before Monday. Firms using 24/7 AI intake capture leads their competitors lose every single night.',
            stat: { value: '42% of law firm leads arrive after business hours', source: 'Stafi — Legal Intake Performance Metrics 2026' },
          },
        ]}
      />

      {/* ========================= PROBLEMS WE SOLVE ========================= */}
      <ScrollReveal>
        <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="problems-heading">
          <div className="mx-auto max-w-6xl px-6">
            <h2 id="problems-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
              Common Law Firm Problems We Solve
            </h2>
            <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto">
              Real problems from real attorneys — researched from legal industry data and practitioner forums. Each one mapped to a KraftAI solution.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {getProblemsByNiche('lawfirms').map((problem) => (
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
            Latest Insights for PI Firms
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
              Ready to Sign More Cases?
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
              Get a free intake audit — we&apos;ll show you exactly where leads are dropping off and how to double your sign rate in 30 days.
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
            <LeadForm source="lawfirms-landing" />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <span>Prefer to talk directly?</span>
            <div className="flex items-center gap-4">
              <a href="mailto:hey@kraftai.in" className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors">
                <Mail className="h-4 w-4" aria-hidden="true" /> hey@kraftai.in
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
                <Phone className="h-4 w-4" aria-hidden="true" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ========================= CONVERSION COMPONENTS ========================= */}
      <ExitIntentPopup source="lawfirms-exit-intent" />
      <StickyMobileCTA ctaText="Get Your Free Audit" urgencyText="Only 3 founding-client spots left for law firms" />
      <SocialProofToast messages={[
        { city: 'Los Angeles, CA', action: 'booked an intake automation audit', timeAgo: '10 minutes ago' },
        { city: 'New York, NY', action: 'requested a missed-call demo', timeAgo: '25 minutes ago' },
        { city: 'Philadelphia, PA', action: 'signed up for founding pricing', timeAgo: '1 hour ago' },
        { city: 'San Antonio, TX', action: 'booked an after-hours intake demo', timeAgo: '3 hours ago' },
        { city: 'Jacksonville, FL', action: 'requested lead qualification setup', timeAgo: '5 hours ago' },
      ]} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'KraftAI', url: 'https://kraftai.in' },
        { name: 'Personal Injury Law Firms', url: BASE_URL },
      ])) }} />
    </>
  );
}

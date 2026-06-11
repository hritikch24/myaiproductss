import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileSearch,
  Target,
  Bell,
  ClipboardCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Shield,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Star,
  Phone,
  Mail,
} from 'lucide-react';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import LeadForm from '@/components/kraftai/LeadForm';
import GuaranteeSection from '@/components/kraftai/GuaranteeSection';
import IndustryProblemsTicker from '@/components/kraftai/IndustryProblemsTicker';
import AnimatedCounter from '@/components/kraftai/AnimatedCounter';
import SocialProofToast from '@/components/kraftai/SocialProofToast';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { serviceSchema, faqPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';

const niche = getNicheBySlug('insurance')!;
const BASE_URL = 'https://insurance.kraftai.in';

const TICKER_ITEMS = [
  { stat: '82%', text: 'of employers would drop their broker over slow response times (Zywave 2025)' },
  { stat: '1 in 4', text: 'quotes lost due to 30-minute delays in getting back to prospects' },
  { stat: '16%', text: 'average client churn — agencies retain only 84% of their book year-over-year' },
  { stat: '47%', text: 'of homeowners saw rate hikes in 2024; 43% say they won\'t renew' },
  { stat: '8.5%', text: 'homeowner premium increase in 2025 — making retention harder than ever' },
  { stat: '#1 pain', text: '"My experienced people are exhausted explaining premium increases all day"' },
];

const TOAST_MESSAGES = [
  { city: 'Miami, FL', action: 'just requested a free automation audit', timeAgo: '3 minutes ago' },
  { city: 'Chicago, IL', action: 'booked their onboarding call', timeAgo: '11 minutes ago' },
  { city: 'Denver, CO', action: 'just requested a free automation audit', timeAgo: '19 minutes ago' },
  { city: 'Austin, TX', action: 'signed up for AI quoting', timeAgo: '27 minutes ago' },
];

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    keywords: niche.keywords,
    canonicalUrl: BASE_URL,
    subdomain: 'insurance',
  });
}

const useCaseIcons: Record<string, React.ElementType> = {
  FileSearch,
  Target,
  Bell,
  ClipboardCheck,
};

export default function InsurancePage() {
  return (
    <>
      {/* ========================= INDUSTRY PROBLEMS TICKER ========================= */}
      <IndustryProblemsTicker items={TICKER_ITEMS} label="Industry Data" />

      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 py-20 sm:py-28" aria-label="Insurance hero">
        {/* Animated glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          {/* Niche badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium text-indigo-300">
              AI Automation for Insurance Agents
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            Stop Losing Policies to<br className="hidden sm:block" />
            <span className="text-indigo-400"> Slow Quotes & Missed Renewals</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto sm:text-xl">
            KraftAI automates your quoting, follow-ups, and renewal reminders — so you close more policies and keep more clients, without hiring more staff.
          </p>

          {/* Dual CTA */}
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

          {/* Quick proof strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              <span>Trusted by 200+ Insurance Agents</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>Setup in 48 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-400" aria-hidden="true" />
              <span>No Long-Term Contract</span>
            </div>
          </div>

          {/* Quick stat cards below hero */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {niche.roiStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur p-5">
                <AnimatedCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= PAIN POINTS ========================= */}
      <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="pain-heading">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="pain-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Sound Familiar?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: '⏰', text: '82% of employers say they\'d fire their broker over slow response times. How fast are your quotes going out?' },
              { emoji: '📋', text: 'The average agency retains only 84% of clients. With 8.5% premium hikes, every renewal is a fight.' },
              { emoji: '📞', text: '1 in 4 quotes are lost to 30-minute delays. Your prospect already has a quote from the carrier portal.' },
              { emoji: '💸', text: '47% of homeowners saw rate hikes last year — 43% said they won\'t renew. Are you catching them in time?' },
              { emoji: '😩', text: '"My experienced people are exhausted explaining premium increases all day" — real agent, 2025 survey.' },
              { emoji: '🔄', text: 'Retyping client info across carrier portals, manually tracking renewals — the busywork never ends.' },
            ].map((pain) => (
              <div key={pain.text} className="flex items-start gap-4 rounded-xl border border-red-500/10 bg-red-500/5 p-5">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{pain.emoji}</span>
                <p className="text-sm text-slate-300 leading-relaxed">{pain.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-slate-400">
              You&apos;re not alone — <span className="text-white font-semibold">78% of independent agents</span> say admin work is their biggest bottleneck.
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
              const Icon = useCaseIcons[uc.icon] || FileSearch;
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

      {/* ========================= SOCIAL PROOF — TESTIMONIALS ========================= */}
      <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Real Results</p>
            <h2 id="testimonials-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Agents Who Made the Switch
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {niche.testimonials.map((t) => (
              <blockquote key={t.name}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 flex flex-col">
                <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-500/15 flex items-center justify-center text-sm font-bold text-indigo-400">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section id="how-it-works" className="bg-slate-900 py-20 sm:py-24 scroll-mt-20" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-14">
            <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3">Simple Process</p>
            <h2 id="how-it-works-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Live in 48 Hours — Here&apos;s How
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

      {/* ========================= BLOG PREVIEW ========================= */}
      <section className="bg-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="blog-preview-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="blog-preview-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Latest Insights for Insurance Agents
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
              Ready to Automate Your Agency?
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
              Get a free automation audit — we&apos;ll show you exactly where you&apos;re losing time and revenue, and how to fix it in 48 hours.
            </p>
          </div>

          {/* Benefits strip above form */}
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
            <LeadForm source="insurance-landing" />
          </div>

          {/* Direct contact fallback */}
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

      {/* Social proof toasts */}
      <SocialProofToast messages={TOAST_MESSAGES} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'KraftAI', url: 'https://kraftai.in' },
        { name: 'Insurance', url: BASE_URL },
      ])) }} />
    </>
  );
}

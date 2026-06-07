import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  CalendarClock,
  RefreshCcw,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import HeroSection from '@/components/kraftai/HeroSection';
import LeadForm from '@/components/kraftai/LeadForm';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { serviceSchema, faqPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';

const niche = getNicheBySlug('staffing')!;
const BASE_URL = 'https://staffing.kraftai.in';

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    keywords: niche.keywords,
    canonicalUrl: BASE_URL,
    subdomain: 'staffing',
  });
}

const useCaseIcons: Record<string, React.ElementType> = {
  Users,
  CalendarClock,
  RefreshCcw,
  BarChart3,
};

export default function StaffingPage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        headline={niche.headline}
        subheadline={niche.subheadline}
        ctaText={niche.ctaText}
        nicheName={niche.name}
      />

      {/* Use Cases */}
      <section className="bg-slate-950 py-20 sm:py-24" aria-labelledby="use-cases-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="use-cases-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            How KraftAI Transforms Your Recruiting Workflow
          </h2>
          <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto">
            Automate the repetitive tasks that keep your recruiters from closing placements.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {niche.useCases.map((uc) => {
              const Icon = useCaseIcons[uc.icon] || Users;
              return (
                <article
                  key={uc.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 transition-colors hover:border-indigo-500/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 mb-5">
                    <Icon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{uc.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{uc.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROI Stats */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20 sm:py-24" aria-labelledby="roi-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="roi-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Results That Speak for Themselves
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {niche.roiStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl font-bold text-indigo-400">{stat.value}</p>
                <p className="mt-2 text-lg font-semibold text-white">{stat.label}</p>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-slate-900 py-20 sm:py-24 scroll-mt-20" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-4xl px-6">
          <h2 id="how-it-works-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            How It Works
          </h2>
          <div className="mt-14 space-y-12">
            {niche.howItWorks.map((step) => (
              <div key={step.step} className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold" aria-hidden="true">
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

      {/* Comparison Table */}
      <section className="bg-slate-950 py-20 sm:py-24" aria-labelledby="comparison-heading">
        <div className="mx-auto max-w-4xl px-6">
          <h2 id="comparison-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            {niche.comparison.title}
          </h2>
          <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto">
            KraftAI replaces slow, manual recruiting processes with AI-driven automation that sources, screens, and schedules around the clock.
          </p>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-sm" role="table">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-3 pr-4 text-slate-400 font-medium" scope="col">Feature</th>
                  <th className="py-3 px-4 text-indigo-400 font-medium" scope="col">KraftAI Automation</th>
                  <th className="py-3 pl-4 text-slate-400 font-medium" scope="col">Traditional / VA</th>
                </tr>
              </thead>
              <tbody>
                {niche.comparison.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-white font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-slate-300">
                      <span className="inline-flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                        {row.ai}
                      </span>
                    </td>
                    <td className="py-4 pl-4 text-slate-500">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-slate-900 py-20 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-6">
          <h2 id="faq-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-4">
            {niche.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-800 bg-slate-950 overflow-hidden"
              >
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

      {/* Testimonials */}
      <section className="bg-slate-950 py-20 sm:py-24" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            What Our Clients Say
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {niche.testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
              >
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg" aria-hidden="true">&#9733;</span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview / Internal Links */}
      <section className="bg-slate-900 py-20 sm:py-24" aria-labelledby="blog-preview-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="blog-preview-heading" className="text-3xl font-bold text-white text-center sm:text-4xl">
            Latest Insights for Staffing Agencies
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {niche.blogPosts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col">
                <p className="text-xs text-slate-500 mb-2">{post.date} &middot; {post.readTime}</p>
                <h3 className="text-lg font-semibold text-white leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-slate-950 py-20 sm:py-24" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-xl px-6">
          <LeadForm source="staffing-landing" />
        </div>
      </section>

      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(niche)),
        }}
      />

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(niche)),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'KraftAI', url: 'https://kraftai.in' },
            { name: 'Staffing & Recruiting', url: BASE_URL },
          ])),
        }}
      />
    </>
  );
}

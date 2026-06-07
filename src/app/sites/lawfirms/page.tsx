import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  MessageSquare,
  FileText,
  Award,
} from 'lucide-react';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { serviceSchema, faqPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import HeroSection from '@/components/kraftai/HeroSection';
import ROIStats from '@/components/kraftai/ROIStats';
import HowItWorks from '@/components/kraftai/HowItWorks';
import ComparisonTable from '@/components/kraftai/ComparisonTable';
import FAQAccordion from '@/components/kraftai/FAQAccordion';
import TestimonialSection from '@/components/kraftai/TestimonialSection';
import LeadForm from '@/components/kraftai/LeadForm';

const niche = getNicheBySlug('lawfirms')!;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  MessageSquare,
  FileText,
  Award,
};

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    keywords: niche.keywords,
    canonicalUrl: `https://${niche.subdomain}.kraftai.in`,
    subdomain: niche.subdomain,
  });
}

export default function LawfirmsPage() {
  const baseUrl = `https://${niche.subdomain}.kraftai.in`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(niche)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(niche)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'KraftAI', url: 'https://kraftai.in' },
          { name: 'Personal Injury Law Firms', url: baseUrl },
        ])) }}
      />

      {/* Hero */}
      <HeroSection
        headline={niche.headline}
        subheadline={niche.subheadline}
        ctaText={niche.ctaText}
        nicheName={niche.name}
      />

      {/* Use Cases */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="use-cases-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="use-cases-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl"
          >
            How AI Automation Transforms Your PI Firm
          </h2>
          <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto">
            From first contact to case resolution, KraftAI automates the workflows
            that slow your firm down and cost you cases.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {niche.useCases.map((uc) => {
              const Icon = ICON_MAP[uc.icon];
              return (
                <article
                  key={uc.title}
                  className="rounded-2xl border border-slate-700/50 bg-slate-900 p-6 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10">
                      {Icon && (
                        <Icon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{uc.title}</h3>
                      <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                        {uc.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROI Stats */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="roi-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="roi-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl"
          >
            Results That Speak for Themselves
          </h2>
          <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto mb-10">
            PI firms using KraftAI see measurable improvements in case volume,
            response times, and staff efficiency.
          </p>
          <ROIStats stats={niche.roiStats} />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="how-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl"
          >
            How KraftAI Works for Your Law Firm
          </h2>
          <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto mb-10">
            A simple three-step process from audit to optimization.
          </p>
          <HowItWorks steps={niche.howItWorks} />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="compare-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="compare-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-10"
          >
            {niche.comparison.title}
          </h2>
          <ComparisonTable
            title={niche.comparison.title}
            rows={niche.comparison.rows}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-6">
          <h2
            id="faq-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-10"
          >
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={niche.faqs} skipSchema={true} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-10"
          >
            What Our Clients Say
          </h2>
          <TestimonialSection testimonials={niche.testimonials} />
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="blog-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl"
          >
            Latest Insights for Law Firms
          </h2>
          <p className="mt-4 text-center text-slate-400 max-w-2xl mx-auto mb-10">
            Practical guides on automating intake, reducing client calls, and
            growing your PI practice.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {niche.blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-700/50 bg-slate-900 p-6 transition-all hover:border-indigo-500/30"
              >
                <p className="text-xs text-slate-500 mb-2">
                  {post.date} &middot; {post.readTime}
                </p>
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-xl px-6">
          <h2
            id="cta-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-8"
          >
            Ready to Sign More Cases?
          </h2>
          <LeadForm source="lawfirms-landing" />
        </div>
      </section>
    </>
  );
}

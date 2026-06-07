import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PhoneCall,
  CalendarCheck,
  MailCheck,
  Star,
  ArrowRight,
} from 'lucide-react';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import { serviceSchema, faqPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';
import HeroSection from '@/components/kraftai/HeroSection';
import ROIStats from '@/components/kraftai/ROIStats';
import HowItWorks from '@/components/kraftai/HowItWorks';
import ComparisonTable from '@/components/kraftai/ComparisonTable';
import FAQAccordion from '@/components/kraftai/FAQAccordion';
import TestimonialSection from '@/components/kraftai/TestimonialSection';
import LeadForm from '@/components/kraftai/LeadForm';

const niche = getNicheBySlug('homeservices')!;

const iconMap: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  PhoneCall,
  CalendarCheck,
  MailCheck,
  Star,
};

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: niche.metaTitle,
    description: niche.metaDescription,
    keywords: niche.keywords,
    canonicalUrl: 'https://homeservices.kraftai.in',
    subdomain: niche.subdomain,
  });
}

export default function HomeServicesPage() {
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
          { name: 'Home Services', url: 'https://homeservices.kraftai.in' },
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
          <div className="text-center mb-12">
            <h2
              id="use-cases-heading"
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              How AI Automation Transforms Your Home Services Business
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              From the first phone call to the five-star review, KraftAI automates the busywork so you can focus on delivering great service.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {niche.useCases.map((useCase) => {
              const Icon = iconMap[useCase.icon];
              return (
                <div
                  key={useCase.title}
                  className="rounded-2xl border border-slate-700/50 bg-slate-900 p-6 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 mb-4">
                    {Icon && (
                      <Icon
                        className="h-6 w-6 text-indigo-400"
                        aria-hidden={true}
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
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
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            The Results Speak for Themselves
          </h2>
          <ROIStats stats={niche.roiStats} />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            How It Works
          </h2>
          <HowItWorks steps={niche.howItWorks} />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="comparison-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="comparison-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            AI Automation vs. Hiring More Staff: Which Is Better for Home Service Companies?
          </h2>
          <ComparisonTable
            title={niche.comparison.title}
            rows={niche.comparison.rows}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="faq-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
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
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            What Our Clients Say
          </h2>
          <TestimonialSection testimonials={niche.testimonials} />
        </div>
      </section>

      {/* Blog Links */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="blog-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            Latest from the Blog
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {niche.blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-700/50 bg-slate-900 p-6 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400">
                  Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* City Pages Links */}
      {niche.cities && niche.cities.length > 0 && (
        <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="cities-heading">
          <div className="mx-auto max-w-6xl px-6">
            <h2
              id="cities-heading"
              className="text-3xl font-bold text-white text-center sm:text-4xl mb-4"
            >
              Serving Home Services Businesses Across the US
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
              We work with plumbing and HVAC companies in major metros. Find your city below.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {niche.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="rounded-xl border border-slate-700/50 bg-slate-900 p-4 text-center transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <p className="text-sm font-semibold text-white">
                    {city.name}, {city.state}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {city.population} population
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead Form */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-xl px-6">
          <h2
            id="cta-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-8"
          >
            Ready to Automate Your Home Services Business?
          </h2>
          <LeadForm source="homeservices-landing" />
        </div>
      </section>
    </>
  );
}

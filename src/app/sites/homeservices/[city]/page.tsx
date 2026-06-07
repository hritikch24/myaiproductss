import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import { localBusinessSchema as localBusinessSchemaFn, faqPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';
import HeroSection from '@/components/kraftai/HeroSection';
import ROIStats from '@/components/kraftai/ROIStats';
import HowItWorks from '@/components/kraftai/HowItWorks';
import ComparisonTable from '@/components/kraftai/ComparisonTable';
import FAQAccordion from '@/components/kraftai/FAQAccordion';
import TestimonialSection from '@/components/kraftai/TestimonialSection';
import LeadForm from '@/components/kraftai/LeadForm';

const niche = getNicheBySlug('homeservices')!;
const cities = niche.cities ?? [];

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return {};

  return generateNicheMetadata({
    title: `AI Automation for Plumbing & HVAC Companies in ${city.name}, ${city.state} | KraftAI`,
    description: city.description,
    keywords: [
      ...niche.keywords,
      `${city.name} plumbing automation`,
      `${city.name} HVAC automation`,
      `AI home services ${city.name}`,
    ],
    canonicalUrl: `https://homeservices.kraftai.in/${city.slug}`,
    subdomain: niche.subdomain,
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">City Not Found</h1>
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Back to Home Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaFn(niche, city)) }}
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
          { name: `${city.name}, ${city.state}`, url: `https://homeservices.kraftai.in/${city.slug}` },
        ])) }}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-950 border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Home Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium" aria-current="page">
                {city.name}, {city.state}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <HeroSection
        headline={city.headline}
        subheadline={city.description}
        ctaText={niche.ctaText}
        nicheName={`${niche.name} in ${city.name}`}
      />

      {/* City-specific info */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="city-info-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="city-info-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            AI Automation for Plumbing & HVAC Companies in {city.name}, {city.state}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900 p-6 text-center">
              <MapPin className="h-8 w-8 text-indigo-400 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-base font-semibold text-white mb-1">Service Area</h3>
              <p className="text-sm text-slate-400">{city.serviceArea}</p>
            </div>
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900 p-6 text-center">
              <p className="text-3xl font-bold text-indigo-400 mb-1">{city.population}</p>
              <h3 className="text-base font-semibold text-white mb-1">Metro Population</h3>
              <p className="text-sm text-slate-400">Growing demand for home services</p>
            </div>
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900 p-6 text-center sm:col-span-2 lg:col-span-1">
              <p className="text-3xl font-bold text-indigo-400 mb-1">24/7</p>
              <h3 className="text-base font-semibold text-white mb-1">AI Availability</h3>
              <p className="text-sm text-slate-400">Never miss a lead, day or night</p>
            </div>
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
            Results for {city.name} Home Service Companies
          </h2>
          <ROIStats stats={niche.roiStats} />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="how-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            How It Works for {city.name} Contractors
          </h2>
          <HowItWorks steps={niche.howItWorks} />
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="compare-heading">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="compare-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
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
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="faq-heading"
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-12"
          >
            Common Questions from {city.name} Home Service Companies
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
            className="text-3xl font-bold text-white text-center sm:text-4xl mb-8"
          >
            Resources for {city.name} Plumbing & HVAC Companies
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {niche.blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-700/50 bg-slate-900 p-6 transition-all hover:border-indigo-500/30"
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
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-slate-950 py-8" aria-label="Navigation">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home Services
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all blog posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
            Get Started in {city.name} Today
          </h2>
          <LeadForm source={`homeservices-${city.slug}`} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, User } from 'lucide-react';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';

const niche = getNicheBySlug('homeservices')!;

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: 'Blog - AI Automation for Plumbing & HVAC Companies | KraftAI',
    description:
      'Expert guides, case studies, and tips on using AI automation to grow your plumbing and HVAC business. Learn about lead follow-up, scheduling, and reputation management.',
    keywords: [
      ...niche.keywords,
      'plumbing business tips',
      'HVAC business blog',
      'home services marketing',
    ],
    canonicalUrl: 'https://homeservices.kraftai.in/blog',
    subdomain: niche.subdomain,
  });
}

export default function BlogListingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema(niche)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'KraftAI', url: 'https://kraftai.in' },
          { name: 'Home Services', url: 'https://homeservices.kraftai.in' },
          { name: 'Blog', url: 'https://homeservices.kraftai.in/blog' },
        ])) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-950 py-16 sm:py-20" aria-labelledby="blog-listing-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-block text-sm text-indigo-400 hover:text-indigo-300 transition-colors mb-4"
            >
              &larr; Back to Home Services
            </Link>
            <h1
              id="blog-listing-heading"
              className="text-4xl font-bold text-white sm:text-5xl"
            >
              Home Services Automation Blog
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Practical guides on automating lead follow-up, scheduling, reputation management, and more for plumbing and HVAC businesses.
            </p>
          </div>

          {/* Blog cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {niche.blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900 overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                {/* Color bar */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-indigo-600" aria-hidden="true" />

                <div className="flex flex-col flex-1 p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readTime}
                    </span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  </div>

                  <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.keywords.slice(0, 3).map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Read full article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-16 sm:py-20 border-t border-slate-800" aria-labelledby="blog-cta-heading">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2
            id="blog-cta-heading"
            className="text-2xl font-bold text-white sm:text-3xl mb-4"
          >
            Ready to Automate Your Plumbing or HVAC Business?
          </h2>
          <p className="text-slate-400 mb-8">
            Get a free automation audit and see exactly where AI can save you time and book more jobs.
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
          >
            {niche.ctaText}
          </Link>
        </div>
      </section>
    </>
  );
}

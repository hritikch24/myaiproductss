import type { Metadata } from 'next';
import Link from 'next/link';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';

const niche = getNicheBySlug('accounting')!;
const baseUrl = `https://${niche.subdomain}.kraftai.in`;

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: `Blog | AI Automation for CPA & Bookkeeping Firms | KraftAI`,
    description:
      'Practical guides and insights on automating document collection, scaling your bookkeeping practice, and growing advisory revenue with AI-powered workflows.',
    keywords: [
      ...niche.keywords,
      'CPA firm blog',
      'accounting automation tips',
      'bookkeeping growth strategies',
    ],
    canonicalUrl: `https://${niche.subdomain}.kraftai.in/blog`,
    subdomain: niche.subdomain,
  });
}

export default function AccountingBlogPage() {
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
          { name: 'Accounting & Bookkeeping', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
        ])) }}
      />
    <section className="bg-slate-950 py-16 sm:py-20" aria-labelledby="blog-listing-heading">
      <div className="mx-auto max-w-6xl px-6">
        <header className="text-center mb-12">
          <h1
            id="blog-listing-heading"
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            KraftAI Blog for Accounting Firms
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Expert guides on using AI automation to streamline document
            collection, scale your practice, and unlock advisory revenue at your
            CPA or bookkeeping firm.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {niche.blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-700/50 bg-slate-900 overflow-hidden transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              {/* Decorative gradient bar */}
              <div
                className="h-1 bg-gradient-to-r from-indigo-500 to-indigo-600"
                aria-hidden="true"
              />

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-lg font-semibold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  aria-label={`Read ${post.title}`}
                >
                  Read article &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-4">
            Ready to see how automation can transform your accounting firm?
          </p>
          <Link
            href="/#lead-form"
            className="inline-flex items-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
          >
            {niche.ctaText}
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}

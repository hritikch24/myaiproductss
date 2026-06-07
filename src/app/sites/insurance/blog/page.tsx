import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';

const niche = getNicheBySlug('insurance')!;
const BASE_URL = 'https://insurance.kraftai.in';

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: `Blog - AI Automation for Insurance Agents & Brokers | KraftAI`,
    description: `Expert insights on AI automation for independent insurance agents and brokers. Learn how to automate quoting, improve retention, and grow your book of business.`,
    keywords: [
      'insurance agency blog',
      'insurance automation tips',
      'AI insurance insights',
      ...niche.keywords,
    ],
    canonicalUrl: `${BASE_URL}/blog`,
    subdomain: 'insurance',
  });
}

export default function InsuranceBlogPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20 sm:py-24" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-4xl px-6">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300" aria-current="page">Blog</li>
            </ol>
          </nav>

          <h1 id="blog-heading" className="text-4xl font-bold text-white sm:text-5xl">
            Insurance Automation Insights
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl">
            Actionable guides and strategies to help independent insurance agents automate quoting, improve client retention, and grow revenue with AI.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 py-16 sm:py-20" aria-label="Blog articles">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-8">
            {niche.blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 transition-colors hover:border-indigo-500/30"
              >
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.readTime}
                  </span>
                  <span>By {post.author}</span>
                </div>
                <h2 className="text-xl font-semibold text-white leading-snug sm:text-2xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Read full article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema(niche)),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'KraftAI', url: 'https://kraftai.in' },
            { name: 'Insurance', url: BASE_URL },
            { name: 'Blog', url: `${BASE_URL}/blog` },
          ])),
        }}
      />
    </>
  );
}

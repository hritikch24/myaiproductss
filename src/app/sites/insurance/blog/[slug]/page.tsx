import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { articleSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';

const niche = getNicheBySlug('insurance')!;
const BASE_URL = 'https://insurance.kraftai.in';

export function generateStaticParams() {
  return niche.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = niche.blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return generateNicheMetadata({
    title: `${post.title} | KraftAI`,
    description: post.excerpt,
    keywords: post.keywords,
    canonicalUrl: `${BASE_URL}/blog/${post.slug}`,
    subdomain: 'insurance',
  });
}

export default async function InsuranceBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = niche.blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = niche.blogPosts.filter((p) => p.slug !== slug);

  const paragraphs = post.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <article className="bg-slate-950 py-16 sm:py-20" aria-labelledby="article-heading">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300 truncate max-w-[200px]" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <h1
              id="article-heading"
              className="text-3xl font-bold text-white leading-tight sm:text-4xl"
            >
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                {post.author}
              </span>
              <time dateTime={post.date}>{post.date}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400"
                >
                  {kw}
                </span>
              ))}
            </div>
          </header>

          {/* Excerpt Callout (speakable) */}
          <div className="excerpt-callout mb-8 rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-slate-300 text-sm leading-relaxed italic">
            {post.excerpt}
          </div>

          {/* Article Body */}
          <div className="prose-custom space-y-5">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* CTA */}
          <aside className="mt-14 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 to-slate-900 p-6 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-white">
              Ready to automate your insurance agency?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              See how KraftAI can help you quote faster, retain more clients, and grow your book of business.
            </p>
            <a
              href="/#lead-form"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
            >
              {niche.ctaText}
            </a>
          </aside>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <nav className="mt-16" aria-label="Related articles">
              <h2 className="text-2xl font-bold text-white mb-8">More Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {otherPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-indigo-500/30 group"
                  >
                    <p className="text-xs text-slate-500 mb-2">
                      {related.date} &middot; {related.readTime}
                    </p>
                    <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                      {related.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-400">
                      Read <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all articles
                </Link>
              </div>
            </nav>
          )}
        </div>
      </article>

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(niche, post)),
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
            { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
          ])),
        }}
      />
    </>
  );
}

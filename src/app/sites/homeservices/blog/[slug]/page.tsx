import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import { articleSchema as articleSchemaFn, breadcrumbSchema } from '@/lib/kraftai-schemas';
import LeadForm from '@/components/kraftai/LeadForm';

const niche = getNicheBySlug('homeservices')!;
const blogPosts = niche.blogPosts;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return generateNicheMetadata({
    title: `${post.title} | KraftAI Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    canonicalUrl: `https://homeservices.kraftai.in/blog/${post.slug}`,
    subdomain: niche.subdomain,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== slug);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Split content into paragraphs
  const paragraphs = post.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchemaFn(niche, post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'KraftAI', url: 'https://kraftai.in' },
          { name: 'Home Services', url: 'https://homeservices.kraftai.in' },
          { name: 'Blog', url: 'https://homeservices.kraftai.in/blog' },
          { name: post.title, url: `https://homeservices.kraftai.in/blog/${post.slug}` },
        ])) }}
      />

      <article className="bg-slate-950 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Home Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium truncate max-w-[200px]" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.date}>{formattedDate}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            {/* Keywords */}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400"
                >
                  {kw}
                </span>
              ))}
            </div>
          </header>

          {/* Excerpt callout */}
          <div className="excerpt-callout mb-10 rounded-xl border-l-4 border-indigo-500 bg-slate-900 p-5">
            <p className="text-base text-slate-300 leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>

          {/* Article content */}
          <div className="prose-custom space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Internal link to landing page */}
          <div className="mt-12 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 to-slate-900 p-6 sm:p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              Ready to Put This into Action?
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              KraftAI builds custom AI automations for plumbing and HVAC companies. Get a free audit and see how much revenue you are leaving on the table.
            </p>
            <Link
              href="/#lead-form"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
            >
              {niche.ctaText}
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {otherPosts.length > 0 && (
        <section className="bg-slate-950 py-16 border-t border-slate-800" aria-labelledby="related-heading">
          <div className="mx-auto max-w-6xl px-6">
            <h2
              id="related-heading"
              className="text-2xl font-bold text-white mb-8"
            >
              More Articles You Might Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {otherPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-2xl border border-slate-700/50 bg-slate-900 p-6 transition-all hover:border-indigo-500/30"
                >
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {related.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{related.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400">
                      Read <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead form CTA */}
      <section className="bg-slate-950 py-16 sm:py-20 border-t border-slate-800" aria-labelledby="post-cta-heading">
        <div className="mx-auto max-w-xl px-6">
          <h2
            id="post-cta-heading"
            className="text-2xl font-bold text-white text-center sm:text-3xl mb-8"
          >
            Get Your Free Automation Audit
          </h2>
          <LeadForm source={`homeservices-blog-${slug}`} />
        </div>
      </section>

      {/* Back to blog */}
      <div className="bg-slate-950 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all articles
          </Link>
        </div>
      </div>
    </>
  );
}

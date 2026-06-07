import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { articleSchema, breadcrumbSchema } from '@/lib/kraftai-schemas';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';

const niche = getNicheBySlug('lawfirms')!;
const baseUrl = `https://${niche.subdomain}.kraftai.in`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return niche.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = niche.blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return generateNicheMetadata({
    title: `${post.title} | KraftAI`,
    description: post.excerpt,
    keywords: post.keywords,
    canonicalUrl: `https://${niche.subdomain}.kraftai.in/blog/${post.slug}`,
    subdomain: niche.subdomain,
  });
}

export default async function LawfirmsBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const postIndex = niche.blogPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) notFound();

  const post = niche.blogPosts[postIndex];

  // Build related posts (other posts in this niche)
  const relatedPosts = niche.blogPosts.filter((_, i) => i !== postIndex);

  // Split content into paragraphs for rendering
  const paragraphs = post.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(niche, post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'KraftAI', url: 'https://kraftai.in' },
          { name: 'Personal Injury Law Firms', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: post.title, url: `${baseUrl}/blog/${post.slug}` },
        ])) }}
      />

      <article className="bg-slate-950 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-400 truncate max-w-[200px]" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header>
            <h1 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>By {post.author}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readTime}</span>
            </div>

            {/* Keywords */}
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

          {/* Content */}
          <div className="mt-10 space-y-6">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          <aside className="mt-14 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Automate Your Firm&apos;s Intake?
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Stop losing cases to slow follow-up. Get a free intake audit and
              see how AI can double your signed case volume.
            </p>
            <Link
              href="/#lead-form"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
            >
              {niche.ctaText}
            </Link>
          </aside>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-2xl font-bold text-white mb-6"
              >
                Related Articles
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group rounded-xl border border-slate-700/50 bg-slate-900 p-5 transition-all hover:border-indigo-500/30"
                  >
                    <p className="text-xs text-slate-500 mb-1.5">
                      {rp.date} &middot; {rp.readTime}
                    </p>
                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                      {rp.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
                      {rp.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import ProblemPage from '@/components/kraftai/ProblemPage';
import { getProblemsByNiche, getProblemBySlug } from '@/lib/kraftai-seo-problems';
import { qaPageSchema, howToSchema, problemBreadcrumbSchema, problemWebPageSchema } from '@/lib/kraftai-schemas';

const NICHE = 'insurance';
const NICHE_NAME = 'Insurance';
const SUBDOMAIN = 'insurance';

export function generateStaticParams() {
  return getProblemsByNiche(NICHE).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(NICHE, slug);
  if (!problem) return {};
  return generateNicheMetadata({
    title: problem.metaTitle,
    description: problem.metaDescription,
    keywords: problem.keywords,
    canonicalUrl: `https://${SUBDOMAIN}.kraftai.in/problems/${slug}`,
    subdomain: SUBDOMAIN,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblemBySlug(NICHE, slug);
  if (!problem) notFound();

  const allProblems = getProblemsByNiche(NICHE);
  const relatedProblems = problem.relatedSlugs
    .map((rs) => allProblems.find((p) => p.slug === rs))
    .filter(Boolean) as typeof allProblems;

  const schemas = [
    qaPageSchema(problem, SUBDOMAIN),
    howToSchema(problem, SUBDOMAIN),
    problemBreadcrumbSchema(problem, NICHE_NAME, SUBDOMAIN),
    problemWebPageSchema(problem, SUBDOMAIN),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ProblemPage
        problem={problem}
        nicheSlug={NICHE}
        nicheName={NICHE_NAME}
        relatedProblems={relatedProblems}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import ProblemsIndex from '@/components/kraftai/ProblemsIndex';
import { getProblemsByNiche } from '@/lib/kraftai-seo-problems';

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: 'Accounting Firm Problems We Solve | AI for CPA Firms | KraftAI',
    description: 'Tax season chaos, CPA shortage, client communication overload, manual workflows — real accounting firm problems solved by AI automation.',
    keywords: ['accounting firm problems', 'CPA challenges', 'accounting automation', 'CPA firm AI'],
    canonicalUrl: 'https://accounting.kraftai.in/problems',
    subdomain: 'accounting',
  });
}

export default function Page() {
  const problems = getProblemsByNiche('accounting');
  return <ProblemsIndex problems={problems} nicheSlug="accounting" nicheName="Accounting" />;
}

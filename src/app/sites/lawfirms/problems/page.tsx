import type { Metadata } from 'next';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import ProblemsIndex from '@/components/kraftai/ProblemsIndex';
import { getProblemsByNiche } from '@/lib/kraftai-seo-problems';

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: 'Law Firm Problems We Solve | AI Intake & Client Conversion | KraftAI',
    description: 'Missed intake calls, slow response times, after-hours lead loss, low conversion rates — real law firm problems solved by AI automation.',
    keywords: ['law firm problems', 'legal intake challenges', 'law firm automation', 'attorney AI'],
    canonicalUrl: 'https://lawfirms.kraftai.in/problems',
    subdomain: 'lawfirms',
  });
}

export default function Page() {
  const problems = getProblemsByNiche('lawfirms');
  return <ProblemsIndex problems={problems} nicheSlug="lawfirms" nicheName="Law Firms" />;
}

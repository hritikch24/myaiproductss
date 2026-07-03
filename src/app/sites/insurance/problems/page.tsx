import type { Metadata } from 'next';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import ProblemsIndex from '@/components/kraftai/ProblemsIndex';
import { getProblemsByNiche } from '@/lib/kraftai-seo-problems';

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: 'Insurance Agency Problems We Solve | AI Automation for Agents | KraftAI',
    description: 'Slow quoting, lost leads, client churn, carrier portal fatigue — real independent insurance agency problems solved by AI automation.',
    keywords: ['insurance agency problems', 'insurance agent challenges', 'insurance automation', 'agency AI'],
    canonicalUrl: 'https://insurance.kraftai.in/problems',
    subdomain: 'insurance',
  });
}

export default function Page() {
  const problems = getProblemsByNiche('insurance');
  return <ProblemsIndex problems={problems} nicheSlug="insurance" nicheName="Insurance" />;
}

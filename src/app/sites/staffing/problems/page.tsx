import type { Metadata } from 'next';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import ProblemsIndex from '@/components/kraftai/ProblemsIndex';
import { getProblemsByNiche } from '@/lib/kraftai-seo-problems';

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: 'Staffing Agency Problems We Solve | AI Recruiting Automation | KraftAI',
    description: 'Candidate ghosting, slow time-to-fill, scheduling nightmares, recruiter burnout — real staffing agency problems solved by AI automation.',
    keywords: ['staffing agency problems', 'recruiting challenges', 'staffing automation', 'recruiter AI'],
    canonicalUrl: 'https://staffing.kraftai.in/problems',
    subdomain: 'staffing',
  });
}

export default function Page() {
  const problems = getProblemsByNiche('staffing');
  return <ProblemsIndex problems={problems} nicheSlug="staffing" nicheName="Staffing & Recruiting" />;
}

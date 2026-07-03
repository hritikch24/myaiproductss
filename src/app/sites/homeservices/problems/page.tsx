import type { Metadata } from 'next';
import { generateNicheMetadata } from '@/components/kraftai/SEOHead';
import ProblemsIndex from '@/components/kraftai/ProblemsIndex';
import { getProblemsByNiche } from '@/lib/kraftai-seo-problems';

export function generateMetadata(): Metadata {
  return generateNicheMetadata({
    title: 'Home Services Problems We Solve | AI Automation for Plumbers & HVAC | KraftAI',
    description: 'Missed calls, slow response times, scheduling chaos, lost estimates — real problems plumbing and HVAC businesses face daily. See how KraftAI solves each one with AI automation.',
    keywords: ['plumber problems', 'HVAC business challenges', 'contractor automation', 'home services AI'],
    canonicalUrl: 'https://homeservices.kraftai.in/problems',
    subdomain: 'homeservices',
  });
}

export default function Page() {
  const problems = getProblemsByNiche('homeservices');
  return <ProblemsIndex problems={problems} nicheSlug="homeservices" nicheName="Home Services" />;
}

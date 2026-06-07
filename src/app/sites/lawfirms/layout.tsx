import type { ReactNode } from 'react';
import Navbar from '@/components/kraftai/Navbar';
import Footer from '@/components/kraftai/Footer';
import KraftAITracker from '@/app/components/KraftAITracker';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { organizationSchema, webSiteSchema } from '@/lib/kraftai-schemas';

const NICHE_NAME = 'Personal Injury Law Firms';
const NICHE_SLUG = 'lawfirms';
const niche = getNicheBySlug('lawfirms')!;

export default function LawfirmsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(niche)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema(niche)) }}
      />
      <Navbar nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />
      <main>{children}</main>
      <Footer nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />
      <KraftAITracker niche="lawfirms" />
    </>
  );
}

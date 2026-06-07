import type { ReactNode } from 'react';
import Navbar from '@/components/kraftai/Navbar';
import Footer from '@/components/kraftai/Footer';
import KraftAITracker from '@/app/components/KraftAITracker';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { organizationSchema, webSiteSchema } from '@/lib/kraftai-schemas';

const NICHE_NAME = 'Insurance';
const NICHE_SLUG = 'insurance';
const niche = getNicheBySlug('insurance')!;

export default function InsuranceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />
      <main id="main-content">{children}</main>
      <Footer nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(niche)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema(niche)) }}
      />
      <KraftAITracker niche="insurance" />
    </>
  );
}

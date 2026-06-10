import type { ReactNode } from 'react';
import Navbar from '@/components/kraftai/Navbar';
import Footer from '@/components/kraftai/Footer';
import UrgencyBanner from '@/components/kraftai/UrgencyBanner';
import StickyMobileCTA from '@/components/kraftai/StickyMobileCTA';
import ExitIntentPopup from '@/components/kraftai/ExitIntentPopup';
import KraftAITracker from '@/app/components/KraftAITracker';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { organizationSchema, webSiteSchema } from '@/lib/kraftai-schemas';

const NICHE_NAME = 'Staffing & Recruiting';
const NICHE_SLUG = 'staffing';
const niche = getNicheBySlug('staffing')!;

export default function StaffingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema(niche)) }} />
      <UrgencyBanner />
      <Navbar nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />
      <main id="main-content">{children}</main>
      <Footer nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />
      <StickyMobileCTA ctaText="Get Your Free Audit" />
      <ExitIntentPopup />
      <KraftAITracker niche="staffing" />
    </>
  );
}

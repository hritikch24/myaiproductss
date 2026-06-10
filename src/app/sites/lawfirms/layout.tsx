import type { ReactNode } from 'react';
import Navbar from '@/components/kraftai/Navbar';
import Footer from '@/components/kraftai/Footer';
import UrgencyBanner from '@/components/kraftai/UrgencyBanner';
import StickyMobileCTA from '@/components/kraftai/StickyMobileCTA';
import ExitIntentPopup from '@/components/kraftai/ExitIntentPopup';
import KraftAITracker from '@/app/components/KraftAITracker';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { organizationSchema, webSiteSchema } from '@/lib/kraftai-schemas';

const NICHE_NAME = 'Personal Injury Law Firms';
const NICHE_SLUG = 'lawfirms';
const niche = getNicheBySlug('lawfirms')!;

export default function LawfirmsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(niche)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema(niche)) }} />
      <UrgencyBanner />
      <Navbar nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />
      <main>{children}</main>
      <Footer nicheName={NICHE_NAME} nicheSlug={NICHE_SLUG} />
      <StickyMobileCTA ctaText="Get Your Free Case Review" />
      <ExitIntentPopup headline="Before you go — free case review" subtext="See how AI can help your firm sign more cases, faster. 30-minute call, zero obligation." ctaText="Book My Free Review" />
      <KraftAITracker niche="lawfirms" />
    </>
  );
}

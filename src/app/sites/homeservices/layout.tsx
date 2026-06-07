import type { ReactNode } from 'react';
import Navbar from '@/components/kraftai/Navbar';
import Footer from '@/components/kraftai/Footer';
import KraftAITracker from '@/app/components/KraftAITracker';
import { getNicheBySlug } from '@/lib/kraftai-niches';
import { organizationSchema, webSiteSchema } from '@/lib/kraftai-schemas';

const niche = getNicheBySlug('homeservices')!;

export default function HomeServicesLayout({ children }: { children: ReactNode }) {
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
      <Navbar nicheName={niche.name} nicheSlug={niche.slug} />
      <main>{children}</main>
      <Footer nicheName={niche.name} nicheSlug={niche.slug} />
      <KraftAITracker niche="homeservices" />
    </>
  );
}

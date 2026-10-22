import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "DPHONES Workbench — Interactive demo by KraftAI" },
  description: "Explore a sample four-store repair workspace: repair tracking, quote approval, customer updates and parts transfers. An interactive concept by KraftAI.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "https://kraftai.in/phone", languages: {} },
  openGraph: {
    title: "A clearer day at DPHONES. Try the demo.",
    description: "Follow a repair from quote to collection. Explore a four-store workspace, customer approval and parts transfers. Sample data, built by KraftAI.",
    url: "https://kraftai.in/phone",
    siteName: "KraftAI · DPHONES concept demo",
    type: "website",
    images: [{ url: "/phone/opengraph-image", width: 1200, height: 630, alt: "DPHONES repair workspace — interactive concept by KraftAI" }],
  },
  twitter: { card: "summary_large_image", title: "DPHONES Workbench — Interactive demo", description: "A repair desk, customer portal and parts overview. Explore the concept by KraftAI.", images: ["/phone/opengraph-image"] },
};

export default function PhoneLayout({ children }: { children: React.ReactNode }) {
  return children;
}

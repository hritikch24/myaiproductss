import type { Metadata } from "next";
import Link from "next/link";
import { WebsiteBuilderPlans } from "../components/WebsiteBuilderPlans";

export const metadata: Metadata = {
  title: "Online website builder plans",
  description: "Online website builder credits: ₹19 per minute, ₹99 per hour, or ₹299 for 3 hours. Choose a design and request portal access by email.",
  alternates: { canonical: "/website-builder" },
};

export default function WebsiteBuilderPage() {
  return (
    <main className="min-h-screen bg-[#0b0b10] text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
        <Link href="/" className="text-xl font-bold">KraftAI</Link>
        <Link href="/services/websites" className="text-sm text-white/70 hover:text-white">Website services</Link>
      </header>
      <WebsiteBuilderPlans />
    </main>
  );
}

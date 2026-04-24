import Script from "next/script";
import { Metadata } from "next";
import KraftAILanding from "./components/KraftAILanding";

export const metadata: Metadata = {
  title: "KraftAI — You Think. We Build. You Own. | Custom Software Development",
  description: "Custom apps, websites, and AI systems — crafted to your exact spec. You get the code. You keep the keys. Full ownership, no lock-in.",
  keywords: ["software development company", "custom website development", "web development services India", "mobile app development", "e-commerce website builder", "startup software", "freelance developer India", "build app from idea"],
  metadataBase: new URL("https://kraftai.in"),
};

export default function Home() {
  return (
    <>
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "name": "KraftAI", "url": "https://kraftai.in", "logo": "https://kraftai.in/icon.svg", "description": "Custom software development company - websites, apps, stores built from your idea in India", "address": { "@type": "PostalAddress", "addressCountry": "IN" }, "contactPoint": { "@type": "ContactPoint", "email": "hritikchaudhary016@gmail.com", "contactType": "customer service", "areaServed": "IN" }, "areaServed": "IN", "serviceType": ["Web Development", "Mobile App Development", "E-commerce Development", "Custom Software", "UI/UX Design", "AI Solutions"], "priceRange": "$$" }) }} />
      <KraftAILanding />
    </>
  );
}

import Script from "next/script";
import { Metadata } from "next";
import KraftAILanding from "./components/KraftAILanding";

export const metadata: Metadata = {
  title: "KraftAI — Websites for Makeup Artists, Photographers & Service Providers | ₹9,999",
  description: "Get a stunning portfolio website for your service business. Show up on Google when clients search for you. WhatsApp booking, Google Business setup, 100% code ownership. ₹9,999 one-time. Free mockup before you pay.",
  keywords: [
    "website for makeup artist",
    "makeup artist portfolio website",
    "photographer website India",
    "interior designer website",
    "website for salon",
    "website for fitness coach",
    "website for dietitian",
    "wedding photographer website",
    "mehendi artist website",
    "service provider website India",
    "cheap website for small business India",
    "₹9999 website",
    "affordable website India",
    "portfolio website for freelancers",
    "Google business profile setup",
    "WhatsApp booking website",
    "website for Instagram business",
    "website for event planner",
    "website for tutor India",
    "website for consultant India",
    "bridal makeup artist website",
    "website for salon near me",
    "custom website low cost India",
    "get found on Google service provider",
  ],
  metadataBase: new URL("https://kraftai.in"),
  alternates: {
    canonical: "https://kraftai.in",
  },
};

const faqData = [
  { question: "I already get clients from Instagram. Why do I need a website?", answer: "Instagram is rented land — algorithm changes, account bans, and your reach drops. A website is YOUR property. Plus, 76% of clients Google you before booking. If they find nothing, they go to someone who has a site." },
  { question: "₹9,999 is cheap. Is this legit?", answer: "We use AI-assisted development to build 5x faster than a traditional agency. That is why we can charge ₹9,999 instead of ₹50,000. Same quality, fraction of the cost. And you see a free preview before paying a single rupee." },
  { question: "I'm not techy. How will I update my site?", answer: "You WhatsApp us the change and we do it. New photos? Send on WhatsApp. Price update? Send on WhatsApp. It is that simple." },
  { question: "Can I see a demo before paying?", answer: "Yes — we build a free mockup for you before you pay anything. If you don't like it, you owe us nothing. Zero risk." },
  { question: "How is this different from Wix or a ₹500 freelancer?", answer: "Wix sites all look the same and rank poorly on Google. A ₹500 freelancer will ghost you after 3 days. We build custom, deploy on fast hosting, do your Google Business setup, and give you the source code." },
  { question: "What if I want to cancel later?", answer: "There is nothing to cancel. It is a one-time payment. The website is yours forever. If you want us to maintain it monthly, that is optional at ₹1,999/month." },
];

export default function Home() {
  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "KraftAI",
            url: "https://kraftai.in",
            description: "Custom portfolio websites for service providers — makeup artists, photographers, interior designers, fitness coaches, and more. ₹9,999 one-time.",
            address: { "@type": "PostalAddress", addressCountry: "IN" },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+918859820935",
              email: "hey@kraftai.in",
              contactType: "sales",
              availableLanguage: ["English", "Hindi"],
            },
            areaServed: ["IN"],
            serviceType: ["Portfolio Website Development", "Google Business Setup", "WhatsApp Booking Integration"],
            priceRange: "₹9,999",
            currenciesAccepted: "INR",
          }),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Portfolio Website Development",
            provider: { "@type": "Organization", name: "KraftAI", url: "https://kraftai.in" },
            offers: {
              "@type": "Offer",
              price: "9999",
              priceCurrency: "INR",
              description: "Custom portfolio website with Google Business setup, WhatsApp booking, and lifetime code ownership.",
            },
          }),
        }}
      />
      <KraftAILanding />
    </>
  );
}

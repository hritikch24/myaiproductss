import Script from "next/script";
import { Metadata } from "next";
import KraftAILanding from "./components/KraftAILanding";

export const metadata: Metadata = {
  title: "KraftAI — Premium Web Development Agency | Custom Websites, Apps & AI Solutions from $499",
  description: "Get a stunning custom website, web app, mobile app, or AI solution built by senior engineers. Transparent pricing from $499. 7-day delivery available. 100% code ownership. Trusted by startups & enterprises worldwide. Free instant quote.",
  keywords: [
    "web development agency",
    "custom website development",
    "hire web developer",
    "freelance web developer",
    "website design company",
    "custom web application development",
    "mobile app development company",
    "ecommerce website development",
    "AI integration services",
    "startup website builder",
    "affordable web development",
    "professional website design",
    "React developer for hire",
    "Next.js development agency",
    "full stack developer",
    "website development cost",
    "get a quote for website",
    "web development pricing",
    "custom software development company",
    "build my app idea",
  ],
  metadataBase: new URL("https://kraftai.in"),
  alternates: {
    canonical: "https://kraftai.in",
  },
};

const faqData = [
  {
    question: "How much does a custom website cost?",
    answer: "Our website projects start at $499 for landing pages and go up to $5,000+ for complex web applications. We offer transparent pricing with no hidden fees. Get an instant quote on our website or contact us for a custom estimate.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Simple landing pages can be delivered in 5-7 business days. Standard business websites take 2-3 weeks. Complex web applications and e-commerce platforms typically take 4-8 weeks depending on scope.",
  },
  {
    question: "Do I own the source code?",
    answer: "Yes, 100%. Every line of code, every design asset, every credential belongs to you. We deploy on your infrastructure with your accounts. There is no vendor lock-in or recurring license fees.",
  },
  {
    question: "What technologies do you use?",
    answer: "We specialize in React, Next.js, TypeScript, Node.js, Python, Flutter, React Native, PostgreSQL, AWS, and modern AI frameworks like OpenAI API and LangChain. We choose the best stack for your specific project needs.",
  },
  {
    question: "Can you build AI-powered features for my app?",
    answer: "Absolutely. We integrate AI capabilities including chatbots, content generation, image recognition, recommendation engines, and custom LLM solutions. We work with OpenAI, Claude, and open-source AI models.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we offer flexible maintenance plans starting at $99/month. This includes bug fixes, security updates, performance monitoring, and minor feature additions. We also offer 24/7 emergency support for critical issues.",
  },
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
            logo: "https://kraftai.in/icon.svg",
            description: "Premium web development agency offering custom websites, web apps, mobile apps, and AI solutions. Transparent pricing from $499. 100% code ownership.",
            address: { "@type": "PostalAddress", addressCountry: "IN" },
            contactPoint: {
              "@type": "ContactPoint",
              email: "hritikchaudhary016@gmail.com",
              contactType: "sales",
              availableLanguage: ["English", "Hindi"],
            },
            areaServed: ["US", "GB", "CA", "AU", "IN", "AE", "SG"],
            serviceType: ["Web Development", "Mobile App Development", "E-commerce Development", "Custom Software", "UI/UX Design", "AI Solutions"],
            priceRange: "$499 - $25,000+",
            currenciesAccepted: "USD",
            paymentAccepted: "Wire Transfer, PayPal, Stripe, Crypto",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "47",
              bestRating: "5",
            },
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
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
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
            serviceType: "Web Development",
            provider: {
              "@type": "Organization",
              name: "KraftAI",
              url: "https://kraftai.in",
            },
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "499",
              highPrice: "25000",
              priceCurrency: "USD",
              offerCount: "6",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Web Development Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page", description: "Single-page marketing website" }, price: "499", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Website", description: "Multi-page professional website" }, price: "1499", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Commerce Store", description: "Full online store with payments" }, price: "2999", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Application", description: "Custom web application" }, price: "4999", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App", description: "iOS and Android mobile application" }, price: "3999", priceCurrency: "USD" },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration", description: "AI-powered features and automation" }, price: "1999", priceCurrency: "USD" },
              ],
            },
          }),
        }}
      />
      <KraftAILanding />
    </>
  );
}

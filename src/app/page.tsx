import Script from "next/script";
import { Metadata } from "next";
import KraftAILanding from "./components/KraftAILanding";

export const metadata: Metadata = {
  title: "KraftAI — Premium Web Development Agency | Custom Websites, Apps & AI from $499",
  description: "Need a website, app, or AI solution but tired of overpriced agencies and unreliable freelancers? KraftAI builds custom websites from $499, web apps, mobile apps & AI solutions with transparent fixed pricing. 7-day express delivery. 100% code ownership. Free instant quote calculator. Trusted by 50+ businesses in US, UK, Canada, Australia.",
  keywords: [
    // Underserved intent queries - people who searched but didn't find what they need
    "someone to build my website idea",
    "who can build my app idea cheap",
    "need a developer for my startup",
    "website developer who gives source code",
    "developer who won't ghost me",
    "tired of upwork freelancers",
    "better than fiverr web developer",
    "reliable web developer not freelancer",
    "fixed price website development no hourly",
    "website built in 1 week",
    "I have an app idea but no developer",
    "build my mvp fast and cheap",
    "affordable saas development",
    "custom admin dashboard developer",
    "add AI to my website",
    "chatbot for my business website",
    "convert figma design to website",
    "rebuild my slow wordpress site",
    "replace wix with custom website",
    "ecommerce store developer not shopify",
    // Standard high-intent keywords
    "web development agency",
    "custom website development cost",
    "hire web developer fixed price",
    "website development with code ownership",
    "React Next.js developer for hire",
    "full stack developer for startup",
    "mobile app development cost",
    "AI integration for business",
    "custom software development company",
    "web development pricing transparent",
  ],
  metadataBase: new URL("https://kraftai.in"),
  alternates: {
    canonical: "https://kraftai.in",
  },
};

const faqData = [
  {
    question: "How much does a custom website cost?",
    answer: "Our website projects start at $499 for landing pages and go up to $5,000+ for complex web applications. We offer transparent fixed pricing with no hidden fees — no hourly billing, no surprise invoices. Use our instant quote calculator to get a real price in seconds, or contact us for a custom estimate.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "Simple landing pages can be delivered in 5-7 business days. Standard business websites take 2-3 weeks. Complex web applications and e-commerce platforms typically take 4-8 weeks depending on scope. We also offer express delivery for urgent projects.",
  },
  {
    question: "Do I own the source code?",
    answer: "Yes, 100%. Every line of code, every design asset, every credential belongs to you. We deploy on your infrastructure with your accounts. There is no vendor lock-in or recurring license fees. Unlike agencies that hold your code hostage, you get everything.",
  },
  {
    question: "How are you different from hiring on Upwork or Fiverr?",
    answer: "Unlike freelance platforms where you risk unreliable developers, scope creep, and communication issues — we provide fixed-price quotes, weekly demos, direct access to senior engineers, and a money-back guarantee. No middlemen, no ghosting, no surprises. You talk to the person writing your code.",
  },
  {
    question: "I have an app idea but no technical background. Can you help?",
    answer: "Absolutely. Most of our clients are non-technical founders and business owners. We handle everything from requirements gathering to architecture, design, development, testing, and deployment. We start with a free 30-minute discovery call to understand your vision.",
  },
  {
    question: "Can you replace my WordPress or Wix site with a custom one?",
    answer: "Yes, we frequently migrate clients from WordPress, Wix, Squarespace, and Shopify to custom-built solutions. Custom sites are faster, more secure, fully SEO-optimized, and you never pay recurring platform fees. Migration typically takes 2-3 weeks.",
  },
  {
    question: "Can you add AI features like chatbots to my existing website?",
    answer: "Yes. We integrate AI capabilities including customer support chatbots, content generation, recommendation engines, and custom LLM solutions into existing websites and apps. We work with OpenAI, Claude, and open-source AI models. AI integrations start at $1,999.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept wire transfers, PayPal, Stripe, and cryptocurrency. Standard terms are 50% upfront and 50% on delivery. For projects over $10,000, we offer milestone-based payments. All prices are in USD.",
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kraftai.in"),
  title: {
    default: "KraftAI — Custom Websites, Apps & AI Agents from $499 | Fixed Pricing",
    template: "%s | KraftAI",
  },
  description:
    "Premium web development agency. Custom websites from $499, web apps, mobile apps, AI agents, chatbots & SaaS platforms built by senior engineers. 7-day express delivery. 100% code ownership. Fixed pricing — no hourly billing. Free instant quote calculator. Trusted by 50+ businesses in US, UK, Canada & Australia.",
  keywords: [
    "web development agency",
    "custom website development",
    "hire web developer",
    "website design company",
    "web application development",
    "mobile app development",
    "ecommerce website development",
    "AI agent development",
    "AI chatbot developer",
    "custom AI agent for business",
    "build AI chatbot",
    "affordable web development",
    "professional website design",
    "React developer for hire",
    "Next.js development",
    "full stack developer",
    "website development cost",
    "web development pricing",
    "custom software development",
    "startup MVP developer",
    "SaaS development company",
    "build my app idea",
    "get a quote for website",
    "developer who won't ghost me",
    "hire developer fixed price",
  ],
  authors: [{ name: "KraftAI" }],
  creator: "KraftAI",
  publisher: "KraftAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kraftai.in",
    siteName: "KraftAI",
    title: "KraftAI — Websites, Apps & AI Agents from $499 | Fixed Pricing",
    description:
      "Custom websites, web apps, mobile apps, AI agents & chatbots built by senior engineers. Fixed pricing from $499. 7-day delivery. 100% code ownership. Free instant quote.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "KraftAI - Premium Web Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KraftAI — Websites, Apps & AI Agents from $499",
    description:
      "Custom websites, apps, AI agents & chatbots. Fixed pricing. 7-day delivery. 100% code ownership.",
    images: ["/og-image.svg"],
    creator: "@kraftai",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", rel: "icon", type: "image/x-icon" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://kraftai.in",
    languages: {
      "en-US": "https://kraftai.in",
      "en-GB": "https://kraftai.in",
      "en-IN": "https://kraftai.in",
      "en-CA": "https://kraftai.in",
      "en-AU": "https://kraftai.in",
      "en-SG": "https://kraftai.in",
      "x-default": "https://kraftai.in",
    },
  },
  category: "technology",
  classification: "Web Development Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "KraftAI",
              url: "https://kraftai.in",
              logo: "https://kraftai.in/icon.svg",
              description: "Premium web development agency. Custom websites, apps & AI solutions from $499. 100% code ownership.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hritikchaudhary016@gmail.com",
                contactType: "sales",
                availableLanguage: ["English", "Hindi"],
              },
              sameAs: [],
              areaServed: [
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "United Kingdom" },
                { "@type": "Country", name: "Canada" },
                { "@type": "Country", name: "Australia" },
                { "@type": "Country", name: "India" },
                { "@type": "Country", name: "United Arab Emirates" },
                { "@type": "Country", name: "Singapore" },
                { "@type": "Country", name: "Germany" },
                { "@type": "Country", name: "Netherlands" },
              ],
              serviceType: [
                "Web Development",
                "Mobile App Development",
                "E-commerce Development",
                "Custom Software",
                "UI/UX Design",
                "AI Agent Development",
                "AI Chatbot Development",
                "SaaS Development",
                "MVP Development",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Development Services",
                itemListElement: [
                  { "@type": "OfferCatalog", name: "Websites", description: "Custom websites from $499" },
                  { "@type": "OfferCatalog", name: "AI Agents", description: "Custom AI agents and chatbots from $1,999" },
                  { "@type": "OfferCatalog", name: "Mobile Apps", description: "iOS & Android apps from $3,999" },
                  { "@type": "OfferCatalog", name: "SaaS & Web Apps", description: "Custom web applications from $4,999" },
                ],
              },
              priceRange: "$499 - $25,000+",
              currenciesAccepted: "USD",
            }),
          }}
        />
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "KraftAI",
              image: "https://kraftai.in/icon.svg",
              url: "https://kraftai.in",
              email: "hritikchaudhary016@gmail.com",
              telephone: "+918859820935",
              description: "Premium web development agency specializing in custom websites, AI agents, chatbots, mobile apps, and SaaS platforms. Fixed pricing from $499.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              priceRange: "$499 - $25,000+",
              openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
              paymentAccepted: "Wire Transfer, PayPal, Stripe, Cryptocurrency",
              currenciesAccepted: "USD, GBP, EUR, INR",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "47",
                bestRating: "5",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

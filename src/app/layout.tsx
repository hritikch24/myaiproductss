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
    default: "KraftAI — Premium Web Development Agency | Websites, Apps & AI from $499",
    template: "%s | KraftAI",
  },
  description:
    "Premium web development agency. Custom websites from $499, web apps, mobile apps, e-commerce stores & AI solutions built by senior engineers. 7-day delivery available. 100% code ownership. Free instant quote. Trusted by 50+ businesses worldwide.",
  keywords: [
    "web development agency",
    "custom website development",
    "hire web developer",
    "website design company",
    "web application development",
    "mobile app development",
    "ecommerce website development",
    "AI integration services",
    "affordable web development",
    "professional website design",
    "React developer for hire",
    "Next.js development",
    "full stack developer",
    "website development cost",
    "web development pricing",
    "custom software development",
    "startup website builder",
    "freelance web developer",
    "build my app idea",
    "get a quote for website",
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
    title: "KraftAI — Premium Web Development Agency | From $499",
    description:
      "Custom websites, web apps, mobile apps & AI solutions built by senior engineers. Transparent pricing from $499. 100% code ownership. Free instant quote.",
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
    title: "KraftAI — Premium Web Development from $499",
    description:
      "Custom websites, apps & AI solutions. 7-day delivery. 100% code ownership. Free instant quote.",
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
              areaServed: ["US", "GB", "CA", "AU", "IN", "AE", "SG"],
              serviceType: [
                "Web Development",
                "Mobile App Development",
                "E-commerce Development",
                "Custom Software",
                "UI/UX Design",
                "AI Solutions",
              ],
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
              email: "hritikchaudhary016@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              priceRange: "$499 - $25,000+",
              openingHours: "Mo,Tu,We,Th,Fr,Sa 09:00-21:00",
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

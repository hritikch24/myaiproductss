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
    default: "KraftAI — From Idea to Reality | Custom Software Development",
    template: "%s | KraftAI",
  },
  description:
    "Think it. Tell us. We build & deploy. Custom websites, apps, stores - everything from idea to ready-made product. Free consultation. Trusted delivery. Get websites, e-commerce stores, mobile apps, business software built in India.",
  keywords: [
    "software development company",
    "custom website development",
    "web development services",
    "mobile app development",
    "e-commerce website builder",
    "online store development",
    "business software",
    "custom software development India",
    "freelance developer",
    "startup website",
    "AI solutions",
    "UI/UX design services",
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
    locale: "en_IN",
    url: "https://kraftai.in",
    siteName: "KraftAI",
    title: "KraftAI — From Idea to Reality | Custom Software Development",
    description:
      "Think it. Tell us. We build & deploy. Custom websites, apps, stores - everything from idea to ready-made product. Free consultation. Trusted delivery.",
      images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "KraftAI - Custom Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KraftAI — From Idea to Reality",
    description:
      "Custom websites, apps, stores built from your idea. Free consultation. Trusted delivery.",
    images: ["/og-image.svg"],
    creator: "@kraftai",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", rel: "icon", type: "image/x-icon" }
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
    languages: {
      en: "https://kraftai.in",
      "en-IN": "https://kraftai.in",
    },
  },
  category: "technology",
  classification: "Software Development Services",
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
              "@type": "Organization",
              name: "KraftAI",
              url: "https://kraftai.in",
              logo: "https://kraftai.in/icon.svg",
              description: "Custom software development company - websites, apps, stores built from your idea",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hritikchaudhary016@gmail.com",
                contactType: "customer service",
              },
              sameAs: [],
              areaServed: "IN",
              serviceType: [
                "Web Development",
                "Mobile App Development",
                "E-commerce Development",
                "Custom Software",
                "UI/UX Design",
                "AI Solutions",
              ],
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
              priceRange: "$$",
              openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00",
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

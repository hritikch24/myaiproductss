import { Metadata, Viewport } from "next";
import Script from "next/script";
import ChatWrapper from "@/components/padhai/chat-wrapper";

export const metadata: Metadata = {
  title: {
    default: "Padhai — Free JEE & NEET Study Tracker for Class 11 & 12",
    template: "%s | Padhai — Study Tracker",
  },
  description:
    "Free study tracker for JEE Mains, NEET & Board exam preparation. Track syllabus chapter-wise, take quizzes to verify understanding, and send weekly progress reports to parents. Used by 100+ students across India.",
  keywords: [
    "JEE Mains preparation tracker",
    "NEET study planner",
    "Class 11 study tracker",
    "Class 12 syllabus tracker",
    "JEE syllabus completion",
    "NEET chapter wise tracker",
    "parent student progress tracker",
    "weekly study goal planner",
    "free study tracker India",
    "JEE preparation app",
    "NEET preparation app",
    "IIT preparation tracker",
    "CBSE study planner",
    "coaching tracker for parents",
    "study streak app",
  ],
  openGraph: {
    title: "Padhai — Free JEE & NEET Study Tracker | Track Syllabus, Quiz & Progress",
    description:
      "100+ students tracking their JEE & NEET prep on Padhai. See which chapters are done, take quizzes, build streaks. Parents get weekly reports every Sunday. 100% free.",
    url: "https://kraftai.in/padhai",
    siteName: "Padhai by KraftAI",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://kraftai.in/padhai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Padhai — JEE & NEET Study Tracker with Syllabus Tracking and Parent Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Padhai — Free JEE & NEET Study Tracker",
    description: "Track syllabus, take quizzes, send weekly reports to parents. 100% free.",
  },
  alternates: {
    canonical: "https://kraftai.in/padhai",
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
  manifest: "/padhai/manifest.json",
  icons: {
    icon: [
      { url: "/padhai/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/padhai/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/padhai/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Padhai",
  url: "https://kraftai.in/padhai",
  description: "Free study tracker for JEE Mains, NEET and Board exam preparation. Track syllabus, take quizzes, get weekly parent reports.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "100", bestRating: "5" },
  author: { "@type": "Organization", name: "KraftAI", url: "https://kraftai.in" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Padhai free to use?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, Padhai is 100% free for students and parents. No credit card needed, no hidden charges." },
    },
    {
      "@type": "Question",
      name: "How does Padhai help with JEE/NEET preparation?",
      acceptedAnswer: { "@type": "Answer", text: "Padhai tracks your syllabus chapter-wise, lets you take quizzes to verify understanding, and sends weekly progress reports to parents. It helps you know exactly what's done and what's pending." },
    },
    {
      "@type": "Question",
      name: "Can parents track their child's study progress?",
      acceptedAnswer: { "@type": "Answer", text: "Yes! Students get an invite code that parents can use to see real-time progress — chapters completed, quiz scores, study streaks, and weekly reports delivered every Sunday." },
    },
    {
      "@type": "Question",
      name: "Which exams does Padhai support?",
      acceptedAnswer: { "@type": "Answer", text: "Padhai supports JEE Mains, NEET, and CBSE/State Board exams for Class 11 and Class 12 students." },
    },
  ],
};

export default function PadhaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="padhai-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="padhai-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
      <ChatWrapper />
      <Script
        id="padhai-sw"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/padhai/sw.js', { scope: '/padhai/' })
                .catch(function() {});
            }
          `,
        }}
      />
    </>
  );
}

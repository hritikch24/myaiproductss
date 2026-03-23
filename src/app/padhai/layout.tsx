import { Metadata, Viewport } from "next";
import Script from "next/script";
import ChatWrapper from "@/components/padhai/chat-wrapper";

export const metadata: Metadata = {
  title: {
    default: "Padhai — Student Study Tracker",
    template: "%s | Padhai",
  },
  description:
    "No-pressure study tracker for Class 11, 12, JEE & NEET students. Set weekly goals, verify with quick quizzes, and keep your parents updated.",
  keywords: [
    "study tracker",
    "JEE preparation",
    "NEET preparation",
    "Class 11 12 study",
    "student accountability",
    "parent updates",
    "weekly study goals",
  ],
  openGraph: {
    title: "Padhai — Track Your Studies, Keep Your Parents Informed",
    description:
      "No-pressure study tracker for Class 11, 12, JEE & NEET students. Coaching laga di, fees bhar di — ab padhai bhi track karo.",
    url: "https://kraftai.in/padhai",
    siteName: "Padhai",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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

export default function PadhaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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

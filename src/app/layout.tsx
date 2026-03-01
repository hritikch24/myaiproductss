import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KanoonSimplified — Legal Documents Made Easy | India",
  description:
    "Generate legally valid Rental Agreements, NDAs, and Contracts in minutes. AI-powered, bilingual (English + Hindi), starting at Rs.99.",
  keywords: [
    "legal documents India",
    "rental agreement online",
    "NDA generator",
    "freelancer contract India",
    "AI legal documents",
    "Hindi legal documents",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

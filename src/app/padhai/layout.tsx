import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Padhai — Student Study Tracker",
    template: "%s | Padhai",
  },
  description: "No-pressure study tracker for Class 11, 12, JEE & NEET students. Set weekly goals, verify with quick quizzes, and keep your parents updated.",
  keywords: ["study tracker", "JEE preparation", "NEET preparation", "Class 11 12 study", "student accountability"],
  openGraph: {
    title: "Padhai — Student Study Tracker",
    description: "No-pressure study tracker for Class 11, 12, JEE & NEET students.",
    url: "https://kraftai.in/padhai",
    siteName: "Padhai",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PadhaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

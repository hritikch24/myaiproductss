import { Scale, Languages, IndianRupee, Mic, Shield, FileText, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanoon Simplified — AI Legal Document Generator India | Create Rental Agreement, NDA, Freelancer Contract",
  description: "Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts in minutes using AI. Available in 10 Indian languages including Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi. Starting at just ₹99.",
  keywords: [
    "legal document generator India",
    "rental agreement generator",
    "NDA generator India",
    "freelancer contract generator",
    "AI legal documents",
    "online legal documents",
    "rental agreement online",
    "rent agreement",
    "lease agreement India",
    "non disclosure agreement",
    "freelancer contract",
    "legal documents in Hindi",
    "legal documents in Tamil",
    "legal documents in Bengali",
    "AI document generator",
    "Indian legal documents",
    "कानूनी दस्तावेज़",
    "किराया अनुबंध",
  ],
  openGraph: {
    title: "Kanoon Simplified — AI Legal Document Generator India",
    description: "Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts in minutes using AI. Available in 10 Indian languages starting at ₹99.",
    url: "https://kraftai.in/kanoon",
    siteName: "Kanoon Simplified",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanoon Simplified — AI Legal Document Generator India",
    description: "Generate legally valid documents in minutes. Available in 10 Indian languages starting at ₹99.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const features = [
  {
    icon: Languages,
    title: "10 Indian Languages",
    description: "Documents in Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi",
  },
  {
    icon: IndianRupee,
    title: "Starting at ₹99",
    description: " Lawyer-quality documents at a fraction of the cost",
  },
  {
    icon: Mic,
    title: "Voice Summaries",
    description: "Listen to your document explained in simple Hindi or English",
  },
  {
    icon: Shield,
    title: "Legally Valid",
    description: "Documents drafted as per Indian laws - Transfer of Property Act, Indian Contract Act",
  },
];

const documentTypes = [
  {
    title: "Rental Agreement",
    titleHi: "किराया अनुबंध",
    description: "For tenants & landlords. Legally valid rent agreements with all required clauses.",
    price: "99",
    icon: FileText,
    href: "/kanoon/dashboard/rental-agreement",
  },
  {
    title: "NDA",
    titleHi: "गोपनीयता समझौता",
    description: "Non-disclosure agreements for business deals, freelancers, and startups.",
    price: "149",
    icon: Shield,
    href: "/kanoon/dashboard/nda",
  },
  {
    title: "Freelancer Contract",
    titleHi: "फ्रीलांसर अनुबंध",
    description: "Protect your work and payments. Clear scope, deadlines, and IP rights.",
    price: "199",
    icon: FileText,
    href: "/kanoon/dashboard/freelancer-contract",
  },
];

export default function KanoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Scale className="h-7 w-7 text-orange-500" />
          <span className="text-xl font-bold text-white">
            Kanoon<span className="text-orange-500">Simplified</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/kanoon/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/kanoon/dashboard"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center sm:pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Legal Documents in <span className="text-orange-500">Minutes</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts 
          using AI. Available in 10 Indian languages. No lawyer needed.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Link
            href="/kanoon/dashboard"
            className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Create Document
            <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
          <Link
            href="/kanoon/login"
            className="text-sm font-semibold leading-6 text-white"
          >
            Sign In <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
          <Check className="h-4 w-4 text-green-500" /> 2 free documents
          <Check className="h-4 w-4 text-green-500 ml-4" /> Instant PDF download
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <feature.icon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Document Types */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          Choose Your Document
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documentTypes.map((doc) => (
            <Link key={doc.title} href={doc.href}>
              <div className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-orange-500/30">
                <doc.icon className="mb-4 h-10 w-10 text-orange-500" />
                <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                <p className="text-sm text-orange-400">{doc.titleHi}</p>
                <p className="mt-2 text-sm text-slate-400">{doc.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">
                    ₹{doc.price}
                  </p>
                  <ArrowRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-orange-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl bg-orange-500/10 p-8 text-center border border-orange-500/20">
          <h2 className="text-2xl font-bold text-white">Ready to create your document?</h2>
          <p className="mt-2 text-slate-300">Get started in minutes. No signup required for free documents.</p>
          <Link
            href="/kanoon/dashboard"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Kanoon Simplified by KraftAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

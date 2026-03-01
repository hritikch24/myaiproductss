import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WaitlistForm } from "@/components/waitlist-form";
import { Countdown } from "@/components/countdown";
import {
  FileText,
  Shield,
  Languages,
  Mic,
  IndianRupee,
  Scale,
} from "lucide-react";
import Link from "next/link";

const documentTypes = [
  {
    title: "Rental Agreement",
    titleHi: "किराया अनुबंध",
    description: "For tenants & landlords. Legally valid rent agreements with all required clauses.",
    price: "99",
    icon: FileText,
  },
  {
    title: "NDA",
    titleHi: "गोपनीयता समझौता",
    description: "Non-disclosure agreements for business deals, freelancers, and startups.",
    price: "149",
    icon: Shield,
  },
  {
    title: "Freelancer Contract",
    titleHi: "फ्रीलांसर अनुबंध",
    description: "Protect your work and payments. Clear scope, deadlines, and IP rights.",
    price: "199",
    icon: Scale,
  },
];

const features = [
  {
    icon: Languages,
    title: "English + Hindi",
    description: "Documents generated in both languages so everyone understands",
  },
  {
    icon: IndianRupee,
    title: "Starts at just Rs.99",
    description: "Lawyer-quality documents at a fraction of the cost",
  },
  {
    icon: Mic,
    title: "Voice Summaries",
    description: "Listen to your document explained in simple Hindi or English",
  },
];

export default function Home() {
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
        <Link
          href="/login"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center sm:pt-24">
        <Badge variant="outline" className="mb-6 border-orange-500/30 text-orange-400">
          AI-Powered Legal Documents for India
        </Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Legal documents
          <br />
          <span className="text-orange-500">without the lawyer fees</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
          Generate legally valid Rental Agreements, NDAs, and Contracts in minutes.
          Answer simple questions, get a professional PDF in English &amp; Hindi.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-base text-slate-500">
          कानूनी दस्तावेज़ अब आसान भाषा में — वकील की फीस के बिना।
        </p>

        {/* Countdown */}
        <div className="mt-10 flex justify-center">
          <Countdown />
        </div>

        {/* Waitlist */}
        <div className="relative mt-10 flex flex-col items-center gap-3">
          <WaitlistForm />
          <p className="text-sm text-slate-500">
            Join 0 others waiting. No spam, just launch updates.
          </p>
        </div>
      </section>

      {/* Document Types */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-3 text-center text-3xl font-bold text-white">
          Documents we generate
        </h2>
        <p className="mb-12 text-center text-slate-400">
          More document types coming soon. Each one is reviewed for Indian legal compliance.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documentTypes.map((doc) => (
            <Card
              key={doc.title}
              className="border-slate-800 bg-slate-900/50 transition-colors hover:border-orange-500/30"
            >
              <CardContent className="p-6">
                <doc.icon className="mb-4 h-10 w-10 text-orange-500" />
                <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                <p className="text-sm text-orange-400">{doc.titleHi}</p>
                <p className="mt-2 text-sm text-slate-400">{doc.description}</p>
                <p className="mt-4 text-2xl font-bold text-white">
                  Rs.{doc.price}
                  <span className="text-sm font-normal text-slate-500"> / document</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((feat) => (
            <div key={feat.title} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
                <feat.icon className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feat.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon: Simplifier */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Card className="border-slate-800 bg-gradient-to-r from-orange-500/5 to-slate-900/50">
          <CardContent className="p-8 text-center sm:p-12">
            <Badge className="mb-4 bg-orange-500/10 text-orange-400 border-orange-500/20">
              Coming in Phase 2
            </Badge>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Document Simplifier
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Upload any legal document (PDF or photo). Our AI reads it and explains it
              in plain Hindi &amp; English, highlights red flags, and gives you a voice summary.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm text-slate-500">
            This is AI-generated and not legal advice. Consult a qualified advocate.
          </p>
          <p className="mt-2 text-xs text-slate-600">
            &copy; 2026 KanoonSimplified. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

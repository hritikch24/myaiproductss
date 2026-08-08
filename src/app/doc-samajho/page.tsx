import { FileSearch, Camera, Languages, Shield, ArrowRight, Check, Sparkles, ChevronRight, Upload, MessageSquareText, AlertTriangle, Reply, Smartphone, Globe, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export const metadata: Metadata = {
  title: "DocSamajho - AI Document Explainer | Understand Any Letter or Notice Instantly",
  description: "Upload any government notice, legal letter, tax document, or official mail — get instant plain-language explanation, urgency level, action items, and reply suggestions. Free. Works in Hindi & English.",
  keywords: [
    "document explainer",
    "understand government notice",
    "explain legal letter",
    "income tax notice meaning",
    "translate official document",
    "AI document reader",
    "samajho",
    "notice samajho",
  ],
  authors: [{ name: "DocSamajho by KraftAI" }],
  metadataBase: new URL("https://kraftai.in"),
  alternates: {
    canonical: "https://kraftai.in/doc-samajho",
  },
  openGraph: {
    title: "DocSamajho - Understand Any Document Instantly",
    description: "Upload any official letter, notice, or document. AI explains it in plain language with action steps and reply suggestions.",
    url: "https://kraftai.in/doc-samajho",
    siteName: "DocSamajho by KraftAI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocSamajho - AI Document Explainer",
    description: "Got a confusing letter? Upload it. AI explains what it says, how urgent it is, and what to do next.",
  },
};

const useCases = [
  {
    icon: AlertTriangle,
    title: "Government Notices",
    description: "Income tax notices, property tax, municipal corporation letters, RTI replies",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Legal Letters",
    description: "Lawyer notices, court summons, cease & desist, tenant disputes",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: MessageSquareText,
    title: "Bank & Financial",
    description: "Loan documents, insurance policies, credit card terms, EMI notices",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Globe,
    title: "Any Official Document",
    description: "Medical reports, university letters, employment contracts, visa documents",
    gradient: "from-purple-500 to-pink-500",
  },
];

const howItWorks = [
  {
    icon: Upload,
    title: "Upload or Photograph",
    description: "Take a photo with your camera or upload a PDF/image of any document",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "AI Analyzes in Seconds",
    description: "Our AI reads the document, identifies key details, deadlines, and required actions",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: Reply,
    title: "Get Explanation + Reply",
    description: "Plain-language summary, urgency level, what to do, and a draft reply — all instant",
    gradient: "from-teal-500 to-emerald-500",
  },
];

const faqs = [
  {
    question: "What types of documents can I upload?",
    answer: "Any document — government notices, legal letters, tax documents, bank statements, medical reports, employment contracts, university letters, insurance policies, and more. If it's text on paper, DocSamajho can explain it.",
  },
  {
    question: "Is my document safe and private?",
    answer: "Yes. Your document is processed by AI and never stored on our servers. We don't save, share, or use your documents for any purpose other than generating your explanation.",
  },
  {
    question: "What languages does it support?",
    answer: "DocSamajho can read documents in Hindi, English, and most Indian languages. It provides explanations in your preferred language — Hindi, English, or Hinglish.",
  },
  {
    question: "Can it detect scam letters?",
    answer: "Yes. DocSamajho checks for common scam patterns — fake letterheads, urgency manipulation, suspicious payment demands — and warns you if the document looks fraudulent.",
  },
  {
    question: "Does it really suggest how to reply?",
    answer: "Yes. For documents that need a response (legal notices, complaints, official requests), DocSamajho drafts a professional reply you can customize and send.",
  },
];

export default function DocSamajhoLanding() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#030712] to-[#030712]" />

        <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:px-8 w-full">
          <div className="text-center">
            <AnimateOnScroll>
              <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400 mb-8 backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                100% Free &middot; No Signup Required
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Confusing Letter?
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Samajh Lo.
                </span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-slate-300/90 leading-relaxed">
                Upload any government notice, legal letter, or official document.
                AI explains it in plain language — what it says, how urgent it is,
                what to do, and how to reply.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/doc-samajho/app"
                  className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-10 py-4.5 text-base font-semibold text-white shadow-2xl shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative flex items-center">
                    <Camera className="mr-2 h-5 w-5" />
                    Upload Document
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <a
                  href="https://wa.me/919999999999?text=Hi%20DocSamajho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 py-4.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                >
                  <Smartphone className="mr-2 h-5 w-5 text-green-400" />
                  WhatsApp Bot
                </a>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
                {[
                  "Photo or PDF Upload",
                  "Hindi & English",
                  "Reply Suggestions",
                  "Scam Detection",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-400" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
      </section>

      {/* Use Cases */}
      <section className="py-28 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-xs font-medium text-cyan-400 uppercase tracking-widest mb-6">
                Works With Everything
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Any Document. Any Language.
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                From tax notices to medical reports — if it confuses you, we explain it
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 100}>
                <div className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-cyan-500/5 h-full">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-xs font-medium text-cyan-400 uppercase tracking-widest mb-6">
                Simple Process
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                From confused to clear in 3 steps
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-8 lg:grid-cols-3">
            {howItWorks.map((step, index) => (
              <AnimateOnScroll key={step.title} delay={index * 150}>
                <div className="relative group">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                  <div className="relative text-center rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/[0.12] h-full">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/25">
                      {index + 1}
                    </div>
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-28 relative">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-12 backdrop-blur-sm">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">See It In Action</h2>
                <p className="mt-3 text-slate-400">Here&apos;s what you get for every document</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: FileSearch, label: "Plain Language Summary", desc: "What the document actually says, no jargon", color: "text-cyan-400 bg-cyan-500/10" },
                  { icon: AlertTriangle, label: "Urgency Level", desc: "Is this urgent? What's the deadline?", color: "text-amber-400 bg-amber-500/10" },
                  { icon: Check, label: "Action Items", desc: "Step-by-step: what you need to do", color: "text-emerald-400 bg-emerald-500/10" },
                  { icon: Reply, label: "Reply Draft", desc: "Professional response ready to send", color: "text-blue-400 bg-blue-500/10" },
                  { icon: Shield, label: "Scam Check", desc: "Is this legit or a fraud attempt?", color: "text-red-400 bg-red-500/10" },
                  { icon: Languages, label: "Your Language", desc: "Explanation in Hindi, English, or Hinglish", color: "text-purple-400 bg-purple-500/10" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-xl ${item.color} flex items-center justify-center`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.label}</p>
                      <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/doc-samajho/app"
                  className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-10 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Try It Now — Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 relative">
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-xs font-medium text-cyan-400 uppercase tracking-widest mb-6">
                FAQs
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Common Questions
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={faq.question} delay={i * 50}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all duration-300">
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="relative rounded-[2rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-teal-500 to-emerald-500" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-900/30 rounded-full blur-3xl" />

              <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Got a confusing document?
                </h2>
                <p className="mt-4 text-cyan-100/90 text-lg max-w-xl mx-auto">
                  Upload it now. Free, instant, no signup needed.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/doc-samajho/app"
                    className="group inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4.5 text-base font-semibold text-cyan-700 transition-all hover:bg-cyan-50 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                  >
                    Upload & Understand
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <FileSearch className="h-6 w-6 text-cyan-500" />
              <span className="text-lg font-bold text-white">
                Doc<span className="text-cyan-500">Samajho</span>
              </span>
              <span className="text-slate-500 text-sm ml-2">by KraftAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="/legal-docs/privacy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link href="/legal-docs/terms" className="hover:text-cyan-400 transition-colors">Terms</Link>
              <Link href="mailto:hritik242000@gmail.com" className="hover:text-cyan-400 transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/[0.06]">
            <div className="rounded-2xl bg-amber-500/5 border border-amber-500/10 p-5">
              <p className="text-sm text-slate-300/80 leading-relaxed">
                <strong className="text-amber-400">Disclaimer:</strong> DocSamajho provides AI-generated explanations for informational purposes only. This is not legal, medical, or financial advice. Always consult a qualified professional for important decisions.
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            &copy; {new Date().getFullYear()} DocSamajho by KraftAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

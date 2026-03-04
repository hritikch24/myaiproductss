import { Scale, Languages, Zap, Shield, FileText, ArrowRight, Check, Sparkles, FileCheck, ChevronRight, ClipboardList, Bot, Download, MapPin, Lock, Star } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LegalDocs — Free AI Legal Document Generator India | Rental Agreement, NDA, Freelancer Contract in Hindi, English, Tamil, Bengali & More",
  description: "Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts instantly using AI. Available in 10+ Indian languages including Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi. Free to use.",
  keywords: [
    // Primary keywords
    "free legal document generator India",
    "AI legal document generator",
    "online legal documents India",
    "rental agreement generator India",
    "NDA generator India",
    "freelancer contract generator India",
    "legal document maker India",
    // Language-specific
    "legal documents in Hindi",
    "legal documents in English",
    "legal documents in Tamil",
    "legal documents in Bengali",
    "legal documents in Telugu",
    "legal documents in Marathi",
    "legal documents in Gujarati",
    "legal documents in Kannada",
    "legal documents in Malayalam",
    "legal documents in Punjabi",
    "कानूनी दस्तावेज़ भारत",
    "किराया अनुबंध",
    "गोपनीयता समझौता",
    // City-specific
    "rental agreement Mumbai",
    "rental agreement Delhi",
    "rental agreement Bangalore",
    "rental agreement Chennai",
    "NDA for freelancers India",
    "freelancer contract format India",
    // Law-specific
    "Transfer of Property Act",
    "Indian Contract Act 1872",
    "rent agreement online",
    "online notary India",
  ],
  authors: [{ name: "LegalDocs" }],
  creator: "LegalDocs",
  publisher: "LegalDocs",
  metadataBase: new URL("https://kraftai.in"),
  alternates: {
    canonical: "https://kraftai.in/legal-docs",
  },
  openGraph: {
    title: "LegalDocs — Free AI Legal Document Generator India",
    description: "Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts in 10+ Indian languages. Free to use.",
    url: "https://kraftai.in/legal-docs",
    siteName: "LegalDocs",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalDocs — Free AI Legal Document Generator India",
    description: "Generate legal documents in Hindi, English, Tamil & more. Free to use.",
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
};

const premiumEnabled = process.env.NEXT_PUBLIC_PREMIUM_ENABLED === "true";

const languages = [
  { name: "Hindi", nameHi: "हिंदी", flag: "🇮🇳" },
  { name: "English", nameHi: "English", flag: "🇬🇧" },
  { name: "Bengali", nameHi: "বাংলা", flag: "🇧🇩" },
  { name: "Tamil", nameHi: "தமிழ்", flag: "🇮🇳" },
  { name: "Telugu", nameHi: "తెలుగు", flag: "🇮🇳" },
  { name: "Marathi", nameHi: "मराठी", flag: "🇮🇳" },
  { name: "Gujarati", nameHi: "ગુજરાતી", flag: "🇮🇳" },
  { name: "Kannada", nameHi: "ಕನ್ನಡ", flag: "🇮🇳" },
  { name: "Malayalam", nameHi: "മലയാളം", flag: "🇮🇳" },
  { name: "Punjabi", nameHi: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

const features = [
  {
    icon: Languages,
    title: "10+ Indian Languages",
    description: "Documents in Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Get your document in minutes, not days",
  },
  {
    icon: Shield,
    title: "Legally Valid",
    description: "Drafted as per Indian laws - Transfer of Property Act, Indian Contract Act",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your data stays safe. Documents are generated securely and never shared with third parties",
  },
];

const documentTypes = [
  {
    title: "Rental Agreement",
    titleHi: "किराया अनुबंध",
    description: "For tenants & landlords. Legally valid rent agreements with all required clauses under Transfer of Property Act. Includes e-Stamp Paper PDF format.",
    price: "99",
    icon: FileText,
    href: "/legal-docs/dashboard/rental-agreement",
    popular: true,
  },
  {
    title: "NDA",
    titleHi: "गोपनीयता समझौता",
    description: "Non-disclosure agreements for business deals, freelancers, startups, and partnerships.",
    price: "149",
    icon: Shield,
    href: "/legal-docs/dashboard/nda",
  },
  {
    title: "Freelancer Contract",
    titleHi: "फ्रीलांसर अनुबंध",
    description: "Protect your work and payments. Clear scope, deadlines, deliverables, and IP rights.",
    price: "199",
    icon: FileText,
    href: "/legal-docs/dashboard/freelancer-contract",
  },
];

const faqs = [
  {
    question: "Are these documents legally valid in India?",
    answer: "Yes, our documents are drafted as per Indian laws including the Transfer of Property Act, 1882 and Indian Contract Act, 1872. However, we recommend consulting a lawyer for complex legal matters.",
  },
  {
    question: "Do I need to register my rental agreement?",
    answer: "Agreements for more than 11 months require registration under the Registration Act, 1908. We provide guidance on this in the document.",
  },
  {
    question: "Is an online rental agreement legally valid in India?",
    answer: "Yes, online rental agreements are legally valid in India. Under the Indian Contract Act, 1872, a contract is valid as long as there is a lawful offer, acceptance, and consideration. The agreement should be printed on stamp paper of the required value and registered if the tenancy exceeds 11 months.",
  },
  {
    question: "How much stamp duty for rental agreement?",
    answer: "Stamp duty varies by state. For example, Maharashtra charges ₹500 for agreements up to 5 years, while Karnataka charges 1% of the total rent. Delhi charges 2% of the average annual rent. Our documents include state-specific guidance to help you comply with local stamp duty requirements.",
  },
  {
    question: "Do I need a lawyer to create a rental agreement?",
    answer: "No, you do not legally need a lawyer to create a rental agreement in India. LegalDocs uses AI to generate lawyer-quality agreements based on your inputs, drafted as per the Transfer of Property Act, 1882. However, we recommend consulting a lawyer for complex situations like commercial leases or high-value properties.",
  },
  {
    question: "Do I need to print on stamp paper?",
    answer: "Rental agreements need stamp paper (varies by state, typically ₹100–₹500). NDAs and freelancer contracts don't legally require stamp paper. LegalDocs provides both a decorative e-Stamp PDF and a \"Print on Stamp Paper\" version with a blank header area so you can print directly on physical stamp paper.",
  },
  {
    question: "What languages are available?",
    answer: "We support 10 Indian languages: Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi.",
  },
];

const howItWorksSteps = [
  {
    icon: ClipboardList,
    title: "Fill the Form",
    description: "Enter your details — names, addresses, terms, and preferences. Choose your language.",
  },
  {
    icon: Bot,
    title: "AI Generates Your Document",
    description: "Our AI creates a legally formatted document based on Indian law templates in seconds.",
  },
  {
    icon: Download,
    title: "Download PDF",
    description: "Get your professional, print-ready PDF instantly. Rental agreements include official e-Stamp Paper format.",
  },
];

const supportedCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
];

const jsonLd = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LegalDocs by KraftAI",
    url: "https://kraftai.in/legal-docs",
    logo: "https://kraftai.in/icon.svg",
  },
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
  webApplication: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LegalDocs",
    url: "https://kraftai.in/legal-docs",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: premiumEnabled ? "99" : "0",
      priceCurrency: "INR",
    },
  },
};

export default function LegalDocsPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApplication) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-[#030712] to-[#030712]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-400 mb-8">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Legal Documents
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Legal Documents in{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Minutes
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts
              using AI. Available in 10+ Indian languages. No lawyer needed.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/legal-docs/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:scale-105"
              >
                Create Document Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/legal-docs/login"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-slate-800"
              >
                Sign In
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                {premiumEnabled ? "2 Free Documents" : "100% Free"}
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Instant PDF Download
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                10+ Languages
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-green-500" />
                e-Stamp Paper Format
              </div>
            </div>

            {/* Language Pills */}
            <div className="mt-12">
              <p className="text-sm text-slate-500 mb-4">Available in:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="inline-flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-sm text-slate-300 border border-slate-700"
                  >
                    <span className="mr-1">{lang.flag}</span> {lang.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why Choose LegalDocs?
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Professional legal documents, simple and accessible
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-orange-500/30 transition-colors"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 mb-4">
                  <feature.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500 mb-6">
            Trusted by teams at leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["Razorpay", "Freshworks", "Swiggy", "Urban Company", "Zerodha", "Groww"].map((company) => (
              <span key={company} className="text-lg font-semibold text-slate-600">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Create your legal document in 3 simple steps
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 mb-6 mx-auto">
                  <step.icon className="h-8 w-8 text-orange-500" />
                </div>
                <div className="absolute -top-2 -right-2 sm:right-auto sm:left-1/2 sm:translate-x-6 sm:-translate-y-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Choose Your Document
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Select from our range of legally valid documents
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {documentTypes.map((doc) => (
              <Link
                key={doc.title}
                href={doc.href}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10"
              >
                {doc.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1 text-xs font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 mb-6">
                  <doc.icon className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">{doc.title}</h3>
                <p className="text-sm text-orange-400 mt-1">{doc.titleHi}</p>
                <p className="mt-3 text-slate-400 text-sm">{doc.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    {premiumEnabled ? (
                      <>
                        <span className="text-3xl font-bold text-white">₹{doc.price}</span>
                        <span className="text-slate-500 text-sm ml-1">/ document</span>
                      </>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-sm font-semibold text-green-400">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-orange-400 text-sm font-medium">
                    Create Now <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Cities Section */}
      <section className="py-16 border-y border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Available Across Major Indian Cities
            </h2>
            <p className="mt-3 text-slate-400">
              Generate rental agreements, NDAs, and contracts tailored to your city
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {supportedCities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-300 border border-slate-700"
              >
                <MapPin className="h-3.5 w-3.5 text-orange-500" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Trusted by thousands across India
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Ananya Iyer",
                role: "Startup Founder",
                city: "Bangalore",
                docType: "NDA",
                stars: 5,
                quote: "LegalDocs helped me protect my business IP with a professionally drafted NDA in minutes. Saved me thousands in legal fees.",
              },
              {
                name: "Vikram Desai",
                role: "Freelance Designer",
                city: "Pune",
                docType: "Freelancer Contract",
                stars: 5,
                quote: "Finally secured my payment terms with a proper contract. The multilingual support was a game-changer for my clients.",
              },
              {
                name: "Meera Joshi",
                role: "Software Engineer",
                city: "Mumbai",
                docType: "Rental Agreement",
                stars: 4,
                quote: "Created a Hindi rental agreement for my new flat in under 5 minutes. The e-Stamp Paper format made it ready to register immediately.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 text-xs font-medium text-orange-400">
                    {testimonial.docType}
                  </span>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                    ))}
                    {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                      <Star key={`empty-${i}`} className="h-3.5 w-3.5 text-slate-700" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}, {testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <p className="mt-2 text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-orange-600 to-orange-700 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white">
                Ready to create your document?
              </h2>
              <p className="mt-4 text-orange-100">
                Get started in minutes. No signup required for free documents.
              </p>
              <Link
                href="/legal-docs/dashboard"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-orange-600 transition-all hover:bg-slate-100 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Disclaimer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold text-white">
                  Legal<span className="text-orange-500">Docs</span>
                </span>
              </div>
              <p className="mt-4 text-slate-400 max-w-md">
                AI-powered legal document generator for India. Making legal documents accessible to everyone in their preferred language.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-slate-400">
                <li><Link href="/legal-docs/dashboard/rental-agreement" className="hover:text-orange-500">Rental Agreement</Link></li>
                <li><Link href="/legal-docs/dashboard/nda" className="hover:text-orange-500">NDA</Link></li>
                <li><Link href="/legal-docs/dashboard/freelancer-contract" className="hover:text-orange-500">Freelancer Contract</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="mt-4 space-y-2 text-slate-400">
                <li><Link href="/legal-docs/privacy" className="hover:text-orange-500">Privacy Policy</Link></li>
                <li><Link href="/legal-docs/terms" className="hover:text-orange-500">Terms of Service</Link></li>
                <li><Link href="mailto:hritik242000@gmail.com" className="hover:text-orange-500">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-6">
              <h4 className="font-semibold text-amber-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Important Disclaimer
              </h4>
              <p className="mt-2 text-sm text-slate-300">
                <strong>This is NOT legal advice.</strong> The documents generated by LegalDocs are for reference purposes only and should not be considered as legal advice. We recommend consulting a qualified lawyer for your specific legal requirements. LegalDocs does not take responsibility for any legal disputes arising from the use of generated documents.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                By using this website, you agree to our <Link href="/legal-docs/terms" className="text-orange-500 hover:underline">Terms of Service</Link> and acknowledge that you have read and understood this disclaimer.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} LegalDocs by KraftAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

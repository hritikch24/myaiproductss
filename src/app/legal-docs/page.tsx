import { Scale, Languages, Zap, Shield, FileText, ArrowRight, Check, Sparkles, FileCheck, ChevronRight, ClipboardList, Bot, Download, MapPin, Lock, Star, Users, Globe, FileStack, IndianRupee } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { AnimateOnScroll, CountUp } from "@/components/animate-on-scroll";

export const metadata: Metadata = {
  title: "Free AI Legal Document Generator India | LegalDocs",
  description: "Generate free Rental Agreements, NDAs & Freelancer Contracts using AI. Legally valid, available in Hindi, English, Tamil & 10+ Indian languages.",
  keywords: [
    "free legal document generator India",
    "AI legal document generator",
    "rental agreement generator India",
    "NDA generator India",
    "freelancer contract generator India",
    "legal documents in Hindi",
    "rent agreement online",
  ],
  authors: [{ name: "LegalDocs" }],
  creator: "LegalDocs",
  publisher: "LegalDocs",
  metadataBase: new URL("https://kraftai.in"),
  alternates: {
    canonical: "https://kraftai.in/legal-docs",
  },
  openGraph: {
    title: "Free AI Legal Document Generator India | LegalDocs",
    description: "Generate free Rental Agreements, NDAs & Freelancer Contracts using AI. Available in 10+ Indian languages.",
    url: "https://kraftai.in/legal-docs",
    siteName: "LegalDocs",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    type: "website",
    images: [
      {
        url: "https://kraftai.in/og-legal-docs.png",
        width: 1200,
        height: 630,
        alt: "LegalDocs - Free AI Legal Document Generator for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Legal Document Generator India | LegalDocs",
    description: "Generate free Rental Agreements, NDAs & Contracts in Hindi, English, Tamil & 10+ Indian languages.",
    images: ["https://kraftai.in/og-legal-docs.png"],
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
  { name: "Bengali", nameHi: "বাংলা", flag: "🇮🇳" },
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
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Get your document in minutes, not days. AI drafts lawyer-quality documents in seconds",
    gradient: "from-yellow-500 to-orange-400",
  },
  {
    icon: Shield,
    title: "Legally Valid",
    description: "Drafted as per Indian laws — Transfer of Property Act, Indian Contract Act 1872",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Bank-level encryption. Your data stays safe and is never shared with third parties",
    gradient: "from-purple-500 to-pink-400",
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
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "NDA",
    titleHi: "गोपनीयता समझौता",
    description: "Non-disclosure agreements for business deals, freelancers, startups, and partnerships.",
    price: "149",
    icon: Shield,
    href: "/legal-docs/dashboard/nda",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Freelancer Contract",
    titleHi: "फ्रीलांसर अनुबंध",
    description: "Protect your work and payments. Clear scope, deadlines, deliverables, and IP rights.",
    price: "199",
    icon: FileText,
    href: "/legal-docs/dashboard/freelancer-contract",
    gradient: "from-emerald-500 to-teal-500",
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
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Bot,
    title: "AI Generates Your Document",
    description: "Our AI creates a legally formatted document based on Indian law templates in seconds.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Download,
    title: "Download PDF",
    description: "Get your professional, print-ready PDF instantly. Rental agreements include official e-Stamp Paper format.",
    gradient: "from-green-500 to-emerald-500",
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
    contactPoint: {
      "@type": "ContactPoint",
      email: "hritik242000@gmail.com",
      contactType: "customer service",
    },
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kraftai.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "LegalDocs",
        item: "https://kraftai.in/legal-docs",
      },
    ],
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
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Legal Document Generator",
    provider: {
      "@type": "Organization",
      name: "LegalDocs by KraftAI",
    },
    description: "AI-powered legal document generation service for India. Generate Rental Agreements, NDAs, and Freelancer Contracts in 10+ Indian languages.",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: "Legal Document Generation",
  },
};

export default function LegalDocsPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* JSON-LD Structured Data */}
      {Object.values(jsonLd).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-[#030712] to-[#030712]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:px-8 w-full">
          <div className="text-center">
            {/* Badge */}
            <AnimateOnScroll>
              <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm text-orange-400 mb-8 backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                AI-Powered Legal Documents for India
              </div>
            </AnimateOnScroll>

            {/* Main Heading */}
            <AnimateOnScroll delay={100}>
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Free AI Legal Documents
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                  in Minutes
                </span>
              </h1>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-slate-300/90 leading-relaxed">
                Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts
                using AI. Available in 10+ Indian languages. No lawyer needed.
              </p>
            </AnimateOnScroll>

            {/* CTA Buttons */}
            <AnimateOnScroll delay={300}>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/legal-docs/dashboard"
                  className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-4.5 text-base font-semibold text-white shadow-2xl shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative flex items-center">
                    Create Document Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/legal-docs/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 py-4.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                >
                  Sign In
                </Link>
              </div>
            </AnimateOnScroll>

            {/* Trust indicators */}
            <AnimateOnScroll delay={400}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  {premiumEnabled ? "2 Free Documents" : "100% Free"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  Instant PDF Download
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  10+ Languages
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <FileCheck className="h-3 w-3 text-green-400" />
                  </div>
                  e-Stamp Paper Format
                </div>
              </div>
            </AnimateOnScroll>

            {/* Language Pills */}
            <AnimateOnScroll delay={500}>
              <div className="mt-14">
                <p className="text-sm text-slate-500 mb-4 uppercase tracking-widest font-medium">Available in</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {languages.map((lang, i) => (
                    <span
                      key={lang.name}
                      className="inline-flex items-center rounded-full bg-white/[0.04] px-4 py-1.5 text-sm text-slate-300 border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.12] transition-all cursor-default"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <span className="mr-1.5">{lang.flag}</span> {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="relative py-16 border-y border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: 5000, suffix: "+", label: "Documents Generated", icon: FileStack },
              { value: 2000, suffix: "+", label: "Happy Users", icon: Users },
              { value: 10, suffix: "+", label: "Indian Languages", icon: Globe },
              { value: 0, suffix: "₹", label: "Starting Price", icon: IndianRupee, prefix: true },
            ].map((stat) => (
              <AnimateOnScroll key={stat.label}>
                <div className="text-center group">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 mb-4 group-hover:bg-orange-500/20 transition-colors">
                    <stat.icon className="h-5 w-5 text-orange-400" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {stat.prefix && stat.suffix}
                    <CountUp target={stat.value} />
                    {!stat.prefix && stat.suffix}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-medium text-orange-400 uppercase tracking-widest mb-6">
                Why Choose Us
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Why Choose LegalDocs?
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                Professional legal documents, simple and accessible for everyone
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <AnimateOnScroll key={feature.title} delay={i * 100}>
                <div className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-orange-500/5 h-full">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <p className="text-center text-xs text-slate-600 mb-8 uppercase tracking-[0.2em] font-medium">
              Trusted by professionals at leading companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {["Razorpay", "Freshworks", "Swiggy", "Urban Company", "Zerodha", "Groww"].map((company) => (
                <span key={company} className="text-xl font-bold text-slate-700 hover:text-slate-500 transition-colors cursor-default tracking-wide">
                  {company}
                </span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-medium text-orange-400 uppercase tracking-widest mb-6">
                Simple Process
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Create your legal document in 3 simple steps
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-8 lg:grid-cols-3">
            {howItWorksSteps.map((step, index) => (
              <AnimateOnScroll key={step.title} delay={index * 150}>
                <div className="relative group">
                  {/* Connector line */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                  <div className="relative text-center rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 hover:bg-white/[0.04] transition-all duration-500 hover:border-white/[0.12] h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-lg shadow-orange-500/25">
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

      {/* Documents Section */}
      <section className="py-28 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-medium text-orange-400 uppercase tracking-widest mb-6">
                Documents
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Choose Your Document
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Select from our range of legally valid documents
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {documentTypes.map((doc, i) => (
              <AnimateOnScroll key={doc.title} delay={i * 100}>
                <Link
                  href={doc.href}
                  className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1 block h-full"
                >
                  {doc.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-orange-500/25">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${doc.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <doc.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{doc.title}</h3>
                  <p className="text-sm text-orange-400/80 mt-1 font-medium">{doc.titleHi}</p>
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">{doc.description}</p>
                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/[0.06]">
                    <div>
                      {premiumEnabled ? (
                        <>
                          <span className="text-3xl font-bold text-white">₹{doc.price}</span>
                          <span className="text-slate-500 text-sm ml-1">/ document</span>
                        </>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1 text-sm font-semibold text-green-400">
                          Free
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-orange-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Create Now <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Cities Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Available Across Major Indian Cities
              </h2>
              <p className="mt-3 text-slate-400">
                Generate rental agreements, NDAs, and contracts tailored to your city
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {supportedCities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-5 py-2.5 text-sm text-slate-300 border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.08] hover:border-orange-500/20 transition-all cursor-default"
                >
                  <MapPin className="h-3.5 w-3.5 text-orange-400" />
                  {city}
                </span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-medium text-orange-400 uppercase tracking-widest mb-6">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                What Our Users Say
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Trusted by thousands across India
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            ].map((testimonial, i) => (
              <AnimateOnScroll key={testimonial.name} delay={i * 100}>
                <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
                      {testimonial.docType}
                    </span>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                        <Star key={`empty-${i}`} className="h-4 w-4 text-slate-700" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-[15px] leading-relaxed flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-orange-500/20">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">{testimonial.role}, {testimonial.city}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-medium text-orange-400 uppercase tracking-widest mb-6">
                FAQs
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Frequently Asked Questions
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

      {/* CTA Section */}
      <section className="py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="relative rounded-[2rem] overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-900/30 rounded-full blur-3xl" />

              <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Ready to create your document?
                </h2>
                <p className="mt-4 text-orange-100/90 text-lg max-w-xl mx-auto">
                  Get started in minutes. No signup required for free documents.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/legal-docs/dashboard"
                    className="group inline-flex items-center justify-center rounded-2xl bg-white px-10 py-4.5 text-base font-semibold text-orange-600 transition-all hover:bg-orange-50 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/legal-docs/login"
                    className="inline-flex items-center justify-center rounded-2xl border-2 border-white/30 px-10 py-4.5 text-base font-semibold text-white transition-all hover:bg-white/10"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer with Disclaimer */}
      <footer className="border-t border-white/[0.06] pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <Scale className="h-7 w-7 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold text-white">
                  Legal<span className="text-orange-500">Docs</span>
                </span>
              </Link>
              <p className="mt-4 text-slate-400 max-w-md leading-relaxed">
                AI-powered legal document generator for India. Making legal documents accessible to everyone in their preferred language.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/legal-docs/dashboard/rental-agreement" className="hover:text-orange-400 transition-colors text-sm">Rental Agreement</Link></li>
                <li><Link href="/legal-docs/dashboard/nda" className="hover:text-orange-400 transition-colors text-sm">NDA</Link></li>
                <li><Link href="/legal-docs/dashboard/freelancer-contract" className="hover:text-orange-400 transition-colors text-sm">Freelancer Contract</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/legal-docs/privacy" className="hover:text-orange-400 transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/legal-docs/terms" className="hover:text-orange-400 transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="mailto:hritik242000@gmail.com" className="hover:text-orange-400 transition-colors text-sm">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <div className="rounded-2xl bg-amber-500/5 border border-amber-500/10 p-6">
              <h4 className="font-semibold text-amber-400 flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                Important Disclaimer
              </h4>
              <p className="mt-2 text-sm text-slate-300/80 leading-relaxed">
                <strong>This is NOT legal advice.</strong> The documents generated by LegalDocs are for reference purposes only and should not be considered as legal advice. We recommend consulting a qualified lawyer for your specific legal requirements.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                By using this website, you agree to our <Link href="/legal-docs/terms" className="text-orange-400 hover:underline">Terms of Service</Link> and acknowledge that you have read and understood this disclaimer.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-slate-600">
            <p>&copy; {new Date().getFullYear()} LegalDocs by KraftAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

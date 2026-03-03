import { Scale, Languages, IndianRupee, Mic, Shield, FileText, ArrowRight, Check, Sparkles, Zap, Globe, Users, Star, FileCheck, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LegalDocs — Free AI Legal Document Generator India | Rental Agreement, NDA, Freelancer Contract in Hindi, English, Tamil, Bengali & More",
  description: "Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts instantly using AI. Available in 10+ Indian languages including Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi. Free to start. Starting at just ₹99.",
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
  metadataBase: new URL("https://legal-docs.in"),
  alternates: {
    canonical: "https://legal-docs.in/legal-docs",
  },
  openGraph: {
    title: "LegalDocs — Free AI Legal Document Generator India",
    description: "Generate legally valid Rental Agreements, NDAs, and Freelancer Contracts in 10+ Indian languages. Free to start, starting at ₹99.",
    url: "https://legal-docs.in/legal-docs",
    siteName: "LegalDocs",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalDocs — Free AI Legal Document Generator India",
    description: "Generate legal documents in Hindi, English, Tamil & more. Free to start.",
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
    icon: IndianRupee,
    title: "Starting at ₹99",
    description: "Lawyer-quality documents at a fraction of the cost",
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
    icon: FileCheck,
    title: "Professional Format",
    description: "Industry-standard templates reviewed by legal experts",
  },
  {
    icon: Users,
    title: "Trusted by 10,000+",
    description: "Documents generated for individuals and businesses across India",
  },
];

const documentTypes = [
  {
    title: "Rental Agreement",
    titleHi: "किराया अनुबंध",
    description: "For tenants & landlords. Legally valid rent agreements with all required clauses under Transfer of Property Act.",
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

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Mumbai, Maharashtra",
    text: "Generated my rental agreement in Hindi within 5 minutes. Saved ₹2000 on lawyer fees!",
    rating: 5,
  },
  {
    name: "Priya Menon",
    location: "Bangalore, Karnataka",
    text: "Amazing tool! Created an NDA for my startup in English and Kannada. Highly recommended.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    location: "Ahmedabad, Gujarat",
    text: "Freelancer contract was perfect. All clauses were properly covered as per Indian law.",
    rating: 5,
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
    question: "Can I edit the documents after generation?",
    answer: "Yes, you receive a downloadable PDF that you can further edit or take to a lawyer for customization.",
  },
  {
    question: "What languages are available?",
    answer: "We support 10 Indian languages: Hindi, English, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi.",
  },
];

export default function LegalDocsPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
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
                2 Free Documents
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Instant PDF Download
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                10+ Languages
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
              Professional legal documents at a fraction of the cost
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Documents Section */}
      <section className="py-24 relative bg-slate-900/30">
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
                    <span className="text-3xl font-bold text-white">₹{doc.price}</span>
                    <span className="text-slate-500 text-sm ml-1">/ document</span>
                  </div>
                  <div className="flex items-center text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Create <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">10+</div>
              <div className="mt-2 text-slate-400">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">₹99</div>
              <div className="mt-2 text-slate-400">Starting Price</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">5 min</div>
              <div className="mt-2 text-slate-400">Avg. Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">24/7</div>
              <div className="mt-2 text-slate-400">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by Indians Everywhere
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              See what our users say about LegalDocs
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-slate-300">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.location}</div>
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
                <li><Link href="/legal-docs/dashboard" className="hover:text-orange-500">Rental Agreement</Link></li>
                <li><Link href="/legal-docs/dashboard" className="hover:text-orange-500">NDA</Link></li>
                <li><Link href="/legal-docs/dashboard" className="hover:text-orange-500">Freelancer Contract</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="mt-4 space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-orange-500">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-orange-500">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-orange-500">Contact Us</Link></li>
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
                By using this website, you agree to our Terms of Service and acknowledge that you have read and understood this disclaimer.
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

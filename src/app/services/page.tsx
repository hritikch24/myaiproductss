import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Clock, Shield, Zap, Code, Rocket, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Development, App & AI Agent Services | Fixed Pricing from $499",
  description: "Custom websites, web apps, mobile apps, AI agents & automation built by senior engineers. Fixed pricing from $499. 7-day express delivery. 100% code ownership. No freelancer headaches — talk directly to the dev writing your code.",
  keywords: ["custom web development services", "hire web developer fixed price", "build my app idea", "AI agent development", "custom software development", "web app development company", "mobile app development", "startup MVP developer", "website development pricing", "AI chatbot development", "SaaS development", "full stack developer for hire"],
  metadataBase: new URL("https://kraftai.in"),
  alternates: { canonical: "https://kraftai.in/services" },
  openGraph: {
    title: "Web Development, App & AI Agent Services | From $499",
    description: "Custom websites, apps & AI agents. Fixed pricing, 7-day delivery, 100% code ownership.",
    url: "https://kraftai.in/services",
    siteName: "KraftAI",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
              <Zap className="w-4 h-4" />
              <span>Free Consultation Available</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Tell Us Your Idea
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-8">
              We build, deploy and hand you a ready-made site, app or AI agent.
              Fixed pricing from $499. No surprises, no ghosting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all border border-slate-700"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Clock, label: "On-Time Delivery", desc: "Projects delivered within agreed timeline" },
              { icon: Shield, label: "Trusted & Reliable", desc: "100% satisfaction guarantee" },
              { icon: Code, label: "Custom Solutions", desc: "Built exactly as per your requirements" },
              { icon: Rocket, label: "Fair Pricing", desc: "Quality software at budget-friendly rates" },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="font-semibold text-lg mb-1">{item.label}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            What We <span className="text-blue-400">Build</span>
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            From idea to deployment — we handle everything
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-slate-400 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How It <span className="text-blue-400">Works</span>
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Simple 4-step process from idea to delivery
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
                {idx < process.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-5 h-5 text-slate-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Why Choose <span className="text-blue-400">KraftAI</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6">What Makes Me Different</h3>
              <div className="space-y-6">
                {whyChoose.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
              <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
              <p className="mb-6 opacity-90">
                Book your FREE consultation now. No commitment, no pressure - just a chat about your idea.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat About Your Idea
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Have an <span className="text-blue-400">Idea</span>?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Think about it, tell me about it, and I'll build it for you. 
            Deploy and deliver ready-made site or app directly to you.
          </p>
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Start Your Project Today</h3>
            <p className="text-slate-400 mb-6">
              Free consultation available. Let's discuss your requirements.
            </p>
            <a
              href="https://wa.me/918859820935?text=Hi!%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Get Free Quote on WhatsApp
            </a>
            <p className="mt-4 text-sm text-slate-500">
              Or email us at hritikchaudhary016@gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">© 2026. All rights reserved.</p>
          <p className="text-slate-400">Built with care, delivered with pride.</p>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    icon: Code,
    title: "Custom Websites",
    desc: "High-performance websites that convert visitors into customers. From $499.",
    features: ["Responsive Design", "SEO Optimized", "Sub-2s Load Time", "CMS Integration"],
  },
  {
    icon: Rocket,
    title: "Web Applications & SaaS",
    desc: "Full-stack web apps, dashboards, and SaaS platforms. From $4,999.",
    features: ["User Auth & Roles", "Database & API", "Real-time Features", "Scalable Architecture"],
  },
  {
    icon: Zap,
    title: "AI Agents & Automation",
    desc: "Custom AI agents, chatbots, and workflow automation. From $1,999.",
    features: ["Custom LLM Agents", "Business Chatbots", "Process Automation", "API Integrations"],
  },
  {
    icon: Shield,
    title: "E-Commerce Stores",
    desc: "Custom online stores that outperform Shopify templates. From $2,999.",
    features: ["Payment Gateway", "Inventory System", "Order Tracking", "Admin Dashboard"],
  },
  {
    icon: Clock,
    title: "Mobile Apps",
    desc: "Native-quality iOS & Android apps. From $3,999.",
    features: ["iOS & Android", "Push Notifications", "Offline Support", "App Store Deployment"],
  },
  {
    icon: CheckCircle,
    title: "MVP Development",
    desc: "Launch your startup idea in 2-4 weeks. From $2,499.",
    features: ["Rapid Prototyping", "User Validation", "Investor-Ready", "Scalable Foundation"],
  },
];

const process = [
  {
    title: "Share Your Idea",
    desc: "Tell us what you want to build. Use our instant quote calculator or chat with us.",
  },
  {
    title: "Free Discovery Call",
    desc: "30-minute call to nail down requirements, timeline, and fixed pricing. No obligation.",
  },
  {
    title: "We Build It",
    desc: "Senior engineers build your project with weekly demos and progress updates.",
  },
  {
    title: "Deploy & Own",
    desc: "We deploy to your infrastructure. You own 100% of the code. No lock-in.",
  },
];

const whyChoose = [
  {
    title: "Fixed Pricing, No Surprises",
    desc: "Know the exact cost before we write a single line. No hourly billing, no scope creep invoices.",
  },
  {
    title: "7-Day Express Delivery",
    desc: "Landing pages in 5-7 days. Business sites in 2-3 weeks. We ship fast.",
  },
  {
    title: "100% Code Ownership",
    desc: "Every line of code, every asset — it's yours. Deploy anywhere. No vendor lock-in.",
  },
  {
    title: "Talk to the Engineer",
    desc: "No project managers, no account reps. You talk directly to the senior dev writing your code.",
  },
  {
    title: "Money-Back Guarantee",
    desc: "If deliverables don't match the agreement, you get your money back. Zero risk.",
  },
  {
    title: "50+ Projects Delivered",
    desc: "Trusted by startups and businesses across US, UK, Canada, Australia, and India.",
  },
];

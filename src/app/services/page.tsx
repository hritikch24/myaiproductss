import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Clock, Shield, Zap, Code, Rocket, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Software Development | Get Your Dream App Built",
  description: "I build custom websites and apps as per your requirements. On-time delivery, fair pricing, free consultation. Tell me your idea - I'll build, deploy and deliver ready-made software.",
  keywords: ["software development", "custom website", "web app development", "mobile app", "free consultation"],
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
              Tell Me Your Idea
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-8">
              I'll build, deploy and give you a ready-made site or app. 
              Quality software at fair budget, delivered on time.
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
            What I <span className="text-blue-400">Build</span>
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            From idea to deployment - I handle everything
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
            Why Choose <span className="text-blue-400">Me</span>
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
              href="mailto:hritik@example.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Get Free Consultation
            </a>
            <p className="mt-4 text-sm text-slate-500">
              Or email me directly at hritik@example.com
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
    desc: "Beautiful, responsive websites tailored to your needs.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Easy to Manage"],
  },
  {
    icon: Rocket,
    title: "Web Applications",
    desc: "Powerful web apps with full functionality.",
    features: ["User Authentication", "Database Integration", "API Development", "Real-time Features"],
  },
  {
    icon: Zap,
    title: "Mobile Apps",
    desc: "Cross-platform mobile applications.",
    features: ["iOS & Android", "Native Performance", "Push Notifications", "Offline Support"],
  },
  {
    icon: Shield,
    title: "E-Commerce",
    desc: "Online stores with secure payments.",
    features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Admin Dashboard"],
  },
  {
    icon: Clock,
    title: "API Development",
    desc: "Robust APIs for your applications.",
    features: ["REST & GraphQL", "Secure Endpoints", "Documentation", "Scalable Architecture"],
  },
  {
    icon: CheckCircle,
    title: "Maintenance",
    desc: "Ongoing support and updates.",
    features: ["Bug Fixes", "Security Updates", "Performance Optimization", "24/7 Support"],
  },
];

const process = [
  {
    title: "Share Your Idea",
    desc: "Tell me what you want to build. No idea is too big or small.",
  },
  {
    title: "Free Consultation",
    desc: "We discuss requirements, timeline, and pricing. Totally free.",
  },
  {
    title: "I Build It",
    desc: "I develop your software with regular updates on progress.",
  },
  {
    title: "Deploy & Deliver",
    desc: "Your ready-made site/app is deployed and handed to you.",
  },
];

const whyChoose = [
  {
    title: "Free Consultation",
    desc: "Unlike others, I offer free consultation to understand your needs before any commitment.",
  },
  {
    title: "On-Time Delivery",
    desc: "I respect deadlines. Your project will be delivered within the agreed timeline.",
  },
  {
    title: "Fair & Transparent Pricing",
    desc: "No hidden costs. Quality software at budget-friendly rates.",
  },
  {
    title: "You Think, I Build",
    desc: "Just share your idea. I'll handle the entire development and deployment.",
  },
  {
    title: "Trusted & Reliable",
    desc: "Proven track record of delivering quality solutions to happy clients.",
  },
  {
    title: "End-to-End Service",
    desc: "From concept to deployment - I handle everything so you can focus on your business.",
  },
];

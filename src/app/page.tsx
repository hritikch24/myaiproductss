import Link from "next/link";
import { Scale, Gamepad2, Bot, ArrowRight, BookOpen, Briefcase, Cpu, Sparkles, Zap, MessageCircle, Mail, Globe, ShoppingCart, Store, Building2, Smartphone, Palette, Wand2, Rocket, Shield, Clock, CheckCircle, ChevronRight, Hexagon, Layers, Box, Scan } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KraftAI — From Idea to Reality | Custom Software Development",
  description: "Think it. Tell us. We build & deploy. Custom websites, apps, stores - everything from idea to ready-made product. Free consultation. Trusted delivery.",
  keywords: ["software development", "custom website", "web app", "mobile app", "e-commerce", "store builder", "custom software"],
};

export default function Home() {
  const services = [
    { icon: Globe, title: "Websites", desc: "From landing pages to full web platforms", href: "/services/websites" },
    { icon: Store, title: "Online Stores", desc: "E-commerce stores with payments & inventory", href: "/services/stores" },
    { icon: Smartphone, title: "Mobile Apps", desc: "iOS & Android apps for your business", href: "/services/mobile-apps" },
    { icon: Building2, title: "Business Apps", desc: "Custom software for your processes", href: "/services/business-apps" },
    { icon: Palette, title: "UI/UX Design", desc: "Futuristic designs that captivate", href: "/services/design" },
    { icon: Wand2, title: "AI Solutions", desc: "Smart features powered by AI", href: "/services/ai-solutions" },
  ];

  const process = [
    { num: "01", title: "You Think", desc: "Share your idea with us" },
    { num: "02", title: "We Build", desc: "We develop your vision" },
    { num: "03", title: "We Deploy", desc: "Live & running" },
    { num: "04", title: "You Own", desc: "Ready-made product delivered" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(120,50,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(0,200,255,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMyMDI1MjUiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Nav */}
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Hexagon className="w-10 h-10 text-purple-400 fill-purple-400/20" />
            <Cpu className="absolute inset-2 w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Kraft<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#services" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block">Services</Link>
          <Link href="#process" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block">Process</Link>
          <Link href="/services" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2 text-sm font-medium text-white transition-all hover:scale-105">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </nav>

      {/* Hero - 2050 Style */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="text-center">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <Scan className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-slate-300">Year 2050 · Next-Gen Development</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              You Think.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              We Build.
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              You Own.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            From idea to deployed product — websites, apps, stores, anything. 
            <span className="text-white font-medium"> Free consultation</span>. 
            <span className="text-cyan-400"> Fair pricing</span>. 
            <span className="text-purple-400"> Trusted delivery</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/918859820935?text=Hi! I have an idea I want to discuss..."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="mailto:hritikchaudhary016@gmail.com?subject=Project Inquiry"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold text-lg hover:bg-white/10 transition-all hover:border-white/20"
            >
              <Mail className="w-5 h-5 text-purple-400" />
              <span>Email Me</span>
            </a>
          </div>

          {/* Floating elements */}
          <div className="mt-16 relative">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute top-10 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-500" />
            <div className="absolute top-20 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-1000" />
          </div>
        </div>
      </section>

      {/* Services Section - Futuristic Cards */}
      <section id="services" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
              <Zap className="w-4 h-4" />
              <span>What We Build</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Anything</span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> You Need</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From a simple idea to a fully deployed product. We build it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <Link
                key={idx}
                href={service.href}
                className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                  <p className="text-slate-400">{service.desc}</p>
                  
                  <div className="mt-6 flex items-center text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
              <Layers className="w-4 h-4" />
              <span>How It Works</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">From</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Thought</span>
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"> to</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Product</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((step, idx) => (
              <div key={idx} className="relative text-center p-8">
                {/* Connector line */}
                {idx < process.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-purple-500/50 to-cyan-500/50" />
                )}
                
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 mb-6">
                  <span className="text-2xl font-bold">{step.num}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm mb-4">
                <Shield className="w-4 h-4" />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">We Turn</span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Ideas Into Reality</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Free consultation - unique in the industry",
                  "On-time delivery you can trust",
                  "Fair & transparent pricing",
                  "End-to-end development & deployment",
                  "You own everything we build",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Futuristic card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-900/50 via-slate-900/80 to-cyan-900/50 border border-white/10 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl" />
                <div className="relative z-10">
                  <Box className="w-16 h-16 text-purple-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Ready to Start?</h3>
                  <p className="text-slate-300 mb-6">
                    Share your idea with us and watch it become reality. 
                    Free consultation. No obligation.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://wa.me/918859820935?text=Hi! I have an idea I want to discuss..."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-full font-semibold transition-all hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Now
                    </a>
                    <a
                      href="mailto:hritikchaudhary016@gmail.com?subject=Project Inquiry"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-full font-semibold transition-all"
                    >
                      <Mail className="w-5 h-5" />
                      Email Me
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-sm animate-pulse">
                <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> Fast Response</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm">
                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> 24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Still Shown */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Our</span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Products</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl ${product.bgColor} mb-4`}>
                  <product.icon className={`h-6 w-6 ${product.color}`} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.status === "Live" ? "bg-green-500/20 text-green-400" : 
                    product.status === "New" ? "bg-blue-500/20 text-blue-400" : 
                    "bg-slate-500/20 text-slate-400"
                  }`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-cyan-900/40 border border-white/10 backdrop-blur-xl">
            <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Have an</span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Idea?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Think about it. Tell us about it. We'll build, deploy, and give you the ready-made product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918859820935?text=Hi! I have an idea I want to discuss..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 rounded-full font-semibold text-lg transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Get Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Hexagon className="w-6 h-6 text-purple-400 fill-purple-400/20" />
            <span className="font-bold">KraftAI</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} KraftAI. Built for the future.</p>
        </div>
      </footer>
    </div>
  );
}

const products = [
  {
    name: "Enterprise",
    description: "Enterprise-grade infrastructure solutions",
    href: "/enterprise",
    icon: Briefcase,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    status: "New",
  },
  {
    name: "Padhai",
    description: "AI-powered study tracker for students",
    href: "/padhai",
    icon: BookOpen,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    status: "Live",
  },
  {
    name: "LegalDocs",
    description: "AI legal document generator for India",
    href: "/legal-docs",
    icon: Scale,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    status: "Live",
  },
  {
    name: "AI Games",
    description: "Next-gen AI-powered gaming experiences",
    href: "#",
    icon: Gamepad2,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    status: "Coming Soon",
  },
  {
    name: "AI Chatbot",
    description: "Advanced AI chatbot for automation",
    href: "#",
    icon: Bot,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    status: "Coming Soon",
  },
];

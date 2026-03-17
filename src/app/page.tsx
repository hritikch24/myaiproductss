import Link from "next/link";
import Script from "next/script";
import { Scale, Gamepad2, Bot, ArrowRight, BookOpen, Briefcase, Cpu, Sparkles, Zap, MessageCircle, Mail, Globe, ShoppingCart, Store, Building2, Smartphone, Palette, Wand2, Rocket, Shield, CheckCircle, ChevronRight, Hexagon, Layers, Box, Scan, Menu, X, Star, ExternalLink, TrendingUp, Award, Users, Globe2, Code2, Database, Cloud, Lock, Gauge, Atom, Fingerprint, Eye, Diamond, Crown, Infinity, Target, ChevronDown } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KraftAI — From Idea to Reality | Custom Software Development Company India",
  description: "Think it. Tell us. We build & deploy. Custom websites, apps, stores - everything from idea to ready-made product. Free consultation. Trusted delivery by expert developers in India.",
  keywords: ["software development company", "custom website development", "web development services India", "mobile app development", "e-commerce website builder", "startup software", "freelance developer India", "build app from idea"],
  metadataBase: new URL("https://kraftai.in"),
};

export default function Home() {
  const services = [
    { icon: Globe2, title: "Websites", desc: "Futuristic web experiences", href: "/services/websites", glow: "from-cyan-500 to-blue-500" },
    { icon: ShoppingCart, title: "Stores", desc: "Next-gen e-commerce", href: "/services/stores", glow: "from-pink-500 to-rose-500" },
    { icon: Smartphone, title: "Mobile Apps", desc: "AI-powered applications", href: "/services/mobile-apps", glow: "from-violet-500 to-purple-500" },
    { icon: Database, title: "Business Apps", desc: "Enterprise solutions", href: "/services/business-apps", glow: "from-emerald-500 to-teal-500" },
    { icon: Palette, title: "UI/UX Design", desc: "Immersive interfaces", href: "/services/design", glow: "from-amber-500 to-orange-500" },
    { icon: Atom, title: "AI Solutions", desc: "Neural networks", href: "/services/ai-solutions", glow: "from-rose-500 to-pink-500" },
  ];

  const process = [
    { num: "01", title: "You Think", desc: "Share your vision", icon: Sparkles },
    { num: "02", title: "We Build", desc: "AI-powered development", icon: Code2 },
    { num: "03", title: "We Deploy", desc: "Global infrastructure", icon: Cloud },
    { num: "04", title: "You Own", desc: "Full ownership", icon: Diamond },
  ];

  return (
    <>
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "name": "KraftAI", "url": "https://kraftai.in", "logo": "https://kraftai.in/icon.svg", "description": "Custom software development company - websites, apps, stores built from your idea in India", "address": { "@type": "PostalAddress", "addressCountry": "IN" }, "contactPoint": { "@type": "ContactPoint", "email": "hritikchaudhary016@gmail.com", "contactType": "customer service", "areaServed": "IN" }, "areaServed": "IN", "serviceType": ["Web Development", "Mobile App Development", "E-commerce Development", "Custom Software", "UI/UX Design", "AI Solutions"], "priceRange": "$$" }) }} />
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "name": "KraftAI", "url": "https://kraftai.in", "potentialAction": { "@type": "SearchAction", "target": "https://kraftai.in{search_term_string}", "query-input": "required name=search_term_string" } }) }} />
      <Script id="services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", "itemListElement": [{ "@type": "ListItem", position: 1, "name": "Custom Websites", "url": "https://kraftai.in/services/websites", "description": "Professional website development services" }, { "@type": "ListItem", position: 2, "name": "Online Stores", "url": "https://kraftai.in/services/stores", "description": "E-commerce website development" }, { "@type": "ListItem", position: 3, "name": "Mobile Apps", "url": "https://kraftai.in/services/mobile-apps", "description": "iOS and Android app development" }, { "@type": "ListItem", position: 4, "name": "Business Apps", "url": "https://kraftai.in/services/business-apps", "description": "Custom business software development" }, { "@type": "ListItem", position: 5, "name": "UI/UX Design", "url": "https://kraftai.in/services/design", "description": "Professional design services" }, { "@type": "ListItem", position: 6, "name": "AI Solutions", "url": "https://kraftai.in/services/ai-solutions", "description": "Artificial intelligence development" }] }) }} />
      
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Futuristic Background */}
        <div className="fixed inset-0 z-0">
          {/* Animated grid */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '100% 100%, 60px 60px, 60px 60px' }} />
          
          {/* Moving gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-[80px] animate-pulse-slow delay-2000" />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-cyan-400/50 rounded-full animate-float" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }} />
          ))}
          
          {/* Circuit lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" style={{ stroke: 'url(#circuitGradient)' }}>
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path d="M0 100 Q150 150 300 100 T600 100 T900 100" fill="none" strokeWidth="1" />
            <path d="M0 200 Q150 250 300 200 T600 200 T900 200" fill="none" strokeWidth="1" />
            <path d="M0 300 Q150 350 300 300 T600 300 T900 300" fill="none" strokeWidth="1" />
            <path d="M0 400 Q150 450 300 400 T600 400 T900 400" fill="none" strokeWidth="1" />
            <path d="M0 500 Q150 550 300 500 T600 500 T900 500" fill="none" strokeWidth="1" />
            <path d="M0 600 Q150 650 300 600 T600 600 T900 600" fill="none" strokeWidth="1" />
          </svg>
        </div>

        {/* Navigation */}
        <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
              <div className="relative">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <Atom className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-30 animate-pulse" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Kraft<span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm text-slate-400 hover:text-white transition-all hover:scale-105">Services</Link>
            <Link href="#process" className="text-sm text-slate-400 hover:text-white transition-all hover:scale-105">Process</Link>
            <Link href="#products" className="text-sm text-slate-400 hover:text-white transition-all hover:scale-105">Products</Link>
          </div>
          <Link href="/services" className="relative overflow-hidden group rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 bg-[length:200%_auto] px-4 md:px-6 py-2 md:py-2.5 text-sm font-medium text-white transition-all hover:scale-105 animate-gradient">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-8 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs md:text-sm text-slate-300 font-medium">Year 2050 · Quantum Ready</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent">You Think.</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">We Build.</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">You Own.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
              From idea to deployed product — websites, apps, stores, anything. 
              <span className="text-white font-medium"> Free consultation</span>. 
              <span className="text-cyan-400"> Fair pricing</span>. 
              <span className="text-purple-400"> Trusted delivery</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <a href="https://wa.me/918859820935?text=Hi! I have an idea I want to discuss..." target="_blank" rel="noopener noreferrer" 
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-base md:text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" /> 
                <span className="whitespace-nowrap">WhatsApp</span>
              </a>
              <a href="mailto:hritikchaudhary016@gmail.com?subject=Project Inquiry" 
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 rounded-full font-semibold text-base md:text-lg hover:bg-white/10 transition-all hover:border-white/20 backdrop-blur-sm">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-400" /> 
                <span className="whitespace-nowrap">Email</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 md:mt-16">
              {[
                { value: "500+", label: "Projects Delivered", icon: Rocket },
                { value: "98%", label: "Client Satisfaction", icon: Star },
                { value: "24/7", label: "Support", icon: Gauge },
                { value: "50+", label: "Tech Stack", icon: Cpu },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-xs md:text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative z-10 py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
                <Zap className="w-4 h-4" /> 
                <span>What We Build</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Anything</span>
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> You Need</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">From a simple idea to a fully deployed product. We build it all.</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, idx) => (
                <Link key={idx} href={service.href} 
                  className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-full bg-slate-950/90 rounded-3xl" />
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-gradient-to-br ${service.glow} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${service.glow.split(' ')[1].replace('500', '500/20')}`}>
                      <service.icon className="w-6 md:w-7 h-6 md:h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base">{service.desc}</p>
                    
                    {/* Arrow */}
                    <div className="mt-4 md:mt-6 flex items-center text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${service.glow} opacity-0 group-hover:opacity-10 transition-opacity rounded-bl-3xl`} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="relative z-10 py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
                <Layers className="w-4 h-4" /> 
                <span>How It Works</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">From</span>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Thought</span>
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"> to</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Product</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {process.map((step, idx) => (
                <div key={idx} className="relative text-center p-4 md:p-6">
                  {/* Connector line */}
                  {idx < process.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[55%] w-[90%] h-px bg-gradient-to-r from-purple-500/50 to-cyan-500/50" />
                  )}
                  
                  {/* Step number */}
                  <div className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 md:w-7 h-6 md:h-7" />
                  </div>
                  
                  {/* Step info */}
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white">{step.title}</h3>
                  <p className="text-xs md:text-sm text-slate-400">{step.desc}</p>
                  
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 md:right-auto md:-left-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
                    {step.num}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative z-10 py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left side */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm mb-4">
                  <Shield className="w-4 h-4" /> 
                  <span>Why Choose Us</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">We Turn</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Ideas Into Reality</span>
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { icon: Infinity, text: "Free consultation - unique in the industry" },
                    { icon: Gauge, text: "On-time delivery you can trust" },
                    { icon: Target, text: "Fair & transparent pricing" },
                    { icon: Cloud, text: "End-to-end development & deployment" },
                    { icon: Lock, text: "You own everything we build" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-slate-300 text-sm md:text-base">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - CTA Card */}
              <div className="relative">
                <div className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-cyan-900/40 border border-white/10 backdrop-blur-xl overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 animate-pulse" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center mb-4 md:mb-6 mx-auto lg:mx-0">
                      <Diamond className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white text-center lg:text-left">Ready to Start?</h3>
                    <p className="text-slate-300 mb-5 md:mb-6 text-center lg:text-left">Share your idea with us and watch it become reality.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="https://wa.me/918859820935?text=Hi! I have an idea I want to discuss..." target="_blank" rel="noopener noreferrer" 
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 rounded-xl font-semibold transition-all hover:scale-105">
                        <MessageCircle className="w-5 h-5" /> WhatsApp
                      </a>
                      <a href="mailto:hritikchaudhary016@gmail.com?subject=Project Inquiry" 
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl font-semibold transition-all">
                        <Mail className="w-5 h-5" /> Email
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-3 md:-top-4 -right-3 md:right-auto md:-left-4 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs md:text-sm animate-bounce">
                  <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> Fast Response</span>
                </div>
                <div className="absolute -bottom-3 md:-bottom-4 -left-3 md:left-auto md:-right-4 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-xs md:text-sm">
                  <span className="flex items-center gap-1.5"><Gauge className="w-3 h-3" /> 24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative z-10 py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Our</span>
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Products</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <Link key={product.name} href={product.href} 
                  className="group relative p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className={`p-2.5 md:p-3 rounded-xl ${product.bgColor}`}>
                      <product.icon className={`h-5 w-5 md:h-6 md:w-6 ${product.color}`} />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === "Live" ? "bg-green-500/20 text-green-400" : 
                      product.status === "New" ? "bg-blue-500/20 text-blue-400" : 
                      "bg-slate-500/20 text-slate-400"
                    }`}>{product.status}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{product.name}</h3>
                  <p className="text-xs md:text-sm text-slate-400 line-clamp-2">{product.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-cyan-900/40 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              {/* Animated elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <Rocket className="w-12 md:w-16 h-12 md:h-16 text-purple-400 mx-auto mb-4 md:mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                  <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Have an</span>
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Idea?</span>
                </h2>
                <p className="text-base md:text-lg text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto">Think about it. Tell us about it. We'll build, deploy, and give you the ready-made product.</p>
                <a href="https://wa.me/918859820935?text=Hi! I have an idea I want to discuss..." target="_blank" rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-base md:text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" /> Get Free Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                <Atom className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">KraftAI</span>
            </div>
            <p className="text-xs md:text-sm text-slate-500">© {new Date().getFullYear()} KraftAI. Built for the future.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

const products = [
  { name: "Enterprise", description: "Enterprise-grade infrastructure solutions", href: "/enterprise", icon: Briefcase, color: "text-blue-400", bgColor: "bg-blue-500/10", status: "New" },
  { name: "Padhai", description: "AI-powered study tracker for students", href: "/padhai", icon: BookOpen, color: "text-emerald-400", bgColor: "bg-emerald-500/10", status: "Live" },
  { name: "LegalDocs", description: "AI legal document generator for India", href: "/legal-docs", icon: Scale, color: "text-orange-400", bgColor: "bg-orange-500/10", status: "Live" },
  { name: "AI Games", description: "Next-gen AI-powered gaming experiences", href: "#", icon: Gamepad2, color: "text-purple-400", bgColor: "bg-purple-500/10", status: "Coming Soon" },
  { name: "AI Chatbot", description: "Advanced AI chatbot for automation", href: "#", icon: Bot, color: "text-cyan-400", bgColor: "bg-cyan-500/10", status: "Coming Soon" },
];

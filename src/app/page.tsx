import Link from "next/link";
import Script from "next/script";
import { Scale, Gamepad2, Bot, ArrowRight, BookOpen, Briefcase, Cpu, Sparkles, Zap, MessageCircle, Mail, Globe, ShoppingCart, Store, Building2, Smartphone, Palette, Wand2, Rocket, Shield, CheckCircle, ChevronRight, Hexagon, Layers, Box, Scan, Star, Diamond, Infinity, Target, Gauge, Cloud, Code2, Database, Globe2, Atom, Crown, Lock, Fingerprint, Eye, Binary, Waves, Orbit, Radio, Activity, Brain, CircuitBoard, Sparkle, Flame } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KraftAI — From Idea to Reality | Custom Software Development Company India",
  description: "Think it. Tell us. We build & deploy. Custom websites, apps, stores - everything from idea to ready-made product. Free consultation. Trusted delivery by expert developers in India.",
  keywords: ["software development company", "custom website development", "web development services India", "mobile app development", "e-commerce website builder", "startup software", "freelance developer India", "build app from idea"],
  metadataBase: new URL("https://kraftai.in"),
};

// Multi-language content
const translations = {
  en: {
    nav_init: "Initialize",
    hero_badge: "NEURAL YEAR 2050 · QUANTUM READY",
    hero_title1: "You Think.",
    hero_title2: "We Build.",
    hero_title3: "You Own.",
    hero_sub: "Neural upload your vision. Quantum build your dreams. Deploy globally. Full ownership.",
    cta_whatsapp: "Start a Conversation",
    cta_email: "Send an Email",
    cta_whatsapp_msg: "Hi! Can you provide a quotation for building a website/app for my business? Here's what I'm looking for...",
    services_title1: "Build",
    services_title2: "Anything",
    services_desc: "From concept to launch. Get custom quotes for your project needs.",
    process_title1: "From",
    process_title2: "Idea",
    process_title3: "→",
    process_title4: "Quotation → Project",
    cta_section_title: "Get Your Quotation",
    cta_section_desc: "Tell us your requirements and get an informed quote.",
    service_msgs: {
      websites: "Hi! I need a quotation for a professional website. Here's what I need: [describe your business, features, timeline, budget range]",
      stores: "Hi! Can you give me a quotation for building an e-commerce store? Details: [product types, features needed, monthly target, when needed]",
      mobile_apps: "Hi! I need a quotation for a mobile app. Requirements: [app purpose, platforms-iOS/Android/both, key features, launch timeline]",
      business_apps: "Hi! Can you provide a quotation for a custom business tool? What I need: [current process, features required, team size, budget]",
      design: "Hi! I need a quotation for UI/UX design. Project details: [what it's for, design style, revisions, timeline and budget]",
      ai_solutions: "Hi! Can you quote for AI integration? What I need: [current system, AI capabilities required, expected ROI, timeline]"
    }
  },
  hi: {
    nav_init: "शुरू करें",
    hero_badge: "तेज़ कोटेशन · सही कीमत",
    hero_title1: "आप सोचें।",
    hero_title2: "हम कोटेशन दें।",
    hero_title3: "आप तय करें।",
    hero_sub: "अपनी जरूरतें बताएं। हम विस्तृत कोटेशन देंगे - समय सीमा और लागत के साथ। फिर आप तय कर सकते हैं।",
    cta_whatsapp: "कोटेशन माँगें",
    cta_email: "ईमेल भेजें",
    cta_whatsapp_msg: "नमस्ते! मुझे वेबसाइट/ऐप के लिए कोटेशन चाहिए। मेरी जरूरत: [अपनी आवश्यकता बताएं]",
    services_title1: "कौन सी",
    services_title2: "सेवा",
    services_desc: "विस्तृत कोटेशन में आपको सटीक लागत और समय मिलेगा।",
    process_title1: "जरूरत",
    process_title2: "→",
    process_title3: "कोटेशन",
    process_title4: "→ बनाएं",
    cta_section_title: "अपना कोटेशन माँगें",
    cta_section_desc: "विस्तृत जरूरतें बताएं। हम जानकारी भरपूर कोटेशन देंगे।",
    service_msgs: {
      websites: "नमस्ते! मुझे प्रोफेशनल वेबसाइट के लिए कोटेशन चाहिए। मेरा बिजनेस: [टाइप], फीचर्स: [क्या चाहिए], समय सीमा: [कब तक], बजट: [रेंज]",
      stores: "नमस्ते! ऑनलाइन स्टोर के लिए कोटेशन चाहिए। उत्पाद: [कौन से], फीचर्स: [क्या चाहिए], मासिक लक्ष्य: [कितना], लॉन्च: [कब]",
      mobile_apps: "नमस्ते! मोबाइल ऐप के लिए कोटेशन चाहिए। उद्देश्य: [ऐप क्या करेगा], प्लेटफॉर्म: [iOS/Android/दोनों], फीचर्स: [सूची], समय: [कब]",
      business_apps: "नमस्ते! कस्टम टूल के लिए कोटेशन चाहिए। वर्तमान प्रक्रिया: [समझाएं], जरूरी फीचर्स: [सूची], टीम साइज़: [कितने यूजर], बजट: [रेंज]",
      design: "नमस्ते! डिजाइन के लिए कोटेशन चाहिए। प्रोजेक्ट: [किस तरह का], स्टाइल: [पसंद], संशोधन: [कितने], समय और बजट: [विवरण]",
      ai_solutions: "नमस्ते! AI इंटीग्रेशन के लिए कोटेशन चाहिए। वर्तमान सिस्टम: [विवरण], AI क्षमता: [क्या चाहिए], अपेक्षित ROI: [क्या चाहते हैं], समय: [कब]"
    }
  },
  hinglish: {
    nav_init: "Initialize",
    hero_badge: "FAST QUOTES · AFFORDABLE PRICING",
    hero_title1: "Aap sochen.",
    hero_title2: "Hum quote dete hain.",
    hero_title3: "Aap decide karo.",
    hero_sub: "Apne requirements batao. Hum detailed quotation denge with timeline aur cost. Fir aap decide kar sakte ho.",
    cta_whatsapp: "Quote Manga",
    cta_email: "Email Karo",
    cta_whatsapp_msg: "Hi! Mujhe quotation chahiye ek website/app ke liye. Mera requirement: [describe your needs]",
    services_title1: "Kaunsa",
    services_title2: "Service",
    services_desc: "Detailed quotes mein aapko exact cost aur timeline milega.",
    process_title1: "Requirement",
    process_title2: "→",
    process_title3: "Quotation",
    process_title4: "→ Build",
    cta_section_title: "Apna Quotation Manga",
    cta_section_desc: "Detailed requirements batao. Hum informative quote denge.",
    service_msgs: {
      websites: "Hi! Mujhe quotation chahiye professional website ke liye. Mera business: [type], features: [what you need], timeline: [when], budget: [range]",
      stores: "Hi! Online store quotation chahiye. Products: [what type], features: [required], target sales: [monthly], launch: [when needed]",
      mobile_apps: "Hi! Mobile app quotation chahiye. Purpose: [app kya karega], Platform: [iOS/Android/both], Features: [list], Timeline: [when]",
      business_apps: "Hi! Custom tool quotation chahiye. Current process: [explain], Features needed: [list], Team size: [how many users], Budget: [range]",
      design: "Hi! Design quotation chahiye. Project: [what type], Style: [preferred], Revisions: [how many], Timeline aur Budget: [details]",
      ai_solutions: "Hi! AI integration quotation chahiye. Current system: [details], AI capabilities: [what needed], Expected ROI: [what you expect], Timeline: [when]"
    }
  }
};

// Get user's preferred language based on location
function detectLanguage(country?: string): keyof typeof translations {
  if (!country) return "en";
  const country_lower = country.toLowerCase();
  if (country_lower === "in" || country_lower === "india") {
    return Math.random() > 0.5 ? "hinglish" : "hi";
  }
  return "en";
}

export default function Home() {
  const services = [
    { icon: Globe2, title: "Websites", desc: "Professional websites that convert", href: "/services/websites", glow: "from-cyan-500 to-blue-500", neural: true, whatsapp_key: "websites" },
    { icon: ShoppingCart, title: "Online Stores", desc: "E-commerce that sells", href: "/services/stores", glow: "from-pink-500 to-rose-500", neural: true, whatsapp_key: "stores" },
    { icon: Smartphone, title: "Mobile Apps", desc: "iOS & Android apps", href: "/services/mobile-apps", glow: "from-violet-500 to-purple-500", neural: true, whatsapp_key: "mobile_apps" },
    { icon: Database, title: "Business Apps", desc: "Custom internal tools", href: "/services/business-apps", glow: "from-emerald-500 to-teal-500", neural: true, whatsapp_key: "business_apps" },
    { icon: Palette, title: "UI/UX Design", desc: "Beautiful & functional", href: "/services/design", glow: "from-amber-500 to-orange-500", neural: true, whatsapp_key: "design" },
    { icon: Atom, title: "AI Solutions", desc: "Smart automation", href: "/services/ai-solutions", glow: "from-rose-500 to-pink-500", neural: true, whatsapp_key: "ai_solutions" },
  ];

  const process = [
    { num: "01", title: "Neural Upload", desc: "Upload your vision", icon: Brain, effect: "pulse-cyan" },
    { num: "02", title: "Quantum Build", desc: "AI constructs", icon: Cpu, effect: "pulse-purple" },
    { num: "03", title: "Deploy to Cloud", desc: "Global mesh", icon: Cloud, effect: "pulse-blue" },
    { num: "04", title: "You Own", desc: "Full access", icon: Lock, effect: "pulse-green" },
  ];

  const techStack = [
    { name: "Neural Networks", icon: Brain },
                { name: "Quantum Computing", icon: Hexagon },
    { name: "Blockchain", icon: Binary },
    { name: "Edge AI", icon: Zap },
    { name: "Web3", icon: Globe2 },
    { name: "Metaverse", icon: Eye },
    { name: "Computer Vision", icon: Fingerprint },
    { name: "NLP", icon: MessageCircle },
  ];

  return (
    <>
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "name": "KraftAI", "url": "https://kraftai.in", "logo": "https://kraftai.in/icon.svg", "description": "Custom software development company - websites, apps, stores built from your idea in India", "address": { "@type": "PostalAddress", "addressCountry": "IN" }, "contactPoint": { "@type": "ContactPoint", "email": "hritikchaudhary016@gmail.com", "contactType": "customer service", "areaServed": "IN" }, "areaServed": "IN", "serviceType": ["Web Development", "Mobile App Development", "E-commerce Development", "Custom Software", "UI/UX Design", "AI Solutions"], "priceRange": "$$" }) }} />
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "name": "KraftAI", "url": "https://kraftai.in", "potentialAction": { "@type": "SearchAction", "target": "https://kraftai.in{search_term_string}", "query-input": "required name=search_term_string" } }) }} />
      <Script id="services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", "itemListElement": [{ "@type": "ListItem", position: 1, "name": "Custom Websites", "url": "https://kraftai.in/services/websites", "description": "Professional website development services" }, { "@type": "ListItem", position: 2, "name": "Online Stores", "url": "https://kraftai.in/services/stores", "description": "E-commerce website development" }, { "@type": "ListItem", position: 3, "name": "Mobile Apps", "url": "https://kraftai.in/services/mobile-apps", "description": "iOS and Android app development" }, { "@type": "ListItem", position: 4, "name": "Business Apps", "url": "https://kraftai.in/services/business-apps", "description": "Custom business software development" }, { "@type": "ListItem", position: 5, "name": "UI/UX Design", "url": "https://kraftai.in/services/design", "description": "Professional design services" }, { "@type": "ListItem", position: 6, "name": "AI Solutions", "url": "https://kraftai.in/services/ai-solutions", "description": "Artificial intelligence development" }] }) }} />
      
      <div className="min-h-screen bg-[#000008] text-white overflow-x-hidden selection:bg-purple-500/30 selection:text-cyan-300">
        {/* Neural Network Background */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Deep space */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
          
          {/* Animated starfield */}
          <div className="absolute inset-0" style={{ perspective: '1000px' }}>
            {[...Array(100)].map((_, i) => (
              <div key={i} className="absolute rounded-full animate-twinkle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                backgroundColor: ['#a855f7', '#06b6d4', '#22d3ee', '#f472b6', '#ffffff'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
              }} />
            ))}
          </div>
          
          {/* Neural network lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" style={{ stroke: 'url(#neuralGradient)' }}>
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            {[...Array(8)].map((_, i) => (
              <path key={i} d={`M0,${i * 80 + 40} Q400,${i * 80 + 40 + (i % 2 ? 30 : -30)} 800,${i * 80 + 40}`} fill="none" strokeWidth="0.5" className="animate-neural-flow" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
          </svg>
          
          {/* Holographic orbs */}
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full animate-orbit" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', animationDuration: '20s' }}>
            <div className="absolute inset-10 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }} />
          </div>
          <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full animate-orbit-reverse" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', animationDuration: '25s' }}>
            <div className="absolute inset-5 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)', animationDelay: '1s' }} />
          </div>
          <div className="absolute top-[50%] left-[50%] w-[500px] h-[500px] rounded-full animate-orbit" style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)', animationDuration: '30s', transform: 'translate(-50%, -50%)' }} />
          
          {/* Data streams */}
          <div className="absolute top-0 right-0 w-1 h-full animate-data-stream" style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.3), transparent)' }} />
          <div className="absolute top-0 left-0 w-1 h-full animate-data-stream-reverse" style={{ background: 'linear-gradient(to bottom, transparent, rgba(6,182,212,0.3), transparent)', animationDelay: '2s' }} />
          
          {/* Holographic scan line */}
          <div className="absolute inset-0 animate-scan-line opacity-10" style={{ background: 'linear-gradient(transparent 49%, rgba(6,182,212,0.5) 50%, transparent 51%)' }} />
        </div>

        {/* Navigation */}
        <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 backdrop-blur-sm bg-black/20 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-600 via-cyan-500 to-blue-600 flex items-center justify-center animate-neon-pulse">
                <Atom className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 via-cyan-500 to-blue-600 blur-lg opacity-50 animate-neon-glow" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight leading-none">
                Kraft<span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text">AI</span>
              </span>
              <span className="text-[8px] md:text-[10px] text-slate-500 tracking-[0.3em] uppercase">Neural Systems</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {['Services', 'Process', 'Products', 'Contact'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-all relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
          
          <Link href="/services" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 bg-[length:200%_auto] px-4 md:px-6 py-2 text-sm font-medium text-white transition-all hover:scale-105 animate-gradient-text">
            <span className="relative z-10">Initialize</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-28">
          <div className="text-center">
            {/* Neural Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md mb-6 md:mb-8 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping relative" />
              <span className="text-xs md:text-sm text-slate-300 font-medium tracking-wider">NEURAL YEAR 2050 · QUANTUM READY</span>
              <Sparkle className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 md:mb-6 leading-[1.1]">
              <span className="bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent">You Think.</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text">We Build.</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">You Own.</span>
            </h1>
            
            {/* Neural Subtitle */}
            <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
              <span className="text-white font-medium">Neural upload</span> your vision. <span className="text-cyan-400">Quantum build</span> your dreams. 
              <span className="text-purple-400"> Deploy globally</span>. Full ownership.
            </p>

            {/* Quotation CTAs - Interactive Discussion Focus */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4 mb-12">
              <a href="https://wa.me/918859820935?text=Hi! Can you provide a quotation for building a website/app for my business? Here's what I'm looking for: [Describe your project, features needed, timeline, and budget range]" target="_blank" rel="noopener noreferrer"
                className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl font-semibold text-base md:text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 relative z-10 animate-pulse" />
                <span className="relative z-10 whitespace-nowrap">Get Quotation</span>
              </a>
              <a href="mailto:hritikchaudhary016@gmail.com?subject=Quotation Request - Project Details Attached&body=Hi!%0A%0AI'm interested in getting a detailed quotation for my project.%0A%0AProject Type:%0AFeatures Needed:%0ATimeline:%0ABudget Range:%0A%0APlease provide a comprehensive quote with cost breakdown and timeline.%0A%0AThank you!"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/[0.03] border border-white/10 rounded-xl font-semibold text-base md:text-lg hover:bg-white/[0.06] transition-all hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Mail className="w-5 h-5 md:w-6 md:h-6 relative z-10 text-purple-400" />
                <span className="relative z-10 whitespace-nowrap">Email Details</span>
              </a>
            </div>

            {/* Neural Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
              {[
                { value: "∞", label: "Possibilities", icon: Infinity },
                { value: "99.9%", label: "Uptime", icon: Gauge },
                { value: "0ms", label: "Latency", icon: Zap },
                { value: "256-bit", label: "Encryption", icon: Lock },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-cyan-400/60 group-hover:text-cyan-400 transition-all animate-pulse" />
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Build Banner */}
        <section className="relative z-10 py-8 md:py-12 px-4 md:px-6 bg-gradient-to-r from-emerald-900/30 via-teal-900/20 to-cyan-900/30 border-y border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-white">What do you want to </span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">build?</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
              Website • Online Store • Mobile App • Business Tool • Custom Software • AI Automation
            </p>
          </div>
        </section>

        {/* Services Section - Neural Cards */}
        <section id="services" className="relative z-10 py-16 md:py-28 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
                <Zap className="w-4 h-4" />
                <span>What We Build</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Everything</span>
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> You Need</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">From concept to launch, we build web apps, mobile apps, e-commerce stores, and custom solutions. Click any to share your idea on WhatsApp.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, idx) => {
                const whatsappMsg = encodeURIComponent(translations.en.service_msgs[service.whatsapp_key as keyof typeof translations.en.service_msgs] || translations.en.cta_whatsapp_msg);
                const whatsappUrl = `https://wa.me/918859820935?text=${whatsappMsg}`;

                return (
                  <a key={idx} href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="group relative p-6 md:p-8 rounded-3xl bg-white/[0.01] border border-white/[0.05] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer">
                    {/* Neural glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.glow} opacity-0 group-hover:opacity-15 transition-opacity duration-700`} />

                    {/* Scanning effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
                    </div>

                    <div className="relative z-10">
                      <div className={`w-12 md:w-14 h-12 md:h-14 rounded-xl bg-gradient-to-br ${service.glow} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/20`}>
                        <service.icon className="w-6 md:w-7 h-6 md:h-7 text-white" />
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                      <p className="text-slate-400 text-sm md:text-base">{service.desc}</p>

                      <div className="mt-4 md:mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Now</span>
                      </div>
                    </div>

                    {/* Corner neural nodes */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/50 transition-all" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-purple-400/0 group-hover:bg-purple-400/50 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section - Quantum Flow */}
        <section id="process" className="relative z-10 py-16 md:py-28 px-4 md:px-6 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
                <Layers className="w-4 h-4" /> 
                <span>Neural Pipeline</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">From</span>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Thought</span>
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"> →</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Reality</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {process.map((step, idx) => (
                <div key={idx} className="relative text-center p-4 md:p-6 group">
                  {idx < process.length - 1 && (
                    <div className="hidden md:block absolute top-14 left-[45%] w-[110%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  )}
                  
                  <div className={`relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform ${step.effect === 'pulse-cyan' ? 'animate-pulse-cyan' : step.effect === 'pulse-purple' ? 'animate-pulse-purple' : step.effect === 'pulse-blue' ? 'animate-pulse-blue' : 'animate-pulse-green'}`}>
                    <step.icon className="w-6 md:w-7 h-6 md:h-7" />
                  </div>
                  
                  <div className="absolute -top-1 -right-1 md:right-auto md:-left-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold">
                    {step.num}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white">{step.title}</h3>
                  <p className="text-xs md:text-sm text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack - Neural Grid */}
        <section className="relative z-10 py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              <Cpu className="w-4 h-4" /> 
              <span>Neural Stack</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {techStack.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all hover:bg-emerald-500/10">
                  <tech.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs md:text-sm text-slate-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Neural Link */}
        <section id="contact" className="relative z-10 py-16 md:py-28 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-900/30 via-slate-900/80 to-cyan-900/30 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>
              
              <div className="relative z-10">
                <Rocket className="w-12 md:w-16 h-12 md:h-16 text-emerald-400 mx-auto mb-4 md:mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                  <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Get Your</span>
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Detailed Quotation</span>
                </h2>
                <p className="text-base md:text-lg text-slate-300 mb-6 md:mb-8 max-w-xl mx-auto">
                  Share your project requirements and get an <span className="font-semibold text-emerald-300">informative quotation with exact cost, timeline, and deliverables</span>.
                </p>
                <a href="https://wa.me/918859820935?text=Hi! I need a quotation for my project. Here are the details:%0A%0AProject Type: [your project]%0AKey Features: [what you need]%0ATimeline: [when you need it]%0ABudget Range: [your budget]%0A%0APlease provide a detailed quote with breakdown." target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-base md:text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] animate-neon-pulse">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" /> Request Quotation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                  <Atom className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">KraftAI</span>
                  <span className="text-[8px] text-slate-500 uppercase tracking-wider">Custom Software Dev</span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex gap-6 text-xs text-slate-400">
                <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
                <a href="#process" className="hover:text-cyan-400 transition-colors">Process</a>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs md:text-sm text-slate-500">© {new Date().getFullYear()} KraftAI India. All rights reserved.</p>
              <div className="text-xs text-slate-400">
                <span>💬 WhatsApp: </span>
                <a href="https://wa.me/918859820935" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">+91 8859 820935</a>
              </div>
            </div>
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

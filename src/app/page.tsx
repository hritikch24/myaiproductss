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

      <div className="min-h-screen bg-[#050508] text-[#f0f0f8] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Organic Background */}
        <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: '#050508' }}>
          {/* Noise overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px',
            }}
          />

          {/* Neural dots and connections */}
          <svg className="absolute inset-0 w-full h-full opacity-30" style={{ pointerEvents: 'none' }}>
            <circle cx="75%" cy="20%" r="4" fill="#00ffe0" opacity="0.7" />
            <circle cx="85%" cy="15%" r="3" fill="#00ffe0" opacity="0.5" />
            <circle cx="90%" cy="30%" r="5" fill="#00ffe0" opacity="0.4" />
            <circle cx="70%" cy="35%" r="3" fill="#00ffe0" opacity="0.5" />
            <line x1="75%" y1="20%" x2="85%" y2="15%" stroke="#00ffe0" strokeWidth="1" opacity="0.2" />
            <line x1="85%" y1="15%" x2="90%" y2="30%" stroke="#00ffe0" strokeWidth="1" opacity="0.2" />
            <line x1="70%" y1="35%" x2="75%" y2="20%" stroke="#00ffe0" strokeWidth="1" opacity="0.2" />
          </svg>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-12 py-4 md:py-5 backdrop-blur-sm" style={{ background: 'rgba(5, 5, 8, 0.8)' }}>
          <Link href="/" className="font-mono text-base font-bold text-[#f0f0f8] hover:text-[#00ffe0] transition-colors">
            Kraft<span style={{ color: '#00ffe0' }}>AI</span>
          </Link>

          <div className="flex gap-8 hidden md:flex">
            <a href="#services" className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)] hover:text-[#f0f0f8] transition-colors">Services</a>
            <a href="#process" className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)] hover:text-[#f0f0f8] transition-colors">Process</a>
            <a href="#contact" className="font-mono text-xs uppercase tracking-wider text-[rgba(240,240,248,0.42)] hover:text-[#f0f0f8] transition-colors">Contact</a>
          </div>

          <a
            href="https://wa.me/918859820935?text=Hi! Can you provide a quotation? Please share your details..."
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider font-bold px-4 md:px-6 py-2 md:py-3 rounded-full text-black transition-all whitespace-nowrap"
            style={{ background: '#00ffe0', boxShadow: 'hover:0_0_32px_rgba(0,255,224,0.5)' }}
          >
            Get Quote
          </a>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-32 pb-12 text-center">
          <div className="max-w-4xl">
            <div className="mb-8 inline-block">
              <span className="font-mono text-xs uppercase tracking-wider text-[#00ffe0] opacity-90">
                ✨ KraftAI — Custom Software & Quotations
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight" style={{ color: '#f0f0f8' }}>
              You Think.<br />
              <span style={{ color: '#00ffe0' }}>We Build.</span><br />
              You Own.
            </h1>

            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(240,240,248,0.6)' }}>
              Get detailed quotations for websites, apps, stores, and custom solutions.
              Share your requirements and receive a comprehensive quote with exact costs and timelines.
            </p>

            <div className="flex gap-4 flex-wrap justify-center mb-16">
              <a
                href="https://wa.me/918859820935?text=Hi! I need a quotation. Here are my details:%0A%0AProject Type: [what you need]%0AKey Features: [list them]%0ATimeline: [when needed]%0ABudget: [your range]%0A%0APlease provide a detailed quote."
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-bold px-8 py-4 text-black rounded-full transition-all flex items-center gap-2 hover:shadow-lg"
                style={{ background: '#00ffe0' }}
              >
                <MessageCircle className="w-4 h-4" />
                Get Quotation
              </a>
              <a
                href="mailto:hritikchaudhary016@gmail.com?subject=Quotation Request&body=Hi!%0A%0AI'd like to get a quotation for my project.%0A%0AProject Details:%0AType:%0AFeatures:%0ATimeline:%0ABudget:%0A%0APlease provide a detailed quote."
                className="font-mono text-sm font-bold px-8 py-4 text-[#f0f0f8] rounded-full transition-all flex items-center gap-2 border hover:border-[#00ffe0] hover:text-[#00ffe0]"
                style={{ borderColor: 'rgba(240,240,248,0.3)' }}
              >
                <Mail className="w-4 h-4" />
                Email Quote
              </a>
            </div>
          </div>
        </section>

        {/* Build Banner */}
        <section className="relative z-10 py-8 md:py-12 px-6 md:px-12" style={{ borderTop: '1px solid rgba(240,240,248,0.1)', borderBottom: '1px solid rgba(240,240,248,0.1)' }}>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span style={{ color: '#f0f0f8' }}>What do you want to </span>
              <span style={{ color: '#00ffe0' }}>build?</span>
            </h2>
            <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: 'rgba(240,240,248,0.42)' }}>
              Website • Online Store • Mobile App • Business Tool • Custom Software • AI Automation
            </p>
          </div>
        </section>

        {/* Services Section - Bento Cards */}
        <section id="services" className="relative z-10 px-6 md:px-12 py-16 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#f0f0f8' }}>What We Build</h2>
              <p className="text-lg" style={{ color: 'rgba(240,240,248,0.42)' }}>Select your project type to get an instant quotation</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => {
                const whatsappMsg = encodeURIComponent(translations.en.service_msgs[service.whatsapp_key as keyof typeof translations.en.service_msgs] || translations.en.cta_whatsapp_msg);
                const whatsappUrl = `https://wa.me/918859820935?text=${whatsappMsg}`;

                return (
                  <a
                    key={idx}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-6 md:p-8 rounded-2xl border transition-all hover:-translate-y-2 cursor-pointer overflow-hidden hover:border-[#00ffe0]"
                    style={{
                      background: '#0c0c14',
                      borderColor: 'rgba(240,240,248,0.1)',
                      '--mx': '50%',
                      '--my': '50%',
                    } as any}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,255,224,0.15), transparent 60%)',
                      }}
                    />

                    <div className="relative z-10">
                      <service.icon className="w-10 h-10 mb-4" style={{ color: '#00ffe0' }} />
                      <h3 className="text-xl font-bold mb-3" style={{ color: '#f0f0f8' }}>{service.title}</h3>
                      <p className="text-sm mb-6" style={{ color: 'rgba(240,240,248,0.5)' }}>{service.desc}</p>

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-all" style={{ background: 'rgba(0,255,224,0.1)', color: '#00ffe0' }}>
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-mono text-xs uppercase">Get Quote</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="relative z-10 px-6 md:px-12 py-16 md:py-24">
          <h2 className="text-4xl font-bold mb-16">Our Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Share Details', desc: 'Tell us about your project' },
              { num: '02', title: 'Get Quotation', desc: 'Receive a detailed quote' },
              { num: '03', title: 'Discuss & Refine', desc: 'Clarify scope and timeline' },
              { num: '04', title: 'Build & Deploy', desc: 'We deliver your project' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="font-mono text-5xl font-bold mb-4 opacity-20" style={{ color: '#00ffe0' }}>{step.num}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#f0f0f8' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(240,240,248,0.42)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="relative z-10 px-6 md:px-12 py-16 md:py-24 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Quote?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'rgba(240,240,248,0.42)' }}>
            Get a detailed quotation with cost breakdown and timeline.
            Share your requirements and let's build something amazing.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/918859820935?text=Hi! I'm ready for a quotation. Here are my project details:%0A%0AProject Type:%0AFeatures:%0ATimeline:%0ABudget:%0A%0APlease provide a detailed quote."
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-bold px-8 py-4 text-black rounded-lg transition-all"
              style={{ background: '#00ffe0' }}
            >
              Get Started on WhatsApp
            </a>
            <a
              href="mailto:hritikchaudhary016@gmail.com"
              className="font-mono text-sm font-bold px-8 py-4 text-[#00ffe0] rounded-lg transition-all border"
              style={{ borderColor: '#00ffe0' }}
            >
              Send Email
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t px-6 md:px-12 py-8 md:py-12 text-center" style={{ borderColor: 'rgba(240,240,248,0.1)' }}>
          <p className="font-mono text-xs uppercase tracking-wider" style={{ color: 'rgba(240,240,248,0.42)' }}>
            © 2026 KraftAI. Get detailed quotes for your projects.
          </p>
          <p className="font-mono text-xs uppercase tracking-wider mt-2" style={{ color: 'rgba(240,240,248,0.42)' }}>
            💬 WhatsApp: +91 8859 820935 | 📧 Email: hritikchaudhary016@gmail.com
          </p>
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

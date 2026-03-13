'use client';

import Link from "next/link";
import { 
  Cloud, 
  Boxes, 
  Bot, 
  Cpu, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Globe,
  Server,
  Workflow,
  LineChart,
  ChevronRight
} from "lucide-react";
import { useEffect, useState } from "react";

const services = [
  {
    icon: Cloud,
    title: "Terraform Infrastructure",
    description: "Enterprise-grade Infrastructure as Code with Terraform. We design, implement, and manage cloud infrastructure that scales with your business.",
    features: [
      "Multi-cloud architecture (AWS, GCP, Azure)",
      "Immutable infrastructure patterns",
      "Infrastructure testing & validation",
      "Cost-optimized resource allocation"
    ],
    color: "from-blue-500 to-cyan-400",
    bgGlow: "bg-blue-500/20"
  },
  {
    icon: Boxes,
    title: "Kubernetes Orchestration",
    description: "Production-ready Kubernetes clusters with enterprise security. From Docker to K8s, we handle container orchestration at any scale.",
    features: [
      "Multi-cluster management",
      "Service mesh implementation",
      "Auto-scaling & self-healing",
      "GitOps workflows (ArgoCD, Flux)"
    ],
    color: "from-purple-500 to-pink-400",
    bgGlow: "bg-purple-500/20"
  },
  {
    icon: Bot,
    title: "AI-Powered Operations",
    description: "Leverage AI to optimize infrastructure, predict failures, and automate operations. Our expert team integrates intelligent automation.",
    features: [
      "AI-driven monitoring & alerting",
      "Predictive scaling",
      "Anomaly detection",
      "Automated incident response"
    ],
    color: "from-emerald-500 to-teal-400",
    bgGlow: "bg-emerald-500/20"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Zero-trust security architecture with compliance. We implement security at every layer of your infrastructure.",
    features: [
      "Policy-as-Code (OPA, Sentinel)",
      "Secret management (Vault)",
      "Network segmentation",
      "Compliance automation"
    ],
    color: "from-orange-500 to-amber-400",
    bgGlow: "bg-orange-500/20"
  }
];

const stats = [
  { value: "99.99%", label: "Uptime Guarantee" },
  { value: "500+", label: "Deployments/Day" },
  { value: "<2min", label: "Avg Recovery Time" },
  { value: "40%", label: "Cost Reduction" }
];

const processSteps = [
  { number: "01", title: "Assessment", description: "We analyze your current infrastructure and identify optimization opportunities" },
  { number: "02", title: "Design", description: "Architect scalable, secure systems using Terraform and Kubernetes" },
  { number: "03", title: "Implementation", description: "Deploy infrastructure with GitOps and automated pipelines" },
  { number: "04", title: "Optimization", description: "Continuous monitoring and AI-driven improvements" }
];

export default function EnterprisePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="gradient-orb w-[600px] h-[600px] bg-blue-600/30 -top-40 -left-40" style={{ animationDelay: '0s' }} />
        <div className="gradient-orb w-[500px] h-[500px] bg-purple-600/20 top-1/2 right-0" style={{ animationDelay: '-7s' }} />
        <div className="gradient-orb w-[400px] h-[400px] bg-emerald-600/20 bottom-0 left-1/3" style={{ animationDelay: '-14s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-[#030712]/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              Kraft<span className="text-blue-400">AI</span>
            </span>
            <span className="ml-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-white/10 rounded-full text-slate-400">
              Enterprise
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
              Contact
            </Link>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-300">Ex-Meta Engineers · Available for Projects</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Infrastructure at
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Massive Scale
              </span>
            </h1>
            
            <p className={`text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              We build enterprise infrastructure using Terraform, Kubernetes, and AI. 
              The same engineering excellence used to power billions of users.
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2">
                Schedule Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all flex items-center gap-2">
                View Case Studies
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Enterprise-Grade Solutions
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Full-stack infrastructure engineering powered by AI and built on battle-tested patterns from scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div 
                key={i}
                className={`group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl ${service.bgGlow} mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-24 px-6 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Proven methodology refined through years of building systems that serve millions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-white/[0.05] mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technologies We Master</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Cutting-edge tools and platforms for modern infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              { name: "Terraform", icon: Cloud },
              { name: "Kubernetes", icon: Boxes },
              { name: "Docker", icon: Server },
              { name: "AWS", icon: Cloud },
              { name: "GCP", icon: Globe },
              { name: "Azure", icon: Cloud },
              { name: "ArgoCD", icon: Workflow },
              { name: "Prometheus", icon: LineChart },
              { name: "AI/ML", icon: Bot },
              { name: "Vault", icon: Shield }
            ].map((tech, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <tech.icon className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative p-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Scale?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Let&apos;s discuss how we can help you build infrastructure that scales with your ambitions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 flex items-center gap-2">
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                Kraft<span className="text-blue-400">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-white/10 rounded-full text-slate-400">
                Enterprise
              </span>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} KraftAI Enterprise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

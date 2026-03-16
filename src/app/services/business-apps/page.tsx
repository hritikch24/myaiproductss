import Link from "next/link";
import { ArrowLeft, Building2, Briefcase, Users, BarChart3, FileText, Settings, ChevronRight, Hexagon, Cpu, Sparkles, Rocket, MessageCircle, Mail, Zap, Shield, Clock, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Apps | KraftAI",
  description: "Custom business software built for your processes. ERP, CRM, HR tools - all 2050+ design.",
};

const themes = [
  {
    id: "enterprise-dark",
    name: "Enterprise Dark",
    desc: "Professional dark theme for enterprise applications",
    colors: ["#3b82f6", "#6366f1", "#8b5cf6"],
    features: ["Data-rich dashboards", "Team collaboration", "Role-based access", "Audit logs"],
  },
  {
    id: "dashboard-pro",
    name: "Dashboard Pro",
    desc: "Analytics-focused business dashboard",
    colors: ["#10b981", "#06b6d4", "#3b82f6"],
    features: ["Real-time analytics", "Custom widgets", "Export reports", "API integration"],
  },
  {
    id: "crm-elite",
    name: "CRM Elite",
    desc: "Customer relationship management with style",
    colors: ["#f472b6", "#ec4899", "#db2777"],
    features: ["Lead tracking", "Pipeline view", "Automations", "Contact management"],
  },
  {
    id: "hr-suite",
    name: "HR Suite",
    desc: "Human resources management system",
    colors: ["#f59e0b", "#fbbf24", "#fcd34d"],
    features: ["Employee database", "Leave management", "Payroll integration", "Performance reviews"],
  },
  {
    id: "inventory-pro",
    name: "Inventory Pro",
    desc: "Stock & inventory management",
    colors: ["#22c55e", "#16a34a", "#15803d"],
    features: ["Stock tracking", "Low alerts", "Barcode support", "Multi-warehouse"],
  },
  {
    id: "project-flow",
    name: "Project Flow",
    desc: "Project management & task tracking",
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9"],
    features: ["Kanban boards", "Gantt charts", "Time tracking", "Team tasks"],
  },
];

export default function BusinessAppsPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(16,185,129,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Hexagon className="w-10 h-10 text-blue-400 fill-blue-400/20" />
          <Cpu className="absolute inset-2 w-4 h-4 text-green-400" />
          <span className="text-2xl font-bold">Kraft<span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">AI</span></span>
        </div>
        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
            <Building2 className="w-4 h-4" />
            <span>Business Apps</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">Business</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">Software</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Custom software built for your business processes. ERP, CRM, HR, Inventory - all tailored to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 p-8">
                <div className="flex gap-2 mb-4">
                  {theme.colors.map((color, cidx) => (
                    <div key={cidx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{theme.name}</h3>
                <p className="text-slate-400 mb-4">{theme.desc}</p>
                <ul className="space-y-2 mb-6">
                  {theme.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                      <Sparkles className="w-3 h-3 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2">
                  <span>Preview Theme</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Build</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: "ERP Systems", desc: "Complete resource planning" },
              { icon: Users, title: "CRM", desc: "Customer relationship management" },
              { icon: BarChart3, title: "Analytics", desc: "Business intelligence" },
              { icon: FileText, title: "Document Management", desc: "Digital workflows" },
              { icon: Settings, title: "Automation", desc: "Process automation" },
              { icon: Shield, title: "Custom Tools", desc: "Anything you need" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-blue-900/40 via-slate-900/80 to-green-900/40 border border-white/10 backdrop-blur-xl text-center">
          <Rocket className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Automate Your Business</h2>
          <p className="text-slate-300 mb-6">Tell us your process, we'll build the software to run it.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-full font-semibold">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-semibold">
              <Mail className="w-5 h-5" />
              Email
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          <p>© {new Date().getFullYear()} KraftAI. Built for the future.</p>
        </div>
      </footer>
    </div>
  );
}

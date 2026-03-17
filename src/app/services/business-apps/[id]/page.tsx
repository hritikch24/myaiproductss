import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Menu, Home, Search, User, Bell, Plus, Settings, BarChart3, Users, FileText } from "lucide-react";

const businessData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
}> = {
  "enterprise-dark": { name: "Enterprise Dark", desc: "Professional dark enterprise app", colors: ["#3b82f6", "#6366f1", "#8b5cf6"], features: ["Data-rich dashboards", "Team collaboration", "Role-based access"] },
  "dashboard-pro": { name: "Dashboard Pro", desc: "Analytics-focused dashboard", colors: ["#10b981", "#06b6d4", "#3b82f6"], features: ["Real-time analytics", "Custom widgets", "Export reports"] },
  "crm-elite": { name: "CRM Elite", desc: "Customer relationship management", colors: ["#f472b6", "#ec4899", "#db2777"], features: ["Lead tracking", "Pipeline view", "Automations"] },
  "hr-suite": { name: "HR Suite", desc: "Human resources system", colors: ["#f59e0b", "#fbbf24", "#fcd34d"], features: ["Employee database", "Leave management", "Payroll"] },
  "inventory-pro": { name: "Inventory Pro", desc: "Stock & inventory management", colors: ["#22c55e", "#16a34a", "#15803d"], features: ["Stock tracking", "Low alerts", "Multi-warehouse"] },
  "project-flow": { name: "Project Flow", desc: "Project management", colors: ["#8b5cf6", "#7c3aed", "#6d28d9"], features: ["Kanban boards", "Gantt charts", "Time tracking"] },
};

export default function BusinessPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "enterprise-dark";
  const theme = businessData[id] || businessData["enterprise-dark"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />

      <nav className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <Link href="/services/business-apps" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <Hexagon className="w-6 h-6 md:w-8 md:h-8 text-blue-400 fill-blue-400/20" />
          <span className="font-bold text-sm md:text-base">KraftAI</span>
        </div>
      </nav>

      <div className="relative z-10 px-4 md:px-6 py-6 md:py-8 text-center">
        <div className="flex justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 md:w-10 md:h-10 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{theme.name}</h1>
        <p className="text-slate-400 text-sm md:text-base px-4">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-4 md:px-6 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-slate-300">{feature}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-2 md:px-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-t-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0f]">
            <div className="hidden md:flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 max-w-md mx-4"><div className="px-3 py-1 rounded-full bg-slate-800/50 text-xs text-slate-500 text-center">dashboard.kraftai.in</div></div>
            </div>
            <div className="p-3 md:p-6">
              <div className="flex gap-3 md:gap-4">
                {/* Sidebar */}
                <div className="hidden md:block w-16 space-y-2">
                  {['◉', '📊', '👥', '⚙'].map((icon, i) => (
                    <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-blue-500' : 'bg-slate-800'}`}><span>{icon}</span></div>
                  ))}
                </div>
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-bold">Enterprise Dashboard</h2>
                    <span className="text-xs md:text-sm text-slate-500">Admin</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
                    {[
                      { label: 'Revenue', value: '$2.4M' },
                      { label: 'Users', value: '12.5K' },
                      { label: 'Orders', value: '8.2K' },
                      { label: 'Growth', value: '+24%' },
                    ].map((stat, i) => (
                      <div key={i} className="p-2 md:p-4 rounded-lg md:rounded-xl bg-slate-800/50 border" style={{ borderColor: `${theme.colors[0]}20` }}>
                        <p className="text-[10px] md:text-xs text-slate-400">{stat.label}</p>
                        <p className="text-sm md:text-xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="p-3 md:p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                      <p className="text-xs text-slate-400 mb-2">Revenue Overview</p>
                      <div className="flex items-end gap-1 h-16 md:h-20">
                        {[40, 60, 45, 70, 55, 80, 65, 90].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `linear-gradient(to top, ${theme.colors[0]}, ${theme.colors[1]})` }} />
                        ))}
                      </div>
                    </div>
                    <div className="p-3 md:p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                      <p className="text-xs text-slate-400 mb-2">Team</p>
                      <div className="space-y-2">
                        {['Alice', 'Bob', 'Charlie'].map(name => (
                          <div key={name} className="flex items-center gap-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/30" />
                            <span className="text-xs md:text-sm">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-8 md:pb-16 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full font-semibold text-sm md:text-lg hover:scale-105 transition-transform">
          Get This Dashboard <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Link>
      </div>
    </div>
  );
}

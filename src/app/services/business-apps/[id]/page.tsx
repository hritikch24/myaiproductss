import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, BarChart3, Users, FileText, Settings, TrendingUp, DollarSign, Activity, Clock, CheckCircle } from "lucide-react";

const businessData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  element: React.ReactNode;
}> = {
  "enterprise-dark": {
    name: "Enterprise Dark",
    desc: "Professional dark theme for enterprise applications",
    colors: ["#3b82f6", "#6366f1", "#8b5cf6"],
    element: <EnterpriseDashboard />,
  },
  "dashboard-pro": {
    name: "Dashboard Pro",
    desc: "Analytics-focused business dashboard",
    colors: ["#10b981", "#06b6d4", "#3b82f6"],
    element: <DashboardPro />,
  },
  "crm-elite": {
    name: "CRM Elite",
    desc: "Customer relationship management with style",
    colors: ["#f472b6", "#ec4899", "#db2777"],
    element: <CRMelite />,
  },
  "hr-suite": {
    name: "HR Suite",
    desc: "Human resources management system",
    colors: ["#f59e0b", "#fbbf24", "#fcd34d"],
    element: <HRSuite />,
  },
  "inventory-pro": {
    name: "Inventory Pro",
    desc: "Stock & inventory management",
    colors: ["#22c55e", "#16a34a", "#15803d"],
    element: <InventoryPro />,
  },
  "project-flow": {
    name: "Project Flow",
    desc: "Project management & task tracking",
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9"],
    element: <ProjectFlow />,
  },
};

export default function BusinessPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "enterprise-dark";
  const theme = businessData[id] || businessData["enterprise-dark"];

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/services/business-apps" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" /> Back to Themes
        </Link>
        <div className="flex items-center gap-3">
          <Hexagon className="w-8 h-8 text-blue-400 fill-blue-400/20" />
          <span className="font-bold">KraftAI</span>
        </div>
      </nav>

      <div className="px-6 py-8 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-10 h-10 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">{theme.name}</h1>
        <p className="text-slate-400">{theme.desc}</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-8">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
          {theme.element}
        </div>
      </div>

      <div className="text-center pb-16">
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full font-semibold hover:scale-105 transition-transform">
          Get This Dashboard <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function EnterpriseDashboard() {
  return (
    <div className="min-h-[500px] bg-[#0a0a12] p-6">
      <div className="flex gap-6">
        <div className="w-16 space-y-3">
          {['◉', '📊', '👥', '⚙'].map((icon, i) => (
            <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-blue-500' : 'bg-slate-800'}`}>
              <span>{icon}</span>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Enterprise Dashboard</h2>
            <span className="text-slate-500 text-sm">Welcome, Admin</span>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Revenue', value: '$2.4M', icon: '$' },
              { label: 'Users', value: '12.5K', icon: '👥' },
              { label: 'Orders', value: '8.2K', icon: '📦' },
              { label: 'Growth', value: '+24%', icon: '📈' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-blue-500/20">
                <p className="text-slate-400 text-xs">{stat.label}</p>
                <p className="text-white text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 p-4 rounded-xl bg-slate-800/30 border border-slate-700">
              <p className="text-slate-400 text-sm mb-3">Revenue Overview</p>
              <div className="h-32 flex items-end gap-2">
                {[40, 60, 45, 70, 55, 80, 65, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
              <p className="text-slate-400 text-sm mb-3">Team</p>
              <div className="space-y-2">
                {['Alice', 'Bob', 'Charlie'].map(name => (
                  <div key={name} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/30" />
                    <span className="text-white text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPro() {
  return (
    <div className="min-h-[500px] bg-[#0a1520] p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-cyan-400">Analytics Pro</span>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">Day</span>
          <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded text-xs">Week</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Visitors', value: '45.2K', change: '+12%' },
          { label: 'Conversion', value: '3.2%', change: '+0.8%' },
          { label: 'Avg. Time', value: '4m 32s', change: '+12s' },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20">
            <p className="text-slate-400 text-xs">{stat.label}</p>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
            <p className="text-green-400 text-xs">{stat.change}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
        <p className="text-slate-400 text-sm mb-4">Traffic Sources</p>
        <div className="flex gap-4">
          <div className="flex-1">
            {['Direct', 'Social', 'Referral', 'Organic'].map((source, i) => (
              <div key={source} className="flex items-center gap-2 mb-2">
                <span className="text-white text-sm w-20">{source}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500" style={{ width: `${[60, 25, 10, 5][i]}%` }} />
                </div>
                <span className="text-slate-400 text-xs">{[60, 25, 10, 5][i]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CRMelite() {
  return (
    <div className="min-h-[500px] bg-[#120a15] p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-pink-400">CRM Elite</span>
        <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm">+ Add Lead</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {['New Leads', 'Qualified', 'Closed'].map((stage, i) => (
          <div key={stage} className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20">
            <p className="text-pink-400 text-xs mb-2">{stage}</p>
            <p className="text-white text-2xl font-bold">{[24, 18, 42][i]}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { name: 'Acme Corp', value: '$50K', stage: 'Qualified' },
          { name: 'TechStart', value: '$25K', stage: 'New' },
          { name: 'Global Inc', value: '$120K', stage: 'Closed' },
        ].map((lead, i) => (
          <div key={i} className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{lead.name}</p>
              <p className="text-pink-400 text-xs">{lead.stage}</p>
            </div>
            <span className="text-white">{lead.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HRSuite() {
  return (
    <div className="min-h-[500px] bg-[#120f0a] p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-amber-400">HR Suite</span>
        <span className="text-amber-400 text-sm">124 Employees</span>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Present', value: '118', icon: '✓' },
          { label: 'Absent', value: '4', icon: '✗' },
          { label: 'Leave', value: '2', icon: '○' },
          { label: 'Remote', value: '12', icon: '🏠' },
        ].map((stat, i) => (
          <div key={i} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className="text-white font-bold">{stat.value}</p>
            <p className="text-amber-400 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
        <p className="text-slate-400 text-sm mb-3">Recent Hires</p>
        {['John Doe', 'Jane Smith', 'Mike Johnson'].map(name => (
          <div key={name} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/30" />
              <span className="text-white">{name}</span>
            </div>
            <span className="text-slate-500 text-sm">Just now</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryPro() {
  return (
    <div className="min-h-[500px] bg-[#0a1209] p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-green-400">Inventory Pro</span>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">+ Add Item</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Items', value: '2,456' },
          { label: 'Low Stock', value: '12', alert: true },
          { label: 'Categories', value: '48' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl ${stat.alert ? 'bg-red-500/10 border border-red-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
            <p className="text-slate-400 text-xs">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.alert ? 'text-red-400' : 'text-white'}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { name: 'Product A', stock: 245, min: 50 },
          { name: 'Product B', stock: 12, min: 20 },
          { name: 'Product C', stock: 890, min: 100 },
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-slate-800/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white">{item.name}</span>
              <span className={item.stock < item.min ? 'text-red-400' : 'text-green-400'}>{item.stock} units</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${Math.min(100, (item.stock / item.min) * 20)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectFlow() {
  return (
    <div className="min-h-[500px] bg-[#0f0a18] p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-purple-400">Project Flow</span>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm">+ New Task</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {['To Do', 'In Progress', 'Done'].map((status, col) => (
          <div key={status} className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <p className="text-purple-400 text-sm font-medium mb-3">{status}</p>
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                  <p className="text-white text-sm">Task {col * 3 + i + 1}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 rounded-full bg-purple-500/30" />
                    <span className="text-slate-500 text-xs">User</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

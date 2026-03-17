import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Menu, Home, Search, User, Bell, Plus, Settings, BarChart3, Users, FileText, TrendingUp, TrendingDown, Clock, Calendar, MessageSquare, Mail, Sparkle, DollarSign, ShoppingCart, UserCheck, Package, Briefcase, Target, Zap, ArrowUpRight, ArrowDownRight, PieChart, Activity, Wallet, CreditCard, Building, Globe, Database, Shield, Cpu, Cloud, Code, File, Folder, Download, Upload, RefreshCw, Filter, MoreHorizontal, Truck } from "lucide-react";

function CheckCircle(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>; }
function AlertCircle(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>; }

const businessData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
  preview: {
    header: { title: string; subtitle: string };
    stats: { label: string; value: string; change: string; up?: boolean }[];
    chart: { label: string; value: number }[];
    items: { icon: string; title: string; subtitle: string }[];
    navItems: { icon: string; label: string; active?: boolean }[];
  };
}> = {
  "enterprise-dark": { 
    name: "Enterprise Dark", 
    desc: "Professional dark enterprise app", 
    colors: ["#3b82f6", "#6366f1", "#8b5cf6"], 
    features: ["Data-rich dashboards", "Team collaboration", "Role-based access"],
    preview: {
      header: { title: "ENTERPRISE", subtitle: "Dashboard" },
      stats: [
        { label: "Revenue", value: "$2.4M", change: "+12%", up: true },
        { label: "Users", value: "12.5K", change: "+8%", up: true },
        { label: "Orders", value: "8.2K", change: "-3%", up: false },
        { label: "Growth", value: "+24%", change: "+5%", up: true }
      ],
      chart: [
        { label: "Mon", value: 40 }, { label: "Tue", value: 65 }, { label: "Wed", value: 45 }, { label: "Thu", value: 70 }, { label: "Fri", value: 55 }, { label: "Sat", value: 80 }, { label: "Sun", value: 65 }
      ],
      items: [
        { icon: "users", title: "Team", subtitle: "24 online" },
        { icon: "mail", title: "Messages", subtitle: "5 new" },
        { icon: "alert", title: "Alerts", subtitle: "2 urgent" },
        { icon: "task", title: "Tasks", subtitle: "12 pending" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "chart", label: "Analytics" },
        { icon: "plus", label: "Add" },
        { icon: "bell", label: "Alerts" },
        { icon: "user", label: "Profile" }
      ]
    }
  },
  "dashboard-pro": { 
    name: "Dashboard Pro", 
    desc: "Analytics-focused dashboard", 
    colors: ["#10b981", "#06b6d4", "#3b82f6"], 
    features: ["Real-time analytics", "Custom widgets", "Export reports"],
    preview: {
      header: { title: "DASHBOARD", subtitle: "Pro" },
      stats: [
        { label: "Sales", value: "$45K", change: "+18%", up: true },
        { label: "Visitors", value: "23K", change: "+12%", up: true },
        { label: "Bounce", value: "32%", change: "-5%", up: true },
        { label: "Time", value: "4m", change: "+1m", up: false }
      ],
      chart: [
        { label: "1", value: 30 }, { label: "2", value: 50 }, { label: "3", value: 40 }, { label: "4", value: 70 }, { label: "5", value: 60 }, { label: "6", value: 85 }, { label: "7", value: 75 }
      ],
      items: [
        { icon: "activity", title: "Live", subtitle: "Real-time" },
        { icon: "target", title: "Goals", subtitle: "80% done" },
        { icon: "zap", title: "Performance", subtitle: "98%" },
        { icon: "trending", title: "Trends", subtitle: "Up" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Find" },
        { icon: "plus", label: "Add" },
        { icon: "chart", label: "Stats" },
        { icon: "user", label: "Me" }
      ]
    }
  },
  "crm-elite": { 
    name: "CRM Elite", 
    desc: "Customer relationship management", 
    colors: ["#f472b6", "#ec4899", "#db2777"], 
    features: ["Lead tracking", "Pipeline view", "Automations"],
    preview: {
      header: { title: "CRM", subtitle: "Elite" },
      stats: [
        { label: "Leads", value: "342", change: "+25%", up: true },
        { label: "Deals", value: "$1.2M", change: "+15%", up: true },
        { label: "Clients", value: "89", change: "+8%", up: true },
        { label: "Rate", value: "68%", change: "-2%", up: false }
      ],
      chart: [
        { label: "Lead", value: 80 }, { label: "Qual", value: 65 }, { label: "Prop", value: 50 }, { label: "Neg", value: 35 }, { label: "Close", value: 25 }
      ],
      items: [
        { icon: "user", title: "Leads", subtitle: "New" },
        { icon: "target", title: "Deals", subtitle: "In progress" },
        { icon: "check", title: "Won", subtitle: "This month" },
        { icon: "mail", title: "Follow-up", subtitle: "Pending" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Search" },
        { icon: "plus", label: "Add" },
        { icon: "chart", label: "Pipeline" },
        { icon: "user", label: "Profile" }
      ]
    }
  },
  "hr-suite": { 
    name: "HR Suite", 
    desc: "Human resources system", 
    colors: ["#f59e0b", "#fbbf24", "#fcd34d"], 
    features: ["Employee database", "Leave management", "Payroll"],
    preview: {
      header: { title: "HR", subtitle: "Suite" },
      stats: [
        { label: "Employees", value: "156", change: "+5", up: true },
        { label: "On Leave", value: "8", change: "Today", up: true },
        { label: "Hiring", value: "12", change: "Open", up: false },
        { label: "Attendance", value: "96%", change: "+2%", up: true }
      ],
      chart: [
        { label: "Mon", value: 95 }, { label: "Tue", value: 92 }, { label: "Wed", value: 96 }, { label: "Thu", value: 88 }, { label: "Fri", value: 90 }
      ],
      items: [
        { icon: "users", title: "Team", subtitle: "View all" },
        { icon: "calendar", title: "Leave", subtitle: "Requests" },
        { icon: "dollar", title: "Payroll", subtitle: "Pending" },
        { icon: "briefcase", title: "Jobs", subtitle: "3 new" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "users", label: "Team" },
        { icon: "plus", label: "Add" },
        { icon: "calendar", label: "Leave" },
        { icon: "user", label: "Me" }
      ]
    }
  },
  "inventory-pro": { 
    name: "Inventory Pro", 
    desc: "Stock & inventory management", 
    colors: ["#22c55e", "#16a34a", "#15803d"], 
    features: ["Stock tracking", "Low alerts", "Multi-warehouse"],
    preview: {
      header: { title: "INVENTORY", subtitle: "Pro" },
      stats: [
        { label: "Items", value: "2,456", change: "+120", up: true },
        { label: "Low Stock", value: "15", change: "Alert", up: false },
        { label: "Orders", value: "89", change: "Today", up: true },
        { label: "Value", value: "$45K", change: "+8%", up: true }
      ],
      chart: [
        { label: "W1", value: 45 }, { label: "W2", value: 55 }, { label: "W3", value: 40 }, { label: "W4", value: 60 }
      ],
      items: [
        { icon: "package", title: "Stock", subtitle: "Overview" },
        { icon: "alert", title: "Alerts", subtitle: "15 low" },
        { icon: "truck", title: "Orders", subtitle: "In transit" },
        { icon: "users", title: "Warehouse", subtitle: "3 locations" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "package", label: "Stock" },
        { icon: "plus", label: "Add" },
        { icon: "alert", label: "Alerts" },
        { icon: "user", label: "Me" }
      ]
    }
  },
  "project-flow": { 
    name: "Project Flow", 
    desc: "Project management", 
    colors: ["#8b5cf6", "#7c3aed", "#6d28d9"], 
    features: ["Kanban boards", "Gantt charts", "Time tracking"],
    preview: {
      header: { title: "PROJECTS", subtitle: "Flow" },
      stats: [
        { label: "Active", value: "8", change: "Projects", up: true },
        { label: "Tasks", value: "42", change: "Pending", up: false },
        { label: "Done", value: "156", change: "Completed", up: true },
        { label: "Hours", value: "320", change: "Tracked", up: true }
      ],
      chart: [
        { label: "Mon", value: 8 }, { label: "Tue", value: 6 }, { label: "Wed", value: 10 }, { label: "Thu", value: 7 }, { label: "Fri", value: 9 }
      ],
      items: [
        { icon: "check", title: "Done", subtitle: "12" },
        { icon: "clock", title: "In Progress", subtitle: "5" },
        { icon: "target", title: "Review", subtitle: "3" },
        { icon: "users", title: "Team", subtitle: "8" }
      ],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "search", label: "Projects" },
        { icon: "plus", label: "Add" },
        { icon: "chart", label: "Timeline" },
        { icon: "user", label: "Me" }
      ]
    }
  },
};

function BizIcon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const props = { className: className || "w-4 h-4" };
  const style = color ? { color } : {};
  
  switch (name) {
    case "home": return <Home {...props} style={style} />;
    case "search": return <Search {...props} style={style} />;
    case "plus": return <Plus {...props} style={style} />;
    case "bell": return <Bell {...props} style={style} />;
    case "user": return <User {...props} style={style} />;
    case "chart": return <BarChart3 {...props} style={style} />;
    case "users": return <Users {...props} style={style} />;
    case "mail": return <Mail {...props} style={style} />;
    case "alert": return <AlertCircle {...props} style={style} />;
    case "task": return <CheckCircle {...props} style={style} />;
    case "activity": return <Activity {...props} style={style} />;
    case "target": return <Target {...props} style={style} />;
    case "zap": return <Zap {...props} style={style} />;
    case "trending": return <TrendingUp {...props} style={style} />;
    case "check": return <CheckCircle {...props} style={style} />;
    case "dollar": return <DollarSign {...props} style={style} />;
    case "calendar": return <Calendar {...props} style={style} />;
    case "briefcase": return <Briefcase {...props} style={style} />;
    case "package": return <Package {...props} style={style} />;
    case "truck": return <Truck {...props} style={style} />;
    case "clock": return <Clock {...props} style={style} />;
    default: return <Home {...props} style={style} />;
  }
}

export default function BusinessPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "enterprise-dark";
  const theme = businessData[id] || businessData["enterprise-dark"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)' }} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <Link href="/services/business-apps" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-blue-400 fill-blue-400/20" />
          <span className="font-bold text-sm">KraftAI</span>
        </div>
      </nav>

      <div className="relative z-10 px-4 py-6 text-center">
        <div className="flex justify-center gap-2 mb-3">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{theme.name}</h1>
        <p className="text-slate-400 text-sm">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">{feature}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-[300px] mx-auto">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-[2.5rem] blur-xl" />
            <div className="relative bg-black rounded-[2rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center px-3 py-2 bg-black/50 text-[10px] text-slate-400">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2.5 rounded-sm bg-white/20" />
                  <div className="w-0.5 h-2.5 bg-white/60" />
                  <div className="w-0.5 h-2.5 bg-white/60" />
                </div>
              </div>

              <div className="p-3 bg-gradient-to-b from-slate-900 to-[#0a0a12]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: theme.colors[0] }}>{theme.preview.header.title}</span>
                    <span className="text-[10px] text-slate-500">{theme.preview.header.subtitle}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <Bell className="w-4 h-4 text-slate-500" />
                    <Menu className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {theme.preview.stats.slice(0, 4).map((stat, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-[8px] text-slate-400">{stat.label}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold">{stat.value}</p>
                        <span className="text-[8px]" style={{ color: stat.up ? theme.colors[0] : '#ef4444' }}>{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 rounded-lg bg-white/5 border border-white/10 mb-3">
                  <p className="text-[10px] text-slate-400 mb-2">Activity</p>
                  <div className="flex items-end gap-1 h-12">
                    {theme.preview.chart.map((bar, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{ height: `${bar.value}%`, background: `linear-gradient(to top, ${theme.colors[0]}, ${theme.colors[1]})` }} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {theme.preview.items.slice(0, 4).map((item, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                      <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                        <BizIcon name={item.icon} className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] text-white font-medium">{item.title}</p>
                        <p className="text-[7px] text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-around py-2 bg-black/90 border-t border-white/10">
                {theme.preview.navItems.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    {item.icon === "plus" ? (
                      <div className="w-8 h-8 rounded-full -mt-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                        <Plus className="w-3.5 h-3.5 text-black" />
                      </div>
                    ) : (
                      <BizIcon name={item.icon} className="w-4 h-4" color={item.active ? theme.colors[0] : '#64748b'} />
                    )}
                    <span className="text-[7px]" style={{ color: item.active ? theme.colors[0] : '#64748b' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-12 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Get This Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

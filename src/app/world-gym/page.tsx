import Link from "next/link";
import { Users, DollarSign, UserCheck, Clock, ArrowRight, Plus, MessageCircle, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function WorldGymDashboard() {
  const pendingFees = [
    { name: "Rajesh Kumar", amount: 500, days: 5, phone: "9876543210" },
    { name: "Suresh Patel", amount: 500, days: 12, phone: "9876543211" },
    { name: "Amit Singh", amount: 800, days: 3, phone: "9876543212" },
  ];

  const recentMembers = [
    { name: "Rahul Sharma", date: "15 Mar", phone: "9876543210" },
    { name: "Vikram Yadav", date: "14 Mar", phone: "9876543211" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Users, label: "Total Members", value: "24", color: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10" },
          { icon: UserCheck, label: "Active", value: "18", color: "from-green-500 to-emerald-500", bg: "bg-green-500/10" },
          { icon: DollarSign, label: "This Month", value: "₹12,000", color: "from-orange-500 to-amber-500", bg: "bg-orange-500/10" },
          { icon: Clock, label: "Pending", value: "6", color: "from-red-500 to-pink-500", bg: "bg-red-500/10" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              Pending Fees
            </h3>
            <Link href="/world-gym/fees" className="text-sm text-orange-400 hover:text-orange-300">View All</Link>
          </div>
          
          <div className="space-y-3">
            {pendingFees.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-xs text-red-400">{member.days} days overdue</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">₹{member.amount}</p>
                  <a 
                    href={`https://wa.me/91${member.phone}?text=Hello ${member.name}, This is a reminder that your gym fee of ₹${member.amount} is pending. Please pay soon.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-400 hover:underline flex items-center gap-1 justify-end"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Remind
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Recent Members
            </h3>
            <Link href="/world-gym/members" className="text-sm text-orange-400 hover:text-orange-300">View All</Link>
          </div>
          
          <div className="space-y-3">
            {recentMembers.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.date}</p>
                  </div>
                </div>
                <a 
                  href={`https://wa.me/91${member.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                </a>
              </div>
            ))}
          </div>
          
          <Link 
            href="/world-gym/members/add"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Member
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link href="/world-gym/members" className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white mt-4">All Members</h3>
          <p className="text-sm text-slate-400">View & manage all members</p>
        </Link>

        <Link href="/world-gym/fees" className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white mt-4">Fee Collection</h3>
          <p className="text-sm text-slate-400">Track & collect fees</p>
        </Link>

        <Link href="/world-gym/fees?filter=pending" className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white mt-4">Pending Payments</h3>
          <p className="text-sm text-slate-400">Follow up on dues</p>
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Users, DollarSign, UserCheck, Clock, ArrowRight, Plus, MessageCircle, TrendingUp, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

async function getDashboardData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const membersRes = await fetch(`${baseUrl}/world-gym/api/members`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    const feesRes = await fetch(`${baseUrl}/world-gym/api/fees`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    const membersData = await membersRes.json();
    const feesData = await feesRes.json();
    
    const members = membersData.members || [];
    const fees = feesData.fees || [];
    
    const activeMembers = members.filter((m: any) => m.status === 'active');
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthName = monthNames[currentMonth];
    
    const thisMonthFees = fees.filter((f: any) => {
      const feeMonth = f.month === currentMonthName || f.month === String(currentMonth + 1);
      const feeYear = f.year === currentYear;
      return feeYear;
    });
    
    const collected = thisMonthFees.filter((f: any) => f.status === 'paid');
    const pending = thisMonthFees.filter((f: any) => f.status === 'pending');
    
    const pendingFees = members.filter((m: any) => {
      const hasPending = fees.some((f: any) => 
        f.member_id === m.id && f.status === 'pending'
      );
      return hasPending;
    }).slice(0, 3);
    
    const recentMembers = members.slice(0, 3);
    
    return {
      totalMembers: members.length,
      activeMembers: activeMembers.length,
      collected: collected.reduce((sum: number, f: any) => sum + (f.amount || 0), 0),
      pending: pending.length,
      pendingFees,
      recentMembers,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      totalMembers: 0,
      activeMembers: 0,
      collected: 0,
      pending: 0,
      pendingFees: [],
      recentMembers: [],
    };
  }
}

export default async function WorldGymDashboard() {
  const data = await getDashboardData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">World Gym Management</p>
        </div>
        <Link 
          href="/world-gym"
          className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.totalMembers}</p>
          <p className="text-xs text-slate-400">Total Members</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
            <UserCheck className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.activeMembers}</p>
          <p className="text-xs text-slate-400">Active Members</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white">₹{data.collected}</p>
          <p className="text-xs text-slate-400">Collected</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-white">{data.pending}</p>
          <p className="text-xs text-slate-400">Pending Fees</p>
        </div>
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
          
          {data.pendingFees.length > 0 ? (
            <div className="space-y-3">
              {data.pendingFees.map((member: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-xs text-red-400">Fee pending</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">₹{member.fee}</p>
                    <a 
                      href={`https://wa.me/91${member.phone}?text=Hello ${member.name}, This is a reminder that your gym fee of ₹${member.fee} is pending. Please pay soon.`}
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
          ) : (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-400" />
              <p>All fees paid!</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Recent Members
            </h3>
            <Link href="/world-gym/members" className="text-sm text-orange-400 hover:text-orange-300">View All</Link>
          </div>
          
          {data.recentMembers.length > 0 ? (
            <div className="space-y-3">
              {data.recentMembers.map((member: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                      {member.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.phone}</p>
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
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-2" />
              <p>No members yet</p>
            </div>
          )}
          
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

        <Link href="/world-gym/fees" className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
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

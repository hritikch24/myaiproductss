'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { UsersIcon as UsersIconIcon, DollarSign, UserCheck, Clock, Plus, MessageCircle, TrendingUp, AlertCircle, CheckCircle, ArrowRight, UserPlus, Receipt, Loader2 } from "lucide-react";

export default function WorldGymDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    totalMembers: 0,
    activeMembers: 0,
    collected: 0,
    pending: 0,
    expected: 0,
    pendingMembers: [],
    recentMembers: [],
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('gym_logged_in');
    if (!isLoggedIn) {
      router.push('/world-gym/login');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [membersRes, feesRes] = await Promise.all([
        fetch('/world-gym/api/members'),
        fetch('/world-gym/api/fees')
      ]);
      const membersData = await membersRes.json();
      const feesData = await feesRes.json();
      
      const members = membersData.members || [];
      const fees = feesData.fees || [];
      
      const activeMembers = members.filter((m: any) => m.status === 'active');
      
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      const thisMonthFees = fees.filter((f: any) => parseInt(f.month) === currentMonth && f.year === currentYear);
      
      const collected = thisMonthFees.filter((f: any) => f.status === 'paid');
      const pending = thisMonthFees.filter((f: any) => f.status === 'pending');
      
      const totalExpected = members.reduce((sum: number, m: any) => sum + (m.fee || 500), 0);
      const totalCollected = collected.reduce((sum: number, f: any) => sum + (f.amount || 0), 0);
      
      const pendingMembers = members.filter((m: any) => {
        const hasPending = fees.some((f: any) => f.member_id === m.id && f.status === 'pending');
        return hasPending;
      }).slice(0, 5);
      
      const recentMembers = [...members]
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
      
      setData({
        totalMembers: members.length,
        activeMembers: activeMembers.length,
        collected: totalCollected,
        pending: pending.length,
        expected: totalExpected,
        pendingMembers,
        recentMembers,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back! 👋</h1>
        <p className="text-slate-400 mt-1">Here's your gym overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-xs font-medium">Total</span>
          </div>
          <p className="text-3xl font-bold text-white">{data.totalMembers}</p>
          <p className="text-slate-400 text-sm">Members</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/30 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-xs font-medium">Active</span>
          </div>
          <p className="text-3xl font-bold text-white">{data.activeMembers}</p>
          <p className="text-slate-400 text-sm">Active Members</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/30 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-orange-400 text-xs font-medium">This Month</span>
          </div>
          <p className="text-3xl font-bold text-white">₹{data.collected}</p>
          <p className="text-slate-400 text-sm">Collected</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-red-400 text-xs font-medium">Pending</span>
          </div>
          <p className="text-3xl font-bold text-white">{data.pending}</p>
          <p className="text-slate-400 text-sm">Pending Fees</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Pending Payments
            </h3>
            <Link href="/world-gym/fees" className="text-sm text-orange-400 hover:text-orange-300">View All →</Link>
          </div>
          
          {data.pendingMembers.length > 0 ? (
            <div className="space-y-3">
              {data.pendingMembers.map((member: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      {member.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="text-sm text-slate-400">{member.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">₹{member.fee || 500}</p>
                    <a 
                      href={`https://wa.me/91${member.phone}?text=Hello ${member.name}, This is a reminder that your gym fee of ₹${member.fee || 500} is pending. Please pay soon. Thanks!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-green-400 hover:underline"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Remind
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-3 text-green-400" />
              <p className="text-white font-medium">All fees collected! 🎉</p>
              <p className="text-slate-400 text-sm">No pending payments</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-green-400" />
              New Members
            </h3>
            <Link href="/world-gym/members" className="text-sm text-orange-400 hover:text-orange-300">View All →</Link>
          </div>
          
          {data.recentMembers.length > 0 ? (
            <div className="space-y-3">
              {data.recentMembers.map((member: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {member.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.village || 'New member'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {member.join_date ? new Date(member.join_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Recently'}
                    </span>
                    <a 
                      href={`https://wa.me/91${member.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-green-400" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UsersIcon className="w-16 h-16 mx-auto mb-3 text-slate-600" />
              <p className="text-white font-medium">No members yet</p>
              <p className="text-slate-400 text-sm">Add your first member</p>
            </div>
          )}
          
          <Link 
            href="/world-gym/members/add"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            Add New Member
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/world-gym/members" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UsersIcon className="w-7 h-7 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white">All Members</h3>
          <p className="text-sm text-slate-400">Manage your members</p>
        </Link>

        <Link href="/world-gym/fees" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Receipt className="w-7 h-7 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white">Collect Fees</h3>
          <p className="text-sm text-slate-400">Track payments</p>
        </Link>

        <Link href="/world-gym/members/add" className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white">New Member</h3>
          <p className="text-sm text-slate-400">Add a member</p>
        </Link>

        <a 
          href="https://wa.me/918859820935?text=Hi, I need help with my gym management"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-white">Get Support</h3>
          <p className="text-sm text-slate-400">Chat with us</p>
        </a>
      </div>
    </div>
  );
}

function UsersIcon(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}

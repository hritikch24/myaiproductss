'use client';

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, DollarSign, Search, MessageCircle, CheckCircle, XCircle, TrendingUp, Download, Loader2, RefreshCw } from "lucide-react";

export default function FeesPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl = window.location.origin;
      const [feesRes, membersRes] = await Promise.all([
        fetch('/world-gym/api/fees'),
        fetch('/world-gym/api/members')
      ]);
      const feesData = await feesRes.json();
      const membersData = await membersRes.json();
      setFees(feesData.fees || []);
      setMembers(membersData.members || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const thisMonthFees = fees.filter((f: any) => {
    const feeMonth = parseInt(f.month) === currentMonth;
    const feeYear = f.year === currentYear;
    return feeYear;
  });
  
  const pendingFees = thisMonthFees.filter((f: any) => f.status === "pending");
  const paidFees = thisMonthFees.filter((f: any) => f.status === "paid");
  const totalPending = pendingFees.reduce((sum, f: any) => sum + (f.amount || 0), 0);
  const totalCollected = paidFees.reduce((sum, f: any) => sum + (f.amount || 0), 0);

  const filteredFees = fees.filter((f: any) => {
    const member = members.find((m: any) => m.id === f.member_id);
    const name = member?.name || '';
    const phone = member?.phone || '';
    return name.toLowerCase().includes(search.toLowerCase()) || 
           phone.includes(search);
  });

  const getMemberName = (memberId: number) => {
    const member = members.find((m: any) => m.id === memberId);
    return member?.name || 'Unknown';
  };

  const getMemberPhone = (memberId: number) => {
    const member = members.find((m: any) => m.id === memberId);
    return member?.phone || '';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/world-gym" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Fee Management</h1>
            <p className="text-sm text-slate-400">Track and manage member fees</p>
          </div>
        </div>
        
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹{totalPending}</p>
              <p className="text-sm text-slate-400">Pending ({pendingFees.length})</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹{totalCollected}</p>
              <p className="text-sm text-slate-400">Collected ({paidFees.length})</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹{totalCollected + totalPending}</p>
              <p className="text-sm text-slate-400">Total Expected</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : filteredFees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Member</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Month</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredFees.map((fee: any, idx: number) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{getMemberName(fee.member_id)}</p>
                        <p className="text-sm text-slate-400">{getMemberPhone(fee.member_id)}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-white">₹{fee.amount}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        fee.status === 'paid' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {fee.status === 'paid' ? (
                          <><CheckCircle className="w-3 h-3" /> Paid</>
                        ) : (
                          <><XCircle className="w-3 h-3" /> Pending</>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">{fee.month}/{fee.year}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {fee.status === 'pending' ? (
                          <>
                            <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-white text-xs font-medium transition-colors">
                              Mark Paid
                            </button>
                            <a 
                              href={`https://wa.me/91${getMemberPhone(fee.member_id)}?text=Hello ${getMemberName(fee.member_id)}, This is a reminder that your gym fee of ₹${fee.amount} is due. Please pay soon.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                              title="Send Reminder"
                            >
                              <MessageCircle className="w-4 h-4 text-green-400" />
                            </a>
                          </>
                        ) : (
                          <a 
                            href={`https://wa.me/91${getMemberPhone(fee.member_id)}?text=Hello ${getMemberName(fee.member_id)}, Thank you for paying your gym fee of ₹${fee.amount}. Receipt: #${fee.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                            title="Send Receipt"
                          >
                            <MessageCircle className="w-4 h-4 text-blue-400" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No fee records found</p>
          </div>
        )}
      </div>
    </div>
  );
}

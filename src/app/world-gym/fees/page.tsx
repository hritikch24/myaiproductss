'use client';

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, DollarSign, Search, MessageCircle, CheckCircle, XCircle, TrendingUp, Loader2, RefreshCw, Clock } from "lucide-react";

export default function FeesPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/world-gym/api/members');
      const data = await res.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const isFeePending = (member: any) => {
    if (!member.last_fee_paid) return true;
    const lastPaid = new Date(member.last_fee_paid);
    const current = new Date(selectedYear, selectedMonth - 1);
    return lastPaid < current;
  };

  const getLastPaidText = (member: any) => {
    if (!member.last_fee_paid) return "Never";
    const lastPaid = new Date(member.last_fee_paid);
    return lastPaid.toLocaleDateString('en-IN');
  };

  const pendingMembers = members.filter(m => m.status === 'active' && isFeePending(m));
  const paidMembers = members.filter(m => m.status === 'active' && !isFeePending(m));
  const totalPending = pendingMembers.reduce((sum, m) => sum + (m.fee || 500), 0);
  const totalCollected = paidMembers.reduce((sum, m) => sum + (m.fee || 500), 0);

  const filteredMembers = members.filter((m: any) => {
    const name = m.name?.toLowerCase() || '';
    const phone = m.phone || '';
    return name.toLowerCase().includes(search.toLowerCase()) || phone.includes(search);
  });

  const handleMarkPaid = async (member: any) => {
    try {
      const res = await fetch('/world-gym/api/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'payFee',
          id: member.id,
          lastFeePaid: new Date().toISOString().split('T')[0]
        })
      });
      
      if (res.ok) {
        setMembers(members.map(m => 
          m.id === member.id 
            ? { ...m, last_fee_paid: new Date().toISOString().split('T')[0] }
            : m
        ));
      }
    } catch (error) {
      console.error("Error marking fee as paid:", error);
    }
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
        
        <div className="flex items-center gap-2">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹{totalPending}</p>
              <p className="text-sm text-slate-400">Pending ({pendingMembers.length})</p>
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
              <p className="text-sm text-slate-400">Paid ({paidMembers.length})</p>
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
        ) : filteredMembers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Member</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Fee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Last Paid</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">{monthNames[selectedMonth -1]} Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.filter((m: any) => m.status === 'active').map((member: any) => {
                  const pending = isFeePending(member);
                  return (
                    <tr key={member.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-white">{member.name}</p>
                          <p className="text-sm text-slate-400">{member.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-white">₹{member.fee || 500}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <p className="text-sm text-white">{getLastPaidText(member)}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          pending 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {pending ? (
                            <><XCircle className="w-3 h-3" /> Pending</>
                          ) : (
                            <><CheckCircle className="w-3 h-3" /> Paid</>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {pending ? (
                            <>
                              <button 
                                onClick={() => handleMarkPaid(member)}
                                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-white text-xs font-medium transition-colors"
                              >
                                Mark Paid
                              </button>
                              <a 
                                href={`https://wa.me/91${member.phone}?text=Hello ${member.name}, This is a reminder that your gym fee of ₹${member.fee || 500} for ${monthNames[selectedMonth - 1]} is due. Please pay soon.`}
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
                              href={`https://wa.me/91${member.phone}?text=Hello ${member.name}, Thank you for paying your gym fee of ₹${member.fee || 500} for ${monthNames[selectedMonth - 1]}.`}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, MessageCircle, Phone, ArrowLeft, Loader2, RefreshCw, Plus, Pencil, Clock } from "lucide-react";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/world-gym/api/members');
      const data = await res.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((member: any) => {
    const matchesSearch = member.name?.toLowerCase().includes(search.toLowerCase()) || 
                         member.phone?.includes(search);
    const matchesStatus = !statusFilter || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/world-gym" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Members</h1>
            <p className="text-sm text-slate-400">Total: {members.length} members</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchMembers}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link 
            href="/world-gym/members/add"
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </Link>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or phone..."
                className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase hidden md:table-cell">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Fee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Last Paid</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Joined</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.map((member: any) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                          {member.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-medium text-white">{member.name}</p>
                          <p className="text-sm text-slate-400">{member.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-white">{member.village || '-'}, {member.district || '-'}</p>
                      <p className="text-xs text-slate-500">{member.state || 'Bihar'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">₹{member.fee || 500}</p>
                      <p className="text-xs text-slate-500">/month</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        member.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {member.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">
                        {member.last_fee_paid ? new Date(member.last_fee_paid).toLocaleDateString('en-IN') : 'Never'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">
                        {member.join_date ? new Date(member.join_date).toLocaleDateString('en-IN') : '-'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/world-gym/members/${member.id}`}
                          className="p-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 text-orange-400" />
                        </Link>
                        <a 
                          href={`https://wa.me/91${member.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 text-green-400" />
                        </a>
                        <a 
                          href={`tel:+91${member.phone}`}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                          title="Call"
                        >
                          <Phone className="w-4 h-4 text-blue-400" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">No members found</p>
            <Link 
              href="/world-gym/members/add"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add First Member
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

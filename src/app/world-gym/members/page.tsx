import Link from "next/link";
import { Search, Filter, MoreVertical, MessageCircle, Phone, Edit, Trash2, ArrowLeft, RefreshCw } from "lucide-react";

async function getMembers() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/world-gym/api/members`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    const data = await res.json();
    return data.members || [];
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
}

export default async function MembersPage() {
  const members = await getMembers();

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
        
        <Link 
          href="/world-gym/members/add"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm font-medium transition-colors"
        >
          + Add Member
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by name or phone..."
                className="w-full pl-10 pr-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
            <select className="px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {members.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Member</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase hidden md:table-cell">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Fee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Joined</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member: any) => (
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
                        {member.join_date ? new Date(member.join_date).toLocaleDateString('en-IN') : '-'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
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

function Plus(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

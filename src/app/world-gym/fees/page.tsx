import Link from "next/link";
import { ArrowLeft, DollarSign, Search, Filter, MessageCircle, CheckCircle, XCircle, Calendar, TrendingUp, Download } from "lucide-react";

const feeRecords = [
  { id: 1, name: "Rajesh Kumar", phone: "9876543210", amount: 500, status: "pending", dueDate: "10 Mar 2026", lastPaid: "10 Feb 2026" },
  { id: 2, name: "Suresh Patel", phone: "9876543211", amount: 500, status: "pending", dueDate: "8 Mar 2026", lastPaid: "8 Feb 2026" },
  { id: 3, name: "Amit Singh", phone: "9876543212", amount: 800, status: "paid", dueDate: "20 Mar 2026", lastPaid: "20 Feb 2026" },
  { id: 4, name: "Vikram Yadav", phone: "9876543213", amount: 500, status: "paid", dueDate: "15 Mar 2026", lastPaid: "15 Feb 2026" },
  { id: 5, name: "Deepak Sharma", phone: "9876543214", amount: 600, status: "paid", dueDate: "5 Mar 2026", lastPaid: "5 Feb 2026" },
  { id: 6, name: "Ravi Kumar", phone: "9876543215", amount: 500, status: "pending", dueDate: "12 Mar 2026", lastPaid: "12 Jan 2026" },
];

export default function FeesPage() {
  const pendingFees = feeRecords.filter(f => f.status === "pending");
  const paidFees = feeRecords.filter(f => f.status === "paid");
  const totalPending = pendingFees.reduce((sum, f) => sum + f.amount, 0);
  const totalCollected = paidFees.reduce((sum, f) => sum + f.amount, 0);

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
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
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
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
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

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5">
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
              <option value="">All Members</option>
              <option value="pending">Pending Only</option>
              <option value="paid">Paid Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Member</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Last Paid</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {feeRecords.map((record) => (
                <tr key={record.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{record.name}</p>
                      <p className="text-sm text-slate-400">{record.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-white">₹{record.amount}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      record.status === 'paid' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {record.status === 'paid' ? (
                        <><CheckCircle className="w-3 h-3" /> Paid</>
                      ) : (
                        <><XCircle className="w-3 h-3" /> Pending</>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-white">{record.dueDate}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-400">{record.lastPaid}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {record.status === 'pending' ? (
                        <>
                          <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-white text-xs font-medium transition-colors">
                            Mark Paid
                          </button>
                          <a 
                            href={`https://wa.me/91${record.phone}?text=Hello ${record.name}, This is a reminder that your gym fee of ₹${record.amount} is due. Please pay soon.`}
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
                          href={`https://wa.me/91${record.phone}?text=Hello ${record.name}, Thank you for paying your gym fee of ₹${record.amount}. Receipt: #${record.id}`}
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
      </div>
    </div>
  );
}

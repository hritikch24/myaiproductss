'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, MessageCircle, User, Phone, MapPin, Calendar, DollarSign, Hash, CheckCircle, Loader2 } from 'lucide-react';

const indianStates = [
  "Bihar", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Maharashtra",
  "West Bengal", "Jharkhand", "Odisha", "Chhattisgarh", "Uttarakhand",
  "Haryana", "Punjab", "Gujarat", "Tamil Nadu", "Karnataka", "Other"
];

export default function AddMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    alternatePhone: '',
    village: '',
    tehsil: '',
    district: '',
    state: 'Bihar',
    pincode: '',
    fee: '500',
    joinDate: new Date().toISOString().split('T')[0],
    reference: '',
    aadhar: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/world-gym/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add member');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/world-gym/members');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/world-gym/members" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Member</h1>
          <p className="text-sm text-slate-400">Register a new gym member</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <p className="text-green-400 font-medium">Member added successfully! Redirecting...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        )}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-400" />
            Personal Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Full Name *</label>
              <input 
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter full name"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1">Phone Number *</label>
              <input 
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="9876543210"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Alternate Phone</label>
              <input 
                type="tel"
                value={formData.alternatePhone}
                onChange={(e) => setFormData({...formData, alternatePhone: e.target.value})}
                placeholder="9876543210"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Aadhar Number</label>
              <input 
                type="text"
                value={formData.aadhar}
                onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
                placeholder="XXXX XXXX XXXX"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-400" />
            Address (Village Details)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Village Name *</label>
              <input 
                type="text"
                required
                value={formData.village}
                onChange={(e) => setFormData({...formData, village: e.target.value})}
                placeholder="e.g., Bhawarpur"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Tehsil *</label>
              <input 
                type="text"
                required
                value={formData.tehsil}
                onChange={(e) => setFormData({...formData, tehsil: e.target.value})}
                placeholder="e.g., Madhubani"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">District *</label>
              <input 
                type="text"
                required
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                placeholder="e.g., Madhubani"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">State *</label>
              <select 
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500"
              >
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Pincode</label>
              <input 
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                placeholder="e.g., 847211"
                maxLength={6}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            Membership Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Monthly Fee (₹) *</label>
              <select 
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500"
              >
                <option value="300">₹300 - Basic</option>
                <option value="400">₹400 - Standard</option>
                <option value="500">₹500 - Premium</option>
                <option value="600">₹600 - VIP</option>
                <option value="800">₹800 - Annual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Join Date *</label>
              <input 
                type="date"
                required
                value={formData.joinDate}
                onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-slate-400 mb-1">Reference (Optional)</label>
              <input 
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                placeholder="Who referred this member?"
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={loading || success}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Member
              </>
            )}
          </button>
          
          {formData.phone && (
            <a 
              href={`https://wa.me/91${formData.phone}?text=Hello ${formData.name}, Welcome to World Gym! Your membership has been registered.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Send Welcome
            </a>
          )}
        </div>
      </form>
    </div>
  );
}

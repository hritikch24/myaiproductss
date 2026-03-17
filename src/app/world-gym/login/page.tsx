'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dumbbell, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  useEffect(() => {
    const savedPin = localStorage.getItem('gym_owner_pin');
    if (!savedPin) {
      localStorage.setItem('gym_owner_pin', '1234');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError('Enter 4-digit PIN');
      return;
    }

    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    const savedPin = localStorage.getItem('gym_owner_pin');
    if (pin === savedPin || pin === '1234') {
      localStorage.setItem('gym_logged_in', 'true');
      router.push('/world-gym');
    } else {
      setError('Incorrect PIN');
    }

    setLoading(false);
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPin(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">World Gym</h1>
            <p className="text-slate-400 text-sm mt-1">Owner Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Enter PIN</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={handlePinChange}
                  placeholder="****"
                  className="w-full pl-12 pr-12 py-4 bg-black/30 border border-white/10 rounded-xl text-white text-center text-2xl font-bold tracking-[0.5em] placeholder:text-slate-600 focus:outline-none focus:border-orange-500"
                  inputMode="numeric"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || pin.length < 4}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-xs mt-6">
            Default PIN: 1234
          </p>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          © World Gym Management
        </p>
      </div>
    </div>
  );
}

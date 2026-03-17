'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('gym_logged_in');
    
    if (!isLoggedIn && pathname !== '/world-gym/login') {
      router.push('/world-gym/login');
    } else if (isLoggedIn && pathname === '/world-gym/login') {
      router.push('/world-gym');
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

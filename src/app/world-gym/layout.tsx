import Link from "next/link";
import { Dumbbell, Plus, MessageCircle } from "lucide-react";
import { ReactNode } from "react";

export const metadata = {
  title: "World Gym - Member Management",
  description: "World Gym Member Management App",
};

export default function WorldGymLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <link rel="manifest" href="/world-gym-manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="WorldGym" />
      </head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/world-gym" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-white text-lg">World Gym</span>
                  <p className="text-[10px] text-orange-400">Management</p>
                </div>
              </Link>
              
              <div className="flex items-center gap-2">
                <Link 
                  href="/world-gym/members/add"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Member
                </Link>
                <a 
                  href="https://wa.me/918859820935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        {children}
      </div>
    </>
  );
}
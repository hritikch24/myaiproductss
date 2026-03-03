import { auth, signOut } from "@/lib/auth";
import { Scale, LogOut, FileText, LayoutDashboard, Home } from "lucide-react";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/[0.04]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-8">
          <Link href="/legal-docs/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Legal<span className="text-orange-400">Docs</span>
              <span className="ml-1.5 text-[10px] font-normal text-slate-500 hidden sm:inline align-super">by KraftAI</span>
            </span>
          </Link>

          {session?.user && (
            <div className="hidden sm:flex items-center gap-0.5">
              <Link
                href="/legal-docs/dashboard"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-slate-400 transition-all hover:bg-white/[0.04] hover:text-white"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
              <Link
                href="/legal-docs/dashboard/documents"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-slate-400 transition-all hover:bg-white/[0.04] hover:text-white"
              >
                <FileText className="h-3.5 w-3.5" />
                My Documents
              </Link>
            </div>
          )}
        </div>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] text-slate-400 transition-all hover:bg-white/[0.04] hover:text-white"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="h-7 w-7 rounded-full ring-1 ring-white/10"
                referrerPolicy="no-referrer"
              />
            )}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] text-slate-500 transition-all hover:bg-white/[0.04] hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/legal-docs/login"
            className="btn-gradient rounded-lg px-4 py-2 text-sm font-medium text-white"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
}

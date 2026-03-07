import { auth, signOut } from "@/lib/auth";
import { Scale, LogOut, FileText, LayoutDashboard, Home, BookOpen } from "lucide-react";
import Link from "next/link";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link href="/legal-docs/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Legal<span className="text-orange-500">Docs</span>
              <span className="ml-1.5 text-[10px] font-normal text-slate-400 hidden sm:inline align-super">by KraftAI</span>
            </span>
          </Link>

          <Link
            href="/padhai"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors font-medium z-50 relative cursor-pointer"
            style={{ position: 'relative', zIndex: 50 }}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Padhai
          </Link>

          {session?.user && (
            <div className="hidden sm:flex items-center gap-0.5">
              <Link
                href="/legal-docs/dashboard"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
              <Link
                href="/legal-docs/dashboard/documents"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900"
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
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="h-7 w-7 rounded-full ring-2 ring-slate-100"
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
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/legal-docs/login"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 transition-colors"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
}

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookOpen, Mail, Lock, ArrowRight, User } from "lucide-react";

export default function PadhaiLoginPage() {
  async function handleGoogleLogin() {
    "use server";
    await signIn("google", { callbackUrl: "/padhai/onboarding" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#030712] to-[#030712]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            Pad<span className="text-emerald-500">hai</span>
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-xl font-semibold text-white mb-2">
            Welcome back
          </h1>
          <p className="mb-6 text-sm text-slate-400">
            Sign in to continue your study journey
          </p>

          {/* Google Button */}
          <form action={handleGoogleLogin}>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-700 hover:border-slate-600 hover:shadow-lg hover:shadow-emerald-500/5 active:scale-[0.98]"
            >
              <svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="transition-colors group-hover:text-white">
                Continue with Google
              </span>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Don&apos;t have an account?{" "}
              <a href="/padhai/onboarding" className="text-emerald-400 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

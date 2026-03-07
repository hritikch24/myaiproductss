"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { BookOpen, Mail, Lock, ArrowRight, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function PadhaiLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  function validateForm() {
    const errors: { email?: string; password?: string; name?: string } = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!password) {
      errors.password = "Password is required";
    } else if (isSignUp && password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (isSignUp && !name.trim()) {
      errors.name = "Name is required";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await fetch("/api/padhai/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Registration failed");
          setLoading(false);
          return;
        }
        // Auto sign in after registration
        const signInRes = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/padhai/onboarding",
          redirect: false,
        });
        if (signInRes?.error) {
          setError("Account created! Please sign in.");
          setIsSignUp(false);
        }
      } else {
        const res = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/padhai/onboarding",
          redirect: false,
        });
        if (res?.error) {
          setError("Invalid email or password");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    await signIn("google", { callbackUrl: "/padhai/onboarding" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#030712] to-[#030712]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Link href="/padhai" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Pad<span className="text-emerald-500">hai</span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-xl font-semibold text-white mb-2">
            {isSignUp ? "Create Account" : "Welcome back"}
          </h1>
          <p className="mb-6 text-sm text-slate-400">
            {isSignUp ? "Start your study journey with Padhai" : "Sign in to continue your progress"}
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm text-slate-300 mb-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setFieldErrors(prev => ({ ...prev, name: undefined })); }}
                    placeholder="Enter your name"
                    autoComplete="name"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-slate-800/50 text-white placeholder:text-slate-500 outline-none transition-all ${
                      fieldErrors.name ? "border-red-500" : "border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    }`}
                  />
                </div>
                {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border bg-slate-800/50 text-white placeholder:text-slate-500 outline-none transition-all ${
                    fieldErrors.email ? "border-red-500" : "border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  }`}
                />
              </div>
              {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: undefined })); }}
                  placeholder="••••••••"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-lg border bg-slate-800/50 text-white placeholder:text-slate-500 outline-none transition-all ${
                    fieldErrors.password ? "border-red-500" : "border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-900 px-2 text-slate-500">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-700 hover:border-slate-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center text-sm text-slate-500">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <button onClick={() => { setIsSignUp(false); setError(""); setFieldErrors({}); setPassword(""); }} className="text-emerald-400 hover:underline">
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{" "}
                <button onClick={() => { setIsSignUp(true); setError(""); setFieldErrors({}); setPassword(""); }} className="text-emerald-400 hover:underline">
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          <Link href="/padhai" className="hover:text-slate-400">← Back to Padhai</Link>
        </p>
      </div>
    </div>
  );
}

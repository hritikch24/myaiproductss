"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  ArrowRight,
  User,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function PadhaiOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkExistingStudent();
  }, []);

  async function checkExistingStudent() {
    try {
      const res = await fetch("/api/padhai/student");

      if (res.status === 401) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.student) {
          router.push("/padhai/dashboard");
          return;
        }
        setIsLoggedIn(true);
        if (data.userName) {
          setName(data.userName);
        }

        const pending = sessionStorage.getItem("padhai_onboard");
        if (pending) {
          sessionStorage.removeItem("padhai_onboard");
          const onboardData = JSON.parse(pending);
          const onboardRes = await fetch("/api/padhai/onboarding", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: onboardData.name || data.userName || "",
              class: onboardData.class,
              examTarget: onboardData.examTarget,
            }),
          });
          if (onboardRes.ok) {
            window.location.href = "/padhai/dashboard";
            return;
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const examTargets = [
    { id: "JEE", label: "JEE (Engineering)", subjects: "Physics, Chemistry, Mathematics" },
    { id: "NEET", label: "NEET (Medical)", subjects: "Physics, Chemistry, Biology" },
    { id: "BOARDS_ONLY", label: "Board Exams Only", subjects: "All subjects" },
  ];

  const totalSteps = isLoggedIn ? 3 : 4;
  const currentProgress = (step / totalSteps) * 100;

  async function handleSignupAndOnboard() {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const regRes = await fetch("/api/padhai/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const regData = await regRes.json();

      if (!regRes.ok) {
        if (regData.error === "Email already registered") {
          const signInRes = await signIn("credentials", { email, password, redirect: false });
          if (signInRes?.error) {
            setError("Email already exists. Try signing in or use a different password.");
            setIsLoading(false);
            return;
          }
        } else {
          setError(regData.error || "Registration failed");
          setIsLoading(false);
          return;
        }
      } else {
        const signInRes = await signIn("credentials", { email, password, redirect: false });
        if (signInRes?.error) {
          setError("Account created but sign-in failed. Please try signing in.");
          setIsLoading(false);
          return;
        }
      }

      const onboardRes = await fetch("/api/padhai/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, class: selectedClass, examTarget: selectedExam }),
      });
      const onboardData = await onboardRes.json();

      if (onboardRes.ok) {
        window.location.href = "/padhai/dashboard";
      } else {
        setError(onboardData.error || "Setup failed. Please try again.");
        setIsLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  async function handleOnboardOnly() {
    if (!selectedClass || !selectedExam || !name) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/padhai/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, class: selectedClass, examTarget: selectedExam }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/padhai/dashboard";
      } else {
        alert(data.error || "Something went wrong");
        setIsLoading(false);
      }
    } catch {
      alert("Something went wrong");
      setIsLoading(false);
    }
  }

  async function handleGoogleSignup() {
    sessionStorage.setItem("padhai_onboard", JSON.stringify({ name, class: selectedClass, examTarget: selectedExam }));
    await signIn("google", { callbackUrl: "/padhai/onboarding" });
  }

  const isLastStep = isLoggedIn ? step === 3 : step === 4;
  const isAccountStep = !isLoggedIn && step === 4;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#030712] to-[#030712]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Link href="/padhai" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Pad<span className="text-emerald-500">hai</span>
            </span>
          </Link>
        </div>

        {/* Free offer banner */}
        <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/[0.08] px-4 py-3 flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-300">FREE for early users till 15 June</p>
            <p className="text-[11px] text-amber-400/60">Premium features included. No card needed. Limited spots.</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
            style={{ width: `${Math.min(currentProgress, 100)}%` }}
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">

          {/* Step 1: Name */}
          {step === 1 && (
            <>
              <h1 className="text-xl font-semibold text-white mb-1">
                Let&apos;s set up your study tracker
              </h1>
              <p className="mb-5 text-sm text-slate-400">
                100+ students already tracking. Takes 30 seconds.
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Student&apos;s name (or your child&apos;s name)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && name && setStep(2)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="e.g. Arjun or Priya"
                    autoFocus
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">Parents: you can enter your child&apos;s name here</p>
                <button
                  onClick={() => name && setStep(2)}
                  disabled={!name}
                  className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {/* Step 2: Class */}
          {step === 2 && (
            <>
              <button onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-slate-300 mb-4">
                &larr; Back
              </button>
              <h1 className="text-xl font-semibold text-white mb-1">
                Which class is {name || "the student"} in?
              </h1>
              <p className="mb-5 text-sm text-slate-400">
                We&apos;ll load the complete NCERT + coaching syllabus automatically
              </p>

              <div className="space-y-2 mb-4">
                {[
                  { cls: "11", detail: "Foundation year — 70% of JEE comes from Class 11" },
                  { cls: "12", detail: "Final year — boards + entrance exam prep together" },
                ].map(({ cls, detail }) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => { setSelectedClass(cls); setTimeout(() => setStep(3), 200); }}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedClass === cls
                        ? "border-emerald-500 bg-emerald-500/10 text-white"
                        : "border-slate-700 bg-slate-800/30 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <span className="font-medium block">Class {cls}</span>
                    <span className="text-xs text-slate-500">{detail}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Exam */}
          {step === 3 && (
            <>
              <button onClick={() => setStep(2)} className="text-xs text-slate-500 hover:text-slate-300 mb-4">
                &larr; Back
              </button>
              <h1 className="text-xl font-semibold text-white mb-1">
                What is {name || "the student"} preparing for?
              </h1>
              <p className="mb-5 text-sm text-slate-400">
                We&apos;ll set up the right subjects and chapter-wise tracking
              </p>

              <div className="space-y-2 mb-4">
                {examTargets.map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => setSelectedExam(exam.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedExam === exam.id
                        ? "border-emerald-500 bg-emerald-500/10 text-white"
                        : "border-slate-700 bg-slate-800/30 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <span className="font-medium block">{exam.label}</span>
                    <span className="text-xs text-slate-500">{exam.subjects}</span>
                  </button>
                ))}
              </div>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleOnboardOnly}
                  disabled={!selectedExam || isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Setting up your dashboard...</>
                  ) : (
                    <>See My Full Syllabus &amp; Start Tracking <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => selectedExam && setStep(4)}
                  disabled={!selectedExam}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last step — Create your account
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </>
          )}

          {/* Step 4: Account creation (only if not logged in) */}
          {isAccountStep && (
            <>
              <button onClick={() => setStep(3)} className="text-xs text-slate-500 hover:text-slate-300 mb-4">
                &larr; Back
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <h1 className="text-lg font-semibold text-white">
                  Almost done! Save your progress.
                </h1>
              </div>

              <div className="mb-5 rounded-lg bg-emerald-500/[0.07] border border-emerald-500/15 p-3">
                <p className="text-xs text-slate-300">
                  Your tracker is ready: <span className="text-emerald-400 font-medium">Class {selectedClass} &middot; {selectedExam}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Create an account to save it and start tracking.</p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-700 hover:border-slate-600 mb-4"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google (fastest)
              </button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900 px-2 text-slate-500">or use email</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800/50 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && email && password && handleSignupAndOnboard()}
                    placeholder="Create a password (6+ chars)"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-slate-700 bg-slate-800/50 text-sm text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <button
                  onClick={handleSignupAndOnboard}
                  disabled={isLoading || !email || !password}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Creating your dashboard...</>
                  ) : (
                    <>Start Tracking — It&apos;s Free <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Sign in link */}
          <div className="mt-5 text-center">
            <span className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/padhai/login" className="text-emerald-400 hover:underline">
                Sign in
              </Link>
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <span>100% Free till 15 June</span>
            <span className="text-slate-700">&middot;</span>
            <span>No credit card</span>
            <span className="text-slate-700">&middot;</span>
            <span>30 seconds</span>
          </div>
          <p className="text-center text-xs text-slate-600">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

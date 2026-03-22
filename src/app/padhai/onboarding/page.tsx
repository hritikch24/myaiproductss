"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  ArrowRight,
  User,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PadhaiOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  useEffect(() => {
    checkExistingStudent();
  }, []);

  async function checkExistingStudent() {
    try {
      const res = await fetch("/api/padhai/student");

      if (res.status === 401) {
        router.push("/padhai/login");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (data.student) {
          router.push("/padhai/dashboard");
          return;
        }
        if (data.userName) {
          setName(data.userName);
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

  async function handleSubmit() {
    if (!selectedClass || !selectedExam || !name) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/padhai/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          class: selectedClass,
          examTarget: selectedExam,
        }),
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

  const totalSteps = 3;
  const currentProgress = (step / totalSteps) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#030712] to-[#030712]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
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

        {/* Progress bar */}
        <div className="mb-6 h-1 bg-slate-800 rounded-full overflow-hidden">
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
              <h1 className="text-xl font-semibold text-white mb-2">
                Let&apos;s get started
              </h1>
              <p className="mb-6 text-sm text-slate-400">
                Tell us a bit about yourself
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  What should we call you?
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <button
                  onClick={() => name && setStep(2)}
                  disabled={!name}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-300 mb-4"
              >
                &larr; Back
              </button>
              <h1 className="text-xl font-semibold text-white mb-2">
                Which class are you in?
              </h1>
              <p className="mb-6 text-sm text-slate-400">
                We&apos;ll load the right syllabus for you
              </p>

              <div className="space-y-2 mb-4">
                {["11", "12"].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedClass === cls
                        ? "border-emerald-500 bg-emerald-500/10 text-white"
                        : "border-slate-700 bg-slate-800/30 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <span className="font-medium">Class {cls}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => selectedClass && setStep(3)}
                disabled={!selectedClass}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Step 3: Exam */}
          {step === 3 && (
            <>
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-slate-300 mb-4"
              >
                &larr; Back
              </button>
              <h1 className="text-xl font-semibold text-white mb-2">
                What are you preparing for?
              </h1>
              <p className="mb-6 text-sm text-slate-400">
                This determines which subjects we track
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
                    <span className="text-xs text-slate-500">
                      {exam.subjects}
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedExam || isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    Start Tracking
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </>
          )}

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <span className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                href="/padhai/login"
                className="text-emerald-400 hover:underline"
              >
                Sign in
              </Link>
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { BookOpen, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export default function PadhaiOnboarding() {
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
            Welcome to Padhai
          </h1>
          <p className="mb-6 text-sm text-slate-400">
            Let&apos;s set up your study tracker
          </p>

          {step === 1 && (
            <div className="mb-6">
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
          )}

          {step === 2 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Which class are you in?
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedClass("11")}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedClass === "11"
                      ? "border-emerald-500 bg-emerald-500/10 text-white"
                      : "border-slate-700 bg-slate-800/30 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <span className="font-medium">Class 11</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedClass("12")}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedClass === "12"
                      ? "border-emerald-500 bg-emerald-500/10 text-white"
                      : "border-slate-700 bg-slate-800/30 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <span className="font-medium">Class 12</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => selectedClass && setStep(3)}
                disabled={!selectedClass}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                What are you preparing for?
              </label>
              <div className="space-y-2">
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
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedExam || isLoading}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Setting up..." : "Start Tracking"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <span className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/padhai/login" className="text-emerald-400 hover:underline">
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

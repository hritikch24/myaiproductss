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
              <h1 className="text-xl font-semibold text-white mb-1">
                Welcome! Let&apos;s set up your tracker
              </h1>
              <p className="mb-5 text-sm text-slate-400">
                100+ students are already tracking their JEE/NEET prep here
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
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="e.g. Arjun or Priya"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">Parents: you can enter your child&apos;s name here</p>
                <button
                  onClick={() => name && setStep(2)}
                  disabled={!name}
                  className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue — Step 1 of 3
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
              <h1 className="text-xl font-semibold text-white mb-1">
                Which class is {name || "the student"} in?
              </h1>
              <p className="mb-5 text-sm text-slate-400">
                We&apos;ll load the complete NCERT + coaching syllabus automatically
              </p>

              <div className="space-y-2 mb-4">
                {[
                  { cls: "11", detail: "Foundation year — build strong basics for JEE/NEET" },
                  { cls: "12", detail: "Final year — boards + entrance exam prep together" },
                ].map(({ cls, detail }) => (
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
                    <span className="font-medium block">Class {cls}</span>
                    <span className="text-xs text-slate-500">{detail}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => selectedClass && setStep(3)}
                disabled={!selectedClass}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Almost done — Step 2 of 3
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
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Setting up your dashboard...
                  </>
                ) : (
                  <>
                    See My Full Syllabus &amp; Start Tracking
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-emerald-500/70">
                Your personalized dashboard is ready in 5 seconds
              </p>
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

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <span>100% Free</span>
            <span className="text-slate-700">•</span>
            <span>No credit card</span>
            <span className="text-slate-700">•</span>
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

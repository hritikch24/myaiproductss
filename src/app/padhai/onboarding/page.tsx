"use client";

import { useState, useEffect, Suspense } from "react";
import {
  BookOpen,
  ArrowRight,
  User,
  Loader2,
  Users,
  GraduationCap,
  KeyRound,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function PadhaiOnboarding() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030712] flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") as "student" | "parent" | null;

  const [role, setRole] = useState<"student" | "parent" | null>(initialRole);
  const [step, setStep] = useState(initialRole ? 1 : 0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Student fields
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  // Parent fields
  const [parentName, setParentName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [linkError, setLinkError] = useState("");
  const [linkSuccess, setLinkSuccess] = useState<{
    studentName: string;
  } | null>(null);

  useEffect(() => {
    checkExistingStudent();
  }, []);

  async function checkExistingStudent() {
    try {
      const res = await fetch("/api/padhai/student");

      if (res.status === 401) {
        setIsAuthenticated(false);
        setIsLoading(false);
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
          setParentName(data.userName);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const loginUrl = initialRole
        ? `/padhai/login?role=${initialRole}`
        : "/padhai/login";
      router.push(loginUrl);
    }
  }, [isLoading, isAuthenticated, router, initialRole]);

  if (isLoading || !isAuthenticated) {
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

  // ─── Student submit ───
  async function handleStudentSubmit() {
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

  // ─── Parent submit (invite code) ───
  async function handleParentLink() {
    if (!inviteCode.trim() || !parentName.trim()) return;
    setIsLoading(true);
    setLinkError("");

    try {
      const res = await fetch("/api/padhai/link-parent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviteCode: inviteCode.trim(),
          parentName: parentName.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setLinkSuccess({ studentName: data.studentName });
        // Redirect after showing success
        setTimeout(() => {
          window.location.href = "/padhai/dashboard";
        }, 2000);
      } else {
        setLinkError(data.error || "Invalid code");
        setIsLoading(false);
      }
    } catch {
      setLinkError("Something went wrong. Try again.");
      setIsLoading(false);
    }
  }

  // Student steps: role(0) → name(1) → class(2) → exam(3)
  // Parent steps: role(0) → name+code(1) → done
  const studentSteps = 3;
  const parentSteps = 1;
  const totalSteps = role === "parent" ? parentSteps : studentSteps;
  const currentProgress =
    step > 0 && totalSteps > 0 ? (step / totalSteps) * 100 : 0;

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
        {step > 0 && !linkSuccess && (
          <div className="mb-6 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${Math.min(currentProgress, 100)}%` }}
            />
          </div>
        )}

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">

          {/* ═══ Link success screen ═══ */}
          {linkSuccess && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="text-xl font-semibold text-white mb-2">
                You&apos;re linked!
              </h1>
              <p className="text-sm text-slate-400">
                You&apos;ll now receive weekly reports on{" "}
                <span className="text-white font-medium">
                  {linkSuccess.studentName}
                </span>
                &apos;s study progress.
              </p>
              <div className="mt-4">
                <Loader2 className="h-5 w-5 text-emerald-500 animate-spin mx-auto" />
                <p className="text-xs text-slate-500 mt-2">
                  Taking you to dashboard...
                </p>
              </div>
            </div>
          )}

          {/* ═══ Step 0: Role selection ═══ */}
          {!linkSuccess && step === 0 && (
            <>
              <h1 className="text-xl font-semibold text-white mb-2">
                Welcome to Padhai
              </h1>
              <p className="mb-6 text-sm text-slate-400">
                Are you a student or a parent?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => { setRole("student"); setStep(1); }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-700 bg-slate-800/30 text-left transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <GraduationCap className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">
                      I&apos;m a Student
                    </span>
                    <span className="text-xs text-slate-400">
                      Track goals, take quizzes, build streaks
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => { setRole("parent"); setStep(1); }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-700 bg-slate-800/30 text-left transition-all hover:border-purple-500/50 hover:bg-purple-500/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">
                      I&apos;m a Parent
                    </span>
                    <span className="text-xs text-slate-400">
                      Enter your child&apos;s invite code to get reports
                    </span>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* ═══ Student Step 1: Name ═══ */}
          {!linkSuccess && role === "student" && step === 1 && (
            <>
              <button
                onClick={() => setStep(0)}
                className="text-xs text-slate-500 hover:text-slate-300 mb-4"
              >
                &larr; Back
              </button>
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

          {/* ═══ Student Step 2: Class ═══ */}
          {!linkSuccess && role === "student" && step === 2 && (
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

          {/* ═══ Student Step 3: Exam ═══ */}
          {!linkSuccess && role === "student" && step === 3 && (
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
                onClick={handleStudentSubmit}
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

          {/* ═══ Parent Step 1: Name + Invite Code ═══ */}
          {!linkSuccess && role === "parent" && step === 1 && (
            <>
              <button
                onClick={() => setStep(0)}
                className="text-xs text-slate-500 hover:text-slate-300 mb-4"
              >
                &larr; Back
              </button>
              <h1 className="text-xl font-semibold text-white mb-2">
                Link to your child&apos;s account
              </h1>
              <p className="mb-6 text-sm text-slate-400">
                Ask your child for their 10-digit invite code.
                They can find it on their dashboard.
              </p>

              {linkError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-400">{linkError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Your name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="e.g., Sunita Sharma"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Child&apos;s invite code
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      value={inviteCode}
                      onChange={(e) => {
                        setInviteCode(e.target.value.replace(/\D/g, "").slice(0, 10));
                        setLinkError("");
                      }}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all tracking-widest font-mono"
                      placeholder="e.g., 4450594393"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Your child can find this code in their Padhai dashboard or profile
                  </p>
                </div>

                <button
                  onClick={handleParentLink}
                  disabled={
                    !parentName.trim() ||
                    inviteCode.length !== 10 ||
                    isLoading
                  }
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Linking...
                    </>
                  ) : (
                    <>
                      Link &amp; Get Reports
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Sign in link */}
          {!linkSuccess && step > 0 && (
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
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

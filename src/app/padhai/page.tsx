import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Users, TrendingUp, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Padhai — Track Your Studies, Keep Your Parents Informed",
  description: "No-pressure study tracker for Class 11, 12, JEE & NEET students. Set weekly goals, verify with quick quizzes, and keep your parents updated with calm, supportive reports.",
  keywords: [
    "study tracker",
    "JEE preparation",
    "NEET preparation",
    "Class 11 12 study",
    "student accountability",
    "parent updates",
    "weekly study goals",
    "NCERT chapters",
  ],
  openGraph: {
    title: "Padhai — Track Your Studies, Keep Your Parents Informed",
    description: "No-pressure study tracker for Class 11, 12, JEE & NEET students.",
    url: "https://kraftai.in/padhai",
    siteName: "Padhai",
    locale: "en_IN",
    type: "website",
  },
};

export default function PadhaiLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">
            Pad<span className="text-emerald-500">hai</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/padhai/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/padhai/onboarding"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm text-emerald-400 mb-6">
          <Sparkles className="h-4 w-4" />
          <span>For Class 11, 12, JEE & NEET Students</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Study smarter, not harder
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Track your weekly goals, verify with quick quizzes, and keep your parents 
          informed with calm, supportive updates. No pressure, just progress.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/padhai/onboarding"
            className="rounded-lg bg-emerald-500 px-6 py-3 text-base font-medium text-white transition-all hover:bg-emerald-600 hover:scale-105"
          >
            Start Tracking Free
            <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-12 text-2xl font-bold text-white text-center">
          Everything you need to stay on track
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-emerald-500/30">
            <div className="mb-4 inline-flex rounded-lg bg-emerald-500/10 p-3">
              <BookOpen className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Weekly Goals</h3>
            <p className="mt-2 text-sm text-slate-400">
              Set achievable weekly targets based on your syllabus. AI suggests chapters based on what you have covered.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-emerald-500/30">
            <div className="mb-4 inline-flex rounded-lg bg-emerald-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Quiz Verification</h3>
            <p className="mt-2 text-sm text-slate-400">
              5-question rapid quizzes to verify you studied. Color-coded results show your genuine understanding.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-emerald-500/30">
            <div className="mb-4 inline-flex rounded-lg bg-emerald-500/10 p-3">
              <Users className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Parent Updates</h3>
            <p className="mt-2 text-sm text-slate-400">
              Weekly calm, supportive reports sent to your parents. No pressure, just progress updates they will appreciate.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="mb-12 text-2xl font-bold text-white text-center">
          How Padhai works
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              1
            </div>
            <div>
              <h3 className="font-semibold text-white">Choose your class & exam</h3>
              <p className="mt-1 text-sm text-slate-400">
                Select Class 11 or 12, and whether you are preparing for JEE, NEET, or Board exams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              2
            </div>
            <div>
              <h3 className="font-semibold text-white">Set weekly goals</h3>
              <p className="mt-1 text-sm text-slate-400">
                AI suggests chapters based on your syllabus. You can modify and confirm your weekly plan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              3
            </div>
            <div>
              <h3 className="font-semibold text-white">Study & verify</h3>
              <p className="mt-1 text-sm text-slate-400">
                Mark tasks as done, take quick quizzes to verify understanding, upload study photos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              4
            </div>
            <div>
              <h3 className="font-semibold text-white">Parents stay informed</h3>
              <p className="mt-1 text-sm text-slate-400">
                Every Sunday, parents receive a calm, encouraging report with tips on how to support you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold text-white">
          Ready to start your journey?
        </h2>
        <p className="mt-4 text-slate-400">
          Join thousands of students who are tracking their studies without the pressure.
        </p>
        <Link
          href="/padhai/onboarding"
          className="mt-8 inline-flex rounded-lg bg-emerald-500 px-6 py-3 text-base font-medium text-white transition-all hover:bg-emerald-600"
        >
          Get Started Free
          <ArrowRight className="ml-2 inline h-4 w-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Padhai by KraftAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

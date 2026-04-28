"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Target,
  Flame,
  ChevronRight,
  Upload,
  FileQuestion,
  Brain,
  Clock,
  TrendingUp,
  CheckCircle,
  User,
  Info,
  Users,
  BarChart3,
  Heart,
  Copy,
  Share2,
  KeyRound,
  AlertTriangle,
  Zap,
  Calendar,
  Trophy,
} from "lucide-react";
import Link from "next/link";

export default function PadhaiDashboard() {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [studentRes, progressRes] = await Promise.all([
        fetch("/api/padhai/student"),
        fetch("/api/padhai/progress").catch(() => ({ json: () => null })),
      ]);

      const studentData = await studentRes.json();
      if (!studentData.student) {
        window.location.href = "/padhai/onboarding";
        return;
      }
      setStudent(studentData.student);

      const progressData = await progressRes.json();
      if (progressData) setProgress(progressData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!student) return null;

  const isParent = student?.role === "parent";
  const today = new Date();

  const examTarget = student.exam_target;
  const studentClass = student.class;
  let examDate: Date | null = null;
  let examLabel = "";
  if (examTarget === "JEE") {
    examLabel = "JEE Mains";
    examDate = new Date(studentClass === "11" ? today.getFullYear() + 2 : today.getFullYear() + 1, 0, 24);
    if (examDate < today) examDate = new Date(examDate.getFullYear() + 1, 0, 24);
  } else if (examTarget === "NEET") {
    examLabel = "NEET";
    examDate = new Date(studentClass === "11" ? today.getFullYear() + 2 : today.getFullYear() + 1, 4, 5);
    if (examDate < today) examDate = new Date(examDate.getFullYear() + 1, 4, 5);
  } else {
    examLabel = "Board Exams";
    examDate = new Date(studentClass === "11" ? today.getFullYear() + 2 : today.getFullYear() + 1, 1, 15);
    if (examDate < today) examDate = new Date(examDate.getFullYear() + 1, 1, 15);
  }
  const daysLeft = examDate ? Math.max(0, Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const weeksLeft = Math.floor(daysLeft / 7);

  const progressPct = progress?.progressPercent || 0;
  const completedCh = progress?.completedChapters || 0;

  function getDailyTip() {
    const streak = student.streak_count || 0;
    if (streak === 0) return isParent
      ? `${student.name} hasn't started this week yet. A gentle nudge could help!`
      : "Start today — even 1 chapter keeps your streak alive.";
    if (streak >= 7) return isParent
      ? `Great consistency! ${student.name} has a ${streak}-day streak.`
      : `${streak}-day streak! You're in the top 20% of Padhai students.`;
    if (completedCh === 0) return isParent
      ? "First step: help your child mark their first chapter as done."
      : "Mark your first chapter done today!";
    return isParent
      ? `${student.name} is making steady progress. Keep encouraging!`
      : "Consistency beats intensity. Keep showing up daily!";
  }
  const dailyMessage = getDailyTip();

  return (
    <div className="min-h-screen bg-[#030712]">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Pad<span className="text-emerald-500">hai</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/padhai/profile"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <span>
                {isParent ? (
                  <>{student.parent?.name || "Parent"}</>
                ) : (
                  <>Hi, {student.name}</>
                )}
              </span>
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                {isParent ? (
                  <Users className="h-4 w-4 text-emerald-400" />
                ) : (
                  <User className="h-4 w-4 text-emerald-400" />
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Role banner for parents */}
        {isParent && (
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 flex items-start gap-3">
            <Heart className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-white">
                Tracking {student.name}&apos;s progress
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Class {student.class} &middot;{" "}
                {student.exam_target === "BOARDS_ONLY"
                  ? "Board Exams"
                  : student.exam_target}
              </p>
            </div>
          </div>
        )}

        {/* Exam Countdown */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{examLabel} {examDate?.getFullYear()}</p>
                <p className="text-xl font-bold text-white">{daysLeft} days left</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{weeksLeft}</p>
              <p className="text-xs text-slate-400">weeks</p>
            </div>
          </div>
          {progressPct > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs">
              {progressPct >= 40 ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <Zap className="h-3 w-3" />
                  {isParent ? `${student.name} is` : "You're"} on track — {progressPct}% syllabus done
                </span>
              ) : daysLeft < 180 ? (
                <span className="flex items-center gap-1 text-amber-400">
                  <AlertTriangle className="h-3 w-3" />
                  Only {progressPct}% done with {weeksLeft} weeks left — need to pick up pace
                </span>
              ) : (
                <span className="text-slate-500">
                  {progressPct}% done — {isParent ? "steady start" : "keep building momentum"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Streak + Daily Tip */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm">
                  {isParent ? `${student.name}'s Streak` : "Current Streak"}
                </span>
              </div>
              <div className="text-3xl font-bold text-white">
                {student.streak_count || 0}{" "}
                <span className="text-lg font-normal text-slate-400">days</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Best Streak</div>
              <div className="text-xl font-semibold text-white">
                {student.longest_streak || 0} days
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-emerald-400">{dailyMessage}</p>
        </div>

        {/* Invite Code Card — students only */}
        {!isParent && student.invite_code && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                  <KeyRound className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">
                    Your Parent Invite Code
                  </p>
                  <p className="text-lg font-mono font-bold text-white tracking-widest">
                    {student.invite_code}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(student.invite_code);
                  setCodeCopied(true);
                  setTimeout(() => setCodeCopied(false), 2000);
                }}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 transition-colors"
              >
                {codeCopied ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xs text-slate-500 flex-1">
                Share this with your parent to track your progress at kraftai.in/padhai/track
              </p>
              <button
                onClick={() => {
                  const msg = `Track my study progress on Padhai!\n\nMy invite code: ${student.invite_code}\n\nGo to: https://kraftai.in/padhai/track`;
                  if (navigator.share) {
                    navigator.share({ title: "Padhai Invite Code", text: msg }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(msg);
                    setCodeCopied(true);
                    setTimeout(() => setCodeCopied(false), 2000);
                  }
                }}
                className="shrink-0 flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
            </div>
          </div>
        )}

        {/* Today's Focus — students only */}
        {!isParent && (
          <Link
            href={completedCh === 0 ? "/padhai/syllabus" : "/padhai/goals"}
            className="block rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 transition-all hover:bg-emerald-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <Zap className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                  {completedCh === 0
                    ? "Start here: Mark your first chapter done"
                    : progressPct < 25
                    ? "Set this week's goals — pick 3-4 chapters"
                    : "Continue your weekly goals"}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {completedCh === 0
                    ? "Open your syllabus and tap any chapter you've already studied"
                    : `${progressPct}% done — ${progress?.remainingHours || "?"} study hours left to finish syllabus`}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-emerald-500/60" />
            </div>
          </Link>
        )}

        {/* Quick Actions */}
        {isParent ? (
          // Parent quick actions
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/padhai/parent"
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center transition-all hover:border-purple-500/30 hover:bg-slate-800/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <span className="font-medium text-white text-sm">
                Report Settings
              </span>
              <span className="text-xs text-slate-500">
                Language, email, WhatsApp
              </span>
            </Link>

            <Link
              href="/padhai/syllabus"
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center transition-all hover:border-emerald-500/30 hover:bg-slate-800/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                <BookOpen className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="font-medium text-white text-sm">
                View Syllabus
              </span>
              <span className="text-xs text-slate-500">
                Track chapter completion
              </span>
            </Link>
          </div>
        ) : (
          // Student quick actions
          <div className="grid grid-cols-3 gap-4">
            <Link
              href="/padhai/timer"
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center transition-all hover:border-orange-500/30 hover:bg-slate-800/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                <Brain className="h-5 w-5 text-orange-400" />
              </div>
              <span className="font-medium text-white text-sm">Timer</span>
            </Link>

            <Link
              href="/padhai/photo"
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center transition-all hover:border-emerald-500/30 hover:bg-slate-800/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                <Upload className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="font-medium text-white text-sm">Photo</span>
            </Link>

            <Link
              href="/padhai/quiz"
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center transition-all hover:border-purple-500/30 hover:bg-slate-800/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <FileQuestion className="h-5 w-5 text-purple-400" />
              </div>
              <span className="font-medium text-white text-sm">Quiz</span>
            </Link>
          </div>
        )}

        {/* Syllabus Progress */}
        {progress && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Syllabus Progress
              </h2>
              <span className="text-sm text-slate-400">
                {progress.progressPercent || 0}% complete
              </span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progress.progressPercent || 0}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <div className="text-2xl font-bold text-white">
                  {progress.completedChapters || 0}
                </div>
                <div className="text-xs text-slate-400">Chapters Done</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <div className="text-2xl font-bold text-white">
                  {progress.remainingHours || 0}
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  Hours Left
                  <span className="group relative inline-block">
                    <Info className="h-3 w-3 text-slate-500 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Total study hours needed to complete remaining chapters
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {progress.estimatedWeeksLeft > 0 && (
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/30 p-3 rounded-lg">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>
                  {isParent
                    ? `At current pace, ~${progress.estimatedWeeksLeft} weeks to complete syllabus`
                    : `At your pace, ~${progress.estimatedWeeksLeft} weeks to complete syllabus`
                  }
                </span>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {progress.subjectProgress &&
                Object.entries(progress.subjectProgress).map(
                  ([subject, data]: [string, any]) => (
                    <div
                      key={subject}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-300">{subject}</span>
                      <span className="text-slate-400">
                        {data.completed}/{data.total} chapters
                      </span>
                    </div>
                  )
                )}
            </div>

            <Link
              href="/padhai/syllabus"
              className="mt-4 flex items-center justify-center gap-2 text-emerald-400 hover:underline text-sm"
            >
              View Full Syllabus <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/padhai/goals"
            className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
          >
            <div>
              <div className="font-medium text-white">Weekly Goals</div>
              <div className="text-xs text-slate-400">
                {isParent ? "View this week's plan" : "Plan your week"}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-500" />
          </Link>

          <Link
            href="/padhai/parent"
            className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
          >
            <div>
              <div className="font-medium text-white">Parent Reports</div>
              <div className="text-xs text-slate-400">Keep them updated</div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-500" />
          </Link>
        </div>

        {/* Daily Motivation — Why you're doing this */}
        {!isParent && (
          <div className="rounded-xl border border-amber-500/15 bg-gradient-to-r from-amber-500/[0.06] to-orange-500/[0.04] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400/80">Daily Motivation</span>
            </div>
            {(() => {
              const motivations = examTarget === "NEET" ? [
                { fact: "AIIMS Delhi doctors start at ₹1 lakh/month during residency itself.", push: "Every chapter you finish today brings you closer to that white coat." },
                { fact: "Dr. Mansukh Mandaviya, India's Health Minister, started with the same NCERT books you're reading.", push: "The syllabus is the same for everyone — discipline makes the difference." },
                { fact: "Top NEET scorers complete their syllabus at least 2 months before the exam for revision.", push: "Check your syllabus page — are you on track for that?" },
                { fact: "A surgeon in India earns ₹25-50 LPA. Super-specialists earn ₹1 Cr+.", push: "That future starts with finishing today's chapter." },
                { fact: "76% of NEET questions are directly from NCERT textbooks.", push: "You don't need fancy resources — you need consistency. Keep going." },
                { fact: "Your parents are investing lakhs in your coaching. One hour of focused study = real ROI.", push: "Open your goals and knock out one more chapter today." },
                { fact: "India needs 6 lakh more doctors. NEET is your entry ticket to a career that matters.", push: "The country needs you. Keep preparing." },
              ] : [
                { fact: "Average IIT graduate salary: ₹30-80 LPA. Top packages: ₹1-3 crore.", push: "Every chapter you finish today is an investment in that future." },
                { fact: "Sundar Pichai (Google CEO), Sachin Bansal (Flipkart) — both IITians who started just like you.", push: "They sat in the same classrooms, studied the same subjects. Consistency got them there." },
                { fact: "IIT campus placements: Google, Microsoft, Amazon, Goldman Sachs visit every year.", push: "These companies don't care about your coaching brand — they care about your fundamentals." },
                { fact: "Top JEE rankers study 6-8 hours daily with proper tracking. Not 14 hours of sitting.", push: "Quality > Quantity. Use your timer, take the quiz, and call it a day." },
                { fact: "70% of JEE Mains comes from Class 11 topics. The foundation you build now = your score.", push: "Don't skip Class 11 chapters. Check your syllabus page right now." },
                { fact: "Your parents spent ₹2-3 lakh on coaching. Every tracked chapter = visible ROI for them.", push: "Share your invite code — let them see your progress." },
                { fact: "IIT Bombay, Delhi, Madras — beautiful campuses, world-class labs, friends for life.", push: "That hostel room, that campus, that life — it's earned one chapter at a time." },
              ];
              const dayIndex = today.getDate() % motivations.length;
              const m = motivations[dayIndex];
              return (
                <>
                  <p className="text-sm text-white font-medium leading-relaxed">{m.fact}</p>
                  <p className="mt-2 text-xs text-amber-400/70 italic">{m.push}</p>
                </>
              );
            })()}
          </div>
        )}

        {/* Parent motivation */}
        {isParent && (
          <div className="rounded-xl border border-purple-500/15 bg-purple-500/[0.04] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 text-purple-400" />
              <span className="text-xs font-medium text-purple-400/80">Parenting Tip</span>
            </div>
            {(() => {
              const tips = [
                { tip: "Ask \"What was the most interesting thing you studied today?\" instead of \"Kitna padha?\"", why: "It shows interest in learning, not just output — and builds a positive study association." },
                { tip: "Celebrate small wins: \"5 chapters done this week? That's great progress!\"", why: "Recognition of effort matters more than pressure about results." },
                { tip: "Don't compare your child with others. Every student has a different pace.", why: "Comparison creates anxiety, not motivation. Focus on their personal progress curve." },
                { tip: "If quiz scores are low, don't scold — help them identify weak areas.", why: "Low scores = opportunity to improve, not failure. The quiz already did the hard work of finding the gap." },
                { tip: "Share this week's progress with your child: \"I saw you completed 4 chapters — proud of you.\"", why: "When children know parents are watching with pride (not pressure), they self-motivate." },
                { tip: "Trust the process. Syllabus completion + quiz verification = genuine preparation.", why: "Padhai's tracking is designed to make self-cheating impossible. If the numbers look good, the prep is real." },
                { tip: "The best thing you can do: provide a quiet study space and emotional support.", why: "Environment matters. A supportive home + good tracking = results." },
              ];
              const dayIndex = today.getDate() % tips.length;
              const t = tips[dayIndex];
              return (
                <>
                  <p className="text-sm text-white font-medium leading-relaxed">{t.tip}</p>
                  <p className="mt-2 text-xs text-purple-400/70 italic">{t.why}</p>
                </>
              );
            })()}
          </div>
        )}
      </main>

    </div>
  );
}

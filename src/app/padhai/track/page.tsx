"use client";

import { useState } from "react";
import {
  BookOpen,
  Flame,
  Target,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Camera,
  Brain,
  ArrowLeft,
  Search,
  Calendar,
  BarChart3,
  Award,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import ChatWidget from "@/components/padhai/chat-widget";

type Tab = "week" | "month" | "overall";

export default function TrackPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<Tab>("week");
  const [photoModal, setPhotoModal] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || code.trim().length < 5) {
      setError("Please enter a valid invite code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/padhai/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: code.trim() }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Something went wrong");
        return;
      }

      setData(result);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Code entry screen
  if (!data) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-4 py-4 flex items-center gap-2">
            <Link href="/padhai" className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Pad<span className="text-emerald-500">hai</span>
              <span className="text-slate-400 text-sm font-normal ml-2">
                Parent Tracker
              </span>
            </span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <Search className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mt-4">
                Track Your Child&apos;s Progress
              </h1>
              <p className="text-slate-400 text-sm">
                Enter the invite code your child shared with you.
                <br />
                No login needed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  placeholder="Enter 10-digit code"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-4 text-center text-2xl font-mono font-bold tracking-[0.3em] text-white placeholder:text-slate-600 placeholder:text-lg placeholder:tracking-normal placeholder:font-normal focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <XCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || code.length < 5}
                className="w-full rounded-xl bg-emerald-500 px-4 py-3.5 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    View Progress
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-600">
              Ask your child to share their invite code from the Padhai app
            </p>
          </div>
        </main>
      </div>
    );
  }

  const { student, overall, thisWeek, monthly, quizzes, photos, activity } =
    data;

  // Build activity heatmap for last 30 days
  const activityMap = new Map<string, number>();
  for (const a of activity) {
    const dayKey = a.day ? String(a.day).split("T")[0] : null;
    if (dayKey) activityMap.set(dayKey, a.count);
  }

  const last30Days: { date: string; count: number; label: string }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    last30Days.push({
      date: key,
      count: activityMap.get(key) || 0,
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    });
  }

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "week", label: "This Week", icon: Calendar },
    { key: "month", label: "Monthly", icon: BarChart3 },
    { key: "overall", label: "Overall", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Photo modal */}
      {photoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPhotoModal(null)}
        >
          <img
            src={photoModal}
            alt="Study photo"
            className="max-w-full max-h-[80vh] rounded-xl object-contain"
          />
        </div>
      )}

      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setData(null)}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Pad<span className="text-emerald-500">hai</span>
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-white">{student.name}</div>
            <div className="text-xs text-slate-400">
              Class {student.class} &middot;{" "}
              {student.examTarget === "BOARDS_ONLY"
                ? "Boards"
                : student.examTarget}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 space-y-5">
        {/* Streak + Last Active */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              Current Streak
            </div>
            <div className="text-3xl font-bold text-white">
              {student.streakCount}{" "}
              <span className="text-sm font-normal text-slate-400">days</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Best: {student.longestStreak} days
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              Last Active
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {student.lastActive
                ? formatRelative(student.lastActive)
                : "Not yet"}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Joined{" "}
              {new Date(student.memberSince).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-slate-900/50 border border-slate-800 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "week" && (
          <WeekView
            thisWeek={thisWeek}
            quizzes={quizzes}
            studentName={student.name}
          />
        )}
        {activeTab === "month" && (
          <MonthView
            monthly={monthly}
            activity={last30Days}
            studentName={student.name}
          />
        )}
        {activeTab === "overall" && (
          <OverallView overall={overall} student={student} />
        )}

        {/* Recent Study Photos */}
        {photos.length > 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
              <Camera className="h-5 w-5 text-emerald-500" />
              Recent Study Snaps
              <span className="text-xs font-normal text-slate-500 ml-auto">
                Last 7 days
              </span>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {photos.map((photo: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setPhotoModal(photo.url)}
                  className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-colors group"
                >
                  <img
                    src={photo.url}
                    alt={`Study snap ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 py-1">
                    <span className="text-[10px] text-slate-300">
                      {new Date(photo.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {photos.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
            <ImageIcon className="h-8 w-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-500">
              No study photos this week yet
            </p>
          </div>
        )}
      </main>

      <ChatWidget inviteCode={code} />
    </div>
  );
}

// --- Sub Components ---

function WeekView({
  thisWeek,
  quizzes,
  studentName,
}: {
  thisWeek: any;
  quizzes: any[];
  studentName: string;
}) {
  if (!thisWeek.goal && quizzes.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
        <Calendar className="h-8 w-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-400">
          {studentName} hasn&apos;t set goals for this week yet
        </p>
      </div>
    );
  }

  const tasks = thisWeek.tasks || [];
  const doneTasks = tasks.filter((t: any) => t.status === "done").length;
  const totalTasks = tasks.length;
  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Recent quizzes (this week only)
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  weekStart.setHours(0, 0, 0, 0);
  const weekQuizzes = quizzes.filter(
    (q: any) => new Date(q.date) >= weekStart
  );

  return (
    <div className="space-y-4">
      {/* Weekly Goal Progress */}
      {thisWeek.goal && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-500" />
              Weekly Goals
            </h3>
            <span
              className={`text-sm font-bold ${
                pct >= 75
                  ? "text-emerald-400"
                  : pct >= 40
                  ? "text-amber-400"
                  : "text-slate-400"
              }`}
            >
              {pct}%
            </span>
          </div>

          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                pct >= 75
                  ? "bg-emerald-500"
                  : pct >= 40
                  ? "bg-amber-500"
                  : "bg-slate-600"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="space-y-2">
            {tasks.map((task: any, i: number) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  task.status === "done"
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-slate-800/50 border border-slate-700/50"
                }`}
              >
                {task.status === "done" ? (
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-slate-600 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <span
                    className={
                      task.status === "done"
                        ? "text-emerald-300"
                        : "text-slate-300"
                    }
                  >
                    {task.task_description || task.chapter_name}
                  </span>
                </div>
                {task.quiz_score !== null && task.quiz_score !== undefined && (
                  <span className="text-xs text-emerald-400 font-mono">
                    Quiz: {task.quiz_score}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-slate-500 text-center">
            {doneTasks}/{totalTasks} tasks completed
          </div>
        </div>
      )}

      {/* This Week's Quizzes */}
      {weekQuizzes.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-purple-400" />
            Quizzes This Week
          </h3>
          <div className="space-y-2">
            {weekQuizzes.map((q: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-slate-800/50 border border-slate-700/50 px-3 py-2.5 text-sm"
              >
                <span className="text-slate-300 truncate flex-1 mr-2">
                  {q.chapter}
                </span>
                <span
                  className={`font-mono font-bold ${
                    q.total > 0 && q.score / q.total >= 0.7
                      ? "text-emerald-400"
                      : q.total > 0 && q.score / q.total >= 0.4
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {q.score}/{q.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MonthView({
  monthly,
  activity,
  studentName,
}: {
  monthly: any[];
  activity: { date: string; count: number; label: string }[];
  studentName: string;
}) {
  return (
    <div className="space-y-4">
      {/* Activity Heatmap */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Camera className="h-5 w-5 text-emerald-500" />
          Study Activity
          <span className="text-xs font-normal text-slate-500 ml-auto">
            Last 30 days
          </span>
        </h3>
        <div className="grid grid-cols-10 gap-1">
          {activity.map((day, i) => (
            <div key={i} className="relative group">
              <div
                className={`aspect-square rounded-sm ${
                  day.count >= 3
                    ? "bg-emerald-500"
                    : day.count >= 2
                    ? "bg-emerald-500/70"
                    : day.count >= 1
                    ? "bg-emerald-500/40"
                    : "bg-slate-800"
                }`}
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {day.label}: {day.count} snap{day.count !== 1 ? "s" : ""}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-500">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-slate-800" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/70" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          <span>More</span>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Weekly Breakdown
        </h3>

        {monthly.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            No weekly goals set in the last 4 weeks
          </p>
        ) : (
          <div className="space-y-3">
            {monthly.map((week: any, i: number) => {
              const pct =
                week.totalTasks > 0
                  ? Math.round((week.doneTasks / week.totalTasks) * 100)
                  : 0;
              const weekDate = new Date(week.weekStart);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">
                      Week of{" "}
                      {weekDate.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {week.doneTasks}/{week.totalTasks} tasks &middot;{" "}
                      <span
                        className={
                          pct >= 75
                            ? "text-emerald-400"
                            : pct >= 40
                            ? "text-amber-400"
                            : "text-red-400"
                        }
                      >
                        {pct}%
                      </span>
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pct >= 75
                          ? "bg-emerald-500"
                          : pct >= 40
                          ? "bg-amber-500"
                          : "bg-red-500/60"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function OverallView({
  overall,
  student,
}: {
  overall: any;
  student: any;
}) {
  return (
    <div className="space-y-4">
      {/* Syllabus Progress */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Syllabus Progress
          </h3>
          <span className="text-sm font-bold text-emerald-400">
            {overall.progressPercent}%
          </span>
        </div>

        <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
            style={{ width: `${overall.progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">
              {overall.completedChapters}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Chapters Done
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">
              {overall.totalChapters}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Total Chapters
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50">
            <div className="text-2xl font-bold text-white">
              {overall.remainingHours}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Hours Left</div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
          By Subject
        </h4>
        <div className="space-y-3">
          {Object.entries(overall.subjectProgress).map(
            ([subject, data]: [string, any]) => {
              const pct =
                data.total > 0
                  ? Math.round((data.completed / data.total) * 100)
                  : 0;
              return (
                <div key={subject} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{subject}</span>
                    <span className="text-slate-400 text-xs">
                      {data.completed}/{data.total}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500/80 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-amber-400" />
          Milestones
        </h3>
        <div className="space-y-3">
          {getMilestones(student, overall).map((m, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                m.achieved
                  ? "bg-emerald-500/10 border border-emerald-500/20"
                  : "bg-slate-800/30 border border-slate-800"
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              <div className="flex-1">
                <span
                  className={
                    m.achieved ? "text-emerald-300" : "text-slate-500"
                  }
                >
                  {m.label}
                </span>
              </div>
              {m.achieved && (
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Helpers ---

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function getMilestones(student: any, overall: any) {
  return [
    {
      icon: "🔥",
      label: "3-day streak",
      achieved: student.longestStreak >= 3,
    },
    {
      icon: "⚡",
      label: "7-day streak",
      achieved: student.longestStreak >= 7,
    },
    {
      icon: "🏆",
      label: "30-day streak",
      achieved: student.longestStreak >= 30,
    },
    {
      icon: "📚",
      label: "First chapter completed",
      achieved: overall.completedChapters >= 1,
    },
    {
      icon: "🎯",
      label: "10 chapters completed",
      achieved: overall.completedChapters >= 10,
    },
    {
      icon: "💯",
      label: "25% syllabus done",
      achieved: overall.progressPercent >= 25,
    },
    {
      icon: "🚀",
      label: "50% syllabus done",
      achieved: overall.progressPercent >= 50,
    },
  ];
}

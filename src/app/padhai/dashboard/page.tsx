"use client";

import { useState, useEffect } from "react";
import { BookOpen, Target, Flame, ChevronRight, Upload, FileQuestion, Brain, Clock, TrendingUp, CheckCircle, User } from "lucide-react";
import Link from "next/link";

export default function PadhaiDashboard() {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [studentRes, progressRes] = await Promise.all([
        fetch("/api/padhai/student"),
        fetch("/api/padhai/progress").catch(() => ({ json: () => null }))
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

  const today = new Date();
  const messages = [
    "Every step forward counts. Keep going! 🚀",
    "Consistency is key. You're doing great! 💪",
    "Small progress is still progress. 🌱",
    "Your future self will thank you! ⭐",
    "Learning is a journey. Enjoy every bit! 📚",
  ];
  const dailyMessage = messages[today.getDay() % messages.length];

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
            <Link href="/padhai/profile" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
              <span>Hi, {student.name}</span>
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-400" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Streak Card */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Current Streak</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {student.streak_count || 0} <span className="text-lg font-normal text-slate-400">days</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Best Streak</div>
              <div className="text-xl font-semibold text-white">{student.longest_streak || 0} days</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-emerald-400">{dailyMessage}</p>
        </div>

        {/* Quick Actions */}
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

        {/* Syllabus Progress */}
        {progress && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Syllabus Progress
              </h2>
              <span className="text-sm text-slate-400">{progress.progressPercent || 0}% complete</span>
            </div>
            
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progress.progressPercent || 0}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <div className="text-2xl font-bold text-white">{progress.completedChapters || 0}</div>
                <div className="text-xs text-slate-400">Chapters Done</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <div className="text-2xl font-bold text-white">{progress.remainingHours || 0}</div>
                <div className="text-xs text-slate-400">Hours Left</div>
              </div>
            </div>

            {progress.estimatedWeeksLeft > 0 && (
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/30 p-3 rounded-lg">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>At your pace, ~{progress.estimatedWeeksLeft} weeks to complete syllabus</span>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {progress.subjectProgress && Object.entries(progress.subjectProgress).map(([subject, data]: [string, any]) => (
                <div key={subject} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{subject}</span>
                  <span className="text-slate-400">{data.completed}/{data.total} chapters</span>
                </div>
              ))}
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
              <div className="text-xs text-slate-400">Plan your week</div>
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
      </main>
    </div>
  );
}

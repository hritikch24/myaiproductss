"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, User, Mail, BookOpen, Target, Flame, Calendar, Award, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [studentRes, userRes] = await Promise.all([
        fetch("/api/padhai/student"),
        fetch("/api/auth/session").catch(() => ({ json: () => ({}) }))
      ]);

      const studentData = await studentRes.json();
      setStudent(studentData.student);

      const userData = await userRes.json();
      setUser(userData);
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

  return (
    <div className="min-h-screen bg-[#030712]">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/padhai/dashboard" className="text-slate-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-bold text-white">Profile</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-2xl font-bold">
              {student?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{student?.name || "Student"}</h2>
              <p className="text-sm text-slate-400">{student?.class}th Grade • {student?.exam_target}</p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-medium text-slate-400 mb-4">Account Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-xs text-slate-500">Email</div>
                <div className="text-white">{user?.user?.email || "Not connected"}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-xs text-slate-500">Class</div>
                <div className="text-white">Class {student?.class}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-slate-500" />
              <div>
                <div className="text-xs text-slate-500">Target Exam</div>
                <div className="text-white">
                  {student?.exam_target === "JEE" && "JEE (Engineering)"}
                  {student?.exam_target === "NEET" && "NEET (Medical)"}
                  {student?.exam_target === "BOARDS_ONLY" && "Board Exams"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-medium text-slate-400 mb-4">Your Progress</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-slate-800/50">
              <div className="flex items-center justify-center gap-2 text-orange-400 mb-1">
                <Flame className="h-4 w-4" />
                <span className="text-lg font-bold">{student?.streak_count || 0}</span>
              </div>
              <div className="text-xs text-slate-500">Day Streak</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-slate-800/50">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                <Award className="h-4 w-4" />
                <span className="text-lg font-bold">{student?.longest_streak || 0}</span>
              </div>
              <div className="text-xs text-slate-500">Best Streak</div>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-medium text-slate-400 mb-4">Your Subjects</h3>
          
          <div className="flex flex-wrap gap-2">
            {student?.subjects?.map((subject: string) => (
              <span 
                key={subject}
                className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/padhai/syllabus"
            className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-slate-400" />
              <span className="text-white">My Syllabus</span>
            </div>
            <ChevronLeft className="h-4 w-4 text-slate-500 rotate-180" />
          </Link>

          <button
            onClick={() => {
              fetch("/api/auth/signout", { method: "POST" }).then(() => {
                window.location.href = "/padhai/login";
              });
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-red-400" />
              <span className="text-red-400">Sign Out</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

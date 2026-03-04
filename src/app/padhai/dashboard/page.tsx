import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { BookOpen, Target, Flame, Calendar, ChevronRight, Upload, FileQuestion } from "lucide-react";
import Link from "next/link";

export default async function PadhaiDashboard() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/padhai/login");
  }

  // Get student data
  const studentResult = await pool.query(
    "SELECT * FROM padhai_students WHERE email = $1",
    [session.user.email]
  );

  const student = studentResult.rows[0];

  if (!student) {
    redirect("/padhai/onboarding");
  }

  // Get current week's goals
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

  const goalsResult = await pool.query(
    `SELECT * FROM padhai_weekly_goals 
     WHERE student_id = $1 
     AND week_start_date = $2`,
    [student.id, startOfWeek.toISOString().split('T')[0]]
  );

  const weeklyGoal = goalsResult.rows[0];

  // Get tasks for this week
  let tasks: any[] = [];
  if (weeklyGoal) {
    const tasksResult = await pool.query(
      "SELECT * FROM padhai_goal_tasks WHERE weekly_goal_id = $1",
      [weeklyGoal.id]
    );
    tasks = tasksResult.rows;
  }

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Motivational messages
  const messages = [
    "Every step forward counts. Keep going! 🚀",
    "Consistency is key. You're doing great! 💪",
    "Small progress is still progress. 🌱",
    "Your future self will thank you for today! ⭐",
    "Learning is a journey. Enjoy every bit! 📚",
  ];
  const dailyMessage = messages[today.getDay() % messages.length];

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Header */}
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
            <span className="text-sm text-slate-400">Hi, {student.name}</span>
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
                {student.streak_count} <span className="text-lg font-normal text-slate-400">days</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Best Streak</div>
              <div className="text-xl font-semibold text-white">{student.longest_streak} days</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-emerald-400">{dailyMessage}</p>
        </div>

        {/* Weekly Progress */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">This Week</h2>
            <span className="text-sm text-slate-400">{completedTasks}/{totalTasks} tasks</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-400">{progress}% complete</p>
        </div>

        {/* Quick Actions */}

        {/* Quick<div className="grid grid-cols-2 gap-4">
          <Link
            href="/padhai/photo"
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-center transition-all hover:border-emerald-500/30 hover:bg-slate-800/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <Upload className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="font-medium text-white">Upload Study Photo</span>
            <span className="text-xs text-slate-500">Add to your streak</span>
          </Link>

          <Link
            href="/padhai/quiz"
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-center transition-all hover:border-emerald-500/30 hover:bg-slate-800/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <FileQuestion className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="font-medium text-white">Take a Quiz</span>
            <span className="text-xs text-slate-500">Verify your knowledge</span>
          </Link>
        </div>

        {/* Today's Tasks */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Today&apos;s Tasks</h2>
            <Link href="/padhai/goals" className="text-sm text-emerald-400 hover:underline">
              View all
            </Link>
          </div>
          
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">No tasks set for this week yet</p>
              <Link
                href="/padhai/goals"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              >
                Set Weekly Goals
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-800/30 p-3"
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.status === 'done' 
                      ? 'border-emerald-500 bg-emerald-500' 
                      : 'border-slate-600'
                  }`}>
                    {task.status === 'done' && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${
                    task.status === 'done' ? 'text-slate-500 line-through' : 'text-white'
                  }`}>
                    {task.task_description || task.chapter_id}
                  </span>
                  {task.quiz_taken && (
                    <span className={`ml-auto text-xs px-2 py-1 rounded ${
                      task.quiz_score >= 70 ? 'bg-green-500/20 text-green-400' :
                      task.quiz_score >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {task.quiz_score}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Student Info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="text-sm text-slate-400">Target</div>
                <div className="font-medium text-white">
                  Class {student.class} • {student.exam_target}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span className="capitalize">{student.subjects?.join(", ")}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

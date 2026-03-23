"use client";

import { useState, useEffect } from "react";
import { Target, ChevronLeft, Check, Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  chapter_name: string;
  task_description: string;
  status: string;
  quiz_score: number | null;
  quiz_taken: boolean;
}

interface SuggestedChapter {
  id: string;
  name: string;
  subject_name: string;
  chapter_order: number;
}

export default function WeeklyGoalsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [suggestedChapters, setSuggestedChapters] = useState<SuggestedChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [hasExistingGoal, setHasExistingGoal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    try {
      const res = await fetch("/api/padhai/goals");
      const data = await res.json();
      
      if (data.weeklyGoal) {
        setTasks(data.tasks || []);
        setHasExistingGoal(true);
      }
      setSuggestedChapters(data.suggestedChapters || []);
      setWeekStart(data.weekStart);
      setWeekEnd(data.weekEnd);
    } catch (err) {
      console.error(err);
      setError("Could not load goals. Pull down to retry.");
    } finally {
      setLoading(false);
    }
  }

  async function saveGoals() {
    setSaving(true);
    const tasksToSave = selectedChapters.map(chapterId => ({
      chapterId,
      description: suggestedChapters.find(c => c.id === chapterId)?.name || ""
    }));

    try {
      const res = await fetch("/api/padhai/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: tasksToSave, weekStart })
      });
      
      if (res.ok) {
        window.location.href = "/padhai/dashboard";
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTask(taskId: string, currentStatus: string) {
    const newStatus = currentStatus === 'done' ? 'pending' : 'done';
    
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));

    try {
      await fetch("/api/padhai/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, status: newStatus })
      });
    } catch (err) {
      console.error(err);
    }
  }

  function toggleChapterSelection(chapterId: string) {
    setSelectedChapters(prev => 
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  }

  const completedCount = tasks.filter(t => t.status === 'done').length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
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
              <Target className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-bold text-white">Weekly Goals</span>
            </div>
          </div>
          {saving && <Loader2 className="h-4 w-4 text-emerald-500 animate-spin" />}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6 pb-24">
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={() => { setError(""); setLoading(true); fetchGoals(); }} className="mt-2 text-xs text-emerald-400 hover:underline">
              Try Again
            </button>
          </div>
        )}

        {/* Week Banner */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Target className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {hasExistingGoal ? "This Week's Goals" : "Set Your Weekly Goals"}
              </h2>
              <p className="text-sm text-slate-400">
                {weekStart} — {weekEnd}
              </p>
            </div>
          </div>
        </div>

        {/* Progress (if goals exist) */}
        {hasExistingGoal && tasks.length > 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-400">Your Progress</span>
              <span className="text-sm font-medium text-white">{completedCount} of {totalCount} completed</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress === 100 && (
              <p className="mt-3 text-sm text-emerald-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Amazing work! You've completed all your goals this week!
              </p>
            )}
          </div>
        )}

        {/* Current Tasks */}
        {hasExistingGoal && tasks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold text-white">Your Tasks</h3>
              <span className="text-xs text-slate-500">Tap to mark complete</span>
            </div>
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id, task.status)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                  task.status === 'done'
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  task.status === 'done'
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-600"
                }`}>
                  {task.status === 'done' && <Check className="h-4 w-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm block truncate ${
                    task.status === 'done' ? "text-slate-400 line-through" : "text-white"
                  }`}>
                    {task.chapter_name || task.task_description}
                  </span>
                </div>
                {task.quiz_taken && task.quiz_score !== null && (
                  <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                    task.quiz_score >= 70 ? 'bg-green-500/20 text-green-400' :
                    task.quiz_score >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {task.quiz_score}%
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Add Goals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-white">
              {hasExistingGoal ? "Add More Goals" : "Choose What to Study This Week"}
            </h3>
          </div>

          {suggestedChapters.length > 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-slate-300">AI Recommendations based on your syllabus</span>
              </div>
              <div className="space-y-2">
                {suggestedChapters.slice(0, 8).map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => toggleChapterSelection(chapter.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      selectedChapters.includes(chapter.id)
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedChapters.includes(chapter.id)
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-slate-600"
                    }`}>
                      {selectedChapters.includes(chapter.id) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white block truncate">{chapter.name}</span>
                      <span className="text-xs text-slate-500">{chapter.subject_name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 text-center">
              <p className="text-slate-400">No chapter suggestions available. Complete your syllabus setup first.</p>
              <Link href="/padhai/syllabus" className="text-emerald-400 text-sm hover:underline mt-2 inline-block">
                View Syllabus →
              </Link>
            </div>
          )}

          {selectedChapters.length > 0 && (
            <button
              onClick={saveGoals}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Add {selectedChapters.length} Goal{selectedChapters.length > 1 ? 's' : ''}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </main>

      {/* Floating Done Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
        <Link
          href="/padhai/dashboard"
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-full shadow-lg transition-all hover:scale-105"
        >
          <Check className="h-5 w-5" />
          Done
        </Link>
      </div>
    </div>
  );
}

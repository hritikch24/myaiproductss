"use client";

import { useState, useEffect } from "react";
import { Target, ChevronLeft, Check, Loader2, Plus, X, Sparkles } from "lucide-react";
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
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    
    // Update UI immediately
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
      {/* Header */}
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

      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Week Info */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <p className="text-sm text-slate-400">
            Week of <span className="text-white font-medium">{weekStart}</span> to <span className="text-white font-medium">{weekEnd}</span>
          </p>
        </div>

        {/* Current Progress (if goals exist) */}
        {hasExistingGoal && tasks.length > 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">This Week&apos;s Progress</h2>
              <span className="text-sm text-slate-400">{completedCount}/{totalCount} tasks</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Tasks */}
        {hasExistingGoal && tasks.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Your Tasks</h2>
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
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  task.status === 'done'
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-600"
                }`}>
                  {task.status === 'done' && <Check className="h-4 w-4 text-white" />}
                </div>
                <div className="flex-1">
                  <span className={`text-sm ${
                    task.status === 'done' ? "text-slate-400 line-through" : "text-white"
                  }`}>
                    {task.chapter_name || task.task_description}
                  </span>
                </div>
                {task.quiz_taken && task.quiz_score !== null && (
                  <span className={`text-xs px-2 py-1 rounded ${
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

        {/* Set Goals / Add More */}
        {!hasExistingGoal || showSuggestions ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {hasExistingGoal ? "Add More Tasks" : "Set Your Weekly Goals"}
              </h2>
              {suggestedChapters.length > 0 && (
                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="flex items-center gap-2 text-sm text-emerald-400 hover:underline"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Suggestions
                </button>
              )}
            </div>

            {showSuggestions && suggestedChapters.length > 0 && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="text-sm text-emerald-400 mb-3">
                  Suggested chapters based on your syllabus progress:
                </p>
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
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedChapters.includes(chapter.id)
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-600"
                      }`}>
                        {selectedChapters.includes(chapter.id) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <span className="text-sm text-white">{chapter.name}</span>
                        <span className="text-xs text-slate-500 ml-2">({chapter.subject_name})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedChapters.length > 0 && (
              <button
                onClick={saveGoals}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Save {selectedChapters.length} Tasks
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowSuggestions(true)}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-700 p-4 text-sm text-slate-400 hover:border-slate-600 hover:text-white transition-all"
          >
            <Plus className="h-4 w-4" />
            Add More Tasks
          </button>
        )}
      </main>
    </div>
  );
}

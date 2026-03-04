"use client";

import { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, Check, Loader2 } from "lucide-react";
import Link from "next/link";

interface Chapter {
  id: string;
  name: string;
  chapter_order: number;
  estimated_hours: number;
}

export default function MySyllabusPage() {
  const [subjects, setSubjects] = useState<Record<string, Chapter[]>>({});
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [examTarget, setExamTarget] = useState("");
  const [studentClass, setStudentClass] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Get student info
        const studentRes = await fetch("/api/padhai/student");
        const studentData = await studentRes.json();
        
        if (!studentData.student) {
          window.location.href = "/padhai/onboarding";
          return;
        }

        setExamTarget(studentData.student.exam_target);
        setStudentClass(studentData.student.class);
        setCompletedChapters(studentData.student.completed_chapters || []);

        // Get chapters
        const chaptersRes = await fetch(`/api/padhai/chapters?class=${studentData.student.class}&exam=${studentData.student.exam_target}`);
        const chaptersData = await chaptersRes.json();
        setSubjects(chaptersData.subjects || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function toggleChapter(chapterId: string) {
    setSaving(true);
    const newCompleted = completedChapters.includes(chapterId)
      ? completedChapters.filter(id => id !== chapterId)
      : [...completedChapters, chapterId];
    
    setCompletedChapters(newCompleted);

    try {
      await fetch("/api/padhai/chapters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedChapters: newCompleted }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const totalChapters = Object.values(subjects).flat().length;
  const completedCount = completedChapters.length;
  const progress = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                My Syllabus
              </span>
            </div>
          </div>
          {saving && <Loader2 className="h-4 w-4 text-emerald-500 animate-spin" />}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Progress Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Syllabus Progress</h2>
            <span className="text-sm text-slate-400">{completedCount}/{totalChapters} chapters</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Class {studentClass} • {examTarget} • Tap chapters to mark as completed
          </p>
        </div>

        {/* Subjects */}
        {Object.entries(subjects).map(([subjectName, chapters]) => (
          <div key={subjectName} className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                subjectName === "Physics" ? "bg-blue-500" :
                subjectName === "Chemistry" ? "bg-green-500" :
                subjectName === "Mathematics" ? "bg-purple-500" :
                "bg-orange-500"
              }`} />
              {subjectName}
              <span className="text-sm font-normal text-slate-500 ml-auto">
                {chapters.filter(c => completedChapters.includes(c.id)).length}/{chapters.length}
              </span>
            </h3>
            <div className="space-y-2">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => toggleChapter(chapter.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    completedChapters.includes(chapter.id)
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    completedChapters.includes(chapter.id)
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-slate-600"
                  }`}>
                    {completedChapters.includes(chapter.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm ${
                      completedChapters.includes(chapter.id) ? "text-slate-400" : "text-white"
                    }`}>
                      {chapter.chapter_order}. {chapter.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {chapter.estimated_hours}h
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

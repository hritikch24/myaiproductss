"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileQuestion, ChevronLeft, Loader2, Check, X, Trophy, ArrowLeft } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
  difficulty: string;
  chapterId: string;
  studentAnswer?: string;
  isCorrect?: boolean;
}

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chapterId = searchParams.get("chapterId");
  const taskId = searchParams.get("taskId");
  const chapterName = searchParams.get("chapterName") || "Quiz";

  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [submitted, setSubmitted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (chapterId) {
      startQuiz();
    }
  }, [chapterId]);

  // Show chapter selection if no chapterId provided
  if (!chapterId) {
    return <ChapterSelect />;
  }

  useEffect(() => {
    if (loading || submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion(true);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, submitted, currentIndex, timeLeft]);

  async function startQuiz() {
    setLoading(true);
    try {
      const res = await fetch("/api/padhai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterId, taskId }),
      });
      
      const data = await res.json();
      
      if (data.questions) {
        setQuizId(data.quizId);
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(null));
      } else {
        alert(data.error || "Failed to generate quiz");
        router.push("/padhai/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to start quiz");
      router.push("/padhai/dashboard");
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(answer: string) {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
  }

  const handleNextQuestion = useCallback((autoSubmit = false) => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(10);
    } else {
      submitQuiz();
    }
  }, [currentIndex, questions.length]);

  async function submitQuiz() {
    setSubmitted(true);
    
    try {
      const res = await fetch("/api/padhai/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, answers }),
      });
      
      const data = await res.json();
      setResult(data);

      // Update task if there's a taskId
      if (taskId) {
        await fetch("/api/padhai/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            taskId, 
            status: 'done', 
            quizScore: data.score,
            quizTaken: true 
          }),
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Generating quiz questions...</p>
        </div>
      </div>
    );
  }

  if (submitted && result) {
    const scoreColor = result.score >= 70 ? "text-green-400" : result.score >= 40 ? "text-yellow-400" : "text-red-400";
    
    return (
      <div className="min-h-screen bg-[#030712]">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <div className="mx-auto max-w-2xl px-4 py-4 flex items-center justify-between">
            <button onClick={() => router.push("/padhai/dashboard")} className="flex items-center gap-2 text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl px-4 py-8">
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold ${scoreColor} mb-2`}>
              {result.score}%
            </div>
            <p className="text-slate-400">
              {result.correctCount} out of {result.totalQuestions} correct
            </p>
            <div className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-medium ${
              result.verificationStatus === 'genuine' ? 'bg-green-500/20 text-green-400' :
              result.verificationStatus === 'partial' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {result.verificationStatus === 'genuine' ? '✓ Well studied!' :
               result.verificationStatus === 'partial' ? '⚠ Keep practicing' :
               '📚 Need more revision'}
            </div>
          </div>

          <div className="space-y-4">
            {result.questions.map((q: Question, index: number) => (
              <div key={index} className={`p-4 rounded-lg border ${
                q.studentAnswer === q.correct_answer 
                  ? "border-green-500/30 bg-green-500/5" 
                  : "border-red-500/30 bg-red-500/5"
              }`}>
                <div className="flex items-start gap-3">
                  {q.studentAnswer === q.correct_answer ? (
                    <Check className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-white text-sm mb-2">{index + 1}. {q.question}</p>
                    <p className="text-slate-400 text-xs">
                      Your answer: <span className={q.studentAnswer === q.correct_answer ? "text-green-400" : "text-red-400"}>
                        {q.studentAnswer || "Not answered"}
                      </span>
                      {q.studentAnswer !== q.correct_answer && (
                        <span className="text-green-400 ml-2">Correct: {q.correct_answer}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push("/padhai/dashboard")}
            className="w-full mt-8 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600"
          >
            Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-[#030712]">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/padhai/dashboard")} className="text-slate-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <FileQuestion className="h-5 w-5 text-emerald-500" />
            <span className="text-white font-medium">{chapterName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">
              {currentIndex + 1}/{questions.length}
            </span>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
              timeLeft <= 3 ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
            }`}>
              {timeLeft}
            </div>
          </div>
        </div>
      </header>

      <div className="h-1 bg-slate-800">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const isSelected = answers[currentIndex] === optionLetter;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(optionLetter)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text{
                    isSelected ? "bg-emerald-500 text-white" : "-sm font-medium $bg-slate-800 text-slate-400"
                  }`}>
                    {optionLetter}
                  </div>
                  <span className="text-white">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                setTimeLeft(10);
              }
            }}
            disabled={currentIndex === 0}
            className="flex-1 py-3 rounded-lg border border-slate-700 text-slate-400 hover:border-slate-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handleNextQuestion()}
            className="flex-1 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600"
          >
            {currentIndex === questions.length - 1 ? "Submit Quiz" : "Next Question"}
          </button>
        </div>
      </main>
    </div>
  );
}

function ChapterSelect() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Record<string, { id: string; name: string }[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChapters() {
      try {
        const res = await fetch("/api/padhai/chapters");
        const data = await res.json();
        setSubjects(data.subjects || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchChapters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const allChapters = Object.entries(subjects).flatMap(([subject, chapters]) =>
    chapters.map((ch: any) => ({ ...ch, subject }))
  );

  return (
    <div className="min-h-screen bg-[#030712]">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center gap-2">
          <button onClick={() => router.push("/padhai/dashboard")} className="text-slate-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <FileQuestion className="h-5 w-5 text-emerald-500" />
          <span className="text-white font-medium">Select Chapter for Quiz</span>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-slate-400 mb-6">Choose a chapter to start your quick quiz:</p>
        <div className="space-y-6">
          {Object.entries(subjects).map(([subjectName, chapters]) => (
            <div key={subjectName}>
              <h3 className="text-lg font-semibold text-white mb-3">{subjectName}</h3>
              <div className="space-y-2">
                {chapters.slice(0, 5).map((chapter: any) => (
                  <button
                    key={chapter.id}
                    onClick={() => router.push(`/padhai/quiz?chapterId=${chapter.id}&chapterName=${encodeURIComponent(chapter.name)}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/30 hover:border-emerald-500 text-left transition-all"
                  >
                    <FileQuestion className="h-5 w-5 text-emerald-500" />
                    <span className="text-white">{chapter.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {allChapters.length > 15 && (
          <p className="text-slate-500 text-sm mt-4 text-center">
            Showing first 15 chapters. More chapters available in your syllabus.
          </p>
        )}
      </main>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}

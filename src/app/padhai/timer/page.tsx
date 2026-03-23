"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Play, Pause, RotateCcw, Coffee, Brain, Target, Flame } from "lucide-react";
import Link from "next/link";

type TimerMode = "study" | "shortBreak" | "longBreak";

const TIMER_DURATIONS = {
  study: 45 * 60,
  shortBreak: 10 * 60,
  longBreak: 30 * 60,
};

const MOTIVATIONAL_MESSAGES = [
  "Focus on one topic at a time. You've got this!",
  "Every minute of focused study counts.",
  "Small steps lead to big achievements.",
  "Your future self will thank you for this effort.",
  "Consistency beats intensity. Keep showing up!",
];

const BREAK_MESSAGES = [
  "Take a deep breath. You've earned this break!",
  "Stretch your body. Stay healthy!",
  "Drink some water. Stay hydrated!",
  "Look away from the screen for 30 seconds.",
  "Remember: rest is part of the process.",
];

export default function StudyTimer() {
  const [mode, setMode] = useState<TimerMode>("study");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.study);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  function handleTimerComplete() {
    setIsRunning(false);
    setShowComplete(true);

    if (mode === "study") {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      
      if (newSessions % 3 === 0) {
        setMode("longBreak");
        setTimeLeft(TIMER_DURATIONS.longBreak);
      } else {
        setMode("shortBreak");
        setTimeLeft(TIMER_DURATIONS.shortBreak);
      }
    } else {
      setMode("study");
      setTimeLeft(TIMER_DURATIONS.study);
    }
  }

  function toggleTimer() {
    setIsRunning(!isRunning);
    setShowComplete(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
    setShowComplete(false);
  }

  function switchMode(newMode: TimerMode) {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setShowComplete(false);
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  const progress = ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100;
  const message = mode === "study" 
    ? MOTIVATIONAL_MESSAGES[sessionsCompleted % MOTIVATIONAL_MESSAGES.length]
    : BREAK_MESSAGES[sessionsCompleted % BREAK_MESSAGES.length];

  return (
    <div className="min-h-screen bg-[#030712]">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/padhai/dashboard" className="text-slate-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-bold text-white">Study Timer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/20">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-orange-400 font-medium">{sessionsCompleted} sessions</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-8">
        {/* Mode Selector */}
        <div className="flex rounded-lg bg-slate-800 p-1 mb-8">
          <button
            onClick={() => switchMode("study")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === "study" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Brain className="h-4 w-4 inline mr-2" />
            Study
          </button>
          <button
            onClick={() => switchMode("shortBreak")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === "shortBreak" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Coffee className="h-4 w-4 inline mr-2" />
            Short Break
          </button>
          <button
            onClick={() => switchMode("longBreak")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              mode === "longBreak" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Coffee className="h-4 w-4 inline mr-2" />
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto rounded-full border-4 border-slate-800 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-800"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                className={mode === "study" ? "text-emerald-500" : "text-blue-500"}
              />
            </svg>
            <div className="text-center">
              <div className="text-5xl font-bold text-white tracking-wider">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-slate-400 mt-2">
                {mode === "study" ? "Focus time" : mode === "shortBreak" ? "Short break" : "Long break"}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={resetTimer}
            className="p-4 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-6 w-6" />
          </button>
          <button
            onClick={toggleTimer}
            className={`p-6 rounded-full text-white transition-all ${
              isRunning 
                ? "bg-orange-500 hover:bg-orange-600" 
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {isRunning ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </button>
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-slate-400 text-sm">{message}</p>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-500" />
            Pomodoro Technique
          </h3>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>• 45 min focused study → 10 min break</li>
            <li>• After 3 cycles → 30 min long break</li>
            <li>• During break: stretch, hydrate, rest eyes</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

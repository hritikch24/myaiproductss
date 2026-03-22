"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, User, Mail, BookOpen, Target, Flame, Calendar, Award, Settings, LogOut, Camera, X, Loader2, KeyRound, Copy, CheckCircle, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showCamera && videoRef.current) {
      startCamera();
    }
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

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

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  }

  function capturePhoto() {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(100, 100, 100, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(video, 0, 0, 200, 200);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        uploadProfileImage(dataUrl);
        stopCamera();
      }
    }
  }

  function stopCamera() {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function uploadProfileImage(base64Image: string) {
    setUploading(true);
    try {
      const res = await fetch("/api/padhai/profile/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await res.json();
      if (data.success) {
        setStudent((prev: any) => ({ ...prev, profile_image: base64Image }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  async function updateStudent(updates: Record<string, string>) {
    try {
      const res = await fetch("/api/padhai/student", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setStudent((prev: any) => ({ ...prev, ...data.student }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (showCamera) {
    return (
      <div className="min-h-screen bg-[#030712]">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={stopCamera} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              <span className="text-lg font-bold text-white">Take Photo</span>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-md px-4 py-8">
          <div className="relative rounded-xl overflow-hidden bg-black">
            <video ref={videoRef} autoPlay playsInline className="w-full" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex justify-center mt-6">
            <button
              onClick={capturePhoto}
              disabled={uploading}
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 w-16 h-16 text-white hover:bg-emerald-600"
            >
              {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
            </button>
          </div>
        </main>
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
        {/* Profile Card with Image */}
        <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {student?.profile_image ? (
                <img 
                  src={student.profile_image} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500/30 flex items-center justify-center text-emerald-400 text-4xl font-bold">
                  {student?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <button
                onClick={() => setShowCamera(true)}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">
              {student?.role === 'parent' ? (student?.parent?.name || "Parent") : (student?.name || "Student")}
            </h2>
            <p className="text-sm text-slate-400">
              {student?.role === 'parent'
                ? `Parent • Tracking ${student?.name}`
                : `${student?.class}th Grade • ${student?.exam_target}`}
            </p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              capture="user"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-3 text-xs text-emerald-400 hover:underline"
            >
              {uploading ? "Uploading..." : "Change Photo"}
            </button>
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
              <div className="flex-1">
                <div className="text-xs text-slate-500">Class</div>
                <div className="flex items-center gap-2">
                  <select
                    value={student?.class || ""}
                    onChange={(e) => updateStudent({ class: e.target.value })}
                    className="bg-transparent text-white border-none outline-none cursor-pointer"
                  >
                    <option value="6" className="bg-slate-800">Class 6</option>
                    <option value="7" className="bg-slate-800">Class 7</option>
                    <option value="8" className="bg-slate-800">Class 8</option>
                    <option value="9" className="bg-slate-800">Class 9</option>
                    <option value="10" className="bg-slate-800">Class 10</option>
                    <option value="11" className="bg-slate-800">Class 11</option>
                    <option value="12" className="bg-slate-800">Class 12</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-slate-500" />
              <div className="flex-1">
                <div className="text-xs text-slate-500">Board</div>
                <select
                  value={student?.board || "CBSE"}
                  onChange={(e) => updateStudent({ board: e.target.value })}
                  className="bg-transparent text-white border-none outline-none cursor-pointer"
                >
                  <option value="CBSE" className="bg-slate-800">CBSE</option>
                  <option value="ICSE" className="bg-slate-800">ICSE</option>
                  <option value="STATE" className="bg-slate-800">State Board</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-slate-500" />
              <div className="flex-1">
                <div className="text-xs text-slate-500">Target Exam</div>
                <select
                  value={student?.exam_target || ""}
                  onChange={(e) => updateStudent({ exam_target: e.target.value })}
                  className="bg-transparent text-white border-none outline-none cursor-pointer"
                >
                  <option value="JEE" className="bg-slate-800">JEE (Engineering)</option>
                  <option value="NEET" className="bg-slate-800">NEET (Medical)</option>
                  <option value="BOARDS_ONLY" className="bg-slate-800">Board Exams Only</option>
                </select>
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

        {/* Invite Code — students only */}
        {student?.role !== 'parent' && student?.invite_code && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Parent Invite Code</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-purple-400" />
                <span className="text-xl font-mono font-bold text-white tracking-widest">
                  {student.invite_code}
                </span>
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
                  <><CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Copied</>
                ) : (
                  <><Copy className="h-3.5 w-3.5" /> Copy</>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Share this code with your parent so they can track your progress
            </p>
          </div>
        )}

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
              signOut({ callbackUrl: "/padhai/login" });
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

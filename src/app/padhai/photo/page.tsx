"use client";

import { useState, useRef } from "react";
import { Upload, ChevronLeft, Loader2, Check, Flame, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhotoUploadPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [streak, setStreak] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!photoUrl) return;
    
    setUploading(true);
    try {
      const res = await fetch("/api/padhai/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUploaded(true);
        setStreak(data.streak);
      } else {
        alert(data.error || "Failed to upload");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload");
    } finally {
      setUploading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // For demo purposes, we'll use a placeholder URL
      // In production, you'd upload to storage and get the URL
      const fakeUrl = `https://placeholder.com/study-${Date.now()}.jpg`;
      setPhotoUrl(fakeUrl);
    }
  }

  const motivationalMessages = [
    "Every photo adds to your journey! 📸",
    "Consistency is building! Keep it up! 💪",
    "Your study moments matter! 🌟",
    "Another day, another step forward! 🚀",
    "Building habits that last! ✨",
  ];

  if (uploaded) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Photo Uploaded!</h2>
          <p className="text-slate-400 mb-6">
            Your streak is now <span className="text-emerald-400 font-bold">{streak} days</span> 🔥
          </p>
          <p className="text-sm text-slate-500 mb-8">
            {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setUploaded(false);
                setPhotoUrl("");
              }}
              className="w-full py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-600"
            >
              Upload Another Photo
            </button>
            <button
              onClick={() => router.push("/padhai/dashboard")}
              className="w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
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
              <Upload className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-bold text-white">Upload Study Photo</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Share your study moment
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Upload a photo of your study setup to add to your daily streak. 
            Photos are automatically deleted after 7 days.
          </p>

          {/* Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragOver 
                ? "border-emerald-500 bg-emerald-500/10" 
                : "border-slate-700 hover:border-slate-600"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files[0];
              if (file) {
                const fakeUrl = `https://placeholder.com/study-${Date.now()}.jpg`;
                setPhotoUrl(fakeUrl);
              }
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            
            {photoUrl ? (
              <div className="space-y-4">
                <div className="w-full h-40 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                  <ImageIcon className="h-12 w-12 text-slate-600" />
                </div>
                <p className="text-sm text-emerald-400">Photo selected!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-slate-500" />
                </div>
                <div>
                  <p className="text-white mb-2">Drag & drop your study photo</p>
                  <p className="text-xs text-slate-500">or</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* URL Input Alternative */}
          <div className="mt-4">
            <label className="text-sm text-slate-400 mb-2 block">Or paste an image URL:</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!photoUrl || uploading}
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Flame className="h-4 w-4" />
                Upload & Add to Streak
              </>
            )}
          </button>

          <p className="text-xs text-slate-500 mt-4 text-center">
            By uploading, you agree to our photo guidelines. Photos are for accountability only.
          </p>
        </div>
      </main>
    </div>
  );
}

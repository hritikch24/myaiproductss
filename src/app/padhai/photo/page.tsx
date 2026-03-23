"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, ChevronLeft, Loader2, Check, Flame, Image as ImageIcon, AlertCircle, Camera, X, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhotoUploadPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [streak, setStreak] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkTodayStatus();
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

  async function checkTodayStatus() {
    try {
      const res = await fetch("/api/padhai/photos");
      const data = await res.json();
      if (data.uploadedToday) {
        setAlreadyUploaded(true);
        setStreak(data.streak || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function startCamera() {
    try {
      setCameraError("");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Could not access camera. Please use file upload instead.");
      setShowCamera(false);
    }
  }

  function capturePhoto() {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPhotoPreview(dataUrl);
        setPhotoUrl(dataUrl);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (alreadyUploaded) {
    return (
      <div className="min-h-screen bg-[#030712]">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/padhai/dashboard" className="text-slate-400 hover:text-white">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-emerald-500" />
                <span className="text-lg font-bold text-white">Study Photo</span>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-md px-4 py-8">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
            <Check className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Already Done Today!</h2>
            <p className="text-slate-300 mb-4">
              You've already added to your streak. Come back tomorrow!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <Flame className="h-5 w-5 text-emerald-500" />
              <span className="text-emerald-400 font-bold">{streak} day streak</span>
            </div>
          </div>

          <Link
            href="/padhai/dashboard"
            className="block w-full mt-6 py-3 text-center rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600"
          >
            Back to Dashboard
          </Link>
        </main>
      </div>
    );
  }

  if (uploaded) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Streak Updated!</h2>
          <p className="text-slate-400 mb-6">
            You're on a <span className="text-emerald-400 font-bold">{streak} day streak</span> 🔥
          </p>
          <Link
            href="/padhai/dashboard"
            className="inline-block py-3 px-6 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600"
          >
            Back to Dashboard
          </Link>
        </div>
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
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full"
            />
            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <p className="text-red-400 text-center px-4">{cameraError}</p>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={capturePhoto}
              disabled={!!cameraError}
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 w-16 h-16 text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              <Camera className="h-8 w-8" />
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
              <Upload className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-bold text-white">Study Photo</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20">
            <Flame className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-emerald-400 font-medium">Build streak</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-8">
        {photoPreview ? (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-700">
              <img src={photoPreview} alt="Preview" className="w-full" />
              <button 
                onClick={() => { setPhotoPreview(""); setPhotoUrl(""); }}
                className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Flame className="h-4 w-4" />
                  Add to Streak
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-white mb-1">Share Your Study Moment</h2>
              <p className="text-sm text-slate-400">Take a photo of your study setup to build your streak</p>
            </div>

            {/* Camera Button */}
            <button
              onClick={() => setShowCamera(true)}
              className="w-full flex items-center justify-center gap-3 rounded-lg bg-emerald-500 px-4 py-4 text-sm font-medium text-white hover:bg-emerald-600"
            >
              <Camera className="h-5 w-5" />
              Open Camera
            </button>

            <div className="relative text-center text-slate-500 text-sm">or</div>

            {/* File Upload with camera support */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-4 text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              <Upload className="h-5 w-5" />
              Choose from Gallery
            </button>

            {/* URL Input */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Or paste image URL:</label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

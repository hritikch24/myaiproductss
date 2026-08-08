"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Camera,
  FileText,
  Loader2,
  AlertTriangle,
  Check,
  Shield,
  Reply,
  ArrowLeft,
  Copy,
  CheckCheck,
  FileSearch,
  Clock,
  IndianRupee,
  Hash,
  Sparkles,
  X,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface ScamCheck {
  is_suspicious: boolean;
  confidence: string;
  reasons: string[];
}

interface Analysis {
  summary: string;
  document_type: string;
  from: string;
  urgency: string;
  urgency_reason: string;
  deadline: string | null;
  action_items: string[];
  scam_check: ScamCheck;
  reply_needed: boolean;
  reply_draft: string | null;
  key_amounts: string[];
  important_references: string[];
  explain_like_5: string;
}

const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi (हिंदी)" },
  { value: "Hinglish", label: "Hinglish" },
  { value: "Bengali", label: "Bengali (বাংলা)" },
  { value: "Tamil", label: "Tamil (தமிழ்)" },
  { value: "Telugu", label: "Telugu (తెలుగు)" },
  { value: "Marathi", label: "Marathi (मराठी)" },
];

function UrgencyBadge({ level }: { level: string }) {
  const config: Record<string, { bg: string; text: string; dot: string }> = {
    LOW: { bg: "bg-green-50 border-green-200", text: "text-green-700", dot: "bg-green-500" },
    MEDIUM: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
    HIGH: { bg: "bg-orange-50 border-orange-200", text: "text-orange-700", dot: "bg-orange-500" },
    CRITICAL: { bg: "bg-red-50 border-red-200", text: "text-red-700", dot: "bg-red-500 animate-pulse" },
  };
  const c = config[level] || config.LOW;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`h-2 w-2 rounded-full ${c.dot}`} />
      {level}
    </span>
  );
}

export default function DocSamajhoApp() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];
    if (!validTypes.includes(f.type) && !f.name.match(/\.(jpg|jpeg|png|webp|heic|heif|pdf)$/i)) {
      setError("Please upload an image (JPG, PNG) or PDF file.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError("File too large. Maximum 20MB.");
      return;
    }
    setFile(f);
    setError(null);
    setAnalysis(null);

    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const f = item.getAsFile();
        if (f) handleFile(f);
        break;
      }
    }
  }, [handleFile]);

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const res = await fetch("/doc-samajho/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setAnalysis(data.analysis);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyReply = async () => {
    if (!analysis?.reply_draft) return;
    await navigator.clipboard.writeText(analysis.reply_draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]" onPaste={handlePaste}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/doc-samajho" className="text-slate-400 hover:text-slate-600 transition-colors p-1 -ml-1">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-sm">
                <FileSearch className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-lg">
                Doc<span className="text-cyan-600">Samajho</span>
              </span>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        {!analysis ? (
          /* Upload Section */
          <div className="space-y-6">
            {/* Upload Zone */}
            <div
              className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 ${
                dragActive
                  ? "border-cyan-400 bg-cyan-50/50 scale-[1.01]"
                  : file
                  ? "border-cyan-300 bg-cyan-50/30"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="p-8 sm:p-12">
                {!file ? (
                  <div className="text-center">
                    <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-100 flex items-center justify-center mb-6">
                      <Upload className="h-8 w-8 text-cyan-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">
                      Upload Your Document
                    </h2>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">
                      Drop an image or PDF here, paste from clipboard, or use the buttons below
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        <Upload className="h-4 w-4" />
                        Choose File
                      </button>
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all"
                      >
                        <Camera className="h-4 w-4" />
                        Take Photo
                      </button>
                    </div>
                    <p className="mt-6 text-xs text-slate-400">
                      Supports JPG, PNG, WebP, HEIC, PDF &middot; Max 20MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {preview ? (
                      <div className="relative flex-shrink-0 w-full sm:w-48 h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={preview} alt="Document preview" className="h-full w-full object-contain" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-full sm:w-48 h-48 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2">
                        <FileText className="h-10 w-10 text-slate-400" />
                        <span className="text-xs text-slate-500">PDF Document</span>
                      </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-semibold text-slate-900 text-lg truncate max-w-xs">{file.name}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {(file.size / 1024).toFixed(0)} KB &middot; {file.type.split("/")[1]?.toUpperCase()}
                      </p>
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={analyze}
                          disabled={loading}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              Analyze Document
                            </>
                          )}
                        </button>
                        <button
                          onClick={reset}
                          disabled={loading}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-40"
                        >
                          <X className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-6">
                  <Loader2 className="h-7 w-7 text-cyan-500 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">AI is reading your document...</h3>
                <p className="text-slate-500 mt-2 text-sm">This usually takes 5-10 seconds</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["Reading text", "Checking urgency", "Finding deadlines", "Detecting scams", "Drafting reply"].map((step, i) => (
                    <span
                      key={step}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 animate-pulse"
                      style={{ animationDelay: `${i * 300}ms` }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {!file && !loading && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: ImageIcon, tip: "Clear photo of the full page works best" },
                  { icon: FileText, tip: "PDFs with selectable text give the best results" },
                  { icon: Camera, tip: "Good lighting + steady hand = better analysis" },
                ].map((item) => (
                  <div key={item.tip} className="flex items-start gap-3 rounded-2xl bg-white border border-slate-100 p-4">
                    <item.icon className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed">{item.tip}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-4">
            {/* Back button */}
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Analyze Another Document
            </button>

            {/* Document Info + Urgency */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {analysis.document_type}
                    </span>
                    <UrgencyBadge level={analysis.urgency} />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">From: <span className="font-medium text-slate-700">{analysis.from}</span></p>
                </div>
                {analysis.deadline && (
                  <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-2.5">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600 font-medium">Deadline</p>
                      <p className="text-sm font-semibold text-amber-800">{analysis.deadline}</p>
                    </div>
                  </div>
                )}
              </div>
              {analysis.urgency_reason && (
                <p className="mt-3 text-sm text-slate-500 bg-slate-50 rounded-xl p-3">{analysis.urgency_reason}</p>
              )}
            </div>

            {/* ELI5 Summary */}
            <div className="rounded-3xl bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200/60 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-xl bg-cyan-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">Simple Explanation</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{analysis.explain_like_5}</p>
            </div>

            {/* Detailed Summary */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-400" />
                Detailed Summary
              </h3>
              <p className="text-slate-600 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Action Items */}
            {analysis.action_items?.length > 0 && (
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-500" />
                  What You Need to Do
                </h3>
                <ol className="space-y-3">
                  {analysis.action_items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Scam Check */}
            <div className={`rounded-3xl border p-6 sm:p-8 ${
              analysis.scam_check?.is_suspicious
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                  analysis.scam_check?.is_suspicious ? "bg-red-100" : "bg-green-100"
                }`}>
                  <Shield className={`h-5 w-5 ${
                    analysis.scam_check?.is_suspicious ? "text-red-600" : "text-green-600"
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    analysis.scam_check?.is_suspicious ? "text-red-900" : "text-green-900"
                  }`}>
                    {analysis.scam_check?.is_suspicious ? "Suspicious Document" : "Looks Legitimate"}
                  </h3>
                  <p className={`text-sm ${
                    analysis.scam_check?.is_suspicious ? "text-red-600" : "text-green-600"
                  }`}>
                    Confidence: {analysis.scam_check?.confidence}
                  </p>
                </div>
              </div>
              {analysis.scam_check?.is_suspicious && analysis.scam_check.reasons?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {analysis.scam_check.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      {reason}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Key Amounts & References */}
            {(analysis.key_amounts?.length > 0 || analysis.important_references?.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {analysis.key_amounts?.length > 0 && (
                  <div className="rounded-3xl bg-white border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-slate-400" />
                      Amounts Mentioned
                    </h3>
                    <div className="space-y-2">
                      {analysis.key_amounts.map((amount, i) => (
                        <span key={i} className="inline-flex items-center rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-sm font-medium text-amber-800 mr-2">
                          {amount}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.important_references?.length > 0 && (
                  <div className="rounded-3xl bg-white border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Hash className="h-4 w-4 text-slate-400" />
                      Reference Numbers
                    </h3>
                    <div className="space-y-2">
                      {analysis.important_references.map((ref, i) => (
                        <span key={i} className="inline-flex items-center rounded-xl bg-slate-100 border border-slate-200 px-3 py-1.5 text-sm font-mono text-slate-700 mr-2">
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reply Draft */}
            {analysis.reply_needed && analysis.reply_draft && (
              <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Reply className="h-5 w-5 text-blue-500" />
                    Suggested Reply
                  </h3>
                  <button
                    onClick={copyReply}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="h-3.5 w-3.5 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-2xl bg-blue-50/50 border border-blue-100 p-5">
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{analysis.reply_draft}</p>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Review and customize this draft before sending. Replace any [PLACEHOLDERS] with your actual information.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="rounded-2xl bg-amber-50/50 border border-amber-200/50 p-4">
              <p className="text-xs text-amber-700/80 leading-relaxed">
                <strong>Note:</strong> This is an AI-generated analysis for informational purposes only. For important legal, financial, or medical documents, consult a qualified professional.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

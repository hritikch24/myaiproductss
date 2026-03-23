"use client";

import { useState, useEffect } from "react";
import { Users, ChevronLeft, Loader2, Check, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ParentSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [language, setLanguage] = useState("hinglish");

  useEffect(() => {
    fetchParent();
  }, []);

  async function fetchParent() {
    try {
      const res = await fetch("/api/padhai/parent");
      const data = await res.json();
      
      if (data.parent) {
        setParentName(data.parent.name || "");
        setParentEmail(data.parent.email || "");
        setWhatsappNumber(data.parent.whatsapp_number || "");
        setLanguage(data.parent.language_preference || "hinglish");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!parentName || !parentEmail) return;
    
    setSaving(true);
    try {
      const res = await fetch("/api/padhai/parent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          parentEmail,
          whatsappNumber,
          language,
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert(data.error || "Failed to save");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save");
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
              <Users className="h-5 w-5 text-emerald-500" />
              <span className="text-lg font-bold text-white">Parent Reports</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Keep your parent updated
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Add your parent&apos;s details so they receive a weekly progress report every Sunday.
            Reports are calm, encouraging, and focused on progress — not pressure.
          </p>

          <div className="space-y-4">
            {/* Parent Name */}
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">
                Parent&apos;s Name
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g., Rahul's Mother"
                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Parent Email */}
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">
                <Mail className="w-4 h-4 inline mr-1" />
                Parent&apos;s Email
              </label>
              <input
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* WhatsApp (Optional) */}
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">
                <Phone className="w-4 h-4 inline mr-1" />
                WhatsApp Number (Optional)
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Coming soon - WhatsApp reports will be sent here
              </p>
            </div>

            {/* Language */}
            <div>
              <label className="text-sm text-slate-400 mb-1.5 block">
                Report Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi (हिंदी)</option>
                <option value="hinglish">Hinglish (Mix)</option>
              </select>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!parentName || !parentEmail || saving}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved!
                </>
              ) : (
                "Save Parent Settings"
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="text-sm font-medium text-slate-400 mb-3">
            Sample Report Preview
          </h3>
          <div className="p-4 rounded-lg bg-slate-800/50 text-sm text-slate-300">
            <p className="mb-2">📚 <strong>Weekly Update</strong></p>
            <p className="mb-2">This week: Completed 5/7 tasks. Streak: 12 days 🔥</p>
            <p className="mb-2">📖 <strong>Subjects:</strong> Physics, Chemistry</p>
            <p className="mb-2">💡 <strong>Tip:</strong> Try asking &quot;What was interesting today?&quot; instead of &quot;How much did you study?&quot;</p>
            <p className="text-xs text-slate-500 mt-4">
              Reports are sent every Sunday at 7 PM
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

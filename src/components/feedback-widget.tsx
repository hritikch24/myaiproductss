"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/legal-docs/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          email: email.trim() || undefined,
          pagePath: window.location.pathname,
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("sent");
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        setMessage("");
        setEmail("");
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:scale-105"
      >
        <MessageSquare className="h-4 w-4" />
        Feedback
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              if (status !== "sending") {
                setOpen(false);
                setStatus("idle");
              }
            }}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
            <button
              onClick={() => {
                setOpen(false);
                setStatus("idle");
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-semibold text-white mb-1">Send Feedback</h3>
            <p className="text-sm text-slate-400 mb-4">
              We&apos;d love to hear from you. What can we improve?
            </p>

            {status === "sent" ? (
              <div className="text-center py-8">
                <p className="text-lg font-medium text-green-400">Thanks!</p>
                <p className="text-sm text-slate-400 mt-1">Your feedback has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your feedback..."
                    maxLength={1000}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                  />
                  <p className="mt-1 text-xs text-slate-500 text-right">
                    {message.length}/1000
                  </p>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {status === "error" && (
                  <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending" || !message.trim()}
                  className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Submit Feedback"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

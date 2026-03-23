"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  inviteCode?: string; // if provided, acts as parent (public, no auth)
}

const SUGGESTIONS_STUDENT = [
  "How am I doing this week?",
  "What should I study next?",
  "How's my Physics progress?",
  "Give me a study plan for today",
];

const SUGGESTIONS_PARENT = [
  "How is my child doing?",
  "What did they study this week?",
  "Which subjects need attention?",
  "Is their streak going well?",
];

export default function ChatWidget({ inviteCode }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isParent = !!inviteCode;
  const suggestions = isParent ? SUGGESTIONS_PARENT : SUGGESTIONS_STUDENT;

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/padhai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          ...(inviteCode ? { inviteCode } : {}),
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: data.error || "Sorry, I couldn't respond. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Network error. Please check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] h-[100dvh] sm:h-[520px] flex flex-col bg-[#0a0f1a] sm:rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white">Padhai AI</span>
                <span className="block text-[10px] text-emerald-400">
                  {isParent ? "Parent Assistant" : "Study Buddy"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 mb-3">
                    <Sparkles className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-sm text-white font-medium">
                    {isParent
                      ? "Ask me anything about your child's progress"
                      : "Hey! Ask me about your progress"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    I know your {isParent ? "child's " : ""}stats, quizzes, and goals
                  </p>
                </div>

                <div className="space-y-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="w-full text-left px-3 py-2.5 rounded-lg border border-slate-700/50 bg-slate-800/30 text-sm text-slate-300 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-500 text-white rounded-br-md"
                      : "bg-slate-800/80 text-slate-200 rounded-bl-md border border-slate-700/50"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 mt-0.5">
                    <User className="h-3.5 w-3.5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t border-slate-800 bg-slate-900/50"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isParent ? "Ask about your child..." : "Ask anything..."}
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getKraftSessionId } from "./KraftAITracker";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function KraftAIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm KraftAI's assistant. Ask me about our services, pricing, or timelines. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/kraftai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          session_id: getKraftSessionId() || `chat-${Date.now()}`,
          history: newMessages.slice(-8),
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply || "Sorry, please try again." }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Connection error. Please reach us on WhatsApp at +91 8859820935." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const quickQuestions = [
    "What are your prices?",
    "How fast can you deliver?",
    "Do I own the code?",
    "I have a project idea",
  ];

  return (
    <>
      <style>{`
        .kc-fab {
          position: fixed; bottom: 24px; right: 24px; z-index: 9999;
          width: 56px; height: 56px; border-radius: 16px;
          background: linear-gradient(135deg, #635bff, #00d4aa);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 24px rgba(99,91,255,0.4);
          transition: all 0.3s; color: #fff;
        }
        .kc-fab:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(99,91,255,0.5); }
        .kc-pulse {
          position: absolute; inset: -4px; border-radius: 20px;
          border: 2px solid rgba(99,91,255,0.6);
          animation: kcPulse 2s infinite;
        }
        @keyframes kcPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0; } }

        .kc-badge {
          position: absolute; top: -4px; right: -4px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #ff6b35; border: 2px solid #09090b;
        }

        .kc-window {
          position: fixed; bottom: 92px; right: 24px; z-index: 9999;
          width: 380px; max-height: 520px;
          background: #0f0f12; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 12px 48px rgba(0,0,0,0.6);
          animation: kcSlideUp 0.3s ease;
        }
        @keyframes kcSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

        .kc-header {
          background: linear-gradient(135deg, #635bff, #4840d4);
          padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
        }
        .kc-header-title { color: #fff; font-size: 15px; font-weight: 700; }
        .kc-header-sub { color: rgba(255,255,255,0.7); font-size: 11px; margin-top: 2px; }
        .kc-close { background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 20px; padding: 4px; }
        .kc-close:hover { color: #fff; }

        .kc-messages {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
          max-height: 340px; min-height: 200px;
        }
        .kc-msg {
          max-width: 85%; padding: 10px 14px;
          border-radius: 12px; font-size: 13px; line-height: 1.6;
          word-wrap: break-word;
        }
        .kc-msg-user {
          align-self: flex-end;
          background: #635bff; color: #fff;
          border-bottom-right-radius: 4px;
        }
        .kc-msg-assistant {
          align-self: flex-start;
          background: #1e1e23; color: #e4e4e7;
          border-bottom-left-radius: 4px;
        }
        .kc-typing {
          align-self: flex-start; background: #1e1e23; color: #a1a1aa;
          padding: 10px 14px; border-radius: 12px; font-size: 13px;
          border-bottom-left-radius: 4px;
        }
        .kc-typing-dots span { animation: kcDot 1.4s infinite; }
        .kc-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .kc-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes kcDot { 0%,80%,100% { opacity: 0.3; } 40% { opacity: 1; } }

        .kc-quick { padding: 0 16px 12px; display: flex; gap: 6px; flex-wrap: wrap; }
        .kc-quick-btn {
          font-size: 11px; padding: 6px 12px; border-radius: 999px;
          background: rgba(99,91,255,0.1); border: 1px solid rgba(99,91,255,0.2);
          color: #a78bfa; cursor: pointer; transition: all 0.2s;
          font-family: inherit;
        }
        .kc-quick-btn:hover { background: rgba(99,91,255,0.2); border-color: #635bff; }

        .kc-input-area {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 12px 16px; display: flex; gap: 8px;
        }
        .kc-input {
          flex: 1; background: #1e1e23; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 10px 14px; color: #fafafa;
          font-size: 13px; outline: none; font-family: inherit;
          transition: border-color 0.2s;
        }
        .kc-input:focus { border-color: #635bff; }
        .kc-input::placeholder { color: #52525b; }
        .kc-send {
          width: 38px; height: 38px; border-radius: 10px;
          background: #635bff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; color: #fff; flex-shrink: 0;
        }
        .kc-send:hover { background: #7c75ff; }
        .kc-send:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 480px) {
          .kc-window { right: 8px; left: 8px; width: auto; bottom: 84px; max-height: 70vh; }
          .kc-fab { bottom: 16px; right: 16px; }
        }
      `}</style>

      {open && (
        <div className="kc-window">
          <div className="kc-header">
            <div>
              <div className="kc-header-title">KraftAI Assistant</div>
              <div className="kc-header-sub">Typically replies instantly</div>
            </div>
            <button className="kc-close" onClick={() => setOpen(false)}>&times;</button>
          </div>

          <div className="kc-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`kc-msg ${m.role === "user" ? "kc-msg-user" : "kc-msg-assistant"}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="kc-typing">
                <span className="kc-typing-dots"><span>.</span><span>.</span><span>.</span></span>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="kc-quick">
              {quickQuestions.map((q, i) => (
                <button key={i} className="kc-quick-btn" onClick={() => { setInput(q); setTimeout(() => { setInput(q); }, 0); }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="kc-input-area">
            <input
              className="kc-input"
              placeholder="Ask about pricing, services..."
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              maxLength={500}
              disabled={loading}
            />
            <button className="kc-send" onClick={sendMessage} disabled={loading || !input.trim()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>
      )}

      <button className="kc-fab" onClick={() => { setOpen(!open); setShowPulse(false); }} aria-label="Chat with us">
        {showPulse && <span className="kc-pulse" />}
        {!open && messages.length <= 1 && <span className="kc-badge" />}
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>
    </>
  );
}

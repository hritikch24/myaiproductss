"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Send,
  ArrowLeft,
  Bot,
  User,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  Menu,
  X,
  Sparkles,
  Mic,
  MicOff,
} from "lucide-react";

interface Agent {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  system_prompt: string;
  icon: string;
  personality_tone: string;
}

interface Message {
  id?: number;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
  streaming?: boolean;
}

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

function getSessionId(slug: string): string {
  const key = `agent_session_${slug}`;
  if (typeof window === "undefined") return generateSessionId();
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(key, id);
  }
  return id;
}

// Simple markdown-like rendering
function renderContent(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-white/10 rounded text-orange-300 text-sm">$1</code>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-white mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-white mt-4 mb-2">$1</h1>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc text-gray-300">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 list-decimal text-gray-300">$2</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, "<br/>");
}

function MessageBubble({ message, agentIcon }: { message: Message; agentIcon: string }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  function handleCopy() {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""} mb-4`}>
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm ${
          isUser
            ? "bg-orange-500/20 border border-orange-500/30"
            : "bg-white/5 border border-white/10"
        }`}
      >
        {isUser ? <User className="w-4 h-4 text-orange-400" /> : <span>{agentIcon}</span>}
      </div>
      <div className={`max-w-[85%] sm:max-w-[75%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-orange-500 text-white rounded-tr-md"
              : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-md"
          }`}
        >
          {message.streaming && !message.content ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div
              className="prose-sm"
              dangerouslySetInnerHTML={{ __html: renderContent(message.content) }}
            />
          )}
        </div>
        {!isUser && message.content && !message.streaming && (
          <button
            onClick={handleCopy}
            className="mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AgentChatPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [relatedAgents, setRelatedAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = useRef("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check for Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      let finalTranscript = "";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interim += transcript;
          }
        }
        setInput(finalTranscript + interim);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== "no-speech") {
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        finalTranscript = "";
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  function toggleListening() {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  }

  useEffect(() => {
    sessionId.current = getSessionId(slug);
    loadAgent();
  }, [slug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadAgent() {
    try {
      const [agentRes, historyRes] = await Promise.all([
        fetch(`/api/agents/${slug}`),
        fetch(`/api/agents/${slug}/chat?sessionId=${getSessionId(slug)}`),
      ]);

      if (agentRes.ok) {
        const { agent: a } = await agentRes.json();
        setAgent(a);

        // Load related agents from the same category
        const relatedRes = await fetch(`/api/agents?category=${encodeURIComponent(a.category)}`);
        if (relatedRes.ok) {
          const { agents } = await relatedRes.json();
          setRelatedAgents(agents.filter((ra: Agent) => ra.slug !== slug).slice(0, 10));
        }
      }

      if (historyRes.ok) {
        const { messages: history } = await historyRes.json();
        if (history?.length) setMessages(history);
      }
    } catch (err) {
      console.error("Failed to load agent:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming || !agent) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const assistantMessage: Message = { role: "assistant", content: "", streaming: true };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch(`/api/agents/${slug}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId: sessionId.current }),
      });

      if (!res.ok) {
        throw new Error("Chat request failed");
      }

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream")) {
        // Streaming response
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

          for (const line of lines) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullContent += data.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: fullContent,
                    streaming: true,
                  };
                  return updated;
                });
              }
            } catch {
              // skip
            }
          }
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: fullContent,
            streaming: false,
          };
          return updated;
        });
      } else {
        // Non-streaming JSON response (demo mode)
        const data = await res.json();
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: data.response || "Sorry, I couldn't generate a response.",
            streaming: false,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Send error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          streaming: false,
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }, [input, isStreaming, agent, slug]);

  function handleNewChat() {
    const newSession = generateSessionId();
    sessionStorage.setItem(`agent_session_${slug}`, newSession);
    sessionId.current = newSession;
    setMessages([]);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-orange-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading agent...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl text-gray-400 mb-2">Agent not found</h2>
          <Link href="/agents" className="text-orange-400 hover:text-orange-300">
            Browse all agents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#030712] flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0a0f1a] border-r border-white/5 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-white/5">
          <Link
            href="/agents"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            All Agents
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center text-xl border border-orange-500/20">
              {agent.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-white text-sm truncate">{agent.name}</h2>
              <p className="text-xs text-gray-500">{agent.category}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-white/5">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Related Agents */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Related {agent.category} Agents
          </h3>
          <div className="space-y-1">
            {relatedAgents.map((ra) => (
              <Link
                key={ra.slug}
                href={`/agents/${ra.slug}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <span className="text-base">{ra.icon}</span>
                <span className="text-sm text-gray-400 group-hover:text-white truncate">
                  {ra.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-[#030712]/90 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-xl">{agent.icon}</span>
            <div className="min-w-0">
              <h1 className="font-semibold text-white text-sm truncate">{agent.name}</h1>
              <p className="text-xs text-gray-500 truncate">{agent.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center text-4xl mb-6 border border-orange-500/20">
                {agent.icon}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Chat with {agent.name}
              </h2>
              <p className="text-gray-400 text-sm mb-6">{agent.description}</p>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 justify-center">
                {getSuggestions(agent).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-orange-500/30 transition-all"
                  >
                    <Sparkles className="w-3 h-3 inline mr-1 text-orange-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} agentIcon={agent.icon} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 bg-[#030712]/90 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${agent.name} anything...`}
                rows={1}
                className="w-full resize-none px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm max-h-32 overflow-y-auto"
                style={{ minHeight: "48px" }}
                disabled={isStreaming}
              />
            </div>
            {speechSupported && (
              <button
                onClick={toggleListening}
                disabled={isStreaming}
                className={`px-3 py-3 rounded-2xl transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
                title={isListening ? "Stop listening" : "Voice input"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => {
                if (isListening) {
                  recognitionRef.current?.stop();
                  setIsListening(false);
                }
                handleSend();
              }}
              disabled={!input.trim() || isStreaming}
              className="px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-white/5 disabled:text-gray-600 text-white rounded-2xl transition-all flex items-center gap-2 font-medium text-sm disabled:cursor-not-allowed"
            >
              {isStreaming ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-2">
            AI responses may be inaccurate. Verify important information independently.
          </p>
        </div>
      </div>
    </div>
  );
}

function getSuggestions(agent: Agent): string[] {
  const map: Record<string, string[]> = {
    Sports: [
      "Analyze the latest match",
      "Top players to watch",
      "Best strategies for winning",
    ],
    Fitness: [
      "Create a workout plan",
      "Help with my diet",
      "How to prevent injuries",
    ],
    Legal: [
      "Explain my rights",
      "How to file a complaint",
      "Legal procedure overview",
    ],
    Finance: [
      "How should I invest?",
      "Tax saving tips",
      "Best financial plan for me",
    ],
    "Government Schemes": [
      "Am I eligible for schemes?",
      "How to apply for benefits",
      "Documents needed",
    ],
    Tech: [
      "Help me debug this code",
      "Best practices for this tech",
      "Explain this concept",
    ],
    Career: [
      "Review my resume",
      "Interview preparation tips",
      "Career path guidance",
    ],
    Education: [
      "Explain this concept",
      "Help with my homework",
      "Study plan for exams",
    ],
    "Mental Health": [
      "Feeling stressed lately",
      "Help me relax",
      "Tips for better sleep",
    ],
    Business: [
      "Business plan review",
      "Marketing strategy ideas",
      "How to grow my business",
    ],
  };
  return map[agent.category] || ["How can you help me?", "Tell me about yourself", "Give me advice"];
}

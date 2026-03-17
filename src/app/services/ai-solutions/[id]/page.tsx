import Link from "next/link";
import { ArrowLeft, ArrowRight, Hexagon, Sparkles, Bot, Send, User, Mic, Image as ImageIcon, TrendingUp, Shield, MessageCircle, Home, Search, Bell, Menu, Plus, Heart, Settings, Zap, Cpu, Brain, Eye, Fingerprint, Lock, Cloud, Database, Wifi, Battery, Volume2, VolumeX, Phone, Video, Mic as MicIcon, Smile, Paperclip, Phone as PhoneIcon, Video as VideoIcon, MessageSquare } from "lucide-react";

const aiData: Record<string, {
  name: string;
  desc: string;
  colors: string[];
  features: string[];
  preview: {
    header: { title: string; subtitle: string };
    messages: { from: "ai" | "user"; text: string }[];
    quickReplies: string[];
    navItems: { icon: string; label: string; active?: boolean }[];
  };
}> = {
  "smart-chat": { 
    name: "Smart Chatbot", 
    desc: "AI-powered customer support", 
    colors: ["#8b5cf6", "#a855f7", "#c084fc"], 
    features: ["24/7 support", "Learn from data", "Multi-language"],
    preview: {
      header: { title: "AI Assistant", subtitle: "Online" },
      messages: [
        { from: "ai", text: "Hello! How can I help you today?" },
        { from: "user", text: "I need help with my order" },
        { from: "ai", text: "Of course! Your order #12345 is on its way." }
      ],
      quickReplies: ["Track Order", "Help", "Talk to Agent"],
      navItems: [
        { icon: "chat", label: "Chat", active: true },
        { icon: "brain", label: "AI" },
        { icon: "history", label: "History" },
        { icon: "profile", label: "Profile" }
      ]
    }
  },
  "ai-assistant": { 
    name: "AI Assistant", 
    desc: "Personal AI assistant", 
    colors: ["#06b6d4", "#0891b2", "#0e7490"], 
    features: ["Task automation", "Smart suggestions", "Personalization"],
    preview: {
      header: { title: "Assistant", subtitle: "Always ready" },
      messages: [
        { from: "ai", text: "Good morning! Here's your agenda today." },
        { from: "user", text: "What's the weather?" },
        { from: "ai", text: "Sunny, 28°C. Perfect day!" }
      ],
      quickReplies: ["Schedule", "Weather", "Reminders"],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "tasks", label: "Tasks" },
        { icon: "plus", label: "Ask" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
  "voice-ai": { 
    name: "Voice AI", 
    desc: "Voice-enabled interfaces", 
    colors: ["#f472b6", "#ec4899", "#db2777"], 
    features: ["Voice commands", "Speech synthesis", "Real-time transcription"],
    preview: {
      header: { title: "Voice AI", subtitle: "Listening..." },
      messages: [
        { from: "ai", text: "🎤 Listening..." },
        { from: "user", text: "Call Mom" },
        { from: "ai", text: "Calling Mom... ✓" }
      ],
      quickReplies: ["🎤 Voice", "📝 Text", "📞 Call"],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "mic", label: "Voice" },
        { icon: "phone", label: "Calls" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
  "image-ai": { 
    name: "Image AI", 
    desc: "AI image generation", 
    colors: ["#f59e0b", "#fbbf24", "#fcd34d"], 
    features: ["Image generation", "Style transfer", "Upscaling"],
    preview: {
      header: { title: "ImageGen", subtitle: "AI Studio" },
      messages: [
        { from: "ai", text: "Describe the image you want" },
        { from: "user", text: "A futuristic city at sunset" },
        { from: "ai", text: "🎨 Generating your image..." }
      ],
      quickReplies: ["Generate", "Styles", "Gallery"],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "create", label: "Create" },
        { icon: "gallery", label: "Gallery" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
  "predictive": { 
    name: "Predictive AI", 
    desc: "AI analytics & predictions", 
    colors: ["#22c55e", "#16a34a", "#15803d"], 
    features: ["Trend prediction", "User behavior", "Forecasting"],
    preview: {
      header: { title: "Predict", subtitle: "Analytics" },
      messages: [
        { from: "ai", text: "Sales trending up +15% this week" },
        { from: "user", text: "Show me the forecast" },
        { from: "ai", text: "📈 23% growth expected next month!" }
      ],
      quickReplies: ["Analytics", "Reports", "Alerts"],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "chart", label: "Data" },
        { icon: "trends", label: "Trends" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
  "security-ai": { 
    name: "Security AI", 
    desc: "AI-powered security", 
    colors: ["#ef4444", "#f87171", "#fca5a5"], 
    features: ["Fraud detection", "Anomaly detection", "Threat prevention"],
    preview: {
      header: { title: "Secure AI", subtitle: "Protected" },
      messages: [
        { from: "ai", text: "🔒 All systems secure" },
        { from: "user", text: "Check for threats" },
        { from: "ai", text: "No threats detected. You're safe! ✓" }
      ],
      quickReplies: ["Scan", "Alerts", "History"],
      navItems: [
        { icon: "home", label: "Home", active: true },
        { icon: "shield", label: "Shield" },
        { icon: "alerts", label: "Alerts" },
        { icon: "profile", label: "Me" }
      ]
    }
  },
};

function AIIcon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const props = { className: className || "w-4 h-4" };
  const style = color ? { color } : {};
  
  switch (name) {
    case "chat": return <MessageSquare {...props} style={style} />;
    case "brain": return <Brain {...props} style={style} />;
    case "history": return <Database {...props} style={style} />;
    case "home": return <Home {...props} style={style} />;
    case "tasks": return <Check {...props} style={style} />;
    case "plus": return <Plus {...props} style={style} />;
    case "profile": return <User {...props} style={style} />;
    case "mic": return <MicIcon {...props} style={style} />;
    case "phone": return <PhoneIcon {...props} style={style} />;
    case "create": return <Sparkles {...props} style={style} />;
    case "gallery": return <ImageIcon {...props} style={style} />;
    case "chart": return <TrendingUp {...props} style={style} />;
    case "trends": return <TrendingUp {...props} style={style} />;
    case "shield": return <Shield {...props} style={style} />;
    case "alerts": return <Bell {...props} style={style} />;
    default: return <MessageSquare {...props} style={style} />;
  }
}

function Check(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>; }

export default function AIPreview({ params }: { params: Promise<{ id: string }> }) {
  const id = "smart-chat";
  const theme = aiData[id] || aiData["smart-chat"];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000008] via-[#050015] to-[#000008]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 50, 255, 0.1) 0%, transparent 50%)' }} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <Link href="/services/ai-solutions" className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <Hexagon className="w-6 h-6 text-purple-400 fill-purple-400/20" />
          <span className="font-bold text-sm">KraftAI</span>
        </div>
      </nav>

      <div className="relative z-10 px-4 py-6 text-center">
        <div className="flex justify-center gap-2 mb-3">
          {theme.colors.map((color, idx) => (
            <div key={idx} className="w-8 h-8 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}50` }} />
          ))}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{theme.name}</h1>
        <p className="text-slate-400 text-sm">{theme.desc}</p>
      </div>

      <div className="relative z-10 px-4 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {theme.features.map((feature, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">{feature}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-[300px] mx-auto">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-[2.5rem] blur-xl" />
            <div className="relative bg-black rounded-[2rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center px-3 py-2 bg-black/50 text-[10px] text-slate-400">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2.5 rounded-sm bg-white/20" />
                  <div className="w-0.5 h-2.5 bg-white/60" />
                  <div className="w-0.5 h-2.5 bg-white/60" />
                </div>
              </div>

              <div className="p-3 bg-gradient-to-b from-slate-900 to-[#0a0a12]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{theme.preview.header.title}</p>
                      <p className="text-[10px]" style={{ color: theme.colors[0] }}>{theme.preview.header.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <PhoneIcon className="w-4 h-4 text-slate-500" />
                    <VideoIcon className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                <div className="space-y-2 mb-3 h-32 overflow-hidden">
                  {theme.preview.messages.map((msg, i) => (
                    <div key={i} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                      {msg.from === 'ai' && (
                        <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${theme.colors[0]}30` }}>
                          <Bot className="w-3 h-3" style={{ color: theme.colors[0] }} />
                        </div>
                      )}
                      <div className={`p-2 rounded-xl max-w-[75%] text-[10px] ${msg.from === 'user' ? 'text-right' : ''}`} style={{ 
                        backgroundColor: msg.from === 'user' ? `${theme.colors[1]}20` : `${theme.colors[0]}20`,
                        border: `1px solid ${msg.from === 'user' ? theme.colors[1] : theme.colors[0]}30`
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-1 mb-2 flex-wrap">
                  {theme.preview.quickReplies.map((reply, i) => (
                    <button key={i} className="px-2 py-1 rounded-full text-[9px] bg-white/5 border border-white/10 hover:bg-white/10">
                      {reply}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type..." 
                    className="flex-1 p-2 rounded-xl bg-slate-800 border border-slate-700 text-[10px]"
                  />
                  <button className="p-2 rounded-xl" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="flex justify-around py-2 bg-black/90 border-t border-white/10">
                {theme.preview.navItems.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <AIIcon name={item.icon} className="w-4 h-4" color={item.active ? theme.colors[0] : '#64748b'} />
                    <span className="text-[7px]" style={{ color: item.active ? theme.colors[0] : '#64748b' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center pb-12 px-4">
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          Get This AI <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

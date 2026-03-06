import { FeedbackWidget } from "@/components/feedback-widget";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative min-h-screen bg-[#030712] overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="gradient-orb fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-600" />
        <div className="gradient-orb fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600" style={{ animationDelay: "-7s" }} />
        <div className="gradient-orb fixed top-[40%] right-[20%] w-[300px] h-[300px] bg-amber-600" style={{ animationDelay: "-14s" }} />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* Feedback widget outside overflow-hidden container */}
      <FeedbackWidget />
    </>
  );
}

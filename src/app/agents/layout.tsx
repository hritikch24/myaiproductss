import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KraftAI Agents — 200+ Specialized AI Chatbots",
  description:
    "Chat with 200+ AI agents specialized in sports, law, fitness, finance, government schemes, tech, career, education, mental health, and business. Get expert guidance instantly.",
  keywords: [
    "AI agents",
    "AI chatbot",
    "specialized AI",
    "legal AI",
    "fitness AI",
    "finance AI",
    "government schemes AI",
    "sports AI",
    "career AI",
    "education AI",
  ],
  openGraph: {
    title: "KraftAI Agents — 200+ Specialized AI Chatbots",
    description:
      "Chat with 200+ AI agents specialized in sports, law, fitness, finance, government schemes, tech, and more.",
    url: "https://kraftai.in/agents",
  },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

"use client";

import { usePathname } from "next/navigation";
import ChatWidget from "./chat-widget";

// Renders the chat widget on all padhai pages except landing, login, onboarding
export default function ChatWrapper() {
  const pathname = usePathname();

  // Don't show on landing, login, onboarding pages
  const hideOn = ["/padhai", "/padhai/login", "/padhai/onboarding"];
  if (hideOn.includes(pathname)) return null;

  return <ChatWidget />;
}

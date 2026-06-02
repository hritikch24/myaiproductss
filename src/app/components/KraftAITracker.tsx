"use client";

import { useEffect, useRef } from "react";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("k_sid");
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem("k_sid", sid);
  }
  return sid;
}

export function getKraftSessionId() {
  return typeof window !== "undefined" ? sessionStorage.getItem("k_sid") || "" : "";
}

export function trackEvent(eventType: string, eventData?: Record<string, unknown>) {
  const sid = getSessionId();
  if (!sid) return;
  fetch("/api/kraftai/track", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sid, event_type: eventType, event_data: eventData, page: window.location.pathname }),
  }).catch(() => {});
}

export default function KraftAITracker() {
  const tracked = useRef(false);
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const sid = getSessionId();
    const params = new URLSearchParams(window.location.search);

    // Track page view
    fetch("/api/kraftai/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sid,
        page: window.location.pathname + window.location.search,
        page_title: document.title,
        referrer: document.referrer || null,
        language: navigator.language,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      }),
    }).catch(() => {});

    // Track scroll depth
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      if (pct > maxScroll.current) maxScroll.current = pct;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track duration + scroll on unload
    const onUnload = () => {
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      const blob = new Blob(
        [JSON.stringify({ session_id: sid, event_type: "page_exit", event_data: { duration, scroll_depth: maxScroll.current }, page: window.location.pathname })],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/kraftai/track", blob);
    };
    window.addEventListener("beforeunload", onUnload);

    // Track CTA clicks
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href], button");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const text = link.textContent?.trim().substring(0, 80) || "";

      if (href.includes("wa.me") || href.includes("whatsapp")) {
        trackEvent("cta_whatsapp", { text, href });
      } else if (href.includes("mailto:")) {
        trackEvent("cta_email", { text, href });
      } else if (href === "#pricing" || text.toLowerCase().includes("quote")) {
        trackEvent("cta_pricing", { text });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onUnload);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

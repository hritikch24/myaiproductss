"use client";

import { useSyncExternalStore } from "react";
import { INITIAL_STATE, parseSavedState, transition, type DemoAction, type DemoState } from "./demo-model";

export const STORAGE_KEY = "kraftai:phone-demo:v1";
let state: DemoState = INITIAL_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

function snapshot() {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    try { state = parseSavedState(window.localStorage.getItem(STORAGE_KEY)) ?? INITIAL_STATE; } catch { /* The preview also works without browser storage. */ }
  }
  return state;
}
function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  state = parseSavedState(event.newValue) ?? INITIAL_STATE;
  listeners.forEach(listener => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}
export function dispatch(action: DemoAction) {
  const result = transition(snapshot(), action);
  if (result.ok) {
    state = result.state;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Keep the current in-memory session usable. */ }
    listeners.forEach(listener => listener());
  }
  return result;
}
export function useDemoStore() {
  return useSyncExternalStore(subscribe, snapshot, () => INITIAL_STATE);
}

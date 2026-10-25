"use client";

import { useSyncExternalStore } from "react";

let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/**
 * Current epoch milliseconds, ticking every second. Returns `null` during
 * prerender and hydration so server and client markup always agree.
 */
export function useNow() {
  return useSyncExternalStore(
    subscribe,
    () => now || null,
    () => null,
  );
}

const nairobiTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Nairobi",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const nairobiMonth = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", month: "numeric" });

export function formatNairobiTime(ms: number) {
  return nairobiTime.format(ms);
}

/** Zero-based month index in Nairobi. */
export function nairobiMonthIndex(ms: number) {
  return Number(nairobiMonth.format(ms)) - 1;
}

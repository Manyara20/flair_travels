"use client";

import { formatNairobiTime, useNow } from "@/lib/use-now";

export function NairobiClock({ className = "" }: { className?: string }) {
  const now = useNow();
  return (
    <span className={`inline-flex items-center gap-2 font-mono tabular-nums ${className}`}>
      <span className="relative flex size-1.5">
        <span className="absolute inset-0 animate-ping bg-volt opacity-70" />
        <span className="relative size-1.5 bg-volt" />
      </span>
      NBO {now ? formatNairobiTime(now) : "--:--:--"} EAT
    </span>
  );
}

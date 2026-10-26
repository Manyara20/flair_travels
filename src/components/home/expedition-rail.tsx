"use client";

import { useRef, useState, type ReactNode } from "react";

/** Horizontal snap-scrolling track with step buttons and a progress readout. */
export function ExpeditionRail({ children, count }: { children: ReactNode; count: number }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-rail-item]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [--gutter:max(1rem,calc((100vw-1600px)/2+1rem))] [scrollbar-width:none] sm:[--gutter:max(2rem,calc((100vw-1600px)/2+2rem))] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: "var(--gutter)", scrollPaddingInline: "var(--gutter)" }}
      >
        {children}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <div className="mx-auto mt-6 flex max-w-[1600px] items-center gap-6 px-4 sm:px-8">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-sky/70 tabular-nums">
          {String(Math.min(count, Math.round(progress * (count - 1)) + 1)).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="relative h-px flex-1 bg-white/15">
          <span className="absolute inset-y-0 left-0 bg-pink transition-[width] duration-200" style={{ width: `${Math.max(progress, 0.04) * 100}%` }} />
        </div>
        <div className="flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              aria-label={dir === -1 ? "Previous expedition" : "Next expedition"}
              className="flex size-12 items-center justify-center border border-white/25 transition-colors hover:border-pink hover:bg-pink hover:text-white [&+&]:-ml-px"
            >
              {dir === -1 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

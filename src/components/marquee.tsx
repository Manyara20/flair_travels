import type { CSSProperties, ReactNode } from "react";

/** Infinite CSS ticker. Content is rendered twice so the loop is seamless. */
export function Marquee({
  items,
  duration = 40,
  reverse = false,
  className = "",
  separator = "✕",
}: {
  items: ReactNode[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  separator?: ReactNode;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-[0.4em] opacity-60">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : undefined } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

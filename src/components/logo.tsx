import Link from "next/link";

/** Wordmark: an equator tick through a stencilled "F" block, then the name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Flair Travels home" className={`group flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        <path d="M11 9h18v5H17v4h10v5H17v8h-6z" fill="currentColor" />
        <path
          d="M0 20h40"
          stroke="var(--color-laterite)"
          strokeWidth="2"
          strokeDasharray="3 2"
          className="transition-[stroke-dashoffset] duration-700 group-hover:[stroke-dashoffset:-20]"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-[0.12em] uppercase">Flair</span>
        <span className="font-mono text-[0.6rem] tracking-[0.4em] text-dust uppercase">Travels · KE</span>
      </span>
    </Link>
  );
}

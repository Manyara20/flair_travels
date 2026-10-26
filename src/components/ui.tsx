import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Mono section label, e.g. "[02] — SERVICES". Inherits its colour from the parent. */
export function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.3em] uppercase ${className}`}>
      {index && <span className="text-pink">[{index}]</span>}
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}

/** Viewfinder crop marks drawn around whatever they wrap. */
export function CropMarks({ className = "", size = 16 }: { className?: string; size?: number }) {
  const s = `${size}px`;
  const base = "pointer-events-none absolute border-current";
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} style={{ width: s, height: s }} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} style={{ width: s, height: s }} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} style={{ width: s, height: s }} />
      <span className={`${base} right-0 bottom-0 border-r-2 border-b-2`} style={{ width: s, height: s }} />
    </span>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  /** solid: pink fill · cyan: cyan fill · light: outline on dark backgrounds · outline: outline on light backgrounds */
  variant?: "solid" | "cyan" | "light" | "outline";
};

export function ButtonLink({ variant = "solid", className = "", children, ...props }: ButtonLinkProps) {
  const styles = {
    solid: "bg-pink text-white hover:bg-cyan",
    cyan: "bg-cyan text-white hover:bg-pink",
    light: "border border-white/40 text-white hover:border-cyan hover:bg-cyan",
    outline: "border border-navy/25 text-navy hover:border-pink hover:bg-pink hover:text-white",
  }[variant];
  return (
    <Link
      {...props}
      className={`group inline-flex items-center justify-between gap-6 px-6 py-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 [--cut:12px] chamfer-tr ${styles} ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 ease-expo group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** Five-segment bar used for intensity / season strength. */
export function SegmentBar({ value, max = 5, className = "" }: { value: number; max?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${value} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-2.5 w-3 ${i < value ? "bg-pink" : "bg-current opacity-20"}`} />
      ))}
    </span>
  );
}

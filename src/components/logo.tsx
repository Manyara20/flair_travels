import Image from "next/image";
import Link from "next/link";

/**
 * Brand wordmark, traced from the original logo artwork (see /public/brand).
 * - color:   cyan "Flair" + pink "travels", for light backgrounds
 * - reverse: white "Flair" + pink "travels", for navy or photo backgrounds
 * - white / navy: single-colour versions
 */
export type LogoVariant = "color" | "reverse" | "white" | "navy";
export type LogoTagline = "tagline" | "easy";

const RATIO = 715 / 301;

export function logoSrc(variant: LogoVariant, tagline?: LogoTagline) {
  return `/brand/logo-${variant}${tagline ? `-${tagline}` : ""}.svg`;
}

export function LogoImage({
  variant = "color",
  tagline,
  height = 48,
  className = "",
  priority = false,
}: {
  variant?: LogoVariant;
  tagline?: LogoTagline;
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const h = tagline ? height * (305 / 301) : height;
  return (
    <Image
      src={logoSrc(variant, tagline)}
      alt={tagline === "easy" ? "Flair Travels: travel made easy" : tagline ? "Flair Travels: tours & travel" : "Flair Travels"}
      width={Math.round(height * RATIO)}
      height={Math.round(h)}
      priority={priority}
      unoptimized
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

export function Logo({ className = "", ...props }: Parameters<typeof LogoImage>[0] & { className?: string }) {
  return (
    <Link href="/" aria-label="Flair Travels home" className={`inline-flex shrink-0 ${className}`}>
      <LogoImage {...props} />
    </Link>
  );
}

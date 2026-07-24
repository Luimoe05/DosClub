import Link from "next/link";

/**
 * The DC monogram from the brand artwork, cropped into a dark brand tile so it
 * reads correctly in both light and dark themes. The source is a black-backed
 * raster; the tile keeps that black as an intentional lozenge. The tile aspect
 * (~1.4) matches the monogram so the "DOS CLUB RESEARCH" wordmark is cropped
 * out cleanly.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block overflow-hidden rounded-[7px] bg-black ring-1 ring-white/10 ${className}`}
      role="img"
      aria-label="Dos Club Research"
      style={{
        backgroundImage: "url('/dos-club-logo.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "150% auto",
        backgroundPosition: "50% 30%",
      }}
    />
  );
}

/** Full lockup: monogram tile + DOS CLUB / RESEARCH wordmark. */
export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-11 shrink-0" />
      {!compact && (
        <span className="label leading-none text-foreground">
          DOS CLUB <span className="text-accent">RESEARCH</span>
        </span>
      )}
    </Link>
  );
}

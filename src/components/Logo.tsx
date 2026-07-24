import Link from "next/link";

/** The DC lens mark — white outer almond with a hot-magenta inner lens. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Dos Club Research"
    >
      {/* outer white lens */}
      <path
        d="M60 8 C 90 34 90 86 60 112 C 30 86 30 34 60 8 Z"
        fill="#ffffff"
      />
      {/* seam that hints the D | C split */}
      <rect x="58.5" y="14" width="3" height="92" fill="var(--background)" />
      {/* inner magenta lens */}
      <path
        d="M60 30 C 76 48 76 72 60 90 C 44 72 44 48 60 30 Z"
        fill="var(--accent)"
      />
    </svg>
  );
}

/** Full lockup: mark + DOS CLUB / RESEARCH wordmark. */
export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-brand text-white">
            DOS CLUB
          </span>
          <span className="text-[10px] tracking-brand text-accent">
            RESEARCH
          </span>
        </span>
      )}
    </Link>
  );
}

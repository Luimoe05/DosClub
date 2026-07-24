import Link from "next/link";

/**
 * The DC monogram from the brand artwork, set in a dark brand tile so it reads
 * in both themes. An outer black frame adds breathing room around the cropped
 * monogram (which sits on its own black background), and a soft ring + shadow
 * lift the tile off the page.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block shrink-0 rounded-lg bg-black p-[3px] shadow-sm ring-1 ring-white/10 ${className}`}
      role="img"
      aria-label="Dos Club Research"
    >
      <span
        className="block h-full w-full rounded-[6px] bg-black bg-no-repeat"
        style={{
          backgroundImage: "url('/dos-club-logo.jpeg')",
          backgroundSize: "148% auto",
          backgroundPosition: "50% 33%",
        }}
      />
    </span>
  );
}

/** Full lockup: monogram tile + stacked DOS CLUB / RESEARCH wordmark. */
export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-12" />
      {!compact && (
        <span className="flex flex-col gap-1 leading-none">
          <span className="label text-foreground">DOS CLUB</span>
          <span className="label text-[9px] text-accent">RESEARCH</span>
        </span>
      )}
    </Link>
  );
}

import { LogoMark } from "@/components/Logo";

/**
 * Stylized glass-vial visual used as product artwork until real photography
 * is uploaded. Theme-aware; mirrors the DOS CLUB packaging.
 */
export function VialVisual({
  sizeMg,
  className = "",
}: {
  sizeMg?: number | null;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="glow-accent pointer-events-none absolute inset-0" />
      <div className="relative flex flex-col items-center">
        {/* cap */}
        <div className="h-2.5 w-11 rounded-t-md bg-border-strong" />
        <div className="h-2 w-[52px] rounded-sm bg-foreground/80" />
        {/* body */}
        <div className="relative mt-[-1px] flex h-40 w-[60px] flex-col items-center justify-end rounded-b-xl rounded-t-sm border border-border-strong/60 bg-foreground/[0.04] backdrop-blur-sm">
          {/* powder */}
          <div className="absolute inset-x-1 bottom-1 top-6 rounded-b-lg bg-foreground/10" />
          {/* label */}
          <div className="relative z-10 mb-3 flex flex-col items-center gap-1">
            <LogoMark className="h-5 w-5" />
            {sizeMg != null && (
              <span className="label text-accent">{sizeMg}MG</span>
            )}
          </div>
          {/* highlight */}
          <div className="absolute left-2 top-2 h-24 w-1 rounded-full bg-foreground/20 blur-[1px]" />
        </div>
      </div>
    </div>
  );
}

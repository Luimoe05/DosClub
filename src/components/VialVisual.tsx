import { LogoMark } from "@/components/Logo";

/**
 * Stylized glass-vial visual used as product artwork until real photography
 * is uploaded. Mirrors the DOS CLUB packaging: black cap, clear vial, DC mark.
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
        <div className="h-3 w-12 rounded-t-md bg-gradient-to-b from-zinc-300 to-zinc-500" />
        <div className="h-2 w-14 rounded-sm bg-gradient-to-b from-zinc-800 to-black" />
        {/* body */}
        <div className="relative mt-[-1px] flex h-40 w-16 flex-col items-center justify-end rounded-b-xl rounded-t-sm border border-white/15 bg-gradient-to-b from-white/10 via-white/5 to-white/10 backdrop-blur-sm">
          {/* powder */}
          <div className="absolute inset-x-1 bottom-1 top-6 rounded-b-lg bg-gradient-to-b from-white/70 to-white/40" />
          {/* label */}
          <div className="relative z-10 mb-3 flex flex-col items-center gap-1">
            <LogoMark className="h-5 w-5" />
            {sizeMg != null && (
              <span className="text-[9px] font-semibold text-accent">
                {sizeMg}mg
              </span>
            )}
          </div>
          {/* highlight */}
          <div className="absolute left-2 top-2 h-24 w-1.5 rounded-full bg-white/40 blur-[1px]" />
        </div>
      </div>
    </div>
  );
}

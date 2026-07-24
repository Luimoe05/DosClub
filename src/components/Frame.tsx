import type { ReactNode } from "react";

/**
 * Blueprint frame: hairline border with a small + tick at each corner.
 * The top ticks come from CSS ::before/::after; the bottom two are spans.
 */
export function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`frame ${className}`}>
      {children}
      <span className="frame-tick-l" aria-hidden="true" />
      <span className="frame-tick-r" aria-hidden="true" />
    </div>
  );
}

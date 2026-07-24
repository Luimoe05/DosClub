import type { ReactNode } from "react";

/** Rounded panel with a hairline border. */
export function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`frame ${className}`}>{children}</div>;
}

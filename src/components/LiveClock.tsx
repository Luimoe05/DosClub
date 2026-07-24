"use client";

import { useEffect, useState } from "react";

/** Live local time, e.g. "12:33 AM" — echoes the reference site's meta row. */
export function LiveClock({ prefix = "" }: { prefix?: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    update();
    const id = window.setInterval(update, 1000 * 15);
    return () => window.clearInterval(id);
  }, []);

  // Render nothing until mounted to avoid an SSR/client mismatch.
  if (!time) return <span className="label text-muted">{prefix}</span>;
  return (
    <span className="label text-muted tabular-nums">
      {prefix}
      {time}
    </span>
  );
}

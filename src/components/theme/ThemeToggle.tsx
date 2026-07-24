"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  // Sync initial state from the class the no-flash script already applied.
  // Must read the DOM post-mount, not in a useState initializer (which would
  // run during SSR where `document` is undefined).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-mount DOM read
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-surface-2 hover:text-foreground"
    >
      {/* Half-moon icon; suppress hydration mismatch until state resolves */}
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 4a8 8 0 0 0 0 16z"
          fill="currentColor"
          className={dark === false ? "opacity-100" : "opacity-100"}
        />
      </svg>
    </button>
  );
}

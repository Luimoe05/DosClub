"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Client-only: three.js touches the DOM/WebGL and must not run during SSR.
const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
    </div>
  );
}

export function HeroCanvas() {
  const [reduced, setReduced] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => setReduced(mq.matches);
    syncReduced();
    mq.addEventListener("change", syncReduced);

    // Track the theme class so the scene's palette follows light/dark.
    const el = document.documentElement;
    const syncDark = () => setDark(el.classList.contains("dark"));
    syncDark();
    const observer = new MutationObserver(syncDark);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mq.removeEventListener("change", syncReduced);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <HeroScene interactive={!reduced} dark={dark} />
    </div>
  );
}

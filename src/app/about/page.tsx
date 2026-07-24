import type { Metadata } from "next";
import { LogoMark } from "@/components/Logo";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "About",
  description: "Our standards for research-grade compounds.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <LogoMark className="h-11 w-14" />
      <span className="label mt-6 block text-accent">OUR STANDARDS</span>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Purity, verified.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Dos Club Research exists for one reason: to supply researchers with
        compounds they can trust. Every product is lab-verified for identity and
        purity, and every batch ships with a certificate of analysis.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { k: "≥99%", v: "VERIFIED PURITY ON EVERY BATCH" },
          { k: "COA", v: "CERTIFICATE OF ANALYSIS INCLUDED" },
          { k: "24H", v: "FAST, DISCREET DISPATCH" },
        ].map((s) => (
          <Frame key={s.v} className="p-6">
            <div className="text-2xl font-semibold text-accent tabular-nums">
              {s.k}
            </div>
            <p className="label mt-3 leading-relaxed text-muted">{s.v}</p>
          </Frame>
        ))}
      </div>

      <div className="mt-12 rounded-md border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <strong className="text-foreground">Research use only.</strong> All
        products are intended solely for laboratory research and are{" "}
        <span className="text-accent">not for human consumption</span>, in vivo
        use, or any food, drug, or cosmetic application.
      </div>
    </div>
  );
}

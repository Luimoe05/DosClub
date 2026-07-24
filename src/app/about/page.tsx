import type { Metadata } from "next";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About",
  description: "Our standards for research-grade compounds.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <LogoMark className="h-12 w-12" />
      <h1 className="mt-6 text-4xl font-semibold text-white">Our standards</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Dos Club Research exists for one reason: to supply researchers with
        compounds they can trust. Every product is lab-verified for identity and
        purity, and every batch ships with a certificate of analysis.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { k: "≥99%", v: "Verified purity on every batch" },
          { k: "COA", v: "Certificate of analysis included" },
          { k: "24h", v: "Fast, discreet dispatch" },
        ].map((s) => (
          <div
            key={s.v}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="text-2xl font-semibold text-accent">{s.k}</div>
            <p className="mt-2 text-sm text-muted">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <strong className="text-foreground">Research use only.</strong> All
        products are intended solely for laboratory research and are{" "}
        <span className="text-accent">not for human consumption</span>, in vivo
        use, or any food, drug, or cosmetic application.
      </div>
    </div>
  );
}

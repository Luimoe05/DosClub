import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { VialVisual } from "@/components/VialVisual";
import { LogoMark } from "@/components/Logo";

export const revalidate = 60;

export default async function Home() {
  const featured = await getFeaturedProducts(4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="glow-accent pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs tracking-widest text-muted uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Third-party tested · ≥99% purity
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              Research-grade
              <br />
              <span className="text-accent">compounds.</span>
              <br />
              Uncompromised purity.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Dos Club Research supplies high-purity peptides and research
              compounds, lab-verified and shipped fast. Strictly for laboratory
              research — not for human consumption.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
              >
                Shop the catalog
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-white"
              >
                Our standards
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="gradient-panel mx-auto flex aspect-[4/5] max-w-sm items-center justify-center rounded-3xl border border-border">
              <VialVisual sizeMg={30} className="h-full w-full scale-125" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {[
            { k: "≥99%", v: "Verified purity" },
            { k: "COA", v: "Every batch tested" },
            { k: "24h", v: "Order dispatch" },
            { k: "100%", v: "Discreet shipping" },
          ].map((s) => (
            <div key={s.v} className="px-6 py-8 text-center">
              <div className="text-2xl font-semibold text-white">{s.k}</div>
              <div className="mt-1 text-xs tracking-widest text-muted uppercase">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Featured compounds</h2>
            <p className="mt-2 text-muted">Our most requested research products.</p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm text-accent transition hover:text-accent-bright sm:inline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Brand band ───────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-20 text-center">
          <LogoMark className="h-14 w-14" />
          <h2 className="max-w-2xl text-3xl font-semibold text-white">
            Purity you can verify. A standard you can trust.
          </h2>
          <p className="max-w-xl text-muted">
            Every batch ships with a certificate of analysis. No guesswork, no
            compromise — just research-grade material done right.
          </p>
          <Link
            href="/products"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
          >
            Browse products
          </Link>
        </div>
      </section>
    </>
  );
}

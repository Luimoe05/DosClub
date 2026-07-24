import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { VialVisual } from "@/components/VialVisual";
import { Frame } from "@/components/Frame";
import { LiveClock } from "@/components/LiveClock";
import { SectionHeader } from "@/components/SectionHeader";

export const revalidate = 60;

export default async function Home() {
  const featured = await getFeaturedProducts(4);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-14 pb-6">
        <Frame className="glow-accent overflow-hidden">
          <div className="grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
            <div className="flex flex-col justify-center">
              <span className="label flex items-center gap-2 text-muted">
                <span className="h-2 w-2 rounded-full bg-ok" />
                Lab verified · ≥99% purity
              </span>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
                Research-grade
                <br />
                <span className="text-accent">compounds.</span>
              </h1>
              <p className="mt-5 max-w-md leading-relaxed text-muted">
                Dos Club Research supplies high-purity peptides and research
                compounds — lab-verified, batch-tested, shipped fast. Strictly
                for laboratory research; not for human consumption.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="label inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-accent-contrast transition hover:bg-accent-bright"
                >
                  SHOP CATALOG
                </Link>
                <Link
                  href="/about"
                  className="label inline-flex items-center justify-center rounded-md border border-border-strong px-6 py-3 text-foreground transition hover:bg-surface-2"
                >
                  OUR STANDARDS ↗
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex aspect-[4/5] w-full max-w-xs items-center justify-center border border-border bg-background">
                <VialVisual sizeMg={30} className="h-full w-full scale-110" />
              </div>
            </div>
          </div>
        </Frame>

        {/* meta row */}
        <div className="mt-3 flex items-center justify-between">
          <span className="label text-muted">
            RESEARCH GRADE · BATCH TESTED
          </span>
          <LiveClock prefix="SHIPS WORLDWIDE / " />
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────── */}
      <section className="py-14">
        <SectionHeader label="FEATURED" index={1} total={3} href="/products" />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Standards ────────────────────────────────────────── */}
      <section className="py-14">
        <SectionHeader label="STANDARDS" index={2} total={3} />
        <Frame className="mt-8">
          <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
            {[
              { k: "≥99%", v: "VERIFIED PURITY" },
              { k: "COA", v: "EVERY BATCH TESTED" },
              { k: "24H", v: "ORDER DISPATCH" },
              { k: "100%", v: "DISCREET SHIPPING" },
            ].map((s) => (
              <div key={s.v} className="px-6 py-10 text-center">
                <div className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                  {s.k}
                </div>
                <div className="label mt-2 text-muted">{s.v}</div>
              </div>
            ))}
          </div>
        </Frame>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-14">
        <SectionHeader label="ORDER" index={3} total={3} />
        <Frame className="mt-8">
          <div className="flex flex-col items-center gap-5 px-6 py-16 text-center">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground">
              Purity you can verify. A standard you can trust.
            </h2>
            <p className="max-w-lg text-muted">
              Every batch ships with a certificate of analysis. No guesswork —
              just research-grade material done right.
            </p>
            <Link
              href="/products"
              className="label mt-2 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-accent-contrast transition hover:bg-accent-bright"
            >
              BROWSE PRODUCTS
            </Link>
          </div>
        </Frame>
      </section>
    </div>
  );
}

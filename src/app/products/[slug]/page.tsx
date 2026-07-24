import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { Frame } from "@/components/Frame";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const inStock = product.stock > 0;

  const specs = [
    { k: "Purity", v: product.purity ?? "—" },
    { k: "Vial size", v: product.sizeMg != null ? `${product.sizeMg} mg` : "—" },
    { k: "Form", v: product.form ?? "—" },
    { k: "Category", v: product.categoryName ?? "—" },
    { k: "Intended use", v: "Laboratory research" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <nav className="label mb-8">
        <Link
          href="/products"
          className="text-muted transition hover:text-foreground"
        >
          ← BACK TO CATALOG
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
        {/* Details */}
        <div className="flex flex-col">
          <span className="label flex items-center gap-2 text-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-ok" : "bg-muted"}`}
            />
            {(product.categoryName ?? "RESEARCH COMPOUND").toUpperCase()}
            {" · "}
            {inStock ? "IN STOCK" : "SOLD OUT"}
          </span>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 text-3xl font-semibold text-foreground tabular-nums">
            {formatPrice(product.priceCents)}
          </div>

          <p className="mt-6 max-w-prose leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.purity && (
              <span className="pill">PURITY {product.purity}</span>
            )}
            {product.sizeMg != null && (
              <span className="pill">{product.sizeMg}MG VIAL</span>
            )}
            {product.form && (
              <span className="pill">{product.form.toUpperCase()}</span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AddToCartButton
              product={{
                slug: product.slug,
                name: product.name,
                priceCents: product.priceCents,
                sizeMg: product.sizeMg,
              }}
              className={inStock ? "" : "pointer-events-none opacity-40"}
            />
            <Link
              href="/cart"
              className="label text-muted transition hover:text-foreground"
            >
              VIEW CART →
            </Link>
          </div>

          <div className="mt-8 border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
            <strong className="text-foreground">Research use only.</strong> This
            product is sold strictly for laboratory research and is{" "}
            <span className="text-accent">not for human consumption</span>. By
            purchasing you confirm you are a qualified researcher.
          </div>
        </div>

        {/* Spec sheet */}
        <div className="md:pt-11">
          <Frame>
            <div className="border-b border-border px-5 py-3">
              <span className="label text-muted">SPECIFICATION</span>
            </div>
            <dl className="divide-y divide-border">
              {specs.map((s) => (
                <div
                  key={s.k}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <dt className="label text-muted">{s.k.toUpperCase()}</dt>
                  <dd className="text-sm text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Frame>
        </div>
      </div>
    </div>
  );
}

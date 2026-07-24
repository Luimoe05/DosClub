import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { VialVisual } from "@/components/VialVisual";
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-8 text-sm text-muted">
        <Link href="/products" className="transition hover:text-white">
          ← Back to catalog
        </Link>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Media */}
        <div className="gradient-panel relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-border">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <VialVisual sizeMg={product.sizeMg} className="h-full w-full scale-110" />
          )}
        </div>

        {/* Details */}
        <div>
          {product.categoryName && (
            <p className="text-xs tracking-widest text-accent uppercase">
              {product.categoryName}
            </p>
          )}
          <h1 className="mt-2 text-4xl font-semibold text-white">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-semibold text-white">
              {formatPrice(product.priceCents)}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                inStock
                  ? "bg-accent/15 text-accent"
                  : "bg-surface-2 text-muted"
              }`}
            >
              {inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          {/* Spec table */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            <Spec label="Purity" value={product.purity ?? "—"} />
            <Spec
              label="Size"
              value={product.sizeMg != null ? `${product.sizeMg}mg` : "—"}
            />
            <Spec label="Form" value={product.form ?? "—"} />
            <Spec label="Use" value="Laboratory research" />
          </dl>

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
              className="text-sm text-muted transition hover:text-white"
            >
              View cart →
            </Link>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
            <strong className="text-foreground">Research use only.</strong> This
            product is sold strictly for laboratory research and is{" "}
            <span className="text-accent">not for human consumption</span>. By
            purchasing you confirm you are a qualified researcher.
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-4 py-3">
      <dt className="text-[11px] tracking-widest text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-white">{value}</dd>
    </div>
  );
}

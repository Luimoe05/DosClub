import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { StoreProduct } from "@/lib/sample-products";

export function ProductCard({ product }: { product: StoreProduct }) {
  const inStock = product.stock > 0;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col justify-between gap-6 border border-border bg-surface p-5 transition hover:border-border-strong hover:bg-surface-2"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="label text-muted">
            {product.categoryName ?? "COMPOUND"}
          </span>
          <span className="label flex items-center gap-1.5 text-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-ok" : "bg-muted"}`}
            />
            {inStock ? "IN STOCK" : "SOLD OUT"}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.purity && <span className="pill">{product.purity}</span>}
          {product.sizeMg != null && (
            <span className="pill">{product.sizeMg}MG</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {formatPrice(product.priceCents)}
        </span>
        <span className="label text-muted transition group-hover:text-accent">
          VIEW →
        </span>
      </div>
    </Link>
  );
}

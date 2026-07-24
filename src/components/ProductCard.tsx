import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { VialVisual } from "@/components/VialVisual";
import type { StoreProduct } from "@/lib/sample-products";

export function ProductCard({ product }: { product: StoreProduct }) {
  const inStock = product.stock > 0;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden border border-border bg-surface transition hover:border-border-strong"
    >
      <div className="relative aspect-square border-b border-border bg-background">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <VialVisual sizeMg={product.sizeMg} className="h-full w-full" />
        )}
        <span className="label absolute left-3 top-3 flex items-center gap-1.5 text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-ok" : "bg-muted"}`}
          />
          {inStock ? "IN STOCK" : "SOLD OUT"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {product.name}
          </h3>
          <p className="label mt-1 text-muted">
            {[product.purity, product.sizeMg != null ? `${product.sizeMg}MG` : null]
              .filter(Boolean)
              .join("  ·  ")}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {formatPrice(product.priceCents)}
          </span>
          <span className="label text-muted transition group-hover:text-accent">
            VIEW →
          </span>
        </div>
      </div>
    </Link>
  );
}

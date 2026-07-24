import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { VialVisual } from "@/components/VialVisual";
import type { StoreProduct } from "@/lib/sample-products";

export function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-accent/60 hover:shadow-[0_0_40px_-12px_var(--accent)]"
    >
      <div className="relative aspect-square bg-gradient-to-b from-surface-2 to-background">
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
        {product.categoryName && (
          <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] tracking-widest text-muted uppercase backdrop-blur">
            {product.categoryName}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-accent-bright">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted">
          {product.purity && <span>{product.purity}</span>}
          {product.purity && product.sizeMg != null && <span>·</span>}
          {product.sizeMg != null && <span>{product.sizeMg}mg</span>}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-base font-semibold text-white">
            {formatPrice(product.priceCents)}
          </span>
          <span className="text-sm text-accent opacity-0 transition group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

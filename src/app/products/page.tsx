import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse high-purity research peptides and compounds.",
};

// Revalidate so the catalog reflects live database changes.
export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = [...new Set(products.map((p) => p.categoryName ?? "Other"))];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <header className="border-b border-border pb-8">
        <span className="label text-accent">CATALOG</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          Research compounds
        </h1>
        <p className="label mt-3 text-muted">
          {products.length} PRODUCTS · LAB-VERIFIED · RESEARCH USE ONLY
        </p>
      </header>

      {categories.map((cat, i) => {
        const items = products.filter(
          (p) => (p.categoryName ?? "Other") === cat,
        );
        return (
          <section key={cat} className="py-12">
            <SectionHeader
              label={cat.toUpperCase()}
              index={i + 1}
              total={categories.length}
            />
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

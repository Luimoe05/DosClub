import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse high-purity research peptides and compounds.",
};

// Revalidate so the catalog reflects live database changes.
export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();

  // Group by category for section headers.
  const categories = [...new Set(products.map((p) => p.categoryName ?? "Other"))];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs tracking-widest text-accent uppercase">Catalog</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">
          Research compounds
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          {products.length} products · lab-verified · for laboratory research use
          only.
        </p>
      </header>

      {categories.map((cat) => {
        const items = products.filter(
          (p) => (p.categoryName ?? "Other") === cat,
        );
        return (
          <section key={cat} className="mb-16">
            <h2 className="mb-6 text-sm font-semibold tracking-widest text-muted uppercase">
              {cat}
            </h2>
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
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

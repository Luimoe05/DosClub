import { prisma } from "@/lib/prisma";
import { sampleProducts, type StoreProduct } from "@/lib/sample-products";

export type { StoreProduct };

/**
 * Whether a live database is configured. When false (or when a query fails)
 * the storefront falls back to the sample catalog so it always renders.
 */
function dbConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(url) && !url!.includes("user:password@host");
}

type PrismaProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  purity: string | null;
  sizeMg: number | null;
  form: string | null;
  priceCents: number;
  imageUrl: string | null;
  stock: number;
  category: { name: string } | null;
};

function toStoreProduct(p: PrismaProduct): StoreProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    purity: p.purity,
    sizeMg: p.sizeMg,
    form: p.form,
    priceCents: p.priceCents,
    imageUrl: p.imageUrl,
    stock: p.stock,
    categoryName: p.category?.name ?? null,
  };
}

export async function getProducts(): Promise<StoreProduct[]> {
  if (!dbConfigured()) return sampleProducts;
  try {
    const rows = await prisma.product.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(toStoreProduct);
  } catch (err) {
    console.warn("[products] DB query failed, using sample catalog:", err);
    return sampleProducts;
  }
}

export async function getFeaturedProducts(limit = 3): Promise<StoreProduct[]> {
  const all = await getProducts();
  return all.slice(0, limit);
}

export async function getProductBySlug(
  slug: string,
): Promise<StoreProduct | null> {
  if (!dbConfigured()) {
    return sampleProducts.find((p) => p.slug === slug) ?? null;
  }
  try {
    const row = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    return row ? toStoreProduct(row) : null;
  } catch (err) {
    console.warn("[products] DB query failed, using sample catalog:", err);
    return sampleProducts.find((p) => p.slug === slug) ?? null;
  }
}

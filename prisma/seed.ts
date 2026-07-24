import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { sampleProducts } from "../src/lib/sample-products";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  // Create categories from the sample catalog.
  const categoryNames = [
    ...new Set(sampleProducts.map((p) => p.categoryName).filter(Boolean)),
  ] as string[];

  const categoryIdByName = new Map<string, string>();
  for (const name of categoryNames) {
    const slug = slugify(name);
    const cat = await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
    categoryIdByName.set(name, cat.id);
  }

  // Upsert products.
  for (const p of sampleProducts) {
    const data = {
      slug: p.slug,
      name: p.name,
      description: p.description,
      purity: p.purity,
      sizeMg: p.sizeMg,
      form: p.form,
      priceCents: p.priceCents,
      stock: p.stock,
      categoryId: p.categoryName
        ? categoryIdByName.get(p.categoryName) ?? null
        : null,
    };
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: data,
    });
  }

  console.log(
    `Seeded ${categoryNames.length} categories and ${sampleProducts.length} products.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

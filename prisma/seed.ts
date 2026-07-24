import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const research = await prisma.category.upsert({
    where: { slug: "research-peptides" },
    update: {},
    create: { name: "Research Peptides", slug: "research-peptides" },
  });

  const blends = await prisma.category.upsert({
    where: { slug: "blends" },
    update: {},
    create: { name: "Blends", slug: "blends" },
  });

  const products = [
    {
      slug: "bpc-157-5mg",
      name: "BPC-157",
      description:
        "Body Protection Compound 157. Lyophilized research peptide for laboratory use. Not for human consumption.",
      purity: "≥99%",
      sizeMg: 5,
      form: "Lyophilized powder",
      priceCents: 3999,
      stock: 100,
      categoryId: research.id,
    },
    {
      slug: "tb-500-5mg",
      name: "TB-500",
      description:
        "Thymosin Beta-4 fragment. High-purity lyophilized peptide for research applications. Not for human consumption.",
      purity: "≥99%",
      sizeMg: 5,
      form: "Lyophilized powder",
      priceCents: 4499,
      stock: 80,
      categoryId: research.id,
    },
    {
      slug: "ghk-cu-50mg",
      name: "GHK-Cu",
      description:
        "Copper peptide GHK-Cu for research use. Not for human consumption.",
      purity: "≥98%",
      sizeMg: 50,
      form: "Lyophilized powder",
      priceCents: 5999,
      stock: 60,
      categoryId: research.id,
    },
    {
      slug: "bpc-tb-blend-10mg",
      name: "BPC-157 / TB-500 Blend",
      description:
        "Pre-measured research blend of BPC-157 and TB-500. Not for human consumption.",
      purity: "≥99%",
      sizeMg: 10,
      form: "Lyophilized powder",
      priceCents: 7999,
      stock: 40,
      categoryId: blends.id,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

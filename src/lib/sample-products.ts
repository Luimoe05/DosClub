// Fallback catalog used when DATABASE_URL is not yet configured, so the
// storefront renders during development. Mirrors prisma/seed.ts.
export type StoreProduct = {
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
  categoryName: string | null;
};

export const sampleProducts: StoreProduct[] = [
  {
    id: "sample-rc3",
    slug: "rc3-30mg",
    name: "RC3",
    description:
      "Research compound RC3, lyophilized to a high-purity powder for laboratory research applications. Not for human consumption.",
    purity: "≥99%",
    sizeMg: 30,
    form: "Lyophilized powder",
    priceCents: 8999,
    imageUrl: null,
    stock: 50,
    categoryName: "Research Peptides",
  },
  {
    id: "sample-bpc",
    slug: "bpc-157-5mg",
    name: "BPC-157",
    description:
      "Body Protection Compound 157. High-purity lyophilized peptide for research use. Not for human consumption.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 3999,
    imageUrl: null,
    stock: 100,
    categoryName: "Research Peptides",
  },
  {
    id: "sample-tb",
    slug: "tb-500-5mg",
    name: "TB-500",
    description:
      "Thymosin Beta-4 fragment. High-purity lyophilized peptide for research applications. Not for human consumption.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 4499,
    imageUrl: null,
    stock: 80,
    categoryName: "Research Peptides",
  },
  {
    id: "sample-ghk",
    slug: "ghk-cu-50mg",
    name: "GHK-Cu",
    description: "Copper peptide GHK-Cu for research use. Not for human consumption.",
    purity: "≥98%",
    sizeMg: 50,
    form: "Lyophilized powder",
    priceCents: 5999,
    imageUrl: null,
    stock: 60,
    categoryName: "Research Peptides",
  },
  {
    id: "sample-blend",
    slug: "bpc-tb-blend-10mg",
    name: "BPC-157 / TB-500 Blend",
    description:
      "Pre-measured research blend of BPC-157 and TB-500. Not for human consumption.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 7999,
    imageUrl: null,
    stock: 40,
    categoryName: "Blends",
  },
];

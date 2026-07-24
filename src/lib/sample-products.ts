// Fallback catalog used when DATABASE_URL is not yet configured, so the
// storefront renders during development. Mirrors prisma/seed.ts.
// A catalog of well-known research peptides. Research use only.
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

const HEALING = "Healing & Recovery";
const METABOLIC = "Metabolic";
const GH = "Growth Hormone";
const LONGEVITY = "Longevity & Cognition";
const COSMETIC = "Cosmetic & Wellness";

type Seed = Omit<StoreProduct, "id" | "imageUrl">;

const seed: Seed[] = [
  // ── Healing & Recovery ──────────────────────────────────────
  {
    slug: "bpc-157",
    name: "BPC-157",
    description:
      "Body Protection Compound 157, a widely studied gastric pentadecapeptide used in tissue-repair and recovery research.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 3999,
    stock: 120,
    categoryName: HEALING,
  },
  {
    slug: "tb-500",
    name: "TB-500",
    description:
      "Synthetic fragment of Thymosin Beta-4, studied for angiogenesis, cell migration, and recovery research.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 4499,
    stock: 90,
    categoryName: HEALING,
  },
  {
    slug: "bpc-157-tb-500-blend",
    name: "BPC-157 / TB-500 Blend",
    description:
      "A pre-measured research blend of BPC-157 and TB-500 in a single vial for combined recovery studies.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 7999,
    stock: 60,
    categoryName: HEALING,
  },
  {
    slug: "kpv",
    name: "KPV",
    description:
      "A tripeptide fragment of alpha-MSH studied for its anti-inflammatory properties in research models.",
    purity: "≥98%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 5499,
    stock: 50,
    categoryName: HEALING,
  },

  // ── Metabolic ───────────────────────────────────────────────
  {
    slug: "semaglutide",
    name: "Semaglutide",
    description:
      "A long-acting GLP-1 receptor agonist widely studied in metabolic and glucose-regulation research.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 12999,
    stock: 70,
    categoryName: METABOLIC,
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    description:
      "A dual GIP / GLP-1 receptor agonist studied for its effects on metabolic pathways.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 15999,
    stock: 55,
    categoryName: METABOLIC,
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    description:
      "A triple GIP / GLP-1 / glucagon receptor agonist under active investigation in metabolic research.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 19999,
    stock: 40,
    categoryName: METABOLIC,
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    description:
      "A modified fragment of human growth hormone (176-191) studied for lipolytic activity.",
    purity: "≥98%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 5499,
    stock: 65,
    categoryName: METABOLIC,
  },

  // ── Growth Hormone ──────────────────────────────────────────
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    description:
      "A selective growth-hormone secretagogue and ghrelin-receptor agonist used in GH research.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 4499,
    stock: 100,
    categoryName: GH,
  },
  {
    slug: "cjc-1295-no-dac",
    name: "CJC-1295 (No DAC)",
    description:
      "A growth-hormone-releasing hormone analog studied for pulsatile GH-release research.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 4999,
    stock: 85,
    categoryName: GH,
  },
  {
    slug: "cjc-1295-ipamorelin-blend",
    name: "CJC-1295 / Ipamorelin Blend",
    description:
      "A pre-measured research blend pairing a GHRH analog with a selective secretagogue.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 8499,
    stock: 60,
    categoryName: GH,
  },
  {
    slug: "sermorelin",
    name: "Sermorelin",
    description:
      "A GHRH (1-29) analog studied for endogenous growth-hormone stimulation in research models.",
    purity: "≥99%",
    sizeMg: 5,
    form: "Lyophilized powder",
    priceCents: 4999,
    stock: 70,
    categoryName: GH,
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    description:
      "A stabilized GHRH analog investigated for its effects on visceral adipose tissue.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 9999,
    stock: 45,
    categoryName: GH,
  },

  // ── Longevity & Cognition ───────────────────────────────────
  {
    slug: "epithalon",
    name: "Epithalon",
    description:
      "A synthetic tetrapeptide studied for telomerase activity and longevity research.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 6499,
    stock: 75,
    categoryName: LONGEVITY,
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    description:
      "A mitochondrial-derived peptide studied for metabolic regulation and longevity research.",
    purity: "≥98%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 7499,
    stock: 55,
    categoryName: LONGEVITY,
  },
  {
    slug: "semax",
    name: "Semax",
    description:
      "A heptapeptide derived from ACTH (4-10) studied for nootropic and neuroprotective properties.",
    purity: "≥98%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 5999,
    stock: 65,
    categoryName: LONGEVITY,
  },
  {
    slug: "selank",
    name: "Selank",
    description:
      "A synthetic analog of tuftsin studied for anxiolytic and cognitive research applications.",
    purity: "≥98%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 5999,
    stock: 60,
    categoryName: LONGEVITY,
  },

  // ── Cosmetic & Wellness ─────────────────────────────────────
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    description:
      "A copper-binding tripeptide studied for skin remodeling, collagen, and cosmetic research.",
    purity: "≥98%",
    sizeMg: 50,
    form: "Lyophilized powder",
    priceCents: 5999,
    stock: 80,
    categoryName: COSMETIC,
  },
  {
    slug: "melanotan-ii",
    name: "Melanotan II",
    description:
      "A synthetic analog of alpha-MSH studied for melanogenesis and pigmentation research.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 3999,
    stock: 90,
    categoryName: COSMETIC,
  },
  {
    slug: "pt-141",
    name: "PT-141 (Bremelanotide)",
    description:
      "A melanocortin-receptor agonist studied for its effects in sexual-function research.",
    purity: "≥99%",
    sizeMg: 10,
    form: "Lyophilized powder",
    priceCents: 4999,
    stock: 70,
    categoryName: COSMETIC,
  },
];

export const sampleProducts: StoreProduct[] = seed.map((p) => ({
  ...p,
  id: `sample-${p.slug}`,
  imageUrl: null,
}));

import { prisma } from "@/lib/prisma";
import { dbConfigured } from "@/lib/db-status";
import { getProductBySlug, type StoreProduct } from "@/lib/products";
import type { CreateOrderInput } from "@/lib/validation";

/** Client-facing error with an HTTP status (used by the API route). */
export class OrderError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "OrderError";
    this.status = status;
  }
}

export type OrderSummary = {
  id: string;
  email: string;
  status: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  items: { slug: string; name: string; priceCents: number; quantity: number }[];
  createdAt: string;
  persisted: boolean;
};

const FLAT_SHIPPING_CENTS = 0;

/**
 * Create an order. Pricing and stock are resolved server-side from the catalog
 * — the client only sends slugs and quantities, never prices. Persists to the
 * database when configured; otherwise returns an ephemeral confirmation.
 */
export async function createOrder(
  input: CreateOrderInput,
): Promise<OrderSummary> {
  // Resolve every line against the authoritative catalog.
  const resolved: { product: StoreProduct; quantity: number }[] = [];
  for (const item of input.items) {
    const product = await getProductBySlug(item.slug);
    if (!product) {
      throw new OrderError(`Unknown product: ${item.slug}`);
    }
    if (product.stock <= 0) {
      throw new OrderError(`Out of stock: ${product.name}`);
    }
    resolved.push({ product, quantity: item.quantity });
  }

  const subtotalCents = resolved.reduce(
    (sum, r) => sum + r.product.priceCents * r.quantity,
    0,
  );
  const shippingCents = FLAT_SHIPPING_CENTS;
  const totalCents = subtotalCents + shippingCents;

  const itemsSummary = resolved.map((r) => ({
    slug: r.product.slug,
    name: r.product.name,
    priceCents: r.product.priceCents,
    quantity: r.quantity,
  }));

  // No database yet: return an ephemeral confirmation so the flow works.
  if (!dbConfigured()) {
    return {
      id: `DC-${Date.now().toString(36).toUpperCase()}`,
      email: input.email,
      status: "PENDING",
      subtotalCents,
      shippingCents,
      totalCents,
      items: itemsSummary,
      createdAt: new Date().toISOString(),
      persisted: false,
    };
  }

  // Persist the order and decrement stock atomically.
  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        email: input.email,
        subtotalCents,
        shippingCents,
        totalCents,
        shipName: input.shipping.name,
        shipLine1: input.shipping.line1,
        shipLine2: input.shipping.line2 || null,
        shipCity: input.shipping.city,
        shipState: input.shipping.state,
        shipPostalCode: input.shipping.postalCode,
        shipCountry: input.shipping.country,
        items: {
          create: resolved.map((r) => ({
            productId: r.product.id,
            nameSnapshot: r.product.name,
            priceCents: r.product.priceCents,
            quantity: r.quantity,
          })),
        },
      },
    });
    for (const r of resolved) {
      await tx.product.update({
        where: { id: r.product.id },
        data: { stock: { decrement: r.quantity } },
      });
    }
    return created;
  });

  return {
    id: order.id,
    email: order.email,
    status: order.status,
    subtotalCents: order.subtotalCents,
    shippingCents: order.shippingCents,
    totalCents: order.totalCents,
    items: itemsSummary,
    createdAt: order.createdAt.toISOString(),
    persisted: true,
  };
}

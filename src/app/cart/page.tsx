"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { VialVisual } from "@/components/VialVisual";

export default function CartPage() {
  const { items, subtotalCents, setQuantity, remove, count } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
        <h1 className="text-3xl font-semibold text-white">Your cart is empty</h1>
        <p className="mt-3 text-muted">
          Browse the catalog to add research compounds.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
        >
          Shop the catalog
        </Link>
      </div>
    );
  }

  const shippingCents = 0;
  const totalCents = subtotalCents + shippingCents;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-4xl font-semibold text-white">Your cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-4 p-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
                <VialVisual sizeMg={item.sizeMg} className="h-full w-full" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-semibold text-white transition hover:text-accent"
                  >
                    {item.name}
                    {item.sizeMg != null && (
                      <span className="text-muted"> · {item.sizeMg}mg</span>
                    )}
                  </Link>
                  <span className="font-semibold text-white">
                    {formatPrice(item.priceCents * item.quantity)}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity - 1)}
                      className="px-3 py-1 text-muted transition hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity + 1)}
                      className="px-3 py-1 text-muted transition hover:text-white"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.slug)}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-white">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotalCents)} />
            <Row
              label="Shipping"
              value={shippingCents === 0 ? "Free" : formatPrice(shippingCents)}
            />
            <div className="border-t border-border pt-3">
              <Row label="Total" value={formatPrice(totalCents)} bold />
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
          >
            Checkout
          </Link>
          <Link
            href="/products"
            className="mt-3 flex w-full items-center justify-center text-sm text-muted transition hover:text-white"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={bold ? "font-semibold text-white" : "text-muted"}>
        {label}
      </dt>
      <dd className={bold ? "text-base font-semibold text-white" : "text-white"}>
        {value}
      </dd>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotalCents, setQuantity, remove, count } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
        <span className="label text-muted">CART · EMPTY</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-3 text-muted">
          Browse the catalog to add research compounds.
        </p>
        <Link
          href="/products"
          className="label mt-8 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90"
        >
          SHOP CATALOG
        </Link>
      </div>
    );
  }

  const shippingCents = 0;
  const totalCents = subtotalCents + shippingCents;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <span className="label text-accent">CART</span>
      <h1 className="mb-10 mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Your cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Items */}
        <ul className="divide-y divide-border border border-border bg-surface">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-4 p-4">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center border border-border bg-background">
                <span className="text-lg font-semibold text-foreground tabular-nums">
                  {item.sizeMg ?? "—"}
                </span>
                <span className="label text-muted">MG</span>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-semibold text-foreground transition hover:text-accent"
                  >
                    {item.name}
                    {item.sizeMg != null && (
                      <span className="label ml-2 text-muted">
                        {item.sizeMg}MG
                      </span>
                    )}
                  </Link>
                  <span className="font-semibold text-foreground tabular-nums">
                    {formatPrice(item.priceCents * item.quantity)}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity - 1)}
                      className="px-3 py-1 text-muted transition hover:text-foreground"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm text-foreground tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.slug, item.quantity + 1)}
                      className="px-3 py-1 text-muted transition hover:text-foreground"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.slug)}
                    className="label text-muted transition hover:text-accent"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit border border-border bg-surface p-6">
          <h2 className="label text-foreground">ORDER SUMMARY</h2>
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
            className="label mt-6 flex w-full items-center justify-center rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90"
          >
            CHECKOUT
          </Link>
          <Link
            href="/products"
            className="label mt-3 flex w-full items-center justify-center text-muted transition hover:text-foreground"
          >
            CONTINUE SHOPPING
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
      <dt className={bold ? "font-semibold text-foreground" : "text-muted"}>
        {label}
      </dt>
      <dd
        className={`tabular-nums ${bold ? "text-base font-semibold text-foreground" : "text-foreground"}`}
      >
        {value}
      </dd>
    </div>
  );
}

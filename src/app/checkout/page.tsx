"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotalCents, count } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Nothing to check out
        </h1>
        <Link
          href="/products"
          className="label mt-8 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90"
        >
          SHOP CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <span className="label text-accent">CHECKOUT</span>
      <h1 className="mb-10 mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Shipping form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="border border-border bg-surface p-6">
            <legend className="label px-2 text-foreground">
              SHIPPING DETAILS
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input label="Full name" className="sm:col-span-2" />
              <Input label="Address line 1" className="sm:col-span-2" />
              <Input label="Address line 2" className="sm:col-span-2" />
              <Input label="City" />
              <Input label="State" />
              <Input label="Postal code" />
              <Input label="Country" />
            </div>
          </fieldset>

          <div className="border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
            Payment integration is not yet wired up. This is a preview of the
            checkout flow — orders will persist to the database once payments are
            connected.
          </div>

          <button
            type="submit"
            className="label w-full rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90"
          >
            PLACE ORDER
          </button>
        </form>

        {/* Summary */}
        <aside className="h-fit border border-border bg-surface p-6">
          <h2 className="label text-foreground">YOUR ORDER</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.slug} className="flex justify-between gap-3">
                <span className="text-muted">
                  {item.name}
                  {item.sizeMg != null && ` · ${item.sizeMg}mg`}
                  <span className="text-muted"> × {item.quantity}</span>
                </span>
                <span className="text-foreground tabular-nums">
                  {formatPrice(item.priceCents * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-base font-semibold text-foreground tabular-nums">
                {formatPrice(subtotalCents)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={className}>
      <label className="label mb-1.5 block text-muted">{label}</label>
      <input className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent" />
    </div>
  );
}

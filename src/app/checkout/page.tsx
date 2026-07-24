"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotalCents, count } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
        <h1 className="text-3xl font-semibold text-white">Nothing to check out</h1>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
        >
          Shop the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-4xl font-semibold text-white">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Shipping form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="rounded-2xl border border-border bg-surface p-6">
            <legend className="px-2 text-sm font-semibold text-white">
              Shipping details
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

          <div className="rounded-lg border border-border bg-surface p-4 text-xs leading-relaxed text-muted">
            Payment integration is not yet wired up. This is a preview of the
            checkout flow — orders will persist to the database once payments are
            connected.
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
          >
            Place order
          </button>
        </form>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-white">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.slug} className="flex justify-between gap-3">
                <span className="text-muted">
                  {item.name}
                  {item.sizeMg != null && ` · ${item.sizeMg}mg`}
                  <span className="text-muted"> × {item.quantity}</span>
                </span>
                <span className="text-white">
                  {formatPrice(item.priceCents * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex justify-between">
              <span className="font-semibold text-white">Total</span>
              <span className="text-base font-semibold text-white">
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
      <label className="mb-1.5 block text-sm text-foreground">{label}</label>
      <input
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent"
      />
    </div>
  );
}

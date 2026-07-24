"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import type { OrderSummary } from "@/lib/orders";

type Status = "idle" | "submitting" | "error";

export default function CheckoutPage() {
  const { items, subtotalCents, count, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topError, setTopError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderSummary | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setTopError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      email: String(fd.get("email") ?? "").trim(),
      shipping: {
        name: String(fd.get("name") ?? "").trim(),
        line1: String(fd.get("line1") ?? "").trim(),
        line2: String(fd.get("line2") ?? "").trim(),
        city: String(fd.get("city") ?? "").trim(),
        state: String(fd.get("state") ?? "").trim(),
        postalCode: String(fd.get("postalCode") ?? "").trim(),
        country: String(fd.get("country") ?? "").trim(),
      },
      items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.status === 201) {
        setOrder(data.order as OrderSummary);
        clear();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (res.status === 400 && data.fields) {
        setErrors(data.fields as Record<string, string>);
        setTopError("Please fix the highlighted fields.");
      } else {
        setTopError(data.error ?? "Something went wrong. Please try again.");
      }
      setStatus("error");
    } catch {
      setTopError("Network error. Please try again.");
      setStatus("error");
    }
  }

  // ── Confirmation ────────────────────────────────────────────
  if (order) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <span className="label flex items-center gap-2 text-ok">
          <span className="h-2 w-2 rounded-full bg-ok" />
          ORDER CONFIRMED
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          Thank you.
        </h1>
        <p className="mt-3 text-muted">
          Order <span className="font-semibold text-foreground">{order.id}</span>{" "}
          has been received. A confirmation has been sent to{" "}
          <span className="text-foreground">{order.email}</span>.
        </p>

        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-surface">
          <ul className="divide-y divide-border">
            {order.items.map((it) => (
              <li
                key={it.slug}
                className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
              >
                <span className="text-muted">
                  {it.name}
                  <span className="text-muted"> × {it.quantity}</span>
                </span>
                <span className="text-foreground tabular-nums">
                  {formatPrice(it.priceCents * it.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-semibold text-foreground tabular-nums">
              {formatPrice(order.totalCents)}
            </span>
          </div>
        </div>

        {!order.persisted && (
          <p className="label mt-4 text-muted">
            DEMO MODE · ORDER NOT PERSISTED (NO DATABASE CONNECTED)
          </p>
        )}

        <Link href="/products" className="btn btn-primary mt-8 inline-flex">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Nothing to check out
        </h1>
        <Link href="/products" className="btn btn-primary mt-8">
          SHOP CATALOG
        </Link>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <span className="label text-accent">CHECKOUT</span>
      <h1 className="mb-2 mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Checkout
      </h1>
      <p className="mb-10 text-sm text-muted">
        No account needed — just your contact and shipping details.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <fieldset className="rounded-lg border border-border bg-surface p-6">
              <legend className="label px-2 text-foreground">CONTACT</legend>
              <div className="mt-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@lab.com"
                  error={errors.email}
                />
              </div>
            </fieldset>

            <fieldset className="rounded-lg border border-border bg-surface p-6">
              <legend className="label px-2 text-foreground">
                SHIPPING DETAILS
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full name"
                  name="name"
                  className="sm:col-span-2"
                  error={errors["shipping.name"]}
                />
                <Input
                  label="Address line 1"
                  name="line1"
                  className="sm:col-span-2"
                  error={errors["shipping.line1"]}
                />
                <Input
                  label="Address line 2 (optional)"
                  name="line2"
                  className="sm:col-span-2"
                  error={errors["shipping.line2"]}
                />
                <Input label="City" name="city" error={errors["shipping.city"]} />
                <Input
                  label="State / Region"
                  name="state"
                  error={errors["shipping.state"]}
                />
                <Input
                  label="Postal code"
                  name="postalCode"
                  error={errors["shipping.postalCode"]}
                />
                <Input
                  label="Country"
                  name="country"
                  defaultValue="United States"
                  error={errors["shipping.country"]}
                />
              </div>
            </fieldset>

            {topError && (
              <p className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                {topError}
              </p>
            )}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-lg border border-border bg-surface p-6">
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
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary mt-6 w-full disabled:opacity-60"
            >
              {submitting ? "PLACING ORDER…" : "PLACE ORDER"}
            </button>
            <p className="label mt-3 text-center text-muted">
              SECURE · RESEARCH USE ONLY
            </p>
          </aside>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  className = "",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      <label className="label mb-1.5 block text-muted">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent ${
          error ? "border-accent" : "border-border"
        }`}
      />
      {error && <p className="mt-1 text-xs text-accent">{error}</p>}
    </div>
  );
}

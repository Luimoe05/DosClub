"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/components/cart/CartProvider";

export function AddToCartButton({
  product,
  className = "",
}: {
  product: Omit<CartItem, "quantity">;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright active:scale-[0.98] ${className}`}
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}

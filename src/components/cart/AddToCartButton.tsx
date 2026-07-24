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
      className={`label inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90 active:scale-[0.98] ${className}`}
    >
      {added ? "ADDED ✓" : "ADD TO CART"}
    </button>
  );
}

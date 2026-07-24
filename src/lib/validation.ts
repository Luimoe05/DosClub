import { z } from "zod";

export const orderItemSchema = z.object({
  slug: z.string().min(1).max(120),
  quantity: z.number().int().min(1).max(99),
});

export const shippingSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  line1: z.string().min(1, "Address is required").max(160),
  line2: z.string().max(160).optional().default(""),
  city: z.string().min(1, "City is required").max(80),
  state: z.string().min(1, "State is required").max(80),
  postalCode: z.string().min(1, "Postal code is required").max(20),
  country: z.string().min(2, "Country is required").max(60),
});

export const createOrderSchema = z.object({
  email: z.email("A valid email is required").max(160),
  shipping: shippingSchema,
  items: z.array(orderItemSchema).min(1, "Cart is empty").max(50),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

/** Version-safe flattening of zod issues into { field: message } pairs. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

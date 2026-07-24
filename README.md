# DOS CLUB RESEARCH

Fullstack e-commerce storefront for premium research compounds (peptides).
Dark-luxe brand: charcoal + hot-magenta, the "DC" lens mark.

> **Research use only.** All products are for laboratory research and are **not
> for human consumption**.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4**
- **Prisma 7** + **PostgreSQL** (driver adapter: `@prisma/adapter-pg`)
- Client cart via React context + `localStorage`

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

The storefront renders immediately using a **sample catalog** (`src/lib/sample-products.ts`)
so no database is required for local UI work. Connect a real database to switch
to live data.

## Connecting a database

1. Create a free Postgres DB on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
2. Put the connection string in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
   ```
3. Push the schema and seed sample products:
   ```bash
   npm run db:push
   npm run db:seed
   ```

Once `DATABASE_URL` points at a real host, the app reads from the database
instead of the sample catalog.

## Scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Dev server                           |
| `npm run build`    | Production build (runs `prisma generate`) |
| `npm run db:push`  | Push Prisma schema to the database   |
| `npm run db:seed`  | Seed sample products                 |
| `npm run db:studio`| Open Prisma Studio                   |
| `npm run lint`     | ESLint                               |

## Project structure

```
prisma/
  schema.prisma      # User, Product, Category, Cart, Order, OrderItem
  seed.ts            # sample catalog seeder
src/
  app/               # routes: /, /products, /products/[slug], /cart, /checkout, /about, /contact, /login
  components/        # Header, Footer, Logo, ProductCard, VialVisual, cart/*
  lib/               # prisma client, products data-access, formatting
```

## Roadmap

- [ ] Authentication (sign up / sign in, sessions)
- [ ] Persist orders to the database at checkout
- [ ] Payment integration
- [ ] Admin dashboard for product/order management
- [ ] Real product photography (replaces the `VialVisual` placeholder)

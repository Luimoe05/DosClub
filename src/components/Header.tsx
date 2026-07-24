import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CartBadge } from "@/components/CartBadge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { href: "/products", label: "CATALOG" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label text-muted transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CartBadge />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

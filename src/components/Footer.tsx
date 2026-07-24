import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LiveClock } from "@/components/LiveClock";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              High-purity research compounds for laboratory and research use.
              All products are strictly not for human consumption.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="SHOP"
              links={[
                { href: "/products", label: "Catalog" },
                { href: "/cart", label: "Cart" },
              ]}
            />
            <FooterCol
              title="COMPANY"
              links={[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ]}
            />
            <FooterCol
              title="LEGAL"
              links={[
                { href: "/terms", label: "Terms" },
                { href: "/privacy", label: "Privacy" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 rounded-md border border-border bg-background/60 p-4 text-xs leading-relaxed text-muted">
          <strong className="text-foreground">Research use only.</strong> The
          products sold on this site are intended solely for laboratory research
          and are{" "}
          <span className="text-accent">not for human consumption</span>, in vivo
          use, food, drug, or cosmetic applications. By purchasing you confirm
          you are a qualified researcher.
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="label text-muted">
            © {new Date().getFullYear()} DOS CLUB RESEARCH
          </span>
          <LiveClock prefix="SHIPS WORLDWIDE / " />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="label mb-3 text-foreground">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-muted transition hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

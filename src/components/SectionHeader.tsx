import Link from "next/link";

/** Numbered section header with a hairline rule, echoing the reference site. */
export function SectionHeader({
  label,
  index,
  total,
  href,
}: {
  label: string;
  index?: number;
  total?: number;
  href?: string;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-4">
      <span className="label flex items-center gap-2 text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
      {href && (
        <Link
          href={href}
          className="label text-muted transition hover:text-accent"
        >
          VIEW ALL →
        </Link>
      )}
      {index != null && total != null && (
        <span className="label text-muted tabular-nums">
          {pad(index)} / {pad(total)}
        </span>
      )}
    </div>
  );
}

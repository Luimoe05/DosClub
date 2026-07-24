import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dos Club Research.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <span className="label text-accent">CONTACT</span>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
        Get in touch
      </h1>
      <p className="mt-3 text-muted">
        Questions about products, orders, or wholesale? Send us a message.
      </p>

      <form className="mt-10 space-y-5">
        <Field label="Name" name="name" type="text" placeholder="Your name" />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@lab.com"
        />
        <div>
          <label className="label mb-1.5 block text-muted">MESSAGE</label>
          <textarea
            name="message"
            rows={5}
            placeholder="How can we help?"
            className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="label inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90"
        >
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="label mb-1.5 block text-muted">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
      />
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dos Club Research.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <p className="text-xs tracking-widest text-accent uppercase">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold text-white">Get in touch</h1>
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
          <label className="mb-1.5 block text-sm text-foreground">Message</label>
          <textarea
            name="message"
            rows={5}
            placeholder="How can we help?"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
        >
          Send message
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
      <label className="mb-1.5 block text-sm text-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent"
      />
    </div>
  );
}

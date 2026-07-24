import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Dos Club Research account.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24">
      <LogoMark className="h-12 w-12" />
      <h1 className="mt-6 text-3xl font-semibold text-white">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">Sign in to your account.</p>

      <form className="mt-10 w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-accent"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-bright"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        No account?{" "}
        <Link href="/register" className="text-accent hover:text-accent-bright">
          Create one
        </Link>
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Dos Club Research account.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <Frame className="p-8">
        <div className="flex flex-col items-center">
          <LogoMark className="h-11 w-14" />
          <span className="label mt-5 text-muted">ACCOUNT</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
        </div>

        <form className="mt-8 w-full space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-accent"
          />
          <button
            type="submit"
            className="label w-full rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90"
          >
            SIGN IN
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          No account?{" "}
          <Link href="/register" className="text-accent hover:text-accent-bright">
            Create one
          </Link>
        </p>
      </Frame>
    </div>
  );
}

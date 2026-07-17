"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function PortalLogin() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("That email or password isn't right. Double check and try again.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="text-mono-label mb-4 text-xs text-ink-soft">
        Contractor portal
      </p>
      <h1 className="font-display text-4xl leading-tight text-ink">
        Log in to see open jobs.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        This portal is for vetted tradespeople only. If you haven&rsquo;t
        been sent a login,{" "}
        <Link href="/careers" className="text-ink underline hover:no-underline">
          send us your portfolio
        </Link>{" "}
        first.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-ink/20 bg-card px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-ink/20 bg-card px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          />
        </label>

        {error && (
          <p className="text-sm text-stamp-ink" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="text-mono-label w-full rounded-full bg-ink px-6 py-3 text-xs text-paper-2 transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

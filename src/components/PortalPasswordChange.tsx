"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PortalPasswordChange({
  contractorId,
}: {
  contractorId: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those passwords don't match.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setLoading(false);
      setError(updateError.message);
      return;
    }

    const { error: rowError } = await supabase
      .from("contractors")
      .update({ must_change_password: false })
      .eq("id", contractorId);

    setLoading(false);

    if (rowError) {
      setError(rowError.message);
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
        Set your own password.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        You&rsquo;re logging in with a password we set for you - replace it
        with your own before you go any further.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">New password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-ink/20 bg-card px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Confirm password</span>
          <input
            required
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          {loading ? "Saving…" : "Set password and continue"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { signNda } from "@/app/admin/actions";

export default function NdaSignForm({ token }: { token: string }) {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError("You need to tick the box to confirm you've read this.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const res = await signNda(token, name);
    setSubmitting(false);

    if (res.error) {
      setError(res.error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-lg border border-stamp/40 bg-card p-6">
        <p className="text-mono-label text-stamp-ink">Signed</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Thanks, {name}. Steady Hand Studios will be in touch with your
          portal login shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-ink"
        />
        <span className="text-ink-soft">
          I have read and understood this Agreement and agree to be bound
          by it.
        </span>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">
          Type your full name to sign
        </span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-sm rounded-md border border-ink/20 bg-card px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          placeholder="Full name"
        />
      </label>

      {error && (
        <p className="text-sm text-stamp-ink" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="text-mono-label rounded-full bg-ink px-6 py-3 text-xs text-paper-2 transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {submitting ? "Signing…" : "Sign agreement"}
      </button>
    </form>
  );
}

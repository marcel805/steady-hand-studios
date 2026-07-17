"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createContractor } from "@/app/admin/actions";

export default function CreateContractorForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    email: string;
    password: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setError(null);
    const res = await createContractor(formData);
    setSubmitting(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    setResult({ email: res.email!, password: res.password! });
    router.refresh();
  }

  if (result) {
    return (
      <div className="rounded-lg border border-stamp/40 bg-card p-6">
        <p className="text-mono-label text-stamp-ink">Login created</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Send these to {result.email}{" "}
          yourself (WhatsApp, call, whatever) —
          this is the only time the password is shown. They&rsquo;ll be
          asked to set their own on first login.
        </p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-ink-soft">Email</dt>
            <dd className="text-ink">{result.email}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-soft">Password</dt>
            <dd className="font-mono text-ink">{result.password}</dd>
          </div>
        </dl>
        <button
          onClick={() => setResult(null)}
          className="text-mono-label mt-5 text-xs text-ink underline hover:no-underline"
        >
          Create another
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-lg border border-ink/12 bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Full name</span>
          <input
            required
            name="name"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Email</span>
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Phone</span>
          <input
            name="phone"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Trade</span>
          <input
            name="trade"
            placeholder="Welder, sprayer, rigger…"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
      </div>

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
        {submitting ? "Creating…" : "Create login"}
      </button>
    </form>
  );
}

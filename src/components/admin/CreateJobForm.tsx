"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/app/admin/actions";

export default function CreateJobForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setError(null);
    const res = await createJob(formData);
    setSubmitting(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-mono-label rounded-full bg-ink px-6 py-3 text-xs text-paper-2 transition-colors hover:bg-ink-soft"
      >
        Post a job
      </button>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-lg border border-ink/12 bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Ticket number</span>
          <input
            required
            name="ticket"
            placeholder="SHS-0120"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Title</span>
          <input
            required
            name="title"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Trade</span>
          <input
            required
            name="trade"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Location</span>
          <input
            required
            name="location"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Day rate</span>
          <input
            name="dayRate"
            placeholder="R 2 800 / day"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Duration</span>
          <input
            name="duration"
            placeholder="3 days"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-ink-soft">Timing</span>
          <input
            name="callDate"
            placeholder="Starts 21 Jul"
            className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">Brief</span>
        <textarea
          name="brief"
          rows={3}
          className="w-full rounded-md border border-ink/20 bg-paper-2 px-3 py-2 text-ink outline-none focus-visible:border-ink"
        />
      </label>

      {error && (
        <p className="text-sm text-stamp-ink" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="text-mono-label rounded-full bg-ink px-6 py-3 text-xs text-paper-2 transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post job"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-mono-label text-xs text-ink-soft hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Job } from "@/lib/jobs";
import StatusStamp from "@/components/StatusStamp";

export default function JobsBoard({ jobs }: { jobs: Job[] }) {
  const [openTicket, setOpenTicket] = useState<string | null>(null);
  const [nominated, setNominated] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({ name: "", contact: "", note: "" });

  function startNomination(ticket: string) {
    setOpenTicket(ticket);
    setForm({ name: "", contact: "", note: "" });
  }

  function submitNomination(e: React.FormEvent) {
    e.preventDefault();
    if (!openTicket) return;
    setNominated((prev) => new Set(prev).add(openTicket));
    setOpenTicket(null);
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const isNominated = nominated.has(job.ticket);
        const isOpen = job.status === "open";
        const formOpenHere = openTicket === job.ticket;

        return (
          <div
            key={job.ticket}
            className="rounded-md border border-ink/12 bg-card"
          >
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-mono-label text-[11px] text-ink-soft">
                    {job.ticket}
                  </span>
                  <StatusStamp status={job.status} />
                </div>
                <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  {job.trade} · {job.location}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
                  {job.brief}
                </p>
                <dl className="text-mono-label mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-ink">
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Rate</dt>
                    <dd>{job.dayRate}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Duration</dt>
                    <dd>{job.duration}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Timing</dt>
                    <dd>{job.callDate}</dd>
                  </div>
                  {typeof job.nominees === "number" && (
                    <div className="flex gap-2">
                      <dt className="text-ink-soft">Nominations</dt>
                      <dd>{job.nominees + (isNominated ? 1 : 0)}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="shrink-0 sm:pt-1">
                {!isOpen ? (
                  <span className="text-mono-label text-[11px] text-ink-soft">
                    Nominations closed
                  </span>
                ) : isNominated ? (
                  <span className="text-stamp inline-flex -rotate-2 items-center rounded-sm border-[2.5px] border-ink px-2.5 py-1 text-[11px] text-ink">
                    You&rsquo;re on the ticket
                  </span>
                ) : (
                  <button
                    onClick={() => startNomination(job.ticket)}
                    className="text-mono-label rounded-full bg-ink px-5 py-2.5 text-xs text-paper-2 transition-colors hover:bg-ink-soft"
                  >
                    Nominate yourself
                  </button>
                )}
              </div>
            </div>

            {formOpenHere && (
              <form
                onSubmit={submitNomination}
                className="border-t border-ink/10 bg-paper-2 p-6"
              >
                <p className="text-mono-label mb-4 text-[11px] text-ink-soft">
                  Nominate yourself for {job.ticket}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-ink-soft">
                      Your name
                    </span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="w-full rounded-md border border-ink/20 bg-card px-3 py-2 text-ink outline-none focus-visible:border-ink"
                      placeholder="Full name"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-ink-soft">
                      Phone or email
                    </span>
                    <input
                      required
                      value={form.contact}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, contact: e.target.value }))
                      }
                      className="w-full rounded-md border border-ink/20 bg-card px-3 py-2 text-ink outline-none focus-visible:border-ink"
                      placeholder="082 000 0000"
                    />
                  </label>
                </div>
                <label className="mt-4 block text-sm">
                  <span className="mb-1.5 block text-ink-soft">
                    Anything we should know? (optional)
                  </span>
                  <textarea
                    value={form.note}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, note: e.target.value }))
                    }
                    rows={2}
                    className="w-full rounded-md border border-ink/20 bg-card px-3 py-2 text-ink outline-none focus-visible:border-ink"
                    placeholder="Relevant tickets, availability, past work"
                  />
                </label>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="text-mono-label rounded-full bg-stamp px-5 py-2.5 text-xs text-paper-2 transition-colors hover:bg-stamp-ink"
                  >
                    Send nomination
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenTicket(null)}
                    className="text-mono-label text-xs text-ink-soft hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}

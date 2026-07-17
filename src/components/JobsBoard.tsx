"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import StatusStamp, { JobStatus } from "@/components/StatusStamp";
import JobFiles, { JobFile } from "@/components/JobFiles";

export type PortalJob = {
  id: string;
  ticket: string;
  title: string;
  trade: string;
  location: string;
  dayRate: string;
  duration: string;
  callDate: string;
  brief: string;
  status: JobStatus;
  nominationCount: number;
  alreadyNominated: boolean;
  files: JobFile[];
};

export default function JobsBoard({
  jobs,
  contractorId,
}: {
  jobs: PortalJob[];
  contractorId: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startNomination(jobId: string) {
    setOpenJobId(jobId);
    setNote("");
    setError(null);
  }

  async function submitNomination(e: React.FormEvent, job: PortalJob) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("nominations").insert({
      job_id: job.id,
      contractor_id: contractorId,
      note: note || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError(
        insertError.code === "23505"
          ? "You've already nominated yourself for this one."
          : "Something went wrong sending that - try again."
      );
      return;
    }

    setOpenJobId(null);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const isOpen = job.status === "open";
        const formOpenHere = openJobId === job.id;

        return (
          <div
            key={job.id}
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
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Nominations</dt>
                    <dd>{job.nominationCount}</dd>
                  </div>
                </dl>
                {job.files.length > 0 && (
                  <div className="mt-4 max-w-md">
                    <JobFiles jobId={job.id} files={job.files} />
                  </div>
                )}
              </div>

              <div className="shrink-0 sm:pt-1">
                {!isOpen ? (
                  <span className="text-mono-label text-[11px] text-ink-soft">
                    Nominations closed
                  </span>
                ) : job.alreadyNominated ? (
                  <span className="text-stamp inline-flex -rotate-2 items-center rounded-sm border-[2.5px] border-ink px-2.5 py-1 text-[11px] text-ink">
                    You&rsquo;re on the ticket
                  </span>
                ) : (
                  <button
                    onClick={() => startNomination(job.id)}
                    className="text-mono-label rounded-full bg-ink px-5 py-2.5 text-xs text-paper-2 transition-colors hover:bg-ink-soft"
                  >
                    Nominate yourself
                  </button>
                )}
              </div>
            </div>

            {formOpenHere && (
              <form
                onSubmit={(e) => submitNomination(e, job)}
                className="border-t border-ink/10 bg-paper-2 p-6"
              >
                <p className="text-mono-label mb-4 text-[11px] text-ink-soft">
                  Nominate yourself for {job.ticket}
                </p>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-ink-soft">
                    Anything we should know? (optional)
                  </span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="w-full rounded-md border border-ink/20 bg-card px-3 py-2 text-ink outline-none focus-visible:border-ink"
                    placeholder="Relevant experience, availability, anything specific to this job"
                  />
                </label>

                {error && (
                  <p className="mt-3 text-sm text-stamp-ink" role="alert">
                    {error}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="text-mono-label rounded-full bg-stamp px-5 py-2.5 text-xs text-paper-2 transition-colors hover:bg-stamp-ink disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Send nomination"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenJobId(null)}
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

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateJobStatus, awardJob } from "@/app/admin/actions";

const STATUSES = ["open", "shortlisted", "awarded", "paid"] as const;

export function StatusButtons({
  jobId,
  currentStatus,
}: {
  jobId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <button
          key={status}
          disabled={isPending || status === currentStatus}
          onClick={() =>
            startTransition(async () => {
              await updateJobStatus(jobId, status);
              router.refresh();
            })
          }
          className={`text-mono-label rounded-full border px-4 py-2 text-xs transition-colors ${
            status === currentStatus
              ? "border-ink bg-ink text-paper-2"
              : "border-ink/25 text-ink hover:border-ink"
          } disabled:opacity-60`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export function AwardButton({
  jobId,
  contractorId,
}: {
  jobId: string;
  contractorId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <span className="text-mono-label text-[11px] text-stamp-ink">
        Awarded
      </span>
    );
  }

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await awardJob(jobId, contractorId);
          setDone(true);
          router.refresh();
        })
      }
      className="text-mono-label rounded-full bg-stamp px-4 py-2 text-xs text-paper-2 transition-colors hover:bg-stamp-ink disabled:opacity-60"
    >
      Award this job
    </button>
  );
}

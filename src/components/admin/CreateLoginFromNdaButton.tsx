"use client";

import { useState, useTransition } from "react";
import { createContractorFromNda } from "@/app/admin/actions";

export default function CreateLoginFromNdaButton({
  ndaRequestId,
}: {
  ndaRequestId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (result) {
    return (
      <div className="rounded-md border border-stamp/40 bg-paper-2 px-4 py-3 text-sm">
        <p className="text-mono-label text-stamp-ink">Login created</p>
        <p className="mt-2 text-ink-soft">
          Send to {result.email} yourself - shown once.
        </p>
        <p className="mt-2 font-mono text-ink">{result.password}</p>
      </div>
    );
  }

  return (
    <div>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await createContractorFromNda(ndaRequestId);
            if (res.error) {
              setError(res.error);
              return;
            }
            setResult({ email: res.email!, password: res.password! });
          })
        }
        className="text-mono-label rounded-full bg-stamp px-4 py-2 text-xs text-paper-2 transition-colors hover:bg-stamp-ink disabled:opacity-60"
      >
        {isPending ? "Creating…" : "Create login"}
      </button>
      {error && <p className="mt-2 text-xs text-stamp-ink">{error}</p>}
    </div>
  );
}

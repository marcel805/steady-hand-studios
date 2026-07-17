"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteJobFile,
  getJobFileUrl,
  uploadJobFile,
} from "@/app/admin/actions";

export type JobFile = {
  id: string;
  file_name: string;
  file_path: string;
  size_bytes: number | null;
};

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function JobFiles({
  jobId,
  files,
  canManage = false,
}: {
  jobId: string;
  files: JobFile[];
  canManage?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleDownload(path: string) {
    try {
      const url = await getJobFileUrl(path);
      window.open(url, "_blank");
    } catch {
      setError("Couldn't open that file - try again.");
    }
  }

  function handleUpload(formData: FormData) {
    startTransition(async () => {
      const res = await uploadJobFile(jobId, formData);
      if (res.error) {
        setError(res.error);
        return;
      }
      setError(null);
      fileInputRef.current!.value = "";
      router.refresh();
    });
  }

  function handleDelete(fileId: string, path: string) {
    startTransition(async () => {
      const res = await deleteJobFile(fileId, path);
      if (res.error) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      {files.length === 0 && !canManage ? (
        <p className="text-sm text-ink-soft">No files attached.</p>
      ) : (
        <div className="space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between gap-4 rounded-md border border-ink/12 bg-card px-4 py-2.5"
            >
              <button
                onClick={() => handleDownload(f.file_path)}
                className="text-sm text-ink underline hover:no-underline"
              >
                {f.file_name}
              </button>
              <div className="flex items-center gap-3">
                <span className="text-mono-label text-[11px] text-ink-soft">
                  {formatSize(f.size_bytes)}
                </span>
                {canManage && (
                  <button
                    disabled={isPending}
                    onClick={() => handleDelete(f.id, f.file_path)}
                    className="text-mono-label text-[11px] text-stamp-ink hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {canManage && (
        <form
          action={handleUpload}
          className="mt-4 flex flex-wrap items-center gap-3"
        >
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            required
            className="text-sm text-ink-soft"
          />
          <button
            type="submit"
            disabled={isPending}
            className="text-mono-label rounded-full border border-ink/25 px-4 py-2 text-xs text-ink transition-colors hover:border-ink disabled:opacity-60"
          >
            {isPending ? "Uploading…" : "Attach file"}
          </button>
        </form>
      )}

      {error && <p className="mt-2 text-sm text-stamp-ink">{error}</p>}
    </div>
  );
}

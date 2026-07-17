import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SectionLabel from "@/components/SectionLabel";
import StatusStamp, { JobStatus } from "@/components/StatusStamp";
import CreateJobForm from "@/components/admin/CreateJobForm";

export default async function AdminJobsPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, ticket, title, trade, status")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <SectionLabel label={`Jobs (${jobs?.length ?? 0})`} />
        <CreateJobForm />
      </div>

      <div className="space-y-3">
        {(jobs ?? []).map((job) => (
          <Link
            key={job.id}
            href={`/admin/jobs/${job.id}`}
            className="flex items-center justify-between gap-4 rounded-md border border-ink/12 bg-card px-5 py-4 transition-colors hover:border-ink/30"
          >
            <div>
              <p className="text-mono-label text-[11px] text-ink-soft">
                {job.ticket} · {job.trade}
              </p>
              <p className="font-display text-lg leading-tight text-ink">
                {job.title}
              </p>
            </div>
            <StatusStamp status={job.status as JobStatus} />
          </Link>
        ))}
        {(!jobs || jobs.length === 0) && (
          <p className="text-sm text-ink-soft">
            No jobs posted yet — use &ldquo;Post a job&rdquo; above.
          </p>
        )}
      </div>
    </div>
  );
}

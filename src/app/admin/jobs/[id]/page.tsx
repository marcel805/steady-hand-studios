import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SectionLabel from "@/components/SectionLabel";
import StatusStamp, { JobStatus } from "@/components/StatusStamp";
import { StatusButtons, AwardButton } from "@/components/admin/JobStatusControls";

export default async function AdminJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!job) notFound();

  const { data: nominations } = await supabase
    .from("nominations")
    .select("id, note, created_at, contractors(id, name, email, phone, trade)")
    .eq("job_id", id)
    .order("created_at", { ascending: true });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-mono-label text-xs text-ink-soft">
            {job.ticket} · {job.trade} · {job.location}
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink">{job.title}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
            {job.brief}
          </p>
        </div>
        <StatusStamp status={job.status as JobStatus} />
      </div>

      <div className="mb-10">
        <SectionLabel label="Status" />
        <StatusButtons jobId={job.id} currentStatus={job.status} />
      </div>

      <div>
        <SectionLabel label={`Nominations (${nominations?.length ?? 0})`} />
        <div className="space-y-3">
          {(nominations ?? []).map((n) => {
            const contractor = Array.isArray(n.contractors)
              ? n.contractors[0]
              : n.contractors;
            if (!contractor) return null;
            const isWinner = job.awarded_to === contractor.id;
            return (
              <div
                key={n.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-ink/12 bg-card px-5 py-4"
              >
                <div>
                  <p className="text-ink">{contractor.name}</p>
                  <p className="text-mono-label text-[11px] text-ink-soft">
                    {contractor.trade ?? "-"} · {contractor.email}{" "}
                    {contractor.phone ? `· ${contractor.phone}` : ""}
                  </p>
                  {n.note && (
                    <p className="mt-2 max-w-lg text-sm text-ink-soft">
                      {n.note}
                    </p>
                  )}
                </div>
                {isWinner ? (
                  <span className="text-mono-label text-[11px] text-stamp-ink">
                    Awarded
                  </span>
                ) : (
                  <AwardButton jobId={job.id} contractorId={contractor.id} />
                )}
              </div>
            );
          })}
          {(!nominations || nominations.length === 0) && (
            <p className="text-sm text-ink-soft">No nominations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

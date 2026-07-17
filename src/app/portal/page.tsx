import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import PortalLogin from "@/components/PortalLogin";
import PortalPasswordChange from "@/components/PortalPasswordChange";
import SignOutButton from "@/components/SignOutButton";
import SectionLabel from "@/components/SectionLabel";
import JobsBoard, { PortalJob } from "@/components/JobsBoard";
import { JobStatus } from "@/components/StatusStamp";

export const metadata: Metadata = {
  title: "Portal - Steady Hand Studios",
  description: "Login for vetted Steady Hand Studios contractors.",
  robots: { index: false, follow: false },
};

export default async function PortalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <PortalLogin />;
  }

  const { data: contractor } = await supabase
    .from("contractors")
    .select("id, must_change_password, status")
    .eq("id", user.id)
    .maybeSingle();

  if (!contractor) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="text-sm leading-relaxed text-ink-soft">
          This login isn&rsquo;t set up as a contractor account. If
          you&rsquo;re staff, use the admin panel instead.
        </p>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </div>
    );
  }

  if (contractor.must_change_password) {
    return <PortalPasswordChange contractorId={user.id} />;
  }

  if (contractor.status === "disabled") {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="text-sm leading-relaxed text-ink-soft">
          Your access to the portal has been paused. Get in touch with
          Steady Hand Studios if you think that&rsquo;s wrong.
        </p>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </div>
    );
  }

  const [{ data: jobs }, { data: nominations }, { data: counts }] =
    await Promise.all([
      supabase
        .from("jobs")
        .select(
          "id, ticket, title, trade, location, day_rate, duration, call_date, brief, status"
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("nominations")
        .select("job_id")
        .eq("contractor_id", user.id),
      supabase.rpc("job_nomination_counts"),
    ]);

  const myNominatedJobIds = new Set(
    (nominations ?? []).map((n) => n.job_id)
  );
  const countByJobId = new Map(
    (counts ?? []).map((c: { job_id: string; count: number }) => [
      c.job_id,
      c.count,
    ])
  );

  const portalJobs: PortalJob[] = (jobs ?? []).map((j) => ({
    id: j.id,
    ticket: j.ticket,
    title: j.title,
    trade: j.trade,
    location: j.location,
    dayRate: j.day_rate,
    duration: j.duration,
    callDate: j.call_date,
    brief: j.brief,
    status: j.status as JobStatus,
    nominationCount: countByJobId.get(j.id) ?? 0,
    alreadyNominated: myNominatedJobIds.has(j.id),
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
      <div className="mb-8 flex items-center justify-between">
        <SectionLabel label="Open tickets" />
        <SignOutButton />
      </div>
      {portalJobs.length === 0 ? (
        <p className="text-sm text-ink-soft">
          Nothing posted right now - check back soon.
        </p>
      ) : (
        <JobsBoard jobs={portalJobs} contractorId={user.id} />
      )}
    </div>
  );
}

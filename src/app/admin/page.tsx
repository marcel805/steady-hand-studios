import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHome() {
  const supabase = await createClient();

  const [{ count: contractorCount }, { count: openJobCount }] =
    await Promise.all([
      supabase
        .from("contractors")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("jobs")
        .select("id", { count: "exact", head: true })
        .eq("status", "open"),
    ]);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Link
        href="/admin/contractors"
        className="rounded-lg border border-ink/12 bg-card p-6 transition-colors hover:border-ink/30"
      >
        <p className="text-mono-label text-xs text-ink-soft">Contractors</p>
        <p className="mt-2 font-display text-4xl text-ink">
          {contractorCount ?? 0}
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Create logins for vetted tradespeople
        </p>
      </Link>
      <Link
        href="/admin/jobs"
        className="rounded-lg border border-ink/12 bg-card p-6 transition-colors hover:border-ink/30"
      >
        <p className="text-mono-label text-xs text-ink-soft">Open jobs</p>
        <p className="mt-2 font-display text-4xl text-ink">
          {openJobCount ?? 0}
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Post jobs and manage nominations
        </p>
      </Link>
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SectionLabel from "@/components/SectionLabel";

export default async function AdminContractorsPage() {
  const supabase = await createClient();
  const { data: contractors } = await supabase
    .from("contractors")
    .select("id, name, email, phone, trade, status, must_change_password, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <SectionLabel label={`Contractors (${contractors?.length ?? 0})`} />
        <Link
          href="/admin/nda"
          className="text-mono-label rounded-full bg-ink px-5 py-2.5 text-xs text-paper-2 transition-colors hover:bg-ink-soft"
        >
          Onboard someone new
        </Link>
      </div>
      <p className="mb-6 max-w-lg text-sm leading-relaxed text-ink-soft">
        Logins are only ever created from a signed NDA - see the{" "}
        <Link href="/admin/nda" className="text-ink underline hover:no-underline">
          NDAs
        </Link>{" "}
        page to send one and create a login once it&rsquo;s signed.
      </p>
      <div className="overflow-hidden rounded-lg border border-ink/12">
        {(contractors ?? []).map((c, i) => (
          <div
            key={c.id}
            className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 ${
              i % 2 === 0 ? "bg-card" : "bg-paper-2"
            }`}
          >
            <div>
              <p className="text-ink">{c.name}</p>
              <p className="text-mono-label text-[11px] text-ink-soft">
                {c.email} {c.phone ? `- ${c.phone}` : ""}{" "}
                {c.trade ? `- ${c.trade}` : ""}
              </p>
            </div>
            <div className="text-mono-label text-[11px] text-ink-soft">
              {c.status === "disabled" && (
                <span className="text-stamp-ink">Disabled - </span>
              )}
              {c.must_change_password ? "Awaiting first login" : "Active"}
            </div>
          </div>
        ))}
        {(!contractors || contractors.length === 0) && (
          <p className="p-5 text-sm text-ink-soft">
            No contractors yet - onboard the first one above.
          </p>
        )}
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import SectionLabel from "@/components/SectionLabel";
import CreateContractorForm from "@/components/admin/CreateContractorForm";

export default async function AdminContractorsPage() {
  const supabase = await createClient();
  const { data: contractors } = await supabase
    .from("contractors")
    .select("id, name, email, phone, trade, status, must_change_password, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <SectionLabel label="Create a login" />
      <CreateContractorForm />

      <div className="mt-12">
        <SectionLabel label={`Contractors (${contractors?.length ?? 0})`} />
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
                  {c.email} {c.phone ? `· ${c.phone}` : ""}{" "}
                  {c.trade ? `· ${c.trade}` : ""}
                </p>
              </div>
              <div className="text-mono-label text-[11px] text-ink-soft">
                {c.status === "disabled" && (
                  <span className="text-stamp-ink">Disabled · </span>
                )}
                {c.must_change_password ? "Awaiting first login" : "Active"}
              </div>
            </div>
          ))}
          {(!contractors || contractors.length === 0) && (
            <p className="p-5 text-sm text-ink-soft">
              No contractors yet — create the first one above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

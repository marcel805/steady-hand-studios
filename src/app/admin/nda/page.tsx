import { createClient } from "@/lib/supabase/server";
import SectionLabel from "@/components/SectionLabel";
import CreateNdaRequestForm from "@/components/admin/CreateNdaRequestForm";
import CreateLoginFromNdaButton from "@/components/admin/CreateLoginFromNdaButton";

export default async function AdminNdaPage() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("nda_requests")
    .select("id, name, email, phone, trade, status, contractor_id, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <SectionLabel label="Send an NDA" />
      <p className="mb-6 max-w-lg text-sm leading-relaxed text-ink-soft">
        This is the only way to onboard a new contractor - once they&rsquo;ve
        signed, come back here to create their login.
      </p>
      <CreateNdaRequestForm />

      <div className="mt-12">
        <SectionLabel label={`Requests (${requests?.length ?? 0})`} />
        <div className="overflow-hidden rounded-lg border border-ink/12">
          {(requests ?? []).map((r, i) => (
            <div
              key={r.id}
              className={`flex flex-wrap items-center justify-between gap-4 px-5 py-4 ${
                i % 2 === 0 ? "bg-card" : "bg-paper-2"
              }`}
            >
              <div>
                <p className="text-ink">{r.name}</p>
                <p className="text-mono-label text-[11px] text-ink-soft">
                  {r.email} {r.phone ? `- ${r.phone}` : ""}{" "}
                  {r.trade ? `- ${r.trade}` : ""}
                </p>
              </div>
              <div>
                {r.status === "pending" ? (
                  <span className="text-mono-label text-[11px] text-ink-soft">
                    Awaiting signature
                  </span>
                ) : r.contractor_id ? (
                  <span className="text-mono-label text-[11px] text-stamp-ink">
                    Login created
                  </span>
                ) : (
                  <CreateLoginFromNdaButton ndaRequestId={r.id} />
                )}
              </div>
            </div>
          ))}
          {(!requests || requests.length === 0) && (
            <p className="p-5 text-sm text-ink-soft">
              No NDA requests yet - create the first one above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

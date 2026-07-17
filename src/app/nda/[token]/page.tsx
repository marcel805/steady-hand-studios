import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { NDA_TITLE, NDA_BODY } from "@/lib/nda-content";
import NdaSignForm from "@/components/NdaSignForm";

export const metadata: Metadata = {
  title: "Confidentiality Agreement - Steady Hand Studios",
  robots: { index: false, follow: false },
};

export default async function NdaSigningPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const admin = createAdminClient();

  const { data: ndaRequest } = await admin
    .from("nda_requests")
    .select("name, status, signature_name, signed_at")
    .eq("token", token)
    .maybeSingle();

  if (!ndaRequest) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="text-sm leading-relaxed text-ink-soft">
          This link isn&rsquo;t valid. If you were sent this by Steady Hand
          Studios, ask them to send it again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <p className="text-mono-label mb-4 text-xs text-ink-soft">
        For {ndaRequest.name}
      </p>
      <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
        {NDA_TITLE}
      </h1>

      <div className="mt-8 whitespace-pre-line rounded-lg border border-ink/12 bg-card p-6 text-sm leading-relaxed text-ink-soft">
        {NDA_BODY}
      </div>

      {ndaRequest.status === "signed" ? (
        <div className="mt-8 rounded-lg border border-ink/12 bg-paper-2 p-6">
          <p className="text-mono-label text-ink-soft">
            Already signed by {ndaRequest.signature_name} on{" "}
            {new Date(ndaRequest.signed_at!).toLocaleDateString("en-ZA")}.
          </p>
        </div>
      ) : (
        <NdaSignForm token={token} />
      )}
    </div>
  );
}

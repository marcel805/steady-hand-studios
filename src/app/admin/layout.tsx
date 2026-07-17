import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminLogin from "@/components/AdminLogin";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AdminLogin />;
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id, name")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="text-sm leading-relaxed text-ink-soft">
          This login isn&rsquo;t set up for admin access.
        </p>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
        <div className="flex items-center gap-6">
          <p className="text-mono-label text-xs text-ink-soft">
            Admin — {admin.name}
          </p>
          <nav className="flex items-center gap-5">
            <Link
              href="/admin/contractors"
              className="text-mono-label text-xs text-ink hover:text-gold-ink"
            >
              Contractors
            </Link>
            <Link
              href="/admin/jobs"
              className="text-mono-label text-xs text-ink hover:text-gold-ink"
            >
              Jobs
            </Link>
          </nav>
        </div>
        <SignOutButton />
      </div>
      {children}
    </div>
  );
}

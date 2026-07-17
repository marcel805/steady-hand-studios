"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
      className="text-mono-label text-xs text-ink-soft hover:text-ink"
    >
      Log out
    </button>
  );
}

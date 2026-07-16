import { createBrowserClient } from "@supabase/ssr";

/** Supabase client for use in Client Components. Uses the public anon key,
 * which is safe to expose — access is enforced by Postgres row-level
 * security policies, not by keeping this key secret. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

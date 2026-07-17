import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Supabase client for use in Server Components, Route Handlers and
 * Server Actions - reads/writes the visitor's session via cookies. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component during render, where
            // cookies can't be written - safe to ignore when middleware is
            // also refreshing the session.
          }
        },
      },
    }
  );
}

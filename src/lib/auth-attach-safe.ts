import { createMiddleware } from "@tanstack/react-start";

/**
 * Attaches the Supabase bearer token when a session exists, but never blocks
 * server-function calls when the Supabase client is unavailable (e.g. missing
 * env in a deployed bundle). The admin panel uses its own cookie session.
 */
export const attachSupabaseAuthSafe = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    let token: string | undefined;
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token;
    } catch {
      token = undefined;
    }
    return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
  },
);

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { readEnv } from "./runtime-env.server";

let cached: SupabaseClient | undefined;

/**
 * Service-role client used by the funnel worker and the admin panel.
 * The shop_* tables have RLS enabled with no policies, so only this client reads them.
 */
export function shopDb(): SupabaseClient {
  if (cached) return cached;

  const url = readEnv("SUPABASE_URL") || readEnv("VITE_SUPABASE_URL");
  const key = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    throw new Error("Backend indisponível: SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY ausentes.");
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input as RequestInfo, { ...init, headers });
      },
    },
  });

  return cached;
}

export function dbAvailable(): boolean {
  return Boolean(
    (readEnv("SUPABASE_URL") || readEnv("VITE_SUPABASE_URL")) && readEnv("SUPABASE_SERVICE_ROLE_KEY"),
  );
}

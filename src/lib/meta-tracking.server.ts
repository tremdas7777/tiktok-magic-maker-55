/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbAvailable, shopDb } from "./shop-db.server";

type AnyRecord = any;

export type MetaSettings = {
  pixel_ids: string[];
  access_token: string;
  test_event_code: string;
  server_events_enabled: boolean;
  track_pageview: boolean;
};

const DEFAULT_SETTINGS: MetaSettings = {
  pixel_ids: [],
  access_token: "",
  test_event_code: "",
  server_events_enabled: true,
  track_pageview: true,
};

let cache: { value: MetaSettings; at: number } | undefined;

export async function getMetaSettings(force = false): Promise<MetaSettings> {
  if (!force && cache && Date.now() - cache.at < 15_000) return cache.value;
  if (!dbAvailable()) return DEFAULT_SETTINGS;
  try {
    const { data } = await shopDb()
      .from("shop_settings")
      .select("value")
      .eq("key", "meta")
      .maybeSingle();
    const raw = (data?.value ?? {}) as AnyRecord;
    const value: MetaSettings = {
      pixel_ids: Array.isArray(raw.pixel_ids)
        ? raw.pixel_ids.map((id: unknown) => String(id).trim()).filter(Boolean)
        : [],
      access_token: String(raw.access_token ?? ""),
      test_event_code: String(raw.test_event_code ?? ""),
      server_events_enabled: raw.server_events_enabled !== false,
      track_pageview: raw.track_pageview !== false,
    };
    cache = { value, at: Date.now() };
    return value;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveMetaSettings(input: Partial<MetaSettings>): Promise<MetaSettings> {
  const current = await getMetaSettings(true);
  const next: MetaSettings = {
    pixel_ids: input.pixel_ids
      ? input.pixel_ids.map((id) => String(id).trim()).filter(Boolean)
      : current.pixel_ids,
    access_token: input.access_token ?? current.access_token,
    test_event_code: input.test_event_code ?? current.test_event_code,
    server_events_enabled: input.server_events_enabled ?? current.server_events_enabled,
    track_pageview: input.track_pageview ?? current.track_pageview,
  };

  await shopDb()
    .from("shop_settings")
    .upsert({ key: "meta", value: next, updated_at: new Date().toISOString() }, { onConflict: "key" });

  cache = { value: next, at: Date.now() };
  return next;
}

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Meta Conversions API (server-side). Mirrors the TikTok events so both platforms optimize. */
export async function sendMetaServerEvent(
  eventName: "InitiateCheckout" | "Purchase" | "ViewContent" | "AddToCart",
  input: {
    value: number;
    referenceId: string;
    eventId?: string;

    email?: string;
    phone?: string;
    firstName?: string;
    city?: string;
    state?: string;
    fbc?: string;
    fbp?: string;
    userAgent?: string;
    ip?: string;
    contents?: AnyRecord[];
    eventSourceUrl?: string;
  },
): Promise<{ ok: boolean; message: string }> {
  const settings = await getMetaSettings();
  if (!settings.server_events_enabled) return { ok: false, message: "Eventos pelo servidor desligados." };
  if (!settings.access_token || settings.pixel_ids.length === 0) {
    return { ok: false, message: "Informe o ID do pixel e o token do Facebook." };
  }

  const user: AnyRecord = {};
  if (input.email) user.em = [await sha256(input.email)];
  if (input.phone) {
    const digits = String(input.phone).replace(/\D/g, "");
    if (digits) user.ph = [await sha256(digits.startsWith("55") ? digits : `55${digits}`)];
  }
  if (input.firstName) user.fn = [await sha256(String(input.firstName).split(" ")[0] ?? "")];
  if (input.city) user.ct = [await sha256(String(input.city).replace(/\s/g, ""))];
  if (input.state) user.st = [await sha256(input.state)];
  if (input.fbc) user.fbc = input.fbc;
  if (input.fbp) user.fbp = input.fbp;
  if (input.userAgent) user.client_user_agent = input.userAgent;
  if (input.ip) user.client_ip_address = input.ip;
  user.country = [await sha256("br")];

  const body = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId || `${input.referenceId}_${eventName.toLowerCase()}`,
        action_source: "website",
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: user,
        custom_data: {
          currency: "BRL",
          value: Number(input.value || 0),
          contents: (input.contents ?? []).map((item: AnyRecord) => ({
            id: String(item?.id ?? item?.content_id ?? ""),
            quantity: Number(item?.quantidade ?? item?.quantity ?? 1) || 1,
            item_price: Number(item?.preco ?? item?.price ?? 0) || 0,
            title: String(item?.titulo ?? item?.title ?? ""),
          })),
        },
      },
    ],
    ...(settings.test_event_code ? { test_event_code: settings.test_event_code } : {}),
  };

  const results = await Promise.all(
    settings.pixel_ids.map(async (pixelId) => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v21.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(settings.access_token)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        );
        if (!response.ok) {
          const text = await response.text();
          console.error("meta capi", response.status, text);
          return { ok: false, message: text.slice(0, 200) };
        }
        return { ok: true, message: "" };
      } catch (error) {
        console.error("meta capi error", error);
        return { ok: false, message: (error as Error).message };
      }
    }),
  );

  const failed = results.find((r) => !r.ok);
  if (failed) return { ok: false, message: failed.message || "Falha ao enviar ao Facebook." };
  return { ok: true, message: "Evento enviado ao Facebook." };
}

/** Client-side Meta Pixel bootstrap, injected in every funnel page. */
export async function handleMetaPixelJs(): Promise<Response> {
  const settings = await getMetaSettings();
  const body = `/* meta pixel */
window.FB_PIXEL_IDS = ${JSON.stringify(settings.pixel_ids)};
(function(){
  var ids = window.FB_PIXEL_IDS || [];
  if (!ids.length) return;
  if (!window.fbq) {
    var n = window.fbq = function(){ n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    var s = document.createElement('script');
    s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
  }
  ids.forEach(function(id){ window.fbq('init', id); });
  ${settings.track_pageview ? "window.fbq('track', 'PageView');" : ""}
  try {
    var path = location.pathname.replace(/\\/+$/, '') || '/';
    if (/produto/.test(path)) window.fbq('track', 'ViewContent');
    else if (/cart/.test(path)) window.fbq('track', 'AddToCart');
    else if (/checkout/.test(path)) window.fbq('track', 'InitiateCheckout');
  } catch (e) {}
})();
`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

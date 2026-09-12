/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbAvailable, shopDb } from "./shop-db.server";

type AnyRecord = any;

export type TikTokSettings = {
  pixel_ids: string[];
  access_token: string;
  test_event_code: string;
  server_events_enabled: boolean;
  track_pageview: boolean;
};

const DEFAULT_SETTINGS: TikTokSettings = {
  pixel_ids: [],
  access_token: "",
  test_event_code: "",
  server_events_enabled: true,
  track_pageview: true,
};

let settingsCache: { value: TikTokSettings; at: number } | undefined;

export async function getTikTokSettings(force = false): Promise<TikTokSettings> {
  if (!force && settingsCache && Date.now() - settingsCache.at < 15_000) {
    return settingsCache.value;
  }
  if (!dbAvailable()) return DEFAULT_SETTINGS;

  try {
    const { data } = await shopDb()
      .from("shop_settings")
      .select("value")
      .eq("key", "tiktok")
      .maybeSingle();
    const raw = (data?.value ?? {}) as AnyRecord;
    const value: TikTokSettings = {
      pixel_ids: Array.isArray(raw.pixel_ids)
        ? raw.pixel_ids.map((id: unknown) => String(id).trim()).filter(Boolean)
        : [],
      access_token: String(raw.access_token ?? ""),
      test_event_code: String(raw.test_event_code ?? ""),
      server_events_enabled: raw.server_events_enabled !== false,
      track_pageview: raw.track_pageview !== false,
    };
    settingsCache = { value, at: Date.now() };
    return value;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveTikTokSettings(input: Partial<TikTokSettings>): Promise<TikTokSettings> {
  const current = await getTikTokSettings(true);
  const next: TikTokSettings = {
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
    .upsert({ key: "tiktok", value: next, updated_at: new Date().toISOString() }, { onConflict: "key" });

  settingsCache = { value: next, at: Date.now() };
  return next;
}

/* ------------------------------------------------------------------ events */

function deviceFromUserAgent(ua: string): string {
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

export async function handleTrackRequest(request: Request): Promise<Response> {
  try {
    const raw = await request.text();
    const body = (raw ? JSON.parse(raw) : {}) as AnyRecord;
    const userAgent = request.headers.get("user-agent") ?? "";

    if (dbAvailable()) {
      await shopDb()
        .from("shop_events")
        .insert({
          session_id: String(body.session_id ?? "").slice(0, 64) || null,
          event_type: String(body.event_type ?? body.type ?? "pageview").slice(0, 40),
          path: String(body.path ?? "").slice(0, 300) || null,
          product_id: body.product_id ? String(body.product_id).slice(0, 60) : null,
          product_title: body.product_title ? String(body.product_title).slice(0, 200) : null,
          value_cents: Math.max(0, Math.round(Number(body.value ?? 0) * 100) || 0),
          referrer: body.referrer ? String(body.referrer).slice(0, 300) : null,
          utm: body.utm && typeof body.utm === "object" ? body.utm : {},
          click_id: body.click_id ? String(body.click_id).slice(0, 200) : null,
          user_agent: userAgent.slice(0, 300) || null,
          country: request.headers.get("cf-ipcountry") ?? null,
          city: (request as AnyRecord).cf?.city ?? null,
          device: deviceFromUserAgent(userAgent),
        });
    }

    return json({ ok: true });
  } catch (error) {
    console.error("track error", error);
    return json({ ok: false });
  }
}

/* ------------------------------------------------------------- orders sink */

export async function recordPixOrder(
  order: AnyRecord,
  result: AnyRecord,
  request: Request,
): Promise<void> {
  if (!dbAvailable()) return;
  try {
    const comprador = (order?.comprador ?? {}) as AnyRecord;
    const entrega = (order?.entrega ?? {}) as AnyRecord;
    const carrinho = Array.isArray(order?.carrinho) ? order.carrinho : [];
    const url = new URL(request.url);

    await shopDb()
      .from("shop_orders")
      .upsert(
        {
          reference_id: String(result.referenceId ?? ""),
          transaction_id: result.transactionId ? String(result.transactionId) : null,
          status: "pending",
          amount_cents: Math.round(Number(order?.valor ?? order?.total ?? 0) * 100) || 0,
          customer_name: String(comprador.nome ?? "").slice(0, 200) || null,
          customer_email: String(comprador.email ?? "").slice(0, 200) || null,
          customer_phone: String(comprador.telefone ?? "").slice(0, 40) || null,
          customer_document: String(comprador.cpf ?? "").replace(/\D/g, "").slice(0, 20) || null,
          city: String(entrega.cidade ?? "").slice(0, 120) || null,
          state: String(entrega.estado ?? "").slice(0, 4) || null,
          items: carrinho.map((item: AnyRecord) => ({
            id: item?.id ?? null,
            titulo: item?.titulo ?? item?.title ?? "Produto",
            quantidade: Number(item?.quantidade ?? 1) || 1,
            preco: Number(item?.preco ?? 0) || 0,
          })),
          pix_code: result.qr_code ? String(result.qr_code) : null,
          click_id: order?.click_id ? String(order.click_id) : url.searchParams.get("ttclid"),
          session_id: order?.session_id ? String(order.session_id).slice(0, 64) : null,
          utm: order?.utm && typeof order.utm === "object" ? order.utm : {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: "reference_id" },
      );

    const utm = (order?.utm && typeof order.utm === "object" ? order.utm : {}) as AnyRecord;

    await sendTikTokServerEvent("InitiateCheckout", {
      value: Number(order?.valor ?? order?.total ?? 0),
      referenceId: String(result.referenceId ?? ""),
      email: String(comprador.email ?? ""),
      phone: String(comprador.telefone ?? ""),
      clickId: String(order?.click_id ?? ""),
      userAgent: request.headers.get("user-agent") ?? "",
      contents: carrinho,
    });

    const { sendMetaServerEvent } = await import("./meta-tracking.server");
    await sendMetaServerEvent("InitiateCheckout", {
      value: Number(order?.valor ?? order?.total ?? 0),
      referenceId: String(result.referenceId ?? ""),
      email: String(comprador.email ?? ""),
      phone: String(comprador.telefone ?? ""),
      firstName: String(comprador.nome ?? ""),
      city: String(entrega.cidade ?? ""),
      state: String(entrega.estado ?? ""),
      fbc: String(utm.fbc ?? utm.fbclid ?? ""),
      fbp: String(utm.fbp ?? ""),
      userAgent: request.headers.get("user-agent") ?? "",
      ip: request.headers.get("cf-connecting-ip") ?? "",
      contents: carrinho,
      eventSourceUrl: `${url.origin}/checkout.php`,
    });

  } catch (error) {
    console.error("recordPixOrder error", error);
  }
}

/** Marks an order as paid (idempotent) and fires the TikTok server-side purchase event. */
export async function markOrderPaid(payin: AnyRecord): Promise<void> {
  if (!dbAvailable()) return;
  const referenceId = String(payin?.referenceId ?? payin?.reference_id ?? "").trim();
  const transactionId = String(payin?.id ?? payin?.transactionId ?? "").trim();
  if (!referenceId && !transactionId) return;

  try {
    const db = shopDb();
    const query = db.from("shop_orders").select("*").limit(1);
    const { data } = referenceId
      ? await query.eq("reference_id", referenceId)
      : await query.eq("transaction_id", transactionId);
    const row = data?.[0] as AnyRecord | undefined;
    if (!row || row.status === "paid") return;

    await db
      .from("shop_orders")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        transaction_id: transactionId || row.transaction_id,
        tiktok_purchase_sent: true,
      })
      .eq("id", row.id);

    await db.from("shop_events").insert({
      session_id: row.session_id,
      event_type: "purchase",
      path: "/payment.php",
      value_cents: row.amount_cents,
      click_id: row.click_id,
      utm: row.utm ?? {},
    });

    await sendTikTokServerEvent("CompletePayment", {
      value: (row.amount_cents ?? 0) / 100,
      referenceId: row.reference_id,
      email: row.customer_email ?? "",
      phone: row.customer_phone ?? "",
      clickId: row.click_id ?? "",
      userAgent: "",
      contents: row.items ?? [],
    });

    const utmRow = (row.utm ?? {}) as AnyRecord;
    const { sendMetaServerEvent } = await import("./meta-tracking.server");
    await sendMetaServerEvent("Purchase", {
      value: (row.amount_cents ?? 0) / 100,
      referenceId: row.reference_id,
      email: row.customer_email ?? "",
      phone: row.customer_phone ?? "",
      firstName: row.customer_name ?? "",
      city: row.city ?? "",
      state: row.state ?? "",
      fbc: String(utmRow.fbc ?? utmRow.fbclid ?? ""),
      fbp: String(utmRow.fbp ?? ""),
      contents: row.items ?? [],
    });

  } catch (error) {
    console.error("markOrderPaid error", error);
  }
}

/* --------------------------------------------------- TikTok Events API 1.3 */

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function sendTikTokServerEvent(
  eventName: string,
  input: {
    value: number;
    referenceId: string;
    email?: string;
    phone?: string;
    clickId?: string;
    userAgent?: string;
    contents?: AnyRecord[];
  },
): Promise<void> {
  const settings = await getTikTokSettings();
  if (!settings.server_events_enabled) return;
  if (!settings.access_token || settings.pixel_ids.length === 0) return;

  const user: AnyRecord = {};
  if (input.email) user.email = await sha256(input.email);
  if (input.phone) {
    const digits = String(input.phone).replace(/\D/g, "");
    if (digits) user.phone = await sha256(digits.startsWith("55") ? `+${digits}` : `+55${digits}`);
  }
  if (input.clickId) user.ttclid = input.clickId;
  if (input.userAgent) user.user_agent = input.userAgent;

  const payload = (pixelId: string) => ({
    event_source: "web",
    event_source_id: pixelId,
    ...(settings.test_event_code ? { test_event_code: settings.test_event_code } : {}),
    data: [
      {
        event: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: `${input.referenceId}_${eventName.toLowerCase()}`,
        user,
        properties: {
          currency: "BRL",
          value: Number(input.value || 0),
          contents: (input.contents ?? []).map((item: AnyRecord) => ({
            content_id: String(item?.id ?? item?.content_id ?? ""),
            content_name: String(item?.titulo ?? item?.title ?? item?.content_name ?? ""),
            quantity: Number(item?.quantidade ?? item?.quantity ?? 1) || 1,
            price: Number(item?.preco ?? item?.price ?? 0) || 0,
          })),
        },
      },
    ],
  });

  await Promise.all(
    settings.pixel_ids.map(async (pixelId) => {
      try {
        const response = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": settings.access_token,
          },
          body: JSON.stringify(payload(pixelId)),
        });
        if (!response.ok) {
          console.error("tiktok events api", response.status, await response.text());
        }
      } catch (error) {
        console.error("tiktok events api error", error);
      }
    }),
  );
}

/* ------------------------------------------------------- generated scripts */

export async function handleTikTokConfigJs(): Promise<Response> {
  const settings = await getTikTokSettings();
  const body = `/* generated */
window.TIKTOK_PIXEL_IDS = ${JSON.stringify(settings.pixel_ids)};
window.TIKTOK_PIXEL_ID = ${JSON.stringify(settings.pixel_ids[0] ?? "")};
window.TIKTOK_TRACK_PAGEVIEW = ${settings.track_pageview ? "true" : "false"};
(function(){
  try { localStorage.removeItem('TIKTOK_PIXEL_ID'); } catch (e) {}
  window.setTikTokPixelId = function(id){
    var ids = Array.isArray(id) ? id : String(id || '').split(',');
    ids = ids.map(function(v){ return String(v).trim(); }).filter(Boolean);
    if (!ids.length) return;
    window.TIKTOK_PIXEL_IDS = ids;
    window.TIKTOK_PIXEL_ID = ids[0];
    if (window.ttq && typeof window.ttq.load === 'function') {
      ids.forEach(function(pid){ window.ttq.load(pid); });
      if (typeof window.ttq.page === 'function') window.ttq.page();
    }
  };
})();
`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function handleShopTrackJs(): Response {
  const body = `/* shop analytics */
(function(){
  if (window.__shopTrackLoaded) return;
  window.__shopTrackLoaded = true;

  function uuid(){
    try { return crypto.randomUUID(); } catch (e) { return 'sid-' + Math.random().toString(36).slice(2) + Date.now(); }
  }
  var sid;
  try {
    sid = localStorage.getItem('_shop_sid');
    if (!sid) { sid = uuid(); localStorage.setItem('_shop_sid', sid); }
  } catch (e) { sid = uuid(); }

  function qp(name){
    try { return new URLSearchParams(location.search).get(name) || ''; } catch (e) { return ''; }
  }

  var utm = {};
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){
    var v = qp(k); if (v) utm[k] = v;
  });
  try {
    if (Object.keys(utm).length) sessionStorage.setItem('_shop_utm', JSON.stringify(utm));
    else utm = JSON.parse(sessionStorage.getItem('_shop_utm') || '{}');
  } catch (e) {}

  var clickId = qp('ttclid') || qp('clickid') || '';
  try {
    if (clickId) sessionStorage.setItem('_shop_ttclid', clickId);
    else clickId = sessionStorage.getItem('_shop_ttclid') || '';
  } catch (e) {}

  function send(type, extra){
    var payload = Object.assign({
      session_id: sid,
      event_type: type,
      path: location.pathname + location.search,
      referrer: document.referrer || '',
      utm: utm,
      click_id: clickId
    }, extra || {});
    var body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/public/track', new Blob([body], { type: 'application/json' }));
        return;
      }
    } catch (e) {}
    fetch('/api/public/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function(){});
  }
  window.shopTrack = send;

  var path = location.pathname.replace(/\\/+$/, '') || '/';
  var pageType = 'pageview';
  if (/produto/.test(path)) pageType = 'product_view';
  else if (/cart/.test(path)) pageType = 'cart_view';
  else if (/checkout/.test(path)) pageType = 'checkout_view';
  else if (/payment/.test(path)) pageType = 'payment_view';

  send('pageview');
  if (pageType !== 'pageview') {
    send(pageType, { product_id: qp('id') || qp('produto') || '' });
  }

  // Detect cart writes (add to cart) without touching the store code.
  try {
    var origSet = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function(key, value){
      var before = key === 'carrinho' ? (localStorage.getItem('carrinho') || '') : null;
      origSet(key, value);
      if (key === 'carrinho' && value !== before) {
        var qty = 0, total = 0, firstTitle = '', firstId = '';
        try {
          var cart = JSON.parse(value || '[]');
          if (Array.isArray(cart)) {
            cart.forEach(function(it, i){
              var q = Number(it.quantidade || 1) || 1;
              qty += q; total += q * (Number(it.preco || 0) || 0);
              if (i === 0) { firstTitle = it.titulo || ''; firstId = String(it.id || ''); }
            });
          }
        } catch (e) {}
        if (qty > 0) send('add_to_cart', { value: total, product_id: firstId, product_title: firstTitle });
      }
    };
  } catch (e) {}

  setInterval(function(){ send('heartbeat'); }, 30000);
  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'visible') send('heartbeat');
  });
})();
`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function json(payload: AnyRecord, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

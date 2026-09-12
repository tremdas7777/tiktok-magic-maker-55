/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

type AnyRecord = any;
type AdminSession = { unlocked?: boolean };

async function sessionConfig() {
  const { readEnv } = await import("./runtime-env.server");
  const password = readEnv("ADMIN_SESSION_SECRET") || readEnv("ADMIN_PANEL_PASSWORD");
  if (!password || password.length < 32) {
    // useSession requires a 32+ char key; pad deterministically as a last resort.
    return {
      password: (password + "lovable-admin-panel-session-key-padding").slice(0, 48),
      name: "shop-admin",
      maxAge: 60 * 60 * 12,
      cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
    };
  }
  return {
    password,
    name: "shop-admin",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(await sessionConfig());
  if (!session.data.unlocked) throw new Error("NAO_AUTORIZADO");
  return session;
}

async function db() {
  const { shopDb } = await import("./shop-db.server");
  return shopDb();
}

function sinceIso(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export const adminSessionState = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(await sessionConfig());
  return { unlocked: session.data.unlocked === true };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const { readEnv } = await import("./runtime-env.server");
    const expected = readEnv("ADMIN_PANEL_PASSWORD");
    if (!expected) return { ok: false as const, message: "Senha do painel não configurada." };
    const input = String(data?.password ?? "");
    if (input.length !== expected.length) return { ok: false as const, message: "Senha incorreta." };
    let diff = 0;
    for (let i = 0; i < expected.length; i += 1) {
      diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    if (diff !== 0) return { ok: false as const, message: "Senha incorreta." };

    const session = await useSession<AdminSession>(await sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(await sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminOverview = createServerFn({ method: "POST" })
  .inputValidator((data: { days?: number }) => ({ days: Math.min(90, Math.max(1, data?.days ?? 7)) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const client = await db();
    const since = sinceIso(data.days);

    const [ordersRes, eventsRes] = await Promise.all([
      client
        .from("shop_orders")
        .select("id, status, amount_cents, created_at, paid_at, items, city, state")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000),
      client
        .from("shop_events")
        .select("session_id, event_type, created_at, device, country, utm, path")
        .gte("created_at", since)
        .limit(20000),
    ]);

    const orders = (ordersRes.data ?? []) as AnyRecord[];
    const events = (eventsRes.data ?? []) as AnyRecord[];

    const paid = orders.filter((o) => o.status === "paid");
    const revenue = paid.reduce((sum, o) => sum + (o.amount_cents ?? 0), 0);

    const sessionsBy = (type: string) =>
      new Set(events.filter((e) => e.event_type === type && e.session_id).map((e) => e.session_id))
        .size;

    const sessions = new Set(events.filter((e) => e.session_id).map((e) => e.session_id)).size;

    const days: Record<string, { pix: number; paid: number; revenue: number; sessions: Set<string> }> =
      {};
    for (let i = data.days - 1; i >= 0; i -= 1) {
      const key = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      days[key] = { pix: 0, paid: 0, revenue: 0, sessions: new Set() };
    }
    for (const order of orders) {
      const key = String(order.created_at).slice(0, 10);
      const bucket = days[key];
      if (!bucket) continue;
      bucket.pix += 1;
      if (order.status === "paid") {
        bucket.paid += 1;
        bucket.revenue += order.amount_cents ?? 0;
      }
    }
    for (const event of events) {
      const key = String(event.created_at).slice(0, 10);
      if (days[key] && event.session_id) days[key].sessions.add(event.session_id);
    }

    const deviceCount: Record<string, number> = {};
    const sourceCount: Record<string, number> = {};
    const seenSession = new Set<string>();
    for (const event of events) {
      if (!event.session_id || seenSession.has(event.session_id)) continue;
      seenSession.add(event.session_id);
      const device = String(event.device ?? "desconhecido");
      deviceCount[device] = (deviceCount[device] ?? 0) + 1;
      const source = String((event.utm as AnyRecord)?.utm_source ?? "direto");
      sourceCount[source] = (sourceCount[source] ?? 0) + 1;
    }

    return {
      days: data.days,
      totals: {
        sessions,
        pageviews: events.filter((e) => e.event_type === "pageview").length,
        pixCount: orders.length,
        paidCount: paid.length,
        revenue: revenue / 100,
        ticket: paid.length ? revenue / 100 / paid.length : 0,
        conversion: orders.length ? (paid.length / orders.length) * 100 : 0,
        sessionToPaid: sessions ? (paid.length / sessions) * 100 : 0,
      },
      funnel: [
        { label: "Visitantes", value: sessions },
        { label: "Viu produto", value: sessionsBy("product_view") },
        { label: "Carrinho", value: sessionsBy("add_to_cart") },
        { label: "Checkout", value: sessionsBy("checkout_view") },
        { label: "Pix gerado", value: orders.length },
        { label: "Pago", value: paid.length },
      ],
      series: Object.entries(days).map(([date, value]) => ({
        date,
        pix: value.pix,
        paid: value.paid,
        revenue: value.revenue / 100,
        sessions: value.sessions.size,
      })),
      devices: Object.entries(deviceCount)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value),
      sources: Object.entries(sourceCount)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6),
    };
  });

export const adminLive = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const client = await db();
  const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  const [eventsRes, ordersRes] = await Promise.all([
    client
      .from("shop_events")
      .select("session_id, event_type, path, product_title, created_at, device, country, utm, value_cents")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(2000),
    client
      .from("shop_orders")
      .select("reference_id, status, amount_cents, customer_name, city, state, items, created_at, paid_at")
      .order("created_at", { ascending: false })
      .limit(15),
  ]);

  const events = (eventsRes.data ?? []) as AnyRecord[];
  const visitors = new Map<string, AnyRecord>();
  for (const event of events) {
    if (!event.session_id || visitors.has(event.session_id)) continue;
    visitors.set(event.session_id, {
      sessionId: event.session_id,
      path: event.path ?? "/",
      lastEvent: event.event_type,
      device: event.device ?? "?",
      country: event.country ?? "",
      source: (event.utm as AnyRecord)?.utm_source ?? "direto",
      at: event.created_at,
    });
  }

  const stage = (type: string) =>
    new Set(events.filter((e) => e.event_type === type && e.session_id).map((e) => e.session_id)).size;

  return {
    onlineNow: visitors.size,
    visitors: Array.from(visitors.values()).slice(0, 60),
    stages: {
      home: stage("pageview"),
      product: stage("product_view"),
      cart: stage("add_to_cart"),
      checkout: stage("checkout_view"),
      payment: stage("payment_view"),
    },
    feed: events.slice(0, 40).map((e) => ({
      type: e.event_type,
      path: e.path ?? "",
      title: e.product_title ?? "",
      value: (e.value_cents ?? 0) / 100,
      at: e.created_at,
    })),
    recentOrders: (ordersRes.data ?? []).map((o: AnyRecord) => ({
      referenceId: o.reference_id,
      status: o.status,
      amount: (o.amount_cents ?? 0) / 100,
      customer: o.customer_name ?? "",
      city: [o.city, o.state].filter(Boolean).join(" / "),
      items: (o.items ?? []).length,
      createdAt: o.created_at,
      paidAt: o.paid_at,
    })),
  };
});

export const adminTopProducts = createServerFn({ method: "POST" })
  .inputValidator((data: { days?: number }) => ({ days: Math.min(90, Math.max(1, data?.days ?? 30)) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const client = await db();
    const since = sinceIso(data.days);

    const [ordersRes, viewsRes] = await Promise.all([
      client
        .from("shop_orders")
        .select("status, items, amount_cents")
        .gte("created_at", since)
        .limit(5000),
      client
        .from("shop_events")
        .select("product_id, product_title, event_type")
        .gte("created_at", since)
        .in("event_type", ["product_view", "add_to_cart"])
        .limit(20000),
    ]);

    const map = new Map<
      string,
      { title: string; sold: number; paidSold: number; revenue: number; views: number; carts: number }
    >();
    const keyFor = (id: unknown, title: unknown) => String(id ?? title ?? "?");

    for (const order of (ordersRes.data ?? []) as AnyRecord[]) {
      for (const item of (order.items ?? []) as AnyRecord[]) {
        const key = keyFor(item.id, item.titulo);
        const entry =
          map.get(key) ??
          { title: String(item.titulo ?? "Produto"), sold: 0, paidSold: 0, revenue: 0, views: 0, carts: 0 };
        const qty = Number(item.quantidade ?? 1) || 1;
        entry.sold += qty;
        if (order.status === "paid") {
          entry.paidSold += qty;
          entry.revenue += qty * (Number(item.preco ?? 0) || 0);
        }
        map.set(key, entry);
      }
    }

    for (const event of (viewsRes.data ?? []) as AnyRecord[]) {
      const key = keyFor(event.product_id, event.product_title);
      const entry =
        map.get(key) ??
        {
          title: String(event.product_title ?? event.product_id ?? "Produto"),
          sold: 0,
          paidSold: 0,
          revenue: 0,
          views: 0,
          carts: 0,
        };
      if (event.event_type === "product_view") entry.views += 1;
      else entry.carts += 1;
      if (!entry.title || entry.title === "?") entry.title = String(event.product_title ?? "Produto");
      map.set(key, entry);
    }

    return Array.from(map.entries())
      .map(([id, value]) => ({ id, ...value }))
      .sort((a, b) => b.paidSold - a.paidSold || b.sold - a.sold || b.views - a.views)
      .slice(0, 30);
  });

export const adminOrders = createServerFn({ method: "POST" })
  .inputValidator((data: { status?: string; limit?: number; search?: string }) => ({
    status: data?.status ?? "all",
    limit: Math.min(300, Math.max(10, data?.limit ?? 100)),
    search: String(data?.search ?? "").trim(),
  }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const client = await db();
    let query = client
      .from("shop_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(data.limit);
    if (data.status !== "all") query = query.eq("status", data.status);
    if (data.search) {
      query = query.or(
        `reference_id.ilike.%${data.search}%,customer_name.ilike.%${data.search}%,customer_email.ilike.%${data.search}%`,
      );
    }
    const { data: rows } = await query;
    return (rows ?? []).map((o: AnyRecord) => ({
      id: o.id,
      referenceId: o.reference_id,
      transactionId: o.transaction_id,
      status: o.status,
      amount: (o.amount_cents ?? 0) / 100,
      customer: o.customer_name ?? "",
      email: o.customer_email ?? "",
      phone: o.customer_phone ?? "",
      document: o.customer_document ?? "",
      place: [o.city, o.state].filter(Boolean).join(" / "),
      items: o.items ?? [],
      clickId: o.click_id ?? "",
      utm: o.utm ?? {},
      tiktokSent: o.tiktok_purchase_sent === true,
      createdAt: o.created_at,
      paidAt: o.paid_at,
    }));
  });

export const adminCheckOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { referenceId: string; transactionId?: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { getPayin } = await import("./legacy-pix.server");
    const { markOrderPaid } = await import("./shop-tracking.server");
    try {
      const payin = await getPayin(String(data.transactionId ?? ""), String(data.referenceId ?? ""));
      const status = String(payin?.status ?? "").toLowerCase();
      if (["pago", "aprovado", "confirmado", "liquidado", "paid"].includes(status)) {
        await markOrderPaid({ ...payin, referenceId: data.referenceId });
        return { ok: true as const, status: "paid" };
      }
      return { ok: true as const, status: status || "pending" };
    } catch (error) {
      return { ok: false as const, status: "erro", message: (error as Error).message };
    }
  });

export const adminGetSettings = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { getTikTokSettings } = await import("./shop-tracking.server");
  const settings = await getTikTokSettings(true);
  return {
    pixelIds: settings.pixel_ids,
    hasAccessToken: Boolean(settings.access_token),
    testEventCode: settings.test_event_code,
    serverEventsEnabled: settings.server_events_enabled,
    trackPageview: settings.track_pageview,
  };
});

export const adminSaveSettings = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      pixelIds: string;
      accessToken?: string;
      testEventCode?: string;
      serverEventsEnabled: boolean;
      trackPageview: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { saveTikTokSettings } = await import("./shop-tracking.server");
    const pixelIds = String(data.pixelIds ?? "")
      .split(/[\s,;]+/)
      .map((id) => id.trim())
      .filter(Boolean);
    const patch: AnyRecord = {
      pixel_ids: pixelIds,
      test_event_code: String(data.testEventCode ?? ""),
      server_events_enabled: data.serverEventsEnabled !== false,
      track_pageview: data.trackPageview !== false,
    };
    const token = String(data.accessToken ?? "").trim();
    if (token) patch.access_token = token;
    const saved = await saveTikTokSettings(patch);
    return { ok: true as const, pixelIds: saved.pixel_ids, hasAccessToken: Boolean(saved.access_token) };
  });

export const adminTestTikTokEvent = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { sendTikTokServerEvent, getTikTokSettings } = await import("./shop-tracking.server");
  const settings = await getTikTokSettings(true);
  if (!settings.access_token || settings.pixel_ids.length === 0) {
    return { ok: false as const, message: "Informe o ID do pixel e o token de acesso primeiro." };
  }
  await sendTikTokServerEvent("ViewContent", {
    value: 1,
    referenceId: `teste-${Date.now()}`,
    contents: [{ id: "teste", titulo: "Evento de teste", quantidade: 1, preco: 1 }],
  });
  return { ok: true as const, message: "Evento de teste enviado ao TikTok." };
});

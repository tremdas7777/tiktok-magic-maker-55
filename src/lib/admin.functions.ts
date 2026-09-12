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

export const adminLive = createServerFn({ method: "POST" })
  .inputValidator((data: { minutes?: number }) => ({
    minutes: Math.min(1440, Math.max(1, Math.round(data?.minutes ?? 5))),
  }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const client = await db();
    const since = new Date(Date.now() - data.minutes * 60 * 1000).toISOString();


  const [eventsRes, ordersRes, windowOrdersRes] = await Promise.all([
    client
      .from("shop_events")
      .select("session_id, event_type, path, product_title, created_at, device, country, city, utm, value_cents")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20000),
    client
      .from("shop_orders")
      .select("reference_id, status, amount_cents, customer_name, city, state, items, created_at, paid_at")
      .order("created_at", { ascending: false })
      .limit(15),
    client
      .from("shop_orders")
      .select("status, amount_cents, created_at")
      .gte("created_at", since)
      .limit(5000),
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
      city: event.city ?? "",
      source: (event.utm as AnyRecord)?.utm_source ?? "direto",
      at: event.created_at,
    });
  }

  const stage = (type: string) =>
    new Set(events.filter((e) => e.event_type === type && e.session_id).map((e) => e.session_id)).size;

  const rank = (pick: (visitor: AnyRecord) => string) => {
    const counts: Record<string, number> = {};
    for (const visitor of visitors.values()) {
      const key = pick(visitor) || "-";
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  };

  const windowOrders = (windowOrdersRes.data ?? []) as AnyRecord[];
  const windowPaid = windowOrders.filter((o) => o.status === "paid");

  return {
    minutes: data.minutes,
    onlineNow: visitors.size,
    visitors: Array.from(visitors.values()).slice(0, 80),
    stages: {
      home: stage("pageview"),
      product: stage("product_view"),
      cart: stage("add_to_cart"),
      checkout: stage("checkout_view"),
      payment: stage("payment_view"),
    },
    window: {
      pixCount: windowOrders.length,
      paidCount: windowPaid.length,
      revenue: windowPaid.reduce((sum, o) => sum + (o.amount_cents ?? 0), 0) / 100,
      events: events.length,
    },
    topPages: rank((v) => String(v.path ?? "/")),
    topSources: rank((v) => String(v.source ?? "direto")),
    topDevices: rank((v) => String(v.device ?? "?")),
    topPlaces: rank((v) => [v.city, v.country].filter(Boolean).join(" / ")),
    feed: events.slice(0, 60).map((e) => ({
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

/* ------------------------------------------------------------- analytics */

export const adminAnalytics = createServerFn({ method: "POST" })
  .inputValidator((data: { days?: number }) => ({ days: Math.min(90, Math.max(1, data?.days ?? 7)) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const client = await db();
    const since = sinceIso(data.days);
    const prevSince = sinceIso(data.days * 2);

    const [ordersRes, eventsRes] = await Promise.all([
      client
        .from("shop_orders")
        .select("status, amount_cents, created_at, paid_at, city, state, utm, items")
        .gte("created_at", prevSince)
        .limit(10000),
      client
        .from("shop_events")
        .select("session_id, event_type, path, created_at, device, country, city, utm, value_cents")
        .gte("created_at", prevSince)
        .limit(40000),
    ]);

    const allOrders = (ordersRes.data ?? []) as AnyRecord[];
    const allEvents = (eventsRes.data ?? []) as AnyRecord[];
    const inCurrent = (row: AnyRecord) => String(row.created_at) >= since;

    const orders = allOrders.filter(inCurrent);
    const prevOrders = allOrders.filter((o) => !inCurrent(o));
    const events = allEvents.filter(inCurrent);
    const prevEvents = allEvents.filter((e) => !inCurrent(e));

    const paid = orders.filter((o) => o.status === "paid");
    const prevPaid = prevOrders.filter((o) => o.status === "paid");
    const revenue = paid.reduce((sum, o) => sum + (o.amount_cents ?? 0), 0) / 100;
    const prevRevenue = prevPaid.reduce((sum, o) => sum + (o.amount_cents ?? 0), 0) / 100;
    const sessions = new Set(events.filter((e) => e.session_id).map((e) => e.session_id)).size;
    const prevSessions = new Set(prevEvents.filter((e) => e.session_id).map((e) => e.session_id)).size;

    const growth = (now: number, before: number) =>
      before === 0 ? (now > 0 ? 100 : 0) : ((now - before) / before) * 100;

    /* hourly performance */
    const hours = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      sessions: 0,
      pix: 0,
      paid: 0,
      revenue: 0,
    }));
    const hourSessions: Array<Set<string>> = Array.from({ length: 24 }, () => new Set<string>());
    for (const event of events) {
      const hour = new Date(event.created_at).getHours();
      if (event.session_id) hourSessions[hour]?.add(String(event.session_id));
    }
    for (const order of orders) {
      const bucket = hours[new Date(order.created_at).getHours()];
      if (!bucket) continue;
      bucket.pix += 1;
      if (order.status === "paid") {
        bucket.paid += 1;
        bucket.revenue += (order.amount_cents ?? 0) / 100;
      }
    }
    hours.forEach((bucket, index) => {
      bucket.sessions = hourSessions[index]?.size ?? 0;
    });

    /* weekday performance */
    const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const weekdays = weekdayNames.map((label) => ({ label, pix: 0, paid: 0, revenue: 0 }));
    for (const order of orders) {
      const bucket = weekdays[new Date(order.created_at).getDay()];
      if (!bucket) continue;
      bucket.pix += 1;
      if (order.status === "paid") {
        bucket.paid += 1;
        bucket.revenue += (order.amount_cents ?? 0) / 100;
      }
    }

    /* funnel with drop-off */
    const sessionsBy = (type: string) =>
      new Set(events.filter((e) => e.event_type === type && e.session_id).map((e) => e.session_id))
        .size;
    const rawFunnel = [
      { label: "Visitantes", value: sessions },
      { label: "Viu produto", value: sessionsBy("product_view") },
      { label: "Carrinho", value: sessionsBy("add_to_cart") },
      { label: "Checkout", value: sessionsBy("checkout_view") },
      { label: "Pix gerado", value: orders.length },
      { label: "Pago", value: paid.length },
    ];
    const funnel = rawFunnel.map((step, index) => {
      const previous = index === 0 ? step.value : (rawFunnel[index - 1]?.value ?? 0);
      const first = rawFunnel[0]?.value ?? 0;
      return {
        label: step.label,
        value: step.value,
        stepRate: previous ? (step.value / previous) * 100 : 0,
        totalRate: first ? (step.value / first) * 100 : 0,
        lost: Math.max(0, previous - step.value),
      };
    });

    /* utm breakdowns with revenue attribution */
    const attribution = (field: string) => {
      const map = new Map<string, { sessions: Set<string>; pix: number; paid: number; revenue: number }>();
      const get = (key: string) => {
        const existing = map.get(key);
        if (existing) return existing;
        const created = { sessions: new Set<string>(), pix: 0, paid: 0, revenue: 0 };
        map.set(key, created);
        return created;
      };
      for (const event of events) {
        if (!event.session_id) continue;
        get(String((event.utm as AnyRecord)?.[field] ?? "direto")).sessions.add(String(event.session_id));
      }
      for (const order of orders) {
        const entry = get(String((order.utm as AnyRecord)?.[field] ?? "direto"));
        entry.pix += 1;
        if (order.status === "paid") {
          entry.paid += 1;
          entry.revenue += (order.amount_cents ?? 0) / 100;
        }
      }
      return Array.from(map.entries())
        .map(([label, value]) => ({
          label,
          sessions: value.sessions.size,
          pix: value.pix,
          paid: value.paid,
          revenue: value.revenue,
          conversion: value.sessions.size ? (value.paid / value.sessions.size) * 100 : 0,
        }))
        .sort((a, b) => b.revenue - a.revenue || b.sessions - a.sessions)
        .slice(0, 12);
    };

    /* top pages */
    const pageMap = new Map<string, { views: number; sessions: Set<string> }>();
    for (const event of events) {
      if (event.event_type !== "pageview") continue;
      const key = String(event.path ?? "/").split("?")[0] || "/";
      const entry = pageMap.get(key) ?? { views: 0, sessions: new Set<string>() };
      entry.views += 1;
      if (event.session_id) entry.sessions.add(String(event.session_id));
      pageMap.set(key, entry);
    }
    const topPages = Array.from(pageMap.entries())
      .map(([label, value]) => ({ label, views: value.views, sessions: value.sessions.size }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 12);

    /* places */
    const placeMap = new Map<string, { paid: number; revenue: number; pix: number }>();
    for (const order of orders) {
      const key = [order.city, order.state].filter(Boolean).join(" / ") || "não informado";
      const entry = placeMap.get(key) ?? { paid: 0, revenue: 0, pix: 0 };
      entry.pix += 1;
      if (order.status === "paid") {
        entry.paid += 1;
        entry.revenue += (order.amount_cents ?? 0) / 100;
      }
      placeMap.set(key, entry);
    }
    const places = Array.from(placeMap.entries())
      .map(([label, value]) => ({ label, ...value }))
      .sort((a, b) => b.revenue - a.revenue || b.pix - a.pix)
      .slice(0, 12);

    /* time to payment */
    const payTimes = paid
      .filter((o) => o.paid_at)
      .map((o) => (new Date(o.paid_at).getTime() - new Date(o.created_at).getTime()) / 60000)
      .filter((minutes) => minutes >= 0 && minutes < 60 * 24)
      .sort((a, b) => a - b);
    const median = payTimes.length ? payTimes[Math.floor(payTimes.length / 2)] ?? 0 : 0;
    const average = payTimes.length ? payTimes.reduce((s, v) => s + v, 0) / payTimes.length : 0;

    /* abandonment */
    const checkoutSessions = new Set(
      events.filter((e) => e.event_type === "checkout_view" && e.session_id).map((e) => String(e.session_id)),
    );
    const pixSessions = new Set(
      events.filter((e) => e.event_type === "purchase" && e.session_id).map((e) => String(e.session_id)),
    );
    const cartSessions = new Set(
      events.filter((e) => e.event_type === "add_to_cart" && e.session_id).map((e) => String(e.session_id)),
    );

    /* ticket buckets */
    const buckets = [
      { label: "até R$ 150", min: 0, max: 15000 },
      { label: "R$ 150–250", min: 15000, max: 25000 },
      { label: "R$ 250–400", min: 25000, max: 40000 },
      { label: "acima de R$ 400", min: 40000, max: Infinity },
    ].map((bucket) => ({
      label: bucket.label,
      paid: paid.filter((o) => (o.amount_cents ?? 0) >= bucket.min && (o.amount_cents ?? 0) < bucket.max)
        .length,
      revenue:
        paid
          .filter((o) => (o.amount_cents ?? 0) >= bucket.min && (o.amount_cents ?? 0) < bucket.max)
          .reduce((sum, o) => sum + (o.amount_cents ?? 0), 0) / 100,
    }));

    return {
      days: data.days,
      comparison: {
        revenue: { now: revenue, before: prevRevenue, growth: growth(revenue, prevRevenue) },
        paid: { now: paid.length, before: prevPaid.length, growth: growth(paid.length, prevPaid.length) },
        pix: { now: orders.length, before: prevOrders.length, growth: growth(orders.length, prevOrders.length) },
        sessions: { now: sessions, before: prevSessions, growth: growth(sessions, prevSessions) },
      },
      hours,
      weekdays,
      funnel,
      sources: attribution("utm_source"),
      campaigns: attribution("utm_campaign"),
      mediums: attribution("utm_medium"),
      topPages,
      places,
      payment: {
        medianMinutes: median,
        averageMinutes: average,
        paidWithTime: payTimes.length,
        pendingCount: orders.length - paid.length,
        pendingValue: orders
          .filter((o) => o.status !== "paid")
          .reduce((sum, o) => sum + (o.amount_cents ?? 0), 0) / 100,
      },
      abandonment: {
        cartSessions: cartSessions.size,
        checkoutSessions: checkoutSessions.size,
        purchasedSessions: pixSessions.size,
        cartAbandonRate: cartSessions.size
          ? ((cartSessions.size - checkoutSessions.size) / cartSessions.size) * 100
          : 0,
        checkoutAbandonRate: checkoutSessions.size
          ? ((checkoutSessions.size - paid.length) / checkoutSessions.size) * 100
          : 0,
      },
      ticketBuckets: buckets,
    };
  });

/* ------------------------------------------------------- facebook / meta */

export const adminGetMetaSettings = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { getMetaSettings } = await import("./meta-tracking.server");
  const settings = await getMetaSettings(true);
  return {
    pixelIds: settings.pixel_ids,
    hasAccessToken: Boolean(settings.access_token),
    testEventCode: settings.test_event_code,
    serverEventsEnabled: settings.server_events_enabled,
    trackPageview: settings.track_pageview,
  };
});

export const adminSaveMetaSettings = createServerFn({ method: "POST" })
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
    const { saveMetaSettings } = await import("./meta-tracking.server");
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
    const saved = await saveMetaSettings(patch);
    return { ok: true as const, pixelIds: saved.pixel_ids, hasAccessToken: Boolean(saved.access_token) };
  });

export const adminTestMetaEvent = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { sendMetaServerEvent } = await import("./meta-tracking.server");
  const result = await sendMetaServerEvent("ViewContent", {
    value: 1,
    referenceId: `teste-${Date.now()}`,
    contents: [{ id: "teste", titulo: "Evento de teste", quantidade: 1, preco: 1 }],
  });
  return { ok: result.ok, message: result.message };
});

/* --------------------------------------------------- carrinhos abandonados */

export const adminAbandonedCarts = createServerFn({ method: "POST" })
  .inputValidator((data: { days?: number }) => ({ days: Math.min(90, Math.max(1, data?.days ?? 7)) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const client = await db();
    const since = sinceIso(data.days);

    const [ordersRes, eventsRes] = await Promise.all([
      client
        .from("shop_orders")
        .select(
          "reference_id, status, amount_cents, customer_name, customer_email, customer_phone, city, state, items, utm, session_id, created_at",
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(3000),
      client
        .from("shop_events")
        .select("session_id, event_type, product_id, product_title, value_cents, utm, device, city, country, created_at, path")
        .gte("created_at", since)
        .in("event_type", ["add_to_cart", "checkout_view", "cart_view", "pix_generated", "purchase"])
        .order("created_at", { ascending: true })
        .limit(40000),
    ]);

    const orders = (ordersRes.data ?? []) as AnyRecord[];
    const events = (eventsRes.data ?? []) as AnyRecord[];

    /* 1. Pix gerado mas nao pago (tem contato -> recuperavel) */
    const pendingOrders = orders
      .filter((o) => o.status !== "paid")
      .map((o) => ({
        referenceId: String(o.reference_id ?? ""),
        status: String(o.status ?? "pending"),
        value: (Number(o.amount_cents) || 0) / 100,
        name: String(o.customer_name ?? ""),
        email: String(o.customer_email ?? ""),
        phone: String(o.customer_phone ?? ""),
        place: [o.city, o.state].filter(Boolean).join(" / "),
        items: ((o.items ?? []) as AnyRecord[]).map((item) => ({
          title: String(item.titulo ?? item.title ?? "Produto"),
          quantity: Number(item.quantidade ?? 1) || 1,
        })),
        source: String((o.utm ?? {}).utm_source ?? "direto"),
        createdAt: String(o.created_at ?? ""),
        minutesAgo: Math.round((Date.now() - new Date(String(o.created_at)).getTime()) / 60000),
      }))
      .slice(0, 200);

    /* 2. Sessoes que colocaram no carrinho e nunca geraram Pix */
    const orderedSessions = new Set(
      orders.map((o) => String(o.session_id ?? "")).filter(Boolean),
    );
    const paidSessions = new Set(
      orders.filter((o) => o.status === "paid").map((o) => String(o.session_id ?? "")).filter(Boolean),
    );

    type Bucket = {
      sessionId: string;
      products: Map<string, { title: string; value: number }>;
      reachedCheckout: boolean;
      generatedPix: boolean;
      value: number;
      device: string;
      place: string;
      source: string;
      lastSeen: string;
      lastPath: string;
    };

    const buckets = new Map<string, Bucket>();
    for (const event of events) {
      const sessionId = String(event.session_id ?? "");
      if (!sessionId) continue;
      const bucket =
        buckets.get(sessionId) ??
        {
          sessionId,
          products: new Map<string, { title: string; value: number }>(),
          reachedCheckout: false,
          generatedPix: false,
          value: 0,
          device: "",
          place: "",
          source: "direto",
          lastSeen: "",
          lastPath: "",
        };

      if (event.event_type === "add_to_cart") {
        const key = String(event.product_id ?? event.product_title ?? "?");
        bucket.products.set(key, {
          title: String(event.product_title ?? "Produto"),
          value: (Number(event.value_cents) || 0) / 100,
        });
      }
      if (event.event_type === "checkout_view") bucket.reachedCheckout = true;
      if (event.event_type === "pix_generated" || event.event_type === "purchase") bucket.generatedPix = true;
      if ((Number(event.value_cents) || 0) > 0) bucket.value = (Number(event.value_cents) || 0) / 100;
      if (event.device) bucket.device = String(event.device);
      const place = [event.city, event.country].filter(Boolean).join(" / ");
      if (place) bucket.place = place;
      const source = String((event.utm ?? {}).utm_source ?? "");
      if (source) bucket.source = source;
      bucket.lastSeen = String(event.created_at ?? bucket.lastSeen);
      if (event.path) bucket.lastPath = String(event.path);
      buckets.set(sessionId, bucket);
    }

    const sessions = Array.from(buckets.values())
      .filter(
        (bucket) =>
          bucket.products.size > 0 &&
          !bucket.generatedPix &&
          !orderedSessions.has(bucket.sessionId) &&
          !paidSessions.has(bucket.sessionId),
      )
      .map((bucket) => {
        const products = Array.from(bucket.products.values());
        return {
          sessionId: bucket.sessionId,
          products: products.map((product) => product.title),
          value: bucket.value || products.reduce((sum, product) => sum + product.value, 0),
          reachedCheckout: bucket.reachedCheckout,
          device: bucket.device || "-",
          place: bucket.place || "-",
          source: bucket.source,
          lastPath: bucket.lastPath || "-",
          lastSeen: bucket.lastSeen,
          minutesAgo: Math.round((Date.now() - new Date(bucket.lastSeen).getTime()) / 60000),
        };
      })
      .sort((a, b) => (a.lastSeen < b.lastSeen ? 1 : -1))
      .slice(0, 200);

    const cartSessionsTotal = Array.from(buckets.values()).filter((b) => b.products.size > 0).length;

    return {
      days: data.days,
      totals: {
        pendingCount: pendingOrders.length,
        pendingValue: pendingOrders.reduce((sum, order) => sum + order.value, 0),
        abandonedSessions: sessions.length,
        abandonedValue: sessions.reduce((sum, item) => sum + item.value, 0),
        checkoutAbandoned: sessions.filter((item) => item.reachedCheckout).length,
        cartSessionsTotal,
        abandonRate: cartSessionsTotal ? (sessions.length / cartSessionsTotal) * 100 : 0,
      },
      pendingOrders,
      sessions,
    };
  });

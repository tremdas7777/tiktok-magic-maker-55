type JsonRecord = Record<string, unknown>;

type LegacyConfig = {
  publicKey: string;
  secretKey: string;
  apiUrl: string;
  webhookUrl: string;
  isPhysicalProduct: boolean;
};

/** Safe read from an untyped JSON object (avoids index-signature dot access). */
function get(record: JsonRecord, key: string): unknown {
  return record[key];
}

function asRecord(value: unknown): JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function str(value: unknown, fallback = ""): string {
  const out = String(value ?? "").trim();
  return out || fallback;
}

function onlyDigits(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "");
}

function normalizePhone(phone: unknown): string {
  const digits = onlyDigits(phone);
  if (digits.startsWith("55")) return digits;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits || "5511999999999";
}

function toCents(value: unknown): number {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return 0;
  return Math.max(0, Math.round(amount * 100));
}

function env(name: string): string {
  return String(process.env[name] ?? "").trim();
}

/** Keys are read from Lovable Secrets only — never from the repo. */
function loadConfig(): LegacyConfig {
  const publicKey = env("LEGACY_PUBLIC_KEY");
  const secretKey = env("LEGACY_SECRET_KEY");

  if (!publicKey || !secretKey) {
    throw new Error(
      "Configure LEGACY_PUBLIC_KEY e LEGACY_SECRET_KEY nos Secrets do projeto.",
    );
  }

  return {
    publicKey,
    secretKey,
    apiUrl: env("LEGACY_API_URL") || "https://api.legacyecombrasil.com",
    webhookUrl: env("LEGACY_WEBHOOK_URL"),
    isPhysicalProduct: env("LEGACY_IS_PHYSICAL_PRODUCT") !== "false",
  };
}

function authHeader(publicKey: string, secretKey: string): string {
  const raw = `${publicKey}:${secretKey}`;
  const token =
    typeof Buffer !== "undefined" ? Buffer.from(raw).toString("base64") : btoa(raw);
  return `Basic ${token}`;
}

function buildPayinPayload(
  order: JsonRecord,
  payerIp: string,
  cfg: LegacyConfig,
): JsonRecord {
  const comprador = asRecord(get(order, "comprador"));
  const entrega = asRecord(get(order, "entrega"));
  const frete = asRecord(get(order, "frete"));
  const rawCart = get(order, "carrinho");
  const carrinho = Array.isArray(rawCart) ? rawCart : [];

  const amountCents = toCents(get(order, "valor") ?? get(order, "total") ?? 0);
  if (amountCents <= 0) {
    throw new Error("Valor inválido.");
  }

  const items: JsonRecord[] = [];
  for (const rawItem of carrinho) {
    const item = asRecord(rawItem);
    const qty = Math.max(
      1,
      Number(get(item, "quantidade") ?? get(item, "qty") ?? 1) || 1,
    );
    const unit = toCents(get(item, "preco") ?? get(item, "price") ?? 0);
    if (unit <= 0) continue;
    items.push({
      title: str(get(item, "titulo") ?? get(item, "title"), "Produto").slice(0, 120),
      quantity: qty,
      unitPrice: unit,
    });
  }

  const freteCents = toCents(get(frete, "preco") ?? get(frete, "price") ?? 0);
  if (freteCents > 0) {
    items.push({
      title: str(get(frete, "titulo"), "Frete"),
      quantity: 1,
      unitPrice: freteCents,
    });
  }

  if (items.length === 0) {
    items.push({ title: "Pedido TikTok Shop", quantity: 1, unitPrice: amountCents });
  }

  const document = onlyDigits(get(comprador, "cpf"));
  if (document.length !== 11 && document.length !== 14) {
    throw new Error("CPF/CNPJ inválido.");
  }

  const address: JsonRecord = {
    street: str(get(entrega, "endereco"), "Rua"),
    number: str(get(entrega, "numero"), "S/N"),
    zipCode: onlyDigits(get(entrega, "cep")) || "01000000",
    city: str(get(entrega, "cidade"), "São Paulo"),
    state: str(get(entrega, "estado"), "SP").slice(0, 2).toUpperCase(),
  };

  const complemento = str(get(entrega, "complemento"));
  if (complemento) address["complement"] = complemento;
  const bairro = str(get(entrega, "bairro"));
  if (bairro) address["neighborhood"] = bairro;

  const payload: JsonRecord = {
    paymentMethod: "PIX",
    amount: amountCents,
    referenceId: `pedido-${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`,
    isPhysicalProduct: cfg.isPhysicalProduct,
    payerIp,
    customer: {
      name: str(get(comprador, "nome"), "Cliente"),
      document,
      email: str(get(comprador, "email"), "cliente@email.com"),
      phone: normalizePhone(get(comprador, "telefone")),
      address,
    },
    items,
  };

  const webhook = cfg.webhookUrl;
  if (webhook && !webhook.startsWith("https://SEU-DOMINIO")) {
    payload["webhookUrl"] = webhook;
  }

  return payload;
}

function payerIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export async function createPixPayin(
  order: JsonRecord,
  payerIp: string,
): Promise<JsonRecord> {
  const cfg = loadConfig();
  const payload = buildPayinPayload(order, payerIp, cfg);
  const apiUrl = cfg.apiUrl.replace(/\/$/, "");

  const response = await fetch(`${apiUrl}/payin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authHeader(cfg.publicKey, cfg.secretKey),
      "User-Agent": "tiktok-shop-funnel/1.0",
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let data: JsonRecord = {};
  try {
    data = raw ? (JSON.parse(raw) as JsonRecord) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    const message = str(
      get(data, "message") ?? get(data, "error") ?? raw,
      `Legacy API ${response.status}`,
    );
    throw new Error(`Legacy API ${response.status}: ${message}`);
  }

  const pix = asRecord(get(data, "pix"));
  const qrcode = str(
    get(pix, "qrcode") ?? get(data, "qrcode") ?? get(data, "qr_code"),
  );
  if (!qrcode) {
    throw new Error("Legacy não retornou QR Code PIX.");
  }

  const transactionId = get(data, "id") ?? null;

  return {
    success: true,
    qr_code: qrcode,
    pix_qr_code: qrcode,
    pixCode: qrcode,
    copy_and_paste: qrcode,
    referenceId: get(data, "referenceId") ?? get(payload, "referenceId"),
    id: transactionId,
    transactionId,
    status: get(data, "status") ?? null,
    amount: get(data, "amount") ?? get(payload, "amount"),
    pix: Object.keys(pix).length ? pix : { qrcode },
  };
}

export async function handlePixRequest(request: Request): Promise<Response> {
  try {
    const raw = await request.text();
    const order = raw ? (JSON.parse(raw) as JsonRecord) : {};
    const result = await createPixPayin(order, payerIpFromRequest(request));
    return jsonResponse(200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gerar Pix.";
    console.error("[legacy-pix]", message);
    const status = /inválid|Valor/i.test(message)
      ? 400
      : /Configure/i.test(message)
        ? 500
        : 502;
    return jsonResponse(status, { success: false, message });
  }
}

function jsonResponse(status: number, payload: JsonRecord): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const PIX_PATHS = new Set(["/pix_teste.php", "/api/pix", "/pix.php"]);

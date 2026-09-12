/* eslint-disable @typescript-eslint/no-explicit-any */
// Loose JSON shape: gateway payloads are dynamic, so dotted access is allowed.
type JsonRecord = any;

type LegacyConfig = {
  public_key: string;
  secret_key: string;
  api_url: string;
  webhook_url: string;
  is_physical_product: boolean;
};

function asRecord(value: unknown): JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
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
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return Math.max(1, Math.round(amount * 100));
}

function cleanOrderTitle(title: string): string {
  return title
    .replace(/Tênis\s+(Masculino|Feminino|Unissex|Infantil)\b\s*/gi, "")
    .replace(/(?:^|\s|[\-\/])asics(?:\s|[\-\/]|$)/gi, " ")
    .replace(/asics/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

import { readEnv as env, setRuntimeEnv } from "./runtime-env.server";
import { markOrderPaid, recordPixOrder } from "./shop-tracking.server";

export { setRuntimeEnv };


async function loadConfig(): Promise<LegacyConfig> {
  const fromEnv: LegacyConfig = {
    public_key: env("LEGACY_PUBLIC_KEY"),
    secret_key: env("LEGACY_SECRET_KEY"),
    api_url: env("LEGACY_API_URL") || "https://api.legacyecombrasil.com",
    webhook_url: env("LEGACY_WEBHOOK_URL"),
    is_physical_product: env("LEGACY_IS_PHYSICAL_PRODUCT") !== "false",
  };

  if (fromEnv.public_key && fromEnv.secret_key) {
    return fromEnv;
  }

  try {
    const { readFile } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const raw = await readFile(join(process.cwd(), "legacy-config.json"), "utf8");
    const parsed = JSON.parse(raw) as JsonRecord;
    const publicKey = String(parsed.public_key ?? "").trim();
    const secretKey = String(parsed.secret_key ?? "").trim();
    if (publicKey && secretKey) {
      return {
        public_key: publicKey,
        secret_key: secretKey,
        api_url: String(parsed.api_url ?? fromEnv.api_url).trim() || fromEnv.api_url,
        webhook_url: String(parsed.webhook_url ?? "").trim(),
        is_physical_product: parsed.is_physical_product !== false,
      };
    }
  } catch {
    // Local file is optional when env vars are set in Lovable.
  }

  throw new Error(
    "Configure LEGACY_PUBLIC_KEY e LEGACY_SECRET_KEY nos Secrets do Lovable (ou legacy-config.json localmente).",
  );
}

function authHeader(publicKey: string, secretKey: string): string {
  const raw = `${publicKey}:${secretKey}`;
  const token =
    typeof Buffer !== "undefined"
      ? Buffer.from(raw).toString("base64")
      : btoa(raw);
  return `Basic ${token}`;
}

function buildPayinPayload(order: JsonRecord, payerIp: string, cfg: LegacyConfig): JsonRecord {
  const comprador = asRecord(order.comprador);
  const entrega = asRecord(order.entrega);
  const carrinho = Array.isArray(order.carrinho) ? order.carrinho : [];
  const frete = asRecord(order.frete);

  const total = order.valor ?? order.total ?? 0;
  const amountCents = toCents(total);
  if (amountCents <= 0) {
    throw new Error("Valor inválido.");
  }

  const referenceId = `pedido-${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
  const items: JsonRecord[] = [];

  for (const rawItem of carrinho) {
    const item = asRecord(rawItem);
    const qty = Math.max(1, Number(item.quantidade ?? item.qty ?? 1) || 1);
    const unit = toCents(item.preco ?? item.price ?? 0);
    if (unit <= 0) continue;
    items.push({
      title: cleanOrderTitle(String(item.titulo ?? item.title ?? "Produto")),
      quantity: qty,
      unitPrice: unit,
    });
  }

  const freteCents = toCents(frete.preco ?? frete.price ?? 0);
  if (freteCents > 0) {
    items.push({
      title: cleanOrderTitle(String(frete.titulo ?? "Frete")),
      quantity: 1,
      unitPrice: freteCents,
    });
  }

  if (items.length === 0) {
    items.push({
      title: "Pedido TikTok Shop",
      quantity: 1,
      unitPrice: amountCents,
    });
  }

  const document = onlyDigits(comprador.cpf);
  if (document.length !== 11 && document.length !== 14) {
    throw new Error("CPF/CNPJ inválido.");
  }

  const payload: JsonRecord = {
    paymentMethod: "PIX",
    amount: amountCents,
    referenceId,
    isPhysicalProduct: cfg.is_physical_product,
    payerIp,
    customer: {
      name: String(comprador.nome ?? "Cliente").trim(),
      document,
      email: String(comprador.email ?? "cliente@email.com").trim(),
      phone: normalizePhone(comprador.telefone),
      address: {
        street: String(entrega.endereco ?? "Rua").trim(),
        number: String(entrega.numero ?? "S/N").trim(),
        zipCode: onlyDigits(entrega.cep) || "01000000",
        city: String(entrega.cidade ?? "São Paulo").trim(),
        state: String(entrega.estado ?? "SP").trim().slice(0, 2).toUpperCase(),
      },
    },
    items,
  };

  const customer = asRecord(payload.customer);
  const address = asRecord(customer.address);
  const complemento = String(entrega.complemento ?? "").trim();
  const bairro = String(entrega.bairro ?? "").trim();
  if (complemento) address.complement = complemento;
  if (bairro) address.neighborhood = bairro;
  customer.address = address;
  payload.customer = customer;

  const webhook = cfg.webhook_url.trim();
  if (webhook && !webhook.startsWith("https://SEU-DOMINIO")) {
    payload.webhookUrl = webhook;
  }

  return payload;
}

function payerIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "127.0.0.1";
}

export async function createPixPayin(
  order: JsonRecord,
  payerIp: string,
): Promise<JsonRecord> {
  const cfg = await loadConfig();
  const payload = buildPayinPayload(order, payerIp, cfg);
  const apiUrl = cfg.api_url.replace(/\/$/, "");
  const response = await fetch(`${apiUrl}/payin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(cfg.public_key, cfg.secret_key),
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
    const message = String(data.message ?? data.error ?? raw ?? `Legacy API ${response.status}`);
    throw new Error(`Legacy API ${response.status}: ${message}`);
  }

  const pix = asRecord(data.pix);
  const qrcode = extractPixCode(data);
  if (!qrcode) {
    throw new Error("Legacy não retornou QR Code PIX.");
  }

  const pixImage = extractPixImage(data, qrcode);

  return {
    success: true,
    qr_code: qrcode,
    pix_qr_code: qrcode,
    pixCode: qrcode,
    copy_and_paste: qrcode,
    qr_code_image_url: pixImage,
    pix_qr_code_image: pixImage,
    pixImage,
    referenceId: data.referenceId ?? payload.referenceId,
    transactionId: data.id,
    id: data.id,
    status: data.status,
    amount: data.amount,
    pix: Object.keys(pix).length ? { ...pix, qrcode } : { qrcode },
    legacy: data,
  };
}

function firstNonEmpty(...values: unknown[]): string {
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (text) return text;
  }
  return "";
}

function extractPixCode(data: JsonRecord): string {
  const pix = asRecord(data.pix);
  const nestedPix = asRecord(pix.pix);
  const inner = asRecord(data.data);
  const candidates = [
    pix.qrcode,
    pix.qrCode,
    pix.emv,
    pix.copyPaste,
    pix.copy_paste,
    pix.copiaecola,
    pix.qr_code,
    pix.pix_qr_code,
    pix.code,
    nestedPix.qrcode,
    nestedPix.emv,
    data.qrcode,
    data.qr_code,
    data.emv,
    data.copy_and_paste,
    data.copyPaste,
    inner.qrcode,
    inner.qr_code,
    inner.emv,
    inner.copypaste,
    inner.qr_code_pix,
  ];
  for (const candidate of candidates) {
    const text = String(candidate ?? "").trim();
    if (text && (text.startsWith("000201") || text.length > 40) && !looksLikeImagePayload(text)) {
      return text;
    }
  }
  return firstNonEmpty(...candidates);
}

function looksLikeImagePayload(value: string): boolean {
  if (value.startsWith("data:image") || value.startsWith("http://") || value.startsWith("https://")) {
    return true;
  }
  return /^[A-Za-z0-9+/]+=*$/.test(value) && value.length > 200 && !value.startsWith("000201");
}

function extractPixImage(data: JsonRecord, pixCode: string): string {
  const pix = asRecord(data.pix);
  const inner = asRecord(data.data);
  const raw = firstNonEmpty(
    pix.qrCodeImage,
    pix.qr_code_image,
    pix.qr_code_base64,
    pix.qrcode_base64,
    pix.image,
    data.qr_code_base64,
    data.pix_qr_code_base64,
    data.qr_code_image_url,
    data.pix_qr_code_image,
    inner.qr_code_image_url,
    inner.pix_qr_code_image,
  );
  if (raw.startsWith("data:image") || raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  if (raw && !raw.startsWith("000201")) {
    return `data:image/png;base64,${raw}`;
  }
  if (!pixCode) return "";
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&ecc=M&margin=8&data=${encodeURIComponent(pixCode)}`;
}

export async function handlePixRequest(request: Request): Promise<Response> {
  try {
    const raw = await request.text();
    const order = raw ? (JSON.parse(raw) as JsonRecord) : {};
    const result = await createPixPayin(order, payerIpFromRequest(request));
    return jsonResponse(200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao gerar Pix.";
    const status =
      message.includes("inválido") || message.includes("Valor")
        ? 400
        : message.includes("Configure")
          ? 500
          : 502;
    return jsonResponse(status, { success: false, message });
  }
}

function publicPaymentStatus(status: unknown): string {
  const value = String(status ?? "").toLowerCase().trim();
  if (["pago", "aprovado", "confirmado", "liquidado"].includes(value)) return "paid";
  return value || "pending";
}

async function legacyGet(path: string): Promise<{ ok: boolean; status: number; data: JsonRecord }> {
  const cfg = await loadConfig();
  const apiUrl = cfg.api_url.replace(/\/$/, "");
  const response = await fetch(`${apiUrl}${path}`, {
    method: "GET",
    headers: {
      Authorization: authHeader(cfg.public_key, cfg.secret_key),
      "User-Agent": "tiktok-shop-funnel/1.0",
    },
  });
  const raw = await response.text();
  let data: JsonRecord = {};
  try {
    data = raw ? (JSON.parse(raw) as JsonRecord) : {};
  } catch {
    data = { message: raw };
  }
  return { ok: response.ok, status: response.status, data };
}

export async function getPayin(tx: string, ref: string): Promise<JsonRecord> {
  const transactionId = tx.trim();
  const referenceId = ref.trim();
  if (!transactionId && !referenceId) {
    throw new Error("Informe ref ou tx.");
  }

  if (transactionId) {
    const byId = await legacyGet(`/payin/${encodeURIComponent(transactionId)}`);
    if (byId.ok) return byId.data;
    if (byId.status !== 404) {
      throw new Error(String(byId.data.message ?? `Legacy API ${byId.status}`));
    }
  }

  if (referenceId) {
    const byRef = await legacyGet(`/payin?referenceId=${encodeURIComponent(referenceId)}`);
    if (byRef.ok) {
      const rows = Array.isArray(byRef.data.data) ? byRef.data.data : [];
      const first = rows[0];
      if (first && typeof first === "object") return first as JsonRecord;
      if (!Array.isArray(byRef.data.data) && byRef.data.id) return byRef.data;
    }
  }

  throw new Error("Pedido não encontrado.");
}

export async function handlePixStatusRequest(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const payin = await getPayin(url.searchParams.get("tx") ?? "", url.searchParams.get("ref") ?? "");
    return jsonResponse(200, {
      success: true,
      status: publicPaymentStatus(payin.status),
      referenceId: payin.referenceId,
      transactionId: payin.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha ao consultar Pix.";
    const status = message.includes("Informe") ? 400 : message.includes("Configure") ? 500 : 200;
    return jsonResponse(status, { success: false, status: "pending", message });
  }
}

export async function handlePixOrderRequest(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const payin = await getPayin(url.searchParams.get("tx") ?? "", url.searchParams.get("ref") ?? "");
    const qrcode = extractPixCode(payin);
    const pixImage = extractPixImage(payin, qrcode);
    return jsonResponse(200, {
      success: true,
      order: {
        pix: payin,
        pixCode: qrcode || undefined,
        pixImage: pixImage || undefined,
        referenceId: payin.referenceId,
        transactionId: payin.id,
        gatewayResponse: payin,
        carrinho: [],
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pedido não encontrado.";
    return jsonResponse(404, { success: false, message });
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

export const PIX_PATHS = new Set([
  "/pix_teste.php",
  "/api/pix",
  "/api/public/pix",
  "/pix.php",
]);

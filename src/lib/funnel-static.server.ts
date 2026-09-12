import { FUNNEL_FILES } from "./funnel-pages.generated";
import {
  handleLegacyWebhook,
  handlePixOrderRequest,
  handlePixRequest,
  handlePixStatusRequest,
  PIX_PATHS,
} from "./legacy-pix.server";
import { handleMetaPixelJs } from "./meta-tracking.server";
import {
  handleShopTrackJs,
  handleTikTokConfigJs,
  handleTikTokPixelLookup,
  handleTrackRequest,
} from "./shop-tracking.server";


const PAGES: Record<string, string | undefined> = {
  "/": FUNNEL_FILES["index.html"],
  "/index.php": FUNNEL_FILES["index.html"],
  "/index.html": FUNNEL_FILES["index.html"],
  "/produto.php": FUNNEL_FILES["produto.html"],
  "/produto.html": FUNNEL_FILES["produto.html"],
  "/cart.php": FUNNEL_FILES["cart.html"],
  "/cart.html": FUNNEL_FILES["cart.html"],
  "/checkout.php": FUNNEL_FILES["checkout.html"],
  "/checkout.html": FUNNEL_FILES["checkout.html"],
  "/payment.php": FUNNEL_FILES["payment.php"],
  "/payment.html": FUNNEL_FILES["payment.php"],
  "/politica-de-privacidade.php": FUNNEL_FILES["politica-de-privacidade.php"],
};

const TRACK_SNIPPET =
  '<script src="/shop-track.js" defer></script>\n<script src="/meta-pixel.js" defer></script>';

function withTracking(html: string): string {
  if (html.includes(TRACK_SNIPPET)) return html;
  if (html.includes("</body>")) return html.replace("</body>", `${TRACK_SNIPPET}\n</body>`);
  return html + TRACK_SNIPPET;
}

const FUNNEL_POST_PATHS = new Set(["/api/public/track", "/webhooks/legacy"]);

/**
 * True when the funnel handler can answer this request. Used by the dev/preview
 * middleware so it never consumes the body of a request it will not handle
 * (a consumed body would hang the downstream server-function handler).
 */
export function isFunnelRequest(method: string, pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (method === "GET" || method === "HEAD") return true;
  if (method !== "POST") return false;
  return PIX_PATHS.has(path) || FUNNEL_POST_PATHS.has(path);
}

export async function handleFunnelRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  if (request.method === "POST" && PIX_PATHS.has(pathname)) {
    return handlePixRequest(request);
  }

  if (request.method === "POST" && pathname === "/api/public/track") {
    return handleTrackRequest(request);
  }

  if (request.method === "GET" && pathname === "/tiktok-config.js") {
    return handleTikTokConfigJs();
  }

  // As páginas da loja buscam o ID do pixel neste endereço legado.
  if (request.method === "GET" && pathname === "/app/api/tiktok_pixel.php") {
    return handleTikTokPixelLookup();
  }


  if (request.method === "GET" && pathname === "/meta-pixel.js") {
    return handleMetaPixelJs();
  }

  if (request.method === "GET" && pathname === "/shop-track.js") {
    return handleShopTrackJs();
  }

  if (request.method === "GET" && (pathname === "/api/pix" || pathname === "/pix_teste.php")) {
    return new Response(JSON.stringify({ success: false, message: "Use POST para gerar o Pix." }), {
      status: 405,
      headers: { "Content-Type": "application/json; charset=utf-8", Allow: "POST" },
    });
  }

  if (request.method === "GET" && pathname === "/verifica_pagamento.php") {
    return handlePixStatusRequest(request);
  }

  if (request.method === "GET" && pathname === "/pedido_detalhe.php") {
    return handlePixOrderRequest(request);
  }

  if (request.method === "POST" && pathname === "/webhooks/legacy") {
    return handleLegacyWebhook(request);
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return null;
  }

  const html = PAGES[pathname];
  if (!html) return null;

  return new Response(request.method === "HEAD" ? null : withTracking(html), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

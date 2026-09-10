import { FUNNEL_FILES } from "./funnel-pages.generated";
import {
  handlePixOrderRequest,
  handlePixRequest,
  handlePixStatusRequest,
  PIX_PATHS,
} from "./legacy-pix.server";

const PAGES: Record<string, string> = {
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

export async function handleFunnelRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  if (request.method === "POST" && PIX_PATHS.has(pathname)) {
    return handlePixRequest(request);
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
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return null;
  }

  const html = PAGES[pathname];
  if (!html) return null;

  return new Response(request.method === "HEAD" ? null : html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

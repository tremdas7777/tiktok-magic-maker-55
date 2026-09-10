import cartHtml from "../../funnel/cart.html?raw";
import homeHtml from "../../funnel/index.html?raw";
import checkoutHtml from "../../funnel/checkout.html?raw";
import paymentHtml from "../../funnel/payment.php?raw";
import policyHtml from "../../funnel/politica-de-privacidade.php?raw";
import produtoHtml from "../../funnel/produto.html?raw";
import {
  handlePixOrderRequest,
  handlePixRequest,
  handlePixStatusRequest,
  PIX_PATHS,
} from "./legacy-pix.server";

const PAGES: Record<string, string> = {
  "/": homeHtml,
  "/index.php": homeHtml,
  "/index.html": homeHtml,
  "/produto.php": produtoHtml,
  "/produto.html": produtoHtml,
  "/cart.php": cartHtml,
  "/cart.html": cartHtml,
  "/checkout.php": checkoutHtml,
  "/checkout.html": checkoutHtml,
  "/payment.php": paymentHtml,
  "/payment.html": paymentHtml,
  "/politica-de-privacidade.php": policyHtml,
};

export async function handleFunnelRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/__worker_check") {
    return new Response(JSON.stringify({ worker: true, method: request.method }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

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

import {
  handlePixOrderRequest,
  handlePixRequest,
  handlePixStatusRequest,
  PIX_PATHS,
  setRuntimeEnv,
} from "../src/lib/legacy-pix.server";

type PagesContext = {
  request: Request;
  env: unknown;
  next: () => Promise<Response>;
};

function pathnameOf(request: Request): string {
  return new URL(request.url).pathname.replace(/\/+$/, "") || "/";
}

function json(status: number, payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequest(context: PagesContext): Promise<Response> {
  setRuntimeEnv(context.env);
  const { request } = context;
  const pathname = pathnameOf(request);

  if (request.method === "POST" && PIX_PATHS.has(pathname)) {
    return handlePixRequest(request);
  }

  if (request.method === "GET" && pathname === "/api/public/pix") {
    return json(200, { ok: true, route: "pix" });
  }

  if (request.method === "GET" && (pathname === "/api/pix" || pathname === "/pix_teste.php")) {
    return json(405, { success: false, message: "Use POST para gerar o Pix." });
  }

  if (request.method === "GET" && pathname === "/verifica_pagamento.php") {
    return handlePixStatusRequest(request);
  }

  if (request.method === "GET" && pathname === "/pedido_detalhe.php") {
    return handlePixOrderRequest(request);
  }

  if (request.method === "POST" && pathname === "/webhooks/legacy") {
    return json(200, { received: true });
  }

  return context.next();
}

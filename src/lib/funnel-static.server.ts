import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { handlePixRequest, PIX_PATHS } from "./legacy-pix.server";

const PAGE_FILES: Record<string, string> = {
  "/": "index.html",
  "/index.php": "index.html",
  "/index.html": "index.html",
  "/produto.php": "produto.html",
  "/produto.html": "produto.html",
  "/cart.php": "cart.html",
  "/cart.html": "cart.html",
  "/checkout.php": "checkout.html",
  "/checkout.html": "checkout.html",
  "/payment.php": "payment.php",
  "/payment.html": "payment.php",
  "/politica-de-privacidade.php": "politica-de-privacidade.php",
};

function pageCandidates(fileName: string): string[] {
  const root = process.cwd();
  return [join(root, fileName), join(root, "public", fileName)];
}

export async function handleFunnelRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method === "POST" && PIX_PATHS.has(pathname)) {
    return handlePixRequest(request);
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

  const fileName = PAGE_FILES[pathname];
  if (!fileName) return null;

  for (const filePath of pageCandidates(fileName)) {
    try {
      const html = await readFile(filePath, "utf8");
      return new Response(request.method === "HEAD" ? null : html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    } catch {
      // try next candidate
    }
  }

  if (pathname === `/${fileName}`) return null;
  const fallback = new URL(`/${fileName}`, url.origin);
  fallback.search = url.search;
  return Response.redirect(fallback, 302);
}

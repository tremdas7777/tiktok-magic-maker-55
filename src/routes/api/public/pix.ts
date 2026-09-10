import { createFileRoute } from "@tanstack/react-router";
import { handlePixRequest } from "@/lib/legacy-pix.server";

/**
 * Endpoint público de geração de cobrança PIX (Legacy Ecom).
 * Fica sob /api/public/* para não passar pelo gate de autenticação do site
 * publicado. As chaves são lidas apenas dos Secrets, dentro do handler.
 */
export const Route = createFileRoute("/api/public/pix")({
  server: {
    handlers: {
      GET: async () => Response.json({ ok: true, route: "pix" }),
      POST: async ({ request }) => {
        const marker = Response.json({ ok: true, step: "entered" });
        try {
          const body = await request.text();
          void body;
          return Response.json({ ok: true, step: "body-read" });
        } catch {
          return marker;
        }
      },
    },
  },
});

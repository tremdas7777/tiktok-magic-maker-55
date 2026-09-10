import { createFileRoute } from "@tanstack/react-router";
import { handlePixRequest } from "../lib/legacy-pix.server";

export const Route = createFileRoute("/pix_teste.php")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify({ success: false, message: "Use POST para gerar o Pix." }), {
          status: 405,
          headers: { "Content-Type": "application/json; charset=utf-8", Allow: "POST" },
        }),
      POST: async ({ request }) => handlePixRequest(request),
    },
  },
});

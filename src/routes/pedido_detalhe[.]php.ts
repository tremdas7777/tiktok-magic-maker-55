import { createFileRoute } from "@tanstack/react-router";
import { handlePixOrderRequest } from "../lib/legacy-pix.server";

export const Route = createFileRoute("/pedido_detalhe.php")({
  server: {
    handlers: {
      GET: async ({ request }) => handlePixOrderRequest(request),
    },
  },
});

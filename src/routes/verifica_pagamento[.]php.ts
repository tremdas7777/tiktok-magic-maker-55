import { createFileRoute } from "@tanstack/react-router";
import { handlePixStatusRequest } from "../lib/legacy-pix.server";

export const Route = createFileRoute("/verifica_pagamento.php")({
  server: {
    handlers: {
      GET: async ({ request }) => handlePixStatusRequest(request),
    },
  },
});

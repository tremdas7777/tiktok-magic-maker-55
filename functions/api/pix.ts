import { handlePixRequest, setRuntimeEnv } from "../../src/lib/legacy-pix.server";

type PagesContext = { request: Request; env: unknown };

export async function onRequestGet(): Promise<Response> {
  return new Response(JSON.stringify({ success: false, message: "Use POST para gerar o Pix." }), {
    status: 405,
    headers: { "Content-Type": "application/json; charset=utf-8", Allow: "POST" },
  });
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  setRuntimeEnv(context.env);
  return handlePixRequest(context.request);
}

import { handlePixRequest, setRuntimeEnv } from "../../../src/lib/legacy-pix.server";

type PagesContext = { request: Request; env: unknown };

export async function onRequestGet(): Promise<Response> {
  return Response.json({ ok: true, route: "pix" });
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  setRuntimeEnv(context.env);
  return handlePixRequest(context.request);
}

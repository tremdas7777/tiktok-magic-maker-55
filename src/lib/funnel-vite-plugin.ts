import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { handleFunnelRequest } from "./funnel-static.server";

function nodeToWebRequest(req: IncomingMessage, origin: string): Promise<Request> {
  const url = new URL(req.url || "/", origin);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value == null) continue;
    headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }

  if (req.method === "GET" || req.method === "HEAD") {
    return Promise.resolve(new Request(url, { method: req.method, headers }));
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => {
      resolve(
        new Request(url, {
          method: req.method,
          headers,
          body: new Uint8Array(Buffer.concat(chunks)),
          duplex: "half",
        } as RequestInit),
      );
    });
    req.on("error", reject);
  });
}

async function writeNodeResponse(webResponse: Response, res: ServerResponse) {
  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  const buffer = Buffer.from(await webResponse.arrayBuffer());
  res.end(buffer);
}

export function funnelPlugin(): Plugin {
  return {
    name: "tiktok-funnel-identical",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const origin = server.resolvedUrls?.local[0] ?? "http://localhost:8080";
          const request = await nodeToWebRequest(req, origin);
          const response = await handleFunnelRequest(request);
          if (!response) {
            next();
            return;
          }
          await writeNodeResponse(response, res);
        } catch (error) {
          next(error);
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const request = await nodeToWebRequest(req, "http://localhost:4173");
          const response = await handleFunnelRequest(request);
          if (!response) {
            next();
            return;
          }
          await writeNodeResponse(response, res);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

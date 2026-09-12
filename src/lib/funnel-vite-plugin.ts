import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

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

function makeMiddleware(origin: () => string) {
  return async (req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => {
    try {
      const { handleFunnelRequest, isFunnelRequest } = await import("./funnel-static.server");
      const pathname = new URL(req.url || "/", origin()).pathname;
      if (!isFunnelRequest(req.method || "GET", pathname)) {
        // Do not read the body: the downstream handler still needs it.
        next();
        return;
      }
      const request = await nodeToWebRequest(req, origin());
      const response = await handleFunnelRequest(request);
      if (!response) {
        next();
        return;
      }
      await writeNodeResponse(response, res);
    } catch (error) {
      next(error);
    }
  };
}

export function funnelPlugin(): Plugin {
  return {
    name: "tiktok-funnel-identical",
    configureServer(server) {
      server.middlewares.use(
        makeMiddleware(() => server.resolvedUrls?.local[0] ?? "http://localhost:8080"),
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use(makeMiddleware(() => "http://localhost:4173"));
    },
  };
}

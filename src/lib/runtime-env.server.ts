let runtimeEnv: Record<string, unknown> | undefined;

export function setRuntimeEnv(env: unknown) {
  runtimeEnv = env && typeof env === "object" ? (env as Record<string, unknown>) : undefined;
  if (!runtimeEnv || typeof process === "undefined" || !process.env) return;
  for (const [key, value] of Object.entries(runtimeEnv)) {
    if (typeof value === "string" && value && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

function lookupBinding(source: unknown, name: string): string {
  if (!source || typeof source !== "object") return "";
  const rec = source as Record<string, unknown>;
  const direct = rec[name];
  if (typeof direct === "string" && direct.trim()) return direct.trim();
  for (const nestedKey of ["secrets", "SECRETS", "env", "bindings"]) {
    const nested = rec[nestedKey];
    if (nested && typeof nested === "object") {
      const inner = (nested as Record<string, unknown>)[name];
      if (typeof inner === "string" && inner.trim()) return inner.trim();
    }
  }
  return "";
}

export function readEnv(name: string): string {
  const fromRuntime = lookupBinding(runtimeEnv, name);
  if (fromRuntime) return fromRuntime;
  const fromProcess = String(process.env[name] ?? "").trim();
  if (fromProcess) return fromProcess;
  try {
    const fromMeta = String(
      (import.meta as ImportMeta & { env?: Record<string, unknown> }).env?.[name] ?? "",
    ).trim();
    if (fromMeta) return fromMeta;
  } catch {
    // import.meta.env is optional
  }
  return "";
}

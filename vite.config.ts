import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { funnelPlugin } from "./src/lib/funnel-vite-plugin";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [funnelPlugin()],
  },
});

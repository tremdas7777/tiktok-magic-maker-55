import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

function copyFromPublic(relPath: string, destRelPath?: string) {
  const src = join(pub, relPath);
  const dest = join(root, destRelPath ?? relPath);
  if (!existsSync(src)) {
    console.warn(`skip: ${src} not found in public/`);
    return;
  }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true, force: true });
}

copyFromPublic("index.html", "index.html");
copyFromPublic("index.html", "index.php");
copyFromPublic("cart.html", "cart.html");
copyFromPublic("cart.html", "cart.php");
copyFromPublic("checkout.html", "checkout.html");
copyFromPublic("checkout.html", "checkout.php");
copyFromPublic("produto.html", "produto.html");
copyFromPublic("produto.html", "produto.php");
copyFromPublic("payment.php", "payment.php");
copyFromPublic("payment.php", "payment.html");
copyFromPublic("politica-de-privacidade.php", "politica-de-privacidade.php");
copyFromPublic("loja.json", "loja.json");
copyFromPublic("produtos.json", "produtos.json");
copyFromPublic("produtos-vitrine.json", "produtos-vitrine.json");
copyFromPublic("frete.json", "frete.json");
copyFromPublic("mobile-fix.css", "mobile-fix.css");
copyFromPublic("stylesss.css", "stylesss.css");
copyFromPublic("tiktok-config.js", "tiktok-config.js");
copyFromPublic("store-config.js", "store-config.js");
copyFromPublic("logo.png", "logo.png");
copyFromPublic("logo.webp", "logo.webp");
copyFromPublic("js", "js");
copyFromPublic("fonts", "fonts");
copyFromPublic("assets", "assets");
copyFromPublic("uploads", "uploads");
copyFromPublic("services/zero-gate/pixel.js", "services/zero-gate/pixel.js");

console.log("root/ synced from public/ funnel files");

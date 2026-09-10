import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

function copy(src, dest) {
  cpSync(join(root, src), join(pub, dest), { recursive: true });
}

mkdirSync(join(pub, "js"), { recursive: true });
mkdirSync(join(pub, "services/zero-gate"), { recursive: true });

copy("index.html", "index.html");
copy("index.html", "index.php");
copy("cart.html", "cart.html");
copy("cart.html", "cart.php");
copy("checkout.html", "checkout.html");
copy("checkout.html", "checkout.php");
copy("produto.html", "produto.html");
copy("produto.html", "produto.php");
copy("payment.php", "payment.php");
copy("payment.php", "payment.html");
copy("politica-de-privacidade.php", "politica-de-privacidade.php");
copy("loja.json", "loja.json");
copy("produtos.json", "produtos.json");
copy("produtos-vitrine.json", "produtos-vitrine.json");
copy("frete.json", "frete.json");
copy("mobile-fix.css", "mobile-fix.css");
copy("stylesss.css", "stylesss.css");
copy("tiktok-config.js", "tiktok-config.js");
copy("store-config.js", "store-config.js");
copy("logo.png", "logo.png");
copy("logo.webp", "logo.webp");
copy("js", "js");
copy("fonts", "fonts");
copy("assets", "assets");
copy("uploads", "uploads");
copy("services/zero-gate/pixel.js", "services/zero-gate/pixel.js");

console.log("public/ synced with original funnel files");

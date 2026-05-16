import { readdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const assetsDir = join(process.cwd(), "dist/client/assets");
const distDir = join(process.cwd(), "dist");
const files = readdirSync(assetsDir);

const cssFile = files.find((f) => f.endsWith(".css"));

// The main entry JS is the one containing __vite__mapDeps (the chunk loader)
const indexFiles = files.filter((f) => f.startsWith("index-") && f.endsWith(".js"));
let entryJs = indexFiles[0];
for (const f of indexFiles) {
  const content = readFileSync(join(assetsDir, f), "utf8").slice(0, 1000);
  if (content.includes("__vite__mapDeps")) {
    entryJs = f;
    break;
  }
}

console.log(`  CSS entry: ${cssFile}`);
console.log(`  JS entry:  ${entryJs}`);

const html = `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Hoàng Đế Nội Kinh — Bí Kíp Dưỡng Sinh. Trí tuệ ngàn năm về sức khoẻ &amp; hạnh phúc lứa đôi." />
    <title>Hoàng Đế Nội Kinh — Bí Kíp Dưỡng Sinh</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    ${cssFile ? `<link rel="stylesheet" href="/client/assets/${cssFile}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    ${entryJs ? `<script type="module" src="/client/assets/${entryJs}"></script>` : ""}
  </body>
</html>`;

writeFileSync(join(distDir, "index.html"), html);
console.log("✓ dist/index.html generated for static deployment");

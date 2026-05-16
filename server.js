import { createServer } from "http";
import { readFile, stat } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "dist");
const PORT = process.env.PORT || 5000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

async function serveFile(filePath, res) {
  const ext = extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const content = await readFile(filePath);
  res.writeHead(200, { "Content-Type": contentType, "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000" });
  res.end(content);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost`);
    let pathname = decodeURIComponent(url.pathname);

    // Normalise trailing slash
    if (pathname !== "/" && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    // Try exact file match first
    let filePath = join(PUBLIC_DIR, pathname);
    try {
      const s = await stat(filePath);
      if (s.isFile()) {
        await serveFile(filePath, res);
        return;
      }
      if (s.isDirectory()) {
        filePath = join(filePath, "index.html");
        await serveFile(filePath, res);
        return;
      }
    } catch {
      // Fall through
    }

    // SPA fallback — serve dist/index.html for all unmatched routes
    await serveFile(join(PUBLIC_DIR, "index.html"), res);
  } catch (err) {
    console.error("Server error:", err.message);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

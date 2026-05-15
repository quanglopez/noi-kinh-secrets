import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/lib/seed-data";

const BASE_URL = "https://hoang-de-noi-kinh.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/thu-vien", priority: "0.9", changefreq: "daily" },
          { path: "/cua-hang", priority: "0.8", changefreq: "weekly" },
          { path: "/khoa-hoc", priority: "0.8", changefreq: "weekly" },
          { path: "/hoi-vien", priority: "0.8", changefreq: "monthly" },
          { path: "/gioi-thieu", priority: "0.6", changefreq: "monthly" },
          { path: "/luu-y-suc-khoe", priority: "0.4", changefreq: "yearly" },
          { path: "/tai-khoan", priority: "0.5", changefreq: "monthly" },
          { path: "/sach", priority: "0.8", changefreq: "weekly" },
          { path: "/sach/hoang-de-noi-kinh-chu-giai", priority: "0.9", changefreq: "weekly" },
          { path: "/sach/21-bi-kip-phong-the-co-truyen", priority: "0.9", changefreq: "weekly" },
          { path: "/sach/duoc-thien-bo-than", priority: "0.9", changefreq: "weekly" },
          { path: "/goi-y-thong-ke", priority: "0.3", changefreq: "monthly" },
          ...articles.map((a) => ({ path: `/bai-viet/${a.slug}`, priority: "0.7", changefreq: "monthly" as const })),
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});

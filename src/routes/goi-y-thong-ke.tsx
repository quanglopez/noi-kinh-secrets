import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/layout";
import { Trash2, RefreshCw, BarChart3 } from "lucide-react";
import {
  getRecoStats,
  clearRecoStats,
  type RecoStatRow,
} from "@/lib/reco-analytics";
import { articles } from "@/lib/seed-data";

export const Route = createFileRoute("/goi-y-thong-ke")({
  head: () => ({
    meta: [
      { title: "Thống kê gợi ý — Hoàng Đế Nội Kinh" },
      { name: "description", content: "Bảng theo dõi impression và click của các thẻ gợi ý nội bộ." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RecoStatsPage,
});

function RecoStatsPage() {
  const [rows, setRows] = useState<RecoStatRow[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setRows(getRecoStats());
  }, [tick]);

  const titleOf = (slug: string) =>
    articles.find((a) => a.slug === slug)?.title ?? slug;

  const totals = rows.reduce(
    (acc, r) => {
      acc.impressions += r.impressions;
      acc.clicks += r.clicks;
      return acc;
    },
    { impressions: 0, clicks: 0 },
  );
  const overallCtr = totals.impressions
    ? totals.clicks / totals.impressions
    : 0;

  const bySurface = (surface: RecoStatRow["surface"]) =>
    rows.filter((r) => r.surface === surface);

  return (
    <SiteLayout>
      <section className="py-16 px-6 border-b border-border bg-card/30">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Bảng nội bộ</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-3 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-gold" />
            Thống kê gợi ý
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Theo dõi hiệu quả các thẻ "Bạn có thể quan tâm" và "Bài viết cùng chủ đề" để tối ưu lại điểm số gợi ý. Dữ liệu được ghi cục bộ trên trình duyệt này.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Badge className="bg-imperial text-primary-foreground rounded-sm">
              {totals.impressions} impression
            </Badge>
            <Badge className="bg-jade text-primary-foreground rounded-sm">
              {totals.clicks} click
            </Badge>
            <Badge variant="outline" className="rounded-sm">
              CTR tổng: {(overallCtr * 100).toFixed(1)}%
            </Badge>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" className="rounded-sm" onClick={() => setTick((t) => t + 1)}>
                <RefreshCw className="h-4 w-4 mr-2" /> Làm mới
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm"
                onClick={() => {
                  if (confirm("Xoá toàn bộ dữ liệu thống kê gợi ý?")) {
                    clearRecoStats();
                    setTick((t) => t + 1);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Xoá dữ liệu
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          <SurfaceTable
            title="Thư viện · Bạn có thể quan tâm"
            rows={bySurface("library-suggested")}
            titleOf={titleOf}
          />
          <SurfaceTable
            title="Bài viết · Bài viết cùng chủ đề"
            rows={bySurface("article-related")}
            titleOf={titleOf}
          />
          {rows.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Chưa có dữ liệu. Hãy duyệt qua trang Thư viện hoặc một số bài viết để bắt đầu thu thập.
            </p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function SurfaceTable({
  title,
  rows,
  titleOf,
}: {
  title: string;
  rows: RecoStatRow[];
  titleOf: (slug: string) => string;
}) {
  if (rows.length === 0) return null;
  const sorted = [...rows].sort((a, b) => b.ctr - a.ctr || b.impressions - a.impressions);
  return (
    <div>
      <h2 className="font-serif text-2xl mb-4">{title}</h2>
      <div className="overflow-x-auto border border-border rounded-sm">
        <table className="w-full text-sm">
          <thead className="bg-card/60 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Bài viết</th>
              <th className="px-4 py-3 font-medium text-right">Impressions</th>
              <th className="px-4 py-3 font-medium text-right">Clicks</th>
              <th className="px-4 py-3 font-medium text-right">CTR</th>
              <th className="px-4 py-3 font-medium">Ngữ cảnh</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => {
              const topContexts = Object.entries(r.contexts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);
              return (
                <tr key={`${r.surface}-${r.slug}`} className="border-t border-border align-top">
                  <td className="px-4 py-3">
                    <p className="font-serif">{titleOf(r.slug)}</p>
                    <p className="text-xs text-muted-foreground">{r.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.impressions}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.clicks}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    <span className={r.ctr >= 0.1 ? "text-jade" : r.ctr === 0 ? "text-muted-foreground" : "text-foreground"}>
                      {(r.ctr * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {topContexts.length === 0
                      ? "—"
                      : topContexts.map(([ctx, n]) => (
                          <div key={ctx} className="truncate max-w-[280px]">
                            <span className="text-foreground/80">{n}×</span> {ctx}
                          </div>
                        ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
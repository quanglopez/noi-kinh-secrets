import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Lock, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/layout";
import { articles, categories, getSuggestedArticles } from "@/lib/seed-data";

export const Route = createFileRoute("/thu-vien")({
  head: () => ({
    meta: [
      { title: "Thư viện bài viết — Hoàng Đế Nội Kinh" },
      { name: "description", content: "Kho bài viết Đông y dưỡng sinh: dưỡng tinh, âm dương, khí công, dược thiện, kinh điển chú giải." },
      { property: "og:title", content: "Thư viện bài viết — Hoàng Đế Nội Kinh" },
      { property: "og:description", content: "Kho bài viết Đông y dưỡng sinh chọn lọc bằng tiếng Việt." },
    ],
    links: [{ rel: "canonical", href: "/thu-vien" }],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState<"new" | "popular">("new");

  const filtered = articles
    .filter((a) => (cat ? a.category === cat : true))
    .filter((a) => a.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) =>
      sort === "new"
        ? +new Date(b.publishedAt) - +new Date(a.publishedAt)
        : a.title.localeCompare(b.title),
    );

  const hasActiveFilter = q.trim().length > 0 || cat !== null;
  const suggested = useMemo(
    () =>
      hasActiveFilter
        ? getSuggestedArticles({
            query: q,
            category: cat,
            excludeSlugs: filtered.map((a) => a.slug),
            limit: 4,
          })
        : [],
    [q, cat, filtered, hasActiveFilter],
  );

  return (
    <SiteLayout>
      <section className="py-16 px-6 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Tàng kinh các</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-3">Thư viện bài viết</h1>
          <p className="text-muted-foreground max-w-2xl">Hơn 100 bài viết về Đông y dưỡng sinh, được phân loại theo chủ đề và trình bày tao nhã.</p>
          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm bài viết..." className="pl-9 rounded-sm" />
            </div>
            <div className="flex gap-2">
              <Button variant={sort === "new" ? "default" : "outline"} size="sm" onClick={() => setSort("new")} className="rounded-sm">Mới nhất</Button>
              <Button variant={sort === "popular" ? "default" : "outline"} size="sm" onClick={() => setSort("popular")} className="rounded-sm">Phổ biến</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setCat(null)} className={`px-4 py-1.5 text-sm border rounded-sm transition-colors ${cat === null ? "bg-imperial text-primary-foreground border-imperial" : "border-border hover:bg-muted"}`}>Tất cả</button>
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 text-sm border rounded-sm transition-colors ${cat === c ? "bg-imperial text-primary-foreground border-imperial" : "border-border hover:bg-muted"}`}>{c}</button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Không tìm thấy bài viết phù hợp với từ khoá.</p>
              {(q || cat) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 rounded-sm"
                  onClick={() => {
                    setQ("");
                    setCat(null);
                  }}
                >
                  Xoá bộ lọc
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <Link key={a.slug} to="/bai-viet/$slug" params={{ slug: a.slug }} className="group">
                  <article className="ink-card rounded-sm overflow-hidden h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={a.thumbnail} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <Badge className={`absolute top-3 right-3 rounded-sm ${a.isPremium ? "bg-imperial text-primary-foreground" : "bg-jade text-primary-foreground"}`}>
                        {a.isPremium ? <><Lock className="h-3 w-3 mr-1" />Hội viên</> : "Miễn phí"}
                      </Badge>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-gold mb-2">{a.category}</span>
                      <h2 className="font-serif text-xl mb-3 group-hover:text-imperial transition-colors">{a.title}</h2>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">{a.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{a.readingTime}</span>
                        <span>{new Date(a.publishedAt).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {suggested.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border">
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-serif text-3xl flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-gold" />
                  Bạn có thể quan tâm
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                {q.trim()
                  ? <>Gợi ý dựa trên từ khoá <em className="text-foreground">"{q.trim()}"</em>{cat ? <> và chuyên mục <em className="text-foreground">{cat}</em></> : null}.</>
                  : <>Gợi ý dựa trên chuyên mục <em className="text-foreground">{cat}</em>.</>}
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {suggested.map((a) => (
                  <Link key={a.slug} to="/bai-viet/$slug" params={{ slug: a.slug }} className="group">
                    <article className="ink-card rounded-sm overflow-hidden h-full flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={a.thumbnail} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gold mb-2">{a.category}</span>
                        <h3 className="font-serif text-base leading-snug group-hover:text-imperial transition-colors">{a.title}</h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{a.excerpt}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

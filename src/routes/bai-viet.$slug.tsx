import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, Share2, Printer, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/layout";
import { articles } from "@/lib/seed-data";

export const Route = createFileRoute("/bai-viet/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — Hoàng Đế Nội Kinh` },
          { name: "description", content: loaderData.article.excerpt },
          { property: "og:title", content: loaderData.article.title },
          { property: "og:description", content: loaderData.article.excerpt },
          { property: "og:image", content: loaderData.article.thumbnail },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-serif text-4xl mb-4">Không tìm thấy bài viết</h1>
        <Link to="/thu-vien" className="text-imperial hover:underline">Về thư viện</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="py-32 text-center">
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);

  return (
    <SiteLayout>
      <article className="relative">
        <div className="aspect-[21/9] md:aspect-[21/7] w-full overflow-hidden">
          <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
        </div>
        <div className="mx-auto max-w-7xl px-6 -mt-24 md:-mt-32 relative">
          <div className="bg-background border border-border rounded-sm p-8 md:p-12 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-gold text-ink rounded-sm">{article.category}</Badge>
              <span className="text-sm text-muted-foreground">{article.readingTime}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{new Date(article.publishedAt).toLocaleDateString("vi-VN")}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{article.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" size="sm" className="rounded-sm"><Bookmark className="h-4 w-4 mr-2" />Lưu bài</Button>
              <Button variant="outline" size="sm" className="rounded-sm"><Share2 className="h-4 w-4 mr-2" />Chia sẻ</Button>
              <Button variant="outline" size="sm" className="rounded-sm"><Printer className="h-4 w-4 mr-2" />In PDF</Button>
            </div>
          </div>
        </div>
      </article>

      <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_280px] gap-12">
        <div>
          {article.classicalQuote && (
            <aside className="mb-12 border-2 border-gold/40 bg-card p-8 relative">
              <span className="seal absolute -top-4 -right-4 text-sm">經</span>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Chương trích dẫn gốc</p>
              <p className="font-calligraphy text-3xl md:text-4xl leading-relaxed text-ink mb-4">{article.classicalQuote.han}</p>
              <p className="italic text-sm text-muted-foreground mb-3">{article.classicalQuote.pinyin}</p>
              <div className="scroll-divider my-4" />
              <p className="font-serif text-lg leading-relaxed">{article.classicalQuote.vietnamese}</p>
            </aside>
          )}
          <div className={article.isPremium ? "relative" : ""}>
            <div className={article.isPremium ? "paywall-fade" : ""}>
              {article.content.map((s, i) => (
                <section key={i} id={`section-${i}`} className="mb-10">
                  <h2 className="font-serif text-3xl mb-4">{s.heading}</h2>
                  <p className="font-serif text-lg leading-[1.85] text-foreground/90">{s.body}</p>
                </section>
              ))}
            </div>
            {article.isPremium && (
              <div className="mt-8 border-2 border-imperial bg-card p-8 text-center rounded-sm">
                <Lock className="h-8 w-8 text-imperial mx-auto mb-4" />
                <h3 className="font-serif text-2xl mb-2">Nội dung dành cho hội viên</h3>
                <p className="text-muted-foreground mb-6">Đăng ký gói Học giả hoặc Đại sư để đọc trọn vẹn bài viết và truy cập toàn bộ thư viện.</p>
                <Link to="/hoi-vien">
                  <Button className="bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm">Trở thành hội viên <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs uppercase tracking-[0.3em] text-imperial mb-4">Mục lục</p>
            <ul className="space-y-3 border-l border-border pl-4">
              {article.content.map((s, i) => (
                <li key={i}>
                  <a href={`#section-${i}`} className="text-sm text-muted-foreground hover:text-imperial transition-colors">{s.heading}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="py-16 px-6 bg-card/40">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl mb-8">Bài viết cùng chủ đề</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((a) => (
                <Link key={a.slug} to="/bai-viet/$slug" params={{ slug: a.slug }} className="group">
                  <article className="ink-card rounded-sm overflow-hidden">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.thumbnail} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs uppercase tracking-wider text-gold">{a.category}</span>
                      <h3 className="font-serif text-lg mt-2 group-hover:text-imperial transition-colors">{a.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

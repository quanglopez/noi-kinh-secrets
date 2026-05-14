import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Bookmark, Share2, Printer, Lock, ArrowRight, ArrowLeft, Link2, ChevronRight, Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/layout";
import { articles, getRelatedArticles, distributeContextualLinks, getAdjacentArticles, type Article } from "@/lib/seed-data";

export const Route = createFileRoute("/bai-viet/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [], links: [] };
    const url = `https://hoang-de-noi-kinh.lovable.app/bai-viet/${params.slug}`;
    const image = loaderData.article.thumbnail?.startsWith("http")
      ? loaderData.article.thumbnail
      : `https://hoang-de-noi-kinh.lovable.app${loaderData.article.thumbnail}`;
    const title = `${loaderData.article.title} — Hoàng Đế Nội Kinh`;
    const description = loaderData.article.excerpt;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "Hoàng Đế Nội Kinh" },
        { property: "article:published_time", content: loaderData.article.publishedAt },
        { property: "article:section", content: loaderData.article.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: "https://hoang-de-noi-kinh.lovable.app/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Thư viện",
                item: "https://hoang-de-noi-kinh.lovable.app/thu-vien",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: loaderData.article.category,
                item: `https://hoang-de-noi-kinh.lovable.app/thu-vien?cat=${encodeURIComponent(loaderData.article.category)}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: loaderData.article.title,
                item: url,
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.article.title,
            description,
            image,
            datePublished: loaderData.article.publishedAt,
            articleSection: loaderData.article.category,
            mainEntityOfPage: url,
            publisher: {
              "@type": "Organization",
              name: "Hoàng Đế Nội Kinh",
            },
          }),
        },
      ],
    };
  },
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
  void articles;
  const related = getRelatedArticles(article, 4);
  const { prev, next } = getAdjacentArticles(article);
  const contextualLinksBySection = distributeContextualLinks(article, article.content, {
    perSection: 2,
    excludeSlugs: related.map((a) => a.slug),
  });
  const [activeId, setActiveId] = useState<string>("section-0");
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const [swipeHint, setSwipeHint] = useState<null | "edge-prev" | "edge-next">(null);

  useEffect(() => {
    const ids: string[] = article.content.map((_s: { heading: string; body: string }, i: number) => `section-${i}`);
    const els = ids
      .map((id: string) => document.getElementById(id))
      .filter((el: HTMLElement | null): el is HTMLElement => !!el);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: [0, 1] }
    );
    els.forEach((el: HTMLElement) => observer.observe(el));
    return () => observer.disconnect();
  }, [article.slug, article.content]);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  // Swipe navigation (mobile/tablet) — left = next, right = prev
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const dt = Date.now() - start.t;
    if (dt > 600) return;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) {
      // swipe left -> next
      if (next) navigate({ to: "/bai-viet/$slug", params: { slug: next.slug } });
      else triggerEdge("edge-next");
    } else {
      // swipe right -> prev
      if (prev) navigate({ to: "/bai-viet/$slug", params: { slug: prev.slug } });
      else triggerEdge("edge-prev");
    }
  };
  const triggerEdge = (kind: "edge-prev" | "edge-next") => {
    setSwipeHint(kind);
    window.setTimeout(() => setSwipeHint(null), 1400);
  };

  return (
    <SiteLayout>
      <article
        ref={containerRef}
        className="relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="aspect-[21/9] md:aspect-[21/7] w-full overflow-hidden">
          <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
        </div>
        <div className="mx-auto max-w-7xl px-6 -mt-24 md:-mt-32 relative">
          <div className="bg-background border border-border rounded-sm p-8 md:p-12 max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <li>
                  <Link to="/" className="flex items-center gap-1 hover:text-imperial transition-colors">
                    <Home className="h-3 w-3" />
                    <span className="sr-only sm:not-sr-only">Trang chủ</span>
                  </Link>
                </li>
                <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
                <li>
                  <Link to="/thu-vien" className="hover:text-imperial transition-colors">Thư viện</Link>
                </li>
                <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
                <li>
                  <span className="text-gold uppercase tracking-wider">{article.category}</span>
                </li>
                <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
                <li className="text-foreground/80 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {article.title}
                </li>
              </ol>
            </nav>
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
              {article.content.map((s: { heading: string; body: string }, i: number) => (
                <section key={i} id={`section-${i}`} className="mb-10 scroll-mt-24">
                  <h2 className="font-serif text-3xl mb-4">{s.heading}</h2>
                  <p className="font-serif text-lg leading-[1.85] text-foreground/90">{s.body}</p>
                  <ContextualLinks links={contextualLinksBySection[i]} />
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
              {article.content.map((s: { heading: string; body: string }, i: number) => {
                const id = `section-${i}`;
                const isActive = activeId === id;
                return (
                  <li key={i} className="relative">
                    {isActive && (
                      <span className="absolute -left-[17px] top-0 bottom-0 w-0.5 bg-imperial" />
                    )}
                    <a
                      href={`#${id}`}
                      onClick={(e) => handleTocClick(e, id)}
                      className={`block text-sm transition-colors ${
                        isActive ? "text-imperial font-medium" : "text-muted-foreground hover:text-imperial"
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="py-16 px-6 bg-card/40">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl mb-2">Bài viết cùng chủ đề</h2>
            <p className="text-sm text-muted-foreground mb-8">Gợi ý dựa trên chuyên mục và từ khoá tương đồng.</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {related.map((a) => (
                <Link key={a.slug} to="/bai-viet/$slug" params={{ slug: a.slug }} className="group">
                  <article className="ink-card rounded-sm overflow-hidden">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.thumbnail} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs uppercase tracking-wider text-gold">{a.category}</span>
                      <h3 className="font-serif text-lg mt-2 group-hover:text-imperial transition-colors">{a.title}</h3>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{a.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {(prev || next) && (
        <nav
          aria-label="Điều hướng bài viết"
          className="border-t border-border"
        >
          <div className="mx-auto max-w-7xl px-6 py-12 grid gap-4 md:grid-cols-2">
            {prev ? (
              <Link
                to="/bai-viet/$slug"
                params={{ slug: prev.slug }}
                rel="prev"
                className="ink-card rounded-sm p-6 group flex items-start gap-4"
              >
                <ArrowLeft className="h-5 w-5 mt-1 text-imperial shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Bài trước</p>
                  <p className="font-serif text-lg leading-snug group-hover:text-imperial transition-colors">{prev.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{prev.category} · {prev.readingTime}</p>
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
            {next ? (
              <Link
                to="/bai-viet/$slug"
                params={{ slug: next.slug }}
                rel="next"
                className="ink-card rounded-sm p-6 group flex items-start gap-4 md:text-right md:flex-row-reverse"
              >
                <ArrowRight className="h-5 w-5 mt-1 text-imperial shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Bài tiếp theo</p>
                  <p className="font-serif text-lg leading-snug group-hover:text-imperial transition-colors">{next.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{next.category} · {next.readingTime}</p>
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </nav>
      )}
    </SiteLayout>
  );
}

function ContextualLinks({ links }: { links: Article[] }) {
  if (!links || links.length === 0) return null;
  return (
    <aside className="mt-6 border-l-2 border-gold/60 bg-card/40 px-4 py-3 rounded-sm not-prose">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2 flex items-center gap-2">
        <Link2 className="h-3 w-3" /> Đọc thêm
      </p>
      <ul className="space-y-1.5">
        {links.map((a) => (
          <li key={a.slug}>
            <Link
              to="/bai-viet/$slug"
              params={{ slug: a.slug }}
              className="text-sm text-foreground/90 hover:text-imperial underline underline-offset-4 decoration-gold/40 hover:decoration-imperial transition-colors"
              title={a.excerpt}
            >
              {a.title}
            </Link>
            <span className="text-xs text-muted-foreground"> · {a.category}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

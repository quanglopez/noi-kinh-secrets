import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Bookmark, Share2, Printer, Lock, ArrowRight, ArrowLeft, Link2, ChevronRight, Home, BookOpen, X, ArrowUpLeft, ListOrdered, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/layout";
import { articles, getRelatedArticles, distributeContextualLinks, getAdjacentArticles, type Article } from "@/lib/seed-data";
import { useRecoImpression, trackRecoClick } from "@/lib/reco-analytics";

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
  const [readProgress, setReadProgress] = useState(0);
  const [resumeOffset, setResumeOffset] = useState<number | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [backToLibrary, setBackToLibrary] = useState<{
    q?: string;
    cat?: string;
    sort?: "popular";
    label: string;
  }>({ label: article.category, cat: article.category });

  // Restore the user's last library filter state (set by /thu-vien) so the
  // back button takes them to the exact same listing they came from.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem("library:lastView");
      if (!raw) {
        setBackToLibrary({ label: article.category, cat: article.category });
        return;
      }
      const saved = JSON.parse(raw) as {
        q?: string;
        cat?: string | null;
        sort?: "new" | "popular";
      };
      const q = saved.q?.trim() || undefined;
      const cat = saved.cat || undefined;
      const sort = saved.sort === "popular" ? "popular" : undefined;
      const labelParts: string[] = [];
      if (cat) labelParts.push(cat);
      if (q) labelParts.push(`"${q}"`);
      const label = labelParts.length ? labelParts.join(" · ") : "Tất cả bài viết";
      setBackToLibrary({ q, cat, sort, label });
    } catch {
      setBackToLibrary({ label: article.category, cat: article.category });
    }
  }, [article.slug, article.category]);

  const backSearch: { q?: string; cat?: string; sort?: "popular" } = {};
  if (backToLibrary.q) backSearch.q = backToLibrary.q;
  if (backToLibrary.cat) backSearch.cat = backToLibrary.cat;
  if (backToLibrary.sort) backSearch.sort = backToLibrary.sort;

  // Track scroll progress within the article and persist last position per slug
  useEffect(() => {
    const storageKey = `article:progress:${article.slug}`;
    let raf = 0;
    let lastSaved = 0;
    const compute = () => {
      raf = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const ratio = total > 0 ? Math.min(1, Math.max(0, y / total)) : 0;
      setReadProgress(ratio);
      const now = Date.now();
      if (ratio > 0.05 && ratio < 0.95 && now - lastSaved > 600) {
        lastSaved = now;
        try {
          localStorage.setItem(storageKey, JSON.stringify({ y, ratio, ts: now }));
        } catch { /* ignore */ }
      } else if (ratio >= 0.95) {
        try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [article.slug]);

  // On article change, check for a saved resume position
  useEffect(() => {
    setResumeOffset(null);
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(`article:progress:${article.slug}`);
      if (!raw) return;
      const saved = JSON.parse(raw) as { y: number; ratio: number; ts: number };
      // Only offer resume if user hadn't just landed at the top recently and value is meaningful
      if (saved && saved.y > 400 && saved.ratio < 0.9 && window.scrollY < 200) {
        setResumeOffset(saved.y);
      }
    } catch { /* ignore */ }
  }, [article.slug]);

  const handleResume = () => {
    if (resumeOffset == null) return;
    window.scrollTo({ top: resumeOffset, behavior: "smooth" });
    setResumeOffset(null);
  };

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
    setTocOpen(false);
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
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative touch-pan-y"
      >
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none"
        role="progressbar"
        aria-label="Tiến trình đọc bài"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readProgress * 100)}
      >
        <div
          className="h-full bg-gradient-to-r from-imperial via-gold to-imperial transition-[width] duration-150 ease-out"
          style={{ width: `${readProgress * 100}%` }}
        />
      </div>
      <article className="relative">
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
            <Link
              to="/thu-vien"
              search={backSearch}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-imperial hover:text-gold transition-colors mb-6 group"
            >
              <ArrowUpLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Quay lại thư viện</span>
              <span className="normal-case tracking-normal text-muted-foreground">· {backToLibrary.label}</span>
            </Link>
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
                <RelatedCard key={a.slug} item={a} fromSlug={article.slug} />
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
      {swipeHint && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="rounded-full border border-border bg-background/95 backdrop-blur px-5 py-2.5 text-sm text-foreground shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            {swipeHint === "edge-prev" ? (
              <>
                <ArrowLeft className="h-4 w-4 text-imperial" />
                Đây là bài viết đầu tiên
              </>
            ) : (
              <>
                Đây là bài viết mới nhất
                <ArrowRight className="h-4 w-4 text-imperial" />
              </>
            )}
          </div>
        </div>
      )}
      {resumeOffset != null && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/60 bg-background/95 backdrop-blur px-2 py-2 pl-4 text-sm shadow-lg animate-in fade-in slide-in-from-bottom-4">
            <BookOpen className="h-4 w-4 text-imperial shrink-0" />
            <span className="hidden sm:inline text-foreground/90">Bạn đã đọc tới khoảng {Math.round((resumeOffset / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100)}%</span>
            <span className="sm:hidden text-foreground/90">Tiếp tục đọc?</span>
            <Button
              size="sm"
              onClick={handleResume}
              className="rounded-full bg-imperial hover:bg-imperial/90 text-primary-foreground h-8"
            >
              Tiếp tục từ đoạn cuối
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
            <button
              type="button"
              onClick={() => setResumeOffset(null)}
              aria-label="Đóng gợi ý tiếp tục đọc"
              className="h-8 w-8 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <ReadingProgressChip
        progress={readProgress}
        sections={article.content.map((s, i) => ({ id: `section-${i}`, heading: s.heading }))}
        activeId={activeId}
        open={tocOpen}
        onToggle={() => setTocOpen((v) => !v)}
        onClose={() => setTocOpen(false)}
        onJump={handleTocClick}
      />
      </div>
      <p className="sr-only" aria-live="polite">
        Mẹo: vuốt sang trái để chuyển bài tiếp theo, vuốt sang phải để quay lại bài trước.
      </p>
    </SiteLayout>
  );
}

function ReadingProgressChip({
  progress,
  sections,
  activeId,
  open,
  onToggle,
  onClose,
  onJump,
}: {
  progress: number;
  sections: { id: string; heading: string }[];
  activeId: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onJump: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const pct = Math.round(progress * 100);
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === activeId));
  const activeSection = sections[activeIndex];
  // Hide chip until the user has actually started reading and there's TOC content
  if (sections.length === 0 || progress < 0.03) return null;
  return (
    <div className="fixed bottom-6 left-6 z-40 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Mục lục bài viết"
          className="mb-3 w-72 sm:w-80 max-h-[60vh] overflow-y-auto rounded-md border border-border bg-background/98 backdrop-blur shadow-2xl animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-background/98 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.3em] text-imperial flex items-center gap-2">
              <ListOrdered className="h-3.5 w-3.5" /> Mục lục
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng mục lục"
              className="h-7 w-7 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ol className="px-2 py-2 space-y-0.5">
            {sections.map((s, i) => {
              const isActive = s.id === activeId;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => onJump(e, s.id)}
                    className={`flex items-start gap-3 rounded-sm px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-imperial/10 text-imperial font-medium"
                        : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] tabular-nums ${
                        isActive
                          ? "bg-imperial text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-snug">{s.heading}</span>
                  </a>
                </li>
              );
            })}
          </ol>
          <div className="border-t border-border px-2 py-2">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                onClose();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-sm px-3 py-2 text-xs uppercase tracking-[0.25em] text-imperial hover:bg-muted/60 transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" /> Lên đầu trang
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`Đã đọc ${pct}% — mở mục lục`}
        className="group flex items-center gap-3 rounded-full border border-gold/50 bg-background/95 backdrop-blur pl-2 pr-4 py-1.5 shadow-lg hover:border-imperial transition-colors"
      >
        <span
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(hsl(var(--imperial, 0 0% 0%) / 1) ${pct}%, hsl(var(--muted, 0 0% 90%) / 0.6) ${pct}%)`,
          }}
        >
          <span className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
            <span className="text-[10px] font-medium tabular-nums text-imperial">
              {pct}%
            </span>
          </span>
        </span>
        <span className="hidden sm:flex flex-col items-start min-w-0 max-w-[180px]">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Đoạn {activeIndex + 1}/{sections.length}
          </span>
          <span className="text-xs font-medium text-foreground truncate w-full text-left group-hover:text-imperial transition-colors">
            {activeSection?.heading ?? ""}
          </span>
        </span>
        <ListOrdered className="h-4 w-4 text-imperial sm:hidden" />
      </button>
    </div>
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

function RelatedCard({ item, fromSlug }: { item: Article; fromSlug: string }) {
  const ref = useRecoImpression<HTMLAnchorElement>(
    "article-related",
    item.slug,
    `from=${fromSlug}`,
  );
  return (
    <Link
      ref={ref}
      to="/bai-viet/$slug"
      params={{ slug: item.slug }}
      onClick={() => trackRecoClick("article-related", item.slug, `from=${fromSlug}`)}
      className="group"
      data-reco-surface="article-related"
      data-reco-slug={item.slug}
    >
      <article className="ink-card rounded-sm overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="p-5">
          <span className="text-xs uppercase tracking-wider text-gold">{item.category}</span>
          <h3 className="font-serif text-lg mt-2 group-hover:text-imperial transition-colors">{item.title}</h3>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}

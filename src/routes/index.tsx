import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles, HeartHandshake, Wind, Leaf, Lock, Check, Quote, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SiteLayout } from "@/components/site/layout";
import { articles, formatVND } from "@/lib/seed-data";
import heroImg from "@/assets/hero-inkwash.jpg";
import testimonialLan from "@/assets/testimonial-lan.jpg";
import testimonialTuan from "@/assets/testimonial-tuan.jpg";
import testimonialHoa from "@/assets/testimonial-hoa.jpg";
import { Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hoàng Đế Nội Kinh — Bí Kíp Dưỡng Sinh Cổ Truyền" },
      { name: "description", content: "Trí tuệ ngàn năm về sức khoẻ, sinh lực và hạnh phúc lứa đôi từ Hoàng Đế Nội Kinh, Tố Nữ Kinh và Phòng Trung Thuật." },
      { property: "og:title", content: "Hoàng Đế Nội Kinh — Bí Kíp Dưỡng Sinh" },
      { property: "og:description", content: "Trí tuệ ngàn năm về sức khoẻ và hạnh phúc lứa đôi." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hoang-de-noi-kinh.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Hoàng Đế Nội Kinh — Bí Kíp Dưỡng Sinh",
          url: "https://hoang-de-noi-kinh.lovable.app/",
          inLanguage: "vi-VN",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://hoang-de-noi-kinh.lovable.app/thu-vien?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Hoàng Đế Nội Kinh",
          url: "https://hoang-de-noi-kinh.lovable.app/",
          logo: "https://hoang-de-noi-kinh.lovable.app/og-image.png",
          description: "Dự án phổ biến tri thức Đông y dưỡng sinh cổ truyền bằng tiếng Việt hiện đại.",
        }),
      },
    ],
  }),
  component: HomePage,
});

const benefits = [
  { icon: Sparkles, title: "Cân bằng Âm Dương", body: "Hiểu nguyên lý nền tảng của vũ trụ và cơ thể, áp dụng vào lối sống hàng ngày." },
  { icon: Leaf, title: "Dưỡng tinh — bồi bổ thận khí", body: "Phương pháp ăn uống, sinh hoạt giúp giữ gìn và bồi bổ tinh khí — gốc của sinh lực." },
  { icon: Wind, title: "Kéo dài sinh lực", body: "Bí quyết của các bậc cao niên Đông phương để giữ thanh xuân đến tuổi xế chiều." },
  { icon: HeartHandshake, title: "Hài hoà vợ chồng", body: "Nghệ thuật giao tiếp, tôn trọng và đồng điệu năng lượng giữa hai người bạn đời." },
  { icon: Wind, title: "Khí công phòng the", body: "Bài tập điều tức cổ truyền giúp lưu thông khí huyết, tăng cường sinh lực tự nhiên." },
  { icon: Leaf, title: "Dược thiện bổ thận", body: "Công thức món ăn — bài thuốc dễ thực hiện tại nhà với dược liệu Việt Nam." },
];

const tiers = [
  { name: "Miễn phí", price: 0, tag: "Khởi đầu", features: ["Truy cập 30+ bài viết cơ bản", "Newsletter hàng tuần", "Cộng đồng diễn đàn"], cta: "Bắt đầu" },
  { name: "Học giả", price: 199000, tag: "Phổ biến", popular: true, features: ["Toàn bộ thư viện bài viết", "Tải eBook chọn lọc", "Khoá học cơ bản", "Hỏi đáp chuyên gia hàng tháng"], cta: "Trở thành Học giả" },
  { name: "Đại sư", price: 399000, tag: "Trọn vẹn", features: ["Mọi quyền lợi Học giả", "Toàn bộ khoá học cao cấp", "Tư vấn 1:1 với lương y", "Quà tặng eBook hàng quý", "Sự kiện offline độc quyền"], cta: "Đăng ký Đại sư" },
];

const testimonials = [
  {
    name: "Nguyễn Thị Lan, 42 tuổi, Hà Nội",
    avatar: testimonialLan,
    rating: 5,
    quote:
      "Sau ba tháng kiên trì theo dược thiện, chứng mất ngủ và đau lưng âm ỉ của tôi đã giảm rõ rệt. Sách viết rành mạch, dễ áp dụng cho người nội trợ.",
    product: "Dược Thiện Bổ Thận — 49 Món Ăn Dưỡng Sinh",
  },
  {
    name: "Trần Văn Tuấn, 48 tuổi, TP.HCM",
    avatar: testimonialTuan,
    rating: 5,
    quote:
      "Khí công phòng the giúp vợ chồng tôi gần gũi và hiểu nhau hơn. Sinh lực hồi phục, tinh thần thư thái — điều mà thuốc bổ trước đây chưa từng mang lại.",
    product: "21 Bí Kíp Phòng The Cổ Truyền",
  },
  {
    name: "Lê Thị Hoa, 55 tuổi, Huế",
    avatar: testimonialHoa,
    rating: 5,
    quote:
      "Bản chú giải Hoàng Đế Nội Kinh giúp tôi hiểu cơ thể mình theo cách hoàn toàn mới. Mỗi chương là một bài học sống — không phải lý thuyết suông.",
    product: "Hoàng Đế Nội Kinh chú giải",
  },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute top-1/4 right-8 md:right-16 hidden md:block">
          <div className="vertical-text font-calligraphy text-7xl lg:text-9xl text-ink/80 leading-none">
            黃帝內經
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
          <div className="max-w-3xl fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-imperial" />
              <span className="text-xs uppercase tracking-[0.4em] text-imperial font-medium">Kinh điển · 4000 năm</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              Trí tuệ ngàn năm<br />
              <span className="italic text-imperial">về sức khoẻ</span> &<br />
              hạnh phúc lứa đôi
            </h1>
            <p className="text-lg md:text-xl text-foreground/75 max-w-xl mb-10 leading-relaxed">
              Hoàng Đế Nội Kinh, Tố Nữ Kinh, Phòng Trung Thuật — ba kinh điển dưỡng sinh được dịch và chú giải tao nhã,
              dành cho người tìm về cội nguồn của sinh lực và hạnh phúc bền lâu.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/thu-vien">
                <Button size="lg" className="bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm px-8">
                  Khám phá ngay <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/hoi-vien">
                <Button size="lg" variant="outline" className="rounded-sm px-8 border-ink/40 hover:bg-ink/5">
                  Đăng ký miễn phí
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <a
          href="#stats"
          aria-label="Cuộn xuống để khám phá"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-imperial/80 hover:text-imperial transition-colors animate-bounce"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Cuộn xuống để khám phá</span>
          <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
        </a>
      </section>

      {/* QUICK STATS BAR */}
      <section id="stats" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm md:text-base">
          {[
            { value: "100+", label: "bài viết" },
            { value: "3", label: "chuyên gia" },
            { value: "500+", label: "học viên" },
            { value: "4.000 năm", label: "trí tuệ" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-8">
              {i > 0 && <span className="text-gold/60 select-none" aria-hidden>·</span>}
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-xl md:text-2xl text-imperial">{s.value}</span>
                <span className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO ADS */}
      <section className="py-16 px-6 border-b border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-3">Xem trước</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-3">
              Bí mật <em className="text-imperial">Nội Kinh</em> trong 60 giây
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hé lộ ba kinh điển dưỡng sinh đã được giữ kín hàng ngàn năm — và lý do chúng vẫn
              thay đổi cuộc đời người đọc hôm nay.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-sm border border-border bg-ink shadow-2xl aspect-video">
            <iframe
              src="https://noi-kinh-secrets.replit.app/video-ads"
              title="Video giới thiệu sách Hoàng Đế Nội Kinh"
              loading="lazy"
              allow="autoplay; fullscreen"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <div className="mt-8 text-center">
            <Link to="/sach">
              <Button
                size="lg"
                className="bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm px-8"
              >
                Khám phá toàn bộ sách <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Bị video hấp dẫn? Xem ngay danh mục eBook đầy đủ →
            </p>
          </div>
        </div>
      </section>

      {/* TINH HOA 4000 NĂM */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Tam đại kinh điển</p>
            <h2 className="font-serif text-4xl md:text-6xl mb-4">Tinh hoa <em className="text-imperial">4000 năm</em></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Ba bộ kinh điển nền tảng được học giả Đông phương lưu truyền và chú giải qua nhiều thế hệ.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { han: "黃帝內經", name: "Hoàng Đế Nội Kinh", desc: "Bộ kinh y học cổ nhất Trung Hoa, gồm Tố Vấn và Linh Khu — nền tảng của toàn bộ Đông y." },
              { han: "素女經", name: "Tố Nữ Kinh", desc: "Đối thoại giữa Hoàng Đế và Tố Nữ về nghệ thuật dưỡng sinh và hài hoà nam nữ." },
              { han: "房中術", name: "Phòng Trung Thuật", desc: "Nghệ thuật giữ gìn sức khoẻ và sinh lực thông qua điều tiết đời sống lứa đôi." },
            ].map((c, i) => (
              <article key={c.name} className="ink-card rounded-sm p-8 fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="font-calligraphy text-6xl text-imperial mb-6 leading-none">{c.han}</div>
                <h3 className="font-serif text-2xl mb-3">{c.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="scroll-divider mx-auto max-w-3xl my-8" />

      {/* BENEFITS */}
      <section className="py-24 px-6 bg-card/40">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Lợi ích</p>
            <h2 className="font-serif text-4xl md:text-6xl">Bạn sẽ học được gì</h2>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-3 border border-border">
            {benefits.map((b) => (
              <div key={b.title} className="bg-background p-8 hover:bg-card transition-colors">
                <b.icon className="h-7 w-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-xl mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Mới nhất</p>
              <h2 className="font-serif text-4xl md:text-5xl">Nội dung nổi bật</h2>
            </div>
            <Link to="/thu-vien" className="text-sm text-imperial hover:underline flex items-center gap-1">
              Xem toàn bộ thư viện <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((a) => (
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
                    <h3 className="font-serif text-xl mb-3 group-hover:text-imperial transition-colors">{a.title}</h3>
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
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 bg-card/40">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Gia nhập</p>
            <h2 className="font-serif text-4xl md:text-6xl mb-4">Gói thành viên</h2>
            <p className="text-muted-foreground">Chọn con đường phù hợp với hành trình tu dưỡng của bạn.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-sm p-8 border-2 transition-all ${
                  t.popular
                    ? "border-imperial bg-background shadow-2xl scale-105"
                    : "border-border bg-background hover:border-gold"
                }`}
              >
                {t.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-imperial text-primary-foreground text-xs px-3 py-1 uppercase tracking-wider">
                    Phổ biến
                  </div>
                )}
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">{t.tag}</p>
                <h3 className="font-serif text-3xl mb-2">{t.name}</h3>
                <div className="mb-6">
                  <span className="font-serif text-4xl">{t.price === 0 ? "Miễn phí" : formatVND(t.price)}</span>
                  {t.price > 0 && <span className="text-sm text-muted-foreground">/tháng</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm">
                      <Check className="h-4 w-4 text-jade shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/hoi-vien">
                  <Button className={`w-full rounded-sm ${t.popular ? "bg-imperial hover:bg-imperial/90 text-primary-foreground" : ""}`} variant={t.popular ? "default" : "outline"}>
                    {t.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED HORIZONTAL ARTICLES */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Đọc tiếp</p>
              <h2 className="font-serif text-4xl md:text-5xl">Bài viết nổi bật</h2>
            </div>
            <Link to="/thu-vien" className="text-sm text-imperial hover:underline flex items-center gap-1">
              Xem toàn bộ thư viện <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-6">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                to="/bai-viet/$slug"
                params={{ slug: a.slug }}
                className="group ink-card rounded-sm overflow-hidden grid sm:grid-cols-[240px_1fr] items-stretch hover:bg-card/60 transition-colors"
              >
                <div className="aspect-[16/10] sm:aspect-auto overflow-hidden">
                  <img
                    src={a.thumbnail}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{a.category}</span>
                    <span className="text-muted-foreground/50 text-xs">·</span>
                    <span className="text-xs text-muted-foreground">{a.readingTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl mb-3 group-hover:text-imperial transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/thu-vien">
              <Button variant="outline" className="rounded-sm px-8">
                Xem toàn bộ thư viện <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Cảm nhận</p>
            <h2 className="font-serif text-4xl md:text-5xl">Học viên nói gì về chúng tôi</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="ink-card rounded-sm p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-gold/60 shrink-0">
                    <img
                      src={t.avatar}
                      alt={`Ảnh ${t.name}`}
                      width={112}
                      height={112}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{t.name}</div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < t.rating ? "fill-gold text-gold" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="h-6 w-6 text-imperial mb-3" strokeWidth={1} />
                <blockquote className="font-serif text-base italic leading-relaxed mb-6 flex-1">
                  “{t.quote}”
                </blockquote>
                <figcaption className="border-t border-border pt-4 text-xs uppercase tracking-wider text-gold">
                  Đã mua: {t.product}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 px-6 bg-ink text-parchment relative overflow-hidden">
        <div className="absolute right-8 top-8 font-calligraphy text-9xl text-parchment/5 select-none">道</div>
        <div className="mx-auto max-w-3xl text-center relative">
          <BookOpen className="h-10 w-10 text-gold mx-auto mb-6" strokeWidth={1.2} />
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Nhận một chương sách <em className="text-gold">miễn phí</em></h2>
          <p className="text-parchment/70 mb-8">
            Đăng ký nhận thư hàng tuần và được tặng chương đầu của <em>"Hoàng Đế Nội Kinh chú giải"</em> dưới dạng PDF.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="Email của bạn" className="bg-parchment/10 border-parchment/20 text-parchment placeholder:text-parchment/50 rounded-sm" />
            <Button type="submit" className="bg-gold text-ink hover:bg-gold/90 rounded-sm">Nhận sách</Button>
          </form>
          <p className="text-xs text-parchment/40 mt-4">Chúng tôi tôn trọng quyền riêng tư của bạn. Có thể huỷ bất cứ lúc nào.</p>
        </div>
      </section>
    </SiteLayout>
  );
}

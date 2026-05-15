import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/layout";
import { products, formatVND } from "@/lib/seed-data";

const SALES_PAGES: Record<string, string> = {
  "ebook-noi-kinh": "/sach/hoang-de-noi-kinh-chu-giai",
  "ebook-21-bi-kip": "/sach/21-bi-kip-phong-the-co-truyen",
  "ebook-duoc-thien": "/sach/duoc-thien-bo-than",
};

export const Route = createFileRoute("/sach/")({
  head: () => ({
    meta: [
      { title: "Danh mục Sách — Hoàng Đế Nội Kinh" },
      {
        name: "description",
        content:
          "Danh mục eBook Đông y dưỡng sinh: Hoàng Đế Nội Kinh chú giải, Khí công phòng the, Dược thiện bổ thận và nhiều tựa sách khác.",
      },
      { property: "og:title", content: "Danh mục Sách — Hoàng Đế Nội Kinh" },
      {
        property: "og:description",
        content: "Tuyển tập eBook PDF Đông y cao cấp bằng tiếng Việt.",
      },
      { property: "og:url", content: "https://hoang-de-noi-kinh.lovable.app/sach" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/sach" }],
  }),
  component: SachIndexPage,
});

function SachIndexPage() {
  return (
    <SiteLayout>
      <section className="py-16 px-6 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
            Tàng thư · Danh mục sách
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mb-3">Sách Đông y dưỡng sinh</h1>
          <p className="text-muted-foreground max-w-2xl">
            Bộ sưu tập eBook PDF được biên dịch và chú giải bởi đội ngũ học giả Việt Nam — từ
            kinh điển ngàn năm đến cẩm nang ứng dụng hằng ngày.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const sales = SALES_PAGES[p.id];
            return (
              <article key={p.id} className="group">
                <div className="aspect-[3/4] bg-ink/95 rounded-sm overflow-hidden mb-6 flex items-center justify-center p-8 relative">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain shadow-2xl group-hover:scale-105 transition-transform duration-500 rotate-[-4deg] group-hover:rotate-0"
                  />
                  {sales && (
                    <Badge className="absolute top-3 right-3 bg-gold text-ink hover:bg-gold rounded-sm">
                      Bán chạy
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < Math.floor(p.rating) ? "fill-gold text-gold" : "text-muted"}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {p.rating} ({p.reviews})
                  </span>
                </div>
                <h2 className="font-serif text-2xl mb-3">{p.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {p.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl text-imperial">{formatVND(p.price)}</span>
                </div>
                <div className="flex gap-2">
                  {sales ? (
                    <>
                      <Link to={sales} className="flex-1">
                        <Button className="w-full bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm">
                          <ShoppingCart className="h-4 w-4 mr-2" /> Mua ngay
                        </Button>
                      </Link>
                      <Link to={sales}>
                        <Button variant="outline" className="rounded-sm">
                          <Eye className="h-4 w-4 mr-2" /> Xem trước
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full rounded-sm"
                      disabled
                    >
                      Sắp ra mắt
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
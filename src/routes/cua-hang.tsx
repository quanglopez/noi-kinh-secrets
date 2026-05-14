import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/layout";
import { products, formatVND } from "@/lib/seed-data";

export const Route = createFileRoute("/cua-hang")({
  head: () => ({
    meta: [
      { title: "Cửa hàng eBook — Hoàng Đế Nội Kinh" },
      { name: "description", content: "Cửa hàng eBook Đông y dưỡng sinh: Hoàng Đế Nội Kinh chú giải, Khí công phòng the, Dược thiện bổ thận." },
      { property: "og:title", content: "Cửa hàng eBook — Hoàng Đế Nội Kinh" },
      { property: "og:description", content: "eBook PDF Đông y cao cấp bằng tiếng Việt." },
    ],
    links: [{ rel: "canonical", href: "/cua-hang" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SiteLayout>
      <section className="py-16 px-6 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Tàng thư</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-3">Cửa hàng eBook</h1>
          <p className="text-muted-foreground max-w-2xl">Bộ sưu tập eBook PDF cao cấp về Đông y dưỡng sinh, được biên dịch và chú giải bởi đội ngũ học giả Việt Nam.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.id} className="group">
              <div className="aspect-[3/4] bg-ink/95 rounded-sm overflow-hidden mb-6 flex items-center justify-center p-8 relative">
                <img src={p.cover} alt={p.title} loading="lazy" className="max-h-full max-w-full object-contain shadow-2xl group-hover:scale-105 transition-transform duration-500 rotate-[-4deg] group-hover:rotate-0" />
              </div>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(p.rating) ? "fill-gold text-gold" : "text-muted"}`} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{p.rating} ({p.reviews})</span>
              </div>
              <h2 className="font-serif text-2xl mb-3">{p.title}</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-2xl text-imperial">{formatVND(p.price)}</span>
              </div>
              <div className="flex gap-2">
                {p.id === "ebook-noi-kinh" ? (
                  <>
                    <Link to="/sach/hoang-de-noi-kinh-chu-giai" className="flex-1">
                      <Button className="w-full bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm">
                        <ShoppingCart className="h-4 w-4 mr-2" /> Mua ngay
                      </Button>
                    </Link>
                    <Link to="/sach/hoang-de-noi-kinh-chu-giai">
                      <Button variant="outline" className="rounded-sm">
                        <Eye className="h-4 w-4 mr-2" /> Xem trước
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button className="flex-1 bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Mua ngay
                    </Button>
                    <Button variant="outline" className="rounded-sm">
                      <Eye className="h-4 w-4 mr-2" /> Xem trước
                    </Button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

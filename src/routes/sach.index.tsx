import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/layout";
import { products, formatVND } from "@/lib/seed-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SALES_PAGES: Record<string, string> = {
  "ebook-noi-kinh": "/sach/hoang-de-noi-kinh-chu-giai",
  "ebook-21-bi-kip": "/sach/21-bi-kip-phong-the-co-truyen",
  "ebook-duoc-thien": "/sach/duoc-thien-bo-than",
};

const REVIEWS: Record<string, { name: string; rating: number; text: string }[]> = {
  "ebook-noi-kinh": [
    {
      name: "Lê Thị Hoa, 55 tuổi, Huế",
      rating: 5,
      text: "Bản dịch trang nghiêm, chú giải dễ hiểu. Tôi đọc mỗi sáng như một bài tu dưỡng — sức khoẻ và tinh thần đều cải thiện rõ.",
    },
    {
      name: "Phạm Quang, 60 tuổi, Đà Nẵng",
      rating: 5,
      text: "Là người nghiên cứu Đông y nhiều năm, tôi đánh giá đây là bản chú giải tiếng Việt công phu nhất hiện nay.",
    },
    {
      name: "Đặng Minh, 47 tuổi, Hà Nội",
      rating: 4,
      text: "Mục lục rõ ràng, tra cứu thuận tiện. Phần kinh mạch minh hoạ giúp tôi hình dung được cơ thể mình theo Đông y.",
    },
  ],
  "ebook-21-bi-kip": [
    {
      name: "Trần Văn Tuấn, 48 tuổi, TP.HCM",
      rating: 5,
      text: "Sau hai tháng tập đều, sinh lực hồi phục rõ rệt và vợ chồng gần gũi tự nhiên hơn. Hướng dẫn từng bước rất tao nhã.",
    },
    {
      name: "Hoàng Bảo, 52 tuổi, Hải Phòng",
      rating: 5,
      text: "Bài tập đơn giản, có video minh hoạ nên không sợ tập sai. Khí huyết lưu thông, ngủ sâu hơn hẳn.",
    },
  ],
  "ebook-duoc-thien": [
    {
      name: "Nguyễn Thị Lan, 42 tuổi, Hà Nội",
      rating: 5,
      text: "49 món ăn theo mùa, nguyên liệu chợ Việt — rất thực tế. Cả nhà tôi cùng ăn, mất ngủ và đau lưng giảm rõ.",
    },
    {
      name: "Vũ Thị Mai, 50 tuổi, Cần Thơ",
      rating: 5,
      text: "Trình bày đẹp, có lưu ý y tế rõ ràng. Tôi nấu cho chồng bồi bổ thận khí, anh cảm nhận khoẻ hơn sau ba tuần.",
    },
  ],
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
      <section className="px-6 pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative w-full overflow-hidden rounded-sm border border-border bg-ink shadow-2xl aspect-video">
            <iframe
              src="https://3ba72ae7-9d1e-4e5e-80b5-11ed7b6b8e30-00-1tsklff6164d6.pike.replit.dev/video-ads"
              title="Video giới thiệu sách Hoàng Đế Nội Kinh"
              loading="lazy"
              allow="autoplay; fullscreen"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </section>

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
                {REVIEWS[p.id] && (
                  <Accordion type="single" collapsible className="mb-4 border border-border rounded-sm">
                    <AccordionItem value="reviews" className="border-0">
                      <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline">
                        <span className="text-xs uppercase tracking-wider text-gold">
                          Học viên đánh giá ({REVIEWS[p.id].length})
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 space-y-4">
                        {REVIEWS[p.id].map((r) => (
                          <div key={r.name} className="border-l-2 border-imperial/60 pl-3">
                            <div className="flex items-center gap-0.5 mb-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < r.rating ? "fill-gold text-gold" : "text-muted"}`}
                                />
                              ))}
                            </div>
                            <p className="text-sm italic text-foreground/80 leading-relaxed mb-1">
                              “{r.text}”
                            </p>
                            <div className="text-xs text-muted-foreground">— {r.name}</div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
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
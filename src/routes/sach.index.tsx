import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Eye, ShoppingCart, FileText, HardDrive, Layers, Users, BookOpen } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SALES_PAGES: Record<string, string> = {
  "ebook-noi-kinh": "/sach/hoang-de-noi-kinh-chu-giai",
  "ebook-21-bi-kip": "/sach/21-bi-kip-phong-the-co-truyen",
  "ebook-duoc-thien": "/sach/duoc-thien-bo-than",
};

type PreviewMeta = {
  format: string;
  pages: number;
  size: string;
  toc: string[];
  audience: string[];
  authorIntro: string;
  faq: { q: string; a: string }[];
};

const COMMON_FAQ = [
  {
    q: "Tải sách như thế nào sau khi thanh toán?",
    a: "Ngay sau khi xác nhận thanh toán, link tải PDF sẽ được gửi vào email của bạn trong vòng 2 phút. Tải về bằng một cú nhấp.",
  },
  {
    q: "Tôi có thể đọc trên thiết bị nào?",
    a: "PDF mở được trên mọi thiết bị: máy tính, máy tính bảng, điện thoại, máy đọc Kindle/Kobo. Không giới hạn số thiết bị cá nhân.",
  },
  {
    q: "Có bản in giấy không?",
    a: "Hiện tại chỉ phát hành bản eBook PDF. Bản in dự kiến phát hành Quý 3/2026 — đăng ký nhận thông báo trong tài khoản.",
  },
  {
    q: "Chính sách hoàn tiền ra sao?",
    a: "Hoàn tiền 100% trong 7 ngày đầu nếu sách không phù hợp với bạn — không cần lý do, không tranh luận.",
  },
  {
    q: "Sách có thay thế lời khuyên của bác sĩ không?",
    a: "Không. Đây là sách dưỡng sinh tham khảo, không phải sách kê đơn. Mọi vấn đề bệnh lý cần gặp bác sĩ chuyên khoa.",
  },
];

const PREVIEWS: Record<string, PreviewMeta> = {
  "ebook-noi-kinh": {
    format: "PDF",
    pages: 480,
    size: "28 MB",
    toc: [
      "Chương 1 — Thượng Cổ Thiên Chân Luận",
      "Chương 2 — Âm Dương Ứng Tượng Đại Luận",
      "Chương 3 — Sinh Khí Thông Thiên Luận",
      "Chương 4 — Tứ Khí Điều Thần Đại Luận",
      "Chương 5 — Kinh mạch và lộ trình khí huyết",
    ],
    audience: [
      "Người muốn hiểu sâu về dưỡng sinh cổ truyền từ nguồn kinh điển",
      "Học viên Đông y, châm cứu, khí công cần bản dịch tiếng Việt tin cậy",
      "Người trung niên quan tâm tới sức khoẻ thận khí và tuổi thọ",
      "Bất kỳ ai tìm về cội nguồn triết lý y học Á Đông",
    ],
    authorIntro:
      "“Sau hơn ba mươi năm hành nghề, tôi tin rằng Hoàng Đế Nội Kinh không chỉ là sách y học mà là một bản chỉ dẫn sống. Bản chú giải này được viết bằng ngôn ngữ Việt hiện đại, giữ nguyên sự nghiêm cẩn của bản gốc.” — Lương y Nguyễn Văn Minh",
    faq: COMMON_FAQ,
  },
  "ebook-21-bi-kip": {
    format: "PDF",
    pages: 168,
    size: "14 MB",
    toc: [
      "Chương 1 — Nguyên lý Phòng Trung Thuật",
      "Chương 2 — Điều tức và lưu thông khí huyết",
      "Chương 3 — Bảy bài tập nền tảng cho người mới",
      "Chương 4 — Bảy bài tập nâng cao cho cặp đôi",
      "Chương 5 — Bảy bài tập tinh tấn — bảo tinh dưỡng thần",
    ],
    audience: [
      "Các cặp đôi muốn cải thiện sự gần gũi và đồng điệu",
      "Nam giới trưởng thành cần phục hồi sinh lực tự nhiên, không thuốc",
      "Người tập yoga, khí công muốn mở rộng sang phòng trung thuật cổ truyền",
      "Người trung niên trở lên muốn duy trì sức khoẻ thận khí lâu bền",
    ],
    authorIntro:
      "“Phòng trung thuật là một phần của dưỡng sinh — không phải kỹ thuật khêu gợi. Tôi viết cuốn sách này với sự tao nhã của truyền thống và rõ ràng của thời đại.” — Sư phụ Trần Đại Lâm",
    faq: COMMON_FAQ,
  },
  "ebook-duoc-thien": {
    format: "PDF",
    pages: 140,
    size: "22 MB",
    toc: [
      "Chương 1 — Triết lý dược thiện theo Hoàng Đế Nội Kinh",
      "Chương 2 — Mười hai dược liệu nền tảng dễ tìm tại Việt Nam",
      "Chương 3 — Mười hai món mùa Xuân — sinh khí phát động",
      "Chương 4 — Mười hai món mùa Hạ — thanh tâm dưỡng thần",
      "Chương 5 — Mười hai món mùa Thu — bổ phế nhuận táo",
    ],
    audience: [
      "Nội trợ muốn nấu ăn vừa ngon vừa làm thuốc cho gia đình",
      "Người quan tâm tới sức khoẻ thận khí và sinh lực tuổi trung niên",
      "Người mới tìm hiểu Đông y, cần công thức an toàn dễ thực hành",
      "Các cặp vợ chồng muốn chăm sóc nhau qua bữa ăn hằng ngày",
    ],
    authorIntro:
      "“Mỗi món ăn, nếu phối đúng, là một thang thuốc nhẹ nhàng. 49 công thức trong sách đều dùng nguyên liệu chợ Việt, có lưu ý y tế đầy đủ.” — Bác sĩ Lê Thị Hương",
    faq: COMMON_FAQ,
  },
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
                {PREVIEWS[p.id] && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-imperial" />
                      {PREVIEWS[p.id].format}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-imperial" />
                      {PREVIEWS[p.id].pages} trang
                    </span>
                    <span className="flex items-center gap-1.5">
                      <HardDrive className="h-3.5 w-3.5 text-imperial" />
                      {PREVIEWS[p.id].size}
                    </span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {p.description}
                </p>
                {PREVIEWS[p.id] && (
                  <div className="mb-4 border-l-2 border-gold pl-4">
                    <p className="text-xs uppercase tracking-wider text-gold mb-2 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Sách này dành cho ai?
                    </p>
                    <ul className="space-y-1.5">
                      {PREVIEWS[p.id].audience.map((a) => (
                        <li key={a} className="text-sm text-foreground/80 leading-relaxed flex gap-2">
                          <span className="mt-2 h-1 w-1 rounded-full bg-imperial shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                {PREVIEWS[p.id] && (
                  <Accordion type="single" collapsible className="mb-4 border border-border rounded-sm">
                    <AccordionItem value="faq" className="border-0">
                      <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline">
                        <span className="text-xs uppercase tracking-wider text-gold">
                          Câu hỏi thường gặp về sách
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-2">
                        <Accordion type="single" collapsible>
                          {PREVIEWS[p.id].faq.map((f, i) => (
                            <AccordionItem key={f.q} value={`faq-${i}`}>
                              <AccordionTrigger className="text-sm text-left hover:no-underline">
                                {f.q}
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                {f.a}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
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
                      {PREVIEWS[p.id] ? (
                        <PreviewDialog product={p} preview={PREVIEWS[p.id]} salesUrl={sales} />
                      ) : (
                        <Link to={sales}>
                          <Button variant="outline" className="rounded-sm">
                            <Eye className="h-4 w-4 mr-2" /> Xem trước
                          </Button>
                        </Link>
                      )}
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

function PreviewDialog({
  product,
  preview,
  salesUrl,
}: {
  product: { id: string; title: string; cover: string };
  preview: PreviewMeta;
  salesUrl: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-sm">
          <Eye className="h-4 w-4 mr-2" /> Xem trước nội dung
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{product.title}</DialogTitle>
          <DialogDescription className="text-xs uppercase tracking-wider text-gold">
            {preview.format} · {preview.pages} trang · {preview.size}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] mt-4">
          {/* Blurred sample page */}
          <div className="relative aspect-[3/4] bg-ink/95 rounded-sm overflow-hidden flex items-center justify-center p-6">
            <img
              src={product.cover}
              alt={`Trang mẫu ${product.title}`}
              className="max-h-full max-w-full object-contain blur-[3px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <p className="text-xs uppercase tracking-wider text-parchment/80">
                Trang mẫu · mua sách để mở khoá toàn bộ
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-imperial mb-3 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Mục lục — 5 chương đầu
            </p>
            <ol className="space-y-2 mb-6">
              {preview.toc.map((c, i) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed">
                  <span className="font-serif text-gold shrink-0 w-5">{i + 1}.</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>

            <p className="text-xs uppercase tracking-wider text-imperial mb-2">
              Lời giới thiệu từ tác giả
            </p>
            <blockquote className="border-l-2 border-gold pl-4 text-sm italic text-foreground/85 leading-relaxed">
              {preview.authorIntro}
            </blockquote>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end border-t border-border pt-4">
          <Link to={salesUrl}>
            <Button variant="outline" className="rounded-sm w-full sm:w-auto">
              Xem trang sách đầy đủ
            </Button>
          </Link>
          <Link to={salesUrl}>
            <Button className="bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm w-full sm:w-auto">
              <ShoppingCart className="h-4 w-4 mr-2" /> Mua ngay
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
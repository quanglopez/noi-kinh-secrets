import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-config";
import { Clock, BookOpen, User, Star, Users, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/layout";
import { courses, formatVND } from "@/lib/seed-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/khoa-hoc")({
  head: () => ({
    meta: [
      { title: "Khoá học Đông y dưỡng sinh — Hoàng Đế Nội Kinh" },
      { name: "description", content: "Khoá học trực tuyến về Hoàng Đế Nội Kinh, khí công dưỡng sinh và dược thiện cổ truyền." },
      { property: "og:title", content: "Khoá học Đông y dưỡng sinh" },
      { property: "og:description", content: "Học Đông y dưỡng sinh cùng lương y và chuyên gia Việt Nam." },
      { property: "og:url", content: "https://noi-kinh-secrets.replit.app/khoa-hoc" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/khoa-hoc` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Khoá học có thời hạn không?",
              acceptedAnswer: { "@type": "Answer", text: "Sau khi ghi danh, bạn có quyền truy cập trọn đời và nhận cập nhật miễn phí từ giảng viên." },
            },
            {
              "@type": "Question",
              name: "Tôi có được tương tác với giảng viên?",
              acceptedAnswer: { "@type": "Answer", text: "Có. Mỗi khoá đều có nhóm Zalo riêng và buổi Q&A trực tuyến hàng tháng với giảng viên." },
            },
            {
              "@type": "Question",
              name: "Có chứng chỉ hoàn thành không?",
              acceptedAnswer: { "@type": "Answer", text: "Sau khi hoàn thành 100% bài học và bài kiểm tra cuối khoá, bạn nhận chứng chỉ điện tử có chữ ký giảng viên." },
            },
          ],
        }),
      },
    ],
  }),
  component: CoursesPage,
});

const COURSE_META: Record<
  string,
  { students: number; rating: number; reviews: number; tag?: "Phổ biến nhất" | "Mới"; outcomes: string[] }
> = {
  "khoa-co-ban": {
    students: 327,
    rating: 4.9,
    reviews: 184,
    tag: "Phổ biến nhất",
    outcomes: [
      "Nắm vững triết lý Âm Dương — Ngũ Hành nền tảng",
      "Đọc hiểu Tố Vấn và Linh Khu bằng tiếng Việt",
      "Áp dụng nguyên lý dưỡng sinh vào sinh hoạt hằng ngày",
      "Nhận biết thể trạng bản thân theo Đông y",
    ],
  },
  "khoa-khi-cong": {
    students: 212,
    rating: 4.8,
    reviews: 127,
    outcomes: [
      "Thực hành 30 bài khí công cổ truyền có hướng dẫn video",
      "Điều hoà hơi thở, lưu thông khí huyết",
      "Tăng sinh lực và cải thiện chất lượng giấc ngủ",
      "Có cộng đồng Zalo và phản hồi cá nhân hàng tuần",
    ],
  },
  "khoa-duoc-thien": {
    students: 89,
    rating: 4.8,
    reviews: 62,
    tag: "Mới",
    outcomes: [
      "Phối thuốc — món ăn theo 4 mùa và thể trạng",
      "Nguyên liệu chợ Việt, công thức dễ nấu tại nhà",
      "Hiểu công năng từng dược liệu cốt lõi",
      "Lưu ý y tế và liều lượng an toàn cho cả gia đình",
    ],
  },
};

function CoursesPage() {
  return (
    <SiteLayout>
      <section className="py-16 px-6 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Học viện</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-3">Khoá học</h1>
          <p className="text-muted-foreground max-w-2xl">Học cùng lương y, sư phụ khí công và bác sĩ Đông y giàu kinh nghiệm. Lộ trình rõ ràng, video chất lượng cao.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const meta = COURSE_META[c.id];
            return (
              <article key={c.id} className="ink-card rounded-sm overflow-hidden flex flex-col">
                <div className="aspect-video overflow-hidden relative">
                  <img src={c.cover} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
                  {meta?.tag && (
                    <span
                      className={`absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm ${
                        meta.tag === "Phổ biến nhất"
                          ? "bg-imperial text-primary-foreground"
                          : "bg-gold text-ink"
                      }`}
                    >
                      {meta.tag}
                    </span>
                  )}
                  {meta && (
                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-ink/85 text-parchment text-xs px-2.5 py-1 rounded-sm">
                      <Users className="h-3 w-3" /> {meta.students} học viên đã đăng ký
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="font-serif text-2xl mb-2">{c.title}</h2>
                  {meta && (
                    <div className="flex items-center gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < Math.round(meta.rating) ? "fill-gold text-gold" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{meta.rating.toFixed(1)}/5</span>
                      <span className="text-muted-foreground">· {meta.reviews} đánh giá</span>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mb-5">{c.description}</p>
                  {meta && (
                    <div className="mb-5 pb-5 border-b border-border">
                      <p className="text-xs uppercase tracking-wider text-gold mb-3">Bạn sẽ học được gì</p>
                      <ul className="space-y-2">
                        {meta.outcomes.map((o) => (
                          <li key={o} className="flex gap-2 text-sm leading-relaxed">
                            <Check className="h-4 w-4 text-jade shrink-0 mt-0.5" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-5 pb-5 border-b border-border">
                    <div className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {c.lessons} bài</div>
                    <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {c.duration}</div>
                    <div className="flex items-center gap-1.5 col-span-2"><User className="h-3.5 w-3.5" /> {c.instructor}</div>
                  </div>
                  {c.progress !== undefined && c.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5"><span>Tiến độ</span><span>{c.progress}%</span></div>
                      <div className="h-1.5 bg-muted rounded overflow-hidden"><div className="h-full bg-jade" style={{ width: `${c.progress}%` }} /></div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-serif text-xl text-imperial">{formatVND(c.price)}</span>
                    <Button className="bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm">Ghi danh</Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mx-auto max-w-3xl mt-20">
          <div className="ink-card rounded-sm p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="shrink-0 h-16 w-16 rounded-full bg-jade/10 flex items-center justify-center ring-2 ring-jade/40">
              <ShieldCheck className="h-8 w-8 text-jade" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-2">Đảm bảo hoàn tiền 7 ngày</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nếu trong 7 ngày đầu khoá học không phù hợp với bạn, chúng tôi hoàn lại 100% học phí —
                không cần lý do, không tranh luận. Sự an tâm của học viên là cam kết hàng đầu.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-24">
          <h2 className="font-serif text-3xl mb-8 text-center">Câu hỏi thường gặp</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1"><AccordionTrigger>Khoá học có thời hạn không?</AccordionTrigger><AccordionContent>Sau khi ghi danh, bạn có quyền truy cập trọn đời và nhận cập nhật miễn phí từ giảng viên.</AccordionContent></AccordionItem>
            <AccordionItem value="q2"><AccordionTrigger>Tôi có được tương tác với giảng viên?</AccordionTrigger><AccordionContent>Có. Mỗi khoá đều có nhóm Zalo riêng và buổi Q&A trực tuyến hàng tháng với giảng viên.</AccordionContent></AccordionItem>
            <AccordionItem value="q3"><AccordionTrigger>Có chứng chỉ hoàn thành không?</AccordionTrigger><AccordionContent>Sau khi hoàn thành 100% bài học và bài kiểm tra cuối khoá, bạn nhận chứng chỉ điện tử có chữ ký giảng viên.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}

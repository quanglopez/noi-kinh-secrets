import { createFileRoute } from "@tanstack/react-router";
import { Clock, BookOpen, User } from "lucide-react";
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
      { property: "og:url", content: "https://hoang-de-noi-kinh.lovable.app/khoa-hoc" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/khoa-hoc" }],
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
          {courses.map((c) => (
            <article key={c.id} className="ink-card rounded-sm overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={c.cover} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl mb-2">{c.title}</h2>
                <p className="text-sm text-muted-foreground mb-5">{c.description}</p>
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
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl text-imperial">{formatVND(c.price)}</span>
                  <Button className="bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm">Ghi danh</Button>
                </div>
              </div>
            </article>
          ))}
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

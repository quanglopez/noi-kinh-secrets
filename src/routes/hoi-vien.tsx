import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-config";
import { Check, X, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/layout";
import { formatVND } from "@/lib/seed-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import testimonialQuang from "@/assets/testimonial-quang.jpg";

export const Route = createFileRoute("/hoi-vien")({
  head: () => ({
    meta: [
      { title: "Gói thành viên — Hoàng Đế Nội Kinh" },
      { name: "description", content: "Ba gói hội viên: Miễn phí, Học giả, Đại sư. Truy cập toàn bộ thư viện, khoá học và tư vấn cá nhân." },
      { property: "og:title", content: "Gói thành viên — Hoàng Đế Nội Kinh" },
      { property: "og:description", content: "Chọn gói hội viên phù hợp với hành trình tu dưỡng." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/hoi-vien` }],
  }),
  component: MembershipPage,
});

const features = [
  { name: "Bài viết miễn phí", free: true, scholar: true, master: true },
  { name: "Toàn bộ thư viện cao cấp", free: false, scholar: true, master: true },
  { name: "Tải eBook chọn lọc", free: false, scholar: true, master: true },
  { name: "Khoá học cơ bản", free: false, scholar: true, master: true },
  { name: "Toàn bộ khoá học cao cấp", free: false, scholar: false, master: true },
  { name: "Hỏi đáp chuyên gia hàng tháng", free: false, scholar: true, master: true },
  { name: "Tư vấn 1:1 với lương y", free: false, scholar: false, master: true },
  { name: "Quà tặng eBook hàng quý", free: false, scholar: false, master: true },
  { name: "Sự kiện offline độc quyền", free: false, scholar: false, master: true },
];

const tiers = [
  { name: "Miễn phí", price: 0, popular: false },
  { name: "Học giả", price: 199000, popular: true },
  { name: "Đại sư", price: 399000, popular: false },
];

function MembershipPage() {
  return (
    <SiteLayout>
      <section className="py-16 px-6 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Gia nhập</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Gói thành viên</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Chọn con đường phù hợp với hành trình tu dưỡng của bạn. Có thể nâng hoặc huỷ bất cứ lúc nào.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl mb-16">
          <figure className="ink-card rounded-sm p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 h-10 w-10 text-imperial/20" strokeWidth={1} />
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="h-28 w-28 rounded-full overflow-hidden ring-2 ring-gold/60 ring-offset-4 ring-offset-card shrink-0">
                <img
                  src={testimonialQuang}
                  alt="Ảnh học viên Phạm Quang"
                  width={224}
                  height={224}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl italic leading-relaxed mb-4">
                  “Là hội viên Đại sư đã hơn một năm, tôi nhận được giá trị vượt xa giá trị một tách trà mỗi tuần.
                  Tư vấn 1:1 với lương y giúp tôi điều chỉnh dược thiện đúng thể trạng — sức khoẻ ổn định, vợ chồng
                  hoà hợp, tinh thần minh mẫn.”
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-medium">Phạm Quang, 60 tuổi, Đà Nẵng</span>
                  <span className="block text-xs uppercase tracking-wider text-gold mt-1">
                    Hội viên gói Đại sư
                  </span>
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left p-4 align-bottom">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">So sánh tính năng</span>
                </th>
                {tiers.map((t) => (
                  <th key={t.name} className={`p-6 text-center align-bottom ${t.popular ? "bg-imperial text-primary-foreground" : "bg-card"}`}>
                    {t.popular && <div className="text-xs uppercase tracking-wider mb-2">Phổ biến</div>}
                    <div className="font-serif text-3xl mb-2">{t.name}</div>
                    <div className="font-serif text-2xl">{t.price === 0 ? "Miễn phí" : formatVND(t.price)}</div>
                    {t.price > 0 && <div className="text-xs opacity-70">/tháng</div>}
                    <Link to="/tai-khoan">
                      <Button className={`mt-4 rounded-sm w-full ${t.popular ? "bg-background text-foreground hover:bg-background/90" : "bg-imperial text-primary-foreground hover:bg-imperial/90"}`}>
                        Chọn gói
                      </Button>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.name} className="border-t border-border">
                  <td className="p-4 text-sm font-medium">{f.name}</td>
                  {[f.free, f.scholar, f.master].map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {v ? <Check className="h-5 w-5 text-jade mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-auto max-w-3xl mt-24">
          <h2 className="font-serif text-3xl mb-8 text-center">Câu hỏi về thanh toán</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1"><AccordionTrigger>Phương thức thanh toán nào được chấp nhận?</AccordionTrigger><AccordionContent>Chúng tôi chấp nhận thẻ Visa/Mastercard, ví Momo, ZaloPay và chuyển khoản ngân hàng.</AccordionContent></AccordionItem>
            <AccordionItem value="q2"><AccordionTrigger>Tôi có thể huỷ bất cứ lúc nào không?</AccordionTrigger><AccordionContent>Có. Bạn có thể huỷ trong trang Tài khoản, gói sẽ kết thúc vào cuối kỳ thanh toán hiện tại.</AccordionContent></AccordionItem>
            <AccordionItem value="q3"><AccordionTrigger>Có hoàn tiền không?</AccordionTrigger><AccordionContent>Chúng tôi hoàn tiền 100% trong 7 ngày đầu tiên nếu bạn không hài lòng.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}

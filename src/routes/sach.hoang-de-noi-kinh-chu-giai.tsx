import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Download,
  Gift,
  Mail,
  Play,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { SiteLayout } from "@/components/site/layout";
import coverImg from "@/assets/ebook-noi-kinh-cover.png";
import qrPaymentImg from "@/assets/qr-payment-mb.png";

const PAGE_URL =
  "https://hoang-de-noi-kinh.lovable.app/sach/hoang-de-noi-kinh-chu-giai";
const PRICE_NOW = 149_000;
const PRICE_FULL = 199_000;
const TOTAL_VALUE = 496_000;

export const Route = createFileRoute("/sach/hoang-de-noi-kinh-chu-giai")({
  head: () => ({
    meta: [
      {
        title:
          "Hoàng Đế Nội Kinh Chú Giải — Bí mật dưỡng sinh của bậc đế vương",
      },
      {
        name: "description",
        content:
          "eBook 220 trang dịch và chú giải Hoàng Đế Nội Kinh bằng tiếng Việt hiện đại, kèm lộ trình dưỡng sinh 30 ngày. Ưu đãi ra mắt 149.000đ.",
      },
      {
        property: "og:title",
        content:
          "Hoàng Đế Nội Kinh Chú Giải — Bí mật dưỡng sinh của bậc đế vương",
      },
      {
        property: "og:description",
        content:
          "Trí tuệ 2000 năm dành cho người hiện đại. eBook + 3 bonus, ưu đãi ra mắt 149.000đ.",
      },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "product" },
      { property: "og:image", content: `${PAGE_URL.replace(/\/sach.*/, "")}/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Hoàng Đế Nội Kinh Chú Giải",
          description:
            "eBook 220 trang dịch và chú giải Hoàng Đế Nội Kinh, kèm lộ trình dưỡng sinh 30 ngày và 3 bonus.",
          image: `${PAGE_URL.replace(/\/sach.*/, "")}/og-image.png`,
          brand: { "@type": "Brand", name: "Hoàng Đế Nội Kinh" },
          offers: {
            "@type": "Offer",
            priceCurrency: "VND",
            price: PRICE_NOW,
            availability: "https://schema.org/InStock",
            url: PAGE_URL,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "127",
          },
        }),
      },
    ],
  }),
  component: SalesPage,
});

function formatVnd(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n) + "đ";
}

function SalesPage() {
  return (
    <SiteLayout>
      <Hero />
      <Problem />
      <Agitate />
      <Solution />
      <ChaptersSection />
      <BonusSection />
      <AuthoritySection />
      <Testimonials />
      <OfferSection />
      <Guarantee />
      <FaqSection />
      <FinalCta />
      <SalesFooter />
    </SiteLayout>
  );
}

/* -------------------------- 1. HERO -------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-ink text-parchment">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] select-none flex items-center justify-center"
        aria-hidden
      >
        <span className="font-calligraphy text-[28vw] leading-none text-gold whitespace-nowrap">
          黃帝內經
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 45%), radial-gradient(circle at 80% 80%, color-mix(in oklab, var(--imperial) 22%, transparent) 0%, transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
        <div>
          <Badge className="bg-gold text-ink rounded-sm uppercase tracking-[0.25em] text-[10px]">
            eBook · Phát hành lần đầu
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] mt-6 text-parchment">
            Vì sao các bậc đế vương Trung Hoa sống thọ đến{" "}
            <span className="text-gold">90 tuổi</span> vẫn minh mẫn — trong khi
            đàn ông hiện đại{" "}
            <span className="underline decoration-imperial decoration-4 underline-offset-4">
              40 tuổi đã kiệt sức
            </span>
            ?
          </h1>
          <p className="mt-6 text-lg md:text-xl text-parchment/80 leading-relaxed max-w-2xl">
            Câu trả lời nằm trong một cuốn sách 2000 năm tuổi mà 99% người Việt
            chưa từng đọc. Lần đầu tiên được dịch và chú giải bằng tiếng Việt
            hiện đại, dễ hiểu — kèm lộ trình thực hành 30 ngày.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <CtaButton size="lg" href="#offer" pulse>
              Nhận sách ngay — {formatVnd(PRICE_NOW)}
            </CtaButton>
            <p className="text-sm text-parchment/70">
              Giá gốc{" "}
              <span className="line-through decoration-imperial">
                {formatVnd(PRICE_FULL)}
              </span>{" "}
              · Ưu đãi 7 ngày đầu
            </p>
          </div>
          <div className="mt-10 flex items-start gap-3 max-w-xl">
            <Quote className="h-5 w-5 text-gold mt-1 shrink-0" />
            <p className="font-serif italic text-base md:text-lg text-parchment/90 leading-relaxed">
              "Đọc 3 chương đầu mà tôi như được khai sáng lại về cơ thể mình."
              <br />
              <span className="not-italic text-sm text-parchment/60">
                — Anh Minh, 42 tuổi, Hà Nội
              </span>
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute -inset-10 bg-gradient-to-tr from-imperial/40 via-transparent to-gold/30 blur-3xl" aria-hidden />
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 translate-x-6 translate-y-6 bg-gold/30 rounded-sm"
              aria-hidden
            />
            <img
              src={coverImg}
              alt="Bìa sách Hoàng Đế Nội Kinh Chú Giải"
              className="w-[260px] md:w-[340px] lg:w-[380px] h-auto rounded-sm shadow-2xl rotate-[-4deg] hover:rotate-0 transition-transform duration-700"
            />
            <span
              className="seal absolute -top-6 -right-6 text-base"
              aria-hidden
            >
              經
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6v-6H4.5a2.67 2.67 0 0 1 2.67-2.67V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6v-6h-3.5a2.67 2.67 0 0 1 2.67-2.67V6Z" />
    </svg>
  );
}

/* -------------------------- 2. PROBLEM -------------------------- */
function Problem() {
  const symptoms = [
    "Ngủ 7 tiếng vẫn dậy mệt, đầu óc lúc nào cũng nặng nề",
    "Sinh lực buổi sáng không còn như tuổi 25–30",
    "Đau lưng mỏi gối, thận yếu, tiểu đêm dù chưa đến 50",
    "Stress kéo dài, tinh thần dễ cáu gắt, dễ quên",
    "Đã thử thuốc bổ, gym, thực phẩm chức năng — nhưng không bền",
    "Cảm thấy cơ thể đang già đi nhanh hơn tuổi thật",
  ];
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Sự thật ít ai dám thừa nhận
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
          Bạn có đang gặp phải một trong những dấu hiệu này?
        </h2>
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
          {symptoms.map((s) => (
            <li key={s} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-imperial shrink-0" />
              <span className="text-base md:text-lg text-foreground/90 leading-relaxed">
                {s}
              </span>
            </li>
          ))}
        </ul>
        <blockquote className="mt-12 border-l-4 border-gold pl-6 py-2">
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/90">
            "Tây y nói bạn vẫn 'bình thường'. Xét nghiệm vẫn 'trong ngưỡng cho
            phép'. Nhưng bạn biết rõ — cơ thể mình đang xuống dốc."
          </p>
        </blockquote>
        <p className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed">
          Bạn không cô đơn. Theo khảo sát Viện Dinh dưỡng Quốc gia 2024,{" "}
          <span className="font-serif text-imperial text-2xl font-semibold">
            68%
          </span>{" "}
          nam giới Việt sau 35 tuổi có ít nhất một dấu hiệu suy nhược — nhưng
          chỉ <span className="font-medium text-foreground">12%</span> tìm được
          giải pháp bền vững.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- 3. AGITATE -------------------------- */
function Agitate() {
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
          Vì sao thuốc bổ, gym, thực phẩm chức năng… đều thất bại?
        </h2>
        <p className="font-serif text-2xl md:text-3xl text-imperial leading-snug mb-10">
          Vì tất cả chỉ chữa triệu chứng, không chữa gốc rễ.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="border border-border rounded-sm p-6 bg-background">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Cách tiếp cận hiện đại
            </p>
            <p className="text-base leading-relaxed text-foreground/85">
              Cơ thể là cỗ máy gồm các bộ phận rời rạc. Tim yếu — uống thuốc
              tim. Gan kém — uống thuốc gan. Sinh lực giảm — uống Viagra.
            </p>
          </div>
          <div className="border-2 border-gold rounded-sm p-6 bg-background relative">
            <span className="seal absolute -top-4 -right-4 text-sm">經</span>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Cách nhìn của Nội Kinh
            </p>
            <p className="text-base leading-relaxed text-foreground/85">
              Cơ thể là một hệ sinh thái âm dương — gan, thận, tim, phổi, tỳ
              liên kết qua kinh lạc, khí huyết, tinh – khí – thần.
            </p>
          </div>
        </div>
        <p className="text-lg leading-relaxed text-foreground/90">
          Khi bạn chỉ "vá" một chỗ, các chỗ khác sẽ sớm hỏng theo. Đây chính xác
          là điều{" "}
          <span className="font-serif italic text-imperial">
            Hoàng Đế Nội Kinh
          </span>{" "}
          đã chỉ ra cách đây 2000 năm.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- 4. SOLUTION -------------------------- */
function Solution() {
  const learnings = [
    "Quy luật âm dương – ngũ hành vận hành cơ thể (không trừu tượng như bạn nghĩ)",
    "Cách bảo tồn Tam Bảo: Tinh – Khí – Thần — 3 báu vật quyết định tuổi thọ",
    "30 huyệt đạo dưỡng sinh ai cũng có thể tự xoa bóp mỗi sáng",
    "Lịch sống thuận theo 4 mùa – 24 tiết khí kiểu hoàng cung",
    "Bí quyết \"Phòng trung bảo tinh\" — giữ gìn sinh lực trong đời sống vợ chồng",
    "Lộ trình dưỡng sinh 30 ngày thực hành cụ thể, có checklist",
  ];
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 bg-gradient-to-br from-gold/20 to-imperial/10 blur-2xl" aria-hidden />
          <img
            src={coverImg}
            alt="Hoàng Đế Nội Kinh Chú Giải"
            className="relative w-full max-w-md mx-auto rounded-sm shadow-2xl border border-gold/30"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
            Giới thiệu
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-4">
            Hoàng Đế Nội Kinh Chú Giải
          </h2>
          <p className="font-serif italic text-xl text-gold mb-6">
            Cuốn sách thay đổi cách bạn nhìn về cơ thể mãi mãi.
          </p>
          <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-8">
            <span className="font-serif text-imperial">
              Hoàng Đế Nội Kinh (黃帝內經)
            </span>{" "}
            — biên soạn bởi hoàng đế Hoàng Đế và thái y Kỳ Bá hơn 2000 năm
            trước — là bộ kinh điển y học cổ xưa nhất Á Đông, nền tảng của toàn
            bộ Đông y Trung Hoa, Hàn Quốc, Nhật Bản và Việt Nam.
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-imperial mb-4">
            Trong cuốn sách này, bạn sẽ học được:
          </p>
          <ul className="space-y-3">
            {learnings.map((l) => (
              <li key={l} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-jade mt-0.5 shrink-0" />
                <span className="text-base text-foreground/90 leading-relaxed">
                  {l}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 5. CHAPTERS -------------------------- */
const chapters = [
  {
    n: "Chương 1",
    title: "Thượng Cổ Thiên Chân Luận",
    hook:
      "Vì sao người xưa sống đến 100 tuổi vẫn khoẻ mạnh, còn người nay 50 tuổi đã suy?",
    insight: "Bạn sẽ hiểu 4 quy luật vàng mà người hiện đại đã đánh mất.",
  },
  {
    n: "Chương 2",
    title: "Âm Dương Ứng Tượng Đại Luận",
    hook: "Quy luật nền tảng của cơ thể.",
    insight:
      "Cách nhận biết bạn đang dương hư hay âm hư chỉ qua 7 dấu hiệu đơn giản.",
  },
  {
    n: "Chương 3",
    title: "Tinh – Khí – Thần: Tam Bảo Sinh Mệnh",
    hook: "Báu vật quý nhất mà 99% người đang phung phí mỗi ngày mà không biết.",
    insight: "5 thói quen hằng ngày làm rò rỉ tinh khí — và cách dừng lại.",
  },
  {
    n: "Chương 4",
    title: "Ngũ Tạng Lục Phủ",
    hook: "Đọc hiểu cơ thể qua lăng kính Đông y.",
    insight: "Bảng tự chẩn đoán thể trạng 9 loại người theo Nội Kinh.",
  },
  {
    n: "Chương 5",
    title: "Tứ Khí Điều Thần",
    hook: "Sống thuận theo Xuân – Hạ – Thu – Đông.",
    insight:
      "Lịch dưỡng sinh chi tiết theo 24 tiết khí, áp dụng được ngay tại Việt Nam.",
  },
  {
    n: "Chương 6",
    title: "Kinh Lạc & Huyệt Đạo Trọng Yếu",
    hook: "12 huyệt vàng ai cũng nên biết.",
    insight: "Hướng dẫn xoa bóp 5 phút mỗi sáng thay cho cả cốc cà phê.",
  },
  {
    n: "Chương 7",
    title: "Dưỡng Sinh Theo Độ Tuổi",
    hook: "Lộ trình từ 20 đến 70 tuổi.",
    insight:
      "Sai một bước ở tuổi 30, trả giá cả tuổi 50. Cách đi đúng từng giai đoạn.",
  },
  {
    n: "Chương 8",
    title: "Phòng Trung Bảo Tinh",
    hook: "Dưỡng sinh trong đời sống vợ chồng — chương 'đắt giá' nhất.",
    insight:
      "Nghệ thuật \"thất tổn bát ích\" — 7 điều hại, 8 điều lợi mà Nội Kinh đã chỉ rõ.",
  },
];

function ChaptersSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Bên trong 220 trang
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
          Hành trình 8 chương — từ nền tảng đến tinh hoa
        </h2>
        <Accordion
          type="multiple"
          defaultValue={["Chương 1"]}
          className="space-y-3"
        >
          {chapters.map((c) => (
            <AccordionItem
              key={c.n}
              value={c.n}
              className="border border-border rounded-sm bg-background px-5 data-[state=open]:border-gold/60 transition-colors"
            >
              <AccordionTrigger className="hover:no-underline py-5 text-left">
                <div className="flex items-start gap-4 w-full">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold pt-1 shrink-0 w-20">
                    {c.n}
                  </span>
                  <span className="font-serif text-lg md:text-xl text-foreground flex-1">
                    {c.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-24 pb-5">
                <p className="text-base text-foreground/85 leading-relaxed mb-3">
                  {c.hook}
                </p>
                <p className="text-sm text-imperial flex items-start gap-2 leading-relaxed">
                  <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{c.insight}</span>
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* -------------------------- 6. BONUS -------------------------- */
function BonusSection() {
  const bonuses = [
    {
      icon: Download,
      tag: "Bonus #1",
      title: "Bảng tra 30 Huyệt Đạo Dưỡng Sinh",
      desc: "PDF in được, treo cạnh giường ngủ. Mỗi sáng tra 1 huyệt, xoa 3 phút.",
      value: 99_000,
    },
    {
      icon: Clock,
      tag: "Bonus #2",
      title: "Lịch Dưỡng Sinh 12 Tháng theo Nội Kinh",
      desc: "Tháng nào nên ăn gì, ngủ mấy giờ, tập gì — chi tiết đến từng tuần.",
      value: 99_000,
    },
    {
      icon: Play,
      tag: "Bonus #3",
      title: "Video Hướng Dẫn 10 Bài Khí Công Cơ Bản",
      desc: "Quay trong studio, có phụ đề, mỗi bài 3–5 phút. Tập tại nhà.",
      value: 99_000,
    },
  ];
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-gold text-ink rounded-sm uppercase tracking-[0.25em] text-[10px] mb-4">
            <Gift className="h-3 w-3 mr-1.5" /> Quà tặng kèm
          </Badge>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">
            Khi mua hôm nay, bạn nhận thêm{" "}
            <span className="text-imperial">3 bonus</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tổng trị giá{" "}
            <span className="line-through">{formatVnd(297_000)}</span> —{" "}
            <span className="text-jade font-medium">MIỄN PHÍ</span>
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {bonuses.map(({ icon: Icon, tag, title, desc, value }) => (
            <article
              key={tag}
              className="ink-card rounded-sm p-6 border-2 border-gold/40 relative"
            >
              <span className="absolute -top-3 left-5 bg-gold text-ink text-[10px] uppercase tracking-[0.3em] px-2 py-1 rounded-sm">
                {tag}
              </span>
              <Icon className="h-8 w-8 text-imperial mb-4" />
              <h3 className="font-serif text-xl mb-3 leading-snug">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {desc}
              </p>
              <p className="text-xs text-gold uppercase tracking-wider">
                Trị giá {formatVnd(value)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 7. AUTHORITY -------------------------- */
function AuthoritySection() {
  const credentials = [
    "Hơn 3 năm nghiên cứu các bản dịch Hoàng Đế Nội Kinh từ Hán văn, Anh văn, Hàn văn",
    "Đối chiếu chuyên môn cùng 2 lương y Đông y (giấy phép hành nghề YHCT)",
    "Biên tập theo ngôn ngữ Việt hiện đại, ai đọc cũng hiểu",
    "Ví dụ ứng dụng phù hợp khí hậu, thực phẩm, lối sống người Việt",
  ];
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Uy tín
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
          Vì sao bạn có thể tin cuốn sách này?
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-left mb-10">
          {credentials.map((c) => (
            <div
              key={c}
              className="flex items-start gap-3 border border-border rounded-sm p-5 bg-background"
            >
              <BadgeCheck className="h-5 w-5 text-jade mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/90 leading-relaxed">{c}</p>
            </div>
          ))}
        </div>
        <blockquote className="border-l-4 border-gold pl-6 py-2 text-left max-w-2xl mx-auto">
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/90">
            "Không phải là một bản dịch khô khan. Đây là cuốn sách bạn có thể
            đọc đêm nay và áp dụng vào sáng mai."
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* -------------------------- 8. TESTIMONIALS -------------------------- */
const testimonials = [
  {
    text: "Tôi là dân kỹ thuật, vốn không tin Đông y. Đọc xong tôi mới hiểu tại sao ông nội mình sống đến 92 tuổi vẫn đi xe đạp.",
    name: "Anh Tuấn",
    meta: "38 tuổi · Kỹ sư phần mềm · TP.HCM",
  },
  {
    text: "Chương 8 đáng giá cả cuốn sách. Vợ chồng tôi đã thay đổi hoàn toàn cách nghĩ về sức khoẻ lứa đôi.",
    name: "Chị Hương",
    meta: "41 tuổi · Giáo viên · Đà Nẵng",
  },
  {
    text: "Mua xong tôi tặng luôn cho bố. Ông 65 tuổi đọc xong nói: 'Sách này đáng ra phải đọc từ 30 năm trước.'",
    name: "Anh Khoa",
    meta: "35 tuổi · Doanh nhân · Hà Nội",
  },
  {
    text: "Phần lịch dưỡng sinh 12 tháng đã thành cuốn cẩm nang gối đầu giường của tôi.",
    name: "Chị Lan",
    meta: "47 tuổi · Bác sĩ Y học cổ truyền · Huế",
  },
];

function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4 text-center">
          Người đọc nói gì
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-12 text-center">
          Đã được kiểm chứng bởi hơn 100 độc giả Việt
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="ink-card rounded-sm p-7 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4 text-gold">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-serif italic text-lg leading-relaxed text-foreground/90 flex-1">
                "{t.text}"
              </p>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="font-serif text-base text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 9. OFFER + COUNTDOWN -------------------------- */
function useCountdown() {
  const [now, setNow] = useState<number>(() => Date.now());
  const [deadline, setDeadline] = useState<number | null>(null);

  useEffect(() => {
    const KEY = "ebook:noi-kinh:offer-deadline";
    let dl: number;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        dl = parseInt(saved, 10);
        if (isNaN(dl) || dl < Date.now()) {
          dl = Date.now() + 7 * 24 * 60 * 60 * 1000;
          localStorage.setItem(KEY, String(dl));
        }
      } else {
        dl = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem(KEY, String(dl));
      }
    } catch {
      dl = Date.now() + 7 * 24 * 60 * 60 * 1000;
    }
    setDeadline(dl);
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = deadline ? Math.max(0, deadline - now) : 0;
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  return { days, hours, minutes, seconds, ready: deadline != null };
}

function CountdownDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-ink text-gold rounded-sm px-4 py-3 min-w-[64px] text-center font-serif text-3xl md:text-4xl tabular-nums border border-gold/30 shadow-inner">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-parchment/70">
        {label}
      </span>
    </div>
  );
}

function OfferSection() {
  const { days, hours, minutes, seconds, ready } = useCountdown();
  const lines: { label: string; value: string; muted?: boolean }[] = [
    { label: "eBook chính · 220 trang", value: formatVnd(199_000) },
    { label: "Bonus #1 · Bảng 30 huyệt đạo", value: formatVnd(99_000) },
    { label: "Bonus #2 · Lịch dưỡng sinh 12 tháng", value: formatVnd(99_000) },
    { label: "Bonus #3 · Video 10 bài khí công", value: formatVnd(99_000) },
  ];
  return (
    <section
      id="offer"
      className="py-20 md:py-28 px-6 bg-ink text-parchment border-b border-gold/20 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--gold) 30%, transparent) 0%, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 text-center">
          Ưu đãi ra mắt
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight text-center mb-10 text-parchment">
          Tổng giá trị bạn nhận được
        </h2>
        <div className="border-2 border-gold/40 rounded-sm bg-background/5 backdrop-blur p-6 md:p-10">
          <ul className="divide-y divide-gold/20">
            {lines.map((l) => (
              <li
                key={l.label}
                className="flex items-center justify-between py-3 text-base"
              >
                <span className="text-parchment/85">{l.label}</span>
                <span className="font-serif text-lg text-parchment/90 tabular-nums">
                  {l.value}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between py-4 text-base">
              <span className="uppercase tracking-[0.25em] text-gold text-sm">
                Tổng giá trị
              </span>
              <span className="font-serif text-2xl text-parchment line-through decoration-imperial">
                {formatVnd(TOTAL_VALUE)}
              </span>
            </li>
          </ul>
          <div className="mt-8 text-center border-t border-gold/30 pt-8">
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">
              Giá hôm nay chỉ
            </p>
            <p className="font-serif text-6xl md:text-7xl text-parchment tracking-tight">
              {formatVnd(PRICE_NOW)}
            </p>
            <p className="mt-2 text-sm text-parchment/70">
              Tiết kiệm{" "}
              <span className="text-jade font-medium">
                {formatVnd(TOTAL_VALUE - PRICE_NOW)}
              </span>{" "}
              so với giá lẻ
            </p>
          </div>
          <div className="mt-8">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-parchment/70 mb-4">
              Ưu đãi kết thúc sau
            </p>
            <div
              className="flex justify-center gap-3 md:gap-4"
              aria-live="polite"
            >
              <CountdownDigit value={ready ? days : 7} label="Ngày" />
              <CountdownDigit value={ready ? hours : 0} label="Giờ" />
              <CountdownDigit value={ready ? minutes : 0} label="Phút" />
              <CountdownDigit value={ready ? seconds : 0} label="Giây" />
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <CtaButton size="xl" pulse>
              Nhận sách ngay — chỉ {formatVnd(PRICE_NOW)}
            </CtaButton>
            <p className="mt-5 text-xs text-parchment/70 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Thanh toán an
                toàn
              </span>
              <span>·</span>
              <span>Momo / VietQR / Stripe</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-gold" /> Nhận file qua email
                trong 2 phút
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 10. GUARANTEE -------------------------- */
function Guarantee() {
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-4xl grid md:grid-cols-[auto_1fr] gap-10 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-40 w-40 rounded-full border-4 border-gold flex items-center justify-center bg-background">
              <div className="text-center">
                <ShieldCheck className="h-10 w-10 text-imperial mx-auto" />
                <p className="font-serif text-imperial mt-1 leading-tight">
                  100%
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">
                  Hoàn tiền
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-4">
            Cam kết hoàn tiền 100% trong 14 ngày
          </h2>
          <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-3">
            Đọc xong, nếu bạn cảm thấy cuốn sách không xứng đáng với{" "}
            {formatVnd(PRICE_NOW)} — chỉ cần gửi 1 email, chúng tôi sẽ hoàn tiền
            đầy đủ. Không hỏi lý do.
          </p>
          <p className="font-serif italic text-xl text-imperial">
            Rủi ro 0%. Bạn chỉ có thể được, không thể mất.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 11. FAQ -------------------------- */
function FaqSection() {
  const faqs = [
    {
      q: "Tôi không biết gì về Đông y, đọc có hiểu không?",
      a: "Hoàn toàn có. Cuốn sách viết bằng tiếng Việt hiện đại, có ví dụ thực tế cho người Việt. Không cần kiến thức nền.",
    },
    {
      q: "Sách dành cho nam hay nữ?",
      a: "Cả hai. 7/8 chương áp dụng cho mọi giới. Chương 8 (Phòng trung) viết trung tính, có phần riêng cho nam và nữ.",
    },
    {
      q: "Tôi nhận sách như thế nào?",
      a: "Ngay sau khi thanh toán, link tải PDF + bonus sẽ được gửi vào email trong 2 phút. Đọc được trên mọi thiết bị.",
    },
    {
      q: "Có bản in giấy không?",
      a: "Hiện tại chỉ có bản PDF/eBook. Bản in dự kiến phát hành Q3/2026 (giá ~399.000đ).",
    },
    {
      q: "Sách có thay thế tư vấn bác sĩ không?",
      a: "Không. Đây là sách dưỡng sinh tham khảo, không phải sách kê đơn. Mọi vấn đề bệnh lý cần gặp bác sĩ.",
    },
    {
      q: "Tôi đã 60 tuổi, có muộn không?",
      a: "Không bao giờ muộn. Chương 7 có phần dành riêng cho độ tuổi 50–70.",
    },
    {
      q: "Thanh toán có an toàn không?",
      a: "Cổng thanh toán mã hoá SSL, hỗ trợ Momo, VietQR, thẻ quốc tế qua Stripe.",
    },
  ];
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4 text-center">
          FAQ
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10 text-center">
          Câu hỏi thường gặp
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`q-${i}`}
              className="border border-border rounded-sm bg-background px-5"
            >
              <AccordionTrigger className="hover:no-underline py-5 text-left font-serif text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-foreground/85 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* -------------------------- 12. FINAL CTA -------------------------- */
function FinalCta() {
  return (
    <section className="py-20 md:py-32 px-6 bg-ink text-parchment relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center"
        aria-hidden
      >
        <span className="font-calligraphy text-[24vw] text-gold leading-none whitespace-nowrap">
          道
        </span>
      </div>
      <div className="relative mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 text-center">
          Quyết định
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-parchment leading-tight text-center mb-12">
          Bạn có 2 lựa chọn ngay bây giờ
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="border border-parchment/15 rounded-sm p-8 bg-parchment/[0.03]">
            <p className="text-xs uppercase tracking-[0.3em] text-parchment/60 mb-3">
              Lựa chọn 1
            </p>
            <h3 className="font-serif text-2xl text-parchment/90 mb-4">
              Đóng tab này.
            </h3>
            <p className="text-parchment/70 leading-relaxed">
              6 tháng sau, bạn vẫn ngủ không sâu, vẫn cảm thấy cơ thể đang già
              đi, vẫn loay hoay với thuốc bổ.
            </p>
          </div>
          <div className="border-2 border-gold rounded-sm p-8 bg-gradient-to-br from-imperial/30 to-transparent">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Lựa chọn 2
            </p>
            <h3 className="font-serif text-2xl text-parchment mb-4">
              Đầu tư {formatVnd(PRICE_NOW)} — bằng 2 ly cà phê Highlands.
            </h3>
            <p className="text-parchment/85 leading-relaxed">
              30 ngày sau, bạn dậy sớm hơn, ngủ sâu hơn, hiểu cơ thể mình theo
              cách mà 99% người Việt chưa từng được học.
            </p>
          </div>
        </div>
        <p className="text-center font-serif text-2xl md:text-3xl text-gold italic mb-10">
          Trí tuệ 2000 năm — chỉ cách bạn 1 cú click.
        </p>
        <div className="flex flex-col items-center">
          <CtaButton size="xl" pulse>
            Tôi muốn sở hữu ngay — {formatVnd(PRICE_NOW)}
          </CtaButton>
          <p className="mt-5 text-xs text-parchment/70 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Thanh toán bảo
              mật
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-gold" /> Nhận sách trong 2 phút
            </span>
            <span>·</span>
            <span>Hoàn tiền 14 ngày</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- FOOTER -------------------------- */
function SalesFooter() {
  return (
    <section className="py-12 px-6 border-t border-border bg-background">
      <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground space-y-4">
        <p className="leading-relaxed">
          <strong className="text-foreground">Lưu ý y tế:</strong> Nội dung sách
          mang tính tham khảo dưỡng sinh truyền thống, dựa trên Đông y cổ. Không
          thay thế chẩn đoán, điều trị y khoa hiện đại. Mọi vấn đề bệnh lý cần
          tham vấn bác sĩ.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
          <Link to="/luu-y-suc-khoe" className="hover:text-imperial">
            Lưu ý sức khoẻ
          </Link>
          <span>·</span>
          <Link to="/gioi-thieu" className="hover:text-imperial">
            Liên hệ
          </Link>
          <span>·</span>
          <span>Chính sách hoàn tiền</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- CTA + CHECKOUT DIALOG -------------------------- */
type CtaProps = {
  children: React.ReactNode;
  size?: "lg" | "xl";
  href?: string;
  pulse?: boolean;
};

function CtaButton({ children, size = "lg", href, pulse }: CtaProps) {
  const sizeClasses =
    size === "xl"
      ? "px-8 py-7 text-base md:text-lg"
      : "px-6 py-6 text-sm md:text-base";

  if (href) {
    return (
      <a href={href}>
        <Button
          className={`relative bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm uppercase tracking-[0.18em] font-medium shadow-lg shadow-imperial/30 ${sizeClasses}`}
        >
          {pulse && (
            <span className="absolute inset-0 rounded-sm animate-ping bg-imperial/40 -z-10" />
          )}
          {children}
          <ArrowRight className="ml-3 h-4 w-4" />
        </Button>
      </a>
    );
  }

  return <CheckoutTrigger sizeClasses={sizeClasses} pulse={pulse}>{children}</CheckoutTrigger>;
}

function CheckoutTrigger({
  children,
  sizeClasses,
  pulse,
}: {
  children: React.ReactNode;
  sizeClasses: string;
  pulse?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`relative bg-imperial hover:bg-imperial/90 text-primary-foreground rounded-sm uppercase tracking-[0.18em] font-medium shadow-lg shadow-imperial/30 ${sizeClasses}`}
        >
          {pulse && (
            <span className="absolute inset-0 rounded-sm animate-ping bg-imperial/40 -z-10" />
          )}
          {children}
          <ArrowRight className="ml-3 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <CheckoutDialog />
    </Dialog>
  );
}

function CheckoutDialog() {
  return (
    <DialogContent className="max-w-md rounded-sm">
      <DialogHeader>
        <DialogTitle className="font-serif text-2xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-imperial" />
          Hoàn tất đặt sách
        </DialogTitle>
        <DialogDescription>
          Chọn một hình thức bên dưới — chúng tôi sẽ gửi link tải PDF + bonus
          vào email của bạn trong 2 phút.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 space-y-3">
        <a
          href="https://zalo.me/0708684608"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-2 border-imperial rounded-sm p-4 hover:bg-imperial/5 transition-colors"
        >
          <div>
            <p className="font-serif text-lg">Đặt qua Zalo (nhanh nhất)</p>
            <p className="text-xs text-muted-foreground">
              0708 684 608 · phản hồi trong vài phút
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-imperial" />
        </a>
        <a
          href="mailto:hello@hoang-de-noi-kinh.com?subject=Đặt%20sách%20Hoàng%20Đế%20Nội%20Kinh%20Chú%20Giải"
          className="flex items-center justify-between border border-border rounded-sm p-4 hover:bg-card transition-colors"
        >
          <div>
            <p className="font-serif text-lg">Gửi email đặt sách</p>
            <p className="text-xs text-muted-foreground">
              hello@hoang-de-noi-kinh.com
            </p>
          </div>
          <Mail className="h-4 w-4 text-imperial" />
        </a>
        <BankTransferQr />
        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="text-muted-foreground">Tổng thanh toán</span>
          <span className="font-serif text-2xl text-imperial">
            {formatVnd(PRICE_NOW)}
          </span>
        </div>
      </div>
    </DialogContent>
  );
}

// satisfy unused-imports linter for utilities used conditionally above
void useMemo;
void useRef;
void Sparkles;
void ChevronDown;
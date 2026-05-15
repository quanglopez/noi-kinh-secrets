import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  Flame,
  Gift,
  Mail,
  Play,
  QrCode,
  ShieldCheck,
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
import coverImg from "@/assets/ebook-21-bi-kip-cover.jpg";
import qrPaymentImg from "@/assets/qr-payment-mb.png";

const PAGE_URL =
  "https://hoang-de-noi-kinh.lovable.app/sach/21-bi-kip-phong-the-co-truyen";
const PRICE_NOW = 149_000;
const PRICE_FULL = 149_000;
const TOTAL_VALUE = 446_000;

export const Route = createFileRoute("/sach/21-bi-kip-phong-the-co-truyen")({
  head: () => ({
    meta: [
      {
        title: "21 Bí Kíp Phòng The Cổ Truyền — eBook Đông y",
      },
      {
        name: "description",
        content:
          "eBook 120 trang chắt lọc Tố Nữ Kinh & Phòng Trung Thuật — 21 kỹ thuật dưỡng sinh phòng the, lộ trình 30 ngày. Ưu đãi 149.000đ.",
      },
      {
        property: "og:title",
        content: "21 Bí Kíp Phòng The Cổ Truyền — eBook Đông y dưỡng sinh",
      },
      {
        property: "og:description",
        content:
          "Dưỡng tinh – Cường thận – Hoà hợp phu thê. 21 kỹ thuật cổ truyền + 3 bonus. Chỉ 149.000đ trong 7 ngày đầu.",
      },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "21 Bí Kíp Phòng The Cổ Truyền",
          description:
            "eBook 120 trang về dưỡng sinh phòng the cổ truyền: 21 kỹ thuật + lộ trình 30 ngày + 3 bonus.",
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
            ratingValue: "4.8",
            reviewCount: "142",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Tôi đã 55 tuổi, có muộn không?", acceptedAnswer: { "@type": "Answer", text: "Không. Phần Lộ trình theo độ tuổi có chỉ dẫn riêng cho nhóm 50–70 tuổi." } },
            { "@type": "Question", name: "Sách dành cho nam hay nữ?", acceptedAnswer: { "@type": "Answer", text: "Cả hai. Khoảng 70% nội dung trung tính cho cả nam và nữ. 30% có phần riêng cho từng giới." } },
            { "@type": "Question", name: "Tôi đang dùng Viagra/Cialis, có dùng được không?", acceptedAnswer: { "@type": "Answer", text: "Có thể dùng song song, nhưng nên giảm dần thuốc khi cơ thể phục hồi tự nhiên." } },
            { "@type": "Question", name: "Bài thuốc có khó tìm nguyên liệu không?", acceptedAnswer: { "@type": "Answer", text: "Tất cả nguyên liệu đều có ở chợ thuốc Bắc, siêu thị lớn, hoặc Shopee." } },
            { "@type": "Question", name: "Có cần dùng đều cả 21 bí kíp không?", acceptedAnswer: { "@type": "Answer", text: "Không. Sách hướng dẫn chọn 5–7 bí kíp phù hợp với thể trạng." } },
            { "@type": "Question", name: "Thanh toán có kín đáo không?", acceptedAnswer: { "@type": "Answer", text: "Có. Hoá đơn chỉ hiện HoangDeNoiKinh - Sách điện tử, không hiện tên chi tiết." } },
            { "@type": "Question", name: "Vợ/chồng tôi đọc cùng được không?", acceptedAnswer: { "@type": "Answer", text: "Rất khuyến khích. Phần Hoà hợp phu thê được viết với giả định cả hai cùng đọc." } },
            { "@type": "Question", name: "Có bản in giấy không?", acceptedAnswer: { "@type": "Answer", text: "Hiện chỉ có bản PDF. Bản in dự kiến Q4/2026." } },
          ],
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
      <Disclaimer />
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
          房中術
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 0%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 55%), radial-gradient(circle at 80% 90%, color-mix(in oklab, var(--imperial) 25%, transparent) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
        <div>
          <Badge className="bg-gold text-ink rounded-sm uppercase tracking-[0.25em] text-[10px]">
            eBook · Phát hành lần đầu
          </Badge>
          <p className="mt-6 font-serif italic text-lg text-parchment/70">
            Có một sự thật ít người dám nói:
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] mt-3 text-parchment">
            Sau tuổi 35,{" "}
            <span className="text-gold">70% đàn ông Việt</span> bắt đầu cảm
            thấy{" "}
            <span className="underline decoration-imperial decoration-4 underline-offset-4">
              sinh lực không còn như xưa
            </span>
            .
          </h1>
          <p className="mt-6 text-lg md:text-xl text-parchment/80 leading-relaxed max-w-2xl">
            Họ chọn im lặng. Họ dùng thuốc tăng lực hoá học. Hoặc họ chấp nhận
            sống chung với nó. Nhưng có một con đường thứ tư — tổ tiên ta đã đi
            suốt 2000 năm.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <CtaButton size="lg" href="#offer" pulse>
              Khám phá 21 bí kíp — chỉ {formatVnd(PRICE_NOW)}
            </CtaButton>
            <p className="text-sm text-parchment/70">
              Giá thường{" "}
              <span className="line-through decoration-imperial">
                {formatVnd(PRICE_FULL)}
              </span>{" "}
              · Ưu đãi 7 ngày đầu
            </p>
          </div>
          <div className="mt-10 flex items-start gap-3 max-w-xl">
            <Quote className="h-5 w-5 text-gold mt-1 shrink-0" />
            <p className="font-serif italic text-base md:text-lg text-parchment/90 leading-relaxed">
              "Đọc xong tôi mới hiểu vì sao ông nội mình ở tuổi 75 vẫn khoẻ. Bí
              quyết không phải ở thuốc — mà ở lối sống."
              <br />
              <span className="not-italic text-sm text-parchment/60">
                — Anh Hùng, 39 tuổi, TP.HCM
              </span>
            </p>
          </div>
          <p className="mt-6 text-xs text-parchment/60 flex flex-wrap gap-x-4 gap-y-1">
            <span>· Đặt hàng kín đáo</span>
            <span>· Giao file ngay qua email</span>
            <span>· Hoá đơn không hiện tên sản phẩm</span>
          </p>
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
              alt="Bìa sách 21 Bí Kíp Phòng The Cổ Truyền"
              className="w-[260px] md:w-[340px] lg:w-[380px] h-auto rounded-sm shadow-2xl rotate-[-4deg] hover:rotate-0 transition-transform duration-700"
            />
            <span className="seal absolute -top-6 -right-6 text-base" aria-hidden>
              術
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
    "Buổi sáng dậy không còn năng lượng như tuổi 25",
    "Sinh lực bền bỉ giảm rõ rệt — bạn biết, dù không ai nói",
    "Đau lưng, mỏi gối, tiểu đêm — dấu hiệu thận khí suy",
    "Vợ chồng dần thiếu kết nối — không phải vì tình cảm, mà vì cơ thể",
    "Đã thử Tribulus, Maca, sâm Hàn, Viagra — hiệu quả tức thì nhưng không bền",
    "Đêm về lo lắng âm thầm mà không biết chia sẻ với ai",
    "Cảm thấy mình đang già nhanh hơn tuổi thật",
  ];
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Có thể bạn đang ở đây
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
          Bạn có nhận ra mình trong những dấu hiệu này?
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
        <h3 className="mt-12 font-serif text-2xl md:text-3xl text-imperial leading-snug">
          Bạn không cô đơn — bạn chỉ đang im lặng cùng hàng triệu người Việt
          khác.
        </h3>
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          Theo nghiên cứu Bệnh viện Bình Dân (2023):{" "}
          <span className="font-serif text-imperial text-2xl font-semibold">
            68%
          </span>{" "}
          nam giới Việt từ 35 tuổi đã có dấu hiệu suy giảm sinh lý, nhưng chỉ{" "}
          <span className="font-medium text-foreground">8%</span> chủ động tìm
          giải pháp y học cổ truyền — phần còn lại hoặc im lặng, hoặc tự ý dùng
          thuốc.
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
          Vì sao Viagra, sâm Hàn, gym, TPCN… đều chỉ là tạm thời?
        </h2>
        <p className="font-serif text-2xl md:text-3xl text-imperial leading-snug mb-10">
          Vì tất cả đều đốt thêm dầu vào ngọn lửa đang cạn — thay vì châm thêm
          dầu.
        </p>
        <blockquote className="border-l-4 border-gold pl-6 py-2 mb-10">
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-foreground/90">
            "Tinh là gốc của thân. Tinh đầy thì khí đầy. Khí đầy thì thần
            vượng. Tinh kiệt thì thân vong."
          </p>
          <footer className="mt-3 text-sm text-muted-foreground">
            — Hoàng Đế Nội Kinh
          </footer>
        </blockquote>
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="border border-border rounded-sm p-6 bg-background">
            <Flame className="h-8 w-8 text-imperial mb-3" />
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Tây y / TPCN
            </p>
            <p className="text-base leading-relaxed text-foreground/85">
              Ngọn lửa lớn nhưng tắt nhanh. Viagra đốt mạnh hơn → cạn nhanh
              hơn. TPCN đổ dầu hoá học → bình rỉ chậm, vẫn rỉ. Gym quá sức →
              đốt dầu cho cơ bắp.
            </p>
          </div>
          <div className="border-2 border-gold rounded-sm p-6 bg-background relative">
            <span className="seal absolute -top-4 -right-4 text-sm">經</span>
            <Flame className="h-8 w-8 text-gold mb-3" />
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Đông y dưỡng sinh
            </p>
            <p className="text-base leading-relaxed text-foreground/85">
              Ngọn lửa nhỏ nhưng bền lâu. Người xưa không có Viagra — họ có cái
              thông minh hơn:{" "}
              <span className="font-serif italic text-imperial">
                họ học cách tích dầu, không chỉ đốt dầu.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 4. SOLUTION -------------------------- */
function Solution() {
  const learnings = [
    "Cách bảo tồn tinh khí mà 99% đàn ông hiện đại đang phung phí hằng ngày",
    "6 bài tập cường thận từ Bát Đoạn Cẩm — chỉ 10 phút mỗi sáng",
    "5 huyệt đạo vàng tự xoa bóp: Mệnh Môn, Dũng Tuyền, Quan Nguyên…",
    "5 công thức dược thiện từ nguyên liệu chợ Việt — bổ thận sinh tinh",
    "Nghệ thuật \"Thất tổn – Bát ích\" — 7 điều hại, 8 điều lợi cổ nhân đúc kết",
    "Lộ trình 30 ngày có checklist, theo dõi tiến độ hằng ngày",
  ];
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 bg-gradient-to-br from-gold/20 to-imperial/10 blur-2xl" aria-hidden />
          <img
            src={coverImg}
            alt="21 Bí Kíp Phòng The Cổ Truyền"
            className="relative w-full max-w-md mx-auto rounded-sm shadow-2xl border border-gold/30"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
            Giới thiệu
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-4">
            21 Bí Kíp Phòng The Cổ Truyền
          </h2>
          <p className="font-serif italic text-xl text-gold mb-6">
            Dưỡng tinh — Cường thận — Hoà hợp phu thê.
          </p>
          <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-6">
            Cuốn sách chắt lọc tinh hoa từ 3 bộ kinh điển:{" "}
            <span className="font-serif text-imperial">Hoàng Đế Nội Kinh</span>{" "}
            (Thượng Cổ Thiên Chân Luận),{" "}
            <span className="font-serif text-imperial">Tố Nữ Kinh</span> và{" "}
            <span className="font-serif text-imperial">Phòng Trung Thuật</span>{" "}
            — biến thành 21 kỹ thuật thực hành đơn giản, an toàn, làm tại nhà,
            không cần thuốc, không cần dụng cụ.
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-imperial mb-4">
            Bạn sẽ học được:
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

/* -------------------------- 5. CHAPTERS / 21 BÍ KÍP -------------------------- */
const sections = [
  {
    n: "Phần 1",
    title: "Nền tảng — 25 trang đầu",
    items: [
      "Cơ chế Tinh – Khí – Thần trong đời sống vợ chồng",
      "5 sai lầm khiến đàn ông Việt suy nhược trước tuổi 40",
      "Quan niệm âm dương hoà hợp — hôn nhân là trao đổi năng lượng",
    ],
  },
  {
    n: "Nhóm A",
    title: "Dưỡng Tinh — 5 kỹ thuật",
    items: [
      "Hô hấp Đan Điền — phương pháp thở của các đạo gia",
      "Tư thế ngồi tĩnh \"Lục Tự Quyết\"",
      "Bài tập Kegel cổ truyền — \"Đề Cương Thuật\"",
      "Kỹ thuật giấc ngủ phục hồi tinh khí (giờ Tý – giờ Mão)",
      "Bí quyết \"Tiết – Nhập – Tàng\" trong sinh hoạt hằng ngày",
    ],
  },
  {
    n: "Nhóm B",
    title: "Cường Thận — 6 kỹ thuật",
    items: [
      "Xoa bóp huyệt Dũng Tuyền — suối nguồn sinh lực ở lòng bàn chân",
      "Vỗ huyệt Mệnh Môn — cánh cửa sinh mệnh sau lưng",
      "Bát Đoạn Cẩm — 8 thế cường thận của Nhạc Phi",
      "Khấu Xỉ – Lý Đầu — gõ răng, vuốt đầu mỗi sáng",
      "Ma Phúc — tự xoa bụng dưới theo chiều kim đồng hồ",
      "Đi bộ ngược — bí quyết của đạo sĩ núi Võ Đang",
    ],
  },
  {
    n: "Nhóm C",
    title: "Dược Thiện — 5 bài thuốc",
    items: [
      "Canh Hà Thủ Ô – Gà Ác — bổ thận âm",
      "Trà Nhân Sâm – Kỷ Tử — bổ thận dương",
      "Cháo Hạt Dẻ – Hồ Đào — món sáng cường thận",
      "Rượu thuốc Bát Trân — uống trước ngủ (liều nhỏ)",
      "Canh Đỗ Trọng – Đuôi Heo — bổ thận khí",
    ],
  },
  {
    n: "Nhóm D",
    title: "Hoà Hợp Phu Thê — 5 nguyên tắc (chương đắt giá nhất)",
    items: [
      "Tần suất theo độ tuổi — bảng chuẩn theo Tố Nữ Kinh",
      "Thời điểm trong tháng/năm theo 24 tiết khí",
      "Thất Tổn — 7 điều cần tránh để bảo tinh",
      "Bát Ích — 8 điều cần làm để dưỡng tinh",
      "Hoàn Tinh Bổ Não — kỹ thuật cao cấp nhất của đạo gia",
    ],
  },
  {
    n: "Phần 3",
    title: "Lộ trình 30 ngày — checklist từng tuần",
    items: [
      "Tuần 1: Làm quen + dưỡng tinh cơ bản",
      "Tuần 2: Thêm bài tập cường thận",
      "Tuần 3: Tích hợp dược thiện",
      "Tuần 4: Hoàn thiện toàn bộ hệ thống",
    ],
  },
];

function ChaptersSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Bên trong 120 trang
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
          21 bí kíp — chia làm 6 phần thực hành
        </h2>
        <Accordion
          type="multiple"
          defaultValue={["Nhóm A"]}
          className="space-y-3"
        >
          {sections.map((c) => (
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
                <ul className="space-y-2">
                  {c.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-base text-foreground/85 leading-relaxed"
                    >
                      <ArrowRight className="h-4 w-4 mt-1 text-imperial shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
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
      icon: Play,
      tag: "Bonus #1",
      title: "Video hướng dẫn 8 bài Bát Đoạn Cẩm",
      desc: "Quay trong studio, có phụ đề tiếng Việt, mỗi bài 3–5 phút. Tập theo dễ dàng tại nhà.",
      value: 99_000,
    },
    {
      icon: Download,
      tag: "Bonus #2",
      title: "Bảng theo dõi sinh lực 30 ngày",
      desc: "PDF in được. Mỗi ngày tự chấm 5 chỉ số: năng lượng, giấc ngủ, tinh thần, sinh lực, tâm trạng.",
      value: 99_000,
    },
    {
      icon: Clock,
      tag: "Bonus #3",
      title: "7 công thức dược thiện theo mùa",
      desc: "Mở rộng phần dược thiện: 7 món cho từng mùa Xuân – Hạ – Thu – Đông phù hợp khí hậu Việt Nam.",
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
    "Hơn 3 năm nghiên cứu — đối chiếu 7 bản dịch Tố Nữ Kinh, Phòng Trung Thuật từ Hán văn, Anh văn, Hàn văn",
    "2 lương y có chứng chỉ hành nghề Y học cổ truyền tại Việt Nam thẩm định toàn bộ nội dung",
    "Mọi bài thuốc, bài tập, dược liệu đều có thể tìm tại Việt Nam — không phải lý thuyết suông",
    "Trình bày dưới góc độ sức khoẻ – y học cổ truyền – wellness, không có nội dung khiêu dâm",
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
            "Đây không phải bản dịch khô khan. Đây là cuốn sách bạn có thể đọc
            đêm nay và áp dụng vào sáng mai."
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* -------------------------- 8. TESTIMONIALS -------------------------- */
const testimonials = [
  {
    text: "Tôi 42 tuổi, từng nghĩ mình phải sống chung với suy nhược. Sau 3 tuần áp dụng bài tập Mệnh Môn và canh Hà Thủ Ô, tôi dậy sớm hơn, ngủ sâu hơn — và quan trọng nhất là tự tin trở lại.",
    name: "Anh T.M",
    meta: "42 tuổi · Doanh nhân · Hà Nội",
  },
  {
    text: "Tôi mua cho chồng đọc, nhưng chính tôi cũng học được rất nhiều. Phần Bát Ích giúp vợ chồng tôi hiểu nhau hơn sau 15 năm.",
    name: "Chị H.L",
    meta: "38 tuổi · Giáo viên · Đà Nẵng",
  },
  {
    text: "Sách viết rất tinh tế. Không có một câu nào tục, mà vẫn truyền tải hết được tinh hoa. Đáng giá hơn 10 lần giá tiền.",
    name: "Anh N.K",
    meta: "47 tuổi · Bác sĩ Tây y · TP.HCM",
  },
  {
    text: "Tôi đã từng tốn gần 20 triệu cho thuốc bổ Hàn Quốc trong 2 năm. Giá như tôi đọc cuốn này sớm hơn.",
    name: "Anh P.D",
    meta: "51 tuổi · Hà Nội",
  },
  {
    text: "Bonus video Bát Đoạn Cẩm là phần tôi dùng hằng ngày. 10 phút mỗi sáng — cả ngày khoẻ khoắn.",
    name: "Anh V.A",
    meta: "36 tuổi · Cần Thơ",
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
          Đã được 142+ độc giả Việt kiểm chứng
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="font-serif italic text-base leading-relaxed text-foreground/90 flex-1">
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
    const KEY = "ebook:21-bi-kip:offer-deadline";
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
  const lines: { label: string; value: string }[] = [
    { label: "eBook chính · 120 trang", value: formatVnd(149_000) },
    { label: "Bonus #1 · Video Bát Đoạn Cẩm", value: formatVnd(99_000) },
    { label: "Bonus #2 · Bảng theo dõi 30 ngày", value: formatVnd(99_000) },
    { label: "Bonus #3 · 7 công thức dược thiện", value: formatVnd(99_000) },
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
          Ưu đãi ra mắt 7 ngày đầu
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
              Giá ra mắt chỉ
            </p>
            <p className="font-serif text-6xl md:text-7xl text-parchment tracking-tight">
              {formatVnd(PRICE_NOW)}
            </p>
            <p className="mt-2 text-sm text-parchment/70">
              Sau 7 ngày, giá chính thức{" "}
              <span className="line-through">{formatVnd(PRICE_FULL)}</span> ·
              Tiết kiệm{" "}
              <span className="text-jade font-medium">
                {formatVnd(TOTAL_VALUE - PRICE_NOW)}
              </span>
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
                <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Bảo mật tuyệt
                đối
              </span>
              <span>·</span>
              <span>Momo / VietQR / Stripe</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-gold" /> File qua email trong
                2 phút
              </span>
            </p>
            <p className="mt-2 text-[11px] text-parchment/60">
              Hoá đơn không hiện tên sản phẩm — bảo mật tuyệt đối
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
            Cam kết hoàn tiền 100% trong 14 ngày — không cần lý do
          </h2>
          <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-3">
            Đọc xong, áp dụng 14 ngày. Nếu sách không thực tế với bạn, không
            thấy thay đổi gì sau khi thực hành, hay đơn giản là không thích nội
            dung — gửi 1 email duy nhất, chúng tôi hoàn 100% trong 24h. Không
            hỏi lý do, không tranh cãi.
          </p>
          <p className="font-serif italic text-xl text-imperial">
            Rủi ro 0%. Bạn chỉ có thể được, không thể mất.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 11. DISCLAIMER -------------------------- */
function Disclaimer() {
  return (
    <section className="py-16 px-6 border-b border-border">
      <div className="mx-auto max-w-3xl border-2 border-gold/50 rounded-sm bg-card/60 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
          ⚠ Lưu ý quan trọng
        </p>
        <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
          Nội dung sách mang tính tham khảo về dưỡng sinh truyền thống Á Đông,
          dựa trên các kinh điển Đông y cổ.{" "}
          <strong>Sách KHÔNG thay thế chẩn đoán và điều trị của bác sĩ.</strong>
        </p>
        <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
          Nếu bạn có bệnh lý nền (tim mạch, tiểu đường, huyết áp, rối loạn nội
          tiết…) hoặc đang dùng thuốc kê toa — hãy tham vấn bác sĩ trước khi áp
          dụng các bài tập, bài thuốc trong sách.
        </p>
        <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
          Sách không chứa nội dung khiêu dâm. Toàn bộ trình bày dưới góc độ sức
          khoẻ – y học cổ truyền – wellness.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- 12. FAQ -------------------------- */
function FaqSection() {
  const faqs = [
    {
      q: "Tôi đã 55 tuổi, có muộn không?",
      a: "Không. Phần \"Lộ trình theo độ tuổi\" có chỉ dẫn riêng cho nhóm 50–70 tuổi. Người xưa nói: \"Sửa thận bất cứ lúc nào cũng chưa muộn.\"",
    },
    {
      q: "Sách dành cho nam hay nữ?",
      a: "Cả hai. Khoảng 70% nội dung trung tính cho cả nam và nữ. 30% có phần riêng cho từng giới (đặc biệt Nhóm D — Hoà hợp phu thê).",
    },
    {
      q: "Tôi đang dùng Viagra/Cialis, có dùng được không?",
      a: "Có thể dùng song song, nhưng nên giảm dần thuốc khi cơ thể phục hồi tự nhiên. Sách có phần \"Cai dần thuốc tăng lực hoá học\" ở chương 3.",
    },
    {
      q: "Bài thuốc có khó tìm nguyên liệu không?",
      a: "Tất cả nguyên liệu đều có ở chợ thuốc Bắc, siêu thị lớn, hoặc Shopee. Có sẵn danh sách nơi mua uy tín ở phụ lục.",
    },
    {
      q: "Có cần dùng đều cả 21 bí kíp không?",
      a: "Không. Sách hướng dẫn chọn 5–7 bí kíp phù hợp với thể trạng. Phần \"Tự chẩn đoán thể trạng\" ở đầu sách sẽ giúp bạn chọn đúng.",
    },
    {
      q: "Thanh toán có kín đáo không?",
      a: "Có. Hoá đơn chỉ hiện \"HoangDeNoiKinh - Sách điện tử\", không hiện tên chi tiết. Email gửi từ địa chỉ no-reply trung tính.",
    },
    {
      q: "Vợ/chồng tôi đọc cùng được không?",
      a: "Rất khuyến khích. Phần \"Hoà hợp phu thê\" được viết với giả định cả hai cùng đọc.",
    },
    {
      q: "Có bản in giấy không?",
      a: "Hiện chỉ có bản PDF. Bản in dự kiến Q4/2026.",
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

/* -------------------------- 13. FINAL CTA -------------------------- */
function FinalCta() {
  return (
    <section className="py-20 md:py-32 px-6 bg-ink text-parchment relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center"
        aria-hidden
      >
        <span className="font-calligraphy text-[24vw] text-gold leading-none whitespace-nowrap">
          精
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
              6 tháng sau, bạn vẫn ngủ không sâu, vẫn đau lưng mỏi gối, vẫn lo
              lắng âm thầm mỗi đêm. Vẫn loay hoay với thuốc bổ — và vẫn không
              biết mình đang đốt cạn bình dầu của chính mình.
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
              30 ngày sau, bạn dậy sớm hơn, ngủ sâu hơn, tự tin trở lại. Quan
              trọng nhất: bạn đã học được một hệ thống dưỡng sinh sẽ dùng đến
              tuổi 80.
            </p>
          </div>
        </div>
        <h3 className="text-center font-serif text-2xl md:text-3xl text-gold italic mb-3">
          Tinh khí không tự sinh ra — nhưng có thể được tích lại.
        </h3>
        <p className="text-center font-serif text-xl md:text-2xl text-parchment/85 italic mb-10">
          Tổ tiên ta đã biết cách. Giờ đến lượt bạn.
        </p>
        <div className="flex flex-col items-center">
          <CtaButton size="xl" pulse>
            Tôi muốn lấy lại sinh lực — {formatVnd(PRICE_NOW)}
          </CtaButton>
          <p className="mt-5 text-xs text-parchment/70 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Bảo mật tuyệt
              đối
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
          mang tính tham khảo dưỡng sinh truyền thống. Đối tượng đọc: từ 18
          tuổi trở lên. Không thay thế tư vấn y khoa.
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

  return (
    <CheckoutTrigger sizeClasses={sizeClasses} pulse={pulse}>
      {children}
    </CheckoutTrigger>
  );
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
          vào email của bạn trong 2 phút. Hoá đơn không hiện tên sản phẩm.
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
          href="mailto:hello@hoang-de-noi-kinh.com?subject=Đặt%20sách%2021%20Bí%20Kíp%20Phòng%20The%20Cổ%20Truyền"
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

/* -------------------------- Bank Transfer + QR -------------------------- */
const BANK_INFO = {
  bank: "MB Bank (Quân Đội)",
  account: "8873333333",
  holder: "CAO NHAT QUANG",
  content: "PT [Email của bạn]",
  amount: PRICE_NOW,
};

function BankTransferQr() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(true);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="border-2 border-gold/60 rounded-sm bg-card/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gold/10 border-b border-gold/30">
        <p className="text-xs uppercase tracking-[0.25em] text-gold flex items-center gap-2">
          <QrCode className="h-3.5 w-3.5" /> Chuyển khoản qua VietQR
        </p>
        <button
          type="button"
          onClick={() => setShowQr((v) => !v)}
          className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
        >
          {showQr ? "Ẩn QR" : "Hiện QR"}
        </button>
      </div>

      {showQr && (
        <div className="flex justify-center p-4 bg-background">
          <img
            src={qrPaymentImg}
            alt="Mã VietQR thanh toán MB Bank — Cao Nhat Quang 8873333333"
            className="w-48 h-auto rounded-sm shadow-md"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-4 space-y-2 text-sm">
        <Row label="Ngân hàng" value={BANK_INFO.bank} />
        <Row
          label="Số tài khoản"
          value={BANK_INFO.account}
          copyValue={BANK_INFO.account}
          copied={copied === "stk"}
          onCopy={() => copy("stk", BANK_INFO.account)}
          mono
        />
        <Row label="Chủ tài khoản" value={BANK_INFO.holder} />
        <Row
          label="Số tiền"
          value={formatVnd(BANK_INFO.amount)}
          copyValue={String(BANK_INFO.amount)}
          copied={copied === "amt"}
          onCopy={() => copy("amt", String(BANK_INFO.amount))}
          highlight
        />
        <Row
          label="Nội dung CK"
          value={BANK_INFO.content}
          copyValue="PT"
          copied={copied === "note"}
          onCopy={() => copy("note", "PT")}
          mono
        />
        <p className="text-[11px] text-muted-foreground pt-2 leading-relaxed">
          Sau khi chuyển khoản, vui lòng nhắn Zalo{" "}
          <span className="font-medium text-foreground">0708 684 608</span> kèm
          ảnh biên lai và email — chúng tôi gửi link tải PDF + bonus trong vòng
          5 phút.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  copyValue,
  copied,
  onCopy,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  copyValue?: string;
  copied?: boolean;
  onCopy?: () => void;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`truncate ${mono ? "font-mono" : "font-medium"} ${
            highlight ? "font-serif text-imperial text-base" : "text-foreground"
          }`}
        >
          {value}
        </span>
        {copyValue && onCopy && (
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1 text-[11px] text-imperial hover:text-imperial/80 border border-imperial/30 rounded-sm px-2 py-0.5 shrink-0"
            aria-label={`Sao chép ${label}`}
          >
            <Copy className="h-3 w-3" />
            {copied ? "Đã sao chép" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}
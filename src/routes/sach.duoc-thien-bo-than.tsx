import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChefHat,
  Clock,
  Copy,
  Download,
  FileText,
  Gift,
  Leaf,
  Mail,
  Play,
  QrCode,
  ShieldCheck,
  Star,
  Utensils,
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
import coverImg from "@/assets/ebook-duoc-thien-cover.jpg";
import qrPaymentImg from "@/assets/qr-payment-mb.png";

const PAGE_URL =
  "https://hoang-de-noi-kinh.lovable.app/sach/duoc-thien-bo-than";
const PRICE_NOW = 149_000;
const PRICE_FULL = 299_000;
const TOTAL_VALUE = 596_000;

export const Route = createFileRoute("/sach/duoc-thien-bo-than")({
  head: () => ({
    meta: [
      {
         title: "Dược Thiện Bổ Thận: 49 Món Ăn – Bài Thuốc Dưỡng Sinh Theo Mùa | Hoàng Đế Nội Kinh",
      },
      {
        name: "description",
        content:
          "eBook 75 trang, 49 món ăn — bài thuốc dưỡng sinh theo 4 mùa, nguyên liệu chợ Việt, làm tại nhà. Áp dụng Hoàng Đế Nội Kinh: ngũ hành – ngũ tạng – ngũ vị. Chỉ 149.000đ.",
      },
      {
        property: "og:title",
        content: "Dược Thiện Bổ Thận — 49 Món Ăn Dưỡng Sinh Theo Mùa",
      },
      {
        property: "og:description",
        content:
          "Thuốc bổ không bằng ăn bổ. 49 món dược thiện 4 mùa cho cả gia đình — chỉ 149.000đ.",
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
           name: "Dược Thiện Bổ Thận: 49 Món Ăn – Bài Thuốc Dưỡng Sinh Theo Mùa",
          description:
            "eBook 75 trang về dược thiện cổ truyền: 49 món ăn — bài thuốc theo 4 mùa, nguyên liệu chợ Việt.",
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
            ratingValue: "4.7",
            reviewCount: "96",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Tôi không biết nấu ăn, có làm theo được không?", acceptedAnswer: { "@type": "Answer", text: "Hoàn toàn được. Mỗi món có hướng dẫn từng bước, định lượng cụ thể bằng gram/muỗng/chén." } },
            { "@type": "Question", name: "Nguyên liệu thuốc Bắc có khó tìm không?", acceptedAnswer: { "@type": "Answer", text: "Tất cả vị thuốc đều có ở chợ thuốc Bắc, siêu thị lớn, hoặc Shopee/Tiki/Lazada." } },
            { "@type": "Question", name: "Có món cho người ăn chay không?", acceptedAnswer: { "@type": "Answer", text: "Có. Khoảng 20/49 món là chay hoặc có thể biến tấu chay." } },
            { "@type": "Question", name: "Phụ nữ mang thai có dùng được không?", acceptedAnswer: { "@type": "Answer", text: "Một số món có cảnh báo KHÔNG dùng khi mang thai. Sách ghi rõ ở từng món." } },
            { "@type": "Question", name: "Con tôi 5 tuổi có ăn được không?", acceptedAnswer: { "@type": "Answer", text: "Khoảng 15 món phù hợp cho trẻ em. Các món có vị thuốc mạnh không nên cho trẻ dưới 12 tuổi." } },
            { "@type": "Question", name: "Có bản in giấy không?", acceptedAnswer: { "@type": "Answer", text: "Hiện tại chỉ có PDF. Bản in dự kiến Q3/2026." } },
            { "@type": "Question", name: "Tôi có dị ứng thực phẩm, làm sao biết món nào tránh?", acceptedAnswer: { "@type": "Answer", text: "Mỗi món có mục Lưu ý kiêng kỵ liệt kê đối tượng nên tránh." } },
            { "@type": "Question", name: "Sách có thay thế bác sĩ không?", acceptedAnswer: { "@type": "Answer", text: "Không. Đây là sách dưỡng sinh ăn uống, không phải sách điều trị bệnh." } },
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
      <Insight />
      <Contents />
      <BonusSection />
      <Authority />
      <Testimonials />
      <OfferSection />
      <Guarantee />
      <FaqSection />
      <FinalCta />
      <SalesFooter />
    </SiteLayout>
  );
}

/* -------------------------- HERO -------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-ink text-parchment">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] select-none flex items-center justify-center"
        aria-hidden
      >
        <span className="font-calligraphy text-[28vw] leading-none text-gold whitespace-nowrap">
          藥膳
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 0%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 55%), radial-gradient(circle at 80% 90%, color-mix(in oklab, var(--imperial) 22%, transparent) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
        <div>
          <Badge className="bg-gold text-ink rounded-sm uppercase tracking-[0.25em] text-[10px]">
            eBook · Dược thiện 4 mùa
          </Badge>
          <p className="mt-6 font-serif italic text-lg text-parchment/70">
            Ông bà ta đã đúc kết suốt 4000 năm:
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] mt-3 text-parchment">
            "Thuốc bổ không bằng <span className="text-gold">ăn bổ.</span>"
          </h1>
          <p className="mt-6 text-lg md:text-xl text-parchment/85 leading-relaxed max-w-2xl">
            Nay được tổng hợp thành{" "}
            <span className="text-gold">49 món ăn dược thiện</span> — nguyên
            liệu chợ Việt, làm tại nhà. Cho cả gia đình bạn — từ ông bà, bố mẹ,
            đến chính bạn.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <CtaButton size="lg" href="#offer" pulse>
              Nhận sách ngay — chỉ {formatVnd(PRICE_NOW)}
            </CtaButton>
            <p className="text-sm text-parchment/70">
              Giá thường{" "}
              <span className="line-through decoration-imperial">
                {formatVnd(PRICE_FULL)}
              </span>{" "}
              · Ưu đãi ra mắt
            </p>
          </div>
          <div className="mt-10 flex items-start gap-3 max-w-xl">
            <Quote className="h-5 w-5 text-gold mt-1 shrink-0" />
            <p className="font-serif italic text-base md:text-lg text-parchment/90 leading-relaxed">
              "Cuốn sách nằm trên bàn bếp nhà tôi. Mỗi tuần đi chợ là tôi lại mở
              ra xem. Đáng giá hơn cả khoá học nấu ăn 2 triệu."
              <br />
              <span className="not-italic text-sm text-parchment/60">
                — Chị Hoa, 44 tuổi, Hà Nội
              </span>
            </p>
          </div>
          <p className="mt-6 text-xs text-parchment/60 flex flex-wrap gap-x-4 gap-y-1">
            <span>· Nhận file ngay sau thanh toán</span>
            <span>· Đọc trên điện thoại khi đi chợ</span>
            <span>· Tặng kèm 49 thẻ công thức in được</span>
          </p>
        </div>
        <div className="relative flex items-center justify-center lg:justify-end">
          <div
            className="absolute -inset-10 bg-gradient-to-tr from-imperial/30 via-transparent to-gold/30 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 translate-x-6 translate-y-6 bg-gold/30 rounded-sm"
              aria-hidden
            />
             <img
               src={coverImg}
               alt="Bìa sách Dược Thiện Bổ Thận: 49 Món Ăn – Bài Thuốc Dưỡng Sinh Theo Mùa"
               className="w-[260px] md:w-[340px] lg:w-[380px] h-auto rounded-sm shadow-2xl rotate-[-4deg] hover:rotate-0 transition-transform duration-700"
             />
            <span
              className="seal absolute -top-6 -right-6 text-base"
              aria-hidden
            >
              膳
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

/* -------------------------- PROBLEM -------------------------- */
function Problem() {
  const items = [
    "Cả nhà ăn ngon — nhưng vẫn mệt mỏi, thiếu năng lượng",
    "Tủ thuốc đầy TPCN, vitamin, viên bổ mà sức khoẻ không khá hơn",
    "Đi chợ mỗi ngày nhưng không biết nấu gì cho có chiều sâu dinh dưỡng",
    "Bố mẹ già đau lưng, mỏi gối, ngủ kém — muốn chăm sóc mà không biết cách",
    "Con trẻ hay ốm vặt, biếng ăn — uống thuốc bổ rồi vẫn không cải thiện",
    "Quanh đi quẩn lại cùng vài món — bữa cơm gia đình ngày càng nhạt",
    "Mỗi mùa đổi, cả nhà hắt hơi sổ mũi — không biết ăn gì để phòng",
  ];
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Có thể bạn đang ở đây
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
          Bạn có đang gặp một trong những vấn đề này?
        </h2>
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
          {items.map((s) => (
            <li key={s} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-imperial shrink-0" />
              <span className="text-base md:text-lg text-foreground/90 leading-relaxed">
                {s}
              </span>
            </li>
          ))}
        </ul>
        <h3 className="mt-12 font-serif text-2xl md:text-3xl text-imperial leading-snug">
          Vấn đề không nằm ở việc bạn ăn ít hay nhiều — mà ở việc bạn ăn ĐÚNG
          MÙA, ĐÚNG TẠNG, ĐÚNG NGƯỜI hay không.
        </h3>
      </div>
    </section>
  );
}

/* -------------------------- INSIGHT -------------------------- */
const seasonRows = [
  {
    season: "Xuân",
    organ: "Can (gan)",
    taste: "Chua",
    color: "Xanh",
    dish: "Canh kỷ tử – đậu đen",
  },
  {
    season: "Hạ",
    organ: "Tâm (tim)",
    taste: "Đắng",
    color: "Đỏ",
    dish: "Chè hạt sen – bách hợp",
  },
  {
    season: "Thu",
    organ: "Phế (phổi)",
    taste: "Cay",
    color: "Trắng",
    dish: "Lê chưng đường phèn",
  },
  {
    season: "Đông",
    organ: "Thận",
    taste: "Mặn",
    color: "Đen",
    dish: "Canh hà thủ ô – gà ác",
  },
  {
    season: "Trường hạ",
    organ: "Tỳ (lá lách)",
    taste: "Ngọt",
    color: "Vàng",
    dish: "Cháo bí đỏ – ý dĩ",
  },
];

function Insight() {
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Trí tuệ ngàn năm
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
          "Ăn bổ" không có nghĩa là ăn đắt tiền.
        </h2>
        <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-6">
          Hoàng Đế Nội Kinh dạy: cơ thể được nuôi dưỡng bởi quy luật{" "}
          <span className="font-serif text-imperial">
            Ngũ Hành – Ngũ Tạng – Ngũ Vị – Ngũ Sắc – Ngũ Mùa.
          </span>
        </p>
        <div className="overflow-x-auto border border-border rounded-sm bg-background mb-8">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-card/60 text-imperial">
              <tr className="text-left">
                <th className="px-4 py-3 font-serif">Mùa</th>
                <th className="px-4 py-3 font-serif">Tạng nuôi</th>
                <th className="px-4 py-3 font-serif">Vị nên ăn</th>
                <th className="px-4 py-3 font-serif">Màu sắc</th>
                <th className="px-4 py-3 font-serif">Ví dụ món</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {seasonRows.map((r) => (
                <tr key={r.season} className="hover:bg-card/30">
                  <td className="px-4 py-3 font-serif text-imperial">
                    {r.season}
                  </td>
                  <td className="px-4 py-3">{r.organ}</td>
                  <td className="px-4 py-3">{r.taste}</td>
                  <td className="px-4 py-3">{r.color}</td>
                  <td className="px-4 py-3 italic text-foreground/85">
                    {r.dish}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-serif italic text-xl md:text-2xl text-imperial leading-snug">
          Khi bạn ăn đúng theo mùa, cơ thể tự cân bằng. Gan thận tự phục hồi.
          Tinh khí tự đầy lên.
        </p>
        <p className="mt-3 text-base md:text-lg text-foreground/85">
          Không cần thuốc bổ đắt tiền. Chỉ cần biết đi chợ.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- CONTENTS / 49 MÓN -------------------------- */
const chapters = [
  {
    n: "Phần 1",
    title: "Lý thuyết nền — 20 trang ngắn gọn dễ hiểu",
    items: [
      "Ngũ Hành – Ngũ Tạng – Ngũ Vị: giải thích bằng ví dụ đời thường",
      "Tự nhận biết thể trạng: âm hư hay dương hư, khí huyết hư hay đàm thấp",
      "Bảng tự kiểm tra 20 câu hỏi → ra kết quả ngay",
      "7 nguyên tắc vàng khi nấu dược thiện (sai 1 cái là hỏng bài thuốc)",
      "Bảng tương khắc thực phẩm — món nào KHÔNG nên ăn cùng",
    ],
  },
  {
    n: "Mùa Xuân",
    title: "Dưỡng Can — 12 món",
    items: [
      "Canh Kỷ Tử – Đậu Đen — sáng mắt, bổ gan",
      "Trà Cúc – Kim Ngân — giải nhiệt mùa xuân",
      "Canh Rau Cần – Đậu Phụ — hạ huyết áp",
      "Cháo Đậu Xanh – Ý Dĩ — thanh nhiệt",
      "Gà Hấp Ngải Cứu — bổ khí huyết",
      "Canh Cá Diếc – Cải Cúc — nuôi tỳ vị",
      "… và 6 món khác",
    ],
  },
  {
    n: "Mùa Hạ",
    title: "Thanh Tâm — 12 món",
    items: [
      "Chè Hạt Sen – Bách Hợp – Đậu Xanh — kinh điển mùa hè",
      "Canh Bí Đao – Ý Dĩ – Đậu Đỏ — giải nhiệt, đẹp da",
      "Trà La Hán Quả — thanh nhiệt phế",
      "Cháo Củ Sen – Hạt Sen — an thần",
      "Canh Mướp Đắng Nhồi Thịt — hạ hoả",
      "Sữa Đậu Nành – Bí Đao — mát gan",
      "… và 6 món khác",
    ],
  },
  {
    n: "Mùa Thu",
    title: "Nhuận Phế — 12 món",
    items: [
      "Lê Chưng Đường Phèn – Xuyên Bối — trị ho khan",
      "Canh Tuyết Nhĩ – Táo Đỏ – Hạt Sen — bổ phổi, đẹp da",
      "Cháo Hạnh Nhân – Gừng — ấm phổi",
      "Canh Củ Cải Trắng – Sườn Heo — thông phế",
      "Chè Bí Đỏ – Đậu Phộng — bổ tỳ phế",
      "Trà Hồng Trà – Mật Ong – Gừng — phòng cảm cúm",
      "… và 6 món khác",
    ],
  },
  {
    n: "Mùa Đông",
    title: "Bổ Thận — 13 món (chương quan trọng nhất)",
    items: [
      "Canh Hà Thủ Ô – Gà Ác – Kỷ Tử — đại bổ thận âm",
      "Cháo Nhung Hươu – Gạo Nếp — bổ thận dương (món hoàng cung)",
      "Rượu Thuốc Bát Trân — uống nhỏ trước ngủ",
      "Canh Đỗ Trọng – Đuôi Heo — chắc lưng gối",
      "Cháo Hạt Dẻ – Hồ Đào — bổ thận sinh tinh",
      "Gà Tần Sâm – Táo Đỏ — món Tết cổ truyền",
      "Trà Ba Kích – Dâm Dương Hoắc — bổ thận dương",
      "Canh Thận Dê – Gừng — món bổ thận đỉnh cao",
      "… và 5 món khác",
    ],
  },
  {
    n: "Phần 3",
    title: "Phụ lục thực tiễn",
    items: [
      "Bảng tra 30 vị thuốc Bắc thông dụng tại Việt Nam — công dụng, liều lượng, kiêng kỵ",
      "Danh sách 15 địa chỉ chợ thuốc Bắc uy tín (Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ)",
      "Lịch ăn uống theo 24 tiết khí — mỗi 2 tuần một thực đơn mẫu",
    ],
  },
];

function Contents() {
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">
          Bên trong 75 trang
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-10">
          49 món — chia theo 4 mùa
        </h2>
        <Accordion
          type="multiple"
          defaultValue={["Mùa Đông"]}
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
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold pt-1 shrink-0 w-24">
                    {c.n}
                  </span>
                  <span className="font-serif text-lg md:text-xl text-foreground flex-1">
                    {c.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-28 pb-5">
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

/* -------------------------- BONUS -------------------------- */
function BonusSection() {
  const bonuses = [
    {
      icon: FileText,
      tag: "Bonus #1",
      title: "Bộ 49 Thẻ Công Thức In Được",
      desc: "PDF in ra đẹp như postcard, mỗi món 1 thẻ. Bỏ vào hộp gỗ để cạnh bếp — đi chợ về là rút thẻ làm theo. Quà tặng tuyệt vời cho mẹ, vợ, chị em.",
      value: 99_000,
    },
    {
      icon: Download,
      tag: "Bonus #2",
      title: "Danh Sách Mua Sắm Theo Tháng",
      desc: "12 file PDF tương ứng 12 tháng. Mỗi tháng có sẵn danh sách nguyên liệu cần mua — chỉ việc cầm điện thoại đi siêu thị/chợ.",
      value: 99_000,
    },
  ];
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-gold text-ink rounded-sm uppercase tracking-[0.25em] text-[10px] mb-4">
            <Gift className="h-3 w-3 mr-1.5" /> Quà tặng kèm
          </Badge>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">
            Khi mua hôm nay, bạn nhận thêm{" "}
            <span className="text-imperial">2 bonus</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tổng trị giá{" "}
              <span className="line-through">{formatVnd(198_000)}</span> —{" "}
            <span className="text-jade font-medium">MIỄN PHÍ</span>
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {bonuses.map(({ icon: Icon, tag, title, desc, value }) => (
            <article
              key={tag}
              className="ink-card rounded-sm p-6 border-2 border-gold/40 relative bg-background"
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

/* -------------------------- AUTHORITY / DIFFERENTIATION -------------------------- */
function Authority() {
  const compare = [
    ["Chỉ có công thức", "Có công thức + nguyên lý Đông y"],
    ["Một món cho mọi người", "Chọn món theo thể trạng từng người"],
    ["Không phân theo mùa", "Chia rõ 4 mùa – 24 tiết khí"],
    ["Nguyên liệu khó tìm", "Tất cả có ở chợ Việt"],
    ["Không có cơ sở y học", "Đối chiếu Hoàng Đế Nội Kinh"],
    ["Sách giấy nặng nề", "PDF mở bằng điện thoại khi đi chợ"],
  ];
  const credentials = [
    "3 năm nghiên cứu kinh điển dược thiện Trung Hoa và Việt Nam",
    "Cố vấn chuyên môn: 2 lương y có chứng chỉ + 1 chuyên gia dinh dưỡng",
    "Mỗi món được nấu thử ít nhất 3 lần tại bếp Việt Nam để chuẩn hoá",
    "Tất cả nguyên liệu đều có thể mua tại chợ Việt — không phải lý thuyết",
  ];
  return (
    <section className="py-20 md:py-28 px-6 border-b border-border">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4 text-center">
          Khác biệt
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-12 text-center">
          Vì sao cuốn sách này khác hàng ngàn sách nấu ăn ngoài kia?
        </h2>
        <div className="overflow-hidden border border-border rounded-sm mb-14">
          <div className="grid grid-cols-2 bg-card/60 text-sm uppercase tracking-[0.2em]">
            <div className="px-5 py-3 text-muted-foreground border-r border-border">
              Sách nấu ăn thường
            </div>
            <div className="px-5 py-3 text-gold">Cuốn này</div>
          </div>
          <ul className="divide-y divide-border">
            {compare.map(([a, b]) => (
              <li key={a} className="grid grid-cols-2">
                <div className="px-5 py-4 text-foreground/70 border-r border-border bg-background">
                  {a}
                </div>
                <div className="px-5 py-4 text-foreground bg-background flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-jade mt-1 shrink-0" />
                  <span>{b}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {credentials.map((c) => (
            <div
              key={c}
              className="flex items-start gap-3 border border-border rounded-sm p-5 bg-card/40"
            >
              <BadgeCheck className="h-5 w-5 text-jade mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/90 leading-relaxed">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- TESTIMONIALS -------------------------- */
const testimonials = [
  {
    text: "Tôi mua cho mẹ. Bà 68 tuổi, đau lưng kinh niên. Sau 2 tháng ăn canh Đỗ Trọng – Đuôi Heo tuần 2 lần, bà nói lưng đỡ hẳn. Đáng từng đồng.",
    name: "Anh Khôi",
    meta: "36 tuổi · TP.HCM",
  },
  {
    text: "Cuốn sách thay đổi cách tôi đi chợ. Trước đây mua theo cảm hứng, giờ mua theo mùa và theo thể trạng từng thành viên trong nhà.",
    name: "Chị Mai",
    meta: "39 tuổi · Hà Nội",
  },
  {
    text: "Tôi là bác sĩ Tây y. Ban đầu mua vì tò mò — đọc xong thấy phần lý thuyết âm dương ngũ hành được trình bày khoa học, không mê tín. Recommend cho bệnh nhân.",
    name: "Bs. Hoàng",
    meta: "42 tuổi · Đà Nẵng",
  },
  {
    text: "Phần Bonus 'Danh sách mua sắm theo tháng' là thứ tôi dùng nhiều nhất. Chỉ việc cầm điện thoại đi siêu thị — không phải nghĩ.",
    name: "Chị Linh",
    meta: "35 tuổi · Hải Phòng",
  },
  {
    text: "Con tôi 7 tuổi từng biếng ăn. Sau khi áp dụng cháo bí đỏ – ý dĩ và canh cá diếc cải cúc cho bé, ăn ngon hơn hẳn.",
    name: "Chị Trang",
    meta: "33 tuổi · Cần Thơ",
  },
];

function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-6 bg-card/40 border-b border-border">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4 text-center">
          Người đọc nói gì
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-12 text-center">
          Đã được 96+ gia đình Việt áp dụng
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="ink-card rounded-sm p-7 flex flex-col bg-background"
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

/* -------------------------- OFFER + COUNTDOWN -------------------------- */
function useCountdown() {
  const [now, setNow] = useState<number>(() => Date.now());
  const [deadline, setDeadline] = useState<number | null>(null);

  useEffect(() => {
    const KEY = "ebook:duoc-thien:offer-deadline";
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
    { label: "eBook 75 trang · 49 món dược thiện 4 mùa", value: formatVnd(199_000) },
    { label: "Bonus #1 · Bộ 49 Thẻ Công Thức", value: formatVnd(99_000) },
    { label: "Bonus #2 · Danh Sách Mua Sắm 12 Tháng", value: formatVnd(99_000) },
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
              Bằng 1 bữa cơm gia đình ở nhà hàng — nhưng dùng được trọn đời. Tiết
              kiệm{" "}
              <span className="text-jade font-medium">
                {formatVnd(TOTAL_VALUE - PRICE_NOW)}
              </span>
            </p>
          </div>
          <div className="mt-8">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-parchment/70 mb-4">
              Ưu đãi kết thúc sau
            </p>
            <div className="flex justify-center gap-3 md:gap-4" aria-live="polite">
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
                <ShieldCheck className="h-3.5 w-3.5 text-jade" /> Thanh toán bảo
                mật
              </span>
              <span>·</span>
              <span>Momo / VietQR / Stripe / ATM</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-gold" /> File qua email trong
                2 phút
              </span>
            </p>
            <p className="mt-2 text-[11px] text-parchment/60 flex items-center gap-1">
              <Utensils className="h-3 w-3" /> Mở trên điện thoại khi đi chợ —
              siêu tiện
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- GUARANTEE -------------------------- */
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
            Đọc xong, nấu thử ít nhất 3 món. Nếu sách không hữu ích với gia đình
            bạn, nguyên liệu khó tìm ở khu vực bạn, hay đơn giản là không thích
            nội dung — gửi 1 email duy nhất, chúng tôi hoàn 100% trong 24h.
            Không hỏi lý do.
          </p>
          <p className="font-serif italic text-xl text-imperial">
            Rủi ro 0%. Bạn có 14 ngày để dùng thoải mái.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- FAQ -------------------------- */
function FaqSection() {
  const faqs = [
    {
      q: "Tôi không biết nấu ăn, có làm theo được không?",
      a: "Hoàn toàn được. Mỗi món có hướng dẫn từng bước, định lượng cụ thể bằng gram/muỗng/chén — không có kiểu \"cho vừa ăn\".",
    },
    {
      q: "Nguyên liệu thuốc Bắc có khó tìm không?",
      a: "Tất cả vị thuốc trong sách đều có ở: Chợ thuốc Bắc (Hà Nội: Lãn Ông; TP.HCM: Hải Thượng Lãn Ông), siêu thị lớn (Aeon, Lotte, MM Mega Market), Shopee/Tiki/Lazada (có link gợi ý trong sách).",
    },
    {
      q: "Có món cho người ăn chay không?",
      a: "Có. Khoảng 20/49 món là chay hoặc có thể biến tấu chay (sách ghi rõ).",
    },
    {
      q: "Phụ nữ mang thai có dùng được không?",
      a: "Một số món có cảnh báo \"KHÔNG dùng khi mang thai\" (ví dụ: rượu bát trân, nhung hươu). Sách ghi rõ ở từng món.",
    },
    {
      q: "Con tôi 5 tuổi có ăn được không?",
      a: "Khoảng 15 món phù hợp cho trẻ em (sách đánh dấu rõ). Các món có vị thuốc mạnh thì không nên cho trẻ dưới 12 tuổi.",
    },
    {
      q: "Có bản in giấy không?",
      a: "Hiện tại chỉ có PDF. Bản in dự kiến Q3/2026 (giá ~399k).",
    },
    {
      q: "Tôi có dị ứng thực phẩm, làm sao biết món nào tránh?",
      a: "Mỗi món có mục \"Lưu ý kiêng kỵ\" liệt kê đối tượng nên tránh.",
    },
    {
      q: "Sách có thay thế bác sĩ không?",
      a: "Không. Đây là sách dưỡng sinh ăn uống, không phải sách điều trị bệnh. Mọi vấn đề bệnh lý cần gặp bác sĩ.",
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

/* -------------------------- FINAL CTA -------------------------- */
function FinalCta() {
  return (
    <section className="py-20 md:py-32 px-6 bg-ink text-parchment relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center"
        aria-hidden
      >
        <span className="font-calligraphy text-[24vw] text-gold leading-none whitespace-nowrap">
          膳
        </span>
      </div>
      <div className="relative mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4 text-center">
          Quyết định
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-parchment leading-tight text-center mb-12">
          Hôm nay bạn có 2 lựa chọn
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
              Tuần sau bạn vẫn đi chợ theo cảm hứng. Tủ thuốc vẫn đầy TPCN. Bố
              mẹ vẫn đau lưng. Con vẫn biếng ăn. Bữa cơm vẫn nhạt.
            </p>
          </div>
          <div className="border-2 border-gold rounded-sm p-8 bg-gradient-to-br from-imperial/30 to-transparent">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Lựa chọn 2
            </p>
            <h3 className="font-serif text-2xl text-parchment mb-4">
              Đầu tư {formatVnd(PRICE_NOW)} — bằng 1 bữa cơm tiệm.
            </h3>
            <p className="text-parchment/85 leading-relaxed">
              30 ngày sau, bạn đi chợ có chiến lược. Cả nhà ăn theo mùa, theo
              thể trạng. Bố mẹ khoẻ hơn. Con ăn ngon hơn. Bạn trở thành "người
              giữ sức khoẻ" của gia đình.
            </p>
          </div>
        </div>
        <h3 className="text-center font-serif text-2xl md:text-3xl text-gold italic mb-3">
          Trí tuệ của bà — trên bàn ăn của bạn.
        </h3>
        <div className="flex flex-col items-center mt-10">
          <CtaButton size="xl" pulse>
            Tôi muốn chăm sóc gia đình — {formatVnd(PRICE_NOW)}
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
          <strong className="text-foreground">Lưu ý:</strong> Nội dung sách mang
          tính tham khảo dưỡng sinh ăn uống cổ truyền. Không thay thế chẩn đoán
          hoặc điều trị y khoa. Người có bệnh nền nên tham vấn bác sĩ trước khi
          áp dụng các bài thuốc trong sách.
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
        <p className="text-[11px] text-muted-foreground/80 flex items-center justify-center gap-1">
          <Leaf className="h-3 w-3" /> 2026 Hoàng Đế Nội Kinh · Trí tuệ ngàn năm
          – Sức khoẻ trọn đời
        </p>
        <p className="text-[11px] text-muted-foreground/60 flex items-center justify-center gap-1">
          <ChefHat className="h-3 w-3" /> Bếp Việt · Gia đình Việt
        </p>
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
          Chọn một hình thức bên dưới — chúng tôi gửi link tải PDF + bonus vào
          email của bạn trong 2 phút.
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
          href="mailto:hello@hoang-de-noi-kinh.com?subject=Đặt%20sách%20Dược%20Thiện%20Bổ%20Thận"
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
  content: "DT [Email của bạn]",
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
          copyValue="DT"
          copied={copied === "note"}
          onCopy={() => copy("note", "DT")}
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
            className="text-muted-foreground hover:text-foreground p-1 rounded-sm"
            aria-label={`Sao chép ${label}`}
          >
            {copied ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-jade" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

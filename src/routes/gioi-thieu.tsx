import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { Sparkles, Users, Award, HeartHandshake } from "lucide-react";
import advisorMinh from "@/assets/advisor-minh.jpg";
import advisorHuong from "@/assets/advisor-huong.jpg";
import advisorLam from "@/assets/advisor-lam.jpg";

export const Route = createFileRoute("/gioi-thieu")({
  head: () => ({
    meta: [
      { title: "Giới thiệu — Hoàng Đế Nội Kinh" },
      { name: "description", content: "Sứ mệnh và đội ngũ cố vấn Đông y của Hoàng Đế Nội Kinh — Bí Kíp Dưỡng Sinh." },
      { property: "og:title", content: "Giới thiệu — Hoàng Đế Nội Kinh" },
      { property: "og:description", content: "Sứ mệnh và đội ngũ cố vấn Đông y." },
    ],
    links: [{ rel: "canonical", href: "/gioi-thieu" }],
  }),
  component: AboutPage,
});

const advisors = [
  {
    name: "Lương y Nguyễn Văn Minh",
    role: "Cố vấn trưởng — Y học cổ truyền",
    bio: "Tốt nghiệp Học viện Y học Cổ truyền Trung ương, giảng dạy tại nhiều trường y học cổ truyền trong nước.",
    photo: advisorMinh,
    quote:
      "Sau 40 năm hành nghề, tôi tin rằng Hoàng Đế Nội Kinh chứa đựng câu trả lời cho mọi vấn đề sức khỏe hiện đại.",
    stats: [
      { value: "40+", label: "năm kinh nghiệm" },
      { value: "10.000+", label: "bệnh nhân tư vấn" },
    ],
  },
  {
    name: "Bác sĩ Lê Thị Hương",
    role: "Chuyên gia Dược thiện",
    bio: "Tiến sĩ y học cổ truyền, tác giả nhiều công trình nghiên cứu về dược liệu Việt Nam.",
    photo: advisorHuong,
    quote:
      "Mỗi món ăn đúng cách là một thang thuốc — sức khoẻ bắt đầu từ căn bếp của mỗi gia đình.",
    stats: [
      { value: "20+", label: "năm nghiên cứu" },
      { value: "5.000+", label: "học viên hướng dẫn" },
    ],
  },
  {
    name: "Sư phụ Trần Đại Lâm",
    role: "Huấn luyện viên Khí công",
    bio: "Truyền nhân thế hệ thứ 5 dòng khí công Võ Đang, hơn 30 năm hành nghề.",
    photo: advisorLam,
    quote:
      "Khí công không phải phép màu — đó là kỷ luật mỗi ngày để cơ thể tự chữa lành theo cách của tự nhiên.",
    stats: [
      { value: "30+", label: "năm tu luyện" },
      { value: "2.000+", label: "học viên trực tiếp" },
    ],
  },
];

const trustStats = [
  { icon: Sparkles, value: "4.000+", label: "năm trí tuệ" },
  { icon: Users, value: "500+", label: "học viên" },
  { icon: Award, value: "3", label: "chuyên gia đầu ngành" },
  { icon: HeartHandshake, value: "98%", label: "hài lòng" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="py-24 px-6 border-b border-border">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4">Sứ mệnh</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Trí tuệ cổ truyền,<br /><em className="text-imperial">tôn vinh hôm nay</em></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hoàng Đế Nội Kinh ra đời với mong muốn khôi phục và lan toả tinh hoa Đông y dưỡng sinh đến với người Việt hiện đại.
            Chúng tôi tin rằng kinh điển y học cổ chứa đựng những bài học quý giá về sức khoẻ thể chất, tinh thần và đời sống lứa đôi
            mà thế giới đương đại đang dần đánh mất.
          </p>
        </div>
      </section>
      <section className="py-20 px-6 border-b border-border">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.4em] text-imperial mb-4 text-center">Tin cậy</p>
          <h2 className="font-serif text-4xl text-center mb-12">Tại sao tin tưởng chúng tôi</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {trustStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="ink-card rounded-sm p-6 text-center">
                  <Icon className="mx-auto mb-3 h-8 w-8 text-imperial" strokeWidth={1.5} />
                  <div className="font-serif text-3xl text-gold mb-1">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-card/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl text-center mb-16">Đội ngũ cố vấn</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {advisors.map((a) => (
              <div key={a.name} className="ink-card rounded-sm p-8 text-center flex flex-col">
                <div className="mx-auto mb-6 h-32 w-32 rounded-full overflow-hidden ring-2 ring-gold/60 ring-offset-4 ring-offset-card">
                  <img
                    src={a.photo}
                    alt={`Ảnh chân dung ${a.name}`}
                    width={256}
                    height={256}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-1">{a.name}</h3>
                <p className="text-xs uppercase tracking-wider text-gold mb-4">{a.role}</p>
                <div className="flex justify-center gap-6 mb-5">
                  {a.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-serif text-xl text-imperial">{s.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{a.bio}</p>
                <blockquote className="mt-auto border-l-2 border-imperial pl-4 text-left text-sm italic text-foreground/80 leading-relaxed">
                  “{a.quote}”
                  <footer className="mt-2 not-italic text-xs uppercase tracking-wider text-gold">— {a.name}</footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl mb-8 text-center">Cam kết của chúng tôi</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Học thuật nghiêm túc", body: "Mọi bản dịch và chú giải đều dựa trên các bản gốc đáng tin cậy, có ghi chú rõ ràng." },
              { title: "Tao nhã, không khiêu dâm", body: "Nội dung được trình bày trong khung văn hoá và y học, tránh tuyệt đối ngôn ngữ thô tục." },
              { title: "An toàn sức khoẻ", body: "Mọi phương pháp đều có lưu ý y tế, khuyến nghị tham khảo ý kiến chuyên gia khi cần." },
            ].map((c) => (
              <div key={c.title} className="border-l-2 border-gold pl-4">
                <h3 className="font-serif text-xl mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

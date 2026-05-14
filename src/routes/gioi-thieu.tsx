import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";

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
  { name: "Lương y Nguyễn Văn Minh", role: "Cố vấn trưởng — 40 năm kinh nghiệm", bio: "Tốt nghiệp Học viện Y học Cổ truyền Trung ương, giảng dạy tại nhiều trường y học cổ truyền trong nước." },
  { name: "Bác sĩ Lê Thị Hương", role: "Chuyên gia Dược thiện", bio: "Tiến sĩ y học cổ truyền, tác giả nhiều công trình nghiên cứu về dược liệu Việt Nam." },
  { name: "Sư phụ Trần Đại Lâm", role: "Huấn luyện viên Khí công", bio: "Truyền nhân thế hệ thứ 5 dòng khí công Võ Đang, hơn 30 năm hành nghề." },
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
      <section className="py-24 px-6 bg-card/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl text-center mb-16">Đội ngũ cố vấn</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {advisors.map((a) => (
              <div key={a.name} className="ink-card rounded-sm p-8 text-center">
                <div className="seal mx-auto mb-6">師</div>
                <h3 className="font-serif text-2xl mb-1">{a.name}</h3>
                <p className="text-xs uppercase tracking-wider text-gold mb-4">{a.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.bio}</p>
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

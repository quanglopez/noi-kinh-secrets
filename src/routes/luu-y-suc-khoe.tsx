import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-config";
import { AlertTriangle } from "lucide-react";
import { SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/luu-y-suc-khoe")({
  head: () => ({
    meta: [
      { title: "Lưu ý y tế — Hoàng Đế Nội Kinh" },
      { name: "description", content: "Lưu ý y tế quan trọng khi tham khảo nội dung dưỡng sinh trên website." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/luu-y-suc-khoe` }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <SiteLayout>
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="h-7 w-7 text-imperial" />
            <p className="text-xs uppercase tracking-[0.4em] text-imperial">Lưu ý quan trọng</p>
          </div>
          <h1 className="font-serif text-5xl mb-10">Lưu ý y tế</h1>
          <div className="prose prose-lg max-w-none font-serif text-foreground/90 space-y-6 leading-[1.85]">
            <p>Mọi nội dung trên website Hoàng Đế Nội Kinh — Bí Kíp Dưỡng Sinh chỉ mang tính chất <strong>tham khảo về văn hoá và dưỡng sinh cổ truyền</strong>, không có giá trị thay thế cho:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Chẩn đoán y khoa của bác sĩ chuyên môn</li>
              <li>Đơn thuốc và phác đồ điều trị từ cơ sở y tế</li>
              <li>Lời khuyên cá nhân hoá từ chuyên gia tâm lý hoặc tình dục học</li>
            </ul>
            <h2 className="font-serif text-3xl mt-10 mb-4">Trước khi áp dụng</h2>
            <p>Vui lòng tham khảo ý kiến của bác sĩ chuyên khoa, đặc biệt nếu bạn:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Đang điều trị bệnh mạn tính (tim mạch, tiểu đường, huyết áp...)</li>
              <li>Đang mang thai hoặc cho con bú</li>
              <li>Đang sử dụng thuốc tây y theo đơn</li>
              <li>Có tiền sử dị ứng với dược liệu</li>
            </ul>
            <h2 className="font-serif text-3xl mt-10 mb-4">Trách nhiệm</h2>
            <p>Hoàng Đế Nội Kinh không chịu trách nhiệm với bất kỳ hậu quả nào phát sinh từ việc áp dụng nội dung trên website mà không có sự hướng dẫn của chuyên gia y tế. Việc đọc và áp dụng là quyết định cá nhân của người dùng.</p>
            <h2 className="font-serif text-3xl mt-10 mb-4">Liên hệ khẩn cấp</h2>
            <p>Trong trường hợp khẩn cấp về sức khoẻ, vui lòng gọi <strong>115</strong> hoặc đến cơ sở y tế gần nhất. Đường dây nóng tư vấn sức khoẻ tâm thần: <strong>1800-599-920</strong>.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

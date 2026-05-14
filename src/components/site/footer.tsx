import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ink text-parchment mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="seal text-base">黃</span>
            <h3 className="font-serif text-2xl">Hoàng Đế Nội Kinh</h3>
          </div>
          <p className="mt-4 text-sm text-parchment/70 max-w-md">
            Trí tuệ ngàn năm về sức khoẻ, sinh lực và hạnh phúc lứa đôi — được dịch và chú giải bởi đội ngũ lương y, học giả Đông phương học Việt Nam.
          </p>
          <p className="mt-6 text-xs text-parchment/50 italic max-w-md">
            ⚠ Lưu ý y tế: Mọi nội dung trên website chỉ mang tính chất tham khảo về văn hoá và dưỡng sinh cổ truyền,
            không thay thế cho chẩn đoán hoặc tư vấn của bác sĩ chuyên môn. Vui lòng tham khảo ý kiến chuyên gia y tế trước khi áp dụng.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-base text-gold mb-4">Khám phá</h4>
          <ul className="space-y-2 text-sm text-parchment/70">
            <li><Link to="/thu-vien" className="hover:text-gold">Thư viện bài viết</Link></li>
            <li><Link to="/khoa-hoc" className="hover:text-gold">Khoá học</Link></li>
            <li><Link to="/cua-hang" className="hover:text-gold">Cửa hàng eBook</Link></li>
            <li><Link to="/hoi-vien" className="hover:text-gold">Gói thành viên</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-base text-gold mb-4">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm text-parchment/70">
            <li><Link to="/gioi-thieu" className="hover:text-gold">Về chúng tôi</Link></li>
            <li><Link to="/luu-y-suc-khoe" className="hover:text-gold">Lưu ý y tế</Link></li>
            <li><a href="mailto:lienhe@hoangdenoikinh.vn" className="hover:text-gold">Liên hệ</a></li>
            <li><a href="https://zalo.me/0708684608" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Tư vấn Zalo · 0708 684 608</a></li>
            <li><a href="#" className="hover:text-gold">Chính sách bảo mật</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-parchment/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-parchment/50">
          <p>© {new Date().getFullYear()} Hoàng Đế Nội Kinh. Bảo lưu mọi quyền.</p>
          <p className="font-calligraphy text-base text-gold">道法自然 · Đạo pháp tự nhiên</p>
        </div>
      </div>
    </footer>
  );
}

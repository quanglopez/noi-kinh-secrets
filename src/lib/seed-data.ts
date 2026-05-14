import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import article4 from "@/assets/article-4.jpg";
import article5 from "@/assets/article-5.jpg";
import article6 from "@/assets/article-6.jpg";
import ebook1 from "@/assets/ebook-1.jpg";
import ebook2 from "@/assets/ebook-2.jpg";
import ebook3 from "@/assets/ebook-3.jpg";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  isPremium: boolean;
  thumbnail: string;
  publishedAt: string;
  content: { heading: string; body: string }[];
  classicalQuote?: { han: string; pinyin: string; vietnamese: string };
};

export const categories = [
  "Dưỡng tinh",
  "Âm dương hoà hợp",
  "Khí công",
  "Dược thiện",
  "Tâm pháp",
  "Kinh điển chú giải",
];

export const articles: Article[] = [
  {
    slug: "nguyen-ly-am-duong-trong-doi-song-lua-doi",
    title: "Nguyên lý Âm Dương trong đời sống lứa đôi",
    excerpt: "Hiểu về sự cân bằng âm dương — nền tảng của sức khoẻ và hạnh phúc bền lâu theo Hoàng Đế Nội Kinh.",
    category: "Âm dương hoà hợp",
    readingTime: "8 phút",
    isPremium: false,
    thumbnail: article4,
    publishedAt: "2025-04-12",
    classicalQuote: {
      han: "陰陽者，天地之道也，萬物之綱紀，變化之父母，生殺之本始。",
      pinyin: "Yīn yáng zhě, tiān dì zhī dào yě, wàn wù zhī gāng jì, biàn huà zhī fù mǔ, shēng shā zhī běn shǐ.",
      vietnamese: "Âm Dương là đạo của trời đất, là cương kỷ của muôn vật, là cha mẹ của biến hoá, là gốc của sự sống chết.",
    },
    content: [
      { heading: "Âm Dương — hai mặt của một chỉnh thể", body: "Theo Hoàng Đế Nội Kinh, vạn vật trong vũ trụ đều mang trong mình hai khí đối lập nhưng tương sinh: Âm và Dương. Âm tượng trưng cho sự tĩnh, lạnh, hướng nội, hấp thu; Dương tượng trưng cho sự động, ấm, hướng ngoại, phát tán. Trong cơ thể con người, sự cân bằng giữa hai khí này quyết định sức khoẻ tổng thể, đặc biệt là sinh lực và tinh thần." },
      { heading: "Ứng dụng trong đời sống vợ chồng", body: "Sự hài hoà giữa nam (Dương) và nữ (Âm) không chỉ là vấn đề thể chất mà còn là sự đồng điệu năng lượng. Khi một bên quá mạnh hoặc quá yếu, mối quan hệ trở nên mất cân bằng, dẫn đến mệt mỏi, căng thẳng. Cổ nhân khuyên: nên tu dưỡng bản thân trước khi hoà hợp với bạn đời." },
      { heading: "Bài tập thực hành mỗi ngày", body: "Mỗi sáng dành 15 phút thở sâu hướng vào đan điền, hình dung khí Dương đi lên, khí Âm đi xuống. Buổi tối, ngâm chân nước ấm pha gừng và quế giúp dẫn khí về nguyên gốc, hỗ trợ giấc ngủ và tinh khí." },
    ],
  },
  {
    slug: "duoc-thien-bo-than-tu-nhien",
    title: "Dược thiện bổ thận — Thực đơn cổ truyền",
    excerpt: "Bộ ba dược liệu quý: nhân sâm, kỷ tử, hà thủ ô và cách kết hợp trong bữa ăn hàng ngày.",
    category: "Dược thiện",
    readingTime: "12 phút",
    isPremium: false,
    thumbnail: article2,
    publishedAt: "2025-04-08",
    content: [
      { heading: "Thận — gốc của tinh khí", body: "Trong Đông y, thận được xem là 'tiên thiên chi bản' — gốc rễ của sự sống. Thận khoẻ thì tinh thần minh mẫn, sinh lực dồi dào, tóc đen, răng chắc. Thận yếu dẫn đến mệt mỏi, đau lưng, suy giảm sinh lý." },
      { heading: "Ba dược liệu cốt lõi", body: "Nhân sâm Cao Ly bồi bổ nguyên khí, kỷ tử Ninh Hạ dưỡng can thận, hà thủ ô đỏ giúp đen tóc bổ huyết. Khi kết hợp đúng tỉ lệ trong cháo, súp hoặc trà, tạo nên công thức bổ thận tráng dương an toàn cho cả nam và nữ." },
      { heading: "Công thức cháo dưỡng sinh", body: "Gạo tẻ 100g, kỷ tử 15g, hà thủ ô 10g, táo đỏ 5 quả, nhân sâm 3g. Nấu nhỏ lửa 1 giờ, dùng vào buổi sáng. Liên tục 21 ngày sẽ cảm nhận sự khác biệt rõ rệt về năng lượng." },
    ],
  },
  {
    slug: "khi-cong-co-truyen-cho-nguoi-moi-bat-dau",
    title: "Khí công cổ truyền cho người mới bắt đầu",
    excerpt: "Bài tập 7 động tác đơn giản giúp lưu thông khí huyết, dưỡng tinh và tăng sinh lực.",
    category: "Khí công",
    readingTime: "10 phút",
    isPremium: false,
    thumbnail: article3,
    publishedAt: "2025-04-02",
    content: [
      { heading: "Khí — sinh mệnh của muôn loài", body: "Khí công là nghệ thuật điều khiển hơi thở và năng lượng nội tại. Người tập khí công đều đặn không chỉ khoẻ về thể chất mà còn an định về tinh thần, tăng cường khả năng tập trung và sinh lực." },
      { heading: "Tư thế chuẩn bị", body: "Đứng thẳng, hai chân rộng bằng vai, đầu gối hơi chùng. Lưỡi chạm vòm họng, mắt khép hờ, tâm tưởng về đan điền — vị trí dưới rốn 3 ngón tay." },
      { heading: "Bảy động tác cơ bản", body: "1. Hít vào nâng tay lên đầu, thở ra hạ tay xuống. 2. Xoay hông theo chiều kim đồng hồ. 3. Vươn người chạm chân. 4. Đẩy hai tay sang ngang như đẩy mây. 5. Đứng tấn thấp giữ 30 giây. 6. Xoa hai lòng bàn tay vào nhau rồi áp lên thận. 7. Ngồi thiền 5 phút điều hoà hơi thở." },
    ],
  },
  {
    slug: "to-nu-kinh-bi-an-cua-su-hoa-hop",
    title: "Tố Nữ Kinh — Bí ẩn của sự hoà hợp",
    excerpt: "Khám phá tinh hoa Tố Nữ Kinh — kinh điển 2000 năm về sự hài hoà tinh tế giữa nam và nữ.",
    category: "Kinh điển chú giải",
    readingTime: "15 phút",
    isPremium: true,
    thumbnail: article1,
    publishedAt: "2025-03-28",
    content: [
      { heading: "Bối cảnh lịch sử", body: "Tố Nữ Kinh được cho là tác phẩm thời Hán, ghi lại các cuộc đàm luận giữa Hoàng Đế và ba vị nữ thần Tố Nữ, Huyền Nữ, Thái Nữ về nghệ thuật dưỡng sinh và hài hoà nam nữ." },
      { heading: "Nguyên tắc 'Cố Tinh'", body: "Cốt lõi của Tố Nữ Kinh là khái niệm 'cố tinh' — giữ gìn tinh khí. Cổ nhân tin rằng tinh khí là tài sản quý nhất của cơ thể, cần được bảo dưỡng và sử dụng thông minh." },
    ],
  },
  {
    slug: "kinh-mach-trong-hoang-de-noi-kinh",
    title: "Kinh mạch trong Hoàng Đế Nội Kinh",
    excerpt: "Hệ thống 12 kinh mạch chính và mối liên hệ với sinh lực, tinh thần — phần dành cho học giả.",
    category: "Kinh điển chú giải",
    readingTime: "20 phút",
    isPremium: true,
    thumbnail: article5,
    publishedAt: "2025-03-20",
    content: [
      { heading: "Mười hai kinh mạch chính", body: "Cơ thể con người có 12 kinh mạch chính tương ứng với 12 tạng phủ, vận hành theo nhịp thời gian trong ngày." },
    ],
  },
  {
    slug: "tra-thao-moc-duong-sinh-moi-ngay",
    title: "Trà thảo mộc dưỡng sinh mỗi ngày",
    excerpt: "9 công thức trà cổ truyền giúp tĩnh tâm, bổ khí và cân bằng năng lượng theo từng mùa.",
    category: "Dược thiện",
    readingTime: "9 phút",
    isPremium: true,
    thumbnail: article6,
    publishedAt: "2025-03-15",
    content: [
      { heading: "Trà — đạo của người dưỡng sinh", body: "Trà không chỉ là thức uống mà là một phương pháp tu dưỡng. Mỗi loại trà có công năng riêng, phù hợp với từng thể trạng và mùa trong năm." },
    ],
  },
];

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "ebook" | "course";
  cover: string;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  {
    id: "ebook-noi-kinh",
    title: "Hoàng Đế Nội Kinh chú giải — trọn bộ",
    description: "Bản dịch và chú giải đầy đủ Tố Vấn và Linh Khu, kèm minh hoạ kinh mạch và bảng tra cứu thuật ngữ. 480 trang PDF chất lượng cao.",
    price: 499000,
    type: "ebook",
    cover: ebook1,
    rating: 4.9,
    reviews: 218,
  },
  {
    id: "ebook-khi-cong",
    title: "21 bài khí công phòng the cổ truyền",
    description: "Tuyển tập 21 bài tập khí công truyền thống, hướng dẫn từng bước với hình minh hoạ và video demo đi kèm.",
    price: 299000,
    type: "ebook",
    cover: ebook2,
    rating: 4.8,
    reviews: 142,
  },
  {
    id: "ebook-duoc-thien",
    title: "Thực đơn dược thiện bổ thận 30 ngày",
    description: "30 công thức món ăn — bài thuốc dễ làm tại nhà, sử dụng dược liệu Việt Nam, kèm bảng phân chia theo thể trạng.",
    price: 199000,
    type: "ebook",
    cover: ebook3,
    rating: 4.7,
    reviews: 96,
  },
];

export type Course = {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  instructor: string;
  price: number;
  cover: string;
  progress?: number;
};

export const courses: Course[] = [
  {
    id: "khoa-co-ban",
    title: "Nhập môn Hoàng Đế Nội Kinh",
    description: "Khoá học 12 buổi giúp bạn nắm vững triết lý nền tảng và ứng dụng vào đời sống hàng ngày.",
    lessons: 12,
    duration: "6 giờ",
    instructor: "Lương y Nguyễn Văn Minh",
    price: 1490000,
    cover: article1,
    progress: 0,
  },
  {
    id: "khoa-khi-cong",
    title: "Khí công dưỡng sinh 30 ngày",
    description: "Lộ trình 30 ngày luyện khí công cùng huấn luyện viên, có cộng đồng hỗ trợ và phản hồi cá nhân.",
    lessons: 30,
    duration: "10 giờ",
    instructor: "Sư phụ Trần Đại Lâm",
    price: 990000,
    cover: article3,
  },
  {
    id: "khoa-duoc-thien",
    title: "Dược thiện thực hành",
    description: "Học cách phối thuốc và nấu các món ăn — bài thuốc bổ dưỡng theo Đông y cổ truyền.",
    lessons: 18,
    duration: "8 giờ",
    instructor: "Bác sĩ Lê Thị Hương",
    price: 1290000,
    cover: article2,
  },
];

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

// --- Internal linking helpers ---------------------------------------------

const STOP_WORDS = new Set([
  "và","của","trong","là","cho","với","theo","để","khi","các","những","một","mỗi",
  "này","đó","hay","hoặc","như","đã","sẽ","được","từ","về","nên","cũng","có","không",
  "thì","mà","vì","do","trên","dưới","sau","trước","đến","đi","ra","vào","cùng",
  "the","and","of","in","to","a","for","with",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function articleKeywords(a: Article): Set<string> {
  return new Set(tokenize(`${a.title} ${a.excerpt} ${a.category}`));
}

/**
 * Score articles by shared category + keyword overlap, return top N excluding self.
 */
export function getRelatedArticles(current: Article, limit = 4): Article[] {
  const currentKw = articleKeywords(current);
  const scored = articles
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const kw = articleKeywords(a);
      let overlap = 0;
      kw.forEach((w) => {
        if (currentKw.has(w)) overlap += 1;
      });
      const categoryBonus = a.category === current.category ? 4 : 0;
      return { article: a, score: overlap + categoryBonus };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.article);
}

/**
 * Suggest 1–2 contextual internal links for a given content section based on
 * keyword overlap between the section body and other articles.
 */
export function getContextualLinks(
  current: Article,
  sectionText: string,
  limit = 2
): Article[] {
  const sectionKw = new Set(tokenize(sectionText));
  if (sectionKw.size === 0) return [];
  const scored = articles
    .filter((a) => a.slug !== current.slug)
    .map((a) => {
      const kw = articleKeywords(a);
      let overlap = 0;
      kw.forEach((w) => {
        if (sectionKw.has(w)) overlap += 1;
      });
      return { article: a, score: overlap };
    })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.article);
}

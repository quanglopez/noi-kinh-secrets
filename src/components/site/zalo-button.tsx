import { MessageCircle } from "lucide-react";

const ZALO_URL = "https://zalo.me/0708684608";

export function ZaloButton() {
  return (
    <a
      href={ZALO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tư vấn qua Zalo"
      title="Tư vấn miễn phí qua Zalo"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#0068ff] px-4 py-3 text-white shadow-lg shadow-[#0068ff]/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#0068ff]/40 focus:outline-none focus:ring-2 focus:ring-[#0068ff] focus:ring-offset-2 focus:ring-offset-background"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/30" aria-hidden />
        <MessageCircle className="h-5 w-5 fill-white" />
      </span>
      <span className="hidden text-sm font-medium tracking-wide sm:inline">
        Tư vấn Zalo
      </span>
    </a>
  );
}
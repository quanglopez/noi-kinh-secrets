import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { to: "/", label: "Trang chủ" },
  { to: "/thu-vien", label: "Thư viện" },
  { to: "/khoa-hoc", label: "Khoá học" },
  { to: "/cua-hang", label: "Cửa hàng" },
  { to: "/hoi-vien", label: "Hội viên" },
  { to: "/gioi-thieu", label: "Giới thiệu" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="seal text-base">黃</span>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold">Hoàng Đế Nội Kinh</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Bí kíp dưỡng sinh</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-imperial ${
                path === n.to ? "text-imperial" : "text-foreground/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/tai-khoan">
            <Button variant="ghost" size="sm">Đăng nhập</Button>
          </Link>
          <Link to="/hoi-vien">
            <Button size="sm" className="bg-imperial text-primary-foreground hover:bg-imperial/90">
              Đăng ký
            </Button>
          </Link>
        </div>
        <div className="lg:hidden flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/50 bg-background/95">
          <div className="px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm hover:bg-muted rounded"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/tai-khoan" onClick={() => setOpen(false)} className="px-3 py-2 text-sm hover:bg-muted rounded">
              Đăng nhập / Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

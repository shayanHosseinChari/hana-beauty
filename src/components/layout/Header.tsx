"use client";

import { RippleButton } from "@/components/ui/RippleButton";

const NAV_ITEMS = [
  ["فروشگاه", "#shop"],
  ["روتین هوشمند", "#routine"],
  ["ترکیبات", "#science"],
  ["سؤالات", "#faq"],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#F0E1DC]/80 bg-[#FDF7F5]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border border-[#A67C52] bg-[#FFF8F6] text-xl text-[#A67C52] transition-transform group-hover:rotate-6">
            H
          </span>
          <span className="leading-none">
            <span className="block text-xl font-semibold tracking-tight">Hana</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[.3em] text-[#A67C52]">
              Beauty
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-[#6B5350] md:flex">
          {NAV_ITEMS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative py-2 transition-colors hover:text-[#3D2C2A] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-right after:scale-x-0 after:bg-[#D9827C] after:transition-transform hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <RippleButton variant="outlined" className="hidden sm:inline-flex">
            ورود / ثبت‌نام
          </RippleButton>
          <RippleButton>مشاوره پوست</RippleButton>
        </div>
      </div>
    </header>
  );
}
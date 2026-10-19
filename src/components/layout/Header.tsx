"use client";

import { useState, useEffect } from "react";
import { RippleButton } from "@/components/ui/RippleButton";

const NAV_ITEMS = [
  ["فروشگاه", "#shop"],
  ["روتین هوشمند", "#routine"],
  ["ترکیبات", "#science"],
  ["سؤالات", "#faq"],
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3); // بعداً به context/store وصل کن
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#E8D5CE] bg-[#FDF7F5]/95 shadow-[0_8px_32px_-12px_rgba(217,130,124,0.25)] backdrop-blur-2xl"
          : "border-b border-transparent bg-gradient-to-b from-[#FDF7F5] to-[#FDF7F5]/60 backdrop-blur-md"
      }`}
    >
      {/* خط تزئینی بالایی - لوکس */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D9827C] to-transparent opacity-60" />

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        {/* لوگو */}
        <a href="#" className="group flex shrink-0 items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D9827C]/20 blur-xl transition-all duration-500 group-hover:bg-[#D9827C]/40 group-hover:blur-2xl" />
            <img
              src="/logo.png"
              fetchPriority="high"
              alt="logo"
              width={140}
              height={50}
            />
          </div>
        </a>

        {/* نویگیشن دسکتاپ */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative rounded-full px-4 py-2 text-sm font-medium text-[#6B5350] transition-colors duration-300 hover:text-[#3D2C2A]"
            >
              <span className="relative z-10">{label}</span>
              <span className="absolute inset-0 scale-90 rounded-full bg-[#F5E6E1] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              <span className="absolute bottom-1.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#D9827C] transition-all duration-300 group-hover:w-6" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="سبد خرید"
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E8D5CE] bg-white/70 text-[#6B5350] backdrop-blur transition-all duration-300 hover:border-[#D9827C]/60 hover:bg-white hover:text-[#D9827C] hover:shadow-[0_4px_20px_-4px_rgba(217,130,124,0.4)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
            {cartCount > 0 && (
              <>
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-[#D9827C] to-[#C46A64] px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-[#FDF7F5] transition-transform duration-300 group-hover:scale-110">
                  {cartCount}
                </span>
                <span className="absolute -right-0.5 -top-0.5 h-5 w-5 animate-ping rounded-full bg-[#D9827C]/40" />
              </>
            )}
          </button>

         
         <div className="hidden md:flex gap-3.5 align-middle">
             <RippleButton
            variant="outlined"
            className="hidden items-center gap-2 border-[#E8D5CE] text-[#6B5350] lg:inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            ورود / ثبت‌نام
          </RippleButton>

          <RippleButton className="relative hidden overflow-hidden bg-gradient-to-br from-[#D9827C] to-[#C46A64] shadow-[0_4px_20px_-4px_rgba(217,130,124,0.6)] transition-shadow duration-300 hover:shadow-[0_8px_28px_-6px_rgba(217,130,124,0.7)] lg:inline-flex">
            <span className="relative z-10 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                />
              </svg>
              مشاوره پوست
            </span>
          </RippleButton>
         </div>

          {/* منوی موبایل */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="منو"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8D5CE] bg-white/70 text-[#6B5350] backdrop-blur transition-colors hover:border-[#D9827C]/60 hover:text-[#D9827C] lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5 transition-transform duration-300"
              style={{ transform: mobileOpen ? "rotate(90deg)" : "none" }}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      <div
        className={`overflow-hidden border-t border-[#F0E1DC]/80 bg-[#FDF7F5]/98 backdrop-blur-xl transition-all duration-400 lg:hidden ${
          mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {NAV_ITEMS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#6B5350] transition-colors hover:bg-[#F5E6E1] hover:text-[#3D2C2A]"
            >
              {label}
            </a>
          ))}

          {/* دکمه‌ها در موبایل */}
          <div className="mt-3  flex hi flex-col gap-2.5 border-t border-[#F0E1DC]/80 pt-4">
            <RippleButton
              variant="outlined"
              className="w-full border-[#E8D5CE]"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              ورود / ثبت‌نام
            </RippleButton>

            <RippleButton
              className="w-full bg-gradient-to-br from-[#D9827C] to-[#C46A64] shadow-[0_4px_20px_-4px_rgba(217,130,124,0.6)]"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                />
              </svg>
              مشاوره پوست
            </RippleButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
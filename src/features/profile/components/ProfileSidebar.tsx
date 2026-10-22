// src/features/profile/components/ProfileSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Tab = {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
};

const TABS: Tab[] = [
  {
    key: "dashboard",
    label: "داشبورد",
    href: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M4.5 9.75V21h15V9.75" />
      </svg>
    ),
  },
  {
    key: "orders",
    label: "سفارش‌ها",
    href: "/profile/orders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 2.25h12l2.25 4.5v15H3.75v-15L6 2.25zM3.75 6.75h16.5M9.75 11.25h4.5" />
      </svg>
    ),
  },
  {
    key: "wishlist",
    label: "علاقه‌مندی",
    href: "/profile/wishlist",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    key: "addresses",
    label: "آدرس‌ها",
    href: "/profile/addresses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    key: "account",
    label: "حساب",
    href: "/profile/account",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0" />
      </svg>
    ),
  },
];

type Props = {
  userName: string;
  userPhone: string;
};

export function ProfileSidebar({ userName, userPhone }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/profile" ? pathname === "/profile" : pathname.startsWith(href);

  return (
    <>
      <aside
        dir="rtl"
        className="hidden sticky top-20 h-max w-64 shrink-0 lg:block"
      >
        <div
          className="relative overflow-hidden rounded-[28px] border border-[#EAD8D4]/60 bg-white/70 p-5 backdrop-blur-xl"
          style={{
            boxShadow:
              "0 0 0 1px rgba(180,110,100,0.05), 0 12px 40px -12px rgba(180,110,100,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* درخشش بالا */}
          <div className="pointer-events-none absolute -top-16 right-0 h-32 w-32 rounded-full bg-[#F5D9D2]/50 blur-3xl" />

          {/* ── پروفایل ── */}
          <div className="relative flex items-center gap-3 border-b border-[#EAD8D4]/60 pb-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm text-white"
              style={{
                background: "linear-gradient(135deg, #E29B95, #C46A64)",
                boxShadow: "0 4px 16px -2px rgba(196,106,100,0.45)",
              }}
            >
              {userName.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm tracking-tight text-[#2A1E1C]">{userName}</p>
              <p className="truncate text-[10px] tracking-wide text-[#A78A85]">{userPhone}</p>
            </div>
          </div>

          {/* ── ناوبری ── */}
          <nav className="relative mt-4 flex flex-col gap-1">
            {TABS.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-3 py-2.5 text-[13px] transition-colors duration-300"
                >
                  {/* بک‌گراند اکتیو */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      active
                        ? "bg-[#3D2C2A] opacity-100"
                        : "scale-95 bg-[#FDF7F5] opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />

                  {/* نشانگر کناری */}
                  <span
                    aria-hidden="true"
                    className={`absolute right-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-[#D9827C] transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      active ? "text-[#E8C4BE]" : "text-[#A78A85] group-hover:text-[#6B5350]"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      active ? "text-white" : "text-[#6B5350] group-hover:text-[#2A1E1C]"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#EAD8D4] to-transparent" />

          <button
            type="button"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#EAD8D4] py-2.5 text-[12px] tracking-wide text-[#C46A64] transition-colors duration-300 hover:border-[#D9827C]/50 hover:text-[#B5544E]"
          >
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3.5A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14H6M10.5 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            خروج از حساب
          </button>
        </div>
      </aside>

      {/* ===== Bottom Tab Navigator موبایل ===== */}
      <nav
        dir="rtl"
        aria-label="ناوبری پنل کاربری"
        className="fixed inset-x-0 bottom-0 z-40 h-16 overflow-hidden border-t border-[#EAD8D4]/60 bg-white/90 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="mx-auto flex h-16 max-w-lg items-stretch justify-between px-2">
          {TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <li key={tab.key} className="flex h-16 flex-1 items-center">
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative flex h-16 w-full flex-col items-center justify-center gap-0.5 rounded-2xl px-1 transition-colors duration-300"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-1 inset-y-1.5 rounded-2xl transition-all duration-300 ${
                      active
                        ? "scale-100 bg-[#F5E6E1]/80 opacity-100"
                        : "scale-90 opacity-0 group-hover:bg-[#FDF7F5] group-hover:opacity-100"
                    }`}
                  />

                  <span
                    className={`relative z-10 flex h-7 w-7 items-center justify-center transition-all duration-300 ${
                      active
                        ? "-translate-y-0.5 text-[#D9827C]"
                        : "text-[#A78A85] group-hover:text-[#6B5350]"
                    }`}
                  >
                    {tab.icon}
                  </span>

                  <span
                    className={`relative z-10 text-[9px] leading-none transition-colors duration-300 ${
                      active ? "text-[#3D2C2A]" : "text-[#A78A85]"
                    }`}
                  >
                    {tab.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`absolute top-0 h-0.5 w-6 rounded-full bg-[#D9827C] transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

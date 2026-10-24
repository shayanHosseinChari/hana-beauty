// src/features/admin/components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    key: "dashboard",
    label: "داشبورد",
    href: "/admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M4.5 9.75V21h15V9.75" />
      </svg>
    ),
  },
   {
    key: "brands",
    label: "برندها",
    href: "/admin/brands",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    key: "categories",
    label: "دسته‌بندی‌ها",
    href: "/admin/categories",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    key: "users",
    label: "کاربران",
    href: "/admin/users",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    key: "products",
    label: "محصولات",
    href: "/admin/products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    key: "orders",
    label: "سفارش‌ها",
    href: "/admin/orders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 2.25h12l2.25 4.5v15H3.75v-15L6 2.25zM3.75 6.75h16.5M9.75 11.25h4.5" />
      </svg>
    ),
  },
  {
    key: "tickets",
    label: "تیکت‌ها",
    href: "/admin/tickets",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* سایدبار دسکتاپ */}
      <aside
        dir="rtl"
        className="hidden h-max sticky top-20 w-64 shrink-0 flex-col gap-4 rounded-3xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur lg:flex"
      >
        <div className="flex items-center gap-3 border-b border-[#F0E1DC] pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3D2C2A] to-[#2A1E1C] text-sm  text-white">
            A
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm  text-[#3D2C2A]">پنل مدیریت</p>
            <p className="truncate text-[10px] text-[#A78A85]">مدیر سیستم</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${
                  active
                    ? "bg-[#F5E6E1] text-[#3D2C2A] "
                    : "text-[#6B5350] hover:bg-[#FDF7F5]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="mt-2 rounded-xl border border-[#E8D5CE] py-2 text-center text-xs text-[#6B5350] transition hover:border-[#D9827C]"
        >
          بازگشت به فروشگاه
        </Link>
      </aside>

      {/* Bottom Tab موبایل */}
      <nav
        dir="rtl"
        aria-label="ناوبری پنل مدیریت"
        className="fixed inset-x-0 bottom-0 z-40 h-16 border-t border-[#E8D5CE] bg-white/95 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="mx-auto flex h-16 max-w-lg items-stretch justify-between px-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.key} className="flex h-16 flex-1 items-center">
                <Link
                  href={item.href}
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
                    {item.icon}
                  </span>
                  <span
                    className={`relative z-10 text-[9px] leading-none transition-colors duration-300 ${
                      active ? " text-[#3D2C2A]" : "text-[#A78A85]"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
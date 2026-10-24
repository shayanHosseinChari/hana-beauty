// src/app/categories/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ADMIN_CATEGORIES } from "@/features/admin/data/admin.data";
import type { AdminCategory } from "@/features/admin/types/admin.typ";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  skincare: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  haircare: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  makeup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  body: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  skincare: {
    bg: "from-rose-50 to-pink-50",
    text: "text-rose-600",
    ring: "group-hover:ring-rose-200",
  },
  haircare: {
    bg: "from-amber-50 to-orange-50",
    text: "text-amber-600",
    ring: "group-hover:ring-amber-200",
  },
  makeup: {
    bg: "from-fuchsia-50 to-purple-50",
    text: "text-fuchsia-600",
    ring: "group-hover:ring-fuchsia-200",
  },
  body: {
    bg: "from-emerald-50 to-teal-50",
    text: "text-emerald-600",
    ring: "group-hover:ring-emerald-200",
  },
};

const DEFAULT_COLOR = {
  bg: "from-slate-50 to-gray-50",
  text: "text-slate-600",
  ring: "group-hover:ring-slate-200",
};

export default function CategoryPage() {
  const [q, setQ] = useState("");

  // تعداد محصولات هر دسته را از STATIC_PRODUCTS حساب می‌کنیم
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of STATIC_PRODUCTS) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const categories = useMemo<AdminCategory[]>(
    () =>
      ADMIN_CATEGORIES.filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.slug.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#FDF7F5] via-[#FBF0EC] to-[#F9EFEB]"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* هدر */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8D5CE] bg-white/70 px-4 py-1.5 text-[11px] text-[#6B5350] backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D9827C]" />
            {categories.length.toLocaleString("fa-IR")} دسته‌بندی فعال
          </div>

          <h1 className="text-2xl  tracking-tight text-[#3D2C2A] sm:text-4xl">
            دسته‌بندی محصولات
          </h1>
          <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-[#A78A85] sm:text-sm">
            محصولات موردنظر خود را از میان دسته‌بندی‌های مختلف پیدا کنید
          </p>

          {/* جستجو */}
          <div className="mx-auto mt-6 max-w-md">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A78A85]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"
                />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="جستجوی دسته‌بندی..."
                className="h-12 w-full rounded-2xl border border-[#E8D5CE] bg-white/80 pr-12 pl-4 text-sm text-[#3D2C2A] placeholder:text-[#A78A85] outline-none backdrop-blur transition focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  aria-label="پاک کردن"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#A78A85] transition hover:bg-[#F5E6E1] hover:text-[#D9827C]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* گرید دسته‌ها */}
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E8D5CE] bg-white/60 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E6E1] text-[#C9A49E]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z" />
              </svg>
            </div>
            <p className="text-sm  text-[#3D2C2A]">دسته‌بندی یافت نشد</p>
            <p className="mt-1 text-xs text-[#A78A85]">عبارت جستجو را تغییر دهید</p>
            <button
              onClick={() => setQ("")}
              className="mt-4 rounded-xl border border-[#E8D5CE] px-4 py-2 text-[11px] text-[#6B5350] transition hover:border-[#D9827C]"
            >
              نمایش همه دسته‌ها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c, i) => {
              const count = counts[c.slug] ?? c.productCount;
              const icon = CATEGORY_ICONS[c.slug] ?? CATEGORY_ICONS.skincare;
              const color = CATEGORY_COLORS[c.slug] ?? DEFAULT_COLOR;

              return (
                <Link
                  key={c.id}
                  href={`/products?category=${c.slug}`}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border border-[#E8D5CE]/70 bg-white/80 p-5 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D9827C]/40 hover:shadow-[0_20px_48px_-16px_rgba(180,100,95,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9827C]/50`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* بک‌گراند گرادیانت */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* خط تزئینی بالا */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D9827C]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative z-10 flex flex-1 flex-col">
                    {/* آیکون */}
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_-6px_rgba(180,110,100,0.2)] ring-1 ring-[#E8D5CE]/50 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_8px_24px_-8px_rgba(180,110,100,0.35)] ${color.text} ${color.ring}`}
                    >
                      {icon}
                    </div>

                    {/* نام و اسلاگ */}
                    <div className="mb-1">
                      <h2 className="text-sm  text-[#3D2C2A] transition-colors group-hover:text-[#C46A64] sm:text-base">
                        {c.name}
                      </h2>
                      <p className="mt-0.5 text-[10px] uppercase tracking-wide text-[#A78A85]" dir="ltr">
                        {c.slug}
                      </p>
                    </div>

                    {/* توضیحات */}
                    {c.description && (
                      <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#6B5350]">
                        {c.description}
                      </p>
                    )}

                    {/* فوتر */}
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FDF7F5] px-2.5 py-1 text-[10px] text-[#6B5350] transition-colors group-hover:bg-white group-hover:text-[#C46A64]">
                        {count.toLocaleString("fa-IR")} محصول
                      </span>

                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FBF2EF] text-[#D9827C] transition-all duration-300 group-hover:translate-x-[-2px] group-hover:bg-[#D9827C] group-hover:text-white"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA پایین */}
        {categories.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border border-[#E8D5CE] bg-white/60 p-6 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-right">
            <div>
              <p className="text-sm  text-[#3D2C2A]">
                نمی‌دانید از کجا شروع کنید؟
              </p>
              <p className="mt-1 text-[11px] text-[#A78A85]">
                همه محصولات فروشگاه را یکجا ببینید
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3D2C2A] px-5 py-2.5 text-xs  text-white transition hover:bg-[#2A1E1C] hover:shadow-[0_8px_24px_-8px_rgba(61,44,42,0.5)]"
            >
              مشاهده همه محصولات
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
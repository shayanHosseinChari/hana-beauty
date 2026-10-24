// src/app/brands/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ADMIN_BRANDS } from "@/features/admin/data/admin.data";
import type { AdminBrand } from "@/features/admin/types/admin.typ";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";

const BRAND_COLORS: Record<
  string,
  { bg: string; text: string; ring: string }
> = {
  "brand-a": {
    bg: "from-rose-50 to-pink-50",
    text: "text-rose-600",
    ring: "group-hover:ring-rose-200",
  },
  "brand-b": {
    bg: "from-amber-50 to-orange-50",
    text: "text-amber-600",
    ring: "group-hover:ring-amber-200",
  },
  "brand-c": {
    bg: "from-fuchsia-50 to-purple-50",
    text: "text-fuchsia-600",
    ring: "group-hover:ring-fuchsia-200",
  },
};

const DEFAULT_COLOR = {
  bg: "from-slate-50 to-gray-50",
  text: "text-slate-600",
  ring: "group-hover:ring-slate-200",
};

export default function BrandsPage() {
  const [q, setQ] = useState("");

  // تعداد محصولات هر برند را از STATIC_PRODUCTS حساب می‌کنیم
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of STATIC_PRODUCTS) {
      map[p.brand] = (map[p.brand] ?? 0) + 1;
    }
    return map;
  }, []);

  const brands = useMemo<AdminBrand[]>(
    () =>
      ADMIN_BRANDS.filter(
        (b) =>
          !q ||
          b.name.toLowerCase().includes(q.toLowerCase()) ||
          b.slug.toLowerCase().includes(q.toLowerCase())
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
            {brands.length.toLocaleString("fa-IR")} برند فعال
          </div>

          <h1 className="text-2xl tracking-tight text-[#3D2C2A] sm:text-4xl">
            برندهای فروشگاه
          </h1>
          <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-[#A78A85] sm:text-sm">
            محصولات موردنظر خود را از میان برندهای مختلف پیدا کنید
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
                placeholder="جستجوی برند..."
                className="h-12 w-full rounded-2xl border border-[#E8D5CE] bg-white/80 pr-12 pl-4 text-sm text-[#3D2C2A] placeholder:text-[#A78A85] outline-none backdrop-blur transition focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  aria-label="پاک کردن"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#A78A85] transition hover:bg-[#F5E6E1] hover:text-[#D9827C]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* گرید برندها */}
        {brands.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E8D5CE] bg-white/60 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E6E1] text-[#C9A49E]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-[#3D2C2A]">برندی یافت نشد</p>
            <p className="mt-1 text-xs text-[#A78A85]">
              عبارت جستجو را تغییر دهید
            </p>
            <button
              onClick={() => setQ("")}
              className="mt-4 rounded-xl border border-[#E8D5CE] px-4 py-2 text-[11px] text-[#6B5350] transition hover:border-[#D9827C]"
            >
              نمایش همه برندها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((b, i) => {
              const count = counts[b.slug] ?? b.productCount;
              const color = BRAND_COLORS[b.slug] ?? DEFAULT_COLOR;
              const letter = b.name.slice(0, 1);

              return (
                <Link
                  key={b.id}
                  href={`/products?brand=${b.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E8D5CE]/70 bg-white/80 p-5 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D9827C]/40 hover:shadow-[0_20px_48px_-16px_rgba(180,100,95,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9827C]/50"
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
                    {/* لوگو / حرف اول */}
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg shadow-[0_4px_16px_-6px_rgba(180,110,100,0.2)] ring-1 ring-[#E8D5CE]/50 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_8px_24px_-8px_rgba(180,110,100,0.35)] ${color.text} ${color.ring}`}
                    >
                      {b.logo ? (
                        <img
                          src={b.logo}
                          alt={b.name}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <span>{letter}</span>
                      )}
                    </div>

                    {/* نام و اسلاگ */}
                    <div className="mb-1">
                      <h2 className="text-sm text-[#3D2C2A] transition-colors group-hover:text-[#C46A64] sm:text-base">
                        {b.name}
                      </h2>
                      <p
                        className="mt-0.5 text-[10px] uppercase tracking-wide text-[#A78A85]"
                        dir="ltr"
                      >
                        {b.slug}
                      </p>
                    </div>

                    {/* فوتر */}
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FDF7F5] px-2.5 py-1 text-[10px] text-[#6B5350] transition-colors group-hover:bg-white group-hover:text-[#C46A64]">
                        {count.toLocaleString("fa-IR")} محصول
                      </span>

                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FBF2EF] text-[#D9827C] transition-all duration-300 group-hover:translate-x-[-2px] group-hover:bg-[#D9827C] group-hover:text-white"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-3.5 w-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
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
        {brands.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border border-[#E8D5CE] bg-white/60 p-6 text-center backdrop-blur sm:flex-row sm:justify-between sm:text-right">
            <div>
              <p className="text-sm text-[#3D2C2A]">
                نمی‌دانید از کجا شروع کنید؟
              </p>
              <p className="mt-1 text-[11px] text-[#A78A85]">
                همه محصولات فروشگاه را یکجا ببینید
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3D2C2A] px-5 py-2.5 text-xs text-white transition hover:bg-[#2A1E1C] hover:shadow-[0_8px_24px_-8px_rgba(61,44,42,0.5)]"
            >
              مشاهده همه محصولات
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-3.5 w-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
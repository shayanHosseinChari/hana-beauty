// src/features/cart/components/CartDrawer.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { INITIAL_CART } from "../data/cart.data";
import type { CartItem } from "../types/cart.typ";
import { useModalHistory } from "@/features/profile/hooks/useModalHistory";

const fmt = (n: number) => n.toLocaleString("fa-IR");

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const { closeWithHistory } = useModalHistory(open, onClose);

  const { subtotal, discount, total, count } = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let count = 0;
    for (const it of items) {
      const final = it.discountPrice ?? it.price;
      subtotal += it.price * it.qty;
      discount += (it.price - final) * it.qty;
      count += it.qty;
    }
    return { subtotal, discount, total: subtotal - discount, count };
  }, [items]);

  const setQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, qty: Math.max(1, Math.min(10, it.qty + delta)) }
          : it
      )
    );

  const remove = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  if (!open) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="سبد خرید"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#2A1E1C]/40 backdrop-blur-sm"
        onClick={closeWithHistory}
      />

      <aside
        className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col border-r border-[#EAD8D4]/60 bg-white/95 shadow-[-24px_0_64px_-24px_rgba(180,110,100,0.35)] backdrop-blur-2xl"
        style={{ animation: "cartSlideIn 320ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        <header className="flex items-center justify-between border-b border-[#F0E1DC] px-5 py-4">
          <div>
            <p className="text-[15px]  tracking-tight text-[#2A1E1C]">
              سبد خرید
            </p>
            <p className="mt-0.5 text-[10px] text-[#A78A85]">
              {count.toLocaleString("fa-IR")} کالا در سبد شما
            </p>
          </div>
          <button
            type="button"
            onClick={closeWithHistory}
            aria-label="بستن سبد خرید"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5ECE9] text-[#8A6D68] transition hover:bg-[#EAD8D4] hover:text-[#3D2C2A]"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E6E1] text-[#C9A49E]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
              </div>
              <p className="text-sm text-[#6B5350]">سبد خرید شما خالی است</p>
              <button
                onClick={closeWithHistory}
                className="mt-2 rounded-xl border border-[#E8D5CE] px-4 py-2 text-[11px] text-[#8A6D68] transition hover:border-[#D9827C] hover:text-[#3D2C2A]"
              >
                ادامه خرید
              </button>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {items.map((it) => {
                const final = it.discountPrice ?? it.price;
                return (
                  <li
                    key={it.id}
                    className="group relative flex gap-3 rounded-2xl border border-[#EAD8D4]/70 bg-white/80 p-3 transition hover:border-[#D9827C]/40"
                  >
                    <Link
                      href={`/products/${it.id}`}
                      onClick={closeWithHistory}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FBF6F4]"
                    >
                      <img
                        src={it.image}
                        alt={it.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${it.id}`}
                          onClick={closeWithHistory}
                          className="line-clamp-2 text-[12px] leading-snug text-[#2A1E1C] hover:text-[#D9827C]"
                        >
                          {it.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(it.id)}
                          aria-label="حذف"
                          className="shrink-0 rounded-full p-1 text-[#C9A49E] transition hover:bg-[#FBECEA] hover:text-[#C46A64]"
                        >
                          <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                            <path
                              d="M1.5 3h9M4.5 3V2h3v1M2 3l.7 7h6.6L10 3"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      {it.variant && (
                        <p className="mt-0.5 text-[10px] text-[#A78A85]">
                          {it.variant}
                        </p>
                      )}

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-[#E8D5CE] bg-white">
                          <button
                            type="button"
                            onClick={() => setQty(it.id, +1)}
                            aria-label="افزایش"
                            className="h-7 w-7 text-sm text-[#6B5350] transition hover:text-[#D9827C]"
                          >
                            +
                          </button>
                          <span className="w-7 text-center text-[11px]  text-[#2A1E1C]">
                            {it.qty.toLocaleString("fa-IR")}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(it.id, -1)}
                            aria-label="کاهش"
                            className="h-7 w-7 text-sm text-[#6B5350] transition hover:text-[#D9827C]"
                          >
                            −
                          </button>
                        </div>

                        <div className="text-left">
                          {it.discountPrice && (
                            <p className="text-[9px] text-[#C7B5B1] line-through">
                              {fmt(it.price * it.qty)}
                            </p>
                          )}
                          <p className="text-[12px]  text-[#2A1E1C]">
                            {fmt(final * it.qty)}
                            <span className="mr-1 text-[9px]  text-[#A3857F]">تومان</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-[#F0E1DC] bg-gradient-to-b from-white/60 to-[#FDF7F5]/80 px-5 py-4 backdrop-blur">
            <dl className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[#6B5350]">
                <dt>جمع کل</dt>
                <dd>{fmt(subtotal)} تومان</dd>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-[#C46A64]">
                  <dt>تخفیف</dt>
                  <dd>− {fmt(discount)} تومان</dd>
                </div>
              )}
              <div className="mt-2 flex items-center justify-between border-t border-dashed border-[#EAD8D4] pt-2.5">
                <dt className="text-[12px]  text-[#2A1E1C]">مبلغ قابل پرداخت</dt>
                <dd className="text-[15px]  text-[#2A1E1C]">
                  {fmt(total)}
                  <span className="mr-1 text-[10px]  text-[#A3857F]">تومان</span>
                </dd>
              </div>
            </dl>

            <Link
              href="/checkout"
              onClick={()=>{
                onClose()
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3D2C2A] py-3 text-[12px] tracking-wide text-white transition-all duration-200 hover:bg-[#2A1E1C] hover:shadow-[0_8px_24px_-8px_rgba(61,44,42,0.5)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              ادامه فرآیند خرید
            </Link>

            <button
              type="button"
              onClick={closeWithHistory}
              className="mt-2 w-full rounded-xl py-2 text-[11px] text-[#8A6D68] transition hover:text-[#3D2C2A]"
            >
              بازگشت به فروشگاه
            </button>
          </footer>
        )}
      </aside>

      <style jsx global>{`
        @keyframes cartSlideIn {
          from {
            transform: translateX(-100%);
            opacity: 0.6;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
// src/features/cart/components/CartItemRow.tsx
"use client";

import Link from "next/link";
import type { CartPageItem } from "../types/cart.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

type Props = {
  item: CartPageItem;
  onToggle: (id: string) => void;
  onQtyChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

export function CartItemRow({ item, onToggle, onQtyChange, onRemove }: Props) {
  const final = item.discountPrice ?? item.price;
  const hasDiscount = !!item.discountPrice && item.discountPrice < item.price;

  return (
    <li className="group relative flex gap-3 rounded-2xl border border-[#EAD8D4]/70 bg-white/80 p-3 transition hover:border-[#D9827C]/40 sm:gap-4 sm:p-4">
      {/* چک‌باکس انتخاب */}
      <label className="flex shrink-0 cursor-pointer items-center">
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => onToggle(item.id)}
          className="h-4 w-4 accent-[#D9827C]"
          aria-label={`انتخاب ${item.title}`}
        />
      </label>

      {/* تصویر */}
      <Link
        href={`/products/${item.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#FBF6F4] sm:h-28 sm:w-28"
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-[#D9827C] px-1.5 py-0.5 text-[9px]  text-white">
            {Math.round(((item.price - final) / item.price) * 100)}٪
          </span>
        )}
      </Link>

      {/* مشخصات */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.id}`}
            className="line-clamp-2 text-[12px] leading-snug text-[#2A1E1C] hover:text-[#D9827C] sm:text-[13px]"
          >
            {item.title}
          </Link>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label="حذف"
            className="shrink-0 rounded-full p-1 text-[#C9A49E] transition hover:bg-[#FBECEA] hover:text-[#C46A64]"
          >
            <svg viewBox="0 0 12 12" fill="none" className="h-3.5 w-3.5">
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

        {item.variant && (
          <p className="mt-0.5 text-[10px] text-[#A78A85]">{item.variant}</p>
        )}

        <div className="mt-2 flex items-end justify-between gap-2">
          {/* تعداد */}
          <div className="inline-flex items-center rounded-lg border border-[#E8D5CE] bg-white">
            <button
              type="button"
              onClick={() => onQtyChange(item.id, +1)}
              aria-label="افزایش"
              className="h-8 w-8 text-sm text-[#6B5350] transition hover:text-[#D9827C]"
            >
              +
            </button>
            <span className="w-8 text-center text-[11px]  text-[#2A1E1C]">
              {item.qty.toLocaleString("fa-IR")}
            </span>
            <button
              type="button"
              onClick={() => onQtyChange(item.id, -1)}
              aria-label="کاهش"
              className="h-8 w-8 text-sm text-[#6B5350] transition hover:text-[#D9827C]"
            >
              −
            </button>
          </div>

          {/* قیمت */}
          <div className="text-left">
            {hasDiscount && (
              <p className="text-[9px] text-[#C7B5B1] line-through sm:text-[10px]">
                {fmt(item.price * item.qty)}
              </p>
            )}
            <p className="text-[13px]  text-[#2A1E1C] sm:text-[14px]">
              {fmt(final * item.qty)}
              <span className="mr-1 text-[9px]  text-[#A3857F]">
                تومان
              </span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
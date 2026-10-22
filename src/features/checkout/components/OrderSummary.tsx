// src/features/checkout/components/OrderSummary.tsx
"use client";

import { useMemo } from "react";
import { INITIAL_CART } from "@/features/cart/data/cart.data";
import { SHIPPING_METHODS } from "../data/checkout.data";
import type { ShippingMethod } from "../types/checkout.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

type Props = {
  shippingId: ShippingMethod["id"];
  couponDiscount: number; // درصد
};

export function OrderSummary({ shippingId, couponDiscount }: Props) {
  const shipping = SHIPPING_METHODS.find((s) => s.id === shippingId) ?? SHIPPING_METHODS[0];

  const { subtotal, discount, couponAmount, total } = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    for (const it of INITIAL_CART) {
      const final = it.discountPrice ?? it.price;
      subtotal += it.price * it.qty;
      discount += (it.price - final) * it.qty;
    }
    const afterDiscount = subtotal - discount;
    const couponAmount = Math.round((afterDiscount * couponDiscount) / 100);
    const total = afterDiscount - couponAmount + shipping.price;
    return { subtotal, discount, couponAmount, total };
  }, [couponDiscount, shipping.price]);

  return (
    <aside className="sticky top-24 space-y-4 rounded-3xl border border-[#E8D5CE] bg-white/80 p-5 backdrop-blur">
      <h2 className="text-sm  text-[#3D2C2A]">خلاصه سفارش</h2>

      <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
        {INITIAL_CART.map((it) => {
          const final = it.discountPrice ?? it.price;
          return (
            <li key={it.id} className="flex items-center gap-2.5">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#FBF6F4]">
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[11px] text-[#3D2C2A]">
                  {it.title}
                </p>
                <p className="text-[9px] text-[#A78A85]">
                  {it.qty.toLocaleString("fa-IR")} عدد
                  {it.variant ? ` · ${it.variant}` : ""}
                </p>
              </div>
              <span className="shrink-0 text-[10px]  text-[#3D2C2A]">
                {fmt(final * it.qty)} 
              </span>
            </li>
          );
        })}
      </ul>

      <div className="space-y-1.5 border-t border-dashed border-[#EAD8D4] pt-3 text-[11px]">
        <Row label="جمع کل" value={`${fmt(subtotal)} ت`} />
        {discount > 0 && (
          <Row label="تخفیف محصولات" value={`− ${fmt(discount)} ت`} tone="rose" />
        )}
        {couponAmount > 0 && (
          <Row
            label={`کد تخفیف (${couponDiscount.toLocaleString("fa-IR")}٪)`}
            value={`− ${fmt(couponAmount)} ت`}
            tone="rose"
          />
        )}
        <Row label="هزینه ارسال" value={`${fmt(shipping.price)} ت`} />
        <div className="mt-2 flex items-center justify-between border-t border-[#EAD8D4] pt-2.5">
          <span className="text-[12px]  text-[#2A1E1C]">
            مبلغ قابل پرداخت
          </span>
          <span className="text-[15px]  text-[#2A1E1C]">
            {fmt(total)} <span className="text-[10px] ">تومان</span>
          </span>
        </div>
      </div>

      <p className="rounded-xl bg-[#FDF7F5] p-2.5 text-[10px] leading-5 text-[#8A6D68]">
        با تکمیل خرید، <span className="text-[#C46A64]">قوانین فروشگاه</span> را
        می‌پذیرید. پرداخت شما در درگاه امن انجام می‌شود.
      </p>
    </aside>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "rose";
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        tone === "rose" ? "text-[#C46A64]" : "text-[#6B5350]"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
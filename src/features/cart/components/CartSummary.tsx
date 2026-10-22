// src/features/cart/components/CartSummary.tsx
"use client";

import Link from "next/link";

const fmt = (n: number) => n.toLocaleString("fa-IR");

type Props = {
  subtotal: number;
  discount: number;
  couponDiscount: number;
  couponAmount: number;
  total: number;
  selectedCount: number;
  onCheckout: () => void;
  checkoutDisabled: boolean;
};

export function CartSummary({
  subtotal,
  discount,
  couponDiscount,
  couponAmount,
  total,
  selectedCount,
  onCheckout,
  checkoutDisabled,
}: Props) {
  return (
    <aside className="sticky top-24 space-y-4 rounded-3xl border border-[#E8D5CE] bg-white/80 p-5 backdrop-blur">
      <h2 className="text-sm  text-[#3D2C2A]">خلاصه سفارش</h2>

      <div className="space-y-1.5 text-[11px]">
        <Row
          label={`جمع کل (${selectedCount.toLocaleString("fa-IR")} کالا)`}
          value={`${fmt(subtotal)} ت`}
        />
        {discount > 0 && (
          <Row
            label="تخفیف محصولات"
            value={`− ${fmt(discount)} ت`}
            tone="rose"
          />
        )}
        {couponAmount > 0 && (
          <Row
            label={`کد تخفیف (${couponDiscount.toLocaleString("fa-IR")}٪)`}
            value={`− ${fmt(couponAmount)} ت`}
            tone="rose"
          />
        )}
        <Row label="هزینه ارسال" value="در مرحله پرداخت" tone="muted" />
      </div>

      <div className="flex items-center justify-between border-t border-[#EAD8D4] pt-3">
        <span className="text-[12px]  text-[#2A1E1C]">
          مبلغ قابل پرداخت
        </span>
        <span className="text-[16px]  text-[#2A1E1C]">
          {fmt(total)} <span className="text-[10px] ">تومان</span>
        </span>
      </div>

      <Link
        href={checkoutDisabled ? "#" : "/checkout"}
        onClick={(e) => {
          if (checkoutDisabled) {
            e.preventDefault();
            return;
          }
          onCheckout();
        }}
        aria-disabled={checkoutDisabled}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12px] tracking-wide transition-all duration-200 ${
          checkoutDisabled
            ? "cursor-not-allowed bg-[#C9B8B3] text-white"
            : "bg-[#D9827C] text-white hover:bg-[#C46A64] hover:shadow-[0_8px_24px_-8px_rgba(217,130,124,0.55)]"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
        ادامه فرآیند خرید
      </Link>

      <Link
        href="/products"
        className="block w-full rounded-xl border border-[#E8D5CE] py-2 text-center text-[11px] text-[#6B5350] transition hover:border-[#D9827C]"
      >
        بازگشت به فروشگاه
      </Link>

      <p className="rounded-xl bg-[#FDF7F5] p-2.5 text-[10px] leading-5 text-[#8A6D68]">
        پرداخت شما در درگاه امن انجام می‌شود. امکان بازگشت کالا تا ۷ روز وجود
        دارد.
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
  tone?: "rose" | "muted";
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        tone === "rose"
          ? "text-[#C46A64]"
          : tone === "muted"
          ? "text-[#A78A85]"
          : "text-[#6B5350]"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
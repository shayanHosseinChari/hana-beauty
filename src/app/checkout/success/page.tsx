// src/app/checkout/success/page.tsx
"use client";

import Link from "next/link";
import { useCheckout } from "@/features/checkout/context/CheckoutContext";

export default function CheckoutSuccessPage() {
  const { orderCode } = useCheckout();

  return (
    <div className="flex flex-col items-center rounded-3xl border border-[#E8D5CE] bg-white/80 p-8 text-center backdrop-blur">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h2 className="text-base font-bold text-[#2A1E1C]">
        پرداخت با موفقیت انجام شد
      </h2>
      <p className="mt-2 max-w-sm text-[11px] leading-6 text-[#6B5350]">
        سفارش شما با کد{" "}
        <span className="font-semibold text-[#C46A64]">{orderCode}</span> ثبت شد.
        پیگیری از بخش سفارش‌ها امکان‌پذیر است.
      </p>

      <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
        <Link
          href="/profile/orders"
          className="rounded-xl bg-[#3D2C2A] py-2.5 text-[12px] text-white transition hover:bg-[#2A1E1C]"
        >
          پیگیری سفارش
        </Link>
        <Link
          href="/products"
          className="rounded-xl border border-[#E8D5CE] py-2.5 text-[12px] text-[#6B5350] transition hover:border-[#D9827C]"
        >
          ادامه خرید
        </Link>
      </div>
    </div>
  );
}
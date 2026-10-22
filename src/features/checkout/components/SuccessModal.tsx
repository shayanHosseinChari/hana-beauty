// src/features/checkout/components/SuccessModal.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  orderCode: string;
};

export function SuccessModal({ open, onClose, orderCode }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setShow(true), 20);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#2A1E1C]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-sm rounded-[28px] border border-[#EAD8D4] bg-white p-6 text-center shadow-2xl transition-all duration-500 ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h2 className="text-base font-bold text-[#2A1E1C]">
          پرداخت با موفقیت انجام شد
        </h2>

        <p className="mt-2 text-[11px] leading-6 text-[#6B5350]">
          سفارش شما با کد{" "}
          <span className="font-semibold text-[#C46A64]">{orderCode}</span> ثبت
          شد. پیگیری از بخش سفارش‌ها امکان‌پذیر است.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/profile/orders"
            onClick={onClose}
            className="rounded-xl bg-[#3D2C2A] py-2.5 text-[12px] text-white transition hover:bg-[#2A1E1C]"
          >
            پیگیری سفارش
          </Link>
          <Link
            href="/products"
            onClick={onClose}
            className="rounded-xl border border-[#E8D5CE] py-2.5 text-[12px] text-[#6B5350] transition hover:border-[#D9827C]"
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
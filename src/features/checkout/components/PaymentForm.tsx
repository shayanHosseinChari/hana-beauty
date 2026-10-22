// src/features/checkout/components/PaymentForm.tsx
"use client";

import { useState } from "react";
import { PAYMENT_METHODS, VALID_COUPONS } from "../data/checkout.data";
import type { PaymentMethod } from "../types/checkout.typ";

type Props = {
  value: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
  couponDiscount: number;
  onCouponApply: (percent: number) => void;
  onNext: () => void;
  onBack: () => void;
};

export function PaymentForm({
  value,
  onChange,
  couponDiscount,
  onCouponApply,
  onNext,
  onBack,
}: Props) {
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleCoupon = () => {
    const found = Object.entries(VALID_COUPONS).find(
      ([k]) => k.toLowerCase() === coupon.trim().toLowerCase()
    );
    if (found) {
      onCouponApply(found[1]);
      setCouponError("");
    } else {
      onCouponApply(0);
      setCouponError("کد تخفیف معتبر نیست");
    }
  };

  // ... بقیه کد بدون تغییر، فقط به جای applied از couponDiscount استفاده کن
  return (
    <div className="space-y-5">
      {/* بخش روش پرداخت بدون تغییر */}
      {/* ... */}

      <section className="rounded-3xl border border-[#E8D5CE] bg-white/80 p-5 backdrop-blur">
        <h2 className="mb-3 text-sm  text-[#3D2C2A]">کد تخفیف</h2>
        <div className="flex gap-2">
          <input
            value={coupon}
            onChange={(e) => {
              setCoupon(e.target.value);
              setCouponError("");
            }}
            placeholder="کد تخفیف را وارد کنید"
            className="flex-1 rounded-xl border border-[#E8D5CE] bg-white px-3 py-2 text-[12px] text-[#3D2C2A] outline-none focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25"
          />
          <button
            type="button"
            onClick={handleCoupon}
            className="rounded-xl bg-[#3D2C2A] px-4 py-2 text-[11px] text-white transition hover:bg-[#2A1E1C]"
          >
            اعمال
          </button>
        </div>
        {couponError && (
          <p className="mt-2 text-[10px] text-rose-600">{couponError}</p>
        )}
        {couponDiscount > 0 && (
          <p className="mt-2 text-[10px] text-emerald-700">
            ✓ کد تخفیف {couponDiscount.toLocaleString("fa-IR")}٪ اعمال شد
          </p>
        )}
      </section>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-[#E8D5CE] px-4 py-2.5 text-xs text-[#6B5350] transition hover:border-[#D9827C]"
        >
          → بازگشت
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-[#D9827C] px-6 py-2.5 text-xs  text-white transition hover:bg-[#C46A64]"
        >
          بازبینی سفارش 
        </button>
      </div>
    </div>
  );
}
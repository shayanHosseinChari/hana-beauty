// src/features/checkout/components/ReviewStep.tsx
"use client";

import type { PaymentMethod, ShippingMethod } from "../types/checkout.typ";
import type { Address } from "@/features/profile/types/profile.typ";
import { PAYMENT_METHODS, SHIPPING_METHODS } from "../data/checkout.data";

type Props = {
  address: Address;
  shippingId: ShippingMethod["id"];
  payment: PaymentMethod;
  onBack: () => void;
  onPay: () => void;
};

export function ReviewStep({ address, shippingId, payment, onBack, onPay }: Props) {
  const shipping = SHIPPING_METHODS.find((s) => s.id === shippingId)!;
  const pay = PAYMENT_METHODS.find((p) => p.id === payment)!;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[#E8D5CE] bg-white/80 p-5 backdrop-blur">
        <h2 className="mb-3 text-sm  text-[#3D2C2A]">بازبینی اطلاعات</h2>
        <div className="space-y-3 text-[11px] leading-6 text-[#6B5350]">
          <div className="rounded-xl bg-[#FDF7F5] p-3">
            <p className="mb-1 text-[10px] text-[#A78A85]">آدرس تحویل</p>
            <p>
              {address.province}، {address.city}، {address.line}
            </p>
            <p className="text-[10px] text-[#A78A85]">
              گیرنده: {address.receiver} · {address.phone}
            </p>
          </div>

          <div className="rounded-xl bg-[#FDF7F5] p-3">
            <p className="mb-1 text-[10px] text-[#A78A85]">روش ارسال</p>
            <p>
              {shipping.title} — {shipping.eta}
            </p>
          </div>

          <div className="rounded-xl bg-[#FDF7F5] p-3">
            <p className="mb-1 text-[10px] text-[#A78A85]">روش پرداخت</p>
            <p>{pay.title}</p>
            <p className="text-[10px] text-[#A78A85]">{pay.description}</p>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-[#E8D5CE] px-4 py-2.5 text-xs text-[#6B5350] transition hover:border-[#D9827C]"
        >
        
         بازگشت
        </button>
        <button
          type="button"
          onClick={onPay}
          className="rounded-xl bg-[#3D2C2A] px-6 py-2.5 text-xs  text-white transition hover:bg-[#2A1E1C]"
        >
          پرداخت و ثبت سفارش
        </button>
      </div>
    </div>
  );
}
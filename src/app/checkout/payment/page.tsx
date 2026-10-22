// src/app/checkout/payment/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { PaymentForm } from "@/features/checkout/components/PaymentForm";
import { useCheckout } from "@/features/checkout/context/CheckoutContext";

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const { payment, setPayment, couponDiscount, setCouponDiscount } = useCheckout();

  return (
    <PaymentForm
      value={payment}
      onChange={setPayment}
      couponDiscount={couponDiscount}
      onCouponApply={setCouponDiscount}
      onNext={() => router.push("/checkout/review")}
      onBack={() => router.push("/checkout")}
    />
  );
}
// src/app/checkout/review/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ReviewStep } from "@/features/checkout/components/ReviewStep";
import { useCheckout } from "@/features/checkout/context/CheckoutContext";

export default function CheckoutReviewPage() {
  const router = useRouter();
  const { address, shippingId, payment } = useCheckout();

  const handlePay = () => {
    // TODO: اتصال به API پرداخت
    router.push("/checkout/success");
  };

  return (
    <ReviewStep
      address={address}
      shippingId={shippingId}
      payment={payment}
      onBack={() => router.push("/checkout/payment")}
      onPay={handlePay}
    />
  );
}
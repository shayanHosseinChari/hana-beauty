// src/app/checkout/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { ShippingForm } from "@/features/checkout/components/ShippingForm";
import { useCheckout } from "@/features/checkout/context/CheckoutContext";

export default function CheckoutShippingPage() {
  const router = useRouter();
  const { address, setAddress, shippingId, setShippingId } = useCheckout();

  return (
    <ShippingForm
      address={address}
      shippingId={shippingId}
      onAddressChange={setAddress}
      onShippingChange={setShippingId}
      onNext={() => router.push("/checkout/payment")}
    />
  );
}
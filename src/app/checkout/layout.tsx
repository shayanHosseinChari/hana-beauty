// src/app/checkout/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckoutProvider, useCheckout } from "@/features/checkout/context/CheckoutContext";
import { CheckoutStepper } from "@/features/checkout/components/CheckoutStepper";
import { OrderSummary } from "@/features/checkout/components/OrderSummary";
import type { CheckoutStep } from "@/features/checkout/types/checkout.typ";

function stepFromPath(pathname: string): CheckoutStep {
  if (pathname.startsWith("/checkout/payment")) return 2;
  if (pathname.startsWith("/checkout/review")) return 3;
  return 1;
}

function CheckoutLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const step = stepFromPath(pathname);
  const { shippingId, couponDiscount } = useCheckout();

  const isSuccess = pathname.startsWith("/checkout/success");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#FDF7F5] to-[#F9EFEB]"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#A78A85]">
          <Link href="/" className="hover:text-[#D9827C]">خانه</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#D9827C]">محصولات</Link>
          <span>/</span>
          <span className="text-[#3D2C2A]">پرداخت</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-xl font-bold text-[#3D2C2A] sm:text-2xl">
            تکمیل خرید
          </h1>
          <p className="mt-1 text-xs text-[#A78A85]">
            فقط چند قدم تا رسیدن سفارش شما باقی مانده
          </p>
        </div>

        {!isSuccess && <CheckoutStepper step={step} />}

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>{children}</div>

          {!isSuccess && (
            <div className="hidden lg:block">
              <OrderSummary
                shippingId={shippingId}
                couponDiscount={couponDiscount}
              />
            </div>
          )}
        </div>

        {!isSuccess && (
          <div className="mt-6 lg:hidden">
            <OrderSummary
              shippingId={shippingId}
              couponDiscount={couponDiscount}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CheckoutProvider>
      <CheckoutLayoutInner>{children}</CheckoutLayoutInner>
    </CheckoutProvider>
  );
}
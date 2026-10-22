// src/app/cart/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { INITIAL_CART, VALID_COUPONS } from "@/features/cart/data/cart.data";
import type { CartPageItem } from "@/features/cart/types/cart.typ";
import { CartItemRow } from "@/features/cart/components/CartItemRow";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { UpsellSection } from "@/features/cart/components/UpsellSection";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartPageItem[]>(INITIAL_CART);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, selected: !it.selected } : it))
    );

  const toggleAll = () => {
    const allSelected = items.every((it) => it.selected);
    setItems((prev) => prev.map((it) => ({ ...it, selected: !allSelected })));
  };

  const setQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, qty: Math.max(1, Math.min(10, it.qty + delta)) }
          : it
      )
    );

  const remove = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const removeAll = () => setItems([]);

  const { subtotal, discount, couponAmount, total, selectedCount, allSelected } =
    useMemo(() => {
      let subtotal = 0;
      let discount = 0;
      let selectedCount = 0;
      for (const it of items) {
        if (!it.selected) continue;
        const final = it.discountPrice ?? it.price;
        subtotal += it.price * it.qty;
        discount += (it.price - final) * it.qty;
        selectedCount += it.qty;
      }
      const afterDiscount = subtotal - discount;
      const couponAmount = Math.round((afterDiscount * couponDiscount) / 100);
      const total = afterDiscount - couponAmount;
      const allSelected = items.length > 0 && items.every((it) => it.selected);
      return {
        subtotal,
        discount,
        couponAmount,
        total,
        selectedCount,
        allSelected,
      };
    }, [items, couponDiscount]);

  const handleCoupon = () => {
    const found = Object.entries(VALID_COUPONS).find(
      ([k]) => k.toLowerCase() === coupon.trim().toLowerCase()
    );
    if (found) {
      setCouponDiscount(found[1]);
      setCouponError("");
    } else {
      setCouponDiscount(0);
      setCouponError("کد تخفیف معتبر نیست");
    }
  };

  const handleCheckout = () => {
    // TODO: ذخیره آیتم‌های انتخاب‌شده در store و رفتن به checkout
    router.push("/checkout");
  };

  const empty = items.length === 0;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#FDF7F5] to-[#F9EFEB]"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs text-[#A78A85]">
          <Link href="/" className="hover:text-[#D9827C]">
            خانه
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#D9827C]">
            محصولات
          </Link>
          <span>/</span>
          <span className="text-[#3D2C2A]">سبد خرید</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#3D2C2A] sm:text-2xl">
            سبد خرید
          </h1>
          <p className="mt-1 text-xs text-[#A78A85]">
            {empty
              ? "سبد خرید شما خالی است"
              : `${items.length.toLocaleString("fa-IR")} کالا در سبد شما`}
          </p>
        </div>

        {empty ? (
          <div className="rounded-3xl border border-dashed border-[#E8D5CE] bg-white/60 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5E6E1] text-[#C9A49E]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#3D2C2A]">
              سبد خرید شما خالی است
            </p>
            <p className="mt-1 text-xs text-[#A78A85]">
              می‌توانید از فروشگاه محصولات موردعلاقه‌تان را اضافه کنید.
            </p>
            <Link
              href="/products"
              className="mt-5 inline-block rounded-xl bg-[#D9827C] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#C46A64]"
            >
              رفتن به فروشگاه
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#E8D5CE] bg-white/80 px-4 py-2.5 backdrop-blur">
                <label className="flex cursor-pointer items-center gap-2 text-[11px] text-[#6B5350]">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 accent-[#D9827C]"
                  />
                  انتخاب همه ({items.length.toLocaleString("fa-IR")} کالا)
                </label>
                <button
                  type="button"
                  onClick={removeAll}
                  className="text-[11px] text-[#C46A64] hover:underline"
                >
                  حذف همه
                </button>
              </div>

              <ul className="space-y-2.5">
                {items.map((it) => (
                  <CartItemRow
                    key={it.id}
                    item={it}
                    onToggle={toggle}
                    onQtyChange={setQty}
                    onRemove={remove}
                  />
                ))}
              </ul>

              <section className="mt-5 rounded-3xl border border-[#E8D5CE] bg-white/80 p-5 backdrop-blur">
                <h2 className="mb-3 text-sm font-bold text-[#3D2C2A]">
                  کد تخفیف
                </h2>
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
                    ✓ کد تخفیف {couponDiscount.toLocaleString("fa-IR")}٪ اعمال
                    شد
                  </p>
                )}
              </section>
            </div>

            <div className="hidden lg:block">
              <CartSummary
                subtotal={subtotal}
                discount={discount}
                couponDiscount={couponDiscount}
                couponAmount={couponAmount}
                total={total}
                selectedCount={selectedCount}
                onCheckout={handleCheckout}
                checkoutDisabled={selectedCount === 0}
              />
            </div>
          </div>
        )}

        {!empty && (
          <div className="mt-6 lg:hidden">
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              couponDiscount={couponDiscount}
              couponAmount={couponAmount}
              total={total}
              selectedCount={selectedCount}
              onCheckout={handleCheckout}
              checkoutDisabled={selectedCount === 0}
            />
          </div>
        )}

        {!empty && <UpsellSection excludeIds={items.map((it) => it.id)} />}
      </div>
    </main>
  );
}
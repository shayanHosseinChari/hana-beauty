// src/features/profile/components/tabs/WishlistTab.tsx
"use client"
import { ProductCard } from "@/features/products/components/ProductCard";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";

export function WishlistTab() {
  // دمو: ۴ محصول اول
  const items = STATIC_PRODUCTS.slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#E8D5CE] bg-white/60 py-16 text-center">
        <p className="text-sm font-medium text-[#3D2C2A]">لیست علاقه‌مندی‌ها خالی است</p>
        <p className="mt-1 text-xs text-[#A78A85]">محصولات موردعلاقه‌تان را با قلب ذخیره کنید.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
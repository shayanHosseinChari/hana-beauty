// src/features/products/components/ProductPurchasePanel.tsx
"use client";

import { useState } from "react";
import type { Product } from "../types/produt.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

type Props = {
  product: Product;
  // onAddToCart رو حذف کنید
};

export function ProductPurchasePanel({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(
    product.variants?.options[0]
  );
  const [added, setAdded] = useState(false);

  const finalPrice = product.discountPrice ?? product.price;
  const hasDiscount = !!product.discountPrice && product.discountPrice < product.price;

  const handleAdd = () => {
    // منطق افزودن به سبد اینجا انجام میشه
    console.log("add to cart", { id: product.id, qty, variant });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-6">
      {/* قیمت */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-[#3D2C2A]">
          {fmt(finalPrice)} <span className="text-sm font-normal">تومان</span>
        </span>
        {hasDiscount && (
          <span className="text-sm text-[#A78A85] line-through">{fmt(product.price)}</span>
        )}
        {hasDiscount && (
          <span className="rounded-full bg-[#D9827C]/10 px-2 py-0.5 text-[10px] font-semibold text-[#D9827C]">
            {Math.round(((product.price - finalPrice) / product.price) * 100)}٪ تخفیف
          </span>
        )}
      </div>

      {/* تنوع */}
      {product.variants && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#6B5350]">{product.variants.label}</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setVariant(opt)}
                className={`rounded-xl border px-3 py-1.5 text-xs transition ${
                  variant === opt
                    ? "border-[#D9827C] bg-[#F5E6E1] text-[#3D2C2A]"
                    : "border-[#E8D5CE] text-[#6B5350] hover:border-[#D9827C]/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* تعداد + افزودن */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="inline-flex items-center rounded-xl border border-[#E8D5CE] bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            aria-label="افزایش تعداد"
            className="h-10 w-10 text-lg text-[#6B5350] transition hover:text-[#D9827C]"
          >
            +
          </button>
          <span className="w-10 text-center text-sm font-semibold text-[#3D2C2A]">
            {qty.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="کاهش تعداد"
            className="h-10 w-10 text-lg text-[#6B5350] transition hover:text-[#D9827C]"
          >
            −
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white transition ${
            !product.inStock
              ? "cursor-not-allowed bg-[#C9B8B3]"
              : added
              ? "bg-emerald-600"
              : "bg-[#D9827C] hover:bg-[#C46A64] active:scale-[0.99]"
          }`}
        >
          {!product.inStock
            ? "ناموجود"
            : added
            ? "✓ به سبد اضافه شد"
            : "افزودن به سبد خرید"}
        </button>
      </div>

      {/* ویژگی‌ها */}
      {product.features?.length ? (
        <ul className="space-y-1.5 rounded-2xl border border-[#F0E1DC] bg-white/60 p-4 text-xs text-[#6B5350]">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9827C]" />
              {f}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
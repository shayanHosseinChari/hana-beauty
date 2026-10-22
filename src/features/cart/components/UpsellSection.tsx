// src/features/cart/components/UpsellSection.tsx
"use client";

import { STATIC_PRODUCTS } from "@/features/products/data/product.data";
import { UpsellCard } from "./Upsellcard";

export function UpsellSection({ excludeIds }: { excludeIds: string[] }) {
  const items = STATIC_PRODUCTS.filter(
    (p) => !excludeIds.includes(p.id)
  ).slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-sm  text-[#3D2C2A]">
        پیشنهاد ویژه برای شما
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((p) => (
          <UpsellCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
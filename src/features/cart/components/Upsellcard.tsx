// src/features/cart/components/UpsellCard.tsx
"use client";

import Link from "next/link";
import type { Product } from "@/features/products/types/produt.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

export function UpsellCard({ product }: { product: Product }) {
  const final = product.discountPrice ?? product.price;
  const hasDiscount =
    !!product.discountPrice && product.discountPrice < product.price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-[#E8D5CE] bg-white/80 transition hover:border-[#D9827C]/60 hover:shadow-[0_12px_30px_-12px_rgba(217,130,124,0.35)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#FBF6F4]">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute right-2 top-2 rounded-full bg-[#D9827C] px-2 py-0.5 text-[9px] font-bold text-white">
            {Math.round(((product.price - final) / product.price) * 100)}٪
          </span>
        )}
      </div>
      <div className="space-y-1 p-2.5">
        <p className="text-[9px] uppercase tracking-wide text-[#C7A9A3]">
          {product.brand}
        </p>
        <p className="line-clamp-2 min-h-[2rem] text-[11px] leading-snug text-[#3D2C2A] group-hover:text-[#C46A64]">
          {product.title}
        </p>
        <div className="flex items-baseline gap-1.5 pt-1">
          {hasDiscount && (
            <span className="text-[9px] text-[#C7B5B1] line-through">
              {fmt(product.price)}
            </span>
          )}
          <span className="text-[11px]  text-[#2A1E1C]">
            {fmt(final)}
            <span className="mr-1 text-[9px]  text-[#A3857F]">
              تومان
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
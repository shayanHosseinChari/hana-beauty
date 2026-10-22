// src/features/products/components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../types/produt.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const finalPrice = product.discountPrice ?? product.price;
  const hasDiscount = !!product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - finalPrice) / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.id}`}
      aria-label={product.title}
      className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(89,53,48,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9827C]/60"
    >
      {/* فریم تصویر */}
      <div className="relative m-2.5 mb-0 overflow-hidden rounded-[22px] bg-[#FBF6F4]">
        <div className="relative aspect-[4/4.6] w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] ${
              !product.inStock ? "grayscale opacity-45" : ""
            }`}
          />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {hasDiscount && product.inStock && (
            <div className="absolute bottom-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-wide text-[#BF6C66] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:bottom-auto sm:top-3">
              {fmt(discountPercent)}٪ تخفیف
            </div>
          )}

          {/* دکمه علاقه‌مندی */}
          <button
            type="button"
           
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist?.(product);
            }}
            className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#5C4542] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-transform duration-300 hover:scale-110 hover:text-[#D9827C] active:scale-95"
          >
            <svg
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? "fill-[#D9827C] text-[#D9827C]" : "fill-none stroke-current"
              }`}
              viewBox="0 0 24 24"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          {!product.inStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <span className="rounded-full bg-white/95 px-4 py-1.5 text-[11px] tracking-wide text-[#7A5E59] shadow-sm">
                اتمام موجودی
              </span>
            </div>
          )}

          {product.inStock && (
            <div className="absolute inset-x-3 bottom-3 z-20 hidden translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:block">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white/90 py-2.5 text-[11px] tracking-wide text-[#3D2C2A] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors duration-300 hover:bg-[#D9827C] hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>افزودن سریع</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* مشخصات و قیمت */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-4 pb-4 pt-3">
        <div className="space-y-1.5">
          {product.brand && (
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#C7A9A3]">
              {product.brand}
            </span>
          )}
          <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] leading-snug text-[#3D2C2A] transition-colors duration-300 group-hover:text-[#BF6C66]">
            {product.title}
          </h3>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            {hasDiscount && (
              <span className="text-[11px] text-[#C7B5B1] line-through">
                {fmt(product.price)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-[15px] tracking-tight text-[#3D2C2A]">
                {fmt(finalPrice)}
              </span>
              <span className="text-[10px] text-[#A3857F]">تومان</span>
            </div>
          </div>

          {product.inStock && (
            <button
              type="button"
              aria-label="افزودن به سبد"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#FBF2EF] text-[#D9827C] transition-colors duration-300 hover:bg-[#D9827C] hover:text-white sm:hidden"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-[28px] bg-white">
      <div className="m-2.5 mb-0 aspect-[4/4.6] rounded-[22px] bg-[#F5EBE8]/60" />
      <div className="space-y-2.5 px-4 py-4">
        <div className="h-2.5 w-16 rounded-full bg-[#F5EBE8]" />
        <div className="h-3 w-full rounded bg-[#F5EBE8]" />
        <div className="h-3 w-3/4 rounded bg-[#F5EBE8]" />
        <div className="mt-3 flex items-center justify-between pt-1">
          <div className="h-4 w-20 rounded bg-[#F5EBE8]" />
          <div className="h-7 w-7 rounded-full bg-[#F5EBE8] sm:hidden" />
        </div>
      </div>
    </div>
  );
}
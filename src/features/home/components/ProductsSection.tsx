"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardReveal } from "@/lib/animations";
import { products } from "../data/products";
import type { Product } from "../types/types";

export function ProductsSection() {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        title="پرفروش های حنابیوتی"
        description="انتخاب سریع، بدون سردرگمی؛ روی هدف پوستی خودت تمرکز کن."
        action="مشاهده همه"
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.title} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[28px] border border-[#F0E1DC] bg-white shadow-[0_4px_20px_-6px_rgba(61,44,42,.08)] transition-all duration-500 hover:border-[#E8D5CE] hover:shadow-[0_24px_50px_-16px_rgba(61,44,42,.18)]"
    >
      <div className="relative h-100 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${product.tone} transition-transform duration-700 `}
        />

        {product.banner ? (
          <Image
            src={product.banner}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
            className="object-cover transition-transform duration-700 "
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-7xl opacity-20">✦</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C2A]/35 via-transparent to-transparent" />

        <div className="absolute start-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[11px]  text-[#8C4A43] shadow-sm backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-[#D9827C]" />
          {product.tag}
        </div>

        <button
          aria-label={`افزودن ${product.title} به علاقه‌مندی`}
          className="absolute end-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-white/70 bg-white/85 text-[#8C4A43] shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-[#D9827C] hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        <div className="absolute inset-x-4 bottom-4 z-10 flex w-fit gap-2 justify-between rounded-2xl border border-white/30 bg-white/80 px-3.5 py-2.5 shadow-[0_8px_20px_-8px_rgba(61,44,42,.25)] backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#6B5350]">{product.subtitle}</span>
          </div>
          <div className="flex items-center gap-1 text-[#A67C52]">
            <span className="text-[11px]">★</span>
            <span className="text-[11px]  text-[#3D2C2A]">۴.۸</span>
          </div>
        </div>
      </div>

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base  text-[#241B1A]">
              {product.title}
            </h3>
            <p className="mt-1 truncate text-xs text-[#6B5350]">
              {product.subtitle}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#FDF7F5] px-2.5 py-1 text-[10px]  text-[#A67C52] ring-1 ring-[#F0E1DC]">
            اورجینال
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-dashed border-[#F0E1DC] pt-4">
          <div>
            <span className="block text-[10px] text-[#A67C52]/70">قیمت</span>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-lg  text-[#3D2C2A]">
                {product.price}
              </span>
              <span className="text-xs text-[#6B5350]">تومان</span>
            </div>
          </div>

          <button
            aria-label={`افزودن ${product.title} به سبد`}
            className="group/btn relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-[#3D2C2A] px-4 text-xs  text-white shadow-[0_8px_20px_-8px_rgba(61,44,42,.5)] transition-all duration-300 hover:bg-[#D9827C] hover:shadow-[0_8px_24px_-6px_rgba(217,130,124,.6)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9827C]/30"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="relative">افزودن</span>
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#D9827C]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}
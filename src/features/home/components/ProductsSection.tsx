"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardReveal } from "@/lib/animations";
import { products } from "../data/products";
import type { Product } from "../types/types";

export function ProductsSection() {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        title="پرفروش‌های حنا"
        description="انتخاب سریع، بدون سردرگمی؛ روی هدف پوستی خودت تمرکز کن."
        action="مشاهده همه"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
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
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-[#F0E1DC] bg-white shadow-[0_2px_8px_rgba(61,44,42,.04)] transition-shadow hover:shadow-[0_18px_40px_rgba(61,44,42,.1)]"
    >
      <div className={`relative h-44 bg-gradient-to-br ${product.tone} p-6`}>
        <span className="rounded-full border border-white/80 bg-white/65 px-3 py-1 text-xs text-[#8C4A43] backdrop-blur-md">
          {product.tag}
        </span>
        <div className="absolute bottom-5 start-6 text-5xl opacity-25">✦</div>
      </div>
      <div className="p-6">
        <span className="text-xs text-[#6B5350]">{product.subtitle}</span>
        <h3 className="mt-2 font-medium">{product.title}</h3>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-semibold text-[#A67C52]">{product.price} ت</span>
          <button
            aria-label={`افزودن ${product.title} به سبد`}
            className="grid size-10 place-items-center rounded-full bg-[#F2D6CD] text-[#3D2C2A] transition hover:scale-105 hover:bg-[#D9827C] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9827C]/30"
          >
            +
          </button>
        </div>
      </div>
    </motion.article>
  );
}
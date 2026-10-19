"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ingredients } from "../types/ingredients";

export function IngredientsSection() {
  return (
    <section id="science" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
      <SectionHeading
        title="ترکیبات شفاف، نتیجه واقعی"
        description="تمرکز روی سد دفاعی پوست، رطوبت‌رسانی و درخشش کنترل‌شده."
        action="مشاهده ترکیبات"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {ingredients.map((ingredient) => (
          <motion.div
            key={ingredient.name}
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-[#F0E1DC] bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-[#FFF1EC] text-xl text-[#A67C52]">
              {ingredient.icon}
            </span>
            <h3 className="mt-5 font-medium">{ingredient.name}</h3>
            <p className="mt-2 text-sm leading-7 text-[#6B5350]">
              {ingredient.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
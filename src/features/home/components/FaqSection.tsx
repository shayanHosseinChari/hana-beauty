"use client";

import { useState } from "react";
import { faqs } from "../data/faqs";
import { FaqAccordion } from "@/features/faq/components/FaqAccordion";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
      <div className="rounded-[2.5rem] border border-[#F0E1DC] bg-white p-6 sm:p-10">
        <div className="text-center">
          <span className="text-sm font-medium text-[#A67C52]">NEED TO KNOW</span>
          <h2 className="mt-3 text-3xl font-semibold">سؤالات پرتکرار</h2>
        </div>
        <FaqAccordion
          faqs={faqs}
          openIndex={openFaq}
          onToggle={(i) => setOpenFaq(i)}
        />
      </div>
    </section>
  );
}
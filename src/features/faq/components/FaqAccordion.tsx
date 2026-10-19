"use client";

import { AnimatePresence, motion } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  openIndex: number | null;
  onToggle: (index: number | null) => void;
}

export function FaqAccordion({ faqs, openIndex, onToggle }: FaqAccordionProps) {
  return (
    <div className="mt-8 space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen
                ? "border-[#D9827C]/50 bg-[#FFF8F6]"
                : "border-[#F0E1DC] bg-white"
            }`}
          >
            <button
              onClick={() => onToggle(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-start font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#D9827C]/20"
            >
              <span>{faq.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="grid size-8 shrink-0 place-items-center rounded-full bg-[#F2D6CD] text-lg text-[#3D2C2A]"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-5 pb-5 text-sm leading-8 text-[#6B5350]">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
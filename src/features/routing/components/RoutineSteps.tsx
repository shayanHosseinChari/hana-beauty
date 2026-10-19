"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RoutineStep } from "../types/types";

interface RoutineStepsProps {
  goalKey: string;
  steps: RoutineStep[];
}

export function RoutineSteps({ goalKey, steps }: RoutineStepsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={goalKey}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -18 }}
        transition={{ duration: 0.35 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-3xl border border-[#F0E1DC] bg-[#FFFDFC] p-6 transition hover:-translate-y-1 hover:border-[#D9827C]/50"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[#F2D6CD] text-sm font-semibold text-[#3D2C2A]">
              {index + 1}
            </span>
            <h3 className="mt-5 font-medium">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#6B5350]">
              {step.description}
            </p>
            <div className="mt-5 border-t border-[#F0E1DC] pt-4 text-xs text-[#A67C52]">
              {step.product}
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
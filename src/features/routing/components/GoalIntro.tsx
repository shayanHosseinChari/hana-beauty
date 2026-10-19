"use client";

import { AnimatePresence, motion } from "framer-motion";

interface GoalIntroProps {
  goalKey: string;
  intro: string;
}

export function GoalIntro({ goalKey, intro }: GoalIntroProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={goalKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="mt-6 text-sm leading-7 text-[#8C4A43]"
      >
        {intro}
      </motion.p>
    </AnimatePresence>
  );
}
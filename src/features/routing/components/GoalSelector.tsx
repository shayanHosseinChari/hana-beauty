"use client";

import type { GoalKey } from "../types/types";
import { goals } from "../data/goals";

interface GoalSelectorProps {
  activeGoal: GoalKey;
  onChange: (key: GoalKey) => void;
}

export function GoalSelector({ activeGoal, onChange }: GoalSelectorProps) {
  return (
    <div className="mt-7 flex flex-wrap gap-2">
      {(Object.keys(goals) as GoalKey[]).map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          aria-pressed={activeGoal === key}
          className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9827C]/30 ${
            activeGoal === key
              ? "border-[#3D2C2A] bg-[#3D2C2A] text-white shadow-md"
              : "border-[#F0E1DC] bg-white text-[#6B5350] hover:border-[#D9827C] hover:bg-[#FFF8F6]"
          }`}
        >
          <span>{goals[key].icon}</span>
          {goals[key].label}
        </button>
      ))}
    </div>
  );
}
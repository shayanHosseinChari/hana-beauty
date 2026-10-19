// src/features/home/components/RoutineSection.tsx

"use client";

import { GoalIntro } from "@/features/routing/components/GoalIntro";
import { GoalSelector } from "@/features/routing/components/GoalSelector";
import { RoutineSteps } from "@/features/routing/components/RoutineSteps";
import { useActiveGoal } from "@/features/routing/hooks/useActiveGoal";

export function RoutineSection() {
  const { activeGoal, setActiveGoal, currentGoal } = useActiveGoal("glow");

  return (
    <section id="routine" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
      <div className="rounded-[2.5rem] border border-[#F0E1DC] bg-white/70 p-6 shadow-[0_18px_60px_rgba(61,44,42,.06)] backdrop-blur-md sm:p-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* ستون توضیحات + انتخاب هدف */}
          <div className="lg:col-span-4">
            <span className="text-sm font-medium text-[#A67C52]">
              PERSONALIZED CARE
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              روتین‌ساز هوشمند
            </h2>
            <p className="mt-4 leading-8 text-[#6B5350]">
              هدف پوستی‌ات را انتخاب کن تا یک روتین سه‌مرحله‌ای، ساده و کاربردی
              دریافت کنی.
            </p>

            <GoalSelector activeGoal={activeGoal} onChange={setActiveGoal} />
            <GoalIntro goalKey={activeGoal} intro={currentGoal.intro} />
          </div>

          {/* ستون مراحل روتین */}
          <div className="lg:col-span-8">
            <RoutineSteps goalKey={activeGoal} steps={currentGoal.steps} />
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import type { GoalKey } from "../types/types";
import { goals } from "../data/goals";

export function useActiveGoal(initial: GoalKey = "glow") {
  const [activeGoal, setActiveGoal] = useState<GoalKey>(initial);
  const currentGoal = goals[activeGoal];

  return { activeGoal, setActiveGoal, currentGoal };
}
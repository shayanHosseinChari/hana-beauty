export type GoalKey = "glow" | "acne" | "blemish" | "dryness";

export interface RoutineStep {
  title: string;
  description: string;
  product: string;
}

export interface Goal {
  label: string;
  icon: string;
  intro: string;
  steps: RoutineStep[];
}
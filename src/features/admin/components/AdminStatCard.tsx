// src/features/admin/components/AdminStatCard.tsx
import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  tone?: "default" | "warning" | "success" | "danger";
};

const TONES: Record<NonNullable<Props["tone"]>, string> = {
  default: "text-[#D9827C] bg-[#FBF2EF]",
  warning: "text-amber-600 bg-amber-100",
  success: "text-emerald-600 bg-emerald-100",
  danger: "text-rose-600 bg-rose-100",
};

export function AdminStatCard({ label, value, hint, icon, tone = "default" }: Props) {
  return (
    <div className="rounded-2xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur transition hover:border-[#D9827C]/50 hover:shadow-[0_8px_30px_-12px_rgba(217,130,124,0.35)]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#A78A85]">{label}</span>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full ${TONES[tone]}`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-lg font-bold text-[#3D2C2A]">{value}</p>
      {hint && <p className="mt-1 text-[10px] text-[#A78A85]">{hint}</p>}
    </div>
  );
}
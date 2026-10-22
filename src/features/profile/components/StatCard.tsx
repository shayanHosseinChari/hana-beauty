// src/features/profile/components/StatCard.tsx
type Props = {
  label: string;
  value: string;
  hint?: string;
  icon: React.ReactNode;
};

export function StatCard({ label, value, hint, icon }: Props) {
  return (
    <div className="rounded-2xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur transition hover:border-[#D9827C]/50 hover:shadow-[0_8px_30px_-12px_rgba(217,130,124,0.35)]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#A78A85]">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBF2EF] text-[#D9827C]">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-lg font-bold text-[#3D2C2A]">{value}</p>
      {hint && <p className="mt-1 text-[10px] text-[#A78A85]">{hint}</p>}
    </div>
  );
}
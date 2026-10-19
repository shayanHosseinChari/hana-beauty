"use client";

import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "tonal" | "outlined";

const styles: Record<Variant, string> = {
  primary: "bg-[#3D2C2A] text-white hover:bg-[#513B37]",
  tonal: "bg-[#F2D6CD] text-[#3D2C2A] hover:bg-[#EAC7BE]",
  outlined:
    "border border-[#F0E1DC] bg-white/70 text-[#3D2C2A] hover:bg-[#FFF8F6]",
};

export function RippleButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`group relative isolate inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-[.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D9827C]/30 ${styles[variant]} ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 scale-0 rounded-full bg-white/20 transition-transform duration-500 group-hover:scale-150" />
      {children}
    </button>
  );
}
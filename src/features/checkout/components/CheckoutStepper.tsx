// src/features/checkout/components/CheckoutStepper.tsx
"use client";

import Link from "next/link";
import type { CheckoutStep } from "../types/checkout.typ";

const STEPS: { id: CheckoutStep; label: string; href: string }[] = [
  { id: 1, label: "اطلاعات ارسال", href: "/checkout" },
  { id: 2, label: "روش پرداخت", href: "/checkout/payment" },
  { id: 3, label: "بازبینی و پرداخت", href: "/checkout/review" },
];

export function CheckoutStepper({ step }: { step: CheckoutStep }) {
  return (
    <nav dir="rtl" aria-label="مراحل پرداخت" className="mb-8">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((s, i) => {
          const done = s.id < step;
          const active = s.id === step;
          const linkable = done;

          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              {linkable ? (
                <Link
                  href={s.href}
                  className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-[#F5E6E1]"
                >
                  <StepCircle done active={false} index={i} />
                  <StepLabel done active={false} label={s.label} />
                </Link>
              ) : (
                <div className="flex cursor-default items-center gap-2 rounded-full px-2 py-1">
                  <StepCircle done={false} active={active} index={i} />
                  <StepLabel done={false} active={active} label={s.label} />
                </div>
              )}

              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`h-px flex-1 transition-colors ${
                    done ? "bg-[#D9827C]/50" : "bg-[#E8D5CE]"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepCircle({ done, active, index }: { done: boolean; active: boolean; index: number }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
        active
          ? "bg-[#D9827C] text-white shadow-[0_4px_16px_-4px_rgba(217,130,124,0.5)]"
          : done
          ? "bg-[#F5E6E1] text-[#C46A64]"
          : "border border-[#E8D5CE] bg-white text-[#A78A85]"
      }`}
    >
      {done ? (
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <path d="M2.5 8.5l4 4 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        (index + 1).toLocaleString("fa-IR")
      )}
    </span>
  );
}

function StepLabel({ done, active, label }: { done: boolean; active: boolean; label: string }) {
  return (
    <span
      className={`hidden whitespace-nowrap text-[11px] sm:inline ${
        active ? " text-[#3D2C2A]" : done ? "text-[#6B5350]" : "text-[#A78A85]"
      }`}
    >
      {label}
    </span>
  );
}
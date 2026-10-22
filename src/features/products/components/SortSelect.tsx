// src/components/products/SortSelect.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ProductFilters } from "../types/produt.typ";

const OPTIONS: { value: ProductFilters["sort"]; label: string }[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "popular", label: "پرفروش‌ترین" },
];

const ICONS: Record<ProductFilters["sort"], string> = {
  newest: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  "price-asc": "M3 18h6V6H3v12zM9 18h6V10H9v8zM15 18h6V14h-6v4z",
  "price-desc": "M3 6h6v12H3V6zM9 6h6v8H9V6zM15 6h6v4h-6V6z",
  popular: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z",
};

export function SortSelect({
  value,
  onChange,
}: {
  value: ProductFilters["sort"];
  onChange: (v: ProductFilters["sort"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  // بستن با کلیک بیرون
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // ناوبری کیبورد
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((p) => !p);
    }
  };

  return (
    <div ref={ref} className="relative" dir="rtl">
      {/* تریگر */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="مرتب‌سازی"
        className="group flex h-10 items-center gap-2 rounded-xl border border-[#E8D5CE]/70 bg-white/80 pl-3.5 pr-2.5 text-xs text-[#3D2C2A] backdrop-blur-md transition-all duration-200 hover:border-[#D9827C]/40 hover:bg-white/90 focus-visible:border-[#D9827C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9827C]/15"
      >
        {/* آیکون مرتب‌سازی */}
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F5EAE7] transition-colors duration-200 group-hover:bg-[#F0DFDB]">
          <svg className="h-3.5 w-3.5 text-[#C47570]" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[10px] tracking-wide text-[#A78A85]">مرتب‌سازی</span>
        <span className="h-3.5 w-px bg-[#E8D5CE]" />
        <span className="tracking-tight text-[#3D2C2A]">{active.label}</span>
        {/* چرون */}
        <svg
          className={`h-3.5 w-3.5 text-[#A78A85] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* پنل کشویی */}
      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[#EDE0DB]/60 bg-white/90 shadow-[0_12px_40px_-8px_rgba(180,110,100,0.15)] backdrop-blur-xl"
        >
          <div className="space-y-0.5 p-1.5">
            {OPTIONS.map((o) => {
              const selected = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs transition-all duration-200 ${
                    selected ? "bg-[#3D2C2A] text-white" : "text-[#5C4542] hover:bg-[#FAF2EF]"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md transition-colors ${
                      selected ? "bg-white/10" : "bg-[#F5EAE7] group-hover:bg-[#F0DFDB]"
                    }`}
                  >
                    <svg
                      className={`h-3 w-3 ${selected ? "text-white/80" : "text-[#C47570]"}`}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d={ICONS[o.value]}
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="tracking-tight">{o.label}</span>
                  {selected && (
                    <svg className="mr-auto h-3.5 w-3.5 text-white/60" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

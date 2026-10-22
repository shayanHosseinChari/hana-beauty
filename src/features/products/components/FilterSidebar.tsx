// src/components/products/FilterSidebar.tsx
"use client";

import { useState } from "react";
import { ProductFilters } from "../types/produt.typ";

type Props = {
  filters: ProductFilters;
  categories: { value: string; label: string; count?: number }[];
  brands: { value: string; label: string; count?: number }[];
  maxPossiblePrice: number;
  onPatch: (patch: Partial<ProductFilters>) => void;
  onReset: () => void;
};

export function FilterSidebar({
  filters,
  categories,
  brands,
  maxPossiblePrice,
  onPatch,
  onReset,
}: Props) {
  const [priceDraft, setPriceDraft] = useState({
    min: filters.minPrice ?? 0,
    max: filters.maxPrice ?? maxPossiblePrice,
  });

  const applyPrice = () => {
    onPatch({
      minPrice: priceDraft.min > 0 ? priceDraft.min : null,
      maxPrice: priceDraft.max < maxPossiblePrice ? priceDraft.max : null,
      page: 1,
    });
  };

  const fmt = (n: number) => n.toLocaleString("fa-IR");

  const progressPercent =
    maxPossiblePrice > 0
      ? Math.round((priceDraft.max / maxPossiblePrice) * 100)
      : 100;

  return (
    <aside
      dir="rtl"
      className="w-full shrink-0 lg:w-72"
    >
      {/* کانتینر اصلی با شیشه */}
      <div className="overflow-hidden rounded-[28px] border border-[#EDE0DB]/60 bg-white/80 shadow-[0_8px_40px_-12px_rgba(180,110,100,0.12)] backdrop-blur-xl">

        {/* هدر */}
        <div className="flex items-center justify-between border-b border-[#F0E4E0]/70 px-5 py-4">
          <div className="flex items-center gap-2.5">
            {/* آیکون فیلتر */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5EAE7]">
              <svg className="h-3.5 w-3.5 text-[#C47570]" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M4 8h8M6 12h4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-sm tracking-tight text-[#3D2C2A]">فیلترها</span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="group flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] text-[#B07B76] transition-all duration-200 hover:bg-[#FAF0EE] hover:text-[#D9827C]"
          >
            <svg className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 12 12" fill="none">
              <path
                d="M10 6A4 4 0 1 1 6 2a4 4 0 0 1 2.83 1.17L10 4.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path d="M8 4.5h2V2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            پاک کردن
          </button>
        </div>

        <div className="space-y-0 divide-y divide-[#F4E8E4]/60">

          {/* دسته‌بندی */}
          <FilterSection title="دسته‌بندی">
            <div className="space-y-0.5">
              {categories.map((c) => (
                <OptionRow
                  key={c.value}
                  checked={filters.category === c.value}
                  label={c.label}
                  count={c.count}
                  onSelect={() =>
                    onPatch({ category: filters.category === c.value ? null : c.value, page: 1 })
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* برند */}
          <FilterSection title="برند">
            <div className="space-y-0.5">
              {brands.map((b) => (
                <OptionRow
                  key={b.value}
                  checked={filters.brand === b.value}
                  label={b.label}
                  count={b.count}
                  onSelect={() =>
                    onPatch({ brand: filters.brand === b.value ? null : b.value, page: 1 })
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* محدوده قیمت */}
          <FilterSection title="محدوده قیمت">
            <div className="space-y-4">

              {/* نمایش بازه انتخابی */}
              <div className="flex items-center justify-between rounded-2xl bg-[#FAF2EF] px-3.5 py-2.5">
                <span className="text-[11px] text-[#A07570]">از</span>
                <span className="text-xs text-[#3D2C2A]">{fmt(priceDraft.min)} تومان</span>
                <span className="text-[#D5C0BB]">—</span>
                <span className="text-xs text-[#3D2C2A]">{fmt(priceDraft.max)} تومان</span>
                <span className="text-[11px] text-[#A07570]">تا</span>
              </div>

              {/* اسلایدر سفارشی */}
              <div className="relative px-0.5">
                {/* track پس‌زمینه */}
                <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 overflow-hidden rounded-full bg-[#EFE2DE]">
                  {/* fill */}
                  <div
                    className="absolute right-0 h-full rounded-full bg-gradient-to-l from-[#D9827C] to-[#E8A09A] transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxPossiblePrice}
                  step={Math.max(1, Math.round(maxPossiblePrice / 100))}
                  value={priceDraft.max}
                  onChange={(e) =>
                    setPriceDraft((p) => ({ ...p, max: Number(e.target.value) }))
                  }
                  aria-label="حداکثر قیمت"
                  className="relative w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#D9827C] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_6px_rgba(217,130,124,0.35)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#D9827C] [&::-moz-range-thumb]:bg-white"
                />
              </div>

              {/* ورودی‌های عددی */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={priceDraft.min}
                    onChange={(e) =>
                      setPriceDraft((p) => ({ ...p, min: Number(e.target.value) || 0 }))
                    }
                    placeholder="از"
                    className="h-9 w-full rounded-xl border border-[#EAD8D4] bg-white/90 px-3 pt-0.5 text-xs text-[#3D2C2A] outline-none transition-colors focus:border-[#D9827C] focus:ring-1 focus:ring-[#D9827C]/20 placeholder:text-[#C4A8A3]"
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={priceDraft.max}
                    onChange={(e) =>
                      setPriceDraft((p) => ({ ...p, max: Number(e.target.value) || 0 }))
                    }
                    placeholder="تا"
                    className="h-9 w-full rounded-xl border border-[#EAD8D4] bg-white/90 px-3 pt-0.5 text-xs text-[#3D2C2A] outline-none transition-colors focus:border-[#D9827C] focus:ring-1 focus:ring-[#D9827C]/20 placeholder:text-[#C4A8A3]"
                  />
                </div>
              </div>

              {/* دکمه اعمال */}
              <button
                type="button"
                onClick={applyPrice}
                className="group relative w-full overflow-hidden rounded-xl bg-[#3D2C2A] py-2.5 text-xs text-white/90 transition-all duration-300 hover:bg-[#D9827C] active:scale-[0.98]"
              >
                <span className="relative z-10 tracking-wide">اعمال فیلتر قیمت</span>
              </button>
            </div>
          </FilterSection>

          {/* موجودی */}
          <div className="px-5 py-4">
            <button
              type="button"
              role="switch"
              aria-checked={filters.inStock}
              onClick={() => onPatch({ inStock: !filters.inStock, page: 1 })}
              className="group flex w-full items-center justify-between"
            >
              <span className="text-xs text-[#5C3E3A]">فقط کالاهای موجود</span>
              {/* toggle سوئیچ */}
              <div
                className={`relative h-6 w-10 rounded-full border transition-all duration-300 ${
                  filters.inStock
                    ? "border-[#D9827C] bg-[#D9827C]"
                    : "border-[#DDD0CC] bg-[#F5EDEB]"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                    filters.inStock ? "right-0.5" : "right-4"
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4">
      <p className="mb-3 text-[11px] tracking-widest text-[#B09490] uppercase">{title}</p>
      {children}
    </div>
  );
}

function OptionRow({
  checked,
  label,
  count,
  onSelect,
}: {
  checked: boolean;
  label: string;
  count?: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-all duration-200 ${
        checked
          ? "bg-[#3D2C2A] text-white"
          : "text-[#6B5350] hover:bg-[#FAF2EF] hover:text-[#3D2C2A]"
      }`}
    >
      <span className="flex items-center gap-2.5">
        {/* indicator */}
        <span
          className={`relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
            checked
              ? "border-[#E8A09A] bg-[#E8A09A]"
              : "border-[#CDBAB7] group-hover:border-[#D9827C]"
          }`}
        >
          {checked && (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          )}
        </span>
        {label}
      </span>
      {typeof count === "number" && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] transition-colors ${
            checked ? "bg-white/20 text-white/70" : "bg-[#F0E8E5] text-[#B09490]"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

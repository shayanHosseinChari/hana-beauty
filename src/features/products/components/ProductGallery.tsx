// src/components/products/ProductGallery.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = { images: string[]; alt: string };

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const list = images.length ? images : [""];
  const total = list.length;

  const go = (i: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive(((i % total) + total) % total);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, isTransitioning]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on: true,
    });
  };

  return (
    <div className="w-full space-y-3" dir="rtl">
      {/* ─── فریم اصلی — ارتفاع ثابت بدون aspect-square ─── */}
      <div
        className="group relative w-full select-none overflow-hidden rounded-[24px] bg-[#FBF5F3]"
        style={{
          height: "min(420px, 55vw)",
          boxShadow:
            "0 0 0 1px rgba(180,110,100,0.08), 0 6px 32px -8px rgba(180,110,100,0.16), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
      >
        {/* اسلایدر */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(${active * 100}%)` }}
        >
          {list.map((src, i) => (
            <div
              key={i}
              className="relative h-full w-full shrink-0 overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#FBF5F3]/50 to-transparent" />
              <img
                src={src}
                alt={`${alt} - تصویر ${i + 1}`}
                draggable={false}
                className="h-full w-full object-cover"
                style={
                  zoom.on && active === i
                    ? {
                        transform: "scale(1.8)",
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                        cursor: "zoom-in",
                        transition: "transform 0.1s ease",
                      }
                    : { transition: "transform 0.3s ease" }
                }
              />
            </div>
          ))}
        </div>

        {/* دکمه‌های ناوبری */}
        {total > 1 && (
          <>
            <NavButton direction="prev" onClick={prev} label="تصویر قبلی" />
            <NavButton direction="next" onClick={next} label="تصویر بعدی" />
          </>
        )}

        {/* شمارنده */}
        {total > 1 && (
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2.5 py-1 backdrop-blur-md">
            <span className="text-[10px] tabular-nums text-[#3D2C2A]">
              {(active + 1).toLocaleString("fa-IR")}
            </span>
            <span className="text-[9px] text-[#B09490]">/</span>
            <span className="text-[10px] tabular-nums text-[#B09490]">
              {total.toLocaleString("fa-IR")}
            </span>
          </div>
        )}

        {/* زوم hint */}
        <div className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/25 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <svg className="h-3 w-3 text-[#6B5350]" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10 10L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M6.5 4.5v4M4.5 6.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        {/* dot indicators */}
        {total > 1 && total <= 8 && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`تصویر ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-4 bg-[#D9827C]" : "w-1 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ثامبنیل‌ها — فشرده‌تر */}
      {total > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {list.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`تصویر ${i + 1}`}
              aria-current={i === active}
              className={`group/thumb relative overflow-hidden rounded-xl transition-all duration-300 ${
                i === active
                  ? "ring-2 ring-[#D9827C] ring-offset-1 ring-offset-white"
                  : "opacity-50 hover:opacity-75"
              }`}
              style={{ aspectRatio: "1", boxShadow: i === active ? "0 3px 12px -3px rgba(217,130,124,0.28)" : undefined }}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
              />
              {i === active && (
                <div className="absolute inset-0 bg-[#D9827C]/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/65 text-[#5C3E3A] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:text-[#D9827C] active:scale-90 ${
        isPrev ? "left-3" : "right-3"
      }`}
      style={{ boxShadow: "0 2px 12px -2px rgba(180,100,95,0.18)" }}
    >
      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
        <path
          d={isPrev ? "M7.5 2.5L4 6l3.5 3.5" : "M4.5 2.5L8 6l-3.5 3.5"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

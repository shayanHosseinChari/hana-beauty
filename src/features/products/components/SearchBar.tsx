// src/components/products/SearchBar.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  defaultValue = "",
  onChange,
  placeholder = "جستجو بین محصولات...",
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // debounce
  useEffect(() => {
    const t = setTimeout(() => onChange(value.trim()), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative w-full" dir="rtl">
      {/* کانتینر با ring داینامیک */}
      <div
        className={`group relative flex items-center overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-md transition-all duration-300 ${
          focused
            ? "border-[#D9827C]/60 shadow-[0_0_0_3px_rgba(217,130,124,0.12),0_4px_20px_-4px_rgba(180,100,95,0.15)]"
            : "border-[#EAD8D4] shadow-[0_2px_12px_-3px_rgba(180,100,95,0.08)] hover:border-[#D9827C]/30"
        }`}
      >
        {/* آیکون جستجو */}
        <span
          className={`flex h-12 w-11 shrink-0 items-center justify-center transition-colors duration-200 ${
            focused ? "text-[#D9827C]" : "text-[#C4A8A3]"
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
          >
            <circle
              cx="8.5"
              cy="8.5"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M13.5 13.5L17 17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>

        {/* جداکننده عمودی */}
        <span
          className={`h-5 w-px shrink-0 transition-colors duration-200 ${
            focused ? "bg-[#E8D0CB]" : "bg-[#EFE3DF]"
          }`}
        />

        {/* input */}
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          aria-label="جستجوی محصولات"
          className="h-12 flex-1 bg-transparent px-3 text-sm text-[#3D2C2A] outline-none placeholder:text-[#C4B0AC] [&::-webkit-search-cancel-button]:hidden"
        />

        {/* دکمه پاک کردن */}
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
            aria-label="پاک کردن جستجو"
            className="ml-2 mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0E4E0] text-[#A78A85] transition-all duration-200 hover:bg-[#E8D0CB] hover:text-[#D9827C] active:scale-90"
          >
            <svg
              viewBox="0 0 10 10"
              fill="none"
              className="h-2.5 w-2.5"
            >
              <path
                d="M2 2L8 8M8 2L2 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        {/* padding راست برای تراز */}
        <span className="w-2 shrink-0" />
      </div>
    </div>
  );
}

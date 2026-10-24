// src/components/layout/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  ["فروشگاه", "/products"],
  ["دسته بندی ها", "/categories"],
  ["برند ها", "/brands"],
  ["سؤالات", "#faq"],
] as const;

export function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav aria-label="ناوبری اصلی" className="hidden items-center gap-1 lg:flex">
      {NAV_ITEMS.map(([label, href]) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              active ? "text-[#C46A64]" : "text-[#6B5350] hover:text-[#3D2C2A]"
            }`}
          >
            <span className="relative z-10">{label}</span>
            <span
              aria-hidden="true"
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                active
                  ? "scale-100 bg-[#F5E6E1] opacity-100"
                  : "scale-90 bg-[#F5E6E1] opacity-0 group-hover:scale-100 group-hover:opacity-100"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#D9827C] transition-all duration-300 ${
                active ? "w-6" : "w-0 group-hover:w-6"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
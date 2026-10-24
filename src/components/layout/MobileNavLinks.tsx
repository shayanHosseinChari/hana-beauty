// src/components/layout/MobileNavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  ["فروشگاه", "/products"],
  ["دسته بندی ها", "/categories"],
  ["برند ها", "/brands"],
  ["سؤالات", "#faq"],
] as const;

export function MobileNavLinks({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {NAV_ITEMS.map(([label, href]) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={onClose}
            className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              active
                ? "bg-[#F5E6E1] text-[#C46A64]"
                : "text-[#6B5350] hover:bg-[#F5E6E1] hover:text-[#3D2C2A]"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
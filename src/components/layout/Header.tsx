// src/components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { RippleButton } from "@/components/ui/RippleButton";
import { usePathname, useRouter } from "next/navigation";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import Link from "next/link";

const NAV_ITEMS = [
  ["فروشگاه", "/products"],
  ["دسته بندی ها", "/categories"],
  ["برند ها", "/brands"],
  ["سؤالات", "#faq"],
] as const;

const ICON_BUTTON_CLASS =
  "group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8D5CE] bg-white/70 text-[#6B5350] backdrop-blur transition-all duration-300 hover:border-[#D9827C]/60 hover:bg-white hover:text-[#D9827C] hover:shadow-[0_4px_20px_-4px_rgba(217,130,124,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9827C] focus-visible:ring-offset-2";

type HeaderProps = {
  onAccountClick?: () => void;
  onFavoritesClick?: () => void;
};

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function HeartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      />
    </svg>
  );
}

function AccountActions({
  onAccountClick,
  onFavoritesClick,
}: HeaderProps) {
  const navigation = useRouter();
  return (
    <div className="flex items-center gap-2.5" dir="rtl">
      <button
        type="button"
        onClick={() => {
          navigation.push("/profile");
        }}
        aria-label="حساب کاربری"
        title="حساب کاربری"
        className={ICON_BUTTON_CLASS}
      >
        <UserIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </button>

      <button
        type="button"
        onClick={onFavoritesClick}
        aria-label="علاقه‌مندی‌ها"
        title="علاقه‌مندی‌ها"
        className={ICON_BUTTON_CLASS}
      >
        <HeartIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </button>
    </div>
  );
}

export function Header({
  onAccountClick,
  onFavoritesClick,
}: HeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigation = useRouter();
  const pathname = usePathname();

  // تشخیص فعال بودن مسیر
  const isActive = (href: string) => {
    if (href.startsWith("#")) return false; // لینک‌های hash فعال نمی‌شوند
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const handleMobileAccountClick = () => {
    setMobileOpen(false);
    onAccountClick?.();
  };

  const handleMobileFavoritesClick = () => {
    setMobileOpen(false);
    onFavoritesClick?.();
  };

  return (
    <>
      <header
        dir="rtl"
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#E8D5CE] bg-[#FDF7F5]/95 shadow-[0_8px_32px_-12px_rgba(217,130,124,0.25)] backdrop-blur-2xl"
            : "border-b border-transparent bg-gradient-to-b from-[#FDF7F5] to-[#FDF7F5]/60 backdrop-blur-md"
        }`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D9827C] to-transparent opacity-60" />

        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8">
          <a
            href="/"
            aria-label="صفحه اصلی"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[#D9827C]/20 blur-xl transition-all duration-500 group-hover:bg-[#D9827C]/40 group-hover:blur-2xl" />

              <img
                src="/logo.png"
                fetchPriority="high"
                alt="لوگوی فروشگاه"
                width={140}
                height={50}
                className="relative h-auto w-[120px] object-contain sm:w-[140px]"
              />
            </div>
          </a>

          <nav
            aria-label="ناوبری اصلی"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_ITEMS.map(([label, href]) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active
                      ? "text-[#C46A64]"
                      : "text-[#6B5350] hover:text-[#3D2C2A]"
                  }`}
                >
                  <span className="relative z-10">{label}</span>

                  {/* پس‌زمینه هاور / فعال */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      active
                        ? "scale-100 bg-[#F5E6E1] opacity-100"
                        : "scale-90 bg-[#F5E6E1] opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />

                  {/* خط زیرین */}
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

          <div className="flex items-center gap-2.5">
            {/* سبد خرید */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`سبد خرید، ${cartCount} کالا`}
              title="سبد خرید"
              className={ICON_BUTTON_CLASS}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>

              {cartCount > 0 && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute -right-0.5 -top-0.5 z-10 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-[#D9827C] to-[#C46A64] px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-[#FDF7F5] transition-transform duration-300 group-hover:scale-110"
                  >
                    {cartCount}
                  </span>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-0.5 -top-0.5 h-5 w-5 animate-ping rounded-full bg-[#D9827C]/40 motion-reduce:animate-none"
                  />
                </>
              )}
            </button>

            <div className="hidden items-center gap-3.5 lg:flex">
              <AccountActions
                onAccountClick={onAccountClick}
                onFavoritesClick={onFavoritesClick}
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((previous) => !previous)}
              aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={mobileOpen}
              aria-controls="header-mobile-menu"
              className={`${ICON_BUTTON_CLASS} lg:hidden`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-300"
                style={{
                  transform: mobileOpen ? "rotate(90deg)" : "none",
                }}
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="header-mobile-menu"
          aria-hidden={!mobileOpen}
          className={`grid overflow-hidden bg-[#FDF7F5]/95 backdrop-blur-xl transition-all duration-[400ms] lg:hidden ${
            mobileOpen
              ? "visible grid-rows-[1fr] border-t border-[#F0E1DC]/80 opacity-100"
              : "invisible grid-rows-[0fr] border-t border-transparent opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              aria-label="ناوبری موبایل"
              className="flex flex-col gap-1 px-5 py-4"
            >
              {NAV_ITEMS.map(([label, href]) => {
                const active = isActive(href);
                return (
                  <a
                    key={href}
                    href={href}
                    tabIndex={mobileOpen ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#F5E6E1] text-[#C46A64]"
                        : "text-[#6B5350] hover:bg-[#F5E6E1] hover:text-[#3D2C2A]"
                    }`}
                  >
                    {label}
                  </a>
                );
              })}

              <div
                onClick={() => {
                  navigation.push("/profile");
                }}
                className="mt-3 flex flex-col gap-3 border-t border-[#F0E1DC]/80 pt-4"
              >
                <RippleButton
                  variant="outlined"
                  onClick={handleMobileAccountClick}
                  className="inline-flex w-full items-center justify-center gap-2 border-[#E8D5CE] text-[#6B5350]"
                >
                  <UserIcon className="h-4 w-4" />
                  حساب کاربری
                </RippleButton>

                <RippleButton
                  variant="outlined"
                  onClick={handleMobileFavoritesClick}
                  className="inline-flex w-full items-center justify-center gap-2 border-[#E8D5CE] text-[#6B5350]"
                >
                  <HeartIcon className="h-4 w-4" />
                  علاقه‌مندی‌ها
                </RippleButton>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
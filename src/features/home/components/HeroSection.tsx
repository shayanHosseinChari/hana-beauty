// src/features/home/components/HeroSection.tsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RippleButton } from "@/components/ui/RippleButton";

export function HeroSection() {
  const [showFloatingActions, setShowFloatingActions] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.9;
      setShowFloatingActions(window.scrollY > 40 && window.scrollY < heroHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <FloatingPetals />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-28">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <HeroContent />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <HeroVisual />
        </div>
      </div>

      <ScrollIndicator />
      <MobileFloatingActions visible={showFloatingActions} />
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(217,130,124,.35),transparent_50%),radial-gradient(ellipse_at_10%_50%,rgba(166,124,82,.22),transparent_45%),linear-gradient(180deg,#FDF7F5_0%,#FFF_60%,#FDF7F5_100%)]" />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 right-1/4 h-[420px] w-[420px] rounded-full bg-[#D9827C]/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 h-[360px] w-[360px] rounded-full bg-[#A67C52]/15 blur-[110px]"
      />
    </div>
  );
}

function FloatingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute block h-3 w-5 rounded-full bg-gradient-to-br from-[#D9827C]/50 to-[#F2D6CD]/40"
          style={{ top: `${15 + i * 12}%`, left: `${8 + i * 15}%` }}
          animate={{
            y: [0, -18, 0],
            x: [0, 8, 0],
            rotate: [18, 32, 18],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 9 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

function HeroContent() {
  return (
    <div>
      <TrustBadge />

      <h1 className="max-w-2xl text-4xl font-semibold leading-[1.2] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="block"
        >
          زیباییِ آگاهانه،
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-2 block bg-gradient-to-l from-[#D9827C] via-[#C9706A] to-[#A67C52] bg-clip-text text-transparent"
        >
          روتینِ مخصوص تو
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 max-w-xl text-base leading-8 text-[#6B5350] sm:text-lg"
      >
        ترکیبات شفاف، تجربه‌ای لوکس و انتخابی ساده برای پوستی که هر روز بهتر
        خودش را نشان می‌دهد.
      </motion.p>

      <HeroActions />
      <SocialProof />
    </div>
  );
}

function TrustBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-[#F0E1DC] bg-white/70 px-4 py-2 text-xs text-[#8C4A43] shadow-sm backdrop-blur-md"
    >
      <span className="grid size-5 place-items-center rounded-full bg-[#F2D6CD] text-[10px]">
        ✦
      </span>
      <span>لوکس، ملایم، موثر؛ هماهنگ با بیوم پوست</span>
      <span className="h-1 w-1 rounded-full bg-[#D9827C]" />
      <span className="text-[#A67C52]">جدید ۱۴۰۴</span>
    </motion.div>
  );
}

function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55 }}
      className="mt-8 hidden flex-wrap items-center gap-4 sm:flex"
    >
      <a href="#shop" className="group">
        <span className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[#3D2C2A] px-8 text-sm font-medium text-white shadow-lg shadow-[#3D2C2A]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#3D2C2A]/30">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          شروع خرید
        </span>
      </a>
      <a href="#routine">
        <RippleButton variant="tonal" className="h-14 px-8">
          ساخت روتین اختصاصی
        </RippleButton>
      </a>
    </motion.div>
  );
}

const AVATAR_COLORS = ["#F2D6CD", "#EBD8C1", "#D9E3D6", "#F7D8D1"];
const AVATAR_INITIALS = ["س", "م", "ن", "ر"];

function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.7 }}
      className="mt-10 flex flex-wrap items-center gap-6"
    >
      <div className="flex -space-x-3 space-x-reverse">
        {AVATAR_COLORS.map((color, i) => (
          <span
            key={i}
            className="grid size-10 place-items-center rounded-full border-2 border-white text-xs font-semibold text-[#3D2C2A] shadow-sm"
            style={{ background: color }}
          >
            {AVATAR_INITIALS[i]}
          </span>
        ))}
      </div>
      <div>
        <div className="flex items-center gap-1 text-[#A67C52]">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-sm">
              ★
            </span>
          ))}
          <strong className="ms-1 text-sm text-[#241B1A]">۴.۹</strong>
        </div>
        <p className="mt-1 text-xs text-[#6B5350]">
          رضایت بیش از ۱۲٬۰۰۰ مشتری
        </p>
      </div>
    </motion.div>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-[#F2D6CD]/50 via-transparent to-[#A67C52]/25 blur-3xl" />

      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="aspect-square w-[105%] rounded-full border border-dashed border-[#D9827C]/25" />
      </div>

      <div className="relative mx-auto w-full max-w-[520px] pb-16 sm:pb-10">
        <BlobImage />
        <EditorBadge />
        <HydrationCard />
        <ProductPreviewCard />
      </div>
    </motion.div>
  );
}

function BlobImage() {
  return (
    <motion.div
      animate={{
        borderRadius: [
          "62% 38% 46% 54% / 60% 42% 58% 40%",
          "44% 56% 62% 38% / 48% 60% 40% 52%",
          "56% 44% 38% 62% / 52% 44% 56% 48%",
          "62% 38% 46% 54% / 60% 42% 58% 40%",
        ],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="relative aspect-square w-full overflow-hidden border-[6px] border-white shadow-[0_30px_80px_-20px_rgba(61,44,42,.35)]"
    >
      <div className="pointer-events-none absolute inset-2 z-20 rounded-[inherit] border border-white/40" />

      <Image
        src="/lunea-hero.png"
        alt="محصولات مراقبت از پوست حنا بیوتی"
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 520px"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#3D2C2A]/35 via-transparent to-transparent" />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#3D2C2A] shadow-md backdrop-blur-md sm:right-5 sm:top-5 sm:px-3 sm:py-1.5 sm:text-[11px]"
      >
        <span className="size-1.5 rounded-full bg-[#D9827C]" />
        اورجینال
      </motion.div>
    </motion.div>
  );
}

function EditorBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="absolute -top-2 right-1 z-30 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-medium text-[#3D2C2A] shadow-lg backdrop-blur-md sm:-top-4 sm:right-6 sm:px-4 sm:py-2 sm:text-xs"
    >
      <span className="text-[#D9827C]">★</span>
      انتخاب سردبیر
    </motion.div>
  );
}

function ProductPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="absolute -bottom-2 left-1/2 z-30 w-[min(280px,90%)] -translate-x-1/2 rounded-2xl border border-[#F0E1DC] bg-white/95 p-3.5 shadow-[0_20px_50px_-15px_rgba(61,44,42,.3)] backdrop-blur-xl sm:-bottom-4 sm:left-auto sm:right-0 sm:translate-x-0 lg:-bottom-6 lg:-left-6 lg:left-auto lg:right-auto"
    >
      <div className="flex items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#F2D6CD] to-[#EBD8C1]">
          <Image
            src="/lunea-hero.png"
            alt="Cherry Blossom Glow Serum"
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-medium uppercase tracking-wide text-[#A67C52]">
            پیشنهاد امروز
          </span>
          <h2 className="mt-0.5 truncate text-xs font-semibold text-[#3D2C2A]">
            Cherry Blossom Serum
          </h2>
          <div className="mt-1 flex items-center gap-1.5">
            <s className="text-[10px] text-[#A67C52]/60">۶۹۰,۰۰۰</s>
            <span className="text-xs font-bold text-[#D9827C]">
              ۵۹۰,۰۰۰ ت
            </span>
          </div>
        </div>

        <button
          aria-label="افزودن به سبد"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-[#3D2C2A] text-white shadow-md transition hover:scale-110 hover:bg-[#D9827C] active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function HydrationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="absolute -right-1 top-1/3 z-20 hidden sm:block"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl border border-[#F0E1DC] bg-white/95 px-3.5 py-2.5 text-center shadow-lg backdrop-blur-md"
      >
        <div className="text-lg font-bold leading-none text-[#A67C52]">
          ۷۲h
        </div>
        <div className="mt-1 text-[10px] leading-none text-[#6B5350]">
          آبرسانی
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileFloatingActions({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-4 z-40 flex items-center gap-2.5 px-5 sm:hidden"
        >
          <a
            href="#shop"
            className="group relative flex h-13 flex-1 items-center justify-center overflow-hidden rounded-full bg-[#3D2C2A] px-5 text-sm font-medium text-white shadow-[0_10px_30px_-8px_rgba(61,44,42,.5)] active:scale-[0.98]"
            style={{ height: "52px" }}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            شروع خرید
          </a>
          <a
            href="#routine"
            className="flex flex-1 items-center justify-center rounded-full border border-[#D9827C]/30 bg-white/95 px-5 text-sm font-medium text-[#8C4A43] shadow-[0_10px_30px_-8px_rgba(217,130,124,.4)] backdrop-blur-md active:scale-[0.98]"
            style={{ height: "52px" }}
          >
            روتین اختصاصی
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#A67C52]/40 p-1"
      >
        <span className="h-2 w-1 rounded-full bg-[#A67C52]" />
      </motion.div>
    </motion.div>
  );
}
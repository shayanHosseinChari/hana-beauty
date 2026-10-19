// src/features/home/components/HeroSection.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/RippleButton";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <FloatingPetals />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-28">
        <HeroContent />
        <HeroVisual />
      </div>

      <ScrollIndicator />
    </section>
  );
}

/* ---------- Background Layers ---------- */

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

/* ---------- Text Column ---------- */

function HeroContent() {
  return (
    <div className="lg:col-span-6">
      <TrustBadge />

      <h1 className="max-w-2xl text-5xl font-semibold leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl">
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
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F0E1DC] bg-white/70 px-4 py-2 text-xs text-[#8C4A43] shadow-sm backdrop-blur-md"
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
      className="mt-8 flex flex-wrap items-center gap-4"
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

/* ---------- Visual Column ---------- */

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative lg:col-span-6"
    >
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[#F2D6CD]/40 via-transparent to-[#A67C52]/20 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/50 p-2 shadow-[0_30px_90px_rgba(61,44,42,.18)] backdrop-blur-md">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image
            src="/lunea-hero.webp"
            alt="محصولات مراقبت از پوست حنا بیوتی"
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C2A]/50 via-transparent to-transparent" />
          <EditorBadge />
        </div>
        <ProductPreviewCard />
      </div>

      <HydrationCard />
    </motion.div>
  );
}

function EditorBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#3D2C2A] shadow-md backdrop-blur-md"
    >
      <span className="text-[#A67C52]">★</span>
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
      className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[#6B5350]">پیشنهاد ویژه امروز</span>
          <h2 className="mt-1 text-sm font-medium">
            Cherry Blossom Glow Serum
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <s className="text-xs text-[#A67C52]/60">۶۹۰,۰۰۰</s>
            <span className="text-sm font-semibold text-[#A67C52]">
              ۵۹۰,۰۰۰ ت
            </span>
          </div>
        </div>
        <button
          aria-label="افزودن به سبد"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#3D2C2A] text-white shadow-lg transition hover:scale-105 hover:bg-[#513B37]"
        >
          +
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
      className="absolute -right-4 top-1/3 hidden rounded-2xl border border-[#F0E1DC] bg-white/90 p-3 shadow-lg backdrop-blur-md sm:block"
    >
      <div className="text-center">
        <div className="text-lg font-bold text-[#A67C52]">۷۲h</div>
        <div className="mt-0.5 text-[10px] text-[#6B5350]">آبرسانی</div>
      </div>
    </motion.div>
  );
}

/* ---------- Scroll Cue ---------- */

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2"
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
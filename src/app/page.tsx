"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PALETTE = {
  bg: "#FDF7F5",
  surface: "#FFFFFF",
  ink: "#241B1A",
  muted: "#6B5350",
  rose: "#D9827C",
  blush: "#F2D6CD",
  gold: "#A67C52",
  brown: "#3D2C2A",
  line: "#F0E1DC",
};

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const products = [
  { title: "Cherry Blossom Glow Serum", price: "۵۹۰,۰۰۰", tag: "پرفروش" },
  { title: "Rosegold Barrier Cream", price: "۶۸۰,۰۰۰", tag: "ویژه" },
  { title: "Botanical Cleansing Gel", price: "۴۳۰,۰۰۰", tag: "جدید" },
];

const steps = [
  { title: "پاکسازی", desc: "بدون خشکی، با حفظ سد دفاعی" },
  { title: "درمان هدفمند", desc: "سرم‌های تخصصی بر اساس نیاز" },
  { title: "آبرسانی", desc: "قفل رطوبت و درخشش طبیعی" },
];

export default function Home() {
  return (
    <div
      dir="rtl"
      className="min-h-screen antialiased"
      style={{ background: PALETTE.bg, color: PALETTE.ink }}
    >
      {/* Top App Bar (M3) */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ borderColor: PALETTE.line, background: "rgba(253,247,245,0.82)" }}
      >
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a className="flex items-center gap-3" href="#">
              <div
                className="w-11 h-11 rounded-full border shadow-sm grid place-items-center"
                style={{ borderColor: PALETTE.gold, background: "#FFF5F2" }}
              >
                <span className="font-serif text-lg font-bold" style={{ color: PALETTE.gold }}>
                  H
                </span>
              </div>
              <div className="leading-none">
                <div className="font-serif text-xl font-bold tracking-tight">Hana</div>
                <div className="text-[10px] tracking-[0.28em] uppercase font-medium" style={{ color: PALETTE.gold }}>
                  Beauty
                </div>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: PALETTE.muted }}>
              <a className="hover:opacity-80 transition" href="#shop">فروشگاه</a>
              <a className="hover:opacity-80 transition" href="#routine">روتین</a>
              <a className="hover:opacity-80 transition" href="#science">ترکیبات</a>
              <a className="hover:opacity-80 transition" href="#faq">سوالات</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="h-11 px-5 rounded-full border transition active:scale-95"
              style={{ borderColor: PALETTE.line, background: "rgba(255,255,255,0.7)" }}
            >
              ورود / ثبت‌نام
            </button>
            <button
              className="h-11 px-6 rounded-full text-white font-semibold shadow-sm transition hover:shadow-md active:scale-95"
              style={{ background: PALETTE.brown }}
            >
              مشاوره پوست
            </button>
          </div>
        </div>
      </header>

      {/* HERO (Modern / cinematic / glass) */}
      <section className="relative overflow-hidden">
        {/* Background gradient + blobs */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 500px at 70% 15%, rgba(217,130,124,0.30), transparent 60%)," +
              "radial-gradient(900px 520px at 20% 35%, rgba(166,124,82,0.18), transparent 60%)," +
              "linear-gradient(180deg, #FDF7F5 0%, #FFF 70%)",
          }}
        />
        {/* Floating petals (CSS only) */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <span className="petal petal-1" />
          <span className="petal petal-2" />
          <span className="petal petal-3" />
          <span className="petal petal-4" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-16 lg:pt-20 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-7">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.65)", borderColor: PALETTE.line, color: "#8C4A43" }}
              >
                <span>🌸</span>
                <span>لوکس، ملایم، موثر — هماهنگ با بیوم پوست</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="text-4xl sm:text-6xl font-serif font-bold leading-tight"
              >
                تجربه‌ی جدیدِ زیبایی <br />
                با{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${PALETTE.gold}, ${PALETTE.rose})`,
                  }}
                >
                  Hana Beauty
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="text-lg leading-relaxed max-w-xl"
                style={{ color: PALETTE.muted }}
              >
                روتین‌های هوشمند، ترکیبات شفاف، و تجربه خرید نرم و سریع.
                محصول درست را بر اساس نوع پوست و هدف درمانی انتخاب کن.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="flex flex-wrap gap-3 pt-1"
              >
                <a
                  href="#shop"
                  className="h-14 px-8 rounded-full inline-flex items-center justify-center font-semibold text-white transition active:scale-95"
                  style={{ background: `linear-gradient(90deg, ${PALETTE.brown}, #5A3A36)` }}
                >
                  شروع خرید
                </a>
                <a
                  href="#routine"
                  className="h-14 px-8 rounded-full inline-flex items-center justify-center font-semibold border transition active:scale-95"
                  style={{ borderColor: PALETTE.line, background: "rgba(255,255,255,0.7)" }}
                >
                  ساخت روتین اختصاصی
                </a>
              </motion.div>

              {/* Social proof mini row */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
                className="pt-6 flex flex-wrap items-center gap-6 text-sm"
                style={{ color: PALETTE.muted }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black text-base" style={{ color: PALETTE.ink }}>۴.۹</span>
                  <span>امتیاز مشتریان</span>
                </div>
                <div className="w-px h-5" style={{ background: PALETTE.line }} />
                <div className="flex items-center gap-2">
                  <span className="font-black text-base" style={{ color: PALETTE.ink }}>۷۲h</span>
                  <span>آبرسانی پایدار</span>
                </div>
                <div className="w-px h-5" style={{ background: PALETTE.line }} />
                <div className="flex items-center gap-2">
                  <span className="font-black text-base" style={{ color: PALETTE.ink }}>۰٪</span>
                  <span>پارابن / سولفات</span>
                </div>
              </motion.div>
            </div>

            {/* Hero media card (glass) */}
            <motion.div
              initial={{ opacity: 0, y: 18, rotate: 0.6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div
                className="relative rounded-[2.5rem] overflow-hidden border shadow-2xl"
                style={{
                  borderColor: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.55)",
                }}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/hero.webp"
                    alt="Hana Beauty hero"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Floating info chip */}
                <div
                  className="absolute bottom-5 right-5 left-5 p-4 rounded-2xl border backdrop-blur-md"
                  style={{ background: "rgba(255,255,255,0.75)", borderColor: PALETTE.line }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold" style={{ color: PALETTE.muted }}>
                        پیشنهاد ویژه
                      </div>
                      <div className="font-bold">Cherry Blossom Glow Serum</div>
                    </div>
                    <div className="font-black" style={{ color: PALETTE.gold }}>
                      ۵۹۰,۰۰۰ ت
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* local styles for petals */}
        <style jsx>{`
          .petal {
            position: absolute;
            width: 18px;
            height: 12px;
            border-radius: 999px;
            background: linear-gradient(135deg, rgba(217, 130, 124, 0.55), rgba(242, 214, 205, 0.65));
            filter: blur(0.2px);
            transform: rotate(18deg);
            animation: float 9s ease-in-out infinite;
          }
          .petal-1 { top: 18%; left: 12%; animation-duration: 10s; opacity: 0.7; }
          .petal-2 { top: 30%; left: 78%; animation-duration: 12s; opacity: 0.55; }
          .petal-3 { top: 62%; left: 20%; animation-duration: 11s; opacity: 0.5; }
          .petal-4 { top: 54%; left: 86%; animation-duration: 13s; opacity: 0.45; }
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(18deg); }
            50% { transform: translateY(-14px) translateX(10px) rotate(28deg); }
          }
        `}</style>
      </section>

      {/* Featured products (modern horizontal cards) */}
      <section id="shop" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">پرفروش‌های حنا</h2>
            <p className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
              انتخاب سریع، بدون سردرگمی—روی هدف پوستی تمرکز کن.
            </p>
          </div>
          <a className="text-sm font-semibold hover:underline" style={{ color: PALETTE.gold }} href="#">
            مشاهده همه
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="rounded-3xl border bg-white overflow-hidden hover:-translate-y-1 transition"
              style={{ borderColor: PALETTE.line }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full border"
                    style={{ borderColor: PALETTE.line, color: "#8C4A43", background: "#FFF7F5" }}
                  >
                    {p.tag}
                  </span>
                  <span className="text-sm font-black" style={{ color: PALETTE.gold }}>
                    {p.price} ت
                  </span>
                </div>
                <h3 className="mt-4 font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: PALETTE.muted }}>
                  بافت سبک، جذب سریع، مناسب برای درخشش طبیعی و یکنواختی رنگ پوست.
                </p>

                <button
                  className="mt-5 h-12 w-full rounded-2xl font-semibold text-white transition active:scale-[0.99]"
                  style={{ background: `linear-gradient(90deg, ${PALETTE.gold}, ${PALETTE.rose})` }}
                >
                  افزودن به سبد
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Routine builder (new hero-style section) */}
      <section id="routine" className="mx-auto max-w-7xl px-6 pb-16">
        <div
          className="rounded-[2.5rem] border p-8 sm:p-12"
          style={{
            borderColor: PALETTE.line,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">روتین‌ساز هوشمند</h2>
              <p className="mt-3 text-sm leading-7" style={{ color: PALETTE.muted }}>
                فقط با انتخاب هدف پوستی، روتین پیشنهادی (۳ مرحله‌ای) می‌گیری.
                مناسب برای شروع سریع و خرید بدون اتلاف زمان.
              </p>

              <div className="mt-6 flex gap-3 flex-wrap">
                {["درخشش", "جوش", "لک", "خشکی"].map((t) => (
                  <button
                    key={t}
                    className="h-10 px-4 rounded-full border text-sm font-semibold hover:opacity-90 transition"
                    style={{ borderColor: PALETTE.line, background: "#fff" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                  className="rounded-3xl border p-6"
                  style={{ borderColor: PALETTE.line, background: "rgba(255,255,255,0.75)" }}
                >
                  <div className="text-xs font-bold" style={{ color: PALETTE.gold }}>
                    مرحله {i + 1}
                  </div>
                  <div className="mt-2 font-bold">{s.title}</div>
                  <div className="mt-2 text-sm leading-6" style={{ color: PALETTE.muted }}>
                    {s.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients / science strip */}
      <section id="science" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">ترکیبات شفاف، نتیجه واقعی</h2>
            <p className="mt-2 text-sm" style={{ color: PALETTE.muted }}>
              تمرکز روی سد دفاعی پوست + رطوبت‌رسانی + درخشش کنترل‌شده.
            </p>
          </div>
          <button
            className="h-12 px-6 rounded-full text-white font-semibold transition active:scale-95"
            style={{ background: PALETTE.brown }}
          >
            مشاهده ترکیبات
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "Niacinamide", d: "کاهش لک و یکنواختی رنگ پوست" },
            { t: "Hyaluronic Acid", d: "آبرسانی عمیق بدون سنگینی" },
            { t: "Ceramides", d: "ترمیم سد دفاعی و کاهش تحریک" },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-3xl border p-6 bg-white"
              style={{ borderColor: PALETTE.line }}
            >
              <div className="font-black" style={{ color: PALETTE.gold }}>{x.t}</div>
              <div className="mt-2 text-sm leading-7" style={{ color: PALETTE.muted }}>{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2.5rem] border bg-white p-8 sm:p-12" style={{ borderColor: PALETTE.line }}>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">سوالات پرتکرار</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: "برای پوست حساس مناسب است؟", a: "بله، فرمول‌ها روی ملایمت و ترمیم سد دفاعی طراحی شده‌اند." },
              { q: "چقدر طول می‌کشد نتیجه ببینم؟", a: "بسته به پوست، معمولاً بین ۲ تا ۴ هفته تغییر محسوس ایجاد می‌شود." },
              { q: "تست حیوانی دارید؟", a: "خیر. رویکرد cruelty-free و شفافیت ترکیبات." },
              { q: "ارسال و مرجوعی چگونه است؟", a: "ارسال سریع + امکان مرجوعی طبق شرایط سایت." },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border p-5 transition"
                style={{ borderColor: PALETTE.line, background: "#FFF" }}
              >
                <summary className="cursor-pointer font-semibold flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-sm opacity-70 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7" style={{ color: PALETTE.muted }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-10" style={{ borderColor: PALETTE.line }}>
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: PALETTE.muted }}>
          <p>© تمامی حقوق برای حنا بیوتی محفوظ است.</p>
          <div className="flex gap-6">
            <a className="hover:opacity-80" href="#">قوانین</a>
            <a className="hover:opacity-80" href="#">مرجوعی</a>
            <a className="hover:opacity-80" href="#">پشتیبانی</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

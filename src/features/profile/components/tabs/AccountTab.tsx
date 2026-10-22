// src/features/profile/components/tabs/AccountTab.tsx
"use client";

import { useState } from "react";
import { USER_PROFILE, type UserProfile } from "../../data/profile.data";

export function AccountTab() {
  const [form, setForm] = useState<UserProfile>(USER_PROFILE);
  const [saved, setSaved] = useState(false);

  const update = (p: Partial<UserProfile>) => setForm((f) => ({ ...f, ...p }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <form dir="rtl" onSubmit={onSubmit} className="space-y-6">

      {/* ── بنر اطلاعات عضویت ── */}
      <div
        className="relative overflow-hidden rounded-2xl px-5 py-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(61,44,42,0.06) 0%, rgba(217,130,124,0.10) 100%)",
          border: "1px solid rgba(217,130,124,0.18)",
        }}
      >
        <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-[#D9827C]/10 blur-2xl" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm text-white"
              style={{
                background: "linear-gradient(135deg, #E29B95, #C46A64)",
                boxShadow: "0 4px 12px -2px rgba(196,106,100,0.4)",
              }}
            >
              {form.name.slice(0, 1)}
            </div>
            <div>
              <p className="text-[13px] tracking-tight text-[#2A1E1C]">{form.name}</p>
              <p className="text-[10px] tracking-wide text-[#A78A85]">{form.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Stat label="عضویت از" value={form.memberSince} />
            <div className="h-8 w-px bg-[#EAD8D4]" />
            <Stat label="امتیاز باشگاه" value={form.points.toLocaleString("fa-IR")} accent />
          </div>
        </div>
      </div>

      {/* ── فیلدها ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="نام و نام خانوادگی" icon={<PersonIcon />}>
          <input
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            className={inputClass}
            placeholder="نام خود را وارد کنید"
          />
        </Field>

        <Field label="شماره موبایل" icon={<PhoneIcon />}>
          <input
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
            inputMode="tel"
            className={inputClass}
            placeholder="09xxxxxxxxx"
          />
        </Field>

        <Field label="ایمیل" icon={<MailIcon />}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            dir="ltr"
            className={inputClass}
            placeholder="example@email.com"
          />
        </Field>

        <Field label="تاریخ تولد" icon={<CalendarIcon />}>
          <input
            value={form.birthDate ?? ""}
            onChange={(e) => update({ birthDate: e.target.value })}
            placeholder="۱۳۷۵/۰۵/۱۲"
            className={inputClass}
          />
        </Field>

        <Field label="جنسیت" icon={<GenderIcon />}>
          <div className="flex gap-2 pt-0.5">
            {(
              [
                { v: "female", l: "زن" },
                { v: "male", l: "مرد" },
              ] as const
            ).map((g) => (
              <button
                key={g.v}
                type="button"
                onClick={() => update({ gender: g.v })}
                className={`flex-1 rounded-xl py-2.5 text-[12px] tracking-wide transition-all duration-200 ${
                  form.gender === g.v
                    ? "bg-[#3D2C2A] text-white shadow-[0_4px_12px_-2px_rgba(61,44,42,0.3)]"
                    : "border border-[#EAD8D4] bg-white/60 text-[#6B5350] hover:border-[#D9827C]/40 hover:text-[#3D2C2A]"
                }`}
              >
                {g.l}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#EAD8D4] to-transparent" />

      {/* ── اکشن‌ها ── */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className={`relative flex items-center gap-2 overflow-hidden rounded-2xl px-6 py-2.5 text-[12px] tracking-wide text-white transition-all duration-300 ${
            saved
              ? "bg-emerald-600 shadow-[0_4px_16px_-4px_rgba(5,150,105,0.4)]"
              : "bg-[#3D2C2A] hover:bg-[#2A1E1C] hover:shadow-[0_4px_16px_-4px_rgba(61,44,42,0.4)]"
          }`}
        >
          {saved ? (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8.5l4 4 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ذخیره شد
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M13 2.5H5L2.5 5v8.5h11V2.5zM5 2.5V7h5.5V2.5M10 12.5v-3H6v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ذخیره تغییرات
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setForm(USER_PROFILE)}
          className="flex items-center gap-1.5 rounded-2xl border border-[#E8D5CE] px-4 py-2.5 text-[12px] text-[#6B5350] transition-all duration-200 hover:border-[#D9827C]/40 hover:text-[#3D2C2A]"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M2 8a6 6 0 106-6H5M5 5L2 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          بازنشانی
        </button>
      </div>
    </form>
  );
}

/* ─── کامپوننت‌های کمکی ─── */

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="text-center">
      <p className={`text-[13px] tracking-tight ${accent ? "text-[#D9827C]" : "text-[#2A1E1C]"}`}>
        {value}
      </p>
      <p className="text-[9px] tracking-wide text-[#A78A85]">{label}</p>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-[10px] tracking-wide text-[#8A6D68]">
        <span className="text-[#C9A49E]">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-[#EAD8D4] bg-white/70 px-3.5 py-2.5 text-[12px] text-[#2A1E1C] placeholder-[#C9B4AF] outline-none transition-all duration-200 focus:border-[#D9827C]/60 focus:ring-2 focus:ring-[#D9827C]/15";

/* ─── آیکون‌های ساده ─── */
const PersonIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
    <path d="M6 5.5a2 2 0 100-4 2 2 0 000 4zM2 10.5c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
    <path d="M9.5 7.8L8 8.5c-1.6-.5-3-1.9-3.5-3.5L5.2 3.5 4 1.5l-2 .5C1.5 5.5 6.5 10.5 10 10l.5-2-1-.2z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MailIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
    <rect x="1" y="2.5" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
    <path d="M1.5 3l4.5 3.5L10.5 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
    <rect x="1" y="2" width="10" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
    <path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);
const GenderIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
    <circle cx="5" cy="7" r="3" stroke="currentColor" strokeWidth="1.1" />
    <path d="M9 1l2 2-2 2M11 1H8.5M5 4V1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// src/features/profile/components/tabs/AddressesTab.tsx
"use client";

import { useCallback, useState } from "react";
import { USER_ADDRESSES, type Address } from "../../data/profile.data";
import { useModalHistory } from "../../hooks/useModalHistory";

type AddressForm = {
  title: string;
  province: string;
  city: string;
  line: string;
  receiver: string;
  phone: string;
  postalCode: string;
};

const EMPTY_FORM: AddressForm = {
  title: "",
  province: "",
  city: "",
  line: "",
  receiver: "",
  phone: "",
  postalCode: "",
};

export function AddressesTab() {
  const [items, setItems] = useState<Address[]>(USER_ADDRESSES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM);

  const closeModal = useCallback(() => {
    setForm(EMPTY_FORM);
    setShowModal(false);
  }, []);

  const { closeWithHistory } = useModalHistory(showModal, closeModal);

  const openModal = () => setShowModal(true);

  const setDefault = (id: string) =>
    setItems((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const remove = (id: string) =>
    setItems((prev) => prev.filter((a) => a.id !== id));

  const handleAdd = () => {
    if (!form.title || !form.line) return;
    const newAddress: Address = {
      id: crypto.randomUUID(),
      isDefault: items.length === 0,
      ...form,
    };
    setItems((prev) => [...prev, newAddress]);
    closeWithHistory();
  };

  const updateForm = (key: keyof AddressForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div dir="rtl" className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm tracking-tight text-[#2A1E1C]">آدرس‌های من</p>
          <button
            type="button"
            onClick={openModal}
            className="flex items-center gap-1.5 rounded-2xl bg-[#3D2C2A] px-4 py-2 text-[11px] tracking-wide text-white transition-all duration-200 hover:bg-[#2A1E1C] hover:shadow-[0_4px_16px_-4px_rgba(61,44,42,0.4)]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            افزودن آدرس
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[#E8D5CE] bg-white/50 py-20">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5E6E1]">
              <svg className="h-6 w-6 text-[#C9A49E]" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-sm text-[#8A6D68]">آدرسی ثبت نشده است</p>
            <button
              type="button"
              onClick={openModal}
              className="mt-1 rounded-xl border border-[#E8D5CE] px-4 py-2 text-[11px] text-[#8A6D68] transition hover:border-[#D9827C] hover:text-[#3D2C2A]"
            >
              افزودن اولین آدرس
            </button>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((a) => (
              <AddressCard
                key={a.id}
                address={a}
                onSetDefault={setDefault}
                onRemove={remove}
              />
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <AddressModal
          form={form}
          onChange={updateForm}
          onSubmit={handleAdd}
          onClose={closeWithHistory}
        />
      )}
    </>
  );
}

function AddressCard({
  address: a,
  onSetDefault,
  onRemove,
}: {
  address: Address;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <li
      dir="rtl"
      className={`relative overflow-hidden rounded-2xl border bg-white/85 p-4 backdrop-blur-sm transition-shadow duration-300 ${
        a.isDefault
          ? "border-[#D9827C]/50 shadow-[0_2px_20px_-4px_rgba(217,130,124,0.22)]"
          : "border-[#EAD8D4]/70 shadow-[0_2px_12px_-4px_rgba(180,100,95,0.08)] hover:shadow-[0_4px_20px_-4px_rgba(180,100,95,0.14)]"
      }`}
    >
      {a.isDefault && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-[#D9827C] to-transparent"
        />
      )}

      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-[13px] tracking-tight text-[#2A1E1C]">{a.title}</p>
        {a.isDefault && (
          <span className="rounded-full bg-[#F5E6E1] px-2.5 py-0.5 text-[9px] tracking-wide text-[#C46A64]">
            پیش‌فرض
          </span>
        )}
      </div>

      <p className="text-[11px] leading-6 text-[#6B5350]">
        {a.province}، {a.city}، {a.line}
      </p>
      <p className="mt-0.5 text-[10px] text-[#A78A85]">
        گیرنده: {a.receiver}
        <span className="mx-1.5 text-[#D5C0BB]">·</span>
        {a.phone}
      </p>
      <p className="mt-0.5 text-[10px] text-[#A78A85]">کد پستی: {a.postalCode}</p>

      <div className="mt-3.5 h-px bg-gradient-to-r from-transparent via-[#EAD8D4] to-transparent" />

      <div className="mt-3 flex items-center gap-2">
        {!a.isDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(a.id)}
            className="flex items-center gap-1.5 rounded-xl border border-[#E8D5CE] px-2.5 py-1.5 text-[10px] text-[#6B5350] transition-all duration-200 hover:border-[#D9827C]/50 hover:text-[#3D2C2A]"
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1l1.4 2.9 3.1.45-2.25 2.2.53 3.1L6 8.25 3.22 9.65l.53-3.1L1.5 4.35l3.1-.45z"
                stroke="currentColor"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
            </svg>
            تنظیم پیش‌فرض
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(a.id)}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8D5CE] px-2.5 py-1.5 text-[10px] text-[#C46A64] transition-all duration-200 hover:border-[#C46A64]/40"
        >
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path
              d="M1.5 3h9M4.5 3V2h3v1M2 3l.7 7h6.6L10 3"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          حذف
        </button>
      </div>
    </li>
  );
}

type FormProps = {
  form: AddressForm;
  onChange: (key: keyof AddressForm, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const FIELDS: {
  key: keyof AddressForm;
  label: string;
  placeholder: string;
  span?: boolean;
}[] = [
  { key: "title", label: "عنوان آدرس", placeholder: "خانه، محل کار، ..." },
  { key: "receiver", label: "نام گیرنده", placeholder: "نام و نام خانوادگی" },
  { key: "phone", label: "شماره تماس", placeholder: "09xxxxxxxxx" },
  { key: "province", label: "استان", placeholder: "تهران" },
  { key: "city", label: "شهر", placeholder: "تهران" },
  { key: "postalCode", label: "کد پستی", placeholder: "۱۲۳۴۵۶۷۸۹۰" },
  {
    key: "line",
    label: "آدرس کامل",
    placeholder: "خیابان، کوچه، پلاک، واحد",
    span: true,
  },
];

function AddressModal({ form, onChange, onSubmit, onClose }: FormProps) {
  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full rounded-t-[28px] border border-[#EAD8D4]/60 bg-white/96 px-6 pb-8 pt-5 backdrop-blur-xl sm:max-w-lg sm:rounded-[28px]"
        style={{
          boxShadow:
            "0 -8px 48px -8px rgba(180,110,100,0.18), 0 0 0 1px rgba(180,110,100,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#E8D5CE] sm:hidden" />

        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[15px] tracking-tight text-[#2A1E1C]">
              آدرس جدید
            </p>
            <p className="mt-0.5 text-[10px] tracking-wide text-[#A78A85]">
              اطلاعات آدرس خود را وارد کنید
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5ECE9] text-[#8A6D68] transition hover:bg-[#EAD8D4] hover:text-[#3D2C2A]"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {FIELDS.map((f) => (
            <div key={f.key} className={f.span ? "col-span-2" : "col-span-1"}>
              <label
                htmlFor={`addr-${f.key}`}
                className="mb-1.5 block text-[10px] tracking-wide text-[#8A6D68]"
              >
                {f.label}
              </label>
              {f.key === "line" ? (
                <textarea
                  id={`addr-${f.key}`}
                  rows={2}
                  value={form[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  className="w-full resize-none rounded-2xl border border-[#EAD8D4] bg-white/70 px-3.5 py-2.5 text-[12px] text-[#2A1E1C] placeholder-[#C9B4AF] outline-none transition-all duration-200 focus:border-[#D9827C]/60 focus:ring-2 focus:ring-[#D9827C]/15"
                />
              ) : (
                <input
                  id={`addr-${f.key}`}
                  type="text"
                  value={form[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  className="w-full rounded-2xl border border-[#EAD8D4] bg-white/70 px-3.5 py-2.5 text-[12px] text-[#2A1E1C] placeholder-[#C9B4AF] outline-none transition-all duration-200 focus:border-[#D9827C]/60 focus:ring-2 focus:ring-[#D9827C]/15"
                />
              )}
            </div>
          ))}
        </div>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#EAD8D4] to-transparent" />

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-[#E8D5CE] py-2.5 text-[12px] text-[#8A6D68] transition-colors hover:border-[#D9827C]/40 hover:text-[#3D2C2A]"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-[#3D2C2A] py-2.5 text-[12px] tracking-wide text-white transition-all duration-200 hover:bg-[#2A1E1C] hover:shadow-[0_4px_16px_-4px_rgba(61,44,42,0.45)]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
              <path
                d="M2.5 8.5l4 4 7-8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ثبت آدرس
          </button>
        </div>
      </div>
    </div>
  );
}
// src/features/checkout/components/ShippingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { USER_ADDRESSES } from "@/features/profile/data/profile.data";
import type { Address } from "@/features/profile/types/profile.typ";
import type { ShippingMethod } from "../types/checkout.typ";
import { SHIPPING_METHODS } from "../data/checkout.data";

type Props = {
  address: Address;
  shippingId: ShippingMethod["id"];
  onAddressChange: (a: Address) => void;
  onShippingChange: (id: ShippingMethod["id"]) => void;
  onNext: () => void;
};

export function ShippingForm({
  address,
  shippingId,
  onAddressChange,
  onShippingChange,
  onNext,
}: Props) {
  const [mode, setMode] = useState<"saved" | "new">("saved");
  const [newAddr, setNewAddr] = useState<Address>({
    id: "", // مقدار اولیه پایدار (خالی)
    title: "",
    receiver: "",
    phone: "",
    province: "",
    city: "",
    line: "",
    postalCode: "",
  });

  // تولید ID در مرورگر بعد از mount
  useEffect(() => {
    if (!newAddr.id) {
      setNewAddr((prev) => ({ ...prev, id: crypto.randomUUID() }));
    }
  }, [newAddr.id]);

  const effectiveAddress = mode === "saved" ? address : newAddr;

  const handleNext = () => {
    if (mode === "new") onAddressChange(newAddr);
    onNext();
  };

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[#E8D5CE] bg-white/80 p-5 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm  text-[#3D2C2A]">آدرس تحویل</h2>
          <div className="flex gap-1 rounded-xl border border-[#E8D5CE] p-1">
            <button
              type="button"
              onClick={() => setMode("saved")}
              className={`rounded-lg px-3 py-1 text-[11px] transition ${
                mode === "saved"
                  ? "bg-[#F5E6E1] text-[#3D2C2A]"
                  : "text-[#6B5350]"
              }`}
            >
              آدرس‌های من
            </button>
            <button
              type="button"
              onClick={() => setMode("new")}
              className={`rounded-lg px-3 py-1 text-[11px] transition ${
                mode === "new"
                  ? "bg-[#F5E6E1] text-[#3D2C2A]"
                  : "text-[#6B5350]"
              }`}
            >
              آدرس جدید
            </button>
          </div>
        </div>

        {mode === "saved" ? (
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {USER_ADDRESSES.map((a) => {
              const active = a.id === address.id;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => onAddressChange(a)}
                    className={`w-full rounded-2xl border p-3 text-right transition ${
                      active
                        ? "border-[#D9827C] bg-[#F5E6E1]/60"
                        : "border-[#E8D5CE] bg-white hover:border-[#D9827C]/50"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px]  text-[#3D2C2A]">
                        {a.title}
                      </span>
                      {a.isDefault && (
                        <span className="rounded-full bg-[#D9827C]/15 px-2 py-0.5 text-[9px] text-[#C46A64]">
                          پیش‌فرض
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-2 text-[10px] leading-5 text-[#6B5350]">
                      {a.province}، {a.city}، {a.line}
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#A78A85]">
                      {a.receiver} · {a.phone}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="عنوان"
              value={newAddr.title}
              onChange={(v) => setNewAddr((s) => ({ ...s, title: v }))}
              placeholder="خانه، محل کار"
            />
            <Input
              label="نام گیرنده"
              value={newAddr.receiver}
              onChange={(v) => setNewAddr((s) => ({ ...s, receiver: v }))}
            />
            <Input
              label="استان"
              value={newAddr.province}
              onChange={(v) => setNewAddr((s) => ({ ...s, province: v }))}
            />
            <Input
              label="شهر"
              value={newAddr.city}
              onChange={(v) => setNewAddr((s) => ({ ...s, city: v }))}
            />
            <Input
              label="کد پستی"
              value={newAddr.postalCode}
              onChange={(v) => setNewAddr((s) => ({ ...s, postalCode: v }))}
            />
            <Input
              label="شماره تماس"
              value={newAddr.phone}
              onChange={(v) => setNewAddr((s) => ({ ...s, phone: v }))}
            />
            <div className="col-span-2">
              <Input
                label="آدرس کامل"
                value={newAddr.line}
                onChange={(v) => setNewAddr((s) => ({ ...s, line: v }))}
                placeholder="خیابان، کوچه، پلاک، واحد"
              />
            </div>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-[#E8D5CE] bg-white/80 p-5 backdrop-blur">
        <h2 className="mb-4 text-sm  text-[#3D2C2A]">روش ارسال</h2>
        <ul className="space-y-2">
          {SHIPPING_METHODS.map((m) => {
            const active = m.id === shippingId;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => onShippingChange(m.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-3 text-right transition ${
                    active
                      ? "border-[#D9827C] bg-[#F5E6E1]/60"
                      : "border-[#E8D5CE] bg-white hover:border-[#D9827C]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        active
                          ? "border-[#D9827C] bg-[#D9827C]"
                          : "border-[#C9B8B3]"
                      }`}
                    >
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <div>
                      <p className="text-[12px]  text-[#3D2C2A]">
                        {m.title}
                      </p>
                      <p className="text-[10px] text-[#A78A85]">
                        {m.description} · {m.eta}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px]  text-[#3D2C2A]">
                    {m.price.toLocaleString("fa-IR")} ت
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex items-center justify-between gap-3">
        <a
          href="/cart"
          className="rounded-xl border border-[#E8D5CE] px-4 py-2.5 text-xs text-[#6B5350] transition hover:border-[#D9827C]"
        >
          بازگشت به سبد
        </a>
        <button
          type="button"
          onClick={handleNext}
          disabled={!effectiveAddress.receiver || !effectiveAddress.line}
          className="rounded-xl bg-[#D9827C] px-6 py-2.5 text-xs  text-white transition hover:bg-[#C46A64] disabled:opacity-40"
        >
          ادامه به پرداخت 
          
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] text-[#8A6D68]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E8D5CE] bg-white px-3 py-2 text-[12px] text-[#3D2C2A] outline-none transition focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25"
      />
    </label>
  );
}
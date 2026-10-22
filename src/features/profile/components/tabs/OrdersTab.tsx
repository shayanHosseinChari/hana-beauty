// src/features/profile/components/tabs/OrdersTab.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ORDER_STATUS_COLOR,
  ORDER_STATUS_LABEL,
  USER_ORDERS,
} from "../../data/profile.data";
import { OrderStatus } from "../../types/profile.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

const FILTERS: { key: "all" | OrderStatus; label: string }[] = [
  { key: "all", label: "همه" },
  { key: "pending", label: "در انتظار" },
  { key: "processing", label: "پردازش" },
  { key: "shipped", label: "ارسال شده" },
  { key: "delivered", label: "تحویل شده" },
  { key: "canceled", label: "لغو شده" },
];

const STATUS_DOT: Record<OrderStatus, string> = {
  pending: "bg-amber-400",
  processing: "bg-sky-400",
  shipped: "bg-violet-400",
  delivered: "bg-emerald-400",
  canceled: "bg-rose-400",
};

export function OrdersTab() {
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const orders = USER_ORDERS.filter(
    (o) => filter === "all" || o.status === filter
  ).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div dir="rtl" className="space-y-5">
      {/* ── فیلتر ── */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`relative rounded-full px-4 py-1.5 text-[11px] tracking-wide transition-all duration-200 ${
              filter === f.key
                ? "bg-[#3D2C2A] text-[#F5E6E1] shadow-[0_2px_12px_-2px_rgba(61,44,42,0.35)]"
                : "bg-white/70 text-[#8A6D68] ring-1 ring-[#E8D5CE] hover:ring-[#D9827C]/50 hover:text-[#3D2C2A]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── خالی ── */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[#E8D5CE] bg-white/50 py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5E6E1]">
            <svg className="h-6 w-6 text-[#C9A49E]" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm text-[#8A6D68]">سفارشی در این وضعیت یافت نشد</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── کارت سفارش ─── */
function OrderCard({ order }: { order: (typeof USER_ORDERS)[number] }) {
  const [open, setOpen] = useState(true);

  return (
    <li
      className="overflow-hidden rounded-2xl border border-[#EAD8D4]/70 bg-white/85 shadow-[0_2px_16px_-4px_rgba(180,100,95,0.08)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_4px_24px_-4px_rgba(180,100,95,0.14)]"
    >
      {/* ── هدر ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-right"
      >
        <div className="flex items-center gap-3">
          {/* dot وضعیت */}
          <span
            className={`mt-px h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[order.status]}`}
            style={{ boxShadow: "0 0 0 3px rgba(0,0,0,0.06)" }}
          />
          <div>
            <p className="text-[13px] tracking-tight text-[#2A1E1C]">
              {order.code}
            </p>
            <p className="mt-0.5 text-[10px] text-[#A78A85]">
              {new Date(order.createdAt).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-[10px] tracking-wide ${ORDER_STATUS_COLOR[order.status]}`}
          >
            {ORDER_STATUS_LABEL[order.status]}
          </span>
          <svg
            className={`h-4 w-4 text-[#C0A09A] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* ── آیتم‌ها (قابل بستن) ── */}
      <div
        className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {/* خط جدا کننده */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[#EAD8D4] to-transparent" />

        <div className="divide-y divide-[#F5ECE9] px-5">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3.5">
              <Link
                href={`/products/${item.id}`}
                className="group relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#FBF6F4] ring-1 ring-[#EAD8D4]/60 transition-all duration-300 hover:ring-[#D9827C]/50"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.id}`}
                  className="line-clamp-1 text-[12px] leading-5 text-[#3D2C2A] transition-colors hover:text-[#D9827C]"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-[10px] text-[#A78A85]">
                  {item.qty.toLocaleString("fa-IR")} عدد
                  <span className="mx-1.5 text-[#D5C0BB]">×</span>
                  {fmt(item.price)} تومان
                </p>
              </div>

              <p className="shrink-0 text-[12px] text-[#5C3E3A]">
                {fmt(item.qty * item.price)}
              </p>
            </div>
          ))}
        </div>

        {/* ── فوتر ── */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[#EAD8D4] to-transparent" />
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-[10px] tracking-widest text-[#B09490] uppercase">
            جمع کل
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] tracking-tight text-[#2A1E1C]">
              {fmt(order.total)}
            </span>
            <span className="text-[10px] text-[#A78A85]">تومان</span>
          </div>
        </div>
      </div>
    </li>
  );
}

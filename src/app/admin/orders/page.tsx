// src/app/admin/orders/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
  ADMIN_ORDERS,
  ORDER_STATUS_COLOR,
  ORDER_STATUS_LABEL,
} from "@/features/admin/data/admin.data";
import type { AdminOrder } from "@/features/admin/types/admin.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

const FILTERS: { key: "all" | AdminOrder["status"]; label: string }[] = [
  { key: "all", label: "همه" },
  { key: "pending", label: "در انتظار" },
  { key: "processing", label: "در حال پردازش" },
  { key: "shipped", label: "ارسال شده" },
  { key: "delivered", label: "تحویل شده" },
  { key: "canceled", label: "لغو شده" },
];

export default function AdminOrdersPage() {
  const [status, setStatus] = useState<"all" | AdminOrder["status"]>("all");

  const orders = useMemo(
    () => ADMIN_ORDERS.filter((o) => status === "all" || o.status === status),
    [status]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setStatus(f.key)}
            className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
              status === f.key
                ? "border-[#D9827C] bg-[#F5E6E1] text-[#3D2C2A]"
                : "border-[#E8D5CE] text-[#6B5350] hover:border-[#D9827C]/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E8D5CE] bg-white/80 backdrop-blur">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#FDF7F5] text-[#6B5350]">
            <tr>
              <th className="px-4 py-3 font-medium">کد سفارش</th>
              <th className="px-4 py-3 font-medium">مشتری</th>
              <th className="px-4 py-3 font-medium">مبلغ</th>
              <th className="px-4 py-3 font-medium">وضعیت</th>
              <th className="px-4 py-3 font-medium">تاریخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0E1DC]">
            {orders.map((o) => (
              <tr key={o.id} className="transition hover:bg-[#FDF7F5]/60">
                <td className="px-4 py-3 font-medium text-[#3D2C2A]">{o.code}</td>
                <td className="px-4 py-3 text-[#6B5350]">{o.customer}</td>
                <td className="px-4 py-3 text-[#3D2C2A]">{fmt(o.total)} ت</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${ORDER_STATUS_COLOR[o.status]}`}>
                    {ORDER_STATUS_LABEL[o.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-[10px] text-[#A78A85]">
                  {new Date(o.createdAt).toLocaleDateString("fa-IR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
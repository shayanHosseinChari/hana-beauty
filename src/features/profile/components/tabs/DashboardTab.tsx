// src/features/profile/components/tabs/DashboardTab.tsx
import Link from "next/link";
import { StatCard } from "../StatCard";
import {
  ORDER_STATUS_COLOR,
  ORDER_STATUS_LABEL,
  USER_ORDERS,
} from "../../data/profile.data";

const fmt = (n: number) => n.toLocaleString("fa-IR");

export function DashboardTab() {
  const orders = USER_ORDERS;
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) =>
    ["pending", "processing", "shipped"].includes(o.status)
  ).length;

  const recent = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="تعداد سفارش‌ها"
          value={orders.length.toLocaleString("fa-IR")}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 2.25h12l2.25 4.5v15H3.75v-15L6 2.25z" />
            </svg>
          }
        />
        <StatCard
          label="در جریان"
          value={pending.toLocaleString("fa-IR")}
          hint="در انتظار یا در حال ارسال"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h13.5l3 4.5v6H3z" />
            </svg>
          }
        />
        <StatCard
          label="مجموع خرید"
          value={`${fmt(totalSpent)} ت`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5M9 9h4.5a2.25 2.25 0 010 4.5H9" />
            </svg>
          }
        />
        <StatCard
          label="امتیاز باشگاه"
          value="۱٬۲۴۰"
          hint="قابل استفاده در خرید بعدی"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5.5L20 9.5l-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1L12 3z" />
            </svg>
          }
        />
      </div>

      <section className="rounded-2xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#3D2C2A]">آخرین سفارش‌ها</h2>
          <Link href="/profile/orders" className="text-[11px] text-[#D9827C] hover:underline">
            مشاهده همه
          </Link>
        </div>

        <ul className="divide-y divide-[#F0E1DC]">
          {recent.map((order) => (
            <li key={order.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-[#3D2C2A]">{order.code}</p>
                <p className="mt-0.5 text-[10px] text-[#A78A85]">
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")} · {fmt(order.total)} ت
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${ORDER_STATUS_COLOR[order.status]}`}
              >
                {ORDER_STATUS_LABEL[order.status]}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
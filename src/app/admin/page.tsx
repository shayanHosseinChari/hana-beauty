// src/app/admin/page.tsx
import Link from "next/link";
import { AdminStatCard } from "@/features/admin/components/AdminStatCard";
import {
  ADMIN_ORDERS,
  ADMIN_STATS,
  ADMIN_TICKETS,
  ORDER_STATUS_COLOR,
  ORDER_STATUS_LABEL,
  TICKET_PRIORITY_LABEL,
} from "@/features/admin/data/admin.data";

const fmt = (n: number) => n.toLocaleString("fa-IR");

export default function AdminDashboardPage() {
  const recentOrders = ADMIN_ORDERS.slice(0, 4);
  const recentTickets = ADMIN_TICKETS.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <AdminStatCard
          label="کل کاربران"
          value={ADMIN_STATS.totalUsers.toLocaleString("fa-IR")}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <AdminStatCard
          label="کل سفارش‌ها"
          value={ADMIN_STATS.totalOrders.toLocaleString("fa-IR")}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 2.25h12l2.25 4.5v15H3.75v-15L6 2.25zM3.75 6.75h16.5" />
            </svg>
          }
        />
        <AdminStatCard
          label="درآمد کل"
          value={`${fmt(ADMIN_STATS.totalRevenue)} ت`}
          tone="success"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5M9 9h4.5a2.25 2.25 0 010 4.5H9" />
            </svg>
          }
        />
        <AdminStatCard
          label="سفارش در انتظار"
          value={ADMIN_STATS.pendingOrders.toLocaleString("fa-IR")}
          tone="warning"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          }
        />
        <AdminStatCard
          label="تیکت باز"
          value={ADMIN_STATS.openTickets.toLocaleString("fa-IR")}
          tone="danger"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12" />
            </svg>
          }
        />
        <AdminStatCard
          label="موجودی کم"
          value={ADMIN_STATS.lowStockProducts.toLocaleString("fa-IR")}
          tone="warning"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#3D2C2A]">آخرین سفارش‌ها</h2>
            <Link href="/admin/orders" className="text-[11px] text-[#D9827C] hover:underline">
              مشاهده همه
            </Link>
          </div>
          <ul className="divide-y divide-[#F0E1DC]">
            {recentOrders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-[#3D2C2A]">{o.code}</p>
                  <p className="mt-0.5 text-[10px] text-[#A78A85]">
                    {o.customer} · {fmt(o.total)} ت
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${ORDER_STATUS_COLOR[o.status]}`}>
                  {ORDER_STATUS_LABEL[o.status]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#3D2C2A]">آخرین تیکت‌ها</h2>
            <Link href="/admin/tickets" className="text-[11px] text-[#D9827C] hover:underline">
              مشاهده همه
            </Link>
          </div>
          <ul className="divide-y divide-[#F0E1DC]">
            {recentTickets.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-[#3D2C2A]">{t.subject}</p>
                  <p className="mt-0.5 text-[10px] text-[#A78A85]">{t.user}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    t.priority === "high"
                      ? "bg-rose-100 text-rose-700"
                      : t.priority === "normal"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {TICKET_PRIORITY_LABEL[t.priority]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
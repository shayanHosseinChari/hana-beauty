// src/app/admin/layout.tsx
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#FDF7F5] to-[#F9EFEB]"
    >
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 lg:pb-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#3D2C2A] sm:text-2xl">
            پنل مدیریت
          </h1>
          <p className="mt-1 text-xs text-[#A78A85]">
            مدیریت کاربران، محصولات، سفارش‌ها و تیکت‌ها
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <AdminSidebar />
          <section className="min-w-0 flex-1">{children}</section>
        </div>
      </div>
    </main>
  );
}
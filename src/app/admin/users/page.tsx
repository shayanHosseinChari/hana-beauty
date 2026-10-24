// src/app/admin/users/page.tsx
"use client";

import { useMemo, useState } from "react";
import { ADMIN_USERS } from "@/features/admin/data/admin.data";
import type { AdminUser } from "@/features/admin/types/admin.typ";
import { useModalHistory } from "@/features/profile/hooks/useModalHistory";

type UserAction = "block" | "unblock" | "make-admin" | "make-support" | "delete" | null;

export default function AdminUsersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<"all" | AdminUser["role"]>("all");
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);

  // مودال تأیید اکشن
  const [pendingAction, setPendingAction] = useState<{
    user: AdminUser;
    action: UserAction;
  } | null>(null);

  const modalOpen = pendingAction !== null;
  const { closeWithHistory } = useModalHistory(modalOpen, () =>
    setPendingAction(null)
  );

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (role !== "all" && u.role !== role) return false;
      if (
        q &&
        !`${u.name} ${u.email} ${u.phone}`.toLowerCase().includes(q.toLowerCase())
      )
        return false;
      return true;
    });
  }, [users, q, role]);

  const askAction = (user: AdminUser, action: UserAction) =>
    setPendingAction({ user, action });

  const applyAction = () => {
    if (!pendingAction) return;
    const { user, action } = pendingAction;

    setUsers((prev) =>
      prev
        .map((u) => {
          if (u.id !== user.id) return u;
          switch (action) {
            case "block":
              return { ...u, status: "blocked" as const };
            case "unblock":
              return { ...u, status: "active" as const };
            case "make-admin":
              return { ...u, role: "admin" as const };
            case "make-support":
              return { ...u, role: "support" as const };
            default:
              return u;
          }
        })
        .filter((u) => !(action === "delete" && u.id === user.id))
    );

    closeWithHistory();
  };

  return (
    <div className="space-y-4">
      {/* فیلترها */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو بر اساس نام، ایمیل یا شماره..."
          className="h-10 w-full rounded-xl border border-[#E8D5CE] bg-white px-3 text-xs outline-none focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25 sm:max-w-sm"
        />
        <div className="flex gap-2">
          {(["all", "customer", "admin", "support"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                role === r
                  ? "border-[#D9827C] bg-[#F5E6E1] text-[#3D2C2A]"
                  : "border-[#E8D5CE] text-[#6B5350]"
              }`}
            >
              {r === "all"
                ? "همه"
                : r === "customer"
                ? "مشتری"
                : r === "admin"
                ? "مدیر"
                : "پشتیبان"}
            </button>
          ))}
        </div>
      </div>

      {/* جدول */}
      <div className="overflow-x-auto rounded-2xl border border-[#E8D5CE] bg-white/80 backdrop-blur">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#FDF7F5] text-[#6B5350]">
            <tr>
              <th className="px-4 py-3 font-medium">کاربر</th>
              <th className="px-4 py-3 font-medium">تماس</th>
              <th className="px-4 py-3 font-medium">نقش</th>
              <th className="px-4 py-3 font-medium">وضعیت</th>
              <th className="px-4 py-3 font-medium">سفارش‌ها</th>
              <th className="px-4 py-3 font-medium">تاریخ عضویت</th>
              <th className="px-4 py-3 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0E1DC]">
            {filtered.map((u) => (
              <tr key={u.id} className="transition hover:bg-[#FDF7F5]/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5E6E1] text-[11px] font-bold text-[#C46A64]">
                      {u.name.slice(0, 1)}
                    </div>
                    <span className="font-medium text-[#3D2C2A]">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#6B5350]">
                  <p dir="ltr" className="text-left">
                    {u.email}
                  </p>
                  <p className="text-[10px] text-[#A78A85]">{u.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      u.role === "admin"
                        ? "bg-[#3D2C2A] text-white"
                        : u.role === "support"
                        ? "bg-[#D9827C]/15 text-[#C46A64]"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {u.role === "admin"
                      ? "مدیر"
                      : u.role === "support"
                      ? "پشتیبان"
                      : "مشتری"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      u.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {u.status === "active" ? "فعال" : "مسدود"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#3D2C2A]">
                  {u.ordersCount.toLocaleString("fa-IR")}
                </td>
                <td className="px-4 py-3 text-[10px] text-[#A78A85]">
                  {new Date(u.joinedAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-4 py-3">
                  <UserActionsMenu user={u} onAction={askAction} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pendingAction && (
        <ConfirmActionModal
          user={pendingAction.user}
          action={pendingAction.action as any}
          onConfirm={applyAction}
          onClose={closeWithHistory}
        />
      )}
    </div>
  );
}

/* ---------- منوی اکشن‌ها ---------- */

type MenuProps = {
  user: AdminUser;
  onAction: (user: AdminUser, action: UserAction) => void;
};

function UserActionsMenu({ user, onAction }: MenuProps) {
  const [open, setOpen] = useState(false);

  const items: {
    key: Exclude<UserAction, null>;
    label: string;
    tone?: "danger" | "default";
    show: boolean;
  }[] = [
    {
      key: "block",
      label: "مسدود کردن",
      tone: "danger",
      show: user.status === "active",
    },
    {
      key: "unblock",
      label: "رفع مسدودی",
      show: user.status === "blocked",
    },
    {
      key: "make-admin",
      label: "ارتقا به مدیر",
      show: user.role !== "admin",
    },
    {
      key: "make-support",
      label: "ارتقا به پشتیبان",
      show: user.role !== "support",
    },
    {
      key: "delete",
      label: "حذف کاربر",
      tone: "danger",
      show: true,
    },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8D5CE] text-[#6B5350] transition hover:border-[#D9827C] hover:text-[#D9827C]"
        aria-label="عملیات"
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <ul
            role="menu"
            className="absolute left-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-xl border border-[#E8D5CE] bg-white shadow-xl"
          >
            {items
              .filter((i) => i.show)
              .map((i) => (
                <li key={i.key}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onAction(user, i.key);
                    }}
                    className={`block w-full px-3 py-2 text-right text-[11px] transition hover:bg-[#FDF7F5] ${
                      i.tone === "danger" ? "text-[#C46A64]" : "text-[#3D2C2A]"
                    }`}
                  >
                    {i.label}
                  </button>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ---------- مودال تأیید ---------- */

const ACTION_TITLES: Record<Exclude<UserAction, null>, string> = {
  block: "مسدود کردن کاربر",
  unblock: "رفع مسدودی",
  "make-admin": "ارتقا به مدیر",
  "make-support": "ارتقا به پشتیبان",
  delete: "حذف کاربر",
};

const ACTION_DESCRIPTIONS: Record<Exclude<UserAction, null>, string> = {
  block: "کاربر تا زمان رفع مسدودی نمی‌تواند وارد حساب شود یا خرید کند.",
  unblock: "کاربر دوباره می‌تواند به حساب خود دسترسی داشته باشد.",
  "make-admin": "این کاربر به تمام بخش‌های پنل مدیریت دسترسی خواهد داشت.",
  "make-support": "این کاربر می‌تواند تیکت‌ها را مدیریت و به کاربران پاسخ دهد.",
  delete: "این عمل غیرقابل بازگشت است و تمام داده‌های کاربر حذف می‌شود.",
};

function ConfirmActionModal({
  user,
  action,
  onConfirm,
  onClose,
}: {
  user: AdminUser;
  action: Exclude<UserAction, null>;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const danger = action === "block" || action === "delete";

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#2A1E1C]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm rounded-[24px] border border-[#EAD8D4] bg-white p-5 shadow-2xl">
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              danger ? "bg-rose-100 text-rose-600" : "bg-[#F5E6E1] text-[#C46A64]"
            }`}
          >
            {action === "delete" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5h6v2m-9 0l1 13h10l1-13" />
              </svg>
            ) : action === "block" || action === "unblock" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M5.6 5.6l12.8 12.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5.5L20 9.5l-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1L12 3z" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#2A1E1C]">{ACTION_TITLES[action]}</p>
            <p className="mt-0.5 truncate text-[10px] text-[#A78A85]">{user.name}</p>
          </div>
        </div>

        <p className="rounded-xl bg-[#FDF7F5] p-3 text-[11px] leading-6 text-[#6B5350]">
          {ACTION_DESCRIPTIONS[action]}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#E8D5CE] py-2 text-[11px] text-[#6B5350] transition hover:border-[#D9827C]"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-2 text-[11px] font-semibold text-white transition ${
              danger
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-[#D9827C] hover:bg-[#C46A64]"
            }`}
          >
            تأیید
          </button>
        </div>
      </div>
    </div>
  );
}
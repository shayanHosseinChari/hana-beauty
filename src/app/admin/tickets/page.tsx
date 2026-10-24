// src/app/admin/tickets/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
  ADMIN_TICKETS,
  TICKET_PRIORITY_LABEL,
  TICKET_STATUS_LABEL,
} from "@/features/admin/data/admin.data";
import type { AdminTicket } from "@/features/admin/types/admin.typ";

const PRIORITY_COLOR: Record<AdminTicket["priority"], string> = {
  low: "bg-slate-100 text-slate-700",
  normal: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

const STATUS_COLOR: Record<AdminTicket["status"], string> = {
  open: "bg-blue-100 text-blue-700",
  "in-progress": "bg-indigo-100 text-indigo-700",
  closed: "bg-slate-100 text-slate-700",
};

export default function AdminTicketsPage() {
  const [status, setStatus] = useState<"all" | AdminTicket["status"]>("all");

  const tickets = useMemo(
    () => ADMIN_TICKETS.filter((t) => status === "all" || t.status === status),
    [status]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "open", "in-progress", "closed"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
              status === s
                ? "border-[#D9827C] bg-[#F5E6E1] text-[#3D2C2A]"
                : "border-[#E8D5CE] text-[#6B5350] hover:border-[#D9827C]/60"
            }`}
          >
            {s === "all" ? "همه" : TICKET_STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <ul className="space-y-2.5">
        {tickets.map((t) => (
          <li
            key={t.id}
            className="rounded-2xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur transition hover:border-[#D9827C]/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#3D2C2A]">{t.subject}</p>
                <p className="mt-0.5 text-[10px] text-[#A78A85]">
                  {t.user} · {new Date(t.createdAt).toLocaleDateString("fa-IR")}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${PRIORITY_COLOR[t.priority]}`}>
                  {TICKET_PRIORITY_LABEL[t.priority]}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${STATUS_COLOR[t.status]}`}>
                  {TICKET_STATUS_LABEL[t.status]}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
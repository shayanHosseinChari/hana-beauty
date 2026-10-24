// src/features/admin/data/admin.data.ts
import type {
  AdminOrder,
  AdminStats,
  AdminTicket,
  AdminUser,
} from "../types/admin.typ";

export const ADMIN_STATS: AdminStats = {
  totalUsers: 1248,
  totalOrders: 3562,
  totalRevenue: 1_850_000_000,
  openTickets: 12,
  pendingOrders: 34,
  lowStockProducts: 5,
};

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "u-1",
    name: "سارا محمدی",
    email: "sara@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    role: "customer",
    status: "active",
    ordersCount: 8,
    joinedAt: "2025-03-12T10:00:00Z",
  },
  {
    id: "u-2",
    name: "علی رضایی",
    email: "ali@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۰",
    role: "customer",
    status: "active",
    ordersCount: 3,
    joinedAt: "2025-05-20T10:00:00Z",
  },
  {
    id: "u-3",
    name: "مریم کریمی",
    email: "maryam@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۱",
    role: "support",
    status: "active",
    ordersCount: 0,
    joinedAt: "2024-11-02T10:00:00Z",
  },
  {
    id: "u-4",
    name: "رضا احمدی",
    email: "reza@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۲",
    role: "customer",
    status: "blocked",
    ordersCount: 5,
    joinedAt: "2025-01-18T10:00:00Z",
  },
];

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "o-1",
    code: "SR-14030912-001",
    customer: "سارا محمدی",
    total: 2_240_000,
    status: "delivered",
    createdAt: "2025-09-12T10:00:00Z",
  },
  {
    id: "o-2",
    code: "SR-14030928-002",
    customer: "علی رضایی",
    total: 1_250_000,
    status: "shipped",
    createdAt: "2025-09-28T14:30:00Z",
  },
  {
    id: "o-3",
    code: "SR-14031005-003",
    customer: "سارا محمدی",
    total: 1_450_000,
    status: "processing",
    createdAt: "2025-10-05T09:15:00Z",
  },
  {
    id: "o-4",
    code: "SR-14031012-004",
    customer: "رضا احمدی",
    total: 680_000,
    status: "pending",
    createdAt: "2025-10-12T18:45:00Z",
  },
];

export const ADMIN_TICKETS: AdminTicket[] = [
  {
    id: "t-1",
    subject: "مشکل در پرداخت",
    user: "سارا محمدی",
    priority: "high",
    status: "open",
    createdAt: "2025-10-20T09:00:00Z",
  },
  {
    id: "t-2",
    subject: "درخواست مرجوعی",
    user: "علی رضایی",
    priority: "normal",
    status: "in-progress",
    createdAt: "2025-10-19T14:20:00Z",
  },
  {
    id: "t-3",
    subject: "سؤال درباره محصول",
    user: "مریم کریمی",
    priority: "low",
    status: "closed",
    createdAt: "2025-10-18T11:00:00Z",
  },
];

export const ORDER_STATUS_LABEL: Record<AdminOrder["status"], string> = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  canceled: "لغو شده",
};

export const ORDER_STATUS_COLOR: Record<AdminOrder["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  canceled: "bg-rose-100 text-rose-700",
};

export const TICKET_PRIORITY_LABEL: Record<AdminTicket["priority"], string> = {
  low: "کم",
  normal: "معمولی",
  high: "فوری",
};

export const TICKET_STATUS_LABEL: Record<AdminTicket["status"], string> = {
  open: "باز",
  "in-progress": "در حال بررسی",
  closed: "بسته",
};

// src/features/admin/data/admin.data.ts
// ... دیتای قبلی

import type { AdminBrand, AdminCategory } from "../types/admin.typ";

export const ADMIN_BRANDS: AdminBrand[] = [
  {
    id: "b-1",
    name: "برند آ",
    slug: "brand-a",
    productCount: 6,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "b-2",
    name: "برند ب",
    slug: "brand-b",
    productCount: 7,
    createdAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "b-3",
    name: "برند ج",
    slug: "brand-c",
    productCount: 6,
    createdAt: "2025-03-10T10:00:00Z",
  },
];

export const ADMIN_CATEGORIES: AdminCategory[] = [
  {
    id: "c-1",
    name: "مراقبت پوست",
    slug: "skincare",
    description: "محصولات مراقبتی پوست",
    productCount: 6,
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "c-2",
    name: "مراقبت مو",
    slug: "haircare",
    description: "شامپو، ماسک و روغن مو",
    productCount: 3,
    createdAt: "2025-01-12T10:00:00Z",
  },
  {
    id: "c-3",
    name: "آرایشی",
    slug: "makeup",
    description: "محصولات آرایشی و زیبایی",
    productCount: 5,
    createdAt: "2025-01-20T10:00:00Z",
  },
  {
    id: "c-4",
    name: "بدن",
    slug: "body",
    description: "مراقبت از پوست بدن",
    productCount: 4,
    createdAt: "2025-02-05T10:00:00Z",
  },
];
// src/features/admin/types/admin.typ.ts
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin" | "support";
  status: "active" | "blocked";
  ordersCount: number;
  joinedAt: string;
};

export type AdminOrder = {
  id: string;
  code: string;
  customer: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  createdAt: string;
};

export type AdminTicket = {
  id: string;
  subject: string;
  user: string;
  priority: "low" | "normal" | "high";
  status: "open" | "in-progress" | "closed";
  createdAt: string;
};

export type AdminStats = {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  openTickets: number;
  pendingOrders: number;
  lowStockProducts: number;
};

// src/features/admin/types/admin.typ.ts
// ... تایپ‌های قبلی

export type AdminBrand = {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  productCount: number;
  createdAt: string;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
  createdAt: string;
};
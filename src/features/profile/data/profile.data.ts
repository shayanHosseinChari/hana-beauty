// src/features/profile/data/profile.data.ts
import type { Address, Order, UserProfile } from "../types/profile.typ";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";

export const USER_PROFILE: UserProfile = {
  name: "سارا محمدی",
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  email: "sara@example.com",
  birthDate: "۱۳۷۵/۰۵/۱۲",
  gender: "female",
  memberSince: "۱۴۰۳/۰۲/۱۸",
  points: 1240,
};

export const USER_ORDERS: Order[] = [
  {
    id: "o-1",
    code: "SR-14030912-001",
    createdAt: "2025-09-12T10:00:00Z",
    status: "delivered",
    total: 2_240_000,
    items: [
      {
        id: STATIC_PRODUCTS[0].id,
        title: STATIC_PRODUCTS[0].title,
        image: STATIC_PRODUCTS[0].image,
        price: 990_000,
        qty: 1,
      },
      {
        id: STATIC_PRODUCTS[1].id,
        title: STATIC_PRODUCTS[1].title,
        image: STATIC_PRODUCTS[1].image,
        price: 780_000,
        qty: 1,
      },
    ],
  },
  {
    id: "o-2",
    code: "SR-14030928-002",
    createdAt: "2025-09-28T14:30:00Z",
    status: "shipped",
    total: 1_250_000,
    items: [
      {
        id: STATIC_PRODUCTS[7].id,
        title: STATIC_PRODUCTS[7].title,
        image: STATIC_PRODUCTS[7].image,
        price: 290_000,
        qty: 2,
      },
    ],
  },
  {
    id: "o-3",
    code: "SR-14031005-003",
    createdAt: "2025-10-05T09:15:00Z",
    status: "processing",
    total: 1_450_000,
    items: [
      {
        id: STATIC_PRODUCTS[10].id,
        title: STATIC_PRODUCTS[10].title,
        image: STATIC_PRODUCTS[10].image,
        price: 1_450_000,
        qty: 1,
      },
    ],
  },
  {
    id: "o-4",
    code: "SR-14031012-004",
    createdAt: "2025-10-12T18:45:00Z",
    status: "pending",
    total: 680_000,
    items: [
      {
        id: STATIC_PRODUCTS[16].id,
        title: STATIC_PRODUCTS[16].title,
        image: STATIC_PRODUCTS[16].image,
        price: 580_000,
        qty: 1,
      },
    ],
  },
];

export const USER_ADDRESSES: Address[] = [
  {
    id: "a-1",
    title: "خانه",
    receiver: "سارا محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    province: "تهران",
    city: "تهران",
    line: "خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳",
    postalCode: "1234567890",
    isDefault: true,
  },
  {
    id: "a-2",
    title: "محل کار",
    receiver: "سارا محمدی",
    phone: "۰۲۱۸۸۷۷۶۶۵۵",
    province: "تهران",
    city: "تهران",
    line: "خیابان میرداماد، برج آرین، طبقه ۵",
    postalCode: "1098765432",
  },
];

export const ORDER_STATUS_LABEL: Record<Order["status"], string> = {
  pending: "در انتظار پرداخت",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  canceled: "لغو شده",
};

export const ORDER_STATUS_COLOR: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  canceled: "bg-rose-100 text-rose-700",
};

export type { Address, Order, UserProfile };
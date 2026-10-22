// src/features/profile/types/profile.typ.ts
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled";

export type OrderItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  code: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
};

export type Address = {
  id: string;
  title: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  line: string;
  postalCode: string;
  isDefault?: boolean;
};

export type UserProfile = {
  name: string;
  phone: string;
  email: string;
  birthDate?: string;
  gender?: "male" | "female";
  avatar?: string;
  memberSince: string;
  points: number;
};
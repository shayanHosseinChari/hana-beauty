// src/features/checkout/types/checkout.typ.ts
export type ShippingMethod = {
  id: "post" | "tipax" | "courier";
  title: string;
  description: string;
  price: number;
  eta: string;
};

export type PaymentMethod = "gateway" | "wallet" | "cod";

export type CheckoutStep = 1 | 2 | 3;
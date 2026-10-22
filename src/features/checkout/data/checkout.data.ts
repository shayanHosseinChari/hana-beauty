import type { PaymentMethod, ShippingMethod } from "../types/checkout.typ";

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "post",
    title: "پست پیشتاز",
    description: "ارسال به سراسر کشور",
    price: 45_000,
    eta: "۳ تا ۵ روز کاری",
  },
  {
    id: "tipax",
    title: "تیپاکس",
    description: "ارسال سریع با بیمه",
    price: 75_000,
    eta: "۲ تا ۳ روز کاری",
  },
  {
    id: "courier",
    title: "پیک موتوری",
    description: "فقط تهران - همان روز",
    price: 120_000,
    eta: "امروز تا ۴ ساعت",
  },
];

export const PAYMENT_METHODS: {
  id: PaymentMethod;
  title: string;
  description: string;
}[] = [
  {
    id: "gateway",
    title: "پرداخت آنلاین",
    description: "درگاه امن بانکی (شتاب)",
  },
  {
    id: "wallet",
    title: "کیف پول",
    description: "موجودی: ۲٬۵۰۰٬۰۰۰ تومان",
  },
  {
    id: "cod",
    title: "پرداخت در محل",
    description: "فقط تهران - کارت‌خوان سیار",
  },
];

export const VALID_COUPONS: Record<string, number> = {
  WELCOME10: 10,
  SPRING15: 15,
  VIP20: 20,
};
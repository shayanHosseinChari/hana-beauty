// src/features/cart/data/cart.data.ts
import type { CartPageItem } from "../types/cart.typ";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";

export const INITIAL_CART: CartPageItem[] = [
  {
    id: STATIC_PRODUCTS[0].id,
    title: STATIC_PRODUCTS[0].title,
    image: STATIC_PRODUCTS[0].image,
    price: STATIC_PRODUCTS[0].price,
    discountPrice: STATIC_PRODUCTS[0].discountPrice,
    qty: 1,
    variant: "۳۰ml",
    selected: true,
  },
  {
    id: STATIC_PRODUCTS[7].id,
    title: STATIC_PRODUCTS[7].title,
    image: STATIC_PRODUCTS[7].image,
    price: STATIC_PRODUCTS[7].price,
    discountPrice: STATIC_PRODUCTS[7].discountPrice,
    qty: 2,
    variant: "رنگ ۰۳",
    selected: true,
  },
  {
    id: STATIC_PRODUCTS[16].id,
    title: STATIC_PRODUCTS[16].title,
    image: STATIC_PRODUCTS[16].image,
    price: STATIC_PRODUCTS[16].price,
    discountPrice: STATIC_PRODUCTS[16].discountPrice,
    qty: 1,
    selected: false,
  },
];

export const VALID_COUPONS: Record<string, number> = {
  WELCOME10: 10,
  SPRING15: 15,
  VIP20: 20,
};
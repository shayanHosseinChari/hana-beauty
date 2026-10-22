// src/features/cart/types/cart.typ.ts

// تایپ اصلی برای دراور و بقیه جاها (بدون selected)
export type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  qty: number;
  variant?: string;
};

// تایپ مخصوص صفحه /cart (با selected)
export type CartPageItem = CartItem & {
  selected: boolean;
};
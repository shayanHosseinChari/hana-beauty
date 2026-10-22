// src/features/products/types/produt.typ.ts
export type Product = {
  id: string;
  title: string;
  price: number;
  discountPrice?: number;
  image: string;
  gallery?: string[];
  brand: string;
  category: string;
  inStock: boolean;
  rating?: number;
  createdAt: string;
  description?: string;
  features?: string[];
  variants?: { label: string; options: string[] };
};

export type ProductFilters = {
  q: string;
  category: string | null;
  brand: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  sort: "newest" | "price-asc" | "price-desc" | "popular";
  page: number;
};

export const DEFAULT_FILTERS: ProductFilters = {
  q: "",
  category: null,
  brand: null,
  minPrice: null,
  maxPrice: null,
  inStock: false,
  sort: "newest",
  page: 1,
};
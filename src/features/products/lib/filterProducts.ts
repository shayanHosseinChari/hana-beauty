// src/features/products/lib/filterProducts.ts
import type { Product, ProductFilters } from "../types/produt.typ";

const PAGE_SIZE = 12;

export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilters
): { items: Product[]; total: number } {
  let result = [...products];

  // جستجو
  if (filters.q.trim()) {
    const q = filters.q.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  // دسته‌بندی
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  // برند
  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }

  // قیمت
  if (filters.minPrice != null) {
    result = result.filter(
      (p) => (p.discountPrice ?? p.price) >= filters.minPrice!
    );
  }
  if (filters.maxPrice != null) {
    result = result.filter(
      (p) => (p.discountPrice ?? p.price) <= filters.maxPrice!
    );
  }

  // موجودی
  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  // مرتب‌سازی
  switch (filters.sort) {
    case "price-asc":
      result.sort(
        (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
      );
      break;
    case "price-desc":
      result.sort(
        (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
      );
      break;
    case "popular":
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "newest":
    default:
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  const total = result.length;
  const start = (filters.page - 1) * PAGE_SIZE;
  const items = result.slice(start, start + PAGE_SIZE);

  return { items, total };
}
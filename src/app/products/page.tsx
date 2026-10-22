// src/app/products/page.tsx
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/features/products/components/FilterSidebar";
import { SortSelect } from "@/features/products/components/SortSelect";
import { ProductCard, ProductSkeleton } from "@/features/products/components/ProductCard";
import {
  DEFAULT_FILTERS,
  type Product,
  type ProductFilters,
} from "@/features/products/types/produt.typ";
import { SearchBar } from "@/features/products/components/SearchBar";
import { filterAndSortProducts } from "@/features/products/lib/filterProducts";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";

const CATEGORIES = [
  { value: "skincare", label: "مراقبت پوست", count: 6 },
  { value: "haircare", label: "مراقبت مو", count: 3 },
  { value: "makeup", label: "آرایشی", count: 5 },
  { value: "body", label: "بدن", count: 4 },
];
const BRANDS = [
  { value: "brand-a", label: "برند آ", count: 6 },
  { value: "brand-b", label: "برند ب", count: 7 },
  { value: "brand-c", label: "برند ج", count: 6 },
];
const MAX_PRICE = 5_000_000;

// ⬇️ همه منطقی که useSearchParams دارد، داخل این کامپوننت است
function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>(() =>
    parseFromURL(searchParams)
  );
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const qs = buildQuery(filters);
    router.replace(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [filters, router]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [filters]);

  const { items: products, total } = useMemo(
    () => filterAndSortProducts(STATIC_PRODUCTS, filters),
    [filters]
  );

  const patch = (p: Partial<ProductFilters>) =>
    setFilters((prev) => ({ ...prev, ...p }));

  const reset = () => setFilters(DEFAULT_FILTERS);

  const pageCount = Math.max(1, Math.ceil(total / 12));

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-b from-[#FDF7F5] to-[#F9EFEB]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#3D2C2A] sm:text-2xl">همه محصولات</h1>
          <p className="mt-1 text-xs text-[#A78A85]">
            {loading ? "در حال بارگذاری..." : `${total.toLocaleString("fa-IR")} کالا`}
          </p>
        </div>

        <div className="mb-6">
          <SearchBar
            defaultValue={filters.q}
            onChange={(q) => patch({ q, page: 1 })}
          />
        </div>

        <div className="flex gap-6">
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              categories={CATEGORIES}
              brands={BRANDS}
              maxPossiblePrice={MAX_PRICE}
              onPatch={patch}
              onReset={reset}
            />
          </div>

          <section className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E8D5CE] bg-white/80 px-3 py-2 text-xs text-[#6B5350] lg:hidden"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                  <path strokeLinecap="round" d="M4 6h16M7 12h10M10 18h4" />
                </svg>
                فیلترها
              </button>

              <div className="mr-auto flex items-center gap-2">
                <span className="hidden text-xs text-[#A78A85] sm:inline">مرتب‌سازی:</span>
                <SortSelect value={filters.sort} onChange={(sort) => patch({ sort, page: 1 })} />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#E8D5CE] bg-white/60 py-16 text-center">
                <p className="text-sm font-medium text-[#3D2C2A]">محصولی یافت نشد</p>
                <p className="mt-1 text-xs text-[#A78A85]">فیلترها یا عبارت جستجو را تغییر دهید.</p>
                <button
                  onClick={reset}
                  className="mt-4 rounded-xl bg-[#D9827C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#C46A64]"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {!loading && pageCount > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  disabled={filters.page <= 1}
                  onClick={() => patch({ page: filters.page - 1 })}
                  className="rounded-lg border border-[#E8D5CE] px-3 py-1.5 text-xs disabled:opacity-40"
                >
                  قبلی
                </button>
                <span className="text-xs text-[#6B5350]">
                  صفحه {filters.page.toLocaleString("fa-IR")} از {pageCount.toLocaleString("fa-IR")}
                </span>
                <button
                  disabled={filters.page >= pageCount}
                  onClick={() => patch({ page: filters.page + 1 })}
                  className="rounded-lg border border-[#E8D5CE] px-3 py-1.5 text-xs disabled:opacity-40"
                >
                  بعدی
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-[#FDF7F5] p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#3D2C2A]">فیلترها</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="rounded-full p-1.5 hover:bg-[#F5E6E1]"
                aria-label="بستن"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              categories={CATEGORIES}
              brands={BRANDS}
              maxPossiblePrice={MAX_PRICE}
              onPatch={patch}
              onReset={reset}
            />
          </div>
        </div>
      )}
    </main>
  );
}

// ⬇️ export default فقط Suspense رو برمی‌گردونه — این کلید حل خطاست
export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-[#FDF7F5] to-[#F9EFEB] p-8 text-center text-sm text-[#A78A85]">
          در حال بارگذاری...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}

// --- helpers ---
function parseFromURL(sp: URLSearchParams): ProductFilters {
  return {
    q: sp.get("q") ?? "",
    category: sp.get("category"),
    brand: sp.get("brand"),
    minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : null,
    maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : null,
    inStock: sp.get("inStock") === "1",
    sort: (sp.get("sort") as ProductFilters["sort"]) ?? "newest",
    page: Number(sp.get("page") ?? 1) || 1,
  };
}

function buildQuery(f: ProductFilters): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.category) p.set("category", f.category);
  if (f.brand) p.set("brand", f.brand);
  if (f.minPrice != null) p.set("minPrice", String(f.minPrice));
  if (f.maxPrice != null) p.set("maxPrice", String(f.maxPrice));
  if (f.inStock) p.set("inStock", "1");
  if (f.sort && f.sort !== "newest") p.set("sort", f.sort);
  if (f.page > 1) p.set("page", String(f.page));
  return p.toString();
}
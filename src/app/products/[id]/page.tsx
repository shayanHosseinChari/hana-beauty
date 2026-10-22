// src/app/products/[id]/page.tsx
import { Suspense } from "react";
import { ProductDetails } from "./product-details";

type Params = { params: Promise<{ id: string }> };

export default function ProductDetailPage({ params }: Params) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails  params={params} />
    </Suspense>
  );
}

function ProductDetailsSkeleton() {
  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-b from-[#FDF7F5] to-[#F9EFEB]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-6 h-4 w-48 animate-pulse rounded bg-[#F5E6E1]" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square w-full animate-pulse rounded-3xl bg-[#F5E6E1]" />
          <div className="space-y-4">
            <div className="h-6 w-3/4 animate-pulse rounded bg-[#F5E6E1]" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-[#F5E6E1]" />
            <div className="h-24 w-full animate-pulse rounded bg-[#F5E6E1]" />
          </div>
        </div>
      </div>
    </main>
  );
}
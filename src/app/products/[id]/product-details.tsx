// src/app/products/[id]/product-details.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/features/products/components/ProductGallery";
import { ProductPurchasePanel } from "@/features/products/components/ProductPurchasePanel";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";

type Params = { params: Promise<{ id: string }> };

export async function ProductDetails({ params }: Params) {
  const { id } = await params;

  const product = STATIC_PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  const related = STATIC_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const images = product.gallery?.length ? product.gallery : [product.image];

  return (
    <main dir="rtl" className="min-h-screen bg-[#FDF7F5]">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">

        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="mb-5 flex items-center gap-1.5 text-[11px] tracking-wide text-[#B09490]"
        >
          <Link href="/" className="transition-colors hover:text-[#D9827C]">خانه</Link>
          <Chevron />
          <Link href="/products" className="transition-colors hover:text-[#D9827C]">محصولات</Link>
          <Chevron />
          <span className="line-clamp-1 max-w-[160px] text-[#5C3E3A]">{product.title}</span>
        </nav>

        {/* Main */}
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* گالری — کوچک‌تر از قبل */}
          <div className="max-h-[480px]">
            <ProductGallery images={images} alt={product.title} />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[10px] tracking-widest text-[#B09490] uppercase">
                {product.brand}
              </p>
              <h1 className="mt-1 text-xl leading-snug tracking-tight text-[#2A1E1C]">
                {product.title}
              </h1>
              {product.rating && (
                <div className="mt-1.5 flex items-center gap-2">
                  <StarRating value={product.rating} />
                  <span className="text-xs text-[#8A6D68]">
                    {product.rating.toLocaleString("fa-IR")}
                  </span>
                </div>
              )}
            </div>

            {product.description && (
              <p className="line-clamp-3 text-sm leading-7 text-[#7A5E5A]">
                {product.description}
              </p>
            )}

            <div className="h-px bg-gradient-to-r from-[#EAD8D4] via-[#EAD8D4]/40 to-transparent" />

            <ProductPurchasePanel product={product} />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm tracking-tight text-[#2A1E1C]">محصولات مرتبط</h2>
              <Link
                href="/products"
                className="group flex items-center gap-1 text-[11px] text-[#B09490] hover:text-[#D9827C]"
              >
                همه
                <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group overflow-hidden rounded-2xl border border-[#EAD8D4]/60 bg-white/80 transition-all duration-300 hover:border-[#D9827C]/40 hover:shadow-[0_6px_24px_-6px_rgba(180,100,95,0.15)]"
                >
                  <div className="aspect-square overflow-hidden bg-[#FDF7F5]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="line-clamp-2 text-[11px] leading-5 text-[#3D2C2A]">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

function Chevron() {
  return (
    <svg className="h-2.5 w-2.5 text-[#D5C0BB]" viewBox="0 0 12 12" fill="none">
      <path d="M4.5 9.5L7.5 6 4.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`امتیاز ${value}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${
            i < full ? "text-amber-400" : i === full && half ? "text-amber-300" : "text-[#E0D0CC]"
          }`}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 1l1.75 5.25H15L10.5 9.5l1.75 5.25L8 11.5l-4.25 3.25L5.5 9.5 1 6.25h5.25L8 1z" />
        </svg>
      ))}
    </div>
  );
}

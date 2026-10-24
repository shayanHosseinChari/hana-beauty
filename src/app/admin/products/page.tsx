// src/app/admin/products/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { STATIC_PRODUCTS } from "@/features/products/data/product.data";
import { useModalHistory } from "@/features/profile/hooks/useModalHistory";
import type { Product } from "@/features/products/types/produt.typ";

const fmt = (n: number) => n.toLocaleString("fa-IR");

type ProductForm = {
  title: string;
  brand: string;
  category: string;
  price: string;
  discountPrice: string;
  image: string;
  description: string;
  inStock: boolean;
  features: string;
};

const EMPTY_FORM: ProductForm = {
  title: "",
  brand: "",
  category: "",
  price: "",
  discountPrice: "",
  image: "",
  description: "",
  inStock: true,
  features: "",
};

const CATEGORIES = [
  { value: "skincare", label: "مراقبت پوست" },
  { value: "haircare", label: "مراقبت مو" },
  { value: "makeup", label: "آرایشی" },
  { value: "body", label: "بدن" },
];

const BRANDS = [
  { value: "brand-a", label: "برند آ" },
  { value: "brand-b", label: "برند ب" },
  { value: "brand-c", label: "برند ج" },
];

/** تبدیل Product به فرم */
function toForm(p: Product): ProductForm {
  return {
    title: p.title,
    brand: p.brand,
    category: p.category,
    price: String(p.price),
    discountPrice: p.discountPrice ? String(p.discountPrice) : "",
    image: p.image,
    description: p.description ?? "",
    inStock: p.inStock,
    features: (p.features ?? []).join("\n"),
  };
}

export default function AdminProductsPage() {
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [saved, setSaved] = useState(false);
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS);

  const { closeWithHistory } = useModalHistory(modalOpen, () => {
    setForm(EMPTY_FORM);
    setEditing(null);
    setModalOpen(false);
  });

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.brand.toLowerCase().includes(q.toLowerCase())
      ),
    [q, products]
  );

  const update = (key: keyof ProductForm, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(toForm(p));
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Omit<Product, "id" | "createdAt"> = {
      title: form.title.trim(),
      brand: form.brand,
      category: form.category,
      price: Number(form.price) || 0,
      discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
      image: form.image,
      gallery: editing?.gallery ?? (form.image ? [form.image] : []),
      description: form.description || undefined,
      features: form.features
        ? form.features
            .split("\n")
            .map((f) => f.trim())
            .filter(Boolean)
        : undefined,
      inStock: form.inStock,
      rating: editing?.rating,
    };

    if (editing) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...payload } : p
        )
      );
      console.log("updated product", editing.id, payload);
    } else {
      const newProduct: Product = {
        id: `p-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...payload,
      };
      setProducts((prev) => [newProduct, ...prev]);
      console.log("created product", newProduct);
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      closeWithHistory();
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجوی محصول..."
          className="h-10 w-full rounded-xl border border-[#E8D5CE] bg-white px-3 text-xs outline-none focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25 sm:max-w-sm"
        />
        <button
          type="button"
          onClick={openCreate}
          className="shrink-0 rounded-xl bg-[#D9827C] px-4 py-2 text-[11px] text-white transition hover:bg-[#C46A64]"
        >
          + محصول جدید
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E8D5CE] bg-white/80 backdrop-blur">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#FDF7F5] text-[#6B5350]">
            <tr>
              <th className="px-4 py-3">محصول</th>
              <th className="px-4 py-3">دسته</th>
              <th className="px-4 py-3">قیمت</th>
              <th className="px-4 py-3">موجودی</th>
              <th className="px-4 py-3">امتیاز</th>
              <th className="px-4 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0E1DC]">
            {filtered.map((p) => {
              const final = p.discountPrice ?? p.price;
              return (
                <tr key={p.id} className="transition hover:bg-[#FDF7F5]/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-[#FBF6F4]">
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-1 text-[#3D2C2A]">{p.title}</p>
                        <p className="text-[10px] text-[#A78A85]">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6B5350]">{p.category}</td>
                  <td className="px-4 py-3">
                    <p className="text-[#3D2C2A]">{fmt(final)}</p>
                    {p.discountPrice && (
                      <p className="text-[9px] text-[#C7B5B1] line-through">{fmt(p.price)}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        p.inStock
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {p.inStock ? "موجود" : "ناموجود"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#3D2C2A]">
                    {p.rating?.toLocaleString("fa-IR") ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/products/${p.id}`}
                        className="rounded-lg border border-[#E8D5CE] px-2 py-1 text-[10px] text-[#6B5350] transition hover:border-[#D9827C]"
                      >
                        مشاهده
                      </Link>
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="rounded-lg border border-[#E8D5CE] px-2 py-1 text-[10px] text-[#3D2C2A] transition hover:border-[#D9827C] hover:text-[#D9827C]"
                      >
                        ویرایش
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setProducts((prev) => prev.filter((x) => x.id !== p.id))
                        }
                        className="rounded-lg border border-[#E8D5CE] px-2 py-1 text-[10px] text-[#C46A64] transition hover:border-[#C46A64]"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ProductFormModal
          form={form}
          saved={saved}
          isEditing={!!editing}
          onChange={update}
          onSubmit={handleSubmit}
          onClose={closeWithHistory}
        />
      )}
    </div>
  );
}

/* ---------------- مودال / باتم‌شیت ---------------- */

type ModalProps = {
  form: ProductForm;
  saved: boolean;
  isEditing: boolean;
  onChange: (key: keyof ProductForm, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

function ProductFormModal({
  form,
  saved,
  isEditing,
  onChange,
  onSubmit,
  onClose,
}: ModalProps) {
  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? "ویرایش محصول" : "افزودن محصول"}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#2A1E1C]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={onSubmit}
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-[#EAD8D4]/60 bg-white/96 px-5 pb-8 pt-5 backdrop-blur-xl sm:max-w-lg sm:rounded-[28px]"
        style={{
          boxShadow:
            "0 -8px 48px -8px rgba(180,110,100,0.18), 0 0 0 1px rgba(180,110,100,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
          animation: "sheetIn 320ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E8D5CE] sm:hidden" />

        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[15px] tracking-tight text-[#2A1E1C]">
              {isEditing ? "ویرایش محصول" : "محصول جدید"}
            </p>
            <p className="mt-0.5 text-[10px] tracking-wide text-[#A78A85]">
              {isEditing
                ? "مشخصات محصول را ویرایش کنید"
                : "مشخصات محصول را وارد کنید"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5ECE9] text-[#8A6D68] transition hover:bg-[#EAD8D4] hover:text-[#3D2C2A]"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-3.5">
          <Field label="نام محصول" required>
            <input
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="مثلاً سرم ویتامین C"
              className={inputClass}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="برند">
              <select
                value={form.brand}
                onChange={(e) => onChange("brand", e.target.value)}
                className={inputClass}
              >
                <option value="">انتخاب برند</option>
                {BRANDS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="دسته‌بندی">
              <select
                value={form.category}
                onChange={(e) => onChange("category", e.target.value)}
                className={inputClass}
              >
                <option value="">انتخاب دسته</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="قیمت (تومان)" required>
              <input
                type="number"
                inputMode="numeric"
                value={form.price}
                onChange={(e) => onChange("price", e.target.value)}
                placeholder="۰"
                className={inputClass}
                required
              />
            </Field>
            <Field label="قیمت با تخفیف">
              <input
                type="number"
                inputMode="numeric"
                value={form.discountPrice}
                onChange={(e) => onChange("discountPrice", e.target.value)}
                placeholder="اختیاری"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="لینک تصویر">
            <input
              type="url"
              value={form.image}
              onChange={(e) => onChange("image", e.target.value)}
              placeholder="https://..."
              dir="ltr"
              className={`${inputClass} text-left`}
            />
          </Field>

          <Field label="توضیحات">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              placeholder="توضیحات کوتاه محصول"
              className={`${inputClass} resize-none`}
            />
          </Field>

          <Field label="ویژگی‌ها (هر خط یک ویژگی)">
            <textarea
              rows={3}
              value={form.features}
              onChange={(e) => onChange("features", e.target.value)}
              placeholder={"۱۵٪ ویتامین C\nبدون الکل\nمناسب انواع پوست"}
              className={`${inputClass} resize-none`}
            />
          </Field>

          <label className="flex cursor-pointer items-center justify-between rounded-xl bg-[#FDF7F5] px-3 py-2.5">
            <span className="text-[11px] font-medium text-[#6B5350]">
              موجود در انبار
            </span>
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(e) => onChange("inStock", e.target.checked)}
              className="h-4 w-4 accent-[#D9827C]"
            />
          </label>
        </div>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#EAD8D4] to-transparent" />

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-[#E8D5CE] py-2.5 text-[12px] text-[#8A6D68] transition-colors hover:border-[#D9827C]/40 hover:text-[#3D2C2A]"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={saved}
            className={`flex flex-[2] items-center justify-center gap-2 rounded-2xl py-2.5 text-[12px] tracking-wide text-white transition-all duration-200 ${
              saved
                ? "bg-emerald-600"
                : "bg-[#3D2C2A] hover:bg-[#2A1E1C] hover:shadow-[0_4px_16px_-4px_rgba(61,44,42,0.45)]"
            }`}
          >
            {saved
              ? "✓ ذخیره شد"
              : isEditing
              ? "ذخیره تغییرات"
              : "ثبت محصول"}
          </button>
        </div>
      </form>

      <style jsx global>{`
        @keyframes sheetIn {
          from {
            transform: translateY(100%);
            opacity: 0.6;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (min-width: 640px) {
          @keyframes sheetIn {
            from {
              transform: scale(0.92);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#E8D5CE] bg-white px-3 py-2 text-[12px] text-[#3D2C2A] outline-none transition focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] tracking-wide text-[#8A6D68]">
        {label}
        {required && <span className="mr-1 text-[#D9827C]">*</span>}
      </span>
      {children}
    </label>
  );
}
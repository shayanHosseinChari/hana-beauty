// src/app/admin/categories/page.tsx
"use client";

import { useMemo, useState } from "react";
import { ADMIN_CATEGORIES } from "@/features/admin/data/admin.data";
import type { AdminCategory } from "@/features/admin/types/admin.typ";
import { useEntityForm } from "@/features/admin/hooks/useEntityForm";

type CategoryForm = {
  name: string;
  slug: string;
  description: string;
};

const EMPTY_FORM: CategoryForm = { name: "", slug: "", description: "" };

function toForm(c: AdminCategory): CategoryForm {
  return { name: c.name, slug: c.slug, description: c.description ?? "" };
}

export default function AdminCategoriesPage() {
  const [q, setQ] = useState("");
  const [categories, setCategories] = useState<AdminCategory[]>(ADMIN_CATEGORIES);

  const {
    open,
    editingId,
    form,
    saved,
    openCreate,
    openEdit,
    update,
    markSaved,
    closeWithHistory,
  } = useEntityForm<CategoryForm>(EMPTY_FORM);

  const filtered = useMemo(
    () =>
      categories.filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.slug.toLowerCase().includes(q.toLowerCase())
      ),
    [categories, q]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                name: form.name,
                slug: form.slug,
                description: form.description || undefined,
              }
            : c
        )
      );
    } else {
      setCategories((prev) => [
        {
          id: `c-${Date.now()}`,
          name: form.name,
          slug: form.slug,
          description: form.description || undefined,
          productCount: 0,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
    markSaved();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجوی دسته‌بندی..."
          className="h-10 w-full rounded-xl border border-[#E8D5CE] bg-white px-3 text-xs outline-none focus:border-[#D9827C] focus:ring-2 focus:ring-[#D9827C]/25 sm:max-w-sm"
        />
        <button
          type="button"
          onClick={openCreate}
          className="shrink-0 rounded-xl bg-[#D9827C] px-4 py-2 text-[11px] text-white transition hover:bg-[#C46A64]"
        >
          + دسته جدید
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-[#E8D5CE] bg-white/80 p-4 backdrop-blur transition hover:border-[#D9827C]/50"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#3D2C2A]">
                  {c.name}
                </p>
                <p className="mt-0.5 text-[10px] text-[#A78A85]" dir="ltr">
                  {c.slug}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[#F5E6E1] px-2 py-0.5 text-[10px] text-[#C46A64]">
                {c.productCount.toLocaleString("fa-IR")} محصول
              </span>
            </div>

            {c.description && (
              <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#6B5350]">
                {c.description}
              </p>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-[#F0E1DC] pt-3">
              <span className="text-[10px] text-[#A78A85]">
                {new Date(c.createdAt).toLocaleDateString("fa-IR")}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => openEdit(c.id, toForm(c))}
                  className="rounded-lg border border-[#E8D5CE] px-2 py-1 text-[10px] text-[#3D2C2A] transition hover:border-[#D9827C] hover:text-[#D9827C]"
                >
                  ویرایش
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCategories((prev) => prev.filter((x) => x.id !== c.id))
                  }
                  className="rounded-lg border border-[#E8D5CE] px-2 py-1 text-[10px] text-[#C46A64] transition hover:border-[#C46A64]"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <CategoryFormModal
          form={form}
          isEditing={!!editingId}
          saved={saved}
          onChange={update}
          onSubmit={handleSubmit}
          onClose={closeWithHistory}
        />
      )}
    </div>
  );
}

/* ---------- مودال / باتم‌شیت ---------- */

type ModalProps = {
  form: CategoryForm;
  isEditing: boolean;
  saved: boolean;
  onChange: (patch: Partial<CategoryForm>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

function CategoryFormModal({
  form,
  isEditing,
  saved,
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
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#2A1E1C]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full rounded-t-[28px] border border-[#EAD8D4]/60 bg-white/96 px-5 pb-8 pt-5 backdrop-blur-xl sm:max-w-md sm:rounded-[28px]"
        style={{ animation: "sheetIn 320ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#E8D5CE] sm:hidden" />

        <div className="mb-5 flex items-center justify-between">
          <p className="text-[15px] text-[#2A1E1C]">
            {isEditing ? "ویرایش دسته‌بندی" : "دسته‌بندی جدید"}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5ECE9] text-[#8A6D68] transition hover:bg-[#EAD8D4]"
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
          <Field label="نام دسته" required>
            <input
              value={form.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="مثلاً مراقبت پوست"
              className={inputClass}
              required
            />
          </Field>
          <Field label="اسلاگ (انگلیسی)" required>
            <input
              value={form.slug}
              onChange={(e) => onChange({ slug: e.target.value })}
              placeholder="skincare"
              dir="ltr"
              className={`${inputClass} text-left`}
              required
            />
          </Field>
          <Field label="توضیحات">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="توضیح کوتاه دسته"
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>

        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-[#E8D5CE] py-2.5 text-[12px] text-[#8A6D68] transition hover:border-[#D9827C]/40"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={saved}
            className={`flex flex-[2] items-center justify-center rounded-2xl py-2.5 text-[12px] text-white transition ${
              saved
                ? "bg-emerald-600"
                : "bg-[#3D2C2A] hover:bg-[#2A1E1C]"
            }`}
          >
            {saved ? "✓ ذخیره شد" : isEditing ? "ذخیره تغییرات" : "ثبت دسته"}
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
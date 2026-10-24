"use client";

import { useState } from "react";
import { useModalHistory } from "@/features/profile/hooks/useModalHistory";

export function useEntityForm<T extends object>(empty: T) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<T>(empty);
  const [saved, setSaved] = useState(false);

  const { closeWithHistory } = useModalHistory(open, () => {
    setForm(empty);
    setEditingId(null);
    setOpen(false);
  });

  const openCreate = () => {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (id: string, data: T) => {
    setEditingId(id);
    setForm(data);
    setOpen(true);
  };

  const update = (patch: Partial<T>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const markSaved = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      closeWithHistory();
    }, 1000);
  };

  return {
    open,
    editingId,
    form,
    saved,
    openCreate,
    openEdit,
    update,
    markSaved,
    closeWithHistory,
  };
}
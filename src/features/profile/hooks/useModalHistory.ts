// src/features/profile/hooks/useModalHistory.ts
"use client";

import { useCallback, useEffect, useRef } from "react";

export function useModalHistory(open: boolean, onClose: () => void) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (open && !pushedRef.current) {
      window.history.pushState({ modal: "address" }, "");
      pushedRef.current = true;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePopState = () => {
      pushedRef.current = false;
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [open, onClose]);

  const closeWithHistory = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  return { closeWithHistory };
}
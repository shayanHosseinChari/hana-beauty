// src/features/profile/hooks/useModalHistory.ts
"use client";

import { useCallback, useEffect, useRef } from "react";

export function useModalHistory(open: boolean, onClose: () => void) {
  const pushedRef = useRef(false);
  const manualCloseRef = useRef(false);

  useEffect(() => {
    if (open && !pushedRef.current) {
      window.history.pushState({ modal: true }, "");
      pushedRef.current = true;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePopState = () => {
      pushedRef.current = false;
      if (!manualCloseRef.current) {
        onClose();
      }
      manualCloseRef.current = false;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [open, onClose]);

  const closeWithHistory = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false;
      manualCloseRef.current = true;
      onClose();
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  return { closeWithHistory };
}
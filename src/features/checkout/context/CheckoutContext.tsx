// src/features/checkout/context/CheckoutContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Address } from "@/features/profile/types/profile.typ";
import type { PaymentMethod, ShippingMethod } from "../types/checkout.typ";
import { USER_ADDRESSES } from "@/features/profile/data/profile.data";

type CheckoutState = {
  address: Address;
  setAddress: (a: Address) => void;
  shippingId: ShippingMethod["id"];
  setShippingId: (id: ShippingMethod["id"]) => void;
  payment: PaymentMethod;
  setPayment: (p: PaymentMethod) => void;
  couponDiscount: number;
  setCouponDiscount: (n: number) => void;
  orderCode: string;
};

const CheckoutContext = createContext<CheckoutState | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<Address>(
    USER_ADDRESSES.find((a) => a.isDefault) ?? USER_ADDRESSES[0]
  );
  const [shippingId, setShippingId] = useState<ShippingMethod["id"]>("post");
  const [payment, setPayment] = useState<PaymentMethod>("gateway");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    setOrderCode(`SR-${Date.now().toString().slice(-8)}`);
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        shippingId,
        setShippingId,
        payment,
        setPayment,
        couponDiscount,
        setCouponDiscount,
        orderCode,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
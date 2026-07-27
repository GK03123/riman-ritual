"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { type Product } from "@/lib/products";

interface DrawerCtx {
  product: Product | null;
  open: (p: Product) => void;
  close: () => void;
}

const Ctx = createContext<DrawerCtx>({ product: null, open: () => {}, close: () => {} });

export function useProductDrawer() {
  return useContext(Ctx);
}

export function ProductDrawerProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const pathname = usePathname();

  const open = useCallback((p: Product) => setProduct(p), []);
  const close = useCallback(() => setProduct(null), []);

  // Al cambiar de ruta la ficha se cierra para no tapar la página nueva.
  useEffect(() => {
    setProduct(null);
  }, [pathname]);

  useEffect(() => {
    if (product) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    const onKey = (e: KeyboardEvent) => {
      // Si la bolsa está abierta encima, Escape la cierra a ella primero.
      if (e.key === "Escape" && !document.body.classList.contains("bag-open")) {
        setProduct(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("drawer-open");
    };
  }, [product]);

  return <Ctx.Provider value={{ product, open, close }}>{children}</Ctx.Provider>;
}

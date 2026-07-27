"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface CatalogCtx {
  open: boolean;
  show: () => void;
  hide: () => void;
}

const Ctx = createContext<CatalogCtx>({ open: false, show: () => {}, hide: () => {} });

export function useCatalog() {
  return useContext(Ctx);
}

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  // Si el usuario navega a otra ruta (por ejemplo una página de
  // producto), el overlay no debe quedar abierto encima.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.classList.add("catalog-open");
    else document.body.classList.remove("catalog-open");
    const onKey = (e: KeyboardEvent) => {
      // Si la ficha o la bolsa están abiertas encima, Escape las cierra a ellas.
      if (
        e.key === "Escape" &&
        !document.body.classList.contains("drawer-open") &&
        !document.body.classList.contains("bag-open")
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("catalog-open");
    };
  }, [open]);

  return <Ctx.Provider value={{ open, show, hide }}>{children}</Ctx.Provider>;
}

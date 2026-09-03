"use client";

// ─── Mi rutina: la bolsa de la boutique ────────────────────────────
// Una sola lista guardada (no wishlist + carrito por separado): en una
// tienda de afiliada el pago se completa en RIMAN producto a producto,
// así que dos listas paralelas duplicarían el mismo gesto. Aquí todo
// vive en localStorage y sobrevive entre visitas.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, type Product } from "./products";

const STORAGE_KEY = "eg-mi-ritual-v1";

export interface BagItem {
  product: Product;
  qty: number;
}

interface BagCtx {
  items: BagItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  add: (p: Product) => void;
  addMany: (ps: Product[]) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  toggle: (p: Product) => void;
  has: (id: number) => boolean;
  notify: (msg: string) => void;
}

const Ctx = createContext<BagCtx>({
  items: [],
  count: 0,
  subtotal: 0,
  isOpen: false,
  openBag: () => {},
  closeBag: () => {},
  add: () => {},
  addMany: () => {},
  remove: () => {},
  setQty: () => {},
  toggle: () => {},
  has: () => false,
  notify: () => {},
});

export function useRitualBag() {
  return useContext(Ctx);
}

type StoredItem = { id: number; qty: number };

function readStorage(): StoredItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredItem[];
    if (!Array.isArray(parsed)) return [];
    // Ids que ya no existen en el catálogo se descartan en silencio.
    return parsed.filter(
      (it) =>
        typeof it?.id === "number" &&
        typeof it?.qty === "number" &&
        it.qty > 0 &&
        PRODUCTS.some((p) => p.id === it.id)
    );
  } catch {
    return [];
  }
}

export function RitualBagProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  // Bandera de estado, no ref. Con una ref el guardado se armaba en la
  // misma pasada de efectos que la lectura: el efecto de escritura corría
  // a continuación con `stored` todavía vacío y con la bandera ya en true,
  // así que lo primero que hacía cada carga era escribir `[]` encima de la
  // rutina guardada. En producción se salvaba de milagro (la lectura ya
  // había ocurrido y el siguiente render volvía a escribir la lista), pero
  // con StrictMode el segundo montaje leía el hueco y la bolsa se vaciaba
  // en cada recarga. Con estado, la escritura no se arma hasta que el
  // render lleva ya la lista leída.
  const [hydrated, setHydrated] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Hidratación desde localStorage tras el primer render (evita
  // desajustes con el HTML del servidor).
  useEffect(() => {
    setStored(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* almacenamiento lleno o bloqueado: la bolsa sigue en memoria */
    }
  }, [stored, hydrated]);

  // Al navegar, el panel se cierra para no tapar la página nueva.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("bag-open");
    } else {
      document.body.classList.remove("bag-open");
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("bag-open");
    };
  }, [isOpen]);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const add = useCallback(
    (p: Product) => {
      setStored((prev) => {
        const found = prev.find((it) => it.id === p.id);
        if (found) {
          return prev.map((it) =>
            it.id === p.id ? { ...it, qty: it.qty + 1 } : it
          );
        }
        return [...prev, { id: p.id, qty: 1 }];
      });
      showToast("Guardado en tu rutina");
    },
    [showToast]
  );

  const addMany = useCallback(
    (ps: Product[]) => {
      setStored((prev) => {
        const next = [...prev];
        for (const p of ps) {
          if (!next.some((it) => it.id === p.id)) {
            next.push({ id: p.id, qty: 1 });
          }
        }
        return next;
      });
      showToast(
        ps.length === 1 ? "Guardado en tu rutina" : "Rutina guardada"
      );
    },
    [showToast]
  );

  const remove = useCallback((id: number) => {
    setStored((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setStored((prev) =>
      qty <= 0
        ? prev.filter((it) => it.id !== id)
        : prev.map((it) => (it.id === id ? { ...it, qty } : it))
    );
  }, []);

  const has = useCallback(
    (id: number) => stored.some((it) => it.id === id),
    [stored]
  );

  const toggle = useCallback(
    (p: Product) => {
      if (stored.some((it) => it.id === p.id)) {
        setStored((prev) => prev.filter((it) => it.id !== p.id));
        showToast("Quitado de tu rutina");
      } else {
        add(p);
      }
    },
    [stored, add, showToast]
  );

  const items = useMemo<BagItem[]>(
    () =>
      stored.flatMap((it) => {
        const product = PRODUCTS.find((p) => p.id === it.id);
        return product ? [{ product, qty: it.qty }] : [];
      }),
    [stored]
  );

  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, it) => sum + (it.product.price ?? 0) * it.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openBag: () => setIsOpen(true),
      closeBag: () => setIsOpen(false),
      add,
      addMany,
      remove,
      setQty,
      toggle,
      has,
      notify: showToast,
    }),
    [items, count, subtotal, isOpen, add, addMany, remove, setQty, toggle, has, showToast]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* Confirmación breve, siempre visible por encima de los paneles */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-8 z-[100] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 bg-ink px-5 py-3 text-[11px] uppercase tracking-micro text-ivory shadow-cardHover"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden />
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

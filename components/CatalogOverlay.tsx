"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { PRODUCTS, RITUAL_IDS, CATEGORY, type Product } from "@/lib/products";
import { useCatalog } from "@/lib/catalog-overlay";
import { benefitLabel } from "@/lib/merch";
import { EASE } from "@/lib/motion";
import { restoreFocus, useFocusTrap } from "@/lib/focus-trap";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

type Filter = "todos" | "skincare" | "personal" | "wellness" | "sets";

const TABS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "skincare", label: "Skincare" },
  { id: "personal", label: "Cuidado Personal" },
  { id: "wellness", label: "Bienestar" },
  { id: "sets", label: "Sets & Kits" },
];

function matches(p: Product, f: Filter): boolean {
  switch (f) {
    case "todos":
      return true;
    case "skincare":
      return p.categories.includes(CATEGORY.SKINCARE) && !p.isPackage;
    case "personal":
      return p.categories.includes(CATEGORY.PERSONAL_CARE);
    case "wellness":
      return p.categories.includes(CATEGORY.WELLNESS);
    case "sets":
      return p.isPackage || RITUAL_IDS.includes(p.id);
  }
}

// Búsqueda sin distinción de tildes ni mayúsculas.
function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// El catálogo del API viene en inglés ("Cream", "Moisturizers") y aquí se
// busca en español: "crema" no encontraba nada. Cada término se expande a
// las palabras con las que el producto está realmente escrito.
const SINONIMOS: Record<string, string[]> = {
  crema: ["cream", "moisturizer"],
  cremas: ["cream", "moisturizer"],
  hidratante: ["cream", "moisturizer", "hidratacion"],
  serum: ["serum", "essence", "ampoule"],
  esencia: ["essence", "serum"],
  tonico: ["toner"],
  limpiador: ["cleanser", "cleansing", "wash", "foam"],
  limpieza: ["cleanser", "cleansing", "wash"],
  aceite: ["oil"],
  espuma: ["foam", "wash"],
  mascarilla: ["mask", "sheet"],
  protector: ["sun", "spf", "sunscreen"],
  solar: ["sun", "spf", "sunscreen"],
  bloqueador: ["sun", "spf", "sunscreen"],
  labial: ["lip"],
  ojos: ["eye"],
  cabello: ["hair", "shampoo"],
  pelo: ["hair", "shampoo"],
  champu: ["shampoo", "hair"],
  cuerpo: ["body", "lotion"],
  jabon: ["soap", "bar", "wash"],
  suplemento: ["collagen", "supplement", "lifening"],
  colageno: ["collagen"],
  kit: ["package", "ritual", "set"],
  set: ["package", "ritual", "set"],
  ritual: ["ritual", "package"],
};

function matchesQuery(p: Product, q: string): boolean {
  if (!q) return true;
  const haystack = norm(
    `${p.name} ${p.brand} ${p.line} ${p.menu} ${benefitLabel(p.menu)} ${
      p.isPackage ? "set kit package" : ""
    } ${p.kit.join(" ")}`
  );
  return q.split(/\s+/).every((term) => {
    if (haystack.includes(term)) return true;
    return (SINONIMOS[term] ?? []).some((alt) => haystack.includes(alt));
  });
}

export default function CatalogOverlay() {
  const { open, hide } = useCatalog();
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  // aria-modal="true" promete que detrás no hay nada; el tabulador lo cumple.
  useFocusTrap(open, panelRef);

  const q = norm(query.trim());
  const visible = useMemo(
    () =>
      PRODUCTS.filter((p) => matches(p, filter) && matchesQuery(p, q)).sort(
        (a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99)
      ),
    [filter, q]
  );

  useEffect(() => {
    if (open && !wasOpen.current) {
      wasOpen.current = true;
      setFilter("todos");
      setQuery("");
      lastFocus.current = document.activeElement as HTMLElement | null;
      searchRef.current?.focus();
    } else if (!open && wasOpen.current) {
      wasOpen.current = false;
      // En móvil el catálogo se abre desde el menú desplegable, que se
      // cierra al abrirlo: para cuando volvemos, ese botón ya no está.
      restoreFocus(lastFocus.current, '[aria-label="Buscar en el catálogo"]');
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[65] flex flex-col bg-porcelain"
          role="dialog"
          aria-modal="true"
          aria-label="Catálogo completo"
        >
          {/* Header sticky */}
          <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="sticky top-0 z-10 border-b border-hairline bg-porcelain/95 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="flex items-baseline gap-3">
                <p className="font-display text-display-sm font-normal">
                  El catálogo
                </p>
                <span className="editorial-index text-micro uppercase tracking-wide2 text-stone-dark">
                  {visible.length} pieza{visible.length === 1 ? "" : "s"}
                </span>
              </div>
              <button
                onClick={hide}
                aria-label="Cerrar catálogo"
                className="press flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Búsqueda + tabs */}
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-4 sm:px-6 lg:flex-row lg:items-center lg:gap-6">
              <label className="relative flex items-center lg:w-72 lg:shrink-0">
                <Search className="pointer-events-none absolute left-0 h-4 w-4 text-stone-dark" aria-hidden />
                <span className="sr-only">Buscar en el catálogo</span>
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Busca «crema», «sérum», «kit»…"
                  className="w-full border-b border-ink/20 bg-transparent py-2.5 pl-7 pr-2 text-base text-ink placeholder:text-stone-dark focus:border-champagne-deep focus:outline-none"
                />
              </label>
              <div className="overflow-x-auto">
                <div className="flex min-w-max gap-2">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setFilter(t.id)}
                      aria-pressed={filter === t.id}
                      className={cn(
                        "press border px-5 py-2.5 text-label uppercase transition-colors duration-300",
                        filter === t.id
                          ? "border-ink bg-ink text-ivory"
                          : "border-hairline bg-transparent text-stone-dark hover:border-champagne-deep hover:text-champagne-deep"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.header>

          {/* Scrollable grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="flex-1 overflow-y-auto"
          >
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
              {visible.length === 0 ? (
                <div className="flex flex-col items-center gap-5 py-20 text-center">
                  <span
                    aria-hidden
                    className="select-none font-display text-6xl font-normal italic text-champagne/50"
                  >
                    …
                  </span>
                  <p className="max-w-sm text-sm leading-relaxed text-stone-dark">
                    {q
                      ? `Ninguna pieza coincide con «${query.trim()}». Prueba con otra palabra o revisa las categorías.`
                      : "No hay piezas en esta categoría por el momento."}
                  </p>
                  {(q || filter !== "todos") && (
                    <button
                      onClick={() => {
                        setQuery("");
                        setFilter("todos");
                        searchRef.current?.focus();
                      }}
                      className="press border border-ink px-6 py-3 text-label uppercase transition-colors duration-300 hover:border-champagne-deep hover:bg-champagne-deep hover:text-ivory"
                    >
                      Ver todo el catálogo
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                  {visible.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

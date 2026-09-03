"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Minus,
  Plus,
  Star,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { useRitualBag } from "@/lib/ritual-bag";
import { BESTSELLERS } from "@/lib/products";
import { SITE, productUrl } from "@/lib/site";
import { SPRING_PANEL } from "@/lib/motion";
import { restoreFocus, useFocusTrap } from "@/lib/focus-trap";
import { formatPrice } from "@/lib/utils";
import Photo from "./Photo";

export default function BagDrawer() {
  const { items, count, subtotal, isOpen, closeBag, add, remove, setQty } =
    useRitualBag();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  // aria-modal="true" promete que detrás no hay nada; el tabulador lo cumple.
  useFocusTrap(isOpen, panelRef);

  // Foco accesible: entra al botón de cerrar, vuelve a quien abrió.
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      wasOpen.current = true;
      lastFocus.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else if (!isOpen && wasOpen.current) {
      wasOpen.current = false;
      restoreFocus(lastFocus.current, '[aria-label^="Abrir mi rutina"]');
    }
  }, [isOpen]);

  // Sugerencia: el bestseller mejor rankeado que aún no está en la bolsa.
  const suggestion = useMemo(() => {
    if (items.length === 0) return null;
    return BESTSELLERS.find((p) => !items.some((it) => it.product.id === p.id)) ?? null;
  }, [items]);

  // Pedido por WhatsApp: solo si la boutique tiene número configurado.
  const whatsappHref = useMemo(() => {
    if (!SITE.whatsapp || items.length === 0) return null;
    const lines = items.map(
      (it) =>
        `· ${it.product.name}${it.qty > 1 ? ` × ${it.qty}` : ""} (${formatPrice(
          it.product.price
        )})`
    );
    const msg = [
      "¡Hola Eilin! Quiero completar esta rutina:",
      ...lines,
      `Total estimado: ${formatPrice(subtotal)}`,
    ].join("\n");
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [items, subtotal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            key="bag-backdrop"
            aria-label="Cerrar mi rutina"
            onClick={closeBag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            key="bag-panel"
            ref={panelRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={SPRING_PANEL}
            role="dialog"
            aria-modal="true"
            aria-label="Mi rutina"
            className="fixed bottom-0 right-0 top-0 z-[90] flex w-full max-w-[460px] flex-col bg-ivory shadow-drawer"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <p className="flex items-center gap-2.5 text-label uppercase text-ink">
                <Star className="h-4 w-4 text-champagne-deep" strokeWidth={1.6} />
                Mi rutina
                {count > 0 && (
                  <span className="editorial-index text-stone-dark">({count})</span>
                )}
              </p>
              <button
                ref={closeRef}
                onClick={closeBag}
                aria-label="Cerrar"
                className="press flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              /* estado vacío */
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-champagne/40 bg-champagne-soft/40 text-champagne-deep">
                  <Star className="h-7 w-7" strokeWidth={1.1} />
                </span>
                <div>
                  <p className="font-display text-display-sm font-normal">
                    Tu rutina está vacía
                  </p>
                  <p className="mx-auto mt-2 max-w-[260px] text-note text-stone-dark">
                    Guarda lo que te guste con el corazón, o respóndeme tres
                    preguntas y te la armo yo.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/#concerns"
                    onClick={closeBag}
                    className="press group flex items-center justify-center gap-2 bg-ink px-8 py-3.5 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                  >
                    Armar mi rutina
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/#bestsellers"
                    onClick={closeBag}
                    className="link-underline pb-1 text-label uppercase text-ink/70 transition-colors hover:text-champagne-deep"
                  >
                    Ver bestsellers
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* items */}
                <ul className="flex-1 divide-y divide-hairline overflow-y-auto">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.li
                        key={it.product.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4 px-6 py-5"
                      >
                        <Link
                          href={`/producto/${it.product.id}`}
                          onClick={closeBag}
                          className="relative h-20 w-20 shrink-0 rounded-seal border border-hairline bg-vitrine-radial"
                          aria-label={`Ver ${it.product.name}`}
                        >
                          <Photo
                            src={it.product.image}
                            alt={it.product.name}
                            fill
                            loading="lazy"
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <p className="text-micro uppercase text-stone-dark">
                            {it.product.line || it.product.brand}
                          </p>
                          <Link
                            href={`/producto/${it.product.id}`}
                            onClick={closeBag}
                            className="mt-0.5 block text-[14px] font-medium leading-snug text-ink transition-colors hover:text-champagne-deep"
                          >
                            {it.product.name}
                          </Link>
                          <div className="mt-2.5 flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-seal border border-hairline">
                              <button
                                onClick={() => setQty(it.product.id, it.qty - 1)}
                                aria-label={`Menos unidades de ${it.product.name}`}
                                className="press flex h-9 w-9 items-center justify-center transition-colors hover:bg-porcelain"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="editorial-index w-8 text-center text-sm font-medium">
                                {it.qty}
                              </span>
                              <button
                                onClick={() => setQty(it.product.id, it.qty + 1)}
                                aria-label={`Más unidades de ${it.product.name}`}
                                className="press flex h-9 w-9 items-center justify-center transition-colors hover:bg-porcelain"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="font-display text-lg font-medium text-champagne-bronze">
                              {it.product.price != null
                                ? formatPrice(it.product.price * it.qty)
                                : "Ver precio"}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <a
                              href={productUrl(it.product.id)}
                              target="_blank"
                              rel="noopener sponsored"
                              className="-my-3 flex min-h-[44px] items-center gap-1 py-3 text-micro uppercase tracking-wide2 text-ink transition-colors hover:text-champagne-deep"
                            >
                              Comprar <ArrowUpRight className="h-3 w-3" />
                            </a>
                            <button
                              onClick={() => remove(it.product.id)}
                              className="-my-3 inline-flex min-h-[44px] items-center py-3 text-micro uppercase tracking-wide2 text-stone-dark transition-colors hover:text-ink"
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* sugerencia para completar la rutina */}
                {suggestion && (
                  <div className="border-t border-hairline bg-porcelain px-6 py-4">
                    <p className="mb-3 flex items-center gap-1.5 text-micro uppercase text-stone-dark">
                      <Sparkles className="h-3 w-3 text-champagne-deep" />
                      Completa tu rutina
                    </p>
                    <div className="flex items-center gap-3">
                      <Photo
                        src={suggestion.image}
                        alt={suggestion.name}
                        width={96}
                        height={96}
                        loading="lazy"
                        sizes="48px"
                        className="h-12 w-12 shrink-0 rounded-seal border border-hairline bg-ivory object-contain p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] leading-tight text-ink">
                          {suggestion.name}
                        </p>
                        <p className="text-[12px] text-champagne-bronze">
                          {formatPrice(suggestion.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => add(suggestion)}
                        aria-label={`Añadir ${suggestion.name} a mi rutina`}
                        className="press flex h-10 w-10 shrink-0 items-center justify-center rounded-seal border border-hairline bg-ivory transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* resumen */}
                <div className="space-y-4 border-t border-hairline px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-label uppercase text-stone-dark">
                      Total estimado
                    </p>
                    <p className="font-display text-3xl font-medium text-champagne-deep">
                      {formatPrice(subtotal)}
                    </p>
                  </div>
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener"
                      className="press group flex w-full items-center justify-center gap-2 bg-ink px-8 py-4 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                    >
                      Pedir asesoría con mi lista
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  <p className="flex items-start gap-2 text-[11px] leading-relaxed text-stone-dark">
                    <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne-deep" />
                    Cada compra se completa en la boutique oficial RIMAN con el
                    código de Eilin. Envío desde Estados Unidos y garantía
                    incluida.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

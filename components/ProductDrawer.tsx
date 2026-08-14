"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Truck, ShieldCheck, PackageOpen } from "lucide-react";
import { useProductDrawer } from "@/lib/product-drawer";
import { PRODUCTS } from "@/lib/products";
import { productUrl } from "@/lib/site";
import { eilinNote } from "@/lib/notes";
import { EASE, SPRING_PANEL } from "@/lib/motion";
import { cn, formatPrice } from "@/lib/utils";
import SaveButton from "./SaveButton";

export default function ProductDrawer() {
  const { product, open, close } = useProductDrawer();
  const [activeImg, setActiveImg] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  // Al cambiar de producto (abrir, o saltar desde "Complementa la rutina")
  // la galería vuelve a la primera imagen.
  useEffect(() => {
    setActiveImg(0);
  }, [product?.id]);

  // Foco: al abrir se mueve al botón de cerrar; al cerrar vuelve
  // al elemento que abrió la ficha.
  useEffect(() => {
    if (product && !wasOpen.current) {
      wasOpen.current = true;
      lastFocus.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else if (!product && wasOpen.current) {
      wasOpen.current = false;
      lastFocus.current?.focus();
    }
  }, [product]);

  const gallery = product?.gallery?.length ? product.gallery : product?.image ? [product.image] : [];
  const note = product ? eilinNote(product.id) : null;

  const complements = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) =>
        p.id !== product.id &&
        p.categories.some((c) => product.categories.includes(c)) &&
        !p.isPackage
    ).slice(0, 4);
  }, [product]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: EASE },
  });

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.button
            key="backdrop"
            aria-label="Cerrar ficha"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={SPRING_PANEL}
            className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-[720px] flex-col bg-ivory shadow-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle de ${product.name}`}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <p className="text-label uppercase text-stone-dark">
                Ficha del producto
              </p>
              <button
                ref={closeRef}
                onClick={close}
                className="press flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                {/* gallery */}
                <motion.div {...rise(0.1)} className="relative bg-vitrine-radial">
                  <div className="relative aspect-square">
                    {gallery.map((src, i) => (
                      <Image
                        key={src}
                        src={src}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className={cn(
                          "object-contain p-10 transition-opacity duration-500",
                          i === activeImg ? "opacity-100" : "opacity-0"
                        )}
                      />
                    ))}
                    {product.bestsellerRank !== null && (
                      <span className="absolute left-5 top-5 bg-ink px-3 py-1.5 text-micro uppercase text-ivory">
                        Bestseller Nº {product.bestsellerRank}
                      </span>
                    )}
                  </div>
                  {gallery.length > 1 && (
                    <div className="flex justify-center gap-3 border-t border-hairline p-4">
                      {gallery.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => setActiveImg(i)}
                          className={cn(
                            "press relative h-14 w-14 rounded-seal border transition-all",
                            i === activeImg ? "border-ink" : "border-hairline opacity-60 hover:opacity-100"
                          )}
                          aria-label={`Ver imagen ${i + 1}`}
                          aria-current={i === activeImg}
                        >
                          <Image src={src} alt="" fill sizes="56px" className="object-contain p-1" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* info */}
                <motion.div {...rise(0.18)} className="flex flex-col gap-5 p-8">
                  <div>
                    <p className="mb-2 text-label uppercase text-champagne-bronze">
                      {product.line || product.brand}
                    </p>
                    <h2 className="font-display text-display-sm font-normal leading-tight text-ink">
                      {product.name}
                    </h2>
                    <p className="mt-4 font-display text-3xl font-medium text-champagne-deep">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  {/* La nota de Eilin en español; la descripción
                      original del API queda como letra pequeña honesta. */}
                  {note ? (
                    <div className="border-l-2 border-champagne/50 pl-4">
                      <p className="mb-1.5 text-micro uppercase text-champagne-bronze">
                        La nota de Eilin
                      </p>
                      <p className="text-body text-ink/80">{note}</p>
                    </div>
                  ) : (
                    product.description && (
                      <p className="text-note text-stone-dark">
                        {product.description}
                      </p>
                    )
                  )}
                  {note && product.description && (
                    <details className="group/desc">
                      <summary className="cursor-pointer list-none text-micro uppercase tracking-wide2 text-stone transition-colors hover:text-champagne-deep">
                        Descripción original de la marca +
                      </summary>
                      <p className="mt-2 text-xs leading-relaxed text-stone">
                        {product.description}
                      </p>
                    </details>
                  )}

                  {product.kit.length > 0 && (
                    <div className="border-t border-hairline pt-5">
                      <p className="mb-3 flex items-center gap-2 text-label uppercase text-ink">
                        <PackageOpen className="h-3.5 w-3.5" /> Contenido de la rutina
                      </p>
                      <ul className="space-y-1.5">
                        {product.kit.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-stone-dark">
                            <span className="mt-2 h-px w-3 shrink-0 bg-champagne-deep" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA (escritorio; en móvil la barra fija de abajo). La
                      cantidad se elige en la boutique oficial al confirmar. */}
                  <div className="mt-auto space-y-4 border-t border-hairline pt-5">
                    <div className="hidden gap-3 lg:flex">
                      <a
                        href={productUrl(product.id)}
                        target="_blank"
                        rel="noopener sponsored"
                        className="press sheen group flex flex-1 items-center justify-center gap-2 bg-ink px-8 py-4 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                      >
                        Comprar en la boutique
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <SaveButton product={product} variant="bar" className="h-auto" />
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-micro uppercase tracking-wide2 text-stone-dark">
                      <li className="flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-champagne-deep" /> Envío desde EE. UU.
                      </li>
                      <li className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-champagne-deep" /> Garantía completa
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* cross-sells */}
              {complements.length > 0 && (
                <div className="border-t border-hairline bg-porcelain px-6 py-8 sm:px-8">
                  <p className="mb-5 text-label uppercase text-stone-dark">
                    Complementa tu rutina
                  </p>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {complements.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => open(c)}
                        className="press group flex flex-col rounded-vitrine border border-hairline bg-ivory p-3 text-left transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:border-champagne/40 hover:shadow-card"
                      >
                        <Image
                          src={c.image}
                          alt={c.name}
                          width={240}
                          height={240}
                          loading="lazy"
                          sizes="160px"
                          className="mb-3 aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <p className="line-clamp-2 text-[11px] leading-tight text-ink">{c.name}</p>
                        <p className="mt-1 text-[11px] text-champagne-bronze">
                          {formatPrice(c.price)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Barra de compra fija en móvil */}
            <div className="flex items-center justify-between gap-3 border-t border-hairline bg-ivory px-5 py-3.5 lg:hidden">
              <div className="min-w-0 flex-1">
                <p className="truncate text-micro uppercase tracking-wide2 text-stone-dark">
                  {product.line || product.brand}
                </p>
                <p className="font-display text-2xl font-medium leading-tight text-champagne-deep">
                  {formatPrice(product.price)}
                </p>
              </div>
              <SaveButton product={product} variant="bar" />
              <a
                href={productUrl(product.id)}
                target="_blank"
                rel="noopener sponsored"
                className="press group flex shrink-0 items-center gap-2 bg-ink px-6 py-3.5 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
              >
                Comprar
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

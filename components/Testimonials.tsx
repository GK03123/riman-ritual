"use client";

// ─── Capítulo 09 · Lo que me escriben ───────────────────────────────
// Era el activo más débil de la página: cuatro frases centradas, unas
// iniciales y ninguna salida. Y sin embargo es el último capítulo antes
// del pie, o sea el último sitio donde alguien decide comprar.
//
// Cada testimonio nombra un producto real del catálogo, así que ahora lo
// lleva al lado: miniatura, precio y enlace de afiliada. No se inventa
// nada —el producto es literalmente el que menciona la frase— y la
// prueba social pasa de ser decorativa a ser el cierre de venta.
//
// El carrusel se remonta por `key` en vez de usar AnimatePresence con
// mode="wait": en framer 12 esa salida puede atascarse y dejar la cita
// congelada a media transición.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { productUrl } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";

interface Quote {
  q: string;
  who: string;
  where: string;
  since: string;
  /** Id del producto que la frase nombra. null = lleva a la consulta. */
  productId: number | null;
}

const QUOTES: Quote[] = [
  {
    q: "Empecé con el Essential Ritual y no volví a un skincare hispano. La textura del tratamiento pesa distinto, en el buen sentido.",
    who: "M. R.",
    where: "Miami, FL",
    since: "Cliente desde 2024",
    productId: 53372, // Essential Ritual
  },
  {
    q: "El Radiansome cambió la manera en que se ve mi cara al despertar. No es exageración, es rutina.",
    who: "V. L.",
    where: "San Antonio, TX",
    since: "Cliente desde 2025",
    productId: 52745, // Radiansome™100 Cream
  },
  {
    q: "Compré el Signature Ritual como regalo para mi mamá. Nos quedamos las dos con el kit y ahora lo pedimos cada trimestre.",
    who: "A. P.",
    where: "Los Ángeles, CA",
    since: "Cliente desde 2024",
    productId: 53375, // Signature Ritual
  },
  {
    q: "Eilin me armó una rutina en dos mensajes. Nada de vender de más. Uso tres productos y funciona.",
    who: "C. G.",
    where: "Houston, TX",
    since: "Cliente desde 2026",
    productId: null,
  },
];

const productFor = (id: number | null) =>
  id === null ? null : PRODUCTS.find((p) => p.id === id) ?? null;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const next = useCallback(() => setI((v) => (v + 1) % QUOTES.length), []);
  const prev = useCallback(
    () => setI((v) => (v - 1 + QUOTES.length) % QUOTES.length),
    []
  );

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [next, reduce, paused]);

  const q = QUOTES[i];
  const product = productFor(q.productId);

  return (
    <section
      id="testimonios"
      className="relative scroll-mt-24 overflow-hidden border-y border-hairline bg-ivory py-section lg:py-section-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,#EFE6D3_0%,transparent_62%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* El rótulo del capítulo es el h2 de la sección. Antes era un
            span dentro de un p: la sección quedaba fuera del esquema de
            encabezados y un lector de pantalla la recorría sin saber
            dónde había entrado. El aspecto no cambia. */}
        <h2 className="mb-10 flex items-baseline gap-5">
          <span
            aria-hidden
            className="editorial-index gold-text font-display text-display-sm font-medium leading-none"
          >
            09
          </span>
          <span className="text-label uppercase text-champagne-bronze">
            Lo que me escriben
          </span>
        </h2>

        {/* Dos tiempos: la cita manda a la izquierda, y a la derecha va la
            pieza de la que habla. Antes todo iba centrado y no llevaba a
            ninguna parte. */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* El alto mínimo evita que la página salte al cambiar de cita:
              las cuatro no miden lo mismo. */}
          <div className="min-h-[260px] sm:min-h-[240px]">
            <span
              aria-hidden
              className="pointer-events-none block select-none font-display text-8xl italic leading-[0.35] text-champagne/40"
            >
              “
            </span>

            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="pt-6"
            >
              <p className="text-balance font-display text-display-sm font-normal italic leading-snug text-ink">
                {q.q}
              </p>
              <footer className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[15px] font-medium uppercase tracking-wide2 not-italic text-ink">
                  {q.who}
                </span>
                <span className="text-label uppercase text-stone-dark">
                  {q.where} · {q.since}
                </span>
              </footer>
            </motion.blockquote>
          </div>

          {/* La pieza que nombra la cita */}
          <motion.aside
            key={`aside-${i}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="rounded-vitrine border border-hairline bg-porcelain/70 p-6 shadow-card backdrop-blur-sm sm:p-7"
          >
            {product ? (
              <>
                <p className="mb-5 flex items-center gap-3 text-micro uppercase text-champagne-bronze">
                  <span className="h-px w-8 bg-champagne-deep" aria-hidden />
                  De lo que habla
                </p>
                <Link
                  href={`/producto/${product.id}`}
                  className="group block"
                  aria-label={`Ver ${product.name}`}
                >
                  <span className="block overflow-hidden rounded-seal bg-vitrine-radial">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      width={480}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto aspect-square w-full max-w-[220px] object-contain p-4 transition-transform duration-700 ease-editorial group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-4 block text-micro uppercase text-stone-dark">
                    {product.line || product.brand}
                  </span>
                  <span className="mt-1 block text-[15px] font-medium leading-snug text-ink transition-colors group-hover:text-champagne-deep">
                    {product.name}
                  </span>
                </Link>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                  <span className="font-display text-2xl font-medium text-champagne-bronze">
                    {formatPrice(product.price)}
                  </span>
                  <a
                    href={productUrl(product.id)}
                    target="_blank"
                    rel="noopener sponsored"
                    aria-label={`Comprar ${product.name}`}
                    className="press group flex min-h-[44px] items-center gap-2 border border-ink px-5 py-3 text-micro uppercase tracking-wide2 text-ink transition-colors duration-300 hover:border-champagne-deep hover:bg-champagne-deep hover:text-ivory"
                  >
                    Comprar
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </>
            ) : (
              /* La única cita que no nombra un producto habla justamente
                 de la consulta: su salida natural es el cuestionario. */
              <>
                <p className="mb-5 flex items-center gap-3 text-micro uppercase text-champagne-bronze">
                  <span className="h-px w-8 bg-champagne-deep" aria-hidden />
                  Cómo lo hacemos
                </p>
                <p className="font-display text-title font-normal italic leading-snug text-ink">
                  Tres preguntas y te armo la rutina con piezas del catálogo, con
                  el porqué de cada paso.
                </p>
                <p className="mt-3 text-note text-stone-dark">
                  Sin registros ni correos. Tarda menos de un minuto.
                </p>
                <a
                  href="#concerns"
                  className="press group mt-6 flex min-h-[44px] w-fit items-center gap-2 bg-ink px-6 py-3.5 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                >
                  Hacer mi consulta
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </>
            )}
          </motion.aside>
        </div>

        {/* Navegación */}
        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Testimonio anterior"
            className="press flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Ver testimonio ${idx + 1}`}
                aria-current={idx === i}
                /* El trazo mide 1px; el padding le da área táctil real */
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={`h-px transition-all duration-500 ease-editorial ${
                    idx === i ? "w-8 bg-champagne-deep" : "w-4 bg-hairline"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Testimonio siguiente"
            className="press flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

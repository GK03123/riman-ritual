"use client";

// ─── La pieza central ───────────────────────────────────────────────
// Un solo producto tratado como pieza de campaña: la esencia, el paso
// que la mayoría se salta. Educa sobre el orden de la rutina coreana
// y vende el producto que mejor lo representa. Fotografía editorial
// de Eilin + producto flotante sobre la imagen.

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { productUrl } from "@/lib/site";
import { useProductDrawer } from "@/lib/product-drawer";
import { useRitualBag } from "@/lib/ritual-bag";
import { formatPrice } from "@/lib/utils";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

// ICD Radiansome™100 Microfluidizer Essence: el paso intermedio.
const essence = PRODUCTS.find((p) => p.id === 52747);

const POINTS = [
  {
    t: "Va después de limpiar y antes del sérum",
    d: "Es el paso que prepara la piel para que todo lo que viene detrás se absorba mejor.",
  },
  {
    t: "Fórmula nanoliposomal de verdad",
    d: "El activo viaja en esferas de unos 100 nanómetros y cruza la barrera en vez de quedarse encima.",
  },
  {
    t: "Textura que no compite con nada",
    d: "Se absorbe en segundos y no pesa. La crema de después sella el trabajo.",
  },
];

export default function Spotlight() {
  const reduce = useReducedMotion();
  const { open } = useProductDrawer();
  const { add } = useRitualBag();

  if (!essence) return null;

  return (
    <section
      id="pieza"
      className="scroll-mt-24 overflow-hidden border-y border-hairline bg-ivory py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Fotografía editorial con el producto flotante */}
        <div className="relative">
          <motion.figure
            initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10%)", scale: 1.05 }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder/eilin-editorial.jpg"
              alt="Eilin Guependo en el estudio"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full border border-hairline object-cover object-[50%_30%] shadow-card"
            />
            <figcaption className="mt-3 text-[9px] uppercase tracking-micro text-stone">
              La rutina se construye por capas
            </figcaption>
          </motion.figure>

          <motion.button
            onClick={() => open(essence)}
            aria-label={`Ver ficha de ${essence.name}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="absolute -bottom-8 right-4 w-32 border border-hairline bg-ivory p-3 shadow-cardHover transition-transform duration-500 hover:-translate-y-1.5 sm:right-8 sm:w-40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={essence.image}
              alt={essence.name}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-contain"
            />
            <span className="mt-1 block text-[9px] uppercase tracking-wide2 text-stone">
              Ver ficha
            </span>
          </motion.button>
        </div>

        {/* Argumento */}
        <div className="pt-6 lg:pt-0">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-micro text-champagne-deep">
              <span className="h-px w-10 bg-champagne-deep" aria-hidden />
              La pieza central
            </p>
            <h2 className="text-balance font-display text-4xl font-light leading-tight sm:text-5xl">
              El paso que casi todas{" "}
              <em className="italic text-champagne-deep">se saltan</em>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-stone">
              Limpiar y tratar lo hace todo el mundo. La esencia es el paso
              intermedio que separa una rutina que funciona de una que casi.
            </p>
          </Reveal>

          <ul className="mt-9 space-y-6">
            {POINTS.map((point, i) => (
              <motion.li
                key={point.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                className="flex gap-4 border-t border-hairline pt-5"
              >
                <span className="editorial-index shrink-0 font-display text-lg italic text-champagne-deep/60">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-light leading-snug">
                    {point.t}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-stone">
                    {point.d}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          <Reveal delay={0.15} className="mt-10">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                onClick={() => add(essence)}
                className="group flex items-center gap-2 bg-ink px-7 py-4 text-[11px] uppercase tracking-micro text-ivory transition-colors duration-300 hover:bg-champagne-deep"
              >
                <Star className="h-4 w-4" strokeWidth={1.6} />
                Guardar en mi rutina
              </button>
              <div className="flex items-center gap-4">
                <span className="font-display text-xl text-champagne-deep">
                  {formatPrice(essence.price)}
                </span>
                <a
                  href={productUrl(essence.id)}
                  target="_blank"
                  rel="noopener sponsored"
                  className="group flex items-center gap-1 border-b border-ink/30 pb-0.5 text-[10px] uppercase tracking-wide2 transition-colors hover:border-champagne-deep hover:text-champagne-deep"
                >
                  Comprar
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

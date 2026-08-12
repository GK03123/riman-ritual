"use client";

// ─── El cierre ──────────────────────────────────────────────────────
// Antes la foto de producto flotaba al 30 % detrás del texto: los
// frascos se leían como fantasmas y el bloque parecía un accidente.
// Ahora la fotografía es una banda de imagen honesta a la izquierda y
// el cierre vive sobre jade limpio, con la firma de Eilin.

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MEDIA } from "@/lib/media";
import { useCatalog } from "@/lib/catalog-overlay";
import Reveal from "./Reveal";
import Magnetic from "./motion/Magnetic";
import Signature from "./Signature";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { show: openCatalog } = useCatalog();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", reduce ? "-7%" : "7%"]);

  return (
    <section
      ref={ref}
      className="on-jade relative overflow-hidden bg-jade-depth text-ivory grain-dark"
    >
      <span aria-hidden className="rule-gold absolute inset-x-0 top-0 opacity-70" />

      <div className="relative mx-auto grid max-w-7xl items-stretch lg:grid-cols-[1.05fr_1fr]">
        {/* Banda de imagen. El flatlay es un lineup horizontal cuadrado:
            forzarlo a llenar una columna vertical con object-cover recorta
            los frascos de los extremos. Con object-contain anclado abajo,
            la fila entera se ve y los productos "reposan" sobre el jade;
            los gradientes funden el fondo claro de la foto con la sección. */}
        <div className="relative min-h-[300px] overflow-hidden lg:min-h-[520px]">
          <motion.div style={{ y }} className="absolute inset-x-0 bottom-0 top-[-6%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MEDIA.ritualSignature}
              alt="Los productos del Signature RIMAN Ritual dispuestos en escena"
              loading="lazy"
              className="h-full w-full object-contain object-bottom"
            />
          </motion.div>
          {/* La fotografía es de fondo claro y la sección es jade: sin un
              velo, la banda se lee como un recorte pegado. Este tinte la
              lleva al mismo mundo, y los degradados la funden en los bordes. */}
          <div aria-hidden className="absolute inset-0 bg-jade/35 mix-blend-multiply" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-jade via-jade/25 to-jade/45"
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-jade/30 lg:via-transparent lg:to-jade"
          />
        </div>

        {/* Cierre */}
        <Reveal className="relative z-10 flex flex-col items-start justify-center px-4 py-section lg:py-section-lg lg:pl-10 lg:pr-16">
          <p className="mb-6 flex items-center gap-4">
            <span
              aria-hidden
              className="editorial-index gold-text font-display text-title font-medium leading-none"
            >
              10
            </span>
            <span className="h-px w-12 bg-champagne/50" aria-hidden />
            <span className="text-label uppercase text-champagne-light">
              El catálogo entero
            </span>
          </p>

          <h2 className="text-balance font-display text-display-lg font-normal">
            Empieza tu <em className="italic text-champagne-light">rutina</em> esta
            semana
          </h2>
          <p className="mt-7 max-w-measure text-body text-ivory/70">
            Skincare, cuidado personal y bienestar coreano, en un solo lugar y con
            mi recomendación detrás de cada ficha.
          </p>

          <Magnetic strength={0.4}>
            <button
              onClick={openCatalog}
              className="press sheen group mt-10 flex items-center gap-3 bg-champagne px-10 py-4 text-label uppercase text-jade transition-colors duration-300 hover:bg-ivory"
            >
              Ver el catálogo
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-full bg-jade/10 transition-colors duration-300 group-hover:bg-jade/15"
              >
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </Magnetic>

          <div className="mt-12 flex items-center gap-5">
            <Signature width={150} tone="champagne" />
            <p className="text-micro uppercase text-ivory/65">
              Eilin Guependo
              <br />
              Quien te recomienda por dónde empezar
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

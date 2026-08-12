"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MEDIA } from "@/lib/media";
import { EASE } from "@/lib/motion";

export default function JejuFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, reduce ? 1.15 : 1.35]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", reduce ? "-6%" : "8%"]);
  const overlayText = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.4]);

  return (
    <section
      ref={ref}
      id="film"
      className="relative flex min-h-[88dvh] items-center justify-center overflow-hidden bg-jade text-ivory"
    >
      {/* Motion real de la marca: GIF Born from Jeju */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MEDIA.jejuFilm}
          alt="Born from Jeju Island, imágenes de la isla volcánica"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Gradientes de legibilidad.
          El centro subió de jade/30 a jade/55: el GIF de Jeju tiene
          fotogramas de cielo claro, y el rótulo de capítulo va en
          champagne-light a 11 px. Contra el fotograma más claro posible,
          jade/30 dejaba ese rótulo por debajo del 4,5:1 que pide AA. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-jade/70 via-jade/55 to-jade/85"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(18,33,28,0.55)_100%)]"
      />

      {/* Contenido */}
      <motion.div
        style={{ opacity: overlayText }}
        className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <span
            aria-hidden
            className="editorial-index gold-text font-display text-title font-medium leading-none"
          >
            06
          </span>
          <span className="h-px w-10 bg-champagne/50" aria-hidden />
          <span className="text-label uppercase text-champagne-light">
            El origen
          </span>
        </motion.p>
        <h2 className="overflow-hidden font-display text-display-xl font-normal italic">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            className="block"
          >
            Nacido en Jeju
          </motion.span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-body text-ivory/80"
        >
          Una isla volcánica en el sur de Corea, con agua mineral y fermentos
          que no existen en ningún otro lugar. De ahí sale la materia prima de
          cada fórmula del catálogo.
        </motion.p>
      </motion.div>
    </section>
  );
}

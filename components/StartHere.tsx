"use client";

// ─── Empieza aquí ───────────────────────────────────────────────────
// Tres puertas de entrada según el tipo de visitante. Reduce la fatiga
// de decisión: en un viewport cada quien encuentra su camino de compra.

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const DOORS = [
  {
    n: "A",
    title: "No sé por dónde empezar",
    sub: "Tres preguntas y te digo qué rutina va con tu piel. Toma menos de un minuto.",
    href: "#concerns",
    cta: "Hacer la consulta",
  },
  {
    n: "B",
    title: "Quiero ir a lo seguro",
    sub: "Los ocho productos que más se repiten en los pedidos, ordenados por rotación.",
    href: "#bestsellers",
    cta: "Ver bestsellers",
  },
  {
    n: "C",
    title: "Dime qué usas tú",
    sub: "Mi selección corta, con las razones por escrito y en mi voz.",
    href: "#curador",
    cta: "Ver mi selección",
  },
];

export default function StartHere() {
  const reduce = useReducedMotion();
  return (
    <section
      id="empieza"
      className="scroll-mt-24 border-b border-hairline bg-porcelain"
    >
      <div className="mx-auto grid max-w-7xl gap-px px-4 py-14 sm:px-6 lg:grid-cols-3 lg:gap-6 lg:py-20">
        {DOORS.map((door, i) => (
          <motion.a
            key={door.n}
            href={door.href}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease }}
            className="group flex flex-col justify-between gap-8 border border-hairline bg-ivory p-6 transition-all duration-500 hover:-translate-y-1 hover:border-champagne-deep hover:shadow-card lg:p-8"
          >
            <div>
              <p className="editorial-index font-display text-3xl italic text-champagne-deep/50 transition-colors duration-500 group-hover:text-champagne-deep">
                {door.n}
              </p>
              <h2 className="mt-4 font-display text-2xl font-light leading-snug">
                “{door.title}”
              </h2>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-stone">
                {door.sub}
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-micro text-ink transition-colors duration-300 group-hover:text-champagne-deep">
              {door.cta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

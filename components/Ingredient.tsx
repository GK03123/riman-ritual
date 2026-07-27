"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const STATS = [
  {
    figure: "100%",
    title: "Fórmula nanoliposomal",
    text: "Los activos viajan encapsulados en esferas de menos de 100 nanómetros. Suficientemente pequeñas para cruzar la capa córnea sin romperse en el camino.",
  },
  {
    figure: "7×",
    title: "Pasadas por Microfluidizer™",
    text: "El sistema pasa la fórmula por presión hasta siete veces. Cada iteración deja las partículas más finas, más flexibles y con textura más ligera al aplicar.",
  },
  {
    figure: "Jeju",
    title: "Isla volcánica, agua patentada",
    text: "El agua Jeju Lava Energy Water y el fermento Giant BYoungPool™ se cultivan en la isla del sur de Corea. Son la base mineral y biológica de casi todo el catálogo.",
  },
];

export default function Ingredient() {
  const reduce = useReducedMotion();
  return (
    <section
      id="ciencia"
      className="on-jade relative scroll-mt-24 overflow-hidden bg-jade py-section text-ivory lg:py-section-lg grain-dark"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          align="left"
          chapter="08"
          variant="spread"
          eyebrow="La ciencia"
          title={
            <>
              Nanoliposomas{" "}
              <em className="italic text-champagne-light">de verdad</em>
            </>
          }
          subtitle="El Microfluidizer™ reduce los activos a partículas nanométricas para que atraviesen la barrera de la piel y trabajen donde deben. No es marketing: es una máquina."
        />

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* SVG diagram: liposome comparison */}
          <Reveal>
            <div className="relative mx-auto max-w-md rounded-vitrine border border-ivory/10 bg-jade-soft/50 p-6 shadow-jade-card sm:p-8">
              <svg
                viewBox="0 0 500 380"
                className="w-full"
                aria-labelledby="liposome-diagram"
              >
                <title id="liposome-diagram">
                  Comparación entre un activo convencional y uno nanoliposomal
                </title>
                <defs>
                  <radialGradient id="lipGrad" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#E7C89A" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#B69B62" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#96793E" stopOpacity="0.2" />
                  </radialGradient>
                  <radialGradient id="convGrad" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#8A867E" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#8A867E" stopOpacity="0.1" />
                  </radialGradient>
                  <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FDFBF7" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#FDFBF7" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* skin layers hairlines */}
                <g stroke="#FDFBF7" strokeOpacity="0.2">
                  <line x1="0" y1="180" x2="500" y2="180" strokeDasharray="4 6" />
                  <line x1="0" y1="230" x2="500" y2="230" strokeDasharray="4 6" />
                  <line x1="0" y1="290" x2="500" y2="290" strokeDasharray="4 6" />
                </g>
                <rect x="0" y="180" width="500" height="200" fill="url(#skinGrad)" />

                {/* labels */}
                <text x="0" y="172" fontFamily="var(--font-sans)" fontSize="10" fill="#B5B1A8" letterSpacing="2">CAPA CÓRNEA</text>
                <text x="0" y="222" fontFamily="var(--font-sans)" fontSize="10" fill="#B5B1A8" letterSpacing="2">EPIDERMIS</text>
                <text x="0" y="282" fontFamily="var(--font-sans)" fontSize="10" fill="#B5B1A8" letterSpacing="2">DERMIS</text>

                {/* Convencional (left) */}
                <text x="90" y="30" fontFamily="var(--font-display)" fontSize="16" fill="#FDFBF7" fontStyle="italic" textAnchor="middle">Convencional</text>
                <circle cx="90" cy="120" r="34" fill="url(#convGrad)" />
                <circle cx="90" cy="120" r="34" fill="none" stroke="#B5B1A8" strokeOpacity="0.7" strokeDasharray="3 3" />
                <text x="90" y="124" fontFamily="var(--font-sans)" fontSize="9" fill="#FDFBF7" textAnchor="middle" letterSpacing="1">~500 nm</text>
                {/* stays on surface arrow */}
                <path d="M 90 160 L 90 178" stroke="#B5B1A8" strokeWidth="1" markerEnd="url(#arrH)" />
                <text x="90" y="360" fontFamily="var(--font-sans)" fontSize="9" fill="#B5B1A8" textAnchor="middle" letterSpacing="1.5">SE QUEDA ARRIBA</text>

                {/* Nanoliposomal (right) */}
                <text x="380" y="30" fontFamily="var(--font-display)" fontSize="16" fill="#E7C89A" fontStyle="italic" textAnchor="middle">Nanoliposomal</text>
                {/* cluster of small circles */}
                <g>
                  {(() => {
                    const positions = [
                      [380, 90], [355, 110], [405, 108], [368, 130], [395, 135],
                    ];
                    return positions.map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="10" fill="url(#lipGrad)" />
                    ));
                  })()}
                </g>
                <text x="380" y="70" fontFamily="var(--font-sans)" fontSize="9" fill="#E7C89A" textAnchor="middle" letterSpacing="1">~100 nm</text>

                {/* animated drops going down */}
                {/* Las gotas se renderizan siempre: envolverlas en una
                    condición de JavaScript hacía que el SVG del servidor y
                    el del cliente no coincidieran. Con movimiento reducido
                    el bucle no se repite y framer ya ignora el desplazamiento. */}
                <g>
                    {[0, 1, 2, 3].map((i) => (
                      <motion.circle
                        key={i}
                        cx={370 + i * 8}
                        cy={155}
                        r={4}
                        fill="#E7C89A"
                        initial={{ y: 0, opacity: 0 }}
                        whileInView={{ y: 190, opacity: [0, 1, 0.6, 0] }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{
                          duration: 2.4,
                          delay: i * 0.45,
                          repeat: reduce ? 0 : Infinity,
                          repeatDelay: 1,
                          ease: "easeIn",
                        }}
                      />
                    ))}
                </g>

                <path d="M 380 160 L 380 300" stroke="#E7C89A" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" />
                <text x="380" y="360" fontFamily="var(--font-sans)" fontSize="9" fill="#E7C89A" textAnchor="middle" letterSpacing="1.5">LLEGA A LA DERMIS</text>

                <defs>
                  <marker id="arrH" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#B5B1A8" />
                  </marker>
                </defs>
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Grid en vez de ancho fijo: la columna del numeral se mide
                sola con la cifra más ancha ("100 %") y todas las filas
                quedan alineadas sin recortar nada. */}
            <ul className="grid grid-cols-[auto_1fr] gap-x-7">
              {STATS.map((s, i) => (
                <li
                  key={s.figure}
                  className={cn(
                    "col-span-2 grid grid-cols-subgrid items-baseline py-7",
                    i === 0 ? "pt-0" : "border-t border-ivory/10",
                    i === STATS.length - 1 && "pb-0"
                  )}
                >
                  <p className="editorial-index gold-text whitespace-nowrap font-display text-[2.75rem] font-medium leading-none">
                    {s.figure}
                  </p>
                  <div>
                    <p className="font-display text-title font-medium text-ivory">
                      {s.title}
                    </p>
                    <p className="mt-2.5 text-note leading-relaxed text-ivory/75">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

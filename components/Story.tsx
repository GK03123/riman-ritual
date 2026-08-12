"use client";

// ─── Capítulo 05 · Riman ────────────────────────────────────────────
// Es la bisagra del número: los cuatro capítulos anteriores hablan en
// primera persona y este presenta la marca que Eilin vende. Por eso el
// rótulo dice el nombre de la marca y no un apodo: quien llega hasta
// aquí ya sabe quién es ella y lo que falta por saber es qué compra.
//
// La página entera vivía dentro de la misma caja: `max-w-7xl`, el mismo
// padding lateral, sección tras sección. Ocho capítulos con el mismo
// ancho de columna se leen como un formulario largo, no como un número
// de revista. Esta es la doble página a sangre que rompe ese compás: las
// imágenes tocan el borde del papel y la retícula deja de ser simétrica.
//
// Las tres fotografías son material real de la marca (lib/media.ts) que
// hasta ahora no se usaba en ningún sitio. Se montan en tres planchas de
// pesos distintos —una alta, una descolgada y una banda ancha— para que
// el ojo tenga que recorrer la página en vez de barrerla.

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { STORY_FRAMES } from "@/lib/media";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/** Una plancha: fotografía a sangre con su rótulo dentro del velo.
 *
 *  El texto nunca se apoya en la imagen desnuda —el contraste de una
 *  foto no se puede calcular—, sino sobre el velo de jade, que garantiza
 *  el ratio pase lo que pase en el encuadre. */
function Plate({
  src,
  kicker,
  title,
  text,
  index,
  className,
  imageClassName,
  priorityAlign = "center",
}: {
  src: string;
  kicker: string;
  title: string;
  text: string;
  index: number;
  className?: string;
  imageClassName?: string;
  priorityAlign?: "center" | "top";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* Parallax de imprenta: la imagen se mueve menos que la página, así
     que la plancha parece estar por detrás del papel.
     El primer valor del rango es constante a propósito. Si la preferencia
     de movimiento decidiera también el punto de partida, el servidor
     escribiría transform:-6% y el cliente 0%, el atributo style no
     coincidiría y React tiraría la hidratación entera. Solo cambia el
     destino: con movimiento reducido la imagen se queda donde empieza. */
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", reduce ? "-6%" : "6%"]);

  return (
    <Reveal className={className} delay={Math.min(index * 0.08, 0.2)}>
      {/* Sin `h-full`. Con él, la plancha corta heredaba la altura de la
          fila del grid (la marca la plancha alta), y entonces era la
          relación de aspecto la que despejaba la anchura: 604 px dentro
          de una celda de 499. Dejando que mande el ancho, el aspect-ratio
          resuelve la altura y la plancha vuelve a su caja. */}
      <figure
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden bg-jade shadow-plate",
          imageClassName
        )}
      >
        {/* La imagen sobresale un 16 % y se centra con -8 % arriba. Ese
            sangrado es lo que consume el parallax: el recorrido es ±6 %
            de la altura de la imagen (1,16 H), o sea ±7 % de la caja, y
            necesita 8 % de margen por lado para no descubrir el fondo en
            los extremos. El texto de la plancha ya describe la escena,
            así que la fotografía entra como decorativa (alt vacío). */}
        <motion.img
          style={{ y }}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          width={800}
          height={800}
          className={cn(
            "absolute -top-[8%] left-0 h-[116%] w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]",
            priorityAlign === "top" ? "object-top" : "object-center"
          )}
        />

        {/* Viñeta de tinta: sin ella la foto termina en un corte plano */}
        <span aria-hidden className="absolute inset-0 bg-paper-edge" />
        {/* Velo: el suelo de contraste sobre el que se apoya el rótulo */}
        <span aria-hidden className="absolute inset-0 bg-plate-veil" />

        {/* Numeral en el canto, como la foliación de una plancha */}
        <span
          aria-hidden
          className="marginalia absolute right-4 top-5 select-none text-micro uppercase tracking-wide2 text-ivory/55"
        >
          Fig. 0{index + 1}
        </span>

        <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <p className="mb-2 text-label uppercase text-champagne-light">
            {kicker}
          </p>
          <p className="font-display text-display-sm font-normal leading-tight text-ivory">
            {title}
          </p>
          <p className="mt-3 max-w-column text-note leading-relaxed text-ivory/80">
            {text}
          </p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function Story() {
  const [tradition, formula, innovation] = STORY_FRAMES;

  return (
    <section
      id="riman"
      className="relative scroll-mt-24 overflow-hidden bg-porcelain-deep py-section grain lg:py-section-lg"
    >
      {/* La cabecera se descuelga a la izquierda y deja la derecha vacía:
          el aire asimétrico es lo que anuncia que esto es una doble
          página y no otra sección centrada. */}
      <div className="relative mx-auto mb-12 max-w-plate px-4 sm:px-6 lg:mb-16">
        <Reveal className="max-w-2xl">
          <p className="mb-6 flex items-baseline gap-5">
            <span
              aria-hidden
              className="editorial-index gold-text font-display text-display-sm font-medium leading-none"
            >
              05
            </span>
            <span className="text-label uppercase text-champagne-bronze">
              Riman
            </span>
          </p>
          <h2 className="text-balance font-display text-display-md font-normal text-ink">
            Vendo RIMAN porque puedo{" "}
            <em className="italic text-champagne-deep">
              explicar de dónde sale
            </em>
          </h2>
          <p className="mt-6 max-w-measure text-body text-pretty text-stone-dark">
            Una isla volcánica al sur de Corea y un laboratorio que formula lo
            que produce. De ahí salen las tres líneas que tengo: Incellderm,
            BOTALAB y Lifening.
          </p>
        </Reveal>
      </div>

      {/* Las planchas: a sangre en móvil, retícula asimétrica en pantalla
          ancha. La primera es alta, la segunda se descuelga, la tercera
          cruza el ancho entero como una banda. */}
      <div className="relative mx-auto max-w-plate px-4 sm:px-6">
        <div className="grid items-start gap-4 sm:gap-6 lg:grid-cols-12">
          <Plate
            {...tradition}
            index={0}
            className="lg:col-span-7"
            imageClassName="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <Plate
            {...formula}
            index={1}
            className="lg:col-span-5 lg:mt-20"
            imageClassName="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[3/4]"
          />
          <Plate
            {...innovation}
            index={2}
            className="lg:col-span-12 lg:-mt-8"
            imageClassName="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
            priorityAlign="top"
          />
        </div>
      </div>
    </section>
  );
}

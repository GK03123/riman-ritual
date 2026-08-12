"use client";

// ─── Portada del número ─────────────────────────────────────────────
// Una portada de revista tiene una sola voz dominante: el masthead. Lo
// demás son líneas de portada, pequeñas y tracked, apoyadas en los
// bordes.
//
// La versión anterior repartía la portada en tres columnas —copy,
// retrato y una vitrina con el producto nº 1— y las tres pedían el mismo
// turno. Además la vitrina repetía, a ochocientos píxeles de distancia,
// exactamente la misma pieza que abre el capítulo 02, y su altura
// empujaba el botón principal por debajo del pliegue en un portátil de
// 1280×720.
//
// Ahora la portada tiene dos tiempos: las líneas de portada a la
// izquierda y el retrato a la derecha. El producto nº 1 no es una
// tercera columna, es la banderola de portada: la cartela de papel que
// se apoya en el borde inferior de la fotografía, que es donde una
// revista pone su reclamo de venta. El pie del retrato baja al canto en
// vertical para dejarle sitio.

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import { instagramHandle, productUrl } from "@/lib/site";
import { BESTSELLERS } from "@/lib/products";
import { useProductDrawer } from "@/lib/product-drawer";
import { formatPrice } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import Magnetic from "./motion/Magnetic";
import InstagramLink from "./InstagramLink";
import SaveButton from "./SaveButton";

const heroProduct = BESTSELLERS[0];

/* El nombre del producto sin el prefijo de línea, que ya va en el rótulo. */
const heroProductName = heroProduct.name.replace(/^ICD\s+/, "");

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { open } = useProductDrawer();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "7%"]);
  const mastheadY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: EASE },
  });

  /* La banderola de portada: el reclamo de venta de la nº 1. Se compone
     una sola vez y se coloca dos veces —colgando del retrato en pantalla
     ancha, apilada bajo él en móvil— para no duplicar el marcado. */
  const coverFlag = (
    <div className="rounded-vitrine border border-champagne/30 bg-ivory/95 p-4 shadow-flag backdrop-blur-sm sm:p-5">
      <p className="mb-3 flex items-baseline justify-between gap-3 text-micro uppercase text-stone-dark">
        Lo que más me piden
        {/* Decorativo, como todos los numerales de la casa: .gold-text
            recorta el color sobre una rampa metálica y la banda clara del
            oro queda en 1,2:1 sobre marfil. La información ya la da el
            rótulo de al lado, así que el numeral no se anuncia. */}
        <span
          aria-hidden
          className="editorial-index gold-text font-display text-lg font-medium not-italic"
        >
          01
        </span>
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => open(heroProduct)}
          aria-label={`Ver ficha de ${heroProduct.name}`}
          className="press group/flag h-16 w-16 shrink-0 overflow-hidden rounded-seal bg-vitrine-radial sm:h-[72px] sm:w-[72px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            width={144}
            height={144}
            loading="eager"
            className="h-full w-full object-contain p-1 transition-transform duration-500 ease-editorial group-hover/flag:scale-105"
          />
        </button>

        <div className="min-w-0 flex-1">
          <Link
            href={`/producto/${heroProduct.id}`}
            className="block text-[13px] font-medium leading-snug text-ink transition-colors hover:text-champagne-deep"
          >
            {heroProductName}
          </Link>
          <p className="mt-1 font-display text-xl font-medium text-champagne-bronze">
            {formatPrice(heroProduct.price)}
          </p>
        </div>

        <SaveButton product={heroProduct} className="shrink-0" />
      </div>

      <a
        href={productUrl(heroProduct.id)}
        target="_blank"
        rel="noopener sponsored"
        className="press group mt-3 flex min-h-[44px] items-center justify-between gap-2 border-t border-hairline pt-3 text-micro uppercase tracking-wide2 text-ink transition-colors hover:text-champagne-deep"
      >
        Comprar en RIMAN
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-porcelain pb-16 grain lg:pb-24"
    >
      {/* Cáustica de champagne: la luz de un frasco de vidrio moviéndose
          sobre el papel. Dos capas de gradiente, cero JavaScript. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="caustic-layer animate-caustic bg-caustic opacity-70" />
        <div className="caustic-layer animate-caustic-slow bg-caustic opacity-40" />
      </div>

      <motion.div style={{ opacity: fadeOut }} className="relative">
        {/* Folio: la línea de datos de una portada impresa. En el centro,
            donde una revista imprime el crédito de quien firma el número,
            va el arroba de Eilin. Es el primer sitio de la página donde
            queda claro que detrás de esto hay una persona con cuenta
            abierta, y de paso es un enlace real desde el primer pintado.
            En móvil cae el rótulo de categoría: tres líneas de 10 px con
            tracking de 0,22em no caben en 375 px. */}
        <motion.div
          {...fade(0.1)}
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-4 text-micro uppercase text-champagne-bronze sm:px-6"
        >
          <span className="editorial-index">Nº 01 · La portada</span>
          <InstagramLink className="link-underline -my-3 inline-flex min-h-[44px] items-center gap-1.5 py-3 transition-colors hover:text-champagne-deep">
            <Instagram aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
            <span>{instagramHandle}</span>
          </InstagramLink>
          <span className="editorial-index hidden sm:block">
            Skincare coreano
          </span>
        </motion.div>

        {/* Masthead: el nombre como cabecera. El wrapper lleva el
            overflow-hidden de la máscara; la p lleva pb para que los
            descendentes de "Guependo" no se recorten. */}
        <motion.div
          style={{ y: mastheadY }}
          aria-hidden
          className="relative z-0 select-none px-2 pt-5 text-center lg:pt-6"
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.06, ease: EASE }}
              className="whitespace-nowrap pb-[0.14em] font-display text-masthead font-normal text-ink"
            >
              Eilin <em className="italic text-champagne-deep">Guependo</em>
            </motion.p>
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* `items-start`, no `items-center`. Centrar la columna de texto
              contra un retrato de 500 px la empujaba 113 px hacia abajo y
              dejaba el botón principal en 731 px: fuera de pantalla en un
              portátil de 1280×720, que es exactamente donde se decide la
              conversión. Alineadas arriba, las líneas de portada caen
              desde el masthead como en una portada impresa y el CTA entra
              con holgura. */}
          <div className="grid items-start gap-x-12 gap-y-12 lg:mt-2 lg:grid-cols-[1fr_minmax(300px,400px)]">
            {/* Líneas de portada */}
            <div className="order-2 lg:order-1">
              <motion.p
                {...fade(0.34)}
                className="mb-5 flex items-center gap-3 text-label uppercase text-champagne-bronze"
              >
                <span className="h-px w-10 bg-champagne-deep" aria-hidden />
                En primera persona
              </motion.p>
              {/* El titular estaba escrito desde la autoridad: "la piel pide"
                  habla por la piel de quien lee. En primera persona dice lo
                  mismo sin recetarle nada a nadie, que es justo el giro. */}
              <motion.h1
                {...fade(0.4)}
                className="text-balance font-display text-display-md font-normal"
              >
                No uso más pasos. Uso los{" "}
                <em className="italic text-champagne-deep">correctos</em>.
              </motion.h1>
              <motion.p
                {...fade(0.47)}
                className="mt-5 max-w-measure text-note text-stone-dark"
              >
                Aquí está el catálogo entero de RIMAN. Yo te digo por dónde
                empezar y por qué.
              </motion.p>
              <motion.div {...fade(0.54)} className="mt-8 flex flex-wrap items-center gap-5">
                <Magnetic strength={0.35}>
                  <a
                    href="#concerns"
                    className="press group flex items-center gap-3 bg-ink px-7 py-4 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                  >
                    Armar mi rutina
                    <span
                      aria-hidden
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-ivory/10 transition-colors duration-300 group-hover:bg-ivory/20"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </Magnetic>
                <a
                  href="#bestsellers"
                  className="link-underline group -my-2 flex min-h-[44px] items-center gap-1.5 py-2 text-label uppercase text-ink transition-colors hover:text-champagne-deep"
                >
                  Ver los más pedidos
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>

              {/* Sumario de portada: las líneas que una revista imprime en
                  el canto para contarte qué trae el número. Aquí hacen
                  además de navegación —llevan a los tres capítulos que
                  más se buscan— y ocupan el aire que dejó alinear la
                  columna arriba. */}
              <motion.nav
                {...fade(0.62)}
                aria-label="En este número"
                className="mt-12 hidden max-w-measure border-t border-hairline pt-6 lg:block"
              >
                <p className="mb-4 text-micro uppercase text-stone-dark">
                  En este número
                </p>
                <ul>
                  {[
                    { n: "02", label: "Lo que más me piden", href: "#bestsellers" },
                    { n: "03", label: "Por dónde empezar", href: "#concerns" },
                    { n: "04", label: "Quién está detrás", href: "#eilin" },
                  ].map((line) => (
                    <li key={line.n} className="border-b border-hairline last:border-0">
                      <a
                        href={line.href}
                        className="group flex min-h-[44px] items-center gap-5 py-1 text-note text-stone-dark transition-colors hover:text-ink"
                      >
                        <span
                          aria-hidden
                          className="editorial-index font-display text-base font-medium text-champagne-bronze"
                        >
                          {line.n}
                        </span>
                        <span className="link-underline">{line.label}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto h-3.5 w-3.5 shrink-0 text-champagne-deep opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </div>

            {/* Retrato de portada: candidato LCP. Lleva colgada la
                banderola con la pieza nº 1, y el pie corre por el canto
                izquierdo para no disputarle el borde inferior. */}
            <motion.figure
              style={{ y: portraitY }}
              /* El margen inferior solo cubre el filete desplazado del
                 marco de museo, que sobresale 12 px por abajo. */
              className="order-1 relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:order-2 lg:mb-4 lg:max-w-none"
            >
              {/* Pie del retrato en el canto, como el crédito de foto de
                  una portada impresa. Sobre porcelana, nunca sobre la
                  fotografía, para no depender del contraste de la imagen. */}
              <figcaption
                aria-hidden
                className="marginalia absolute -left-7 top-0 hidden text-micro uppercase tracking-wide2 text-stone-dark lg:block"
              >
                Eilin Guependo
              </figcaption>

              <motion.div
                initial={{ opacity: 0, clipPath: "inset(10% 6% 10% 6%)", scale: 1.05 }}
                animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                transition={{ duration: 1.15, delay: 0.22, ease: EASE }}
                className="museum-frame photo-warm"
              >
                <Image
                  src="/founder/eilin-portada.jpg"
                  alt="Retrato de Eilin Guependo, que recomienda y ayuda a elegir dentro del catálogo de esta página"
                  width={800}
                  height={1000}
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                  className="aspect-[4/5] w-full object-cover object-[50%_18%] shadow-vitrine"
                />
              </motion.div>

              {/* Pie horizontal: el equivalente del canto cuando no hay
                  gutter donde alojarlo. */}
              <p className="mt-4 flex items-center justify-center gap-3 text-micro uppercase text-stone-dark lg:hidden">
                <span className="h-px w-8 bg-champagne-deep/50" aria-hidden />
                Eilin Guependo
                <span className="h-px w-8 bg-champagne-deep/50" aria-hidden />
              </p>

              {/* La banderola se apoya DENTRO del encuadre, sobre el tercio
                  bajo de la fotografía. Colgando por fuera quedaba unos
                  60 px más abajo y perdía el pliegue; apoyada, además, es
                  el gesto real de una portada: el reclamo de venta se
                  imprime sobre la foto, no debajo. El recorte del retrato
                  está fijado arriba (object-position 18 %), así que lo que
                  tapa es fondo, nunca la cara. */}
              <motion.div
                {...fade(0.66)}
                className="mt-6 lg:absolute lg:bottom-5 lg:left-5 lg:right-5 lg:z-10 lg:mt-0"
              >
                {coverFlag}
              </motion.div>
            </motion.figure>
          </div>
        </div>
      </motion.div>

      {/* Cierre de la portada: filete de oro que separa el primer capítulo */}
      <div aria-hidden className="rule-gold relative mx-auto mt-16 max-w-7xl lg:mt-20" />
    </section>
  );
}

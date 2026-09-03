"use client";

// ─── Portada del número ─────────────────────────────────────────────
// Una portada de revista tiene un nombre grande y una persona delante.
// Nada más. Aquí el nombre es el masthead y la persona es un recorte
// real de Eilin, sin marco y sin fondo, apoyado sobre el papel y pisando
// la línea de base del rótulo. Ese cruce entre la tipografía y la figura
// es el gesto que ninguna plantilla trae de fábrica.
//
// Lo que se retiró de la portada anterior, y por qué:
//   · La banderola con la pieza nº 1. Repetía, a ochocientos píxeles de
//     distancia, la misma tarjeta que abre el capítulo 02, y metía
//     precio, guardar y comprar en la primera pantalla.
//   · El sumario "En este número". El header ya lleva esos enlaces y no
//     se va nunca de la pantalla.
//   · El pie del retrato, en vertical y en horizontal. El masthead ya
//     dice el nombre a ciento cincuenta píxeles de cuerpo.
//   · El segundo enlace del bloque de acción. Debajo de la portada está
//     justo el capítulo al que llevaba.
// Quedan cinco cosas: el folio, el nombre, ella, una frase y un botón.
//
// Las entradas van en CSS (.cover-in, .cover-figure, .cover-rise) y no
// en framer: la primera pantalla no puede depender de que haya hidratado
// el bundle para dejarse ver. Aquí framer solo se encarga del parallax,
// que es scroll y por definición ya necesita JavaScript.

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import { instagramHandle } from "@/lib/site";
import Photo from "./Photo";
import Magnetic from "./motion/Magnetic";
import InstagramLink from "./InstagramLink";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax de dos velocidades: el rótulo sube más rápido que la figura,
  // así que al desplazarse ella lo tapa. Solo transform y opacidad.
  const figureY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "6%"]);
  const mastheadY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-26%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-porcelain pb-14 grain lg:pb-20"
    >
      {/* Cáustica de champagne: la luz de un frasco de vidrio moviéndose
          sobre el papel. Dos capas de gradiente, cero JavaScript. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="caustic-layer animate-caustic bg-caustic opacity-70" />
        <div className="caustic-layer animate-caustic-slow bg-caustic opacity-40" />
      </div>

      <motion.div style={{ opacity: fadeOut }} className="relative">
        {/* Folio: la línea de datos de una portada impresa. Dos datos, uno
            en cada canto: dónde estás y dónde sigue ella publicando. */}
        <div
          style={{ "--d": "0.1s" } as React.CSSProperties}
          className="cover-in mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-4 text-micro uppercase text-champagne-bronze sm:px-6"
        >
          <span className="editorial-index">Nº 01 · La portada</span>
          <InstagramLink className="link-underline -my-3 inline-flex min-h-[44px] items-center gap-1.5 py-3 transition-colors hover:text-champagne-deep">
            <Instagram aria-hidden className="h-3.5 w-3.5" strokeWidth={1.6} />
            <span>{instagramHandle}</span>
          </InstagramLink>
        </div>

        {/* Masthead: el nombre como cabecera del número. El wrapper lleva
            el overflow de la máscara; la p lleva pb para que la "p" de
            Guependo no se recorte al subir. */}
        <motion.div
          style={{ y: mastheadY }}
          aria-hidden
          className="relative z-0 select-none px-2 pt-4 text-center lg:pt-5"
        >
          <div className="overflow-hidden">
            <p className="cover-rise whitespace-nowrap pb-[0.14em] font-display text-masthead font-normal text-ink">
              Eilin <em className="italic text-champagne-deep">Guependo</em>
            </p>
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* `items-start`, no `items-center`. Con la columna centrada
              contra una figura de 737 px, el botón principal caía en 755 y
              se quedaba fuera de un portátil de 1280×720, que es justo
              donde se decide la conversión. Alineada arriba entra en 612 y
              la figura sigue bajando sola: el bloque de texto en el ángulo
              superior y la persona cruzando la página entera es, además,
              la composición de portada de toda la vida. */}
          <div className="grid items-start gap-x-12 gap-y-7 lg:grid-cols-[1fr_minmax(380px,520px)]">
            {/* La figura va primero en el DOM en móvil (order-1) porque es
                lo que se reconoce antes de leer nada, y segunda en
                escritorio para que la lectura empiece por el titular. */}
            <motion.figure
              style={{ y: figureY }}
              className="order-1 w-full lg:order-2 lg:-mt-16 xl:-mt-20"
            >
              {/* Recorte real, sin marco y sin fondo: el papel de la
                  sección se ve a través de ella. Las fotos originales son
                  de estudio sobre blanco puro (#FFF) y el papel de la casa
                  es porcelana (#F7F4EF); pegarlas enteras dejaba un
                  rectángulo blanco que canta a un metro de distancia. El
                  recorte lleva alfa de verdad, no filtros ni mezclas, así
                  que funciona igual sobre cualquier fondo y no depende del
                  soporte de mix-blend-mode.
                  En móvil el encuadre se cierra sobre la mitad de arriba:
                  ahí están la cara y el gesto con el frasco, que es lo que
                  hay que reconocer, y de paso desaparece el vacío que la
                  figura entera dejaba en el canto izquierdo. */}
              <div
                /* 4:3 corta justo por encima de la mano de abajo: un dedo
                   asomando por el canto inferior se lee como un error. */
                className="cover-figure relative mx-auto aspect-[4/3] w-full sm:aspect-[3/2] lg:aspect-[872/1236] lg:max-w-none"
              >
                <Photo
                  src="/founder/eilin-gesto.webp"
                  alt="Eilin Guependo, de perfil y con los ojos cerrados, sostiene en alto un frasco de RIMAN"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-[50%_0%] lg:object-contain"
                />
              </div>
            </motion.figure>

            {/* Líneas de portada */}
            <div className="order-2 lg:order-1 lg:pt-10">
              <p
                style={{ "--d": "0.34s" } as React.CSSProperties}
                className="cover-in mb-5 flex items-center gap-3 text-label uppercase text-champagne-bronze"
              >
                <span className="h-px w-10 bg-champagne-deep" aria-hidden />
                Skincare coreano de RIMAN
              </p>
              <h1
                style={{ "--d": "0.4s" } as React.CSSProperties}
                className="cover-in text-balance font-display text-display-md font-normal"
              >
                No uso más pasos. Uso los{" "}
                <em className="italic text-champagne-deep">correctos</em>.
              </h1>
              <p
                style={{ "--d": "0.47s" } as React.CSSProperties}
                className="cover-in mt-5 max-w-measure text-note text-stone-dark"
              >
                Aquí está el catálogo entero. Yo te digo por dónde empezar.
              </p>
              <div
                style={{ "--d": "0.54s" } as React.CSSProperties}
                className="cover-in mt-8"
              >
                <Magnetic strength={0.35} className="w-fit">
                  <a
                    href="#concerns"
                    className="press group flex min-h-[44px] w-fit items-center gap-3 bg-ink px-7 py-4 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
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
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cierre de la portada: filete de oro que separa el primer capítulo */}
      <div aria-hidden className="rule-gold relative mx-auto mt-12 max-w-7xl lg:mt-16" />
    </section>
  );
}

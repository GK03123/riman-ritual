"use client";

// ─── Capítulo 06 · El origen ────────────────────────────────────────
// Aquí vivía el GIF oficial de "Born from Jeju" servido desde el CDN de
// la marca: 34,8 MB en un solo archivo. Iba en lazy, así que no entraba
// en la carga inicial, pero cualquiera que llegara hasta este capítulo se
// bajaba treinta y cinco megas de datos, casi siempre desde el móvil y
// casi siempre desde Instagram.
//
// El mismo metraje, reencodeado a 960 px y 25 fps, pesa 656 KB en MP4 y
// 440 KB en WebM. Y el vídeo ni siquiera se pide hasta que la sección
// está a cuatrocientos píxeles de entrar en pantalla: hasta entonces lo
// que se ve es el póster, un solo fotograma de 68 KB.
//
// Con reduced-motion el vídeo no se arma nunca. Se queda el póster fijo,
// que es exactamente lo que pide la preferencia, y el capítulo conserva
// su imagen.

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MEDIA } from "@/lib/media";
import { EASE } from "@/lib/motion";

export default function JejuFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // `near`: el capítulo se acerca, así que ya se puede pedir el fotograma
  // de póster. `armed`: además hay permiso para que se mueva.
  //
  // Iban juntos, y el póster vivía en el atributo del <video> desde el
  // primer HTML. Un `poster` se descarga siempre, aunque el vídeo lleve
  // `preload="none"`: en un móvil frenado esos 69 KB salían a los 300 ms,
  // en plena carrera por el retrato de portada, para pintar un capítulo
  // que está a cinco pantallas de distancia.
  const [near, setNear] = useState(false);
  const [armed, setArmed] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, reduce ? 1.15 : 1.35]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", reduce ? "-6%" : "8%"]);
  const overlayText = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.4]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Quien pide menos movimiento se queda con el póster fijo, que es
    // exactamente lo que pide la preferencia: el vídeo no se arma nunca.
    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setNear(true);
        if (!quiet) setArmed(true);
        io.disconnect();
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Las fuentes se montan al armar, así que hay que pedirle al elemento
  // que vuelva a mirar sus hijos antes de reproducir.
  useEffect(() => {
    if (!armed) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    void v.play().catch(() => {
      /* si el navegador se niega, el póster ya está pintado */
    });
  }, [armed]);

  return (
    <section
      ref={ref}
      id="film"
      /* El alto se mide contra la pantalla, pero con tope: en un monitor de
         1440 px de alto, 88dvh convertía este capítulo en una banda de mil
         doscientos setenta píxeles con tres líneas de texto en medio. */
      className="relative flex min-h-[min(88dvh,820px)] items-center justify-center overflow-hidden bg-jade text-ivory"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <video
          ref={videoRef}
          aria-hidden
          tabIndex={-1}
          muted
          loop
          playsInline
          preload="none"
          poster={near ? MEDIA.jejuPoster : undefined}
          className="h-full w-full object-cover"
        >
          {armed && (
            <>
              <source src={MEDIA.jejuWebm} type="video/webm" />
              <source src={MEDIA.jejuMp4} type="video/mp4" />
            </>
          )}
        </video>
      </motion.div>

      {/* Gradientes de legibilidad.
          El centro subió de jade/30 a jade/55: el metraje de Jeju tiene
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
        {/* El titular nunca llegaba a aparecer. La cortina la observaba el
            propio texto (whileInView sobre el span), pero el span arranca
            desplazado un 110 % hacia abajo y el h2 lo recorta con
            overflow-hidden. IntersectionObserver mide contra el rectángulo
            recortado por los ancestros, así que el span no entraba nunca
            en pantalla, la animación no se disparaba y "Nacido en Jeju" se
            quedaba fuera del encuadre para siempre.
            Ahora quien observa es el h2, que sí está a la vista, y el span
            se anima como hijo con variantes. */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="overflow-hidden font-display text-display-xl font-normal italic"
        >
          <motion.span
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            /* Y si el sistema pide menos movimiento, la cortina no existe:
               el titular se queda en su sitio desde el primer fotograma. */
            className="block motion-reduce:!transform-none"
          >
            Nacido en Jeju
          </motion.span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-body text-ivory/80"
        >
          Una isla volcánica en el sur de Corea. De ahí salen el agua y el
          fermento con los que RIMAN formula lo que ves aquí.
        </motion.p>
      </motion.div>
    </section>
  );
}

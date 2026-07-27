// ─── Vocabulario de motion de la casa ───────────────────────────────
// Una sola fuente de verdad para curvas, springs y variantes. Regla:
// lo que responde al dedo usa spring (interrumpible, con masa); lo que
// entra en escena usa la curva editorial. Nada de linear ni ease-in-out.

import type { Transition, Variants } from "framer-motion";

/** Curva editorial de la casa: arranque decidido, aterrizaje sedoso.
 *  Tipada como tupla bézier para que framer la acepte sin casts. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Curva "seda" para paneles y gestos grandes (estilo sheet física). */
export const SILK: [number, number, number, number] = [0.32, 0.72, 0, 1];

/** Spring de paneles: con peso, sin rebote visible. */
export const SPRING_PANEL: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 38,
  mass: 0.9,
};

/** Spring de micro-interacción: rápido, vivo, apenas un rebote. */
export const SPRING_TAP: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 28,
  mass: 0.6,
};

/** Spring suave para elementos que flotan o se reordenan. */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 210,
  damping: 26,
  mass: 0.8,
};

/** Duración segura para hidratación.
 *
 *  `useReducedMotion()` devuelve false en el servidor y true en el cliente
 *  cuando el sistema pide menos movimiento. Si ese valor decide el `initial`
 *  de un motion.div, el HTML del servidor y el del cliente dejan de
 *  coincidir: React tira la hidratación entera y vuelve a renderizar en
 *  cliente. Por eso el `initial` nunca se ramifica; lo que se ramifica es
 *  la duración. Con 0 el elemento salta a su estado final sin movimiento
 *  perceptible, que es exactamente lo que pide la preferencia. */
export const dur = (reduce: boolean | null, seconds: number) =>
  reduce ? 0 : seconds;

/** Entrada editorial estándar: subir + aparecer. */
export const riseIn = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

/** Variantes para orquestar listas con stagger desde el padre. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Máscara editorial: la imagen se revela abriendo el encuadre. */
export const unmask = {
  initial: { opacity: 0, clipPath: "inset(10% 10% 10% 10%)", scale: 1.06 },
  animate: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
  transition: { duration: 1.05, ease: EASE },
};

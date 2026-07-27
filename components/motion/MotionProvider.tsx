"use client";

// ─── Política de movimiento de la casa ──────────────────────────────
// `reducedMotion="user"` hace que framer-motion desactive por sí solo
// las animaciones de transform y de layout cuando el sistema pide menos
// movimiento, y deje pasar solo las de opacidad.
//
// Es la forma correcta de respetar la preferencia en este proyecto: la
// alternativa que había antes —ramificar el `initial` según
// useReducedMotion()— generaba HTML distinto en servidor y en cliente,
// React tiraba la hidratación completa y volvía a renderizar en cliente.

import { MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

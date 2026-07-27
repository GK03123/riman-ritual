"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { EASE, dur } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Entrada editorial estándar: sube y aparece al entrar en viewport.
 *
 *  El `initial` es siempre el mismo en servidor y cliente (si no, la
 *  preferencia de movimiento reducido rompe la hidratación). Quien pide
 *  menos movimiento recibe la misma transición con duración cero: el
 *  contenido aparece, pero no se desplaza. */
export default function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: dur(reduce, 0.75),
        delay: dur(reduce, delay),
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

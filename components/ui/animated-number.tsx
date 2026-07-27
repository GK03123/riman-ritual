"use client";

import { useEffect } from "react";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

// ─── Número animado (Cult UI · Animated Number, adaptado) ────────────
// Cuenta suave con muelle (spring). Único cambio sobre el original: usa
// `framer-motion` en vez de `motion`. Ideal para precios y cifras de la
// tienda; pásale `format` para el signo de dólar de la casa.

interface AnimatedNumberProps {
  value: number;
  mass?: number;
  stiffness?: number;
  damping?: number;
  precision?: number;
  format?: (value: number) => string;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

export function AnimatedNumber({
  value,
  mass = 0.8,
  stiffness = 75,
  damping = 15,
  precision = 0,
  format = (num) => num.toLocaleString(),
  onAnimationStart,
  onAnimationComplete,
}: AnimatedNumberProps) {
  const spring = useSpring(value, { mass, stiffness, damping });
  const display: MotionValue<string> = useTransform(spring, (current) =>
    format(parseFloat(current.toFixed(precision))),
  );

  useEffect(() => {
    spring.set(value);
    if (onAnimationStart) onAnimationStart();
    const unsubscribe = spring.on("change", () => {
      if (spring.get() === value && onAnimationComplete) onAnimationComplete();
    });
    return () => unsubscribe();
  }, [spring, value, onAnimationStart, onAnimationComplete]);

  return <motion.span>{display}</motion.span>;
}

export default AnimatedNumber;

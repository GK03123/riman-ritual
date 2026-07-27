"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, Truck, ShieldCheck, Undo2 } from "lucide-react";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/motion";

const EVERGREEN = [
  { Icon: Truck, text: "Envío dentro de Estados Unidos" },
  { Icon: ShieldCheck, text: "Producto original, boutique oficial" },
  { Icon: Undo2, text: "Devoluciones con garantía" },
];

const MESSAGES = SITE.promo
  ? [{ Icon: Sparkles, text: SITE.promo }, ...EVERGREEN]
  : EVERGREEN;

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || MESSAGES.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 5000);
    return () => clearInterval(t);
  }, [reduce]);

  const { Icon, text } = MESSAGES[i];

  return (
    <div className="relative block overflow-hidden bg-ink text-porcelain">
      {/* Filete champagne superior: la firma dorada abre la página */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gold-hairline" />
      <div className="relative mx-auto flex h-10 max-w-7xl items-center justify-center overflow-hidden px-4 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center gap-2 text-label font-normal uppercase sm:text-xs sm:tracking-eyebrow"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-champagne" aria-hidden />
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

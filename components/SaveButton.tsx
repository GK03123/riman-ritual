"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { type Product } from "@/lib/products";
import { useRitualBag } from "@/lib/ritual-bag";
import { SPRING_TAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SaveButtonProps {
  product: Product;
  /** "chip" = círculo flotante sobre la card; "bar" = botón cuadrado en barras de compra */
  variant?: "chip" | "bar";
  className?: string;
}

export default function SaveButton({
  product,
  variant = "chip",
  className,
}: SaveButtonProps) {
  const { has, toggle } = useRitualBag();
  const reduce = useReducedMotion();
  const saved = has(product.id);

  return (
    <motion.button
      onClick={() => toggle(product)}
      aria-pressed={saved}
      aria-label={
        saved
          ? `Quitar ${product.name} de mi ritual`
          : `Guardar ${product.name} en mi ritual`
      }
      whileTap={{ scale: 0.88 }}
      transition={SPRING_TAP}
      className={cn(
        "flex items-center justify-center transition-colors duration-300",
        variant === "chip" &&
          "h-11 w-11 rounded-full border border-hairline bg-ivory/95 shadow-card backdrop-blur-sm hover:border-champagne-deep",
        variant === "bar" &&
          "h-12 w-12 shrink-0 rounded-seal border border-hairline bg-ivory hover:border-champagne-deep",
        saved ? "text-champagne-deep" : "text-ink/60 hover:text-champagne-deep",
        className
      )}
    >
      <motion.span
        key={saved ? "on" : "off"}
        initial={{ scale: saved ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={SPRING_TAP}
        className="flex"
      >
        <Heart
          className={cn("h-4 w-4 transition-colors", saved && "fill-champagne-deep")}
          strokeWidth={1.6}
        />
      </motion.span>
    </motion.button>
  );
}

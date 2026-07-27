"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ─── Botón con relieve (Cult UI · Texture Button, adaptado) ──────────
// Doble capa (marco + interior) con degradado para simular un botón
// prensado. Reencuadrado a la casa: `primary` en jade profundo, `accent`
// en champagne dorado (el CTA de compra), y los suaves en porcelana.
// Light-only; curva `ease-editorial`.

const buttonVariantsOuter = cva("", {
  variants: {
    variant: {
      primary:
        "w-full border border-jade/40 bg-gradient-to-b from-jade to-jade-deep p-[1px] transition duration-300 ease-editorial",
      accent:
        "w-full border border-champagne-deep/40 bg-gradient-to-b from-champagne to-champagne-deep p-[1px] transition duration-300 ease-editorial",
      secondary:
        "w-full border border-hairline bg-porcelain-deep p-[1px] transition duration-300 ease-editorial",
      destructive:
        "w-full border border-red-500/30 bg-gradient-to-b from-red-300/80 to-red-500 p-[1px] transition duration-300 ease-editorial",
      minimal:
        "group/texture-button w-full border border-hairline bg-ivory p-[1px] transition duration-300 ease-editorial active:bg-porcelain-warm hover:bg-gradient-to-t hover:from-porcelain-warm hover:to-ivory",
      icon: "group/texture-button rounded-full border border-hairline bg-ivory p-[1px] transition duration-300 ease-editorial active:bg-porcelain-warm hover:bg-gradient-to-t hover:from-porcelain-warm hover:to-ivory",
    },
    size: {
      sm: "rounded-[6px]",
      default: "rounded-[10px]",
      lg: "rounded-[12px]",
      icon: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

const innerDivVariants = cva(
  "w-full h-full flex items-center justify-center text-ink",
  {
    variants: {
      variant: {
        primary:
          "gap-2 bg-gradient-to-b from-jade-soft to-jade text-ivory transition duration-300 ease-editorial hover:from-jade-mist hover:to-jade-soft active:from-jade active:to-jade-deep",
        accent:
          "gap-2 bg-gradient-to-b from-champagne-glow to-champagne text-ink transition duration-300 ease-editorial hover:from-champagne-soft hover:to-champagne-glow active:from-champagne active:to-champagne-deep",
        secondary:
          "bg-gradient-to-b from-ivory to-porcelain-warm text-ink transition duration-300 ease-editorial hover:from-porcelain-warm hover:to-porcelain-deep active:from-porcelain-deep active:to-porcelain-warm",
        destructive:
          "gap-2 bg-gradient-to-b from-red-400/70 to-red-500/70 text-ivory transition duration-300 ease-editorial hover:from-red-400 hover:to-red-500",
        minimal:
          "bg-gradient-to-b from-ivory to-porcelain-warm/60 text-ink transition duration-300 ease-editorial group-hover/texture-button:from-porcelain-warm group-hover/texture-button:to-porcelain-deep group-active/texture-button:from-porcelain-deep group-active/texture-button:to-porcelain-warm",
        icon: "bg-gradient-to-b from-ivory to-porcelain-warm/60 text-ink rounded-full group-active/texture-button:bg-porcelain-deep",
      },
      size: {
        sm: "text-label rounded-[4px] px-4 py-1",
        default: "text-note rounded-[9px] px-4 py-2",
        lg: "text-body rounded-[11px] px-5 py-2.5",
        icon: "rounded-full p-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface TextureButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "minimal"
    | "icon";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const TextureButton = React.forwardRef<HTMLButtonElement, TextureButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "default",
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariantsOuter({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <div className={cn(innerDivVariants({ variant, size }))}>{children}</div>
      </Comp>
    );
  },
);

TextureButton.displayName = "TextureButton";

export { TextureButton };

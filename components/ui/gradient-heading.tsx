import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ─── Titular con degradado (Cult UI · Gradient Heading, adaptado) ────
// Texto recortado sobre un degradado. Reencuadrado a la casa: la variante
// `gold` usa la lámina de oro real (`bg-gold-sheet`), y el resto tira de
// tinta, champagne, jade y piedra. Pásale `font-display` por className
// para la voz didone de portada.

const headingVariants = cva(
  "tracking-tight pb-3 bg-clip-text text-transparent",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-t from-ink to-ink-soft",
        champagne: "bg-gradient-to-t from-champagne-deep to-champagne",
        gold: "bg-gold-sheet",
        jade: "bg-gradient-to-t from-jade to-jade-soft",
        stone: "bg-gradient-to-t from-stone-dark to-stone",
      },
      size: {
        default: "text-2xl sm:text-3xl lg:text-4xl",
        xxs: "text-base sm:text-lg lg:text-lg",
        xs: "text-lg sm:text-xl lg:text-2xl",
        sm: "text-xl sm:text-2xl lg:text-3xl",
        md: "text-2xl sm:text-3xl lg:text-4xl",
        lg: "text-3xl sm:text-4xl lg:text-5xl",
        xl: "text-4xl sm:text-5xl lg:text-6xl",
        xxl: "text-5xl sm:text-6xl lg:text-[6rem]",
        xxxl: "text-5xl sm:text-6xl lg:text-[8rem]",
      },
      weight: {
        default: "font-normal",
        thin: "font-thin",
        base: "font-normal",
        semi: "font-semibold",
        bold: "font-bold",
        black: "font-black",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "default",
    },
  },
);

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GradientHeading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, variant, weight, size, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";
    return (
      <Comp ref={ref} {...props} className={className}>
        <span className={cn(headingVariants({ variant, size, weight }))}>
          {children}
        </span>
      </Comp>
    );
  },
);

GradientHeading.displayName = "GradientHeading";

export type Variant = "default" | "champagne" | "gold" | "jade" | "stone";
export type Size =
  | "default"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";
export type Weight = "default" | "thin" | "base" | "semi" | "bold" | "black";

export { GradientHeading, headingVariants };

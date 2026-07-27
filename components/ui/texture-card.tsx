import * as React from "react";

import { cn } from "@/lib/utils";

// ─── Vitrina táctil (Cult UI · Texture Card, adaptado) ───────────────
// Tarjeta de bordes anidados que finge un relieve de emboss. El original
// usaba grises neutros y modo oscuro; aquí va reencuadrada a la casa:
// porcelana cálida, filete hairline y champagne en las capas. Light-only.
// El radio se suavizó a 18px para dar variedad frente a la esquina viva
// editorial, sin volverse burbuja.

const TextureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[18px] border border-ivory bg-gradient-to-b from-porcelain-warm to-ivory",
      className,
    )}
    {...props}
  >
    <div className="rounded-[17px] border border-champagne-soft/70">
      <div className="rounded-[16px] border border-ivory/80">
        <div className="rounded-[15px] border border-hairline">
          <div className="w-full rounded-[14px] border border-ivory/60 bg-gradient-to-b from-ivory to-porcelain/60 text-stone">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
));
TextureCard.displayName = "TextureCard";

const TextureCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("first:pt-6 last:pb-6", className)}
    {...props}
  />
));
TextureCardHeader.displayName = "TextureCardHeader";

const TextureCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "pl-2 font-display text-title font-normal leading-tight text-ink",
      className,
    )}
    {...props}
  />
));
TextureCardTitle.displayName = "TextureCardTitle";

const TextureCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("pl-2 text-note text-stone-dark", className)}
    {...props}
  />
));
TextureCardDescription.displayName = "TextureCardDescription";

const TextureCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
));
TextureCardContent.displayName = "TextureCardContent";

const TextureCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between gap-2 px-6 py-4", className)}
    {...props}
  />
));
TextureCardFooter.displayName = "TextureCardFooter";

// Separador con doble filete (luz arriba, sombra abajo) sobre porcelana.
const TextureSeparator = () => (
  <div className="border border-l-transparent border-r-transparent border-t-ivory border-b-hairline" />
);

export {
  TextureCard,
  TextureCardHeader,
  TextureCardFooter,
  TextureCardTitle,
  TextureSeparator,
  TextureCardDescription,
  TextureCardContent,
};

export default TextureCard;

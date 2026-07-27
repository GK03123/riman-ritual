import * as React from "react";

import { cn } from "@/lib/utils";

// ─── Tarjeta mínima (Cult UI · Minimal Card, adaptado) ───────────────
// Superficie suave con sombras internas que la levantan un milímetro del
// papel. Reencuadrada a ivory/porcelana y light-only. La imagen lleva un
// doble anillo (luz + filete) para que la foto de producto se sienta
// montada, no pegada.

const MinimalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[20px] bg-ivory p-2 no-underline shadow-sm transition-colors hover:bg-porcelain-warm",
      "shadow-[0px_1px_1px_0px_rgba(38,34,26,0.05),0px_1px_1px_0px_rgba(255,252,240,0.7)_inset,0px_0px_0px_1px_rgba(255,255,255,0.5)_inset,0px_0px_1px_0px_rgba(28,27,26,0.4)]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
MinimalCard.displayName = "MinimalCard";

const MinimalCardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src: string; alt: string }
>(({ className, alt, src, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative mb-6 h-[190px] w-full rounded-[16px]",
      "shadow-[0px_1px_1px_0px_rgba(38,34,26,0.05),0px_1px_1px_0px_rgba(255,252,240,0.7)_inset,0px_0px_0px_1px_rgba(255,255,255,0.5)_inset,0px_0px_1px_0px_rgba(28,27,26,0.4)]",
      className,
    )}
    {...props}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt={alt}
      width={200}
      height={200}
      className="absolute inset-0 h-full w-full rounded-[16px] object-cover"
    />
    <div className="absolute inset-0 rounded-[16px]">
      <div
        className={cn(
          "absolute inset-0 rounded-[16px]",
          "shadow-[0px_0px_0px_1px_rgba(38,34,26,0.07),0px_0px_0px_3px_#FDFBF7,0px_0px_0px_4px_rgba(38,34,26,0.08)]",
        )}
      />
    </div>
  </div>
));
MinimalCardImage.displayName = "MinimalCardImage";

const MinimalCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("mt-2 px-1 font-display text-title font-normal leading-tight text-ink", className)}
    {...props}
  />
));
MinimalCardTitle.displayName = "MinimalCardTitle";

const MinimalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("px-1 pb-2 text-note text-stone-dark", className)}
    {...props}
  />
));
MinimalCardDescription.displayName = "MinimalCardDescription";

const MinimalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
MinimalCardContent.displayName = "MinimalCardContent";

const MinimalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
MinimalCardFooter.displayName = "MinimalCardFooter";

export {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
  MinimalCardFooter,
};

export default MinimalCard;

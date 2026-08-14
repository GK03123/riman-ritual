"use client";

// ─── Ficha de vitrina ───────────────────────────────────────────────
// La tarjeta reposa plana sobre el papel (solo filete) y al pasar se
// levanta. El ranking no es una píldora negra sino un numeral de oro
// sobre la imagen, como la entrada de un sumario.
//
// Tres tallas, porque un ranking que se ve todo del mismo tamaño no es
// un ranking: `featured` para la pieza que abre el capítulo, `duo` para
// el segundo escalón —dos por fila, con voz de display— y `grid` para la
// cola del ranking y para el catálogo completo.

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { type Product } from "@/lib/products";
import { productUrl } from "@/lib/site";
import { benefitLabel } from "@/lib/merch";
import { eilinNote } from "@/lib/notes";
import { useProductDrawer } from "@/lib/product-drawer";
import { cn, formatPrice } from "@/lib/utils";
import SaveButton from "./SaveButton";

type Variant = "grid" | "duo" | "featured";

interface ProductCardProps {
  product: Product;
  showRank?: boolean;
  variant?: Variant;
}

export default function ProductCard({
  product,
  showRank = false,
  variant = "grid",
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { open } = useProductDrawer();
  const hasAlt = !!product.imageAlt;
  const featured = variant === "featured";
  const duo = variant === "duo";
  const rank =
    showRank && product.bestsellerRank !== null && product.bestsellerRank <= 3
      ? String(product.bestsellerRank).padStart(2, "0")
      : null;

  /* Cada talla ocupa una fracción distinta de la pantalla, así que cada
     una pide su propio `sizes`. Sin esto el navegador asume 100vw y se
     baja la imagen más grande del srcset para una tarjeta de 280 px. */
  const sizes = featured
    ? "(max-width: 1024px) 100vw, 640px"
    : duo
      ? "(max-width: 640px) 100vw, 50vw"
      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex h-full flex-col rounded-vitrine border border-hairline bg-ivory transition-all duration-500 ease-editorial hover:-translate-y-1.5 hover:border-champagne/45 hover:shadow-cardHover",
        featured && "lg:flex-row lg:items-stretch"
      )}
    >
      {/* Set completo: el único rótulo que sigue siendo una etiqueta,
          porque informa de formato, no de posición.
          z-20 y no z-10: la imagen del producto lleva z-10 para dejar el
          numeral de ranking detrás, y al ir después en el DOM tapaba la
          etiqueta con el mismo z-index. Va en la misma capa que los
          controles de la tarjeta, encima de la fotografía. */}
      {product.isPackage && !showRank && (
        <span className="absolute left-4 top-4 z-20 bg-champagne-deep px-3 py-1.5 text-micro uppercase text-ivory shadow-card">
          Set completo
        </span>
      )}

      {/* Ficha rápida + guardar */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 sm:right-4 sm:top-4">
        <button
          onClick={() => open(product)}
          aria-label={`Ver ficha de ${product.name}`}
          className="press flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-ivory/95 text-ink opacity-100 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-ink hover:bg-ink hover:text-ivory sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
        >
          <Plus className="h-4 w-4" />
        </button>
        <SaveButton
          product={product}
          className="sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
        />
      </div>

      {/* Imagen (toda el área abre la ficha) */}
      <button
        onClick={() => open(product)}
        /* Las fotos del API ya vienen con mucho aire alrededor del envase,
           así que la caja no necesita añadir más: menos relleno y encuadres
           más apaisados hacen el producto más grande y el capítulo más
           corto, que era el bloque más largo de la página. */
        className={cn(
          "relative overflow-hidden bg-vitrine-radial p-4 text-left sm:p-6",
          featured
            ? "aspect-square lg:aspect-[3/2] lg:w-[52%] lg:shrink-0 lg:p-8"
            : duo
              ? "aspect-[4/3] sm:aspect-[16/11] sm:p-6"
              : "aspect-square"
        )}
        aria-label={`Ver ficha de ${product.name}`}
      >
        {/* Numeral de ranking: sumario, no etiqueta */}
        {rank && (
          <span
            aria-hidden
            className={cn(
              "editorial-index gold-text absolute left-4 top-2 select-none font-display font-medium leading-none",
              featured
                ? "text-6xl lg:left-8 lg:top-5 lg:text-8xl"
                : duo
                  ? "text-5xl sm:left-6 sm:top-4 sm:text-6xl"
                  : "text-4xl"
            )}
          >
            {rank}
          </span>
        )}
        {/* Las fotos del catálogo son PNG del CDN oficial, de entre 150 KB
            y 800 KB cada una, y una portada larga pinta más de sesenta.
            Pasarlas por el optimizador de Next las sirve en AVIF y en la
            medida que pide cada `sizes`, que es de donde sale casi toda la
            bajada de peso de la página. */}
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          loading={featured ? "eager" : "lazy"}
          sizes={sizes}
          className={cn(
            "relative z-10 h-full w-full object-contain transition-all duration-700 ease-editorial",
            hasAlt && hovered ? "scale-95 opacity-0" : "scale-100 opacity-100",
            !hasAlt && "group-hover:scale-105"
          )}
        />
        {hasAlt && (
          <Image
            src={product.imageAlt!}
            alt=""
            aria-hidden
            width={600}
            height={600}
            loading="lazy"
            sizes={sizes}
            className={cn(
              "absolute inset-0 z-10 h-full w-full object-contain p-4 transition-all duration-700 ease-editorial sm:p-6",
              featured && "lg:p-8",
              hovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
            )}
          />
        )}
      </button>

      {/* Info */}
      <div
        className={cn(
          "flex flex-1 flex-col border-t border-hairline p-3.5 sm:p-5",
          duo && "sm:p-7",
          featured && "lg:justify-center lg:border-l lg:border-t-0 lg:p-10 xl:p-12"
        )}
      >
        {rank && featured && (
          <p className="mb-3 flex items-center gap-3 text-label uppercase text-champagne-bronze">
            <span className="h-px w-8 bg-champagne-deep" aria-hidden />
            El que más me piden
          </p>
        )}
        <p className="mb-1.5 text-micro uppercase text-stone-dark">
          {product.line || product.brand}
          {benefitLabel(product.menu) && (
            <span className="text-champagne-bronze"> · {benefitLabel(product.menu)}</span>
          )}
        </p>
        <Link
          href={`/producto/${product.id}`}
          className="flex min-h-[44px] items-center text-left transition-colors hover:text-champagne-deep"
        >
          {/* Los nombres de producto van en Jost en la talla pequeña: la
              didone a 15px pierde los trazos finos y se vuelve difícil de
              leer. De `duo` hacia arriba ya hay cuerpo suficiente. */}
          <h3
            className={cn(
              "leading-snug",
              featured
                ? "font-display text-display-sm font-normal"
                : duo
                  ? "font-display text-title font-normal text-ink"
                  : "text-[15px] font-medium text-ink sm:text-base"
            )}
          >
            {product.name}
          </h3>
        </Link>
        {/* En la pieza destacada manda la nota de Eilin en español; la
            descripción del API está en inglés y en tono de catálogo. */}
        {featured && (eilinNote(product.id) || product.shortDescription) && (
          <p className="mt-4 hidden max-w-measure text-note italic text-stone-dark lg:line-clamp-3 lg:block">
            {eilinNote(product.id) ?? product.shortDescription}
          </p>
        )}
        {duo && eilinNote(product.id) && (
          <p className="mt-3 hidden text-note italic text-stone-dark sm:line-clamp-2 sm:block">
            {eilinNote(product.id)}
          </p>
        )}
        <div
          className={cn(
            "mt-auto flex items-end justify-between gap-3 pt-4",
            duo && "sm:pt-6",
            featured && "lg:mt-8 lg:justify-start lg:gap-10"
          )}
        >
          <p
            className={cn(
              "font-display text-champagne-bronze",
              featured
                ? "text-3xl font-medium lg:text-4xl"
                : duo
                  ? "text-2xl font-medium sm:text-3xl"
                  : "text-xl font-medium"
            )}
          >
            {formatPrice(product.price)}
          </p>
          <a
            href={productUrl(product.id)}
            target="_blank"
            rel="noopener sponsored"
            aria-label={`Comprar ${product.name}`}
            /* py/-my amplían el área táctil sin alterar la maquetación */
            className={cn(
              "-my-3 flex min-h-[44px] items-center gap-1.5 py-3 text-micro uppercase tracking-wide2 transition-all duration-300",
              featured || duo
                ? "press my-0 border border-ink px-6 py-3.5 text-ink hover:border-champagne-deep hover:bg-champagne-deep hover:text-ivory"
                /* En la talla pequeña el enlace se lee siempre y solo se
                   oscurece al pasar: un CTA invisible hasta el hover deja
                   fuera a quien navega con el dedo o con el teclado. */
                : "text-champagne-bronze group-hover:text-ink group-focus-within:text-ink"
            )}
          >
            Comprar <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Filete de oro que se dibuja al pasar: el "clic" visual de la casa */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-0 bg-gold-sheet transition-all duration-500 ease-editorial group-hover:w-full"
      />
    </article>
  );
}

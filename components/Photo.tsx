"use client";

// ─── Fotografía con estado de fallo digno ───────────────────────────
// Toda imagen de la boutique pasa por aquí. Es `next/image` con una sola
// cosa añadida: si el archivo no llega —el CDN de RIMAN retira una ficha,
// la red se cae a mitad de scroll, el hosting devuelve un 402 como el que
// dejó la página sin fotos— el hueco no se queda en blanco.
//
// En su lugar se pinta la misma vitrina que hay debajo de cada producto
// (bg-vitrine-radial) con un rombo de champagne en el centro. Ocupa
// exactamente la misma caja, así que no mueve un solo píxel de la
// maqueta, y se lee como un encuadre vacío a propósito y no como una
// tarjeta rota.
//
// El nombre no se pierde: la caja de reemplazo hereda el `alt` como
// nombre accesible. Si la imagen era decorativa (`alt=""`), el reemplazo
// también lo es.

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export default function Photo({ className, alt, onError, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        {...(alt
          ? { role: "img", "aria-label": alt }
          : { "aria-hidden": true as const })}
        /* `fill` posiciona la imagen en absoluto contra el contenedor;
           el reemplazo tiene que hacer lo mismo o el hueco colapsa. El
           resto de llamadas ya traen su tamaño en `className`. */
        className={cn(
          "flex items-center justify-center bg-vitrine-radial",
          rest.fill && "absolute inset-0",
          className
        )}
      >
        <span
          aria-hidden
          className="block h-3 w-3 rotate-45 border border-champagne/45"
        />
      </span>
    );
  }

  return (
    <Image
      {...rest}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}

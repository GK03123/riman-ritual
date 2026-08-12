// ─── El enlace a Instagram, en un solo sitio ────────────────────────
// La cuenta aparece en cuatro lugares de la página con cuatro formas
// distintas: el folio de la portada, la invitación del capítulo 04, el
// cierre del capítulo 08 y el pie. Lo que comparten no es el aspecto,
// es la fontanería: de dónde sale la URL, qué pasa cuando lib/site.ts la
// deja vacía, y las tres cosas que un enlace externo tiene que llevar
// siempre (target, rel y una etiqueta que avise de que abre fuera).
//
// Así que este componente se queda con la fontanería y deja el aspecto
// entero en manos de quien lo llama. Si `instagram` se vacía en
// lib/site.ts, los cuatro sitios dejan de pintarse solos.

import type { ReactNode } from "react";
import { Instagram } from "lucide-react";
import { SITE, instagramHandle, instagramUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

interface InstagramLinkProps {
  className?: string;
  /** Etiqueta accesible. La de por defecto ya avisa de la pestaña nueva. */
  label?: string;
  /** Contenido a medida. Sin él se pinta el icono y el arroba. */
  children?: ReactNode;
}

export default function InstagramLink({
  className,
  label,
  children,
}: InstagramLinkProps) {
  const url = instagramUrl();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      aria-label={
        label ??
        `Instagram de ${SITE.brandName}, ${instagramHandle}. Se abre en una pestaña nueva`
      }
      className={cn("group", className)}
    >
      {children ?? (
        <>
          <Instagram aria-hidden className="h-4 w-4" strokeWidth={1.6} />
          <span>{instagramHandle}</span>
        </>
      )}
    </a>
  );
}

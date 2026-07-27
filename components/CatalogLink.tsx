"use client";

import { ArrowUpRight } from "lucide-react";
import { useCatalog } from "@/lib/catalog-overlay";

interface CatalogLinkProps {
  label?: string;
  className?: string;
}

/** Botón que abre el catálogo completo. Reutilizable en secciones server.
 *  Una sola etiqueta por intención en toda la página: "Ver el catálogo". */
export default function CatalogLink({
  label = "Ver el catálogo",
  className = "",
}: CatalogLinkProps) {
  const { show } = useCatalog();
  return (
    <button
      onClick={show}
      className={`press sheen group flex min-h-[48px] items-center gap-3 border border-ink px-8 py-4 text-label uppercase text-ink transition-colors duration-300 hover:border-champagne-deep hover:bg-champagne-deep hover:text-ivory ${className}`}
    >
      {label}
      <span
        aria-hidden
        className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/5 transition-all duration-300 group-hover:bg-ivory/15"
      >
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}

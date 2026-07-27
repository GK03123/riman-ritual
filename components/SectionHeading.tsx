import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Numeral de capítulo: "02". Se compone en oro, como en un sumario. */
  chapter?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  /** Tamaño del titular: md por defecto, lg para momentos de capítulo. */
  size?: "md" | "lg";
  /** Forma de la cabecera.
   *
   *  `stacked` apila numeral, titular y entradilla en una sola columna.
   *  `spread` abre el capítulo como una doble página: el numeral crece a
   *  tamaño de display, el titular ocupa la izquierda y la entradilla se
   *  descuelga a la derecha sobre un filete que cruza la caja entera.
   *
   *  Existe porque ocho capítulos con la misma cabecera dejan de leerse
   *  como una revista y empiezan a leerse como una plantilla: la variedad
   *  del ritmo es lo que sostiene la ficción del papel. */
  variant?: "stacked" | "spread";
  className?: string;
}

/** Cabecera de sección de la casa.
 *
 *  Estructura fija: numeral de capítulo + filete, titular, entradilla.
 *  El numeral es lo que convierte una sucesión de bloques en un sumario
 *  de revista: dice dónde estás sin gastar una sola palabra. */
export default function SectionHeading({
  chapter,
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  size = "md",
  variant = "stacked",
  className,
}: SectionHeadingProps) {
  const centered = align === "center" && variant === "stacked";

  const heading = (
    <h2
      className={cn(
        "text-balance font-display font-normal",
        size === "lg" ? "text-display-lg" : "text-display-md",
        dark ? "text-ivory" : "text-ink"
      )}
    >
      {title}
    </h2>
  );

  const lede = subtitle ? (
    <p
      className={cn(
        "text-body text-pretty",
        dark ? "text-ivory/70" : "text-stone-dark"
      )}
    >
      {subtitle}
    </p>
  ) : null;

  // ── Apertura de capítulo a doble página ──────────────────────────
  if (variant === "spread") {
    return (
      <Reveal className={cn("mb-12 sm:mb-16", className)}>
        <p className="mb-6 flex items-baseline gap-5">
          {chapter && (
            <span
              aria-hidden
              className="editorial-index gold-text font-display text-display-sm font-medium leading-none"
            >
              {chapter}
            </span>
          )}
          {eyebrow && (
            <span
              className={cn(
                "text-label uppercase",
                dark ? "text-champagne-light" : "text-champagne-bronze"
              )}
            >
              {eyebrow}
            </span>
          )}
        </p>

        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[1.45fr_1fr] lg:items-end">
          {heading}
          {lede && <div className="max-w-measure lg:pb-2">{lede}</div>}
        </div>

        {/* El filete cierra la apertura y separa el capítulo del cuerpo. */}
        <span
          aria-hidden
          className={cn(
            "mt-9 block h-px w-full",
            dark ? "bg-ivory/15" : "bg-hairline"
          )}
        />
      </Reveal>
    );
  }

  // ── Cabecera apilada (la voz por defecto de la casa) ─────────────
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col sm:mb-16",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {(chapter || eyebrow) && (
        <p
          className={cn(
            "mb-5 flex items-center gap-4",
            centered && "justify-center"
          )}
        >
          {chapter && (
            <span
              aria-hidden
              className="editorial-index gold-text font-display text-title font-medium leading-none"
            >
              {chapter}
            </span>
          )}
          {chapter && (
            <span
              aria-hidden
              className={cn(
                "h-px w-12",
                dark ? "bg-champagne/50" : "bg-champagne-deep/45"
              )}
            />
          )}
          {eyebrow && (
            <span
              className={cn(
                "text-label uppercase",
                dark ? "text-champagne-light" : "text-champagne-bronze"
              )}
            >
              {eyebrow}
            </span>
          )}
        </p>
      )}

      {heading}

      {lede && <div className="mt-6 max-w-measure">{lede}</div>}
    </Reveal>
  );
}

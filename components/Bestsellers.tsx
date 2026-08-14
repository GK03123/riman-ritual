import Image from "next/image";
import { BESTSELLERS } from "@/lib/products";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CatalogLink from "./CatalogLink";

// ─── Capítulo 02 · Lo que más me piden ──────────────────────────────
// Un ranking maquetado en rejilla uniforme deja de ser un ranking: si el
// puesto 2 y el puesto 7 ocupan la misma caja, el orden hay que leerlo
// en el numeral, nunca se ve.
//
// Aquí el ranking baja en tres escalones —la nº 1 a todo lo ancho, la
// 2 y la 3 a media página, y la cola en fila de cuatro—, así que la
// jerarquía se percibe antes de leer una sola cifra.
//
// El capítulo abre con sus manos, no con un producto suelto: el segundo
// recorte del set son dos envases de RIMAN sostenidos por ella, con su
// cara desenfocada detrás. Es literalmente la escena que titula el
// capítulo, y evita que el bloque más comercial de la página empiece
// con una ficha de catálogo.

export default function Bestsellers() {
  const [first, second, third, ...rest] = BESTSELLERS.slice(0, 7);

  return (
    <section
      id="bestsellers"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-14 pt-section sm:px-6 lg:pb-20"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-center lg:gap-14">
        <SectionHeading
          chapter="02"
          align="left"
          eyebrow="Lo que más me piden"
          className="mb-0 sm:mb-0"
          title={
            <>
              Las que <em className="italic text-champagne-deep">no paran</em>{" "}
              de salir
            </>
          }
          subtitle="El orden sale de los pedidos de cada mes."
        />

        <Reveal delay={0.1}>
          <figure className="relative aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[5/4]">
            <Image
              src="/founder/eilin-manos.webp"
              alt="Eilin Guependo sostiene un tarro y un frasco de RIMAN con las dos manos"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover object-top"
            />
          </figure>
        </Reveal>
      </div>

      {/* El filete cierra la apertura y separa el capítulo del ranking. */}
      <span aria-hidden className="mb-10 mt-9 block h-px w-full bg-hairline sm:mb-12" />

      {/* Primer escalón: la pieza nº 1 a todo lo ancho */}
      <Reveal>
        <ProductCard product={first} showRank variant="featured" />
      </Reveal>

      {/* Segundo escalón: el resto del podio, a media página */}
      {(second || third) && (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-6">
          {[second, third].filter(Boolean).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} showRank variant="duo" />
            </Reveal>
          ))}
        </div>
      )}

      {/* Tercer escalón: la cola del ranking */}
      {rest.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-6 lg:grid-cols-4">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 0.06, 0.24)}>
              <ProductCard product={p} showRank />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-12 flex justify-center sm:mt-14">
        <CatalogLink />
      </Reveal>
    </section>
  );
}

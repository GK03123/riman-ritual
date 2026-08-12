import { BESTSELLERS } from "@/lib/products";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CatalogLink from "./CatalogLink";

// ─── Capítulo 02 · Los más pedidos ──────────────────────────────────
// Un ranking maquetado en rejilla uniforme deja de ser un ranking: si el
// puesto 2 y el puesto 7 ocupan la misma caja, el orden hay que leerlo
// en el numeral, nunca se ve.
//
// Aquí el ranking baja en tres escalones —la nº 1 a todo lo ancho, la
// 2 y la 3 a media página, y la cola en fila de cuatro—, así que la
// jerarquía se percibe antes de leer una sola cifra. De paso, los dos
// escalones altos son justo los que llevan numeral de oro (solo el podio
// lo lleva), y el sistema encaja sin repetir información.

export default function Bestsellers() {
  const [first, second, third, ...rest] = BESTSELLERS.slice(0, 7);

  return (
    <section
      id="bestsellers"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-14 pt-section sm:px-6 lg:pb-20 lg:pt-section-lg"
    >
      <SectionHeading
        chapter="02"
        variant="spread"
        eyebrow="Lo más pedido"
        title={
          <>
            Lo que más <em className="italic text-champagne-deep">se repite</em>{" "}
            en los pedidos
          </>
        }
        subtitle="No es un ranking de marketing: es el orden real en que salen de la boutique, mes tras mes."
      />

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

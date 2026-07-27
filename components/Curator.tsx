"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/products";
import { productUrl } from "@/lib/site";
import { useProductDrawer } from "@/lib/product-drawer";
import { EASE } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";
import Reveal from "./Reveal";
import SaveButton from "./SaveButton";
import Signature from "./Signature";

// ─── Mi selección: los tres con los que Eilin arranca a cualquiera ──
// Ids reales del catálogo. La razón va en su voz, no en jerga de marca.
const PICKS: { id: number; reason: string }[] = [
  {
    id: 52745, // Radiansome Cream, bestseller nº 1
    reason:
      "Si solo te llevas una cosa de esta página, que sea esta crema. Es la que más repito y la primera que recomiendo.",
  },
  {
    id: 53140, // Derm First Package (booster + sérum)
    reason:
      "El dúo con el que empiezan casi todas mis clientas. Se siente en la piel desde la primera semana.",
  },
  {
    id: 53154, // SPF 50+
    reason:
      "Innegociable. Todo lo que tu rutina construye de noche, el sol lo borra de día si no la proteges.",
  },
];

const pickProducts = PICKS.flatMap(({ id, reason }) => {
  const product = PRODUCTS.find((p) => p.id === id);
  return product ? [{ product, reason }] : [];
});

function PickRow({
  product,
  reason,
  index,
}: {
  product: Product;
  reason: string;
  index: number;
}) {
  const { open } = useProductDrawer();
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="group flex gap-4 rounded-vitrine border border-hairline bg-ivory p-4 shadow-card transition-all duration-500 ease-editorial hover:-translate-y-0.5 hover:border-champagne/40 hover:shadow-cardHover sm:gap-5 sm:p-5"
    >
      <button
        onClick={() => open(product)}
        aria-label={`Ver ficha de ${product.name}`}
        className="press h-20 w-20 shrink-0 overflow-hidden rounded-seal bg-vitrine-radial sm:h-24 sm:w-24"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          width={192}
          height={192}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-1.5 transition-transform duration-500 ease-editorial group-hover:scale-105"
        />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          {/* -my-1/py-1: el nombre a 15px mide 21 px de alto, por debajo
              del mínimo de 24×24 de WCAG 2.2. El padding le da área sin
              mover una sola línea de la maqueta. */}
          <Link
            href={`/producto/${product.id}`}
            className="-my-1 py-1 text-[15px] font-medium leading-snug text-ink transition-colors hover:text-champagne-deep"
          >
            {product.name}
          </Link>
          <SaveButton product={product} className="shrink-0" />
        </div>
        <p className="mt-1.5 text-note italic text-stone-dark">
          “{reason}”
        </p>
        <div className="mt-2.5 flex items-center gap-4">
          <span className="font-display text-lg font-medium text-champagne-bronze">
            {formatPrice(product.price)}
          </span>
          <a
            href={productUrl(product.id)}
            target="_blank"
            rel="noopener sponsored"
            className="-my-3 flex min-h-[44px] items-center gap-1 py-3 text-micro uppercase tracking-wide2 text-ink transition-colors hover:text-champagne-deep"
          >
            Comprar <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.li>
  );
}

export default function Curator() {
  return (
    <section
      id="curador"
      className="relative scroll-mt-24 overflow-hidden border-y border-hairline bg-ivory py-section lg:py-section-xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,#EFE6D3_0%,transparent_70%)]"
      />
      {/* Inicial gigante de fondo. Antes se salía por el borde izquierdo y
          chocaba con el titular: ahora vive en la banda derecha, recortada
          por el overflow de la sección, donde no compite con nada. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 top-24 select-none font-display text-[20rem] font-normal italic leading-none text-champagne/[0.07] lg:-right-24 lg:text-[34rem]"
      >
        E
      </span>

      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Columna editorial: titular + retrato + firma */}
        <div>
          <Reveal>
            <p className="mb-6 flex items-center gap-4">
              <span
                aria-hidden
                className="editorial-index gold-text font-display text-title font-medium leading-none"
              >
                04
              </span>
              <span className="h-px w-12 bg-champagne-deep/45" aria-hidden />
              <span className="text-label uppercase text-champagne-bronze">
                La curadora
              </span>
            </p>
            <h2 className="font-display text-display-lg font-normal">
              Curada por
              <br />
              <em className="italic text-champagne-deep">Eilin Guependo</em>
            </h2>
          </Reveal>

          {/* Retrato con reveal editorial: la máscara se abre, sin parallax */}
          <motion.figure
            initial={{ opacity: 0, clipPath: "inset(12% 12% 12% 12%)", scale: 1.05 }}
            whileInView={{
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
            }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="museum-frame photo-warm relative mt-10 max-w-sm"
          >
            <Image
              src="/founder/eilin-retrato.jpg"
              alt="Eilin Guependo, curadora de la boutique"
              width={640}
              height={853}
              sizes="(max-width: 640px) 90vw, 384px"
              className="aspect-[3/4] w-full object-cover object-[50%_18%] shadow-vitrine"
            />
            <figcaption className="mt-4 flex items-center gap-3 text-micro uppercase text-stone-dark">
              <span className="h-px w-8 bg-champagne-deep/50" aria-hidden />
              Eilin Guependo · Curadora
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Signature width={196} />
          </motion.div>
        </div>

        {/* Columna de contenido: carta + su selección */}
        <div>
          <Reveal delay={0.15}>
            <p className="dropcap font-display text-lede font-normal text-ink">
              La rutina coreana llegó a mi vida como llegan las mejores cosas:
              sin prisa. Al principio fue curiosidad por una crema, luego un
              ritual entero, y un día me di cuenta de que el orden en que me
              aplicaba las cosas había dejado de parecerme complicado.
            </p>

            {/* Cita destacada: el momento de "segundo vistazo" de la carta */}
            <blockquote className="my-8 border-l-2 border-champagne-deep/60 py-1 pl-6">
              <p className="pull-quote font-display text-title font-normal italic leading-snug text-ink">
                Aquí solo hay productos que le recomendaría a mi hermana
              </p>
            </blockquote>

            <p className="text-body text-stone-dark">
              Esta boutique es la selección que llevo años armando en cuadernos
              y notas de voz. Nada entró por catálogo: todo pasó primero por mi
              cara o por la de alguien a quien le respondo. Trabajo tres líneas:
              Incellderm para el skincare, BOTALAB para el cuerpo y el cabello,
              y Lifening para los suplementos que sostienen la piel desde
              adentro.
            </p>
          </Reveal>

          {/* Mi selección: la founder empuja al producto, nunca al revés */}
          <div className="mt-10">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 text-label uppercase text-champagne-bronze">
                <span className="h-px w-10 bg-champagne-deep" aria-hidden />
                Mi selección para empezar
              </p>
            </Reveal>
            <ul className="space-y-3">
              {pickProducts.map(({ product, reason }, i) => (
                <PickRow
                  key={product.id}
                  product={product}
                  reason={reason}
                  index={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

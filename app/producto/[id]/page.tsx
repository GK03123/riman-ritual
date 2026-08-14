import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, PackageOpen, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { SITE, productUrl } from "@/lib/site";
import { benefitLabel, phaseLabel } from "@/lib/merch";
import { eilinNote } from "@/lib/notes";
import { formatPrice } from "@/lib/utils";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/pdp/Gallery";
import SaveButton from "@/components/SaveButton";

interface Props {
  params: { id: string };
}

const findProduct = (id: string) => PRODUCTS.find((p) => String(p.id) === id);

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = findProduct(params.id);
  if (!product) return {};
  // El título va sin la marca: la plantilla del layout raíz ya la añade.
  const description =
    eilinNote(product.id) ?? product.shortDescription ?? product.description;
  return {
    title: product.name,
    description,
    ...(SITE.url && {
      alternates: { canonical: `/producto/${product.id}` },
    }),
    openGraph: {
      title: `${product.name} · ${SITE.brandName}`,
      description,
      type: "website",
      locale: "es_US",
      siteName: SITE.brandName,
      ...(SITE.url && { url: `${SITE.url}/producto/${product.id}` }),
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · ${SITE.brandName}`,
      description,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = findProduct(params.id);
  if (!product) notFound();

  const gallery = product.gallery.length ? product.gallery : [product.image];
  const phase = phaseLabel(product.menu);
  const benefit = benefitLabel(product.menu);
  const note = eilinNote(product.id);

  const complements = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      p.categories.some((c) => product.categories.includes(c)) &&
      !p.isPackage
  ).slice(0, 4);

  // Datos estructurados honestos: solo lo que sabemos del API. No se
  // declara aggregateRating ni review porque no tenemos reseñas por
  // producto, y Google penaliza el marcado de valoraciones inventado.
  //
  // El enlace de la oferta es el de la tienda oficial con el código de
  // afiliada de Eilin: es donde ocurre la compra de verdad, así que es la
  // URL honesta para el Offer.
  const canonical = SITE.url ? `${SITE.url}/producto/${product.id}` : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        ...(canonical && { "@id": `${canonical}#product`, url: canonical }),
        name: product.name,
        image: gallery,
        description: note ?? product.description,
        sku: String(product.id),
        category: product.menu,
        brand: { "@type": "Brand", name: product.brand },
        ...(product.line && { model: product.line }),
        ...(product.price !== null && {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            url: productUrl(product.id),
            seller: { "@type": "Organization", name: "RIMAN" },
          },
        }),
      },
      ...(canonical
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: SITE.brandName,
                  item: SITE.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: product.name,
                  item: canonical,
                },
              ],
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="contenido" className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Breadcrumb */}
        <nav aria-label="Volver" className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 py-2 text-label uppercase text-stone-dark transition-colors hover:text-champagne-deep"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Volver a la boutique
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Gallery
            images={gallery}
            alt={product.name}
            badge={
              product.bestsellerRank !== null
                ? `Bestseller Nº ${product.bestsellerRank}`
                : product.isPackage
                  ? "Set completo"
                  : null
            }
          />

          {/* Información y compra */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-label uppercase text-champagne-bronze">
                <span className="h-px w-8 bg-champagne-deep" aria-hidden />
                {product.line || product.brand}
                {benefit && <span className="text-stone-dark">· {benefit}</span>}
              </p>
              <h1 className="text-balance font-display text-display-sm font-normal">
                {product.name}
              </h1>
              <p className="mt-5 font-display text-display-sm font-medium text-champagne-deep">
                {formatPrice(product.price)}
              </p>
            </div>

            {phase && (
              <p className="w-fit rounded-seal border border-hairline bg-porcelain px-4 py-2 text-micro uppercase tracking-wide2 text-stone-dark">
                {phase}
              </p>
            )}

            {/* La nota de Eilin manda; la descripción original de la marca
                queda disponible como letra pequeña honesta. */}
            {note ? (
              <div className="border-l-2 border-champagne/50 pl-4">
                <p className="mb-1.5 text-micro uppercase text-champagne-bronze">
                  La nota de Eilin
                </p>
                <p className="max-w-prose text-body text-ink/80">{note}</p>
              </div>
            ) : (
              product.description && (
                <p className="max-w-prose text-body text-stone-dark">
                  {product.description}
                </p>
              )
            )}
            {note && product.description && (
              <details>
                <summary className="cursor-pointer list-none text-micro uppercase tracking-wide2 text-stone transition-colors hover:text-champagne-deep">
                  Descripción original de la marca +
                </summary>
                <p className="mt-2 max-w-prose text-xs leading-relaxed text-stone">
                  {product.description}
                </p>
              </details>
            )}

            {product.kit.length > 0 && (
              <div className="border-t border-hairline pt-6">
                <p className="mb-3 flex items-center gap-2 text-label uppercase text-ink">
                  <PackageOpen className="h-3.5 w-3.5" /> Contenido de la rutina
                </p>
                <ul className="space-y-1.5">
                  {product.kit.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-dark">
                      <span className="mt-2 h-px w-3 shrink-0 bg-champagne-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto space-y-5 border-t border-hairline pt-6">
              <div className="hidden gap-3 lg:flex">
                <a
                  href={productUrl(product.id)}
                  target="_blank"
                  rel="noopener sponsored"
                  className="press sheen group flex flex-1 items-center justify-center gap-2 bg-ink px-8 py-4 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                >
                  Comprar en la boutique oficial
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <SaveButton product={product} variant="bar" className="h-auto" />
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-micro uppercase tracking-wide2 text-stone-dark">
                <li className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-champagne-deep" /> Envío desde EE. UU.
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-champagne-deep" /> Producto original
                </li>
                <li className="flex items-center gap-1.5">
                  <Undo2 className="h-3.5 w-3.5 text-champagne-deep" /> Devoluciones con garantía
                </li>
              </ul>
              <p className="text-xs leading-relaxed text-stone-dark">
                El enlace abre la ficha oficial de RIMAN con mi código de
                afiliada. El precio y la disponibilidad se confirman ahí al
                momento de la compra.
              </p>
            </div>
          </div>
        </div>

        {/* Complementos */}
        {complements.length > 0 && (
          <section className="mt-16 border-t border-hairline pt-10 lg:mt-24">
            <h2 className="mb-8 font-display text-display-sm font-normal">
              Complementa tu <em className="italic text-champagne-deep">rutina</em>
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {complements.map((c) => (
                <Link
                  key={c.id}
                  href={`/producto/${c.id}`}
                  className="group flex flex-col rounded-vitrine border border-hairline bg-ivory p-4 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-champagne/40 hover:shadow-cardHover"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, 300px"
                    className="mb-4 aspect-square w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <p className="text-micro uppercase text-stone-dark">
                    {c.line || c.brand}
                  </p>
                  <h3 className="mt-1 text-[15px] font-medium leading-snug text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-2 font-display text-lg font-medium text-champagne-bronze">
                    {formatPrice(c.price)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Espacio para la barra fija en móvil */}
        <div className="h-20 lg:hidden" aria-hidden />
      </main>

      {/* Barra de compra fija en móvil */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-hairline bg-ivory/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-micro uppercase tracking-wide2 text-stone-dark">
            {product.line || product.brand}
          </p>
          <p className="font-display text-2xl font-medium leading-tight text-champagne-deep">
            {formatPrice(product.price)}
          </p>
        </div>
        <SaveButton product={product} variant="bar" />
        <a
          href={productUrl(product.id)}
          target="_blank"
          rel="noopener sponsored"
          className="press group flex shrink-0 items-center gap-2 bg-ink px-6 py-3.5 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
        >
          Comprar
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <Footer />
    </>
  );
}

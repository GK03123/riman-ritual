import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { SITE } from "@/lib/site";
import { ProductDrawerProvider } from "@/lib/product-drawer";
import { CatalogProvider } from "@/lib/catalog-overlay";
import { RitualBagProvider } from "@/lib/ritual-bag";
import MotionProvider from "@/components/motion/MotionProvider";
import ProductDrawer from "@/components/ProductDrawer";
import CatalogOverlay from "@/components/CatalogOverlay";
import BagDrawer from "@/components/BagDrawer";
import "./globals.css";

// Bodoni Moda: la didone de portada. Solo para los momentos grandes;
// por debajo de ~28px sus trazos finos desaparecen y manda Jost.
//
// Aquí había un `adjustFontFallback: false`. En `next dev` no pasaba
// nada, pero en el build de producción next/font generaba dos hashes
// distintos para la misma fuente: el <html> salía con la clase
// `__variable_f1e6c4` y el CSS definía la variable en `.__variable_47f8ee`.
// Ninguna regla casaba, `--font-display` quedaba vacía y la declaración
// `font-family: var(--font-display), Didot, Georgia, serif` se volvía
// inválida, así que TODA la tipografía de display —el masthead, los
// titulares de capítulo, los precios— caía al sans heredado del body. El
// sitio se publicaba sin su didone y en local no se veía.
// Sin esa opción los dos hashes coinciden. La cadena de reserva medida a
// mano ("Bodoni Fallback", 104,18 % del avance de Georgia) sigue en su
// sitio y sigue evitando el salto de layout al entrar la fuente real.
const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Bodoni Fallback", "Georgia", "Didot", "serif"],
  variable: "--font-display",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const DESCRIPTION =
  "Soy Eilin Guependo y te ayudo con el skincare coreano de RIMAN. Dime cómo está tu piel y te digo por dónde empezar. Envío desde Estados Unidos.";

const TITLE = `${SITE.brandName} · Boutique de skincare coreano`;

// Tarjeta de enlace. El sitio se comparte por historias de Instagram y por
// WhatsApp, así que la vista previa es lo primero que ve casi todo el
// mundo: es la misma portada del número, con su recorte sobre porcelana.
// Solo se emite con dominio configurado; sin metadataBase, Next resolvería
// la ruta relativa contra localhost y publicaría una imagen rota.
const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE.brandName} sosteniendo un frasco de RIMAN`,
};

export const metadata: Metadata = {
  // Con metadataBase, Next resuelve a absoluto cualquier ruta relativa de
  // Open Graph y de canonical. Sin dominio configurado se omite, y Next
  // se limita a no emitir esas etiquetas en vez de inventarse un origen.
  ...(SITE.url && { metadataBase: new URL(SITE.url) }),
  title: {
    default: TITLE,
    // Las fichas ponen su propio nombre; la plantilla añade la casa.
    template: `%s · ${SITE.brandName}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.brandName,
  authors: [{ name: SITE.brandName }],
  creator: SITE.brandName,
  ...(SITE.url && { alternates: { canonical: "/" } }),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "es_US",
    siteName: SITE.brandName,
    ...(SITE.url && { url: SITE.url, images: [OG_IMAGE] }),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    ...(SITE.url && { images: [OG_IMAGE.url] }),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: "#F7F4EF",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Sin JS las animaciones de entrada nunca corren y el contenido
            quedaría en su estado inicial (opacity 0). Esto lo revela. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `[style*="opacity:0"]{opacity:1!important;transform:none!important}`,
            }}
          />
        </noscript>
      </head>
      <body className="font-sans">
        <a
          href="#contenido"
          /* Al recibir foco tiene que ser un objetivo de 44 px como
             cualquier otro control, no una tira de texto de treinta. */
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:min-h-[44px] focus:items-center focus:bg-ink focus:px-5 focus:py-3 focus:text-[11px] focus:uppercase focus:tracking-micro focus:text-ivory"
        >
          Saltar al contenido
        </a>
        <MotionProvider>
          <RitualBagProvider>
          <CatalogProvider>
            <ProductDrawerProvider>
              {children}
              <CatalogOverlay />
              <ProductDrawer />
              <BagDrawer />
            </ProductDrawerProvider>
          </CatalogProvider>
          </RitualBagProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

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
// Next no tiene métricas de sustitución para Bodoni Moda ("Failed to find
// font override values"), así que su ajuste automático se desactiva y se
// usa el fallback medido a mano de globals.css: Bodoni mide 104,18 % del
// avance de Georgia, y esa es la corrección que evita el salto de layout
// cuando entra la fuente real.
const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: false,
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
    ...(SITE.url && { url: SITE.url }),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-[11px] focus:uppercase focus:tracking-micro focus:text-ivory"
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

import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bestsellers from "@/components/Bestsellers";
import SkinDiagnostic from "@/components/SkinDiagnostic";
import Curator from "@/components/Curator";
import Story from "@/components/Story";
import Rituals from "@/components/Rituals";
import JejuFilm from "@/components/JejuFilm";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SITE, instagramUrl, productUrl } from "@/lib/site";
import { BESTSELLERS } from "@/lib/products";

// El sumario del número, en orden:
// 01 portada · 02 lo que más me piden · 03 la consulta ·
// 04 quién está detrás · 05 Riman · 06 las rutinas · 07 el origen ·
// 08 lo que me escriben.
//
// El número tiene dos actos y una bisagra. Los cuatro primeros capítulos
// son papel claro y hablan en primera persona; el 06 y el 07 se van a
// jade y habla la marca; el 08 vuelve a la porcelana para cerrar con
// quien compró y con Eilin. El 05 es la bisagra: la doble página a
// sangre que lleva del "yo" al "de dónde sale esto" sin que el salto de
// tono se note.
//
// FAQ, el cierre (FinalCTA) y el capítulo de ciencia (Ingredient) se
// retiraron a petición de la clienta; sus componentes siguen en el
// repositorio por si se vuelven a montar. El único CTA de catálogo
// permanente es el del header, así que el remate de venta vive dentro
// del capítulo 08 y no en una sección aparte.
// Datos estructurados de la portada. Describen tres cosas que un
// buscador (o un asistente que responda "dónde compro skincare coreano
// en Estados Unidos") no puede deducir del texto: quién es Eilin y dónde
// se la encuentra, que aquí se vende, y cuáles son las piezas que más
// salen. Nada de valoraciones ni de cifras de ventas: no las tenemos, y
// ningún título profesional: no lo hay.
function homeJsonLd() {
  const base = SITE.url || undefined;
  const instagram = instagramUrl() || undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        ...(base && { "@id": `${base}#eilin` }),
        name: SITE.brandName,
        description:
          "Recomiendo tres líneas de skincare coreano de RIMAN y ayudo a elegir por dónde empezar. Envío desde Estados Unidos.",
        // sameAs es lo que le permite a un buscador atar esta página con
        // la cuenta donde publica: sin él, Eilin y @eilin_guependo son dos
        // entidades sueltas que nadie relaciona.
        ...(instagram && { sameAs: [instagram] }),
      },
      {
        "@type": "OnlineStore",
        ...(base && { "@id": `${base}#boutique`, url: base }),
        name: SITE.brandName,
        description: SITE.tagline,
        areaServed: { "@type": "Country", name: "United States" },
        currenciesAccepted: "USD",
        ...(base && { founder: { "@id": `${base}#eilin` } }),
      },
      {
        "@type": "WebSite",
        ...(base && { "@id": `${base}#sitio`, url: base }),
        name: SITE.brandName,
        inLanguage: "es-US",
        ...(base && { publisher: { "@id": `${base}#boutique` } }),
      },
      {
        "@type": "ItemList",
        name: "Lo más pedido de la boutique",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: BESTSELLERS.slice(0, 7).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.name,
            image: p.image,
            brand: { "@type": "Brand", name: p.brand },
            ...(base && { url: `${base}/producto/${p.id}` }),
            ...(p.price !== null && {
              offers: {
                "@type": "Offer",
                price: p.price,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: productUrl(p.id),
              },
            }),
          },
        })),
      },
    ],
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }}
      />
      <AnnouncementBar />
      <Header />
      <main id="contenido">
        <Hero />
        <Bestsellers />
        <SkinDiagnostic />
        <Curator />
        <Story />
        <Rituals />
        <JejuFilm />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

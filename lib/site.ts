// ─── Configuración central del sitio ───────────────────────────────
// Todo lo que cambia por clienta vive aquí: un solo archivo para
// personalizar marca, enlace de afiliada y contacto.

export const SITE = {
  brandName: "Eilin Guependo",
  tagline: "Boutique de skincare coreano con envío desde Estados Unidos",

  // Dominio público de la boutique, sin barra final. Es lo único que el
  // SEO no puede deducir solo: hace falta para el canonical, el sitemap y
  // para que las imágenes de Open Graph se resuelvan absolutas.
  //
  // Se lee de NEXT_PUBLIC_SITE_URL para no dejar un dominio inventado en
  // el código. Mientras esté vacío, el sitio no emite canonical ni
  // sitemap —prefiero no emitirlos a emitirlos apuntando a localhost, que
  // es la manera rápida de desindexarse— y todo lo demás (metadatos,
  // Open Graph, datos estructurados) sigue funcionando igual.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, ""),

  // Slug de afiliada RIMAN de la clienta. Este slug se inyecta en
  // cada enlace de producto que se genera con productUrl().
  affiliateSlug: "miraeseglow",
  country: "US",
  lang: "en-US",

  // WhatsApp de la clienta con código de país, solo dígitos.
  // Dejar vacío ("") para ocultar el botón flotante.
  whatsapp: "",

  // Promo vigente en la tienda destino. Editar o dejar "" para mostrar
  // los mensajes permanentes de la barra (envío, garantía, devoluciones).
  promo: "",
} as const;

export function productUrl(id: number): string {
  return `https://mall.riman.com/${SITE.affiliateSlug}/products/${id}?country=${SITE.country}&lang=${SITE.lang}`;
}

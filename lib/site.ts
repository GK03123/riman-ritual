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

  // Instagram de la clienta: el usuario a secas, sin arroba, sin URL y sin
  // los parámetros de seguimiento que la app añade al compartir. Aquí es
  // donde vive su día a día, que es la prueba de que detrás de esta página
  // hay una persona y no un catálogo. Dejar vacío ("") y no se pinta
  // ningún enlace en ningún sitio, igual que con whatsapp.
  instagram: "eilin_guependo",

  // Promo vigente en la tienda destino. Editar o dejar "" para mostrar
  // los mensajes permanentes de la barra (envío, garantía, devoluciones).
  promo: "",
} as const;

export function productUrl(id: number): string {
  return `https://mall.riman.com/${SITE.affiliateSlug}/products/${id}?country=${SITE.country}&lang=${SITE.lang}`;
}

/** Perfil de Instagram, o cadena vacía si no hay cuenta configurada.
 *
 *  Devolver "" en vez de undefined deja el guardado en un solo sitio: quien
 *  lo consume solo tiene que preguntar si hay cadena. */
export function instagramUrl(): string {
  return SITE.instagram ? `https://www.instagram.com/${SITE.instagram}` : "";
}

/** El arroba tal y como se escribe en pantalla. Vacío si no hay cuenta. */
export const instagramHandle = SITE.instagram ? `@${SITE.instagram}` : "";

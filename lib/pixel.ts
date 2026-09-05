"use client";

// ─── Los eventos que se le mandan a Meta ────────────────────────────
// Con solo la vista de página, una campaña no puede optimizar: Meta
// necesita saber qué visitas acaban en algo. Aquí vive ese "algo", en un
// solo sitio, para que se pueda leer de una vez qué sale de la boutique
// hacia Meta y qué no.
//
// Lo que NO se manda, y conviene que quede escrito: ningún dato personal.
// Ni correo, ni teléfono, ni nombre. La página no los pide y aquí no se
// inventa ninguno. Lo que viaja son identificadores de producto del
// catálogo público de RIMAN y precios de su tarifa.
//
// La compra de verdad ocurre en mall.riman.com, fuera de este dominio y
// sin manera de que nos avise. Por eso aquí no existe el evento Purchase:
// lo más cerca que se puede estar de la conversión es el momento en que
// alguien sale hacia la tienda, y eso es InitiateCheckout.

import { PRODUCTS, type Product } from "./products";
import { SITE } from "./site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// El script de Meta carga después de la hidratación (ver MetaPixel.tsx),
// así que un evento puede nacer antes que él: abrir una ficha por enlace
// directo dispara ViewContent en el primer efecto. En vez de perderlo, se
// guarda y sale en cuanto el script está listo.
const cola: unknown[][] = [];

function enviar(...args: unknown[]): void {
  if (!SITE.metaPixelId || typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq(...args);
    return;
  }
  cola.push(args);
}

/** La llama MetaPixel en cuanto el script de Meta ha corrido. */
export function vaciarCola(): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  while (cola.length) window.fbq(...(cola.shift() as unknown[]));
}

const porId = (id: number): Product | null =>
  PRODUCTS.find((p) => p.id === id) ?? null;

/** El bloque de datos que Meta espera de un producto. Los identificadores
 *  son los del catálogo de RIMAN, así que si algún día se sube un catálogo
 *  a Meta para anuncios dinámicos, las piezas ya casan. */
function contenido(p: Product) {
  return {
    content_type: "product",
    content_ids: [String(p.id)],
    content_name: p.name,
    content_category: p.menu,
    ...(p.price !== null && { value: p.price, currency: "USD" }),
  };
}

/** Alguien abre una ficha, sea la página entera o la ficha rápida. */
export function verProducto(product: Product | number): void {
  const p = typeof product === "number" ? porId(product) : product;
  if (p) enviar("track", "ViewContent", contenido(p));
}

/** Alguien guarda una pieza en "Mi rutina". Es la lista de deseos de la
 *  casa, así que el evento que le corresponde es AddToCart. */
export function guardarEnRutina(productos: Product[]): void {
  if (productos.length === 0) return;
  enviar("track", "AddToCart", {
    content_type: "product",
    content_ids: productos.map((p) => String(p.id)),
    contents: productos.map((p) => ({ id: String(p.id), quantity: 1 })),
    value: productos.reduce((suma, p) => suma + (p.price ?? 0), 0),
    currency: "USD",
    num_items: productos.length,
  });
}

/** Alguien pulsa un enlace de afiliada y sale hacia la tienda oficial.
 *  Es lo más parecido a una conversión que esta página puede observar. */
export function salirALaBoutique(id: number): void {
  const p = porId(id);
  enviar("track", "InitiateCheckout", {
    ...(p ? contenido(p) : { content_type: "product", content_ids: [String(id)] }),
    num_items: 1,
  });
}

/** Alguien busca en el catálogo.
 *
 *  Aviso medido, para que nadie espere de este evento lo que no da: el
 *  script de Meta filtra `search_string` antes de mandarlo. Se envía
 *  igual, porque es el parámetro estándar del evento y ese filtro depende
 *  de la configuración de la cuenta, pero hoy lo que llega es solo que
 *  hubo una búsqueda y cuántos resultados dio. Sigue sirviendo para lo
 *  que más importa aquí: saber cuánta gente busca y se queda sin nada
 *  (num_items en cero). */
export function buscarEnCatalogo(consulta: string, resultados: number): void {
  enviar("track", "Search", {
    search_string: consulta,
    content_type: "product",
    num_items: resultados,
  });
}

/** Alguien termina la consulta y se lleva su rutina.
 *
 *  Va como CustomizeProduct, que es el evento estándar de Meta para
 *  "configurar un producto con una herramienta". Es literalmente lo que
 *  hace el cuestionario, y al ser estándar entra en la optimización de
 *  campañas y en los públicos sin tener que declarar nada a mano. */
export function rutinaArmada(pasos: Product[], total: number): void {
  enviar("track", "CustomizeProduct", {
    content_type: "product",
    content_ids: pasos.map((p) => String(p.id)),
    contents: pasos.map((p) => ({ id: String(p.id), quantity: 1 })),
    value: total,
    currency: "USD",
    num_items: pasos.length,
  });
}

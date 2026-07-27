import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";

/** Sitemap: la portada y las 37 fichas de producto.
 *
 *  Sin dominio configurado devuelve vacío a propósito. Un sitemap con
 *  URLs de localhost es peor que no tener sitemap: se envía a Search
 *  Console, se rastrea, y todo lo que hay dentro es inalcanzable. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.url) return [];

  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/producto/${p.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // El podio de bestsellers pesa más que el resto del catálogo.
      priority: p.bestsellerRank !== null && p.bestsellerRank <= 3 ? 0.9 : 0.7,
    })),
  ];
}

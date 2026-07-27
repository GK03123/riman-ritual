import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Boutique pública: se rastrea entera. La línea del sitemap solo se
 *  emite cuando hay dominio configurado (ver lib/site.ts). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(SITE.url && { sitemap: `${SITE.url}/sitemap.xml` }),
  };
}

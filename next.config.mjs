/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // ─── Sin optimizador de imágenes ─────────────────────────────────
    // El plan de Vercel de esta cuenta agotó la cuota de Image
    // Optimization: toda petición a /_next/image que no estuviera ya en
    // caché devolvía 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED). No
    // era cosa solo del catálogo remoto: /founder/eilin-retrato.jpg
    // fallaba igual. Con la caché caducando, la página se quedaba sin
    // una sola fotografía.
    //
    // Servir el original es lo correcto aquí, no un parche:
    //   · Las 120 fichas del catálogo son PNG de cdn.rimanbuild.com, el
    //     CDN oficial de RIMAN. Vienen a 348×448 y unos 90 KB, con su
    //     propia caché de CloudFront. Pasarlas por un segundo
    //     optimizador no aportaba nada y se comía la cuota entera.
    //   · Las fotos de Eilin ya están preparadas en /public a la medida
    //     a la que se pintan (560–872 px, 48–99 KB, dos ya en WebP). No
    //     hay nada que reescalar.
    //
    // `next/image` se queda: sigue reservando el hueco con width/height
    // o con fill, así que el CLS sigue siendo cero, y mantiene loading,
    // decoding y el preload del LCP. Lo único que desaparece es el
    // srcset, y con él los w=1920/2048/3840 que nunca se usaban.
    //
    // Si algún día se sube de plan en Vercel, basta con quitar esta
    // línea: los `sizes` de cada componente siguen escritos y correctos.
    unoptimized: true,
    // Se conservan para ese día.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.rimanbuild.com" },
    ],
  },
};

export default nextConfig;

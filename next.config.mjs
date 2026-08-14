/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las fotos de Eilin son el activo pesado de la página y una de ellas
    // es el LCP. Con el optimizador activo, Next sirve AVIF/WebP en la
    // medida exacta que pide cada `sizes`, así que el móvil deja de
    // descargar un recorte de 872 px de ancho para pintarlo a 280.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.rimanbuild.com" },
    ],
  },
};

export default nextConfig;

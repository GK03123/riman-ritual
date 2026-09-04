"use client";

// ─── Píxel de Meta ──────────────────────────────────────────────────
// Cuenta cuánta gente pasa por la boutique y deja medir las campañas de
// Instagram y Facebook. Dos cuidados que el fragmento que da Meta no
// trae de fábrica:
//
//   · Carga después de la hidratación, no en el <head>. El script de
//     Meta pesa unos 80 KB y sale de connect.facebook.net. Metido arriba
//     compite por el ancho de banda con el retrato de portada, que es el
//     LCP, y era exactamente la fuga que se acaba de tapar en la ficha.
//     Con `afterInteractive` la primera pantalla se pinta primero y la
//     vista se cuenta igual.
//
//   · Vuelve a contar al cambiar de ruta. Aquí la navegación entre la
//     portada y las fichas es de cliente: no hay recarga, así que el
//     fragmento de Meta contaría una sola vista por sesión y las 37
//     fichas quedarían invisibles en las estadísticas.
//
// Con `metaPixelId` vacío en lib/site.ts no se pinta absolutamente nada.

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const primera = useRef(true);

  useEffect(() => {
    if (!SITE.metaPixelId) return;
    // El fragmento ya dispara la vista de entrada al inicializarse. Este
    // efecto también corre en ese primer render, así que se salta una vez
    // para no contar la misma visita dos veces.
    if (primera.current) {
      primera.current = false;
      return;
    }
    // Una limitación de fbevents.js que conviene tener escrita: el script
    // se queda con la URL del momento en que se cargó y no la vuelve a
    // mirar. La visita a una ficha se cuenta bien, pero en el
    // administrador de eventos aparece con la dirección de la portada.
    // Comprobado que no lo arregla ninguna de las salidas evidentes:
    // trackSingle, reinicializar el píxel, ni mandar la ruta como dato
    // propio (en las vistas posteriores a la primera, fbq no la
    // transmite). Si algún día hacen falta cifras por página, la vía es
    // un evento aparte con trackCustom, que sí las lleva.
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (!SITE.metaPixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${SITE.metaPixelId}');
fbq('track','PageView');`}
      </Script>
      {/* Reserva para quien navega sin JavaScript: una imagen de un píxel
          que registra la visita igual.
          Va por dangerouslySetInnerHTML a propósito. Escrito como JSX
          normal, React monta la imagen como un nodo de verdad al hidratar
          y el navegador la descarga aunque haya JavaScript: medido, la
          visita de entrada se contaba dos veces, una con noscript=1 y
          otra sin él. Con el HTML puesto a mano el navegador trata el
          contenido del <noscript> como texto, que es lo que toca. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=${SITE.metaPixelId}&ev=PageView&noscript=1" />`,
        }}
      />
    </>
  );
}

"use client";

// ─── La firma de la casa ────────────────────────────────────────────
// Una sola firma para toda la boutique. Antes cada sitio dibujaba su
// propia onda sinusoidal, y el intento de trazar "Eilin" a mano con
// curvas bézier se leía como otra palabra: una firma que no dice el
// nombre es peor que no tener firma.
//
// Así que el nombre va compuesto en la itálica de la casa —legible,
// inequívoco, del mismo sistema tipográfico que el masthead— y lo
// manuscrito es solo la rúbrica que lo subraya, que es justo lo que
// puede dibujarse sin que signifique nada equivocado.

import { cn } from "@/lib/utils";

interface SignatureProps {
  className?: string;
  /** Bronce sobre papel, champagne sobre jade. */
  tone?: "bronze" | "champagne";
  /** false = la rúbrica aparece dibujada, sin animación de trazo. */
  animate?: boolean;
  /** Ancho total en px; el nombre escala con él. */
  width?: number;
}

export default function Signature({
  className,
  tone = "bronze",
  animate = true,
  width = 190,
}: SignatureProps) {
  const stroke = tone === "champagne" ? "#DFC48C" : "#96793E";

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ width }}
      aria-hidden
    >
      <span
        className="block font-display italic leading-none"
        style={{ fontSize: width * 0.3, color: stroke }}
      >
        Eilin
      </span>
      {/* La rúbrica: un trazo continuo que sale del nombre, lo subraya y
          se cierra en un bucle. Arranca bajo la primera letra. */}
      <svg
        className="mt-0.5 block w-full"
        viewBox="0 0 260 46"
        fill="none"
        focusable="false"
      >
        <path
          className={animate ? "signature-line" : undefined}
          d="M4 26 C 46 8, 104 6, 158 14 C 196 20, 222 30, 236 22 C 245 17, 241 8, 232 11 C 223 14, 226 26, 240 30 C 248 32, 254 30, 258 26"
          stroke={stroke}
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

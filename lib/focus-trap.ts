"use client";

// ─── Contención del foco en los paneles ─────────────────────────────
// Los tres paneles de la boutique (catálogo, ficha rápida y la bolsa) se
// declaran `aria-modal="true"`. Esa promesa es literal: mientras están
// abiertos, el resto de la página no existe. Un lector de pantalla la
// cumple sola, pero el tabulador no: sin esto, tres tabulaciones dentro
// de la ficha llevaban el foco al enlace "Saltar al contenido" que hay
// detrás del velo, y a partir de ahí se recorría a ciegas una página que
// no se ve.
//
// Aquí solo vive la contención. Cada panel sigue encargándose de meter
// el foco al abrir y de devolverlo a quien lo abrió al cerrar, que es
// donde esa lógica se entiende.

import { useEffect, type RefObject } from "react";

/** Los que pueden recibir foco de verdad: los deshabilitados y los que
 *  se sacan del orden con tabindex negativo no cuentan. */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function useFocusTrap(
  active: boolean,
  ref: RefObject<HTMLElement>
): void {
  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const panel = ref.current;
      if (!panel) return;

      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      // Si el foco se fue fuera del panel (o aún no ha entrado), la
      // siguiente tabulación lo devuelve por el extremo que toca.
      if (!panel.contains(current)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [active, ref]);
}

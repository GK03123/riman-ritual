import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// ─── cn(): fusión de clases que conoce la escala de la casa ──────────
// tailwind-merge sin configurar no sabe qué es `text-display-md` ni
// `text-body`, así que los mete en el grupo "color de texto". Cuando en
// la misma llamada venía después un `text-ink`, borraba el tamaño y el
// titular caía a 16px heredados. Registrando aquí los tokens propios,
// cada grupo vuelve a competir solo consigo mismo.

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "micro",
            "label",
            "note",
            "body",
            "lede",
            "title",
            "display-sm",
            "display-md",
            "display-lg",
            "display-xl",
            "masthead",
          ],
        },
      ],
      "font-family": [{ font: ["display", "sans"] }],
      tracking: [{ tracking: ["micro", "wide2", "eyebrow"] }],
      rounded: [{ rounded: ["seal", "vitrine"] }],
      "shadow": [
        {
          shadow: [
            "hairline",
            "card",
            "cardHover",
            "vitrine",
            "drawer",
            "jade-card",
            "focus",
            "paper",
            "gold",
            "plate",
            "flag",
          ],
        },
      ],
      ease: [{ ease: ["editorial", "silk"] }],
      /* Sin esto, `max-w-measure` no pertenece a ningún grupo conocido y
         nunca compite con `max-w-full`: las dos sobreviven y decide el
         orden del CSS, no la llamada. */
      "max-w": [{ "max-w": ["measure", "column", "plate"] }],
      /* Los materiales de la casa se escriben `bg-*`, igual que los
         colores. El grupo de color usa un validador que acepta cualquier
         sufijo, así que sin registrarlos aquí `bg-caustic` se clasificaba
         como color de fondo y un `bg-porcelain` posterior lo borraba. Al
         declararlos como imagen, cada material compite solo con otros
         materiales. */
      "bg-image": [
        {
          bg: [
            "vitrine-radial",
            "champagne-sheen",
            "jade-depth",
            "gold-sheet",
            "gold-hairline",
            "paper-edge",
            "plate-veil",
            "caustic",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null): string {
  if (price === null) return "";
  return `$${price.toFixed(2)}`;
}

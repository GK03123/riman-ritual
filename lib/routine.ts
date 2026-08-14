// ─── Motor del diagnóstico de piel ─────────────────────────────────
// Convierte las respuestas de la consulta en una rutina con productos
// reales del catálogo. Nada se inventa: cada paso sale del menú oficial
// y cada "porqué" se apoya en la descripción de la ficha del producto.

import { PRODUCTS, type Product } from "./products";

export type SkinType = "seca" | "mixta" | "sensible" | "normal";
export type Goal = "hidratacion" | "luminosidad" | "firmeza" | "calma";
export type Level = "esencial" | "completa";

export interface Answers {
  skin: SkinType;
  goal: Goal;
  level: Level;
}

export interface RoutineStep {
  n: string;
  phase: string;
  when: string;
  product: Product;
  why: string;
}

/** Refuerzo interno. No es un paso de la rutina y por eso vive fuera de
 *  `steps`: no lleva numeral ni entra en `total`. */
export interface RoutineExtra {
  phase: string;
  when: string;
  product: Product;
  why: string;
}

export interface RoutinePlan {
  /** Los pasos de la rutina, todos obligatorios y todos numerados. */
  steps: RoutineStep[];
  /** Suma de `steps`, siempre. Es una invariante, no una convención:
   *  mientras `total` se calcule desde `steps` y no haya nada dentro de
   *  `steps` que se excluya, el número del titular no puede dejar de
   *  cuadrar con las filas que se ven debajo. */
  total: number;
  /** El refuerzo desde dentro, cuando el objetivo lo pide. Se pinta
   *  aparte, con su propio precio. */
  extra: RoutineExtra | null;
  kit: Product | null;
  kitNote: string;
}

// IDs del catálogo (lib/products.ts, generado del API oficial).
const ID = {
  cleansingOil: 53156,
  balancingGel: 52785,
  snowEnzyme: 53158,
  powderWash: 53152,
  calmingGel: 53144,
  radiansomeToner: 52743,
  radiansomeEssence: 52747,
  dermFirstPackage: 53140,
  radiansomeCream: 52745,
  dermCream: 53142,
  sunscreen: 53154,
  beautyCollagen: 54387,
  ritualEssential: 53372,
  ritualAdvanced: 53376,
  ritualSignature: 53375,
} as const;

const byId = (id: number): Product | null =>
  PRODUCTS.find((p) => p.id === id) ?? null;

export function buildRoutine(a: Answers): RoutinePlan {
  const steps: RoutineStep[] = [];

  const push = (phase: string, when: string, id: number, why: string) => {
    const product = byId(id);
    if (product) {
      steps.push({
        n: String(steps.length + 1).padStart(2, "0"),
        phase,
        when,
        product,
        why,
      });
    }
  };

  // 1 · Doble limpieza: el aceite abre la rutina completa.
  if (a.level === "completa") {
    push(
      "Limpia",
      "Solo PM",
      ID.cleansingOil,
      "El primer paso de la doble limpieza coreana. El aceite disuelve protector solar y maquillaje sin resecar."
    );
  }

  // 1b · Limpiador base según tipo de piel y objetivo.
  if (a.goal === "luminosidad" && a.skin !== "sensible") {
    push(
      "Limpia",
      "AM y PM",
      ID.powderWash,
      "Limpiador en polvo con enzimas de papaína. Retira células muertas y devuelve luz a la textura."
    );
  } else if (a.skin === "seca" || a.skin === "sensible") {
    push(
      "Limpia",
      "AM y PM",
      ID.snowEnzyme,
      "Enzimas suaves que limpian sin fricción y sin arrastrar la hidratación que tu piel necesita."
    );
  } else {
    push(
      "Limpia",
      "AM y PM",
      ID.balancingGel,
      "Gel de uso diario que retira impurezas y mantiene el balance entre grasa e hidratación."
    );
  }

  // 2 · Prepara: la piel reactiva calma; la rutina completa tonifica.
  if (a.goal === "calma") {
    push(
      "Prepara",
      "AM y PM",
      ID.calmingGel,
      "Gel con agua de rosa de Damasco que baja el enrojecimiento y devuelve el confort a la piel reactiva."
    );
  } else if (a.level === "completa") {
    push(
      "Prepara",
      "AM y PM",
      ID.radiansomeToner,
      "Tónico nanoliposomal que deja la piel receptiva para que el tratamiento trabaje mejor."
    );
  }

  // 3 · Trata: la esencia insignia para firmeza o luminosidad en rutina
  // completa; el dúo booster y sérum para todo lo demás.
  if (
    a.level === "completa" &&
    (a.goal === "firmeza" || a.goal === "luminosidad")
  ) {
    push(
      "Trata",
      "AM y PM",
      ID.radiansomeEssence,
      "La esencia insignia: liposomas pasados hasta siete veces por el Microfluidizer para trabajar luminosidad y firmeza."
    );
  } else {
    push(
      "Trata",
      "AM y PM",
      ID.dermFirstPackage,
      "Booster y sérum en dúo. Hidratan a fondo, refuerzan la elasticidad y son el tratamiento de entrada del catálogo."
    );
  }

  // 4 · Hidrata: crema según piel y nivel.
  if (a.level === "completa" && (a.skin === "seca" || a.goal === "firmeza")) {
    push(
      "Hidrata",
      "AM y PM",
      ID.radiansomeCream,
      "Crema rica en liposomas para elasticidad y confort que dura todo el día."
    );
  } else {
    push(
      "Hidrata",
      "AM y PM",
      ID.dermCream,
      "Crema hipoalergénica de absorción rápida que sella la hidratación del tratamiento."
    );
  }

  // 5 · Protege: el SPF cierra la rutina de la mañana, siempre.
  push(
    "Protege",
    "Solo AM",
    ID.sunscreen,
    "SPF 50+ de amplio espectro con extra de hidratación. Protege el resultado de todos los pasos anteriores."
  );

  // 6 · Refuerzo interno, solo cuando el objetivo es firmeza.
  //
  // Esto era el paso "06" de la lista, marcado con un `optional: true` que
  // lo sacaba del total pero no de la pantalla: el titular decía "4 pasos,
  // $230" con cinco filas de precio debajo que sumaban $329. Quien lee no
  // ve una bandera en el objeto, ve cinco precios. Y al pulsar "añadir todo
  // a mi rutina" la bolsa cargaba los cinco y remataba con otro total
  // distinto.
  //
  // Ahora vive fuera de `steps`. No es un paso de la rutina de piel (se
  // bebe), no lleva numeral y no entra en el total. Se pinta aparte y con
  // su precio a la vista, así que sumar sigue dando lo que pone arriba.
  const collagen = a.goal === "firmeza" ? byId(ID.beautyCollagen) : null;
  const extra: RoutineExtra | null = collagen
    ? {
        phase: "Refuerza",
        when: "Diario",
        product: collagen,
        why: "Colágeno bebible tipo I con biotina y ácido hialurónico. Apoyo desde adentro para la elasticidad.",
      }
    : null;

  const total = steps.reduce((sum, s) => sum + (s.product.price ?? 0), 0);

  // Atajo: el kit oficial que más se parece a esta rutina.
  let kit: Product | null;
  if (a.level === "esencial") {
    kit = byId(ID.ritualEssential);
  } else if (a.goal === "firmeza" || a.goal === "luminosidad") {
    kit = byId(ID.ritualAdvanced);
  } else {
    kit = byId(ID.ritualSignature);
  }

  const kitNote = kit
    ? "Si prefieres empezar con una sola compra, este kit oficial agrupa una rutina muy parecida."
    : "";

  return { steps, total, extra, kit, kitNote };
}

// ─── Etiquetas de merchandising ────────────────────────────────────
// Mapea el menú oficial del API a un beneficio corto y a la fase de la
// rutina. Se usa en tarjetas y en las páginas de producto.

const BENEFIT: Record<string, string> = {
  Cleansers: "Limpieza",
  "Serums & Toners": "Tratamiento",
  Moisturizers: "Hidratación",
  Makeup: "Acabado y SPF",
  "Body Care": "Cuerpo",
  "Hair Care": "Cabello",
  Supplements: "Bienestar interno",
  Rituals: "Ritual completo",
};

const PHASE: Record<string, string> = {
  Cleansers: "Paso 01 · Limpia",
  "Serums & Toners": "Pasos 02 y 03 · Prepara y trata",
  Moisturizers: "Paso 04 · Hidrata",
  Makeup: "Paso 05 · Protege y termina",
  Rituals: "Rutina completa en un kit",
};

export function benefitLabel(menu: string): string {
  return BENEFIT[menu] ?? "";
}

export function phaseLabel(menu: string): string {
  return PHASE[menu] ?? "";
}

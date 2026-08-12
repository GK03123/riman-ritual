# Giro de posicionamiento: de "boutique con curadora" a marca personal de Eilin

Fecha: 2026-08-11
Estado: plan aprobado por el brief del cliente, ejecutado en la misma sesión.

## Baseline (antes de tocar nada)

- Dev server en `:3100`, arranca limpio. Consola del navegador: 0 errores, 0 warnings.
- Árbol de git limpio salvo `PROMPT-MARCA-PERSONAL.md` sin seguimiento.
- 9 capítulos montados: Hero, Bestsellers, SkinDiagnostic, Curator, Story, Rituals,
  JejuFilm, Ingredient, Testimonials.
- Fotos de Eilin ya presentes en `/public/founder/`: `eilin-portada.jpg`,
  `eilin-retrato.jpg`, `eilin-consulta.jpg`, `eilin-editorial.jpg`. Las tres primeras
  ya se usan; `eilin-editorial.jpg` estaba sin usar.
- Apariciones a corregir, verificadas con grep:
  - "curador/curadora": 13 archivos, 22 líneas.
  - "hermana": 1 línea (`components/Curator.tsx:202`).
  - "tres preguntas / tres respuestas": 5 archivos.
  - "la casa" visible en pantalla: 4 sitios (Story eyebrow, Hero banderola, Hero sumario,
    ProductCard). El resto son comentarios y tokens del sistema de diseño, intocables.
- Anclas entrantes: `#curador` lo usan Header, Footer y StartHere. `#la-casa` y
  `#ciencia` no los apunta nadie, así que renombrar o retirar es seguro.

## Decisiones de voz

La regla que manda: Eilin cuenta lo que usa, nunca receta lo que tú necesitas.

| Antes | Después | Por qué |
|---|---|---|
| "La curadora" (rótulo cap. 04) | "Quién está detrás" | Describe a una persona, no una autoridad. |
| "Curada por Eilin Guependo" (h2) | "Lo que uso yo y por qué" | La promesa entera en primera persona. |
| "Curaduría personal" (eyebrow hero) | "En primera persona" | Anuncia el giro en la primera línea de la página. |
| "Eilin, la curadora" (pies de foto) | "Eilin Guependo" | Un pie de foto es un crédito, no un cargo. |
| "Eilin · Curadora" (cap. 03) | "Eilin Guependo" | Igual. |
| "el código de la curadora" (footer, PDP) | "mi código de afiliada" | Más honesto y más claro legalmente. |
| "Lo más pedido de la casa" | "Lo que más me piden" | Tras el giro, "la casa" es RIMAN, y los bestsellers son suyos, no de RIMAN. |
| "La casa" (rótulo cap. 05) | "Riman" | Petición explícita del brief. |

Se conserva la palabra "consulta" como nombre del capítulo 03: es el vocabulario del
propio brief y no aparece en ningún contexto de diagnóstico médico. Lo que se elimina
es el tono de prescripción, no el término.

## Los 8 cambios obligatorios

1. Instagram declarado en `lib/site.ts` como usuario suelto, con `instagramUrl()` e
   `instagramHandle` derivados. Componente `InstagramLink` con la guarda de vacío.
   Se pinta en el folio del hero, en el capítulo 04 como invitación, en el cierre del
   capítulo 08 y en el footer. Entra también en el `sameAs` de la Person.
2. Fotos: las cuatro de `/public/founder/` en uso. `eilin-editorial.jpg` estrena
   sitio en el cierre del capítulo 08.
3. "Curadora" fuera de los 13 archivos, incluidos comentarios y componentes sin montar.
   El ancla `#curador` pasa a `#eilin` y se actualizan Header, Footer y StartHere.
4. La cita de la hermana pasa a "Si no está en mi baño, no está en esta página".
5. `Ingredient` desmontado, el 09 pasa a 08, el sumario se reescribe. El archivo se
   queda en el repositorio.
6. El último párrafo del capítulo 04 baja de 337 a 118 caracteres y conserva solo las
   tres líneas de producto.
7. Capítulo 05: `id="riman"`, rótulo "Riman", titular y entradilla reescritos para que
   se lea como la marca que Eilin vende.
8. El subtítulo del capítulo 03 desaparece y su frase en primera persona sube a titular.
   Se unifican los cinco sitios que decían "tres preguntas".

## Diseño y motion

- Ritmo de fondos tras quitar el 08: porcelana, porcelana, porcelana-deep, marfil,
  porcelana-deep, jade, jade, marfil, tinta. El bloque de jade queda en dos capítulos y
  el segundo es una plancha a sangre, así que no se leen como dos secciones seguidas.
- Cierre nuevo en el capítulo 08 con retrato editorial, firma, CTA a la consulta e
  Instagram. Es el remate de venta que faltaba desde que se retiró FinalCTA.
- Nada de 3D ni de view transitions de ruta. Justificado en el informe.

## Verificación

Consola limpia, recorrido real de catálogo, ficha, carrito y quiz, 375/768/1280,
`npm run build` con el dev parado y comparación con el baseline.

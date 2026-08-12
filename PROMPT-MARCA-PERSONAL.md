ultrathink

ROL: Eres director de arte + ingeniero frontend senior de un estudio de diseño de lujo.
Vas a AUDITAR por completo la página de Eilin Guependo (boutique afiliada de skincare
coreano RIMAN) y ejecutar un GIRO DE POSICIONAMIENTO: la página deja de sonar a
"boutique con curadora" y pasa a ser la MARCA PERSONAL de Eilin. Además hay una lista
de cambios concretos que son obligatorios. Tienes permiso creativo TOTAL para rediseñar
lo que haga falta —estructura, secciones, jerarquía, estética, motion— siempre que la
página quede más creativa, dinámica, llamativa y profesional, y que no se rompa nada.

════════════════════════════════════════════════════════════════════
EL PORQUÉ DEL GIRO (léelo antes de tocar nada)
════════════════════════════════════════════════════════════════════
"Curadora" suena a autoridad clínica y Eilin NO es profesional de la salud. Todo el
sitio debe hablar desde la experiencia personal ("esto es lo que yo uso y por qué"),
nunca desde la prescripción ("esto es lo que tú necesitas"). Ese criterio manda en
copy, jerarquía y datos estructurados. Es a la vez una decisión de marca y de
prudencia: cero promesas médicas, cero tono de diagnóstico.

════════════════════════════════════════════════════════════════════
CAMBIOS OBLIGATORIOS (con el mapa exacto ya verificado)
════════════════════════════════════════════════════════════════════
El sumario del número está en el comentario de app/page.tsx:
  01 portada(Hero) · 02 lo más pedido(Bestsellers) · 03 la consulta(SkinDiagnostic) ·
  04 la curadora(Curator) · 05 la casa(Story) · 06 los rituales(Rituals) ·
  07 el origen(JejuFilm) · 08 la ciencia(Ingredient) · 09 lo que me escriben(Testimonials)

1) INSTAGRAM DE EILIN — añadirlo de verdad, no como adorno.
   URL limpia (sin parámetros de tracking): https://www.instagram.com/eilin_guependo
   - Declararlo en lib/site.ts (p. ej. `instagram`), NUNCA hardcodeado suelto: ese
     archivo es la única fuente de verdad de marca. Si queda vacío, el enlace no se
     pinta (mismo patrón que `whatsapp`).
   - Colócalo donde sume a la marca personal: Footer (bloque de redes), Header o el
     bloque de autoría del Hero, y en la sección de Eilin (capítulo 04). Con icono de
     lucide-react, `rel="noopener"`, `target="_blank"` y aria-label descriptivo.
   - Añádelo también al JSON-LD de la Person como `sameAs`.
   - Diseña el gesto: que sea una invitación ("mira mi día a día"), no un icono suelto.

2) FOTOS NUEVAS — llegarán después a /public (probablemente /public/founder).
   Antes de maquetar, INVENTARÍA /public y usa lo que exista. Si aparecen fotos nuevas,
   ubícalas donde más levanten la marca personal (portada, capítulo de Eilin, retrato
   de la consulta, banda editorial). Siempre con next/image, `alt` descriptivo real,
   `sizes` correcto, y encuadre cuidado (object-position) para que nunca corte la cara.
   Si no hay fotos nuevas todavía, deja los huecos preparados y dilo en el informe.

3) ELIMINAR "LA CURADORA" DE TODO EL SITIO (aparece en 13 archivos).
   Sustituye el rótulo y el tono por marca personal (decide tú la voz exacta: "Eilin",
   "Quién está detrás", "Mi selección", "Sobre mí"…). Puntos verificados a tocar:
   - components/Curator.tsx: eyebrow "La curadora", `alt` del retrato, el pie
     "Eilin Guependo · Curadora", y el `id="curador"` de la sección.
   - components/Header.tsx (nav "Curadora" → nuevo rótulo) y components/Footer.tsx
     (enlace "La curadora" + el texto legal que menciona "el código de la curadora").
   - components/Hero.tsx: los pies "Eilin, la curadora" (x2) y el `alt` del retrato.
   - components/SkinDiagnostic.tsx: el pie "Eilin · Curadora".
   - app/page.tsx (JSON-LD): `jobTitle: "Curadora de skincare coreano"` y la
     `description` de la Person; ajusta también el `@id` `#curadora` si lo renombras.
   - app/producto/[id]/page.tsx: el texto que menciona a la curadora.
   - Comentarios y componentes no montados (FinalCTA, StartHere, ProductDrawer,
     lib/notes.ts): déjalos coherentes para que nadie reintroduzca el término.
   ⚠️ Si renombras el ancla `#curador`, actualiza TODOS los enlaces que apuntan a ella
   (Footer, Header, StartHere) o dejarás enlaces muertos.

4) QUITAR "SE LO RECOMENDARÍA A MI PROPIA HERMANA".
   Está en components/Curator.tsx como cita destacada: "Aquí solo hay productos que le
   recomendaría a mi hermana". Sustitúyela por una frase en la voz de Eilin que venda
   igual de bien sin apelar a la familia ni sonar a receta. Es el momento de "segundo
   vistazo" de la carta: que la nueva frase esté a la altura.

5) ELIMINAR LA PÁGINA 8 COMPLETA ("La ciencia" = components/Ingredient.tsx, id="ciencia").
   - Quita el import y el `<Ingredient />` de app/page.tsx.
   - RENUMERA: el capítulo 09 (Testimonials) pasa a ser 08. Revisa el comentario del
     sumario en app/page.tsx y cualquier numeral visible en pantalla.
   - Comprueba que ningún enlace/índice apunte a `#ciencia`.
   - Deja el archivo del componente en el repositorio (como ya se hizo con FAQ y
     FinalCTA) por si vuelve, pero sin montarlo.
   - Ojo con el ritmo: al caer un capítulo de jade, revisa que la alternancia de fondos
     (papel claro → jade → porcelana) siga teniendo sentido y no queden dos secciones
     seguidas del mismo tono. Si hace falta, reequilibra.

6) PÁGINA 4 (components/Curator.tsx) — resumir el último párrafo.
   Es el que empieza "Esta boutique es la selección que llevo años armando en cuadernos
   y notas de voz…". Déjalo notablemente más corto y directo, conservando lo único que
   de verdad informa: que trabaja tres líneas (Incellderm skincare, BOTALAB cuerpo y
   cabello, Lifening suplementos). Y aplica también el cambio del punto 4 (hermana).

7) PÁGINA 5 (components/Story.tsx) — "La casa" → "Riman".
   El eyebrow del capítulo 05 dice "La casa"; debe decir "Riman". Revisa además el
   `id="la-casa"` y el titular/entradilla para que el capítulo se lea como "esto es
   RIMAN, la marca que vendo", sin que choque con el nuevo tono personal.
   ⚠️ NO cambies los demás usos de "la casa" del código: en comentarios y en tokens de
   diseño significa "el sistema de la casa" y no es copy visible. Cambia solo el rótulo
   visible del capítulo 05 (y cualquier otro texto visible donde "la casa" se refiera a
   la marca, como "Lo más pedido de la casa", si decides unificar; justifícalo).

8) PÁGINA 3 (components/SkinDiagnostic.tsx) — simplificar la entrada.
   Elimina el subtítulo "Respondes tres preguntas y te armo la rutina con piezas del
   catálogo: el porqué de cada paso y el precio completo. Sin registros ni correos."
   Debe quedar solo la frase en primera persona "Dime cómo está tu piel y te digo por
   dónde empezar." Recompón la cabecera para que esa frase gane peso y no quede
   huérfana (hoy vive como pie de la foto pequeña).
   ⚠️ COHERENCIA: "tres preguntas / tres respuestas" se repite en otros cinco sitios.
   Revísalos y unifica el mensaje: el título del capítulo ("Tu ritual, en tres
   respuestas"), app/layout.tsx (meta description), components/StartHere.tsx,
   components/Testimonials.tsx y components/BagDrawer.tsx.

════════════════════════════════════════════════════════════════════
STACK DE SKILLS POR FASE (invoca cada una cuando toque)
════════════════════════════════════════════════════════════════════
▸ AUDITORÍA Y PLAN
  superpowers:brainstorming · superpowers:writing-plans · web-quality-audit (baseline
  medible ANTES de tocar) · redesign-existing-projects · ui-ux-pro-max · codebase-design.
▸ MARCA PERSONAL Y COPY
  humanizer (OBLIGATORIO en todo el copy: español natural, voz de Eilin en primera
  persona, sin em dashes ni vocabulario de IA) · brand (ui-ux-pro-max) ·
  landing-page-design (jerarquía y CTA orientados a conversión).
▸ SISTEMA DE DISEÑO
  ui-ux-pro-max (design, design-system, ui-styling) · tailwind-design-system ·
  high-end-visual-design · design-taste-frontend · web-design-guidelines · frontend-design.
▸ ESTRUCTURA Y COMPONENTES
  nextjs-app-router-patterns · vercel-react-best-practices · components-build ·
  impeccable · los componentes Cult UI ya disponibles en components/ui/.
▸ MOTION
  find-animation-opportunities · apple-design · improve-animations ·
  fixing-motion-performance · vercel-react-view-transitions · review-animations.
  (3D con threejs-* solo si de verdad eleva; reglas al final.)
▸ CALIDAD Y VISIBILIDAD
  performance · core-web-vitals · accessibility · best-practices (Addy Osmani) ·
  seo + seo-audit + ai-seo · full-output-enforcement (código completo, sin recortes).
▸ CIERRE
  superpowers:verification-before-completion · web-quality-audit (re-run) ·
  superpowers:systematic-debugging.

NO uses: minimalist-ui, industrial-brutalist-ui, gpt-taste, imagegen-frontend-mobile,
brandkit, stitch-design-taste, image-to-code, design-taste-frontend-v1, pick-ui-library,
slides, banner-design, programmatic-seo.

════════════════════════════════════════════════════════════════════
CONTEXTO REAL DEL PROYECTO (verifica en el código, no asumas)
════════════════════════════════════════════════════════════════════
- Ruta: C:\Users\brega\riman-ritual · Dev server: puerto 3100 (.claude/launch.json,
  name "riman-ritual"). Arráncalo tú y trabaja con vista en el navegador.
- Stack: Next.js 14 App Router · React 18 · Tailwind 3.4 · framer-motion 12 ·
  lucide-react · TypeScript. Mantén el stack. Única dependencia pesada nueva permitida:
  Three.js (three + @react-three/fiber + @react-three/drei) y solo si haces 3D.
- Sistema de diseño "Atelier editorial" en tailwind.config.ts: porcelain/ivory/ink/
  stone/hairline/champagne/jade, sombras (card, vitrine, paper, gold, jade-card),
  materiales (gold-sheet, caustic, jade-depth), curvas (ease-editorial, ease-silk) y
  escala tipográfica propia (masthead, display-*, title, lede, body, note, micro).
  Fuentes: Cormorant Garamond (display) + Jost (sans).
- Marca y afiliada: lib/site.ts es la ÚNICA fuente de verdad. productUrl() arma los
  enlaces a mall.riman.com con el slug "miraeseglow". NO hardcodees enlaces. El KPI es
  el clic hacia mall.riman.com.
- Componentes Cult UI ya en components/ui/ (adaptados a la paleta, light-only):
  texture-card, minimal-card, texture-button (primary=jade, accent=champagne),
  gradient-heading (variante gold), text-animate (reveal on scroll), animated-number.
  Úsalos donde sumen; no reinventes lo que ya existe.
- Estado actual de la home (app/page.tsx): AnnouncementBar → Header → Hero →
  Bestsellers → SkinDiagnostic → Curator → Story → Rituals → JejuFilm → Ingredient →
  Testimonials → Footer + WhatsAppFloat y overlays (ProductDrawer, CatalogOverlay,
  BagDrawer). PDP en app/producto/[id]/page.tsx. FAQ y FinalCTA existen pero NO están
  montados: no los remontes sin decirlo.

════════════════════════════════════════════════════════════════════
GOTCHAS CONOCIDOS (no tropieces con ellos)
════════════════════════════════════════════════════════════════════
- AnimatePresence con mode="wait" se ATASCA en los pasos del quiz (SkinDiagnostic):
  usa remonte por `key` para las transiciones entre pasos.
- Los cambios en tailwind.config.ts NO se aplican en caliente: reinicia el dev server.
  No corras `npm run build` con el dev activo.
- lib/utils.ts tiene un cn() con extendTailwindMerge que registra la escala propia
  (text-display-md, rounded-vitrine, shadow-gold, ease-editorial…). NO lo sustituyas por
  un cn() genérico: borraría los tamaños en silencio. Si creas tokens con nombre propio,
  regístralos ahí también.

════════════════════════════════════════════════════════════════════
CONSTRAINTS NO NEGOCIABLES
════════════════════════════════════════════════════════════════════
- Funcionalidad intacta y verificada: carrito (BagDrawer), catálogo (CatalogOverlay),
  ficha (ProductDrawer), quiz SkinDiagnostic, enlaces de afiliada, WhatsApp float,
  AnnouncementBar, skip-link, PDP.
- Cero enlaces rotos tras renombrar anclas o quitar el capítulo 08.
- prefers-reduced-motion respetado en CADA animación. Mantén el <noscript> que revela
  el contenido con opacity:0 cuando no hay JS.
- Accesibilidad AA: contraste, foco visible, aria labels, teclado, targets ≥44px,
  jerarquía de headings correcta (y que siga siendo correcta al quitar una sección).
- Core Web Vitals en verde (LCP < 2.5s, INP < 200ms, CLS < 0.1). Cuida el LCP del hero.
- SEO: metadatos y JSON-LD coherentes con el nuevo posicionamiento (nada de "curadora"),
  `sameAs` con el Instagram, y JSON-LD de Producto correcto en las PDP.
- Nada de promesas médicas ni lenguaje de diagnóstico en ningún texto nuevo.

════════════════════════════════════════════════════════════════════
LIBERTAD CREATIVA (lo que espero que hagas por tu cuenta)
════════════════════════════════════════════════════════════════════
Más allá de la lista, quiero que la página dé un salto: portada más impactante, mejor
ritmo entre capítulos, momentos de "segundo vistazo", micro-interacciones que se sientan
caras, transiciones de ruta (view transitions) hacia la PDP, tipografía con más carácter
y presencia real de Eilin como persona (foto, voz, Instagram, firma). Puedes reordenar,
fusionar, rediseñar o añadir secciones si mejora la narrativa y la conversión. Si crees
que 3D sutil eleva la portada (gota de sérum, cáusticas de luz champagne), hazlo con:
dynamic import ssr:false, montaje tras el primer paint, DPR limitado, pausa fuera de
viewport, fallback estático en móvil y reduced-motion, canvas aria-hidden. Si resta más
de lo que suma, no lo pongas y explica por qué.

════════════════════════════════════════════════════════════════════
PLAN POR FASES
════════════════════════════════════════════════════════════════════
FASE 0 — Auditoría + baseline. Lee todos los componentes, globals.css, tailwind.config.ts
  y lib/*. Inventaría /public. Arranca el dev y recorre la página. Corre web-quality-audit
  (foto ANTES). Localiza TODAS las apariciones de "curadora", "hermana", "tres preguntas"
  y "la casa" visible. Entrega auditoría + plan (writing-plans) antes de editar.
FASE 1 — Cambios obligatorios (los 8 puntos de arriba), con sus efectos colaterales
  resueltos: renumeración, anclas, navegación, metadatos y JSON-LD.
FASE 2 — Reposicionamiento a marca personal: reescribe la voz del sitio con humanizer,
  refuerza la presencia de Eilin y engancha el Instagram como parte de la narrativa.
FASE 3 — Diseño y estructura: sistema de diseño, ritmo de capítulos, rediseño de las
  secciones que lo pidan (con libertad creativa).
FASE 4 — Motion: entradas, micro-interacciones, view transitions; todo bajo
  fixing-motion-performance y con review-animations al final.
FASE 5 — Perf / a11y / SEO con las skills de Addy Osmani y las de SEO.
FASE 6 — Verificación (obligatoria, no me pidas que revise yo):
  dev en 3100, consola con 0 errores, prueba real (catálogo, ficha, carrito, quiz
  completo, navegar a una PDP, clic de afiliada, enlace de Instagram), responsive
  375/768/1280+, `npm run build` limpio y sin errores de tipos (detén el dev antes),
  web-quality-audit de nuevo y comparación con el baseline, y screenshots ANTES/DESPUÉS
  de cada sección tocada.

ENTREGABLE: (1) auditoría + baseline, (2) checklist de los 8 cambios obligatorios con su
estado, (3) cambios de diseño por sección con el porqué, (4) archivos tocados y deps
añadidas, (5) métricas antes/después y screenshots. Con full-output-enforcement: código
completo, sin recortes ni placeholders.

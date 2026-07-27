ultrathink

ROL: Eres director de arte + ingeniero frontend senior de un estudio de diseño de
lujo. Tu misión es AUDITAR por completo la página de RIMAN (la boutique de skincare
coreano de Eilin Guependo) y LLEVARLA a otro nivel: más creativa, dinámica, llamativa
y profesional, sin romper NADA de la funcionalidad. Tienes permiso creativo TOTAL para
rediseñar estructura, secciones, jerarquía, estética y motion. Si aporta de verdad,
introduce animaciones 3D (Three.js). Prioriza elegancia sobre espectáculo vacío, pero
sé valiente: esto tiene que dejar de parecer una plantilla y sentirse una pieza única.

════════════════════════════════════════════════════════════════════
MODO DE TRABAJO Y MODELO
════════════════════════════════════════════════════════════════════
- Modelo recomendado: Opus 5 + ultrathink (fast mode apagado en fases creativas).
- Piensa al máximo en FASE 0 (auditoría) y FASE 1 (sistema de diseño): ahí se decide todo.
- Reserva tu razonamiento para diseño y criterio; delega lo mecánico a subagentes
  (refactors repetitivos, aplicar tokens, componentes simples) en Sonnet/Haiku.
- Trabaja fase por fase y sección por sección, verificando en el navegador tras cada una.
- Invoca cada skill CUANDO toque su fase; no las cargues todas a la vez.

════════════════════════════════════════════════════════════════════
STACK DE SKILLS POR FASE
════════════════════════════════════════════════════════════════════
▸ DESCUBRIMIENTO Y PLAN
  superpowers:brainstorming · superpowers:writing-plans · web-quality-audit (baseline
  medible de perf/a11y/SEO ANTES de tocar) · redesign-existing-projects (auditar sin
  romper) · ui-ux-pro-max (consulta su base de datos) · codebase-design (dónde poner
  los seams si refactorizas componentes).
▸ SISTEMA DE DISEÑO
  ui-ux-pro-max (design, design-system, ui-styling, brand: 192 paletas, 74 pares de
  fuentes, 84 estilos, 98 guías UX) · tailwind-design-system (tokens/escala en Tailwind)
  · high-end-visual-design · design-taste-frontend · web-design-guidelines (Vercel:
  revisar UI contra guías) · frontend-design.
▸ ESTRUCTURA NEXT
  nextjs-app-router-patterns (Server Components, streaming, data fetching, parallel
  routes) · vercel-react-best-practices (patrones de rendimiento React/Next).
▸ SECCIONES Y COMPONENTES
  landing-page-design (conversión: above-the-fold, hero, psicología de CTA, F-pattern,
  social proof) · componentes Cult UI ya en components/ui/ (texture-card, minimal-card,
  texture-button, gradient-heading, text-animate, animated-number) · components-build
  (componentes nuevos, composables y accesibles) · impeccable (pulido, jerarquía, a11y,
  micro-interacción).
▸ MOTION Y 3D
  find-animation-opportunities · apple-design · improve-animations · fixing-motion-
  performance (reglas duras de 60fps) · vercel-react-view-transitions (transiciones de
  ruta y de elemento compartido) · threejs-* (fundamentals, materials, shaders, lighting,
  textures, postprocessing, animation, geometry, loaders) SOLO si haces 3D · review-
  animations (QA final del motion).
▸ COPY
  humanizer (todo el copy en español, voz 1ª persona de Eilin, sin em dashes ni AI-vocab).
▸ CALIDAD / PERF / A11Y / SEO
  performance + core-web-vitals + accessibility + best-practices (Addy Osmani) ·
  vercel-react-best-practices · seo + seo-audit + ai-seo (técnico, AI search y JSON-LD
  de Producto en las PDP) · full-output-enforcement (código completo, sin placeholders).
▸ CIERRE
  superpowers:verification-before-completion · web-quality-audit (re-run para comparar
  antes/después) · superpowers:systematic-debugging (si aparece un bug).

NO uses (rompen coherencia o no aplican): minimalist-ui, industrial-brutalist-ui,
gpt-taste, imagegen-frontend-mobile, brandkit, stitch-design-taste, image-to-code,
design-taste-frontend-v1, pick-ui-library, slides, banner-design, programmatic-seo
(salvo que decidamos generar muchas PDP por plantilla).

════════════════════════════════════════════════════════════════════
CONTEXTO REAL DEL PROYECTO (verifica en el código, no asumas)
════════════════════════════════════════════════════════════════════
- Ruta: C:\Users\brega\riman-ritual · Dev server: puerto 3100 (.claude/launch.json,
  name "riman-ritual"). Arráncalo tú y trabaja con vista en el navegador.
- Stack: Next.js 14 App Router · React 18 · Tailwind 3.4 · framer-motion 12 ·
  lucide-react · TypeScript. Mantén el stack. Única dependencia pesada nueva permitida:
  Three.js (three + @react-three/fiber + @react-three/drei) y SOLO si decides hacer 3D.
- Fuentes: Cormorant Garamond (--font-display) + Jost (--font-sans).
- Paleta (tailwind.config.ts, sistema "Atelier editorial"): porcelain (DEFAULT/warm/deep),
  ivory, ink (DEFAULT/soft), stone (DEFAULT/light/dark), hairline, champagne (DEFAULT/
  deep/bronze/soft/mist/glow/light), jade (DEFAULT/soft/deep/mist). Hay tokens de sombra
  (card, cardHover, vitrine, paper, gold, jade-card), materiales (gold-sheet, caustic,
  jade-depth), curvas (ease-editorial, ease-silk) y escala tipográfica propia (text-title,
  display-*, masthead, note, body, micro). Amplía la escala si hace falta, conserva la
  identidad champagne/jade/porcelana.
- Marca y afiliada: lib/site.ts es la ÚNICA fuente de verdad (brandName "Eilin Guependo",
  affiliateSlug "miraeseglow"). productUrl() arma los enlaces a mall.riman.com. NO
  hardcodees enlaces ni alteres esa lógica. La conversión (clic a mall.riman.com) es el KPI.
- Imágenes reales en /public (retratos de Eilin, producto). Úsalas con criterio editorial
  y con next/image.
- Componentes Cult UI ya disponibles en components/ui/ (adaptados a la paleta, light-only):
  texture-card, minimal-card, texture-button (primary=jade, accent=champagne),
  gradient-heading (variante gold=bg-gold-sheet), text-animate (reveal on scroll) y
  animated-number (precios). Úsalos donde sumen; no reinventes lo que ya está.
- Home (app/page.tsx, en orden): AnnouncementBar → Header → Hero → Bestsellers →
  SkinDiagnostic → Curator → Rituals → JejuFilm → Ingredient → Testimonials → FinalCTA →
  Footer, + WhatsAppFloat y overlays ProductDrawer / CatalogOverlay / BagDrawer. Además
  la PDP en app/producto/[id]/page.tsx con components/pdp/Gallery.tsx.

════════════════════════════════════════════════════════════════════
GOTCHAS CONOCIDOS (no tropieces con ellos)
════════════════════════════════════════════════════════════════════
- AnimatePresence con mode="wait" se ATASCA en los pasos del quiz (SkinDiagnostic).
  Para transiciones entre pasos, fuerza el remonte por `key` en vez de mode="wait".
- Los cambios en tailwind.config.ts NO se aplican en caliente: reinicia el dev server
  tras tocarlo. No corras `npm run build` con el dev server activo.
- lib/utils.ts tiene un cn() con extendTailwindMerge que registra la escala propia
  (text-display-md, rounded-vitrine, shadow-gold, ease-editorial…). NO lo reemplaces por
  un cn() genérico: borraría los tamaños en silencio. Si añades tokens nuevos con nombre
  propio, regístralos también ahí.

════════════════════════════════════════════════════════════════════
CONSTRAINTS NO NEGOCIABLES (romper uno = fallar)
════════════════════════════════════════════════════════════════════
- Toda la funcionalidad sigue viva y verificada: carrito (RitualBagProvider/BagDrawer),
  catálogo (CatalogProvider/CatalogOverlay), ficha (ProductDrawer), quiz SkinDiagnostic,
  enlaces de afiliada, WhatsApp float, AnnouncementBar, skip-link, PDP.
- prefers-reduced-motion respetado en CADA animación (incluido el 3D).
- Mantén el <noscript> que revela el contenido opacity:0 sin JS.
- Accesibilidad AA: contraste, foco visible, aria labels, teclado, targets ≥44px,
  headings jerárquicos correctos.
- Rendimiento medible: cuida el LCP del hero (usa next/image), objetivo Core Web Vitals
  en verde (LCP < 2.5s, INP < 200ms, CLS < 0.1). El 3D no debe degradar esto.
- SEO: metadatos correctos por página + JSON-LD de Producto en las PDP; nada de romper
  el crawl. Copy humano en español.

════════════════════════════════════════════════════════════════════
DECISIÓN 3D (Three.js) — evalúala en el brainstorming
════════════════════════════════════════════════════════════════════
Considera 3D solo donde eleve la marca sin volverse gadget: hero con una gota/serum de
vidrio con caústicas de luz champagne, campo de partículas sutil, frasco 3D del producto
nº1, o una escena de origen (Jeju) con profundidad. Si lo haces, es OBLIGATORIO:
  - Carga diferida con dynamic import y ssr:false (nada de WebGL en SSR).
  - No dañar el LCP: monta el canvas tras el primer paint / al entrar en viewport.
  - Limitar DPR, pausar fuera de pantalla o pestaña oculta.
  - Fallback estático (imagen/gradiente) en móvil, low-power y prefers-reduced-motion.
  - Canvas decorativo con aria-hidden; jamás interfiere con lectura ni scroll.
  - Apóyate en threejs-materials/shaders/lighting/postprocessing y en la guía de
    @react-three/fiber (los eventos de puntero ya vienen integrados).
Si concluyes que el 3D resta más de lo que suma, NO lo pongas y explica por qué.

════════════════════════════════════════════════════════════════════
PLAN POR FASES
════════════════════════════════════════════════════════════════════
FASE 0 — BRAINSTORM + AUDITORÍA + BASELINE
  Lee todos los componentes, globals.css, tailwind.config.ts y lib/*. Arranca el dev
  server y recorre la página en el navegador. Corre web-quality-audit para una foto ANTES
  (perf, a11y, SEO). Con superpowers:brainstorming define la dirección creativa y decide
  lo del 3D; consulta ui-ux-pro-max para paleta/fuentes/estilo. Entrega: auditoría de lo
  que se ve barato/genérico/plano, fallos de jerarquía, contraste, responsive, motion y
  conversión + métricas base. Escribe el plan (writing-plans) antes de editar.
FASE 1 — SISTEMA DE DISEÑO
  Eleva tokens en tailwind.config.ts y globals.css con lo elegido en ui-ux-pro-max y
  tailwind-design-system: escala tipográfica de lujo, espaciado generoso y consistente,
  sombras multicapa, radios, gradientes/materiales sutiles, textura grain y detalles
  editoriales (drop cap, índice numerado, hairlines, firma). Todo como tokens
  reutilizables (registra los nombres propios en cn()). Reinicia el dev tras tocar config.
FASE 2 — ARQUITECTURA DE PÁGINA + SECCIONES (nivel portada de revista, orientado a vender)
  Con landing-page-design ordena la narrativa para conversión (above-the-fold potente,
  jerarquía, social proof, CTA claros hacia mall.riman.com). Con nextjs-app-router-
  patterns mejora el data fetching / Server Components donde ayude. Reinventa cada sección:
  Hero (masthead + retrato/producto con profundidad, y el 3D si va) · Bestsellers y
  ProductCard (cards caras, hover refinado) · SkinDiagnostic (quiz premium y claro) ·
  Curator (la carta de Eilin como pieza editorial) · Rituals / JejuFilm / Ingredient
  (narrativa cinematográfica, imágenes grandes, momentos de "segundo vistazo") ·
  Testimonials (prueba social elegante) · FinalCTA + Footer · Header/AnnouncementBar ·
  overlays y PDP al mismo nivel. Reutiliza los componentes Cult UI de components/ui/ y
  crea nuevos con components-build. Puedes reordenar, fusionar o añadir secciones.
FASE 3 — MOTION Y 3D
  Movimiento físico e interrumpible (apple-design), entradas escalonadas con criterio,
  parallax con gusto, micro-interacciones, transiciones fluidas en drawers/overlays.
  Usa vercel-react-view-transitions para transiciones de ruta y de elemento compartido
  (p. ej. imagen de producto → PDP). El 3D con todas sus reglas. Aplica fixing-motion-
  performance a todo y pasa review-animations al final. Todo con fallback reduced-motion.
FASE 4 — COPY (humanizer)
  Reescribe títulos, subtítulos, CTAs, microcopy y metadatos en la voz de Eilin.
FASE 5 — PERFORMANCE / A11Y / SEO
  Aplica performance + core-web-vitals + accessibility + best-practices (Addy Osmani) y
  vercel-react-best-practices. Con seo-audit + seo + ai-seo: metadatos por página,
  Open Graph, sitemap si falta, y JSON-LD de Producto en las PDP. Perfecto en 375/768/1280+.
FASE 6 — VERIFICACIÓN (superpowers:verification-before-completion)
  Con el dev en 3100: recarga, consola con 0 errores, prueba interacciones reales (abrir
  catálogo, ficha, carrito, completar el quiz, ir a una PDP), comprueba responsive. Corre
  web-quality-audit de nuevo y compara con el baseline de FASE 0. `npm run build` debe
  pasar sin errores ni errores de tipos (detén el dev antes del build). Toma screenshots
  ANTES vs DESPUÉS de cada sección clave. No me pidas que revise yo: verifica y muéstrame
  la evidencia.

════════════════════════════════════════════════════════════════════
"MEJOR, MÁS CREATIVA, DINÁMICA Y PROFESIONAL" = TERMINADO
════════════════════════════════════════════════════════════════════
- Al abrirla se siente cara, intencional y única: cero aroma a template o a IA.
- Sistema de diseño coherente (ui-ux-pro-max) con jerarquía clarísima.
- Tipografía y espaciado de nivel estudio; detalles editoriales por todas partes.
- Motion (y 3D si aplica) que sorprende sin estorbar y siempre degrada con elegancia.
- Copy humano en la voz de Eilin; CTAs que empujan a comprar en mall.riman.com.
- Funcionalidad intacta y verificada. Accesible (AA), responsive y rápida: Core Web
  Vitals en verde y mejora medible en web-quality-audit respecto al baseline. El build
  pasa limpio. Metadatos y JSON-LD de Producto correctos.

ENTREGABLE: (1) auditoría + baseline + decisión 3D, (2) cambios por sección con el porqué
de cada decisión de diseño, (3) archivos tocados y dependencias añadidas, (4) comparativa
de métricas antes/después y screenshots. Con full-output-enforcement: código completo,
sin recortes.

ultrathink

ROL: Eres director de arte + ingeniero frontend senior de un estudio de diseño de lujo.
La página de Eilin Guependo (marca personal + boutique afiliada de skincare coreano
RIMAN) ya pasó por un giro de posicionamiento y está limpia de conceptos viejos. Ahora
toca la pasada final: AUDITAR CADA DETALLE y dejarla impecable. El objetivo es una web
única, minimalista, dinámica y muy profesional, donde EILIN sea la protagonista y que
convierta visitantes en clientas.

Tienes permiso creativo total para modificar, rediseñar, reordenar, añadir y eliminar
lo que haga falta. Pero "pulido" aquí significa criterio, no adornos: cada elemento que
se quede tiene que ganarse su sitio.

════════════════════════════════════════════════════════════════════
LA DIRECCIÓN: MINIMALISMO EDITORIAL (léelo antes de tocar nada)
════════════════════════════════════════════════════════════════════
El sitio tiene una identidad fuerte ("Atelier editorial": porcelana, champagne, jade,
didone + Jost, texturas, numerales, filetes de oro). NO la tires. Lo que pido es
depurarla: minimalismo entendido como CONTENCIÓN, no como frialdad ni como plantilla
sosa. En la práctica:
  - Más aire y silencio alrededor de lo importante; menos elementos compitiendo.
  - Jerarquía brutal: en cada pantalla debe haber UNA cosa que manda.
  - Menos ornamento decorativo, más tipografía y fotografía haciendo el trabajo.
  - Si un adorno (filete, numeral, textura, badge, gradiente) no aporta significado,
    fuera. Audita el sitio entero con esa vara.
  - Paleta contenida: porcelana y tinta mandan; el champagne es acento, no relleno.
El resultado debe leerse caro y calmado, como una revista de moda bien impresa, no como
una landing saturada.

════════════════════════════════════════════════════════════════════
ESTADO ACTUAL VERIFICADO (parte de aquí, no asumas)
════════════════════════════════════════════════════════════════════
- Ruta: C:\Users\brega\riman-ritual · Dev server puerto 3100 (.claude/launch.json,
  name "riman-ritual"). Arráncalo tú y trabaja con vista en el navegador.
- Stack: Next.js 14 App Router · React 18 · Tailwind 3.4 · framer-motion 12 ·
  lucide-react · TypeScript. Mantenlo.
- Home (app/page.tsx), 7 capítulos:
    01 Hero (portada) · 02 Bestsellers (lo que más me piden) · 03 SkinDiagnostic (la
    consulta) · 04 Curator (quién está detrás) · 05 Rituals (las rutinas) ·
    06 JejuFilm (el origen) · 07 Testimonials (lo que me escriben)
  + AnnouncementBar, Header, Footer, WhatsAppFloat y overlays (ProductDrawer,
  CatalogOverlay, BagDrawer). PDP en app/producto/[id]/page.tsx.
- Desmontados a propósito (existen en el repo, NO los remontes sin decirlo):
  FAQ, FinalCTA, Ingredient (ciencia), Story (marca).
- Ya hecho en la ronda anterior: fuera el término "curadora", fuera lo de la hermana,
  Instagram integrado (components/InstagramLink.tsx + lib/site.ts).
- Sistema de diseño en tailwind.config.ts: porcelain/ivory/ink/stone/hairline/
  champagne/jade, sombras (card, vitrine, paper, gold, jade-card), materiales
  (gold-sheet, caustic, jade-depth), curvas (ease-editorial, ease-silk), escala
  tipográfica propia (masthead, display-*, title, lede, body, note, micro).
  Fuentes: Cormorant Garamond (display) + Jost (sans).
- lib/site.ts es la ÚNICA fuente de verdad de marca; productUrl() arma los enlaces de
  afiliada a mall.riman.com (slug "miraeseglow"). El KPI es el clic hacia mall.riman.com.
- Componentes Cult UI disponibles en components/ui/ (adaptados a la paleta, light-only):
  texture-card, minimal-card, texture-button, gradient-heading, text-animate,
  animated-number. Úsalos donde sumen; no reinventes lo que ya existe.

════════════════════════════════════════════════════════════════════
FOTOGRAFÍA: EL TRABAJO MÁS IMPORTANTE DE ESTA PASADA
════════════════════════════════════════════════════════════════════
Es una marca personal: Eilin tiene que RESALTAR. Hoy la fotografía está infrautilizada.

INVENTARIO REAL DE /public (verificado):
  EN USO (4, en /public/founder):
    eilin-portada.jpg · eilin-retrato.jpg · eilin-editorial.jpg · eilin-consulta.jpg
  NUEVAS, SIN USAR (las acaba de subir la clienta, en la raíz de /public):
    · "WhatsApp Image 2026-08-12 at 9.07.00 AM.jpeg"
      → Eilin de perfil, ojos cerrados, sosteniendo en alto un frasco RIMAN, camiseta
        negra, melena larga oscura. Recorte de estudio sobre BLANCO PURO. Es la mejor
        foto de marca personal que hay: gesto real de producto, cara protagonista.
    · "WhatsApp Image 2026-08-12 at 9.07.00 AM (1).jpeg"
      → Eilin desenfocada al fondo y dos envases RIMAN nítidos en primer plano entre
        sus manos. Fondo blanco. Es la foto "producto protagonista" del set.
  HUÉRFANAS (15 en la raíz, sin usar; varias son duplicados exactos de las de /founder):
    academyglam505_*, eilin_guependo_*, pluss__photographyoficial_*, robinson4850_*

QUÉ QUIERO QUE HAGAS:
1. RENOMBRA las dos nuevas a kebab-case sin espacios ni paréntesis (los espacios en
   URLs son frágiles y feos), p. ej. /founder/eilin-producto.jpg y
   /founder/eilin-manos-producto.jpg. Actualiza las referencias.
2. INTÉGRALAS donde más levanten la marca: la del gesto con el frasco pide portada o
   el capítulo 04 (quién está detrás); la de las manos con producto pide un momento de
   producto (02 bestsellers, 05 rutinas o la PDP). Decide tú, pero justifícalo.
3. ⚠️ AMBAS ESTÁN SOBRE BLANCO PURO (#FFF) y el papel del sitio es porcelana cálida
   (#F7F4EF): si las colocas tal cual se verá un rectángulo blanco que canta. Resuélvelo
   con criterio de dirección de arte, por ejemplo: `mix-blend-mode: multiply` para
   fundirlas en el papel, un recorte real de la silueta, o enmarcarlas a propósito como
   "plancha de estudio" blanca con filete. Elige y explica por qué.
4. LIMPIA las 15 huérfanas y los duplicados (mueve a una carpeta de originales o
   elimínalas): pesan en el repo y ensucian el proyecto. Confirma antes cuáles son
   duplicado exacto de las de /founder.
5. Todas las imágenes con next/image, `sizes` correcto, `alt` real y descriptivo,
   `priority` solo en el LCP, y encuadre (object-position) que nunca corte la cara.

════════════════════════════════════════════════════════════════════
TEXTO: PASA TODA LA PÁGINA POR EL FILTRO
════════════════════════════════════════════════════════════════════
Aplica la skill `humanizer` a CADA texto visible del sitio (titulares, entradillas,
párrafos, CTAs, microcopy, estados vacíos, mensajes del quiz, textos del carrito y de
los overlays, metadatos, alts). Reglas:
  - Voz de Eilin, primera persona, cercana y natural. Español real, no traducido.
  - Nada de vocabulario de IA ni fórmulas huecas ("descubre", "eleva tu rutina",
    "no solo… sino que", tríos de adjetivos, entusiasmo genérico).
  - Sin em dashes.
  - RESUME lo que sea largo: si un párrafo se puede decir en la mitad, dilo en la mitad.
    Prefiero tres frases buenas a un bloque denso. Lee la página como lectora, no como
    autora: donde te aburras, corta.
  - Cero promesas médicas ni lenguaje de diagnóstico. Eilin comparte lo que usa; no
    prescribe.
  - Revisa que los CTAs digan lo que pasa al pulsarlos y empujen a mall.riman.com.

════════════════════════════════════════════════════════════════════
MOVIMIENTO: QUE LA PÁGINA SE SIENTA VIVA
════════════════════════════════════════════════════════════════════
Quiero una página dinámica e intuitiva, con movimiento que acompañe la lectura y que se
sienta caro. No quiero una feria de animaciones.
  - Auditá primero qué debería animarse y qué no (find-animation-opportunities).
  - Movimiento físico e interrumpible (apple-design): springs con masa para lo que
    responde al dedo, curvas editoriales para lo que entra en escena.
  - Entradas escalonadas con criterio, parallax sutil, revelados al hacer scroll,
    micro-interacciones en hover/tap, transiciones fluidas en drawers y overlays.
  - View transitions para la navegación a la PDP (elemento compartido: la foto del
    producto viaja). Úsalo si encaja limpio con el App Router.
  - TODO bajo `fixing-motion-performance`: solo transform y opacity para movimiento
    continuo, nada de animar layout en superficies grandes, nada de rAF sin condición
    de parada, nada de leer y escribir layout en el mismo frame.
  - Respeta `prefers-reduced-motion` en cada animación (ya hay MotionProvider).
  - Pasa `review-animations` al final como QA.

════════════════════════════════════════════════════════════════════
MÓVIL: TRÁTALO COMO LA VERSIÓN PRINCIPAL
════════════════════════════════════════════════════════════════════
La mayoría de las visitas de una marca personal llegan desde Instagram, o sea desde el
teléfono. El móvil no es una reducción del escritorio: diséñalo con la misma ambición.
  - Revisa CADA sección a 375px y 390px, y también 768px. Nada de desbordes
    horizontales, texto apelmazado, imágenes recortadas por la cara ni tipografías que
    se caen.
  - Jerarquía adaptada: en móvil manda una sola columna con ritmo claro; recorta lo que
    en pantalla pequeña solo estorba.
  - Targets táctiles ≥44px, sin hover como única vía de interacción, y overlays/drawers
    cómodos con el pulgar (cerrar accesible, sin scroll atrapado).
  - Cuida el peso: el móvil suele ir con peor red. Imágenes bien dimensionadas.

════════════════════════════════════════════════════════════════════
STACK DE SKILLS POR FASE (invoca cada una cuando toque)
════════════════════════════════════════════════════════════════════
▸ AUDITORÍA Y PLAN
  superpowers:brainstorming · superpowers:writing-plans · web-quality-audit (baseline
  medible ANTES) · redesign-existing-projects · impeccable · codebase-design.
▸ DIRECCIÓN Y SISTEMA DE DISEÑO
  ui-ux-pro-max (design, design-system, ui-styling, brand: paletas, pares de fuentes,
  estilos y guías UX) · high-end-visual-design · design-taste-frontend ·
  web-design-guidelines (Vercel) · frontend-design · tailwind-design-system.
▸ TEXTO
  humanizer (obligatorio, en todo) · landing-page-design (jerarquía y CTA que convierten).
▸ COMPONENTES Y CÓDIGO
  components-build · vercel-react-best-practices · nextjs-app-router-patterns ·
  full-output-enforcement (código completo, sin placeholders ni recortes).
▸ MOVIMIENTO
  find-animation-opportunities · apple-design · improve-animations ·
  fixing-motion-performance · vercel-react-view-transitions · review-animations.
▸ CALIDAD Y VISIBILIDAD
  performance · core-web-vitals · accessibility · best-practices (Addy Osmani) ·
  seo + seo-audit + ai-seo.
▸ CIERRE
  superpowers:verification-before-completion · web-quality-audit (re-run) ·
  superpowers:systematic-debugging.

NO uses: minimalist-ui, industrial-brutalist-ui, gpt-taste, imagegen-frontend-mobile,
brandkit, stitch-design-taste, image-to-code, design-taste-frontend-v1, pick-ui-library,
slides, banner-design, programmatic-seo, threejs-* (esta pasada es de pulido: nada de 3D).

════════════════════════════════════════════════════════════════════
GOTCHAS CONOCIDOS (no tropieces con ellos)
════════════════════════════════════════════════════════════════════
- AnimatePresence con mode="wait" se ATASCA en los pasos del quiz (SkinDiagnostic):
  usa remonte por `key`.
- Los cambios en tailwind.config.ts NO se aplican en caliente: reinicia el dev server.
  No corras `npm run build` con el dev activo.
- lib/utils.ts tiene un cn() con extendTailwindMerge que registra la escala propia
  (text-display-md, rounded-vitrine, shadow-gold, ease-editorial…). NO lo sustituyas por
  un cn() genérico: borraría los tamaños en silencio. Si creas tokens nuevos con nombre
  propio, regístralos ahí también.
- Los nombres de archivo con espacios y paréntesis de las fotos nuevas deben renombrarse
  antes de referenciarlos.

════════════════════════════════════════════════════════════════════
CONSTRAINTS NO NEGOCIABLES
════════════════════════════════════════════════════════════════════
- Funcionalidad intacta y verificada: carrito (BagDrawer), catálogo (CatalogOverlay),
  ficha (ProductDrawer), quiz SkinDiagnostic completo, enlaces de afiliada, WhatsApp
  float, Instagram, AnnouncementBar, skip-link, PDP.
- Cero enlaces rotos, cero imágenes rotas, cero errores en consola.
- prefers-reduced-motion respetado siempre. Mantén el <noscript> que revela el
  contenido con opacity:0 cuando no hay JS.
- Accesibilidad AA: contraste, foco visible, aria labels, navegación por teclado,
  targets ≥44px, jerarquía de headings correcta.
- Core Web Vitals en verde (LCP < 2.5s, INP < 200ms, CLS < 0.1). Cuida el LCP del hero.
- SEO coherente: metadatos, Open Graph, JSON-LD de Producto en PDP, `sameAs` con el
  Instagram. Nada de "curadora" ni lenguaje clínico en ningún texto nuevo.
- `npm run build` limpio y sin errores de tipos.

════════════════════════════════════════════════════════════════════
PLAN POR FASES
════════════════════════════════════════════════════════════════════
FASE 0 — AUDITORÍA TOTAL (piensa al máximo aquí)
  Lee TODOS los componentes, globals.css, tailwind.config.ts y lib/*. Arranca el dev y
  recorre la página entera en escritorio Y en móvil (375/390/768). Corre web-quality-audit
  para la foto ANTES. Entrega una lista de defectos concreta y priorizada: qué se ve
  barato o recargado, dónde falla la jerarquía, qué textos sobran o suenan a IA, qué
  fotos están mal usadas, qué se rompe en móvil, qué animaciones sobran o faltan, qué
  penaliza el rendimiento. Escribe el plan (writing-plans) antes de editar.
FASE 1 — FOTOGRAFÍA: integra las dos nuevas, resuelve el fondo blanco, limpia huérfanas.
FASE 2 — DEPURACIÓN VISUAL: aplica el minimalismo editorial sección por sección (quita
  ornamento que no aporta, sube el aire, refuerza la jerarquía, unifica espaciados).
FASE 3 — TEXTO: pasa todo por humanizer, resume, corta y afina CTAs.
FASE 4 — MOVIMIENTO: audita, implementa y limpia; view transitions a la PDP.
FASE 5 — MÓVIL: repasa cada sección y arregla todo lo que no esté impecable.
FASE 6 — PERF / A11Y / SEO con las skills de Addy Osmani y las de SEO.
FASE 7 — VERIFICACIÓN (obligatoria, no me pidas que revise yo):
  dev en 3100, consola con 0 errores, prueba real (abrir catálogo, ficha, añadir al
  carrito, completar el quiz entero, navegar a una PDP, clic de afiliada, Instagram),
  responsive 375/390/768/1280+, `npm run build` limpio (detén el dev antes),
  web-quality-audit de nuevo comparado con el baseline, y screenshots ANTES/DESPUÉS de
  cada sección en escritorio y en móvil.

════════════════════════════════════════════════════════════════════
DEFINICIÓN DE "IMPECABLE" (así sé que terminaste)
════════════════════════════════════════════════════════════════════
- Al abrirla se siente cara, calmada y única. Cero aroma a plantilla o a IA.
- Eilin es la protagonista: se la ve, se la lee y se la reconoce como persona.
- Las fotos nuevas están integradas y se ven intencionadas, no pegadas.
- Ni un texto sobra; todo suena a ella hablando.
- El movimiento acompaña y sorprende sin estorbar, y degrada con elegancia.
- El móvil está tan cuidado como el escritorio.
- Accesible, rápida, sin errores, con el build limpio y métricas mejores que el baseline.

ENTREGABLE: (1) auditoría priorizada + baseline, (2) decisiones de dirección de arte con
su porqué (sobre todo fotografía y qué ornamento se retiró), (3) inventario de textos
reescritos o recortados, (4) archivos tocados y limpieza de /public, (5) métricas
antes/después y screenshots de escritorio y móvil. Código completo, sin recortes.

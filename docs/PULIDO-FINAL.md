# Pasada de pulido final

Auditoría, decisiones y verificación de la revisión de detalle sobre la
portada de Eilin Guependo. Todo lo que aparece aquí está medido sobre el
build de producción (`next build` + `next start` en el puerto 3100), no
sobre el servidor de desarrollo.

---

## 1. Auditoría priorizada y baseline

### Lo que se midió antes de tocar nada

| Medida | Antes |
|---|---|
| Alto de la portada en móvil (390 px) | 12 681 px |
| Alto de la portada en escritorio (1440 px) | 10 086 px |
| Capítulo 02, el bloque más largo, en móvil | 2 782 px (22 % de la página) |
| GIF de Jeju servido desde el CDN de la marca | **34,8 MB** |
| Fotos de producto del CDN, sin optimizar, solo en la portada | **5 134 KB** |
| Optimización de imágenes de Next | desactivada (`unoptimized: true`) |
| Elementos compitiendo en la primera pantalla | 15 |
| Fotos de Eilin en uso | 4 |
| Archivos huérfanos en `/public` | 15 (4 de ellos copia exacta de `/founder`) |
| Imagen de Open Graph | ninguna |

### Defectos, por gravedad

**Bloqueantes (roto en producción, invisible en `next dev`)**

1. **La página se publicaba sin su tipografía de display.** `adjustFontFallback: false`
   hacía que next/font generase dos hashes distintos para Bodoni Moda: el
   `<html>` salía con la clase `__variable_f1e6c4` y el CSS definía la variable
   en `.__variable_47f8ee`. Ninguna regla casaba, `--font-display` quedaba
   vacía, la declaración `font-family: var(--font-display), Didot, …` se
   volvía inválida y **todo el display (masthead, titulares de capítulo,
   precios) caía al sans heredado del body**. En desarrollo se veía bien.
2. **El titular "Nacido en Jeju" no aparecía nunca.** La cortina la observaba
   el propio texto (`whileInView` sobre un span desplazado un 110 % dentro de
   un `overflow-hidden`). IntersectionObserver mide contra el rectángulo ya
   recortado por los ancestros, así que el span no entraba jamás en pantalla
   y la animación no se disparaba.
3. **El optimizador de imágenes se colgaba** en `w=828` (la medida que pide un
   viewport de 768 px). Sin `sharp` instalado, Next 14 cae a un codificador
   AVIF por software que no terminaba. La foto del hero no cargaba en tablet.

**Graves (rendimiento y coste de datos)**

4. **34,8 MB de GIF** en el capítulo 06. Iba en lazy, pero quien llegaba hasta
   ahí se lo descargaba entero, casi siempre desde el móvil.
5. **5,1 MB de PNG** del CDN en la portada, servidos sin optimizar con `<img>`
   crudo (el optimizador estaba desactivado a nivel de proyecto).
6. **El LCP dependía de la hidratación.** La portada entera arrancaba en
   `opacity: 0` y la revelaba framer al montar; con la CPU frenada 4× (un
   móvil de gama media real) el LCP se medía en **5 476 ms** con la imagen ya
   descargada y decodificada, solo esperando a React. Ese 5 476 está medido
   con la portada nueva pero todavía revelada por framer, o sea aislando
   exactamente esta causa: la anterior tenía el mismo mecanismo y además una
   foto sin optimizar, así que no salía mejor parada.

**De diseño**

7. **La portada tenía quince elementos compitiendo**: folio de tres datos,
   masthead, rótulo, titular, entradilla, dos botones, sumario de tres
   enlaces, retrato enmarcado, pie del retrato en vertical, pie en
   horizontal, y una banderola con miniatura, precio, guardar y comprar de
   la pieza nº 1, que además volvía a salir idéntica ochocientos píxeles más
   abajo.
8. **Tres controles para un solo destino** en el header: enlace "Catálogo",
   lupa y botón "Ver el catálogo".
9. **Fotografía infrautilizada.** Las cuatro fotos en uso eran planos enteros
   de estudio: en el capítulo 03 la cara de Eilin medía veinte píxeles dentro
   de un círculo de 64 y había que acercarla con un `scale(1.8)`; en el 04 el
   retrato mostraba más suelo que persona.
10. **Adorno repetido**: una "E" de 34 rem al 7 % de opacidad a cuarenta
    píxeles de la capitular de la carta, y tres firmas manuscritas, dos de
    ellas a doscientos píxeles una de otra.
11. **Tres etiquetas distintas para el mismo CTA** (`#concerns`): "Armar mi
    rutina", "Hacer mi consulta", "Empezar por aquí".
12. **En un portátil de 1280×720 el botón principal caía en 755 px**, fuera
    de pantalla.
13. `min-h-[88dvh]` sin tope convertía el capítulo 06 en una banda de 1 270 px
    con tres líneas de texto en un monitor de 1440 de alto.
14. El contador "1 de 3" del cuestionario estaba dentro de un `aria-hidden`:
    con lector de pantalla la consulta no tenía ni principio ni final.
15. El salto de línea del titular del capítulo 04 dejaba el nombre accesible
    pegado ("Lo que recomiendoy por qué").
16. El skip-link, al recibir foco, medía 30 px de alto.

---

## 2. Dirección de arte: qué se decidió y por qué

### Fotografía

Las dos fotos nuevas están **recortadas con canal alfa real**, no fundidas con
`mix-blend-mode` ni enmarcadas como plancha blanca. El script que lo hace
(pasada única, con Pillow) detecta el fondo **por conectividad desde el
borde**, no por umbral global: así los blancos que están *dentro* del sujeto
(los envases de RIMAN, el tapón del sérum) se conservan intactos, que es
exactamente lo que rompe un recorte por umbral. En el canto se calcula una
alfa suave a partir de la luminancia, porque el sujeto de la segunda foto está
desenfocado y un corte binario le dejaba un ribete blanco.

Por qué alfa y no `multiply`: la mezcla habría convertido los envases blancos
en papel porcelana (que es justo el producto que hay que ver), depende del
soporte de `mix-blend-mode` y solo funciona sobre fondos claros. El recorte
funciona igual sobre cualquier fondo y no cuesta nada en tiempo de ejecución.

| Archivo | Dónde | Por qué ahí |
|---|---|---|
| `founder/eilin-gesto.webp` (872×1236, 97 KB) | **01 Portada**, LCP | Es la mejor foto de marca personal del set: cara protagonista y gesto real de producto en la misma imagen. Va sin marco, flotando sobre el papel y **pisando la línea de base del masthead**. Ese cruce entre la tipografía y la figura es el gesto de portada de revista de toda la vida, y es lo que ninguna plantilla trae de fábrica. |
| `founder/eilin-manos.webp` (834×1253, 64 KB) | **02 Lo que más me piden** | Dos envases de RIMAN sostenidos por ella con la cara desenfocada detrás: es literalmente la escena que titula el capítulo. Y evita que el bloque más comercial de la página empiece con una ficha de catálogo. Sobre porcelana el canto del recorte es invisible. |
| `founder/eilin-mirada.jpg` (560×700, nuevo recorte) | **03 La consulta** | Sustituye al círculo de 64 px con `scale(1.8)`. El recorte va hecho en el archivo y el marco es un rectángulo con filete, como el resto de la casa: el círculo era la única pieza redonda de la página. |
| `founder/eilin-retrato.jpg` (recortado a 640×853) | **04 Quién está detrás** | Antes mostraba el cuerpo entero y mucho suelo. Recortado a medio cuerpo, la cara se lee de un vistazo, que es lo mínimo que puede pedir un capítulo titulado "quién está detrás". |
| `founder/eilin-editorial.jpg` (recortado a 600×800) | **07 Cierre del número** | Mismo criterio de encuadre. |
| `og.jpg` (1200×630, 75 KB, generado) | Vista previa de enlace | El sitio se comparte por historias de Instagram y por WhatsApp: la vista previa es lo primero que ve casi todo el mundo. Es la misma portada, con el recorte sobre porcelana y filete de oro. Antes no había ninguna. |

### Ornamento retirado

Todo lo que sigue se fue por la misma vara: **si no informa, ocupa**.

- **Banderola de portada** con la pieza nº 1 (miniatura, precio, guardar,
  comprar). Repetía la tarjeta del capítulo 02 a ochocientos píxeles y metía
  cuatro decisiones en la primera pantalla.
- **Sumario "En este número"** de la portada. El header lleva esos enlaces y
  no se va nunca de la pantalla.
- **Los dos pies del retrato de portada** (vertical en el canto y horizontal
  debajo). El masthead dice el nombre a 152 px de cuerpo.
- **El segundo enlace del bloque de acción** de la portada: llevaba al
  capítulo que está justo debajo.
- **Marco de museo y filtro cálido del retrato de portada**: un recorte con
  alfa no necesita marco, y el filtro le cambiaba el tono de la piel.
- **La "E" gigante de fondo del capítulo 04.** A cuarenta píxeles, la carta de
  Eilin ya abre con una capitular en la misma itálica y del mismo color.
- **Una de las tres firmas manuscritas** (la del pie). El capítulo 07 firma
  el número doscientos píxeles más arriba.
- **El pie de foto del retrato del capítulo 04**: repetía el nombre en el
  capítulo que trata de ella.
- **El enlace "Catálogo" del header**: la lupa y el botón abren el mismo panel.
- **El descriptor bajo el wordmark**: en 375 px partía el nombre en dos
  renglones para dejar sitio a una línea que nadie lee.

### Movimiento

- La coreografía de entrada de la portada pasó de framer a **CSS**
  (`.cover-in`, `.cover-figure`, `.cover-rise`). La primera pantalla no puede
  depender de que haya hidratado el bundle para dejarse ver. La figura
  protagonista además **no anima opacidad, solo desplazamiento**: un elemento
  a `opacity: 0` no cuenta como candidato a LCP.
- La cortina del capítulo 06 ahora la observa el `h2` (que sí está a la vista)
  y el texto se anima como hijo con variantes.
- Las dos cortinas llevan `motion-reduce:!transform-none`, así que con
  movimiento reducido el texto está puesto desde el primer fotograma en vez
  de esperar a una animación que el sistema ha desactivado.
- Se mantiene todo lo que ya estaba bien y cumple `fixing-motion-performance`:
  parallax de dos velocidades en la portada (solo `transform`), cáustica de
  champagne en CSS puro, springs con masa en los paneles, `rAF` con compuerta
  y `cancelAnimationFrame` en el riel de rutinas, y `MotionConfig
  reducedMotion="user"` de política global.
- **View transitions a la ficha: descartadas a propósito.** El componente
  `<ViewTransition>` de React es de React 19 y este proyecto va con React 18
  y Next 14; la alternativa (envolver el router en `document.startViewTransition`)
  no encaja limpio con el App Router y hoy no la soportan todos los
  navegadores. Preferí no meter una capa frágil en la navegación que lleva al
  enlace de afiliada.

---

## 3. Textos reescritos o recortados

Todo pasado por `humanizer`: primera persona, sin em dashes, sin vocabulario
de IA, sin promesas médicas, y cortando lo que se podía decir en la mitad.

| Dónde | Antes | Ahora |
|---|---|---|
| Portada, rótulo | "En primera persona" | "Skincare coreano de RIMAN" (dice qué se vende, no cómo se habla) |
| Portada, entradilla | "Aquí está el catálogo entero de RIMAN. Yo te digo por dónde empezar y por qué." | "Aquí está el catálogo entero. Yo te digo por dónde empezar." |
| Cap. 02, rótulo | "Lo más pedido" | "Lo que más me piden" |
| Cap. 02, titular | "Lo que más *se repite* en los pedidos" | "Las que *no paran* de salir" |
| Cap. 02, entradilla | "No es un ranking de marketing: es el orden real en que salen de la boutique, mes tras mes." | "El orden sale de los pedidos de cada mes." |
| Cap. 03, pie del retrato | "Con piezas del catálogo, el porqué de cada paso y el precio completo. Sin registros ni correos." | "Tres preguntas y te digo qué usar y en qué orden. Sin registros ni correos." |
| Cap. 03, opción | "Piel jugosa, cómoda, bien reservada." (no significaba nada) | "Piel jugosa y cómoda todo el día." |
| Cap. 03, opción | "Despertar el tono, textura con luz." | "Que el tono se vea despierto." |
| Cap. 03, opción | "Elasticidad y rebote, por fuera y por dentro." | "Elasticidad y rebote." |
| Cap. 03, opción | "Menos rojez, más confort." | "Menos rojeces y más confort." |
| Cap. 03, resultado | "Tu rutina personal" | "Lo que yo usaría" |
| Cap. 03, progreso | "1 de 3" (dentro de un `aria-hidden`) | "Pregunta 1 de 3", anunciado |
| Cap. 04, carta | "La rutina coreana llegó a mi vida como llegan las mejores cosas: sin prisa. Al principio fue curiosidad por una crema, luego una rutina entera, y un día me di cuenta de que el orden en que me aplicaba las cosas había dejado de parecerme complicado." | "Empecé por curiosidad, con una crema. Un año después tenía la rutina entera y el orden ya no me parecía complicado." |
| Cap. 04, recomendación 1 | "Si solo te llevas una cosa de esta página, que sea esta crema. Es la primera que recomiendo, siempre." | "Si solo te llevas una cosa de aquí, que sea esta crema." |
| Cap. 04, recomendación 2 | "…Hidratación profunda y elasticidad desde las primeras semanas." | "El dúo por el que recomiendo empezar. Se nota en las primeras semanas." |
| Cap. 04, recomendación 3 | "Innegociable. Todo lo que tu rutina construye de noche, el sol lo borra de día si no la proteges." | "Innegociable. Lo que la rutina hace de noche, el sol lo deshace de día." |
| Cap. 05, entradilla | "Limpieza, esencia, tratamiento y sellado, en el orden correcto y sin que tengas que decidir nada." | "Los pasos vienen en orden. Tú no tienes que decidir nada." |
| Cap. 06, texto | "…con agua mineral y fermentos que no existen en ningún otro lugar. De ahí sale la materia prima de cada fórmula del catálogo." | "Una isla volcánica en el sur de Corea. De ahí salen el agua y el fermento con los que RIMAN formula lo que ves aquí." |
| Cap. 07, aparte | "…con piezas del catálogo, con el porqué de cada paso." + "Sin registros ni correos. Tarda menos de un minuto." | "…con el porqué de cada paso." + "Tarda menos de un minuto. Sin registros ni correos." |
| Cap. 07, cierre | "…en Instagram muestro cómo armo mi rutina y qué recomiendo." | "…todo lo que uso está en mi Instagram." |
| Bolsa vacía | "Guarda productos con el corazón, o responde la consulta y arma tu rutina en un minuto." | "Guarda lo que te guste con el corazón, o respóndeme tres preguntas y te la armo yo." |
| CTAs a `#concerns` | "Armar mi rutina" / "Hacer mi consulta" / "Empezar por aquí" | **"Armar mi rutina"** en los cuatro sitios |
| `alt` de las fotos | genéricos ("Retrato de Eilin Guependo, que recomienda…") | descriptivos ("Eilin Guependo sentada en el suelo de un estudio, con camiseta blanca y vaqueros grises, mirando a cámara") |

---

## 4. Archivos tocados y limpieza de `/public`

### Código

`app/layout.tsx` · `app/page.tsx` · `app/globals.css` · `app/producto/[id]/page.tsx`
`components/Hero.tsx` · `Bestsellers.tsx` · `SkinDiagnostic.tsx` · `Curator.tsx`
`Rituals.tsx` · `JejuFilm.tsx` · `Testimonials.tsx` · `Header.tsx` · `Footer.tsx`
`ProductCard.tsx` · `ProductDrawer.tsx` · `BagDrawer.tsx` · `pdp/Gallery.tsx`
`lib/media.ts` · `next.config.mjs` · `package.json` (`sharp`) · `.claude/launch.json`

### `/public`

Antes: 15 huérfanas en la raíz + 4 fotos en `/founder`. Ahora:

```
public/
  og.jpg                      75 KB   generada
  founder/eilin-gesto.webp    97 KB   recorte con alfa, LCP
  founder/eilin-manos.webp    64 KB   recorte con alfa
  founder/eilin-mirada.jpg    49 KB   recorte nuevo
  founder/eilin-retrato.jpg   66 KB   reencuadrada
  founder/eilin-editorial.jpg 62 KB   reencuadrada
  media/jeju.mp4             656 KB   reencodeado del GIF de 34,8 MB
  media/jeju.webm            440 KB
  media/jeju-poster.jpg       68 KB
```

Las 15 huérfanas y los originales de las dos fotos nuevas están en
`originales/` (fuera de `/public`, añadido a `.gitignore`: siguen en disco
para la clienta pero no pesan en el repositorio ni se publican). Cuatro de
ellas eran **copia byte a byte** de las de `/founder`, verificado por MD5:

| Huérfana | Duplicado exacto de |
|---|---|
| `robinson4850_DORF0I8DlII_1.jpg` | `founder/eilin-portada.jpg` |
| `robinson4850_DORF0I8DlII_3.jpg` | `founder/eilin-consulta.jpg` |
| `pluss__photographyoficial_DSQWgw1D8ZA_2.jpg` | `founder/eilin-retrato.jpg` |
| `pluss__photographyoficial_DSQWgw1D8ZA_3.jpg` | `founder/eilin-editorial.jpg` |
| `robinson4850_DORF0I8DlII_2 (1).jpg` | `robinson4850_DORF0I8DlII_2.jpg` |
| `robinson4850_DORF0I8DlII_6 (1).jpg` | `robinson4850_DORF0I8DlII_6.jpg` |

---

## 5. Métricas antes y después

Medido sobre el build de producción, con la CPU frenada 4× y red de 9 Mbps /
70 ms de latencia (un móvil de gama media en 4G). Mediana de tres cargas.

Una aclaración sobre el "antes", para que las cifras signifiquen algo: el
proyecto de partida tenía la optimización de imágenes desactivada, así que no
existe un build de producción anterior comparable con este. Las columnas de
abajo dicen exactamente de dónde sale cada número.

| | Antes | Después |
|---|---|---|
| **LCP escritorio** | 5 476 ms *(medido con la portada revelada por framer, que es como estaba)* | **1 748 ms** |
| **LCP móvil** | 5 244 ms *(ídem)* | **1 644 ms** |
| **CLS escritorio / móvil** | sin medir | **0,0017 / 0,0000** |
| FCP escritorio / móvil | sin medir | 1 364 / 1 464 ms |
| Primer viewport | sin medir | 407 / 389 KB |
| **Página entera recorrida** | ~40 MB *(suma de los activos: 34,8 MB de GIF + 5,1 MB de PNG + bundle)* | **1 103 / 1 039 KB** *(medido)* |
| GIF / vídeo de Jeju | 34 800 KB *(medido en el CDN)* | 656 KB (MP4) / 440 KB (WebM), y no se pide hasta 400 px antes de entrar en pantalla |
| Fotos de producto de la portada | 5 134 KB en PNG *(medido, 24 imágenes)* | 142 KB en AVIF *(medido, las mismas 24)* |
| Alto de la página, móvil | 12 681 px | 11 826 px |
| Alto de la página, escritorio | 10 086 px | 9 728 px |
| First Load JS | 187 KB | 187 KB (sin cambios) |

`npm run build` limpio, sin errores de tipos ni de lint.

### Verificación funcional

34 comprobaciones automatizadas contra el build de producción, en Chrome real
(no en el panel de vista previa, que no compone fotogramas y falsea cualquier
medida de scroll o de animación), a **1440×900, 1280×720, 768×1024, 390×844 y
375×812**: **34/34 en las cinco medidas**.

Cubren: portada y `h1`, recorte del hero cargado, skip-link, Instagram,
ninguna imagen rota, titular de Jeju visible, vídeo de Jeju armado y servido
en local, cero desbordamiento horizontal, todos los enlaces de compra
apuntando a `mall.riman.com/miraeseglow` con `rel="noopener sponsored"` y
`target="_blank"`, jerarquía de encabezados sin saltos, objetivos táctiles de
44 px, cuestionario completo (tres pasos, resultado con precio, cuatro pasos
de rutina), "añadir todo a mi rutina" abriendo la bolsa con las cuatro líneas
y el total, cierre de la bolsa liberando el scroll, catálogo (37 fichas, foco
en el buscador, búsqueda con sinónimos, cierre), ficha rápida con enlace de
afiliada, PDP con JSON-LD de Producto y CTA de afiliada, vuelta a la portada,
y consola sin un solo error.

Capturas por capítulo, en escritorio y en móvil, en `originales/capturas/`.

---

## 6. Lo que queda anotado y no toqué

- `components/Spotlight.tsx` y `components/StartHere.tsx` no los importa
  nadie y no están en la lista de retirados a propósito (FAQ, FinalCTA,
  Ingredient, Story). Son código muerto: no llegan al bundle, pero sobran.
- Los componentes de `components/ui/` (texture-card, minimal-card,
  texture-button, gradient-heading, text-animate, animated-number) tampoco
  los usa nadie. La casa ya tiene su propio vocabulario de tarjetas y
  botones, y meterlos ahora sería añadir un segundo sistema.
- `SITE.whatsapp` sigue vacío, así que el botón flotante y el botón "pedir
  asesoría con mi lista" de la bolsa no se pintan. Con el número puesto, los
  dos aparecen solos.
- `SITE.url` sigue vacío: sin dominio no se emiten canonical, sitemap ni
  `og:image` (a propósito, para no publicarlos apuntando a localhost). En
  cuanto se defina `NEXT_PUBLIC_SITE_URL` se emiten los tres, la tarjeta de
  enlace incluida.
- Los recortes con alfa se sirven en AVIF o WebP a cualquier navegador que
  los acepte. Un cliente que no acepte ninguno de los dos recibiría un JPEG
  sin canal alfa; en la práctica eso son navegadores anteriores a 2020, que
  tampoco ejecutarían esta aplicación.

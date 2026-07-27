import type { Config } from "tailwindcss";

// ─── Sistema de diseño "Atelier editorial" ──────────────────────────
// Identidad: porcelana cálida + champagne dorado + jade profundo.
// Tres capas: primitivas (color crudo, curvas), semánticas (papel, tinta,
// oro, filete) y de componente (vitrina, cajón, sello). Nada de valores
// mágicos sueltos en los componentes.
//
// Tipografía: Bodoni Moda para los momentos grandes (didone de alto
// contraste, voz de portada) y Jost para todo lo funcional. La didone se
// rompe en tamaños pequeños, así que la escala separa los dos mundos:
// de `title` hacia arriba manda el display; de `lede` hacia abajo, el sans.

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: {
          DEFAULT: "#F7F4EF",
          warm: "#F3EDE2",
          /* Banda para alternar secciones sin salir del papel. */
          deep: "#EDE7DA",
        },
        ivory: "#FDFBF7",
        ink: {
          DEFAULT: "#1A1A18",
          soft: "#2C2B27",
        },
        stone: {
          DEFAULT: "#8A867E",
          light: "#B5B1A8",
          /* 5.1:1 sobre porcelana: el gris válido para texto pequeño. */
          dark: "#635F57",
        },
        hairline: "#E7E2D8",
        champagne: {
          DEFAULT: "#B69B62",
          deep: "#96793E",
          /* Bronce: mismo pigmento, oscurecido para microtexto AA
             sobre porcelana (≥ 4.5:1). */
          bronze: "#77602F",
          soft: "#EFE6D3",
          mist: "#F6F0E4",
          glow: "#E7C89A",
          /* Oro claro: el único que cumple AA sobre jade. */
          light: "#DFC48C",
        },
        jade: {
          DEFAULT: "#12211C",
          soft: "#1A2E27",
          deep: "#0C1713",
          mist: "#24382F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* ── Jost: lo funcional ─────────────────────────────────────── */
        micro: ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.22em" }],
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.22em" }],
        note: ["0.8125rem", { lineHeight: "1.6" }],
        body: ["0.9375rem", { lineHeight: "1.75" }],
        lede: ["1.1875rem", { lineHeight: "1.65" }],
        /* ── Bodoni Moda: los momentos grandes ──────────────────────── */
        title: ["clamp(1.375rem,1.9vw,1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.005em" }],
        "display-sm": ["clamp(1.875rem,3.4vw,2.625rem)", { lineHeight: "1.06", letterSpacing: "-0.012em" }],
        "display-md": ["clamp(2.5rem,5vw,4rem)", { lineHeight: "1", letterSpacing: "-0.022em" }],
        "display-lg": ["clamp(3rem,6.6vw,5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.028em" }],
        "display-xl": ["clamp(3.25rem,8.8vw,7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.032em" }],
        masthead: ["clamp(3.25rem,11.2vw,9.5rem)", { lineHeight: "0.9", letterSpacing: "-0.038em" }],
      },
      letterSpacing: {
        micro: "0.28em",
        wide2: "0.14em",
        eyebrow: "0.22em",
      },
      spacing: {
        /* Ritmo de sección: compás corto, medio y de respiro largo. Un
           número no lleva ocho capítulos con el mismo aire: `section-sm`
           es el compás breve que permite encadenar dos bloques como si
           fueran una sola doble página. */
        "section-sm": "3.5rem",
        section: "5.5rem",
        "section-lg": "8rem",
        "section-xl": "10rem",
      },
      maxWidth: {
        /* Medida de lectura editorial: ~66 caracteres en Jost 15px. */
        measure: "34rem",
        /* Columna estrecha de revista: ~45 caracteres. Para los momentos
           en que el texto tiene que leerse como un pie de página largo. */
        column: "26rem",
        /* Plancha: la caja ancha de una doble página, más generosa que el
           max-w-7xl del cuerpo de la revista. */
        plate: "88rem",
      },
      borderRadius: {
        /* Sistema: esquinas vivas para lo editorial, "sello" suave para
           chips e islas, círculo para controles. */
        seal: "2px",
        vitrine: "4px",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        marqueeX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        /* Cáustica: la luz que atraviesa un frasco de vidrio y se mueve
           despacio sobre el papel. Reemplaza cualquier tentación de WebGL. */
        caustic: {
          "0%, 100%": { transform: "translate3d(-4%,-2%,0) scale(1)", opacity: "0.55" },
          "33%": { transform: "translate3d(5%,3%,0) scale(1.12)", opacity: "0.8" },
          "66%": { transform: "translate3d(-2%,5%,0) scale(1.05)", opacity: "0.62" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        glowPulse: "glowPulse 7s ease-in-out infinite",
        shimmer: "shimmer 2.6s linear infinite",
        marqueeX: "marqueeX 36s linear infinite",
        caustic: "caustic 18s ease-in-out infinite",
        "caustic-slow": "caustic 26s ease-in-out infinite reverse",
      },
      boxShadow: {
        /* Sombras multicapa entintadas con el tono del papel (ink cálido),
           nunca negro puro. hairline = borde óptico; card/lift = elevación;
           vitrine = pieza de museo; drawer = paneles laterales. */
        hairline: "0 0 0 1px rgba(26,26,24,0.06)",
        card: "0 1px 2px rgba(38,34,26,0.05), 0 10px 28px -14px rgba(38,34,26,0.14)",
        cardHover:
          "0 2px 4px rgba(38,34,26,0.06), 0 18px 44px -16px rgba(38,34,26,0.22), 0 30px 70px -30px rgba(150,121,62,0.18)",
        vitrine:
          "0 1px 0 rgba(255,255,255,0.65) inset, 0 1px 2px rgba(38,34,26,0.05), 0 24px 60px -24px rgba(38,34,26,0.22)",
        /* Papel montado: la hoja levantada un milímetro sobre la mesa. */
        paper:
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 2px 3px rgba(38,34,26,0.04), 0 32px 64px -40px rgba(38,34,26,0.35)",
        /* Halo de oro para el elemento protagonista de una escena. */
        gold: "0 0 0 1px rgba(182,155,98,0.35), 0 30px 80px -40px rgba(150,121,62,0.55)",
        drawer: "-24px 0 80px -32px rgba(26,26,24,0.4)",
        /* Plancha: la doble página a sangre. La imagen no descansa sobre
           el papel, lo atraviesa; por eso la sombra va hacia dentro y no
           hacia fuera. */
        plate: "0 0 0 1px rgba(26,26,24,0.05) inset, 0 60px 120px -60px rgba(26,26,24,0.5)",
        /* Banderola de portada: la cartela de papel apoyada sobre la
           fotografía. Necesita separarse de la foto sin ensuciarla, así
           que lleva luz arriba y una caída larga y muy abierta. */
        flag: "0 1px 0 rgba(255,255,255,0.85) inset, 0 2px 6px rgba(38,34,26,0.10), 0 22px 48px -20px rgba(38,34,26,0.42)",
        "jade-card":
          "0 1px 0 rgba(253,251,247,0.06) inset, 0 20px 50px -24px rgba(0,0,0,0.5)",
        focus: "0 0 0 2px #FDFBF7, 0 0 0 4px #96793E",
      },
      backgroundImage: {
        /* Materiales de la casa. */
        "vitrine-radial":
          "radial-gradient(circle at 50% 62%, #F3EDE2 0%, #FDFBF7 78%)",
        "champagne-sheen":
          "linear-gradient(110deg, transparent 20%, rgba(231,200,154,0.35) 50%, transparent 80%)",
        "jade-depth":
          "radial-gradient(ellipse at 50% 0%, #1A2E27 0%, #12211C 55%, #0C1713 100%)",
        /* Oro como material, no como color: rampa de metal con banda de
           luz. Se usa en filetes y, con background-clip, en numerales. */
        "gold-sheet":
          "linear-gradient(100deg, #7A6229 0%, #B69B62 20%, #F2E3BE 42%, #C6A96B 56%, #8A6E32 78%, #6E5726 100%)",
        "gold-hairline":
          "linear-gradient(90deg, transparent, rgba(150,121,62,0.15) 18%, rgba(242,227,190,0.9) 50%, rgba(150,121,62,0.15) 82%, transparent)",
        /* Viñeta de plancha: el borde entintado de una foto impresa a
           sangre. Evita que una imagen grande termine en un corte plano. */
        "paper-edge":
          "radial-gradient(ellipse 92% 88% at 50% 45%, transparent 42%, rgba(26,26,24,0.28) 100%)",
        /* Velo de plancha: el scrim que hace legible un titular sobre
           fotografía sin apagar la imagen entera.
           Las paradas están calculadas, no elegidas a ojo: el caso peor
           es que el píxel de la foto bajo el rótulo sea blanco puro. Con
           el velo anterior (0,45 a un tercio de altura) el rótulo en
           champagne-light caía a 3:1 sobre ese blanco. Manteniendo 0,80
           hasta el 30 % de la plancha, el mismo caso peor da 6:1 y el
           texto en marfil pasa de 7:1. */
        "plate-veil":
          "linear-gradient(to top, rgba(18,33,28,0.92) 0%, rgba(18,33,28,0.80) 30%, rgba(18,33,28,0.42) 55%, transparent 80%)",
        /* Cáustica de champagne: dos manchas de luz que respiran. */
        caustic:
          "radial-gradient(ellipse 60% 45% at 30% 30%, rgba(231,200,154,0.55) 0%, transparent 60%), radial-gradient(ellipse 45% 60% at 70% 60%, rgba(242,227,190,0.45) 0%, transparent 65%)",
      },
      transitionTimingFunction: {
        /* Curva editorial de la casa: salida rápida, aterrizaje suave. */
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
        silk: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      zIndex: {
        /* Escala sistémica: header 50 < ficha 60/70 < catálogo 65 se
           mantiene por compatibilidad; toast siempre encima. */
        header: "50",
        overlay: "65",
        drawer: "70",
        bag: "90",
        toast: "100",
      },
    },
  },
  plugins: [],
};

export default config;

// ─── Fotografía y motion reales del CDN oficial (cdn.rimanbuild.com) ───
// Assets lifestyle capturados del sitio de la marca. Todos 1:1 salvo donde
// se indica. Se usan como material editorial en la boutique.

export const MEDIA = {
  // El metraje "Born from Jeju" de la marca. El original del CDN es un GIF
  // de 1080×1080 y 34,8 MB: aquí se sirve reencodeado a 960 px y 25 fps
  // (656 KB en MP4, 440 KB en WebM) con un fotograma de póster de 68 KB.
  // Los tres archivos viven en /public/media y se generaron con ffmpeg a
  // partir de ese mismo original.
  jejuMp4: "/media/jeju.mp4",
  jejuWebm: "/media/jeju.webm",
  jejuPoster: "/media/jeju-poster.jpg",

  // Banners lifestyle (800×800).
  tradition:
    "https://cdn.rimanbuild.com/Assets/Homepage/NAM/bannerTraditionInnovationImage.png",
  rethinking:
    "https://cdn.rimanbuild.com/Assets/Homepage/NAM/bannerRethinkingFormulationsImage.png",
  innovation:
    "https://cdn.rimanbuild.com/Assets/Homepage/NAM/bannerInnovationRedefinedImage.png",

  // Flatlay del ritual Signature (1250×1250), fotografía real en escena.
  ritualSignature:
    "https://cdn.rimanbuild.com/Rituals/NAM/SIG/Signature_Riman_Ritual_Webpage_v2_kk-02.jpg",
} as const;

// Trío editorial de la sección Story, con su pie de foto.
export const STORY_FRAMES = [
  {
    src: MEDIA.tradition,
    kicker: "Tradición",
    title: "Nacido en Jeju",
    text: "Agua de lava y fermento Giant BYoungPool™, cultivados en la isla volcánica del sur de Corea.",
  },
  {
    src: MEDIA.rethinking,
    kicker: "Fórmula",
    title: "Repensar la textura",
    text: "Cada activo se procesa en liposomas nanométricos hasta lograr una piel más ligera y receptiva.",
  },
  {
    src: MEDIA.innovation,
    kicker: "Innovación",
    title: "Ciencia propia",
    text: "Desarrollo desde el centro ASK LABS: una casa que formula, produce y perfecciona bajo un mismo techo.",
  },
] as const;


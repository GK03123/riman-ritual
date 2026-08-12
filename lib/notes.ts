// ─── Notas de Eilin por producto ────────────────────────────────────
// El API oficial entrega las descripciones en inglés y en tono de
// catálogo. Esta capa las traduce a la voz de Eilin: qué es,
// para quién y por qué está en la boutique. products.ts no se toca
// (es generado); si un id no tiene nota, la ficha cae con gracia a la
// descripción original.

const NOTES: Record<number, string> = {
  // ─ Radiansome™100 ─
  52747:
    "La esencia insignia de la casa. Va después de limpiar y antes del sérum, y es el paso que hace que todo lo demás se absorba mejor. Fórmula nanoliposomal pasada hasta siete veces por el Microfluidizer.",
  52745:
    "Mi favorita del catálogo y la primera que recomiendo. Rica sin ser pesada, con liposomas que trabajan la firmeza y dejan la piel con esa luz de piel descansada.",
  52743:
    "El tónico que prepara la piel para el tratamiento. Textura de agua con cuerpo, deja el rostro fresco y receptivo, nunca tirante.",

  // ─ Dermatology ─
  53140:
    "El dúo de booster y sérum por el que recomiendo empezar. Hidratación profunda, elasticidad y ese acabado jugoso desde las primeras semanas.",
  53142:
    "Crema hipoalergénica de absorción rápida. Es la que recomiendo para sellar cualquier rutina: cómoda, sin residuo y con hidratación de todo el día.",

  // ─ Limpieza ─
  53156:
    "El primer paso de la doble limpieza coreana. Este aceite disuelve protector solar y maquillaje sin resecar, y se retira con agua sin dejar película.",
  53158:
    "Limpiador cremoso con enzimas suaves. Limpia y exfolia sin fricción, ideal si tu piel es seca o reactiva y las espumas normales te dejan tirantez.",
  53152:
    "Polvo que se activa con agua y se convierte en espuma enzimática. Retira células muertas y devuelve luz a la textura; lo recomiendo dos o tres veces por semana.",
  52785:
    "El gel de limpieza diario para piel mixta o grasa. Retira impurezas y controla el brillo sin arrastrar la hidratación que la piel necesita.",

  // ─ Tratamiento y confort ─
  53144:
    "Gel ligero con agua de rosa de Damasco. Baja el enrojecimiento, calma la piel reactiva y refresca en días de calor o después del sol.",
  53146:
    "Bruma en dos fases con aceite y vitaminas. La uso para sellar el maquillaje o revivir la piel a media tarde; deja un brillo sano, no grasa.",
  53150:
    "Mascarilla de colágeno que se funde en la piel mientras duermes o descansas. El gesto de mimo de la rutina: piel rebotada a la mañana siguiente.",
  53148:
    "Bálsamo en barra para llevar en el bolso. Hidrata zonas puntuales, pómulos, labios y hasta cutículas, sin tocar el maquillaje.",

  // ─ Protección y acabado ─
  53154:
    "Innegociable. SPF 50+ de amplio espectro con textura de crema hidratante, sin rastro blanco. Todo lo que tu rutina construye de noche, este paso lo protege de día.",
  54538:
    "Un BB de cobertura ligera que ilumina y empareja el tono sin efecto máscara. Para los días de piel bonita con poco esfuerzo.",
  53195:
    "El spray que fija el maquillaje y refresca la piel al mismo tiempo. Lo uso al final del acabado y a media tarde sobre el maquillaje.",
  53197:
    "Cushion de acabado luminoso para retocar sin espejo grande ni brochas. Cobertura natural y ese glow coreano en un solo gesto.",
  53178:
    "Aceite de labios con brillo de tratamiento. Nutre de verdad, no solo brilla, y funciona sobre el tinte o solo.",
  53180:
    "Tres tintes de labios semi mate en un set. Color intenso que dura, textura mantequilla y acabado sin resecar.",
  53184:
    "La versión velvet mate de los tintes de labios. Más terciopelo, mismo confort; el color se queda aunque el café se acabe.",

  // ─ Cuerpo y cabello (BOTALAB) ─
  53170:
    "Crema corporal de textura batida con aroma Morning Garden. Hidratación intensa sin sensación grasa; la rutina del cuerpo que casi todas descuidamos.",
  53168:
    "La misma crema corporal batida, en el aroma Relaxing Sunday: más suave, para la noche. Hidrata profundo y se absorbe rápido.",
  53166:
    "Gel de ducha de espuma densa. Limpia sin resecar y deja la piel del cuerpo suave y con olor a limpio de verdad, no a perfume de farmacia.",
  53164:
    "Sérum en aceite para puntas y largos. Domina el frizz y da brillo sin apelmazar, con el extracto de deserticola de la línea capilar.",
  53160:
    "Shampoo de la línea Deserticola: limpia el cuero cabelludo con suavidad y prepara el cabello para el acondicionador. Sensación de spa en casa.",
  53162:
    "El acondicionador que completa la dupla capilar. Desenreda, sella la fibra y deja el cabello ligero, sin residuo siliconado.",

  // ─ Bienestar interno (Lifening) ─
  54387:
    "Colágeno bebible tipo I con biotina, ácido hialurónico y antioxidantes. El refuerzo desde adentro cuando el objetivo es firmeza; una ampolla al día.",
  53172:
    "Probióticos y fibra para el equilibrio digestivo. La piel también se construye desde el intestino; este es el básico silencioso del bienestar.",

  // ─ Rutinas y kits ─
  53375:
    "La rutina completa de la casa en ocho pasos: doble limpieza, calma, tratamiento, sellado y SPF. Si quieres la experiencia coreana entera en una sola compra, es esta.",
  53376:
    "La rutina Radiansome completa: doble limpieza más tónico, esencia y crema nanoliposomales. La que recomiendo cuando el objetivo es luminosidad y firmeza.",
  53372:
    "El punto de entrada que más recomiendo: limpieza, el dúo de tratamiento, crema y SPF. Cuatro pasos bien elegidos, nada de más.",
  53374:
    "La doble limpieza esencial con el polvo enzimático, más el dúo de tratamiento y la crema. Para pieles que quieren luz y textura fina.",
  53356:
    "La doble limpieza esencial con el gel equilibrante, pensada para piel mixta o grasa, más tratamiento e hidratación. Rutina corta y bien resuelta.",
  53373:
    "La doble limpieza esencial con el limpiador de enzimas de nieve, la versión más amable para piel seca o sensible, con tratamiento y crema incluidos.",
  53357:
    "El dúo estrella en un solo paquete: booster, sérum y crema. El regalo que más pido que me encarguen, y el empujón de glow más directo.",
  52823:
    "El kit de experiencia con la rutina experta en tamaños generosos, ideal para probar la línea completa o para regalar sin equivocarse.",
  52817:
    "Tres limpiadores en un kit: aceite en tamaño de viaje, el gel nuevo y el polvo enzimático. La puerta de entrada a la doble limpieza coreana.",
};

export function eilinNote(id: number): string | null {
  return NOTES[id] ?? null;
}

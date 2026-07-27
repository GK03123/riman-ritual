"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "¿Dónde se procesa mi compra?",
    a: "Cada producto se compra a través del enlace directo desde su ficha. El pago, el envío nacional y la garantía se gestionan desde Estados Unidos.",
  },
  {
    q: "¿Pago más por comprar desde esta página?",
    a: "No. Los precios son los publicados en la ficha oficial de cada producto. Sin recargos ni intermediarios en el pago.",
  },
  {
    q: "¿Qué es Incellderm y por qué es la línea insignia del catálogo?",
    a: "Incellderm (ICD) es la línea insignia de skincare de la boutique. Sus fórmulas combinan activos cultivados en Jeju con la tecnología nanoliposomal Microfluidizer™, que reduce los activos a partículas nanométricas para facilitar la penetración cutánea.",
  },
  {
    q: "¿Cómo son los envíos y las devoluciones?",
    a: "El envío se realiza dentro de Estados Unidos con política de devoluciones incluida. Los términos completos se consultan en la ficha oficial al momento de la compra.",
  },
  {
    q: "¿Por dónde comienza una rutina coreana?",
    a: "El Essential RIMAN Ritual reúne la doble limpieza y la hidratación esencial, y es el punto de entrada más recomendado. Para la rutina completa en ocho pasos, la referencia es el Signature RIMAN Ritual.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-hairline bg-ivory py-section lg:py-section-lg"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          chapter="09"
          eyebrow="Antes de comprar"
          title={
            <>
              Las dudas de siempre,{" "}
              <em className="italic text-champagne-deep">resueltas</em>
            </>
          }
        />
        <Reveal>
          <div className="divide-y divide-hairline border-y border-hairline">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-champagne-deep"
                  >
                    <span className="font-display text-title font-medium">{f.q}</span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-editorial",
                        isOpen
                          ? "rotate-45 border-champagne-deep bg-champagne-soft/60 text-champagne-deep"
                          : "border-hairline text-champagne-deep"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-editorial",
                      isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-stone-dark">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

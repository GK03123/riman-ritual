"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RITUALS } from "@/lib/products";
import { productUrl } from "@/lib/site";
import { formatPrice } from "@/lib/utils";
import Photo from "./Photo";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const GAP = 24; // gap-6

export default function Rituals() {
  const railRef = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ left: 0, scrollW: 0, clientW: 0 });

  // Medimos el riel para dibujar la barra de progreso y saber si estamos
  // en un extremo (para desactivar las flechas). Sin barra de scroll nativa:
  // la navegación es 100% con flechas, arrastre y esta barra.
  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setM((prev) => {
      const next = {
        left: el.scrollLeft,
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
      };
      // Devolver el mismo objeto cuando nada cambió evita un render por
      // cada frame de scroll en el que el riel ya está en el tope.
      return prev.left === next.left &&
        prev.scrollW === next.scrollW &&
        prev.clientW === next.clientW
        ? prev
        : next;
    });
  }, []);

  // El evento de scroll de un riel horizontal se dispara varias veces por
  // frame. Sin esta compuerta cada disparo provocaba un render de React
  // en mitad del gesto, que es justo donde se nota el INP.
  const frame = useRef(0);
  const onRailScroll = useCallback(() => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  const max = Math.max(0, m.scrollW - m.clientW);
  const progress = max > 0 ? m.left / max : 0;
  const thumbPct = m.scrollW > 0 ? Math.min(100, (m.clientW / m.scrollW) * 100) : 100;
  // Umbrales por progreso: el riel reposa a unos px del 0 por el snap, así que
  // comparar contra el extremo exacto dejaría la flecha activa sin efecto.
  const canScroll = max > 4;
  const atStart = !canScroll || progress <= 0.01;
  const atEnd = !canScroll || progress >= 0.99;

  // Un clic de flecha avanza exactamente una tarjeta (ancho + gap).
  const stepBy = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const card = first?.offsetWidth ?? el.clientWidth * 0.8;
    el.scrollBy({ left: dir * (card + GAP), behavior: "smooth" });
  };

  // Clic sobre la barra de progreso = salto directo a esa posición.
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el || max <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    el.scrollTo({ left: ratio * max, behavior: "smooth" });
  };

  // Arrastrar con el cursor para pasear la fila (desktop, donde no hay swipe).
  // Si el gesto se movió, cancelamos el clic para no abrir el enlace por error.
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const onDown = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el || e.pointerType === "touch") return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const el = railRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const onUp = () => {
    drag.current.active = false;
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section
      id="rituales"
      className="on-jade relative scroll-mt-24 overflow-hidden bg-jade-depth py-section text-ivory lg:py-section-lg grain-dark"
    >
      {/* Halo champagne que respira detrás del riel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 animate-glowPulse rounded-full bg-[radial-gradient(ellipse,rgba(182,155,98,0.14)_0%,transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            dark
            align="left"
            chapter="05"
            eyebrow="Las rutinas"
            title={
              <>
                La rutina entera,
                <br className="hidden sm:block" />{" "}
                <em className="italic text-champagne-light">en una caja</em>
              </>
            }
            subtitle="Los pasos vienen en orden. Tú no tienes que decidir nada."
          />

          {/* Flechas de navegación — desktop */}
          <div className="mb-12 hidden shrink-0 items-center gap-3 sm:mb-16 sm:flex">
            <button
              type="button"
              onClick={() => stepBy(-1)}
              disabled={atStart}
              aria-label="Ver rutinas anteriores"
              className="press flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors duration-300 enabled:hover:border-champagne enabled:hover:bg-champagne enabled:hover:text-jade disabled:opacity-25"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => stepBy(1)}
              disabled={atEnd}
              aria-label="Ver más rutinas"
              className="press flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors duration-300 enabled:hover:border-champagne enabled:hover:bg-champagne enabled:hover:text-jade disabled:opacity-25"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          onScroll={onRailScroll}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          onClickCapture={onClickCapture}
          className="rail -mx-4 flex snap-x snap-proximity gap-6 overflow-x-auto px-4 py-3 sm:-mx-6 sm:cursor-grab sm:px-6 sm:active:cursor-grabbing"
        >
          {RITUALS.map((r, i) => (
            <Reveal
              key={r.id}
              delay={Math.min(i * 0.08, 0.3)}
              className="w-[300px] shrink-0 snap-start sm:w-[360px]"
            >
              <a
                href={productUrl(r.id)}
                target="_blank"
                rel="noopener sponsored"
                draggable={false}
                className="group relative flex h-full flex-col overflow-hidden rounded-vitrine border border-ivory/10 bg-jade-soft shadow-jade-card transition-all duration-500 ease-editorial hover:-translate-y-1.5 hover:border-champagne/40"
              >
                {/* Filete champagne que se enciende al pasar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-champagne transition-transform duration-500 ease-editorial group-hover:scale-x-100"
                />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo
                    src={r.image}
                    alt={r.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 300px, 360px"
                    draggable={false}
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-jade/70 to-transparent"
                  />
                  {r.kit.length > 0 && (
                    <span className="editorial-index absolute bottom-3 right-3 border border-ivory/25 bg-jade/80 px-2.5 py-1 text-micro uppercase text-ivory backdrop-blur-sm">
                      {r.kit.length} piezas
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-title font-medium leading-snug text-ivory">
                    {r.name}
                  </h3>
                  {r.kit.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {r.kit.slice(0, 5).map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-ivory/75"
                        >
                          <span className="h-0.5 w-3 bg-champagne/60" aria-hidden />
                          {item}
                        </li>
                      ))}
                      {r.kit.length > 5 && (
                        <li className="text-xs italic text-ivory/65">
                          + {r.kit.length - 5} pasos más…
                        </li>
                      )}
                    </ul>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <p className="font-display text-2xl font-medium text-champagne-light">
                      {formatPrice(r.price)}
                    </p>
                    <span className="flex items-center gap-1.5 text-micro uppercase text-ivory/70 transition-colors duration-300 group-hover:text-champagne-light">
                      Ver rutina <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Barra de progreso: reemplaza al scrollbar. Refleja la posición y
            se puede tocar/clicar para saltar. En móvil es el gesto principal
            junto al swipe. */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => stepBy(-1)}
            disabled={atStart}
            aria-label="Ver rutinas anteriores"
            className="press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors enabled:hover:border-champagne enabled:hover:text-champagne disabled:opacity-25 sm:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            onClick={seek}
            role="presentation"
            className="relative h-[3px] flex-1 cursor-pointer rounded-full bg-ivory/15"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 rounded-full bg-champagne transition-[left] duration-150 ease-out"
              style={{ width: `${thumbPct}%`, left: `${progress * (100 - thumbPct)}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => stepBy(1)}
            disabled={atEnd}
            aria-label="Ver más rutinas"
            className="press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors enabled:hover:border-champagne enabled:hover:text-champagne disabled:opacity-25 sm:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

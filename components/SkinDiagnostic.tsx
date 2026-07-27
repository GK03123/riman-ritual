"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Droplets,
  Feather,
  Flower2,
  Moon,
  PackageOpen,
  RotateCcw,
  Share2,
  Star,
  Sparkles,
  Sun,
} from "lucide-react";
import { buildRoutine, type Answers, type Goal, type Level, type SkinType } from "@/lib/routine";
import { SITE, productUrl } from "@/lib/site";
import { useProductDrawer } from "@/lib/product-drawer";
import { useRitualBag } from "@/lib/ritual-bag";
import { EASE, SPRING_TAP } from "@/lib/motion";
import { cn, formatPrice } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

interface Option<T extends string> {
  value: T;
  label: string;
  note: string;
  Icon: typeof Droplets;
}

const SKIN: Option<SkinType>[] = [
  { value: "seca", label: "Seca", note: "Tirantez al final del día, sed de crema.", Icon: Droplets },
  { value: "mixta", label: "Mixta o grasa", note: "Brillo en la zona T, poros que se notan.", Icon: Sun },
  { value: "sensible", label: "Sensible", note: "Se enrojece o reacciona con facilidad.", Icon: Flower2 },
  { value: "normal", label: "Normal", note: "Equilibrada, sin quejas frecuentes.", Icon: Feather },
];

const GOALS: Option<Goal>[] = [
  { value: "hidratacion", label: "Hidratación profunda", note: "Piel jugosa, cómoda, bien reservada.", Icon: Droplets },
  { value: "luminosidad", label: "Luminosidad", note: "Despertar el tono, textura con luz.", Icon: Sparkles },
  { value: "firmeza", label: "Firmeza", note: "Elasticidad y rebote, por fuera y por dentro.", Icon: Feather },
  { value: "calma", label: "Calmar la piel", note: "Menos rojez, más confort.", Icon: Flower2 },
];

const LEVELS: Option<Level>[] = [
  { value: "esencial", label: "Estoy empezando", note: "Pocos pasos, bien elegidos.", Icon: Sun },
  { value: "completa", label: "Quiero la rutina completa", note: "Doble limpieza y tratamiento en capas.", Icon: Moon },
];

type Stage = 0 | 1 | 2 | 3;

const QUESTION: Record<Exclude<Stage, 3>, { eyebrow: string; title: string }> = {
  0: { eyebrow: "Tu piel", title: "¿Cómo describirías tu piel?" },
  1: { eyebrow: "Tu objetivo", title: "¿Qué quieres lograr primero?" },
  2: { eyebrow: "Tu rutina", title: "¿Cuánta rutina quieres llevar?" },
};

export default function SkinDiagnostic() {
  const reduce = useReducedMotion();
  const { open } = useProductDrawer();
  const { addMany, openBag, notify } = useRitualBag();
  const [stage, setStage] = useState<Stage>(0);
  const [skin, setSkin] = useState<SkinType | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Level | null>(null);

  const plan = useMemo(() => {
    if (stage === 3 && skin && goal && level) {
      return buildRoutine({ skin, goal, level } satisfies Answers);
    }
    return null;
  }, [stage, skin, goal, level]);

  const restart = () => {
    setStage(0);
    setSkin(null);
    setGoal(null);
    setLevel(null);
  };

  const back = () => setStage((s) => (s > 0 ? ((s - 1) as Stage) : s));

  const saveAll = () => {
    if (!plan) return;
    addMany(plan.steps.map((s) => s.product));
    openBag();
  };

  const share = async () => {
    if (!plan) return;
    const lines = plan.steps.map(
      (s) => `${s.n} ${s.phase}: ${s.product.name}`
    );
    const text = [
      `Mi rutina coreana en la boutique de ${SITE.brandName}:`,
      ...lines,
      `Total: ${formatPrice(plan.total)}`,
    ].join("\n");
    const url = `${window.location.origin}/#concerns`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Mi rutina coreana", text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        notify("Rutina copiada para compartir");
      }
    } catch {
      /* la persona canceló el diálogo de compartir */
    }
  };

  const renderOptions = <T extends string>(
    options: Option<T>[],
    selected: T | null,
    pick: (v: T) => void
  ) => (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o, i) => {
        const on = o.value === selected;
        return (
          <motion.button
            key={o.value}
            whileTap={{ scale: 0.985 }}
            onClick={() => pick(o.value)}
            aria-pressed={on}
            style={{ animationDelay: `${0.08 + i * 0.06}s` }}
            className={cn(
              "group flex items-center gap-4 rounded-vitrine border px-5 py-5 text-left transition-all duration-300 ease-editorial",
              /* motion-safe: ya lo apaga el CSS; condicionarlo en JS
                 cambiaba el className entre servidor y cliente. */
              "motion-safe:animate-[optionIn_0.5s_both] motion-safe:[animation-timing-function:cubic-bezier(0.22,1,0.36,1)]",
              on
                ? "border-ink bg-ink text-ivory shadow-card"
                : "border-hairline bg-ivory hover:-translate-y-0.5 hover:border-champagne-deep hover:shadow-cardHover"
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                on
                  ? "border-champagne bg-champagne-deep/20 text-champagne"
                  : "border-champagne/40 bg-champagne-soft/50 text-champagne-deep group-hover:scale-105"
              )}
            >
              <o.Icon className="h-5 w-5" strokeWidth={1.4} />
            </span>
            <span className="flex-1">
              <span
                className={cn(
                  "block font-display text-title font-medium leading-tight",
                  on ? "text-ivory" : "text-ink"
                )}
              >
                {o.label}
              </span>
              <span
                className={cn(
                  "mt-1 block text-[12px] leading-snug",
                  on ? "text-ivory/60" : "text-stone-dark"
                )}
              >
                {o.note}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );

  return (
    /* Banda de papel más profundo. La portada y el capítulo 02 ya son
       porcelana: encadenar un tercero del mismo tono convertía tres
       capítulos distintos en un único bloque largo. Bajar medio tono
       aquí separa la consulta y, de paso, hace que la hoja de marfil del
       cuestionario flote en vez de fundirse con el fondo. */
    <section
      id="concerns"
      className="relative scroll-mt-24 border-y border-hairline bg-porcelain-deep pb-section pt-section-sm grain lg:pb-section-lg lg:pt-14"
    >
      {/* `relative` para que el contenido quede por encima de la capa de
          grano, que se pinta como ::after de la sección. */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Cabecera a dos columnas: el capítulo a la izquierda y la voz de
            Eilin a la derecha, para que la consulta empiece con una
            persona y no con un formulario. */}
        <div className="grid items-end gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <SectionHeading
            chapter="03"
            align="left"
            eyebrow="La consulta"
            className="mb-0 sm:mb-0"
            title={
              <>
                Tu ritual, en{" "}
                <em className="italic text-champagne-deep">tres respuestas</em>
              </>
            }
            subtitle="Respondes tres preguntas y te armo la rutina con piezas del catálogo: el porqué de cada paso y el precio completo. Sin registros ni correos."
          />

          <Reveal delay={0.12}>
            <figure className="flex items-start gap-4 border-l border-champagne/40 pl-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder/eilin-consulta.jpg"
                alt="Eilin Guependo"
                width={128}
                height={128}
                loading="lazy"
                decoding="async"
                className="h-16 w-16 shrink-0 rounded-full border border-champagne/50 object-cover object-[45%_12%]"
              />
              <figcaption>
                <p className="font-display text-title font-normal italic leading-snug text-ink">
                  Dime cómo está tu piel y te digo por dónde empezar.
                </p>
                <p className="mt-2 text-micro uppercase text-stone-dark">
                  Eilin · Curadora
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* La hoja de consulta: un panel que enmarca todo el diagnóstico */}
        <div className="mx-auto mt-12 max-w-4xl rounded-vitrine border border-hairline bg-ivory p-5 shadow-paper sm:mt-16 sm:p-8 lg:p-12">
          {/* Progreso */}
          <div className="mb-10 flex items-center gap-4" aria-hidden>
            {[0, 1, 2].map((s) => (
              <span
                key={s}
                className={cn(
                  "h-px flex-1 transition-all duration-500",
                  stage > s ? "bg-champagne-deep" : stage === s ? "bg-ink" : "bg-hairline"
                )}
              />
            ))}
            <span className="editorial-index text-micro uppercase tracking-wide2 text-stone-dark">
              {stage < 3 ? `${stage + 1} de 3` : "Tu rutina"}
            </span>
          </div>

          {/* El cambio de `key` re-monta el paso y dispara la animación de
              entrada. No usamos AnimatePresence mode="wait" porque en
              framer 12 su finalización de salida puede atascarse y dejar el
              quiz sin avanzar; con entrada por remonte el flujo es fiable. */}
          <div>
            {stage < 3 ? (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="mb-3 text-label uppercase text-champagne-bronze">
                  {QUESTION[stage as 0 | 1 | 2].eyebrow}
                </p>
                <h3 className="mb-9 font-display text-display-sm font-normal">
                  {QUESTION[stage as 0 | 1 | 2].title}
                </h3>

                {stage === 0 &&
                  renderOptions(SKIN, skin, (v) => {
                    setSkin(v);
                    setStage(1);
                  })}
                {stage === 1 &&
                  renderOptions(GOALS, goal, (v) => {
                    setGoal(v);
                    setStage(2);
                  })}
                {stage === 2 &&
                  renderOptions(LEVELS, level, (v) => {
                    setLevel(v);
                    setStage(3);
                  })}

                {stage > 0 && (
                  <button
                    onClick={back}
                    className="press mt-8 flex min-h-[44px] items-center gap-2 py-2 text-label uppercase text-stone-dark transition-colors hover:text-champagne-deep"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Pregunta anterior
                  </button>
                )}
              </motion.div>
            ) : (
              plan && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-6">
                    <div>
                      <p className="mb-2 text-label uppercase text-champagne-bronze">
                        Tu rutina personal
                      </p>
                      <h3 className="font-display text-display-sm font-normal">
                        {plan.steps.filter((s) => !s.optional).length} pasos,{" "}
                        <em className="italic text-champagne-deep">
                          {formatPrice(plan.total)}
                        </em>
                      </h3>
                    </div>
                    <button
                      onClick={restart}
                      className="press flex items-center gap-2 border border-hairline px-4 py-2.5 text-micro uppercase text-stone-dark transition-colors duration-300 hover:border-champagne-deep hover:text-champagne-deep"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Repetir consulta
                    </button>
                  </div>

                  <ol className="space-y-4">
                    {plan.steps.map((s, i) => (
                      <motion.li
                        key={s.product.id + s.phase}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                        className="grid grid-cols-[auto_72px_1fr] items-center gap-4 rounded-vitrine border border-hairline bg-ivory p-4 transition-shadow duration-300 hover:shadow-card sm:grid-cols-[auto_96px_1fr_auto] sm:p-5"
                      >
                        <div className="w-14 shrink-0">
                          <p className="editorial-index font-display text-2xl italic text-champagne-deep">
                            {s.n}
                          </p>
                          <p className="text-micro uppercase tracking-wide2 text-stone-dark">
                            {s.phase}
                          </p>
                        </div>
                        <button
                          onClick={() => open(s.product)}
                          aria-label={`Ver ficha de ${s.product.name}`}
                          className="press h-[72px] w-[72px] shrink-0 rounded-seal bg-vitrine-radial sm:h-24 sm:w-24"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.product.image}
                            alt={s.product.name}
                            width={192}
                            height={192}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain p-1.5"
                          />
                        </button>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <button
                              onClick={() => open(s.product)}
                              className="text-left text-[15px] font-medium leading-snug text-ink transition-colors hover:text-champagne-deep"
                            >
                              {s.product.name}
                            </button>
                            <span className="text-micro uppercase tracking-wide2 text-stone-dark">
                              {s.when}
                              {s.optional ? " · Opcional" : ""}
                            </span>
                          </div>
                          <p className="mt-1.5 text-note text-stone-dark">
                            {s.why}
                          </p>
                          <div className="mt-2 flex items-center gap-4 sm:hidden">
                            <span className="font-display text-lg font-medium text-champagne-bronze">
                              {formatPrice(s.product.price)}
                            </span>
                            <a
                              href={productUrl(s.product.id)}
                              target="_blank"
                              rel="noopener sponsored"
                              className="-my-3 flex min-h-[44px] items-center gap-1 py-3 text-micro uppercase tracking-wide2 text-ink transition-colors hover:text-champagne-deep"
                            >
                              Comprar <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                        <div className="hidden flex-col items-end gap-2 sm:flex">
                          <span className="font-display text-xl font-medium text-champagne-bronze">
                            {formatPrice(s.product.price)}
                          </span>
                          <a
                            href={productUrl(s.product.id)}
                            target="_blank"
                            rel="noopener sponsored"
                            className="press flex items-center gap-1 border border-hairline px-4 py-2 text-micro uppercase tracking-wide2 transition-colors duration-300 hover:border-champagne-deep hover:bg-champagne-deep hover:text-ivory"
                          >
                            Comprar <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </div>
                      </motion.li>
                    ))}
                  </ol>

                  {/* Acciones: guardar la rutina entera o compartirla */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + plan.steps.length * 0.08, ease: EASE }}
                    className="mt-6 flex flex-col gap-3 sm:flex-row"
                  >
                    <button
                      onClick={saveAll}
                      className="press group flex flex-1 items-center justify-center gap-2 bg-ink px-8 py-4 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                    >
                      <Star className="h-4 w-4" strokeWidth={1.6} />
                      Añadir todo a mi ritual
                    </button>
                    <button
                      onClick={share}
                      className="press flex items-center justify-center gap-2 border border-hairline px-6 py-4 text-label uppercase text-ink transition-colors duration-300 hover:border-champagne-deep hover:text-champagne-deep"
                    >
                      <Share2 className="h-4 w-4" strokeWidth={1.6} />
                      Compartir rutina
                    </button>
                  </motion.div>

                  {plan.kit && (
                    <motion.aside
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.3 + plan.steps.length * 0.08, ease: EASE }}
                      className="mt-6 flex flex-col gap-5 rounded-vitrine border border-champagne/50 bg-champagne-soft/40 p-5 sm:flex-row sm:items-center sm:p-6"
                    >
                      <button
                        onClick={() => open(plan.kit!)}
                        aria-label={`Ver ficha de ${plan.kit.name}`}
                        className="press h-28 w-28 shrink-0 overflow-hidden rounded-seal border border-hairline bg-ivory"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={plan.kit.image}
                          alt={plan.kit.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </button>
                      <div className="flex-1">
                        <p className="mb-1 flex items-center gap-2 text-label uppercase text-champagne-bronze">
                          <PackageOpen className="h-3.5 w-3.5" /> El atajo
                        </p>
                        <p className="font-display text-xl font-medium leading-snug">
                          {plan.kit.name} · {formatPrice(plan.kit.price)}
                        </p>
                        <p className="mt-1.5 max-w-lg text-note text-stone-dark">
                          {plan.kitNote}
                        </p>
                      </div>
                      <a
                        href={productUrl(plan.kit.id)}
                        target="_blank"
                        rel="noopener sponsored"
                        className="press group flex shrink-0 items-center justify-center gap-2 bg-ink px-6 py-3.5 text-label uppercase text-ivory transition-colors duration-300 hover:bg-champagne-deep"
                      >
                        Ver el kit
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </motion.aside>
                  )}
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

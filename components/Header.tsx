"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Menu, Search, Star, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { useCatalog } from "@/lib/catalog-overlay";
import { useRitualBag } from "@/lib/ritual-bag";
import { EASE, SPRING_TAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Rutas absolutas para que la navegación funcione también desde las
// páginas de producto, no solo desde la portada.
const LINKS = [
  { href: "/#concerns", label: "Consulta" },
  { href: "/#bestsellers", label: "Bestsellers" },
  { href: "/#rituales", label: "Rutinas" },
  { href: "__catalog__", label: "Catálogo" },
  { href: "/#eilin", label: "Eilin" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { show: openCatalog } = useCatalog();
  const { count, openBag } = useRitualBag();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Estado "scrolled" sin listener manual de window: el motion value
  // ya está sincronizado con el frame y no fuerza renders extra.
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled((prev) => {
      const next = v > 24;
      return next === prev ? prev : next;
    });
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-header border-b transition-all duration-500",
        scrolled
          ? "border-hairline bg-ivory/90 shadow-[0_1px_24px_rgba(26,26,24,0.06)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
        {/* Wordmark. Con Link, volver a la portada desde una ficha de
            producto es navegación de cliente y no una recarga completa. */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-[22px] font-medium tracking-[0.08em] transition-colors duration-300 group-hover:text-champagne-deep sm:text-2xl">
            {SITE.brandName.toUpperCase()}
          </span>
          <span className="mt-0.5 text-micro uppercase text-stone-dark">
            K-Beauty y cuidado personal
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) =>
            l.href === "__catalog__" ? (
              <button
                key={l.href}
                onClick={openCatalog}
                className="link-underline flex min-h-[44px] items-center text-label uppercase text-ink/70 transition-colors hover:text-champagne-deep"
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="link-underline flex min-h-[44px] items-center text-label uppercase text-ink/70 transition-colors hover:text-champagne-deep"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={openCatalog}
            aria-label="Buscar en el catálogo"
            className="press flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-champagne-soft/60 hover:text-champagne-deep"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </button>
          <button
            onClick={openBag}
            aria-label={`Abrir mi rutina${count > 0 ? ` (${count} productos)` : ""}`}
            className="press relative flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-champagne-soft/60 hover:text-champagne-deep"
          >
            <Star className="h-[18px] w-[18px]" strokeWidth={1.6} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={SPRING_TAP}
                  className="editorial-index absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne-bronze px-1 text-[10px] leading-none text-ivory"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={openCatalog}
            className="press group hidden min-h-[44px] items-center gap-1.5 border border-ink px-5 py-2.5 text-label uppercase transition-colors duration-300 hover:border-champagne-deep hover:bg-champagne-deep hover:text-ivory sm:flex"
          >
            Ver el catálogo
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            className="press flex h-11 w-11 items-center justify-center lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-t border-hairline bg-ivory lg:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {LINKS.map((l, i) => {
                const item =
                  l.href === "__catalog__" ? (
                    <button
                      key={l.href}
                      onClick={() => {
                        setOpen(false);
                        openCatalog();
                      }}
                      className="flex min-h-[44px] w-fit items-center text-xs uppercase tracking-eyebrow text-ink/80"
                    >
                      {l.label}
                    </button>
                  ) : (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[44px] items-center text-xs uppercase tracking-eyebrow text-ink/80"
                    >
                      {l.label}
                    </a>
                  );
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: EASE }}
                  >
                    {item}
                  </motion.div>
                );
              })}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.32, ease: EASE }}
                onClick={() => {
                  setOpen(false);
                  openCatalog();
                }}
                className="press mt-3 flex w-fit items-center gap-1.5 border border-ink px-5 py-3 text-label uppercase"
              >
                Ver el catálogo <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Progreso de lectura: línea champagne bajo el borde del header */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-champagne-deep/60"
      />
    </header>
  );
}

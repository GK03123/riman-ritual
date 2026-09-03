"use client";

import { useState } from "react";
import { isDeferredAsset } from "@/lib/media";
import { cn } from "@/lib/utils";
import Photo from "../Photo";

interface GalleryProps {
  images: string[];
  alt: string;
  badge?: string | null;
}

/** Galería de la página de producto: imagen principal + miniaturas.
 *
 *  Las diapositivas diferidas (ver isDeferredAsset) no se montan hasta que
 *  alguien las pide; hasta entonces su miniatura es la misma vitrina vacía
 *  que usa el resto de la casa cuando una fotografía no está. */
export default function Gallery({ images, alt, badge }: GalleryProps) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState<number[]>(() =>
    images.flatMap((src, i) => (isDeferredAsset(src) ? [] : [i]))
  );

  const warm = (i: number) =>
    setMounted((m) => (m.includes(i) ? m : [...m, i]));

  return (
    <div className="lg:sticky lg:top-24">
      <div className="group relative aspect-square overflow-hidden rounded-vitrine border border-hairline bg-vitrine-radial shadow-card">
        {images.map((src, i) =>
          mounted.includes(i) ? (
            <Photo
              key={src}
              src={src}
              alt={alt}
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 620px"
              className={cn(
                "object-contain p-10 transition-all duration-500 ease-editorial",
                i === active ? "scale-100 opacity-100" : "scale-[0.98] opacity-0",
                i === active && "group-hover:scale-[1.03]"
              )}
            />
          ) : null
        )}
        {badge && (
          <span className="absolute left-5 top-5 bg-ink px-3 py-1.5 text-micro uppercase text-ivory">
            {badge}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              /* El montaje va en pointerdown y no en el clic: así la
                 diapositiva entra un fotograma antes y el fundido de
                 entrada sigue corriendo como con las demás. */
              onPointerDown={() => warm(i)}
              onClick={() => {
                warm(i);
                setActive(i);
              }}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "press relative h-16 w-16 overflow-hidden rounded-seal border bg-ivory transition-all duration-300",
                i === active
                  ? "border-champagne-deep shadow-card"
                  : "border-hairline opacity-60 hover:opacity-100"
              )}
            >
              {mounted.includes(i) ? (
                <Photo
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="64px"
                  className="object-contain p-1"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex h-full w-full items-center justify-center bg-vitrine-radial"
                >
                  <span className="block h-2.5 w-2.5 rotate-45 border border-champagne/45" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

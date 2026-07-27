"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  alt: string;
  badge?: string | null;
}

/** Galería de la página de producto: imagen principal + miniaturas. */
export default function Gallery({ images, alt, badge }: GalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="group relative aspect-square overflow-hidden rounded-vitrine border border-hairline bg-vitrine-radial shadow-card">
        {images.map((src, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={src}
            src={src}
            alt={alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-contain p-10 transition-all duration-500 ease-editorial",
              i === active ? "scale-100 opacity-100" : "scale-[0.98] opacity-0",
              i === active && "group-hover:scale-[1.03]"
            )}
          />
        ))}
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
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "press h-16 w-16 rounded-seal border bg-ivory transition-all duration-300",
                i === active
                  ? "border-champagne-deep shadow-card"
                  : "border-hairline opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { SITE } from "@/lib/site";
import Signature from "./Signature";

const EXPLORE = [
  { label: "Consulta de piel", href: "/#concerns" },
  { label: "Bestsellers", href: "/#bestsellers" },
  { label: "Rituales completos", href: "/#rituales" },
  { label: "La curadora", href: "/#curador" },
];

const LEGAL = [
  {
    label: "Política de devoluciones",
    href: "https://cdn.rimanbuild.com/Legal/NAM_Customer_Return_Policy_30Apr2025.pdf",
  },
  {
    label: "Política de envíos",
    href: "https://cdn.rimanbuild.com/Legal/Shipping_Policy_01Dec2023.pdf",
  },
  {
    label: "Privacidad",
    href: "https://cdn.rimanbuild.com/Legal/USCA_PrivacyPolicy_19Oct2023.pdf",
  },
  {
    label: "Términos y condiciones",
    href: "https://cdn.rimanbuild.com/Legal/USCA_Terms_and_Condition_Nov2023.pdf",
  },
];

export default function Footer() {
  return (
    <footer className="on-jade relative overflow-hidden bg-ink py-16 text-ivory/70">
      {/* Filete dorado de cierre: la página termina como empezó */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gold-hairline" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-normal tracking-[0.08em] text-ivory">
              {SITE.brandName.toUpperCase()}
            </p>
            <p className="mt-1.5 text-micro uppercase text-ivory/60">
              K-Beauty y cuidado personal
            </p>
            <p className="mt-6 max-w-xs text-note leading-relaxed text-ivory/60">
              {SITE.tagline}.
            </p>
            {/* Firma de la curadora, el gesto de autoría que cierra la casa */}
            <Signature className="mt-8 opacity-80" tone="champagne" animate={false} width={168} />
          </div>

          <nav aria-label="Explorar">
            <p className="mb-4 text-micro uppercase text-ivory/60">
              Explorar
            </p>
            <ul className="space-y-3 text-xs">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline inline-flex min-h-[44px] items-center transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="mb-4 text-micro uppercase text-ivory/60">
              Legal
            </p>
            <ul className="space-y-3 text-xs">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="link-underline inline-flex min-h-[44px] items-center transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-ivory/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-ivory/60">
            Boutique independiente. Cada enlace de compra abre la ficha oficial
            de RIMAN con el código de la curadora; el pago, el envío y las
            devoluciones se gestionan desde Estados Unidos. Nombres de
            productos, imágenes y marcas registradas pertenecen a sus
            respectivos propietarios.
          </p>
          <p className="mt-6 text-micro uppercase text-ivory/55">
            © {new Date().getFullYear()} {SITE.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}

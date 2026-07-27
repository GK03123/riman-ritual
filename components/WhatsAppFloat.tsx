import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function WhatsAppFloat() {
  if (!SITE.whatsapp) return null;
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
        "¡Hola! Vi tu boutique de skincare coreano y me gustaría una asesoría."
      )}`}
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-jade text-ivory shadow-cardHover transition-transform duration-300 hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

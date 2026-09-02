import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Transición entre páginas.
 *
 * `template.tsx` se vuelve a montar en cada navegación, así que el
 * `<ViewTransition>` de aquí sale con la página vieja y entra con la nueva.
 * Las animaciones están en globals.css (`.pagina-sale`, `.pagina-entra`);
 * la cabecera queda anclada con su propio `view-transition-name`. En
 * navegadores sin View Transitions la navegación funciona igual, sin
 * animar.
 */
export default function Plantilla({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="pagina-entra" exit="pagina-sale" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

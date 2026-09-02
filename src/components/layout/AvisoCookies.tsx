"use client";

import { useEffect, useState } from "react";

const CLAVE = "biomads:cookies";

/**
 * Aviso de cookies.
 *
 * Hoy el sitio no pone cookies ni carga analítica: lo único que guarda es
 * esta decisión, en `localStorage`. Por eso el aviso informa y se cierra, en
 * vez de bloquear la página con un muro de consentimiento que no tendría
 * nada que consentir.
 *
 * La decisión queda registrada con su fecha, así que el día que se añada
 * medición el gate ya existe: basta leer `consentimientoMedicion()` antes de
 * cargar el script.
 *
 * No atrapa el foco ni tapa el contenido: es un aviso, no un diálogo. Va
 * arriba a la derecha, bajo la barra, y se cierra con Escape.
 */
export function AvisoCookies() {
  /* Nace oculto: en el servidor no se sabe qué decidió el visitante, y
     pintarlo para esconderlo después haría un parpadeo en cada carga. */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(CLAVE);
    } catch {
      /* Navegación privada o almacenamiento bloqueado: sin aviso, porque
         tampoco podríamos recordar la respuesta y saldría en cada página. */
      return;
    }
    if (guardado) return;
    /* En el cuadro siguiente, no en el cuerpo del efecto: así el aviso no
       provoca un segundo render en cadena durante el montaje. */
    const cuadro = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(cuadro);
  }, []);

  useEffect(() => {
    if (!visible) return;
    function alPresionar(evento: KeyboardEvent) {
      if (evento.key === "Escape") responder("cerrado");
    }
    document.addEventListener("keydown", alPresionar);
    return () => document.removeEventListener("keydown", alPresionar);
  }, [visible]);

  function responder(decision: "aceptado" | "cerrado") {
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ decision, fecha: new Date().toISOString() }));
    } catch {
      /* Si no se puede guardar, al menos se cierra en esta visita. */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside role="region" aria-label="Aviso sobre cookies" className="aviso-cookies">
      <p className="text-sm text-ink">
        No usamos cookies de seguimiento. Solo guardamos su respuesta a este aviso.
      </p>
      <button
        type="button"
        onClick={() => responder("aceptado")}
        className="aviso-cookies-cerrar"
      >
        <span className="sr-only">Entendido, cerrar el aviso</span>
        <span aria-hidden="true" className="icono-menu es-cerrar">
          <span />
          <span />
        </span>
      </button>
    </aside>
  );
}

/**
 * ¿El visitante aceptó? Léalo antes de cargar cualquier medición futura.
 * Hoy nada lo consulta porque no hay nada que medir.
 */
export function consentimientoMedicion(): boolean {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (!guardado) return false;
    return (JSON.parse(guardado) as { decision?: string }).decision === "aceptado";
  } catch {
    return false;
  }
}

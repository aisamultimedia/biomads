"use client";

import { useEffect, useState } from "react";

const CLAVE = "biomads:cookies";

/**
 * Ancho a partir del cual el aviso es la píldora de escritorio. Coincide
 * con el punto de ruptura de `.aviso-cookies` en globals.css.
 */
const CONSULTA_ESCRITORIO = "(min-width: 640px)";

/**
 * Cuánto tarda la píldora en retirarse sola, en milisegundos.
 *
 * Solo en escritorio: en móvil es una barra al ancho de la pantalla y
 * hacerla desaparecer sola dejaría al visitante sin saber qué decía.
 *
 * El reloj se detiene mientras el puntero esté encima o algo dentro tenga
 * el foco, para que no se retire a media lectura. Y el mismo texto vive en
 * el pie de forma permanente: nada de lo que dice el aviso deja de estar
 * disponible cuando se va.
 */
const RETIRO_MS = 20000;

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
 * No atrapa el foco ni bloquea la página: es un aviso, no un diálogo. En
 * móvil es una barra que sube desde el borde inferior; en escritorio, una
 * píldora abajo a la izquierda que se retira sola. Se cierra con Escape.
 */
export function AvisoCookies() {
  /* Nace oculto: en el servidor no se sabe qué decidió el visitante, y
     pintarlo para esconderlo después haría un parpadeo en cada carga. */
  const [visible, setVisible] = useState(false);
  /* Puntero encima o foco dentro: el reloj del retiro automático se para. */
  const [retenido, setRetenido] = useState(false);

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

  /* Retiro automático, solo en la píldora de escritorio y solo mientras
     nadie la esté mirando de cerca. `retenido` lo levantan el puntero y el
     foco; al soltarlo el reloj empieza de cero, que es lo correcto: quien
     acaba de dejar de leer merece el plazo completo. */
  useEffect(() => {
    if (!visible || retenido) return;
    if (!window.matchMedia(CONSULTA_ESCRITORIO).matches) return;

    const reloj = window.setTimeout(() => responder("visto"), RETIRO_MS);
    return () => window.clearTimeout(reloj);
  }, [visible, retenido]);

  function responder(decision: "aceptado" | "cerrado" | "visto") {
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ decision, fecha: new Date().toISOString() }));
    } catch {
      /* Si no se puede guardar, al menos se cierra en esta visita. */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Aviso sobre cookies"
      className="aviso-cookies"
      onMouseEnter={() => setRetenido(true)}
      onMouseLeave={() => setRetenido(false)}
      onFocusCapture={() => setRetenido(true)}
      onBlurCapture={() => setRetenido(false)}
    >
      <p className="text-sm text-ink">No usamos cookies de seguimiento.</p>
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

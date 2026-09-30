import type { CSSProperties } from "react";

type Props = {
  /** Más lenta y más tenue, para fondos de sección. Por defecto, la del hero. */
  variante?: "hero" | "seccion";
  className?: string;
};

/**
 * Curvas de nivel a la deriva.
 *
 * El motivo gráfico de BIOMADS no son hojas ni gotas: es la representación
 * del terreno. Una curva de nivel dice a la vez territorio, medición y
 * trabajo de campo, que es exactamente lo que la empresa hace, y no se
 * parece a la papelería de ninguna otra consultora ambiental.
 *
 * **Cómo se mueve.** La capa mide el doble de ancho que su contenedor y el
 * motivo está dibujado dos veces, una detrás de otra: al desplazarla un 50 %
 * el segundo dibujo cae exactamente donde estaba el primero, así que el
 * bucle no tiene costura. Va en `linear` porque una curva de aceleración
 * haría latir un movimiento infinito. Se pausa fuera de pantalla y con
 * `prefers-reduced-motion` no se mueve.
 *
 * Es decorativo y no dice nada que el texto no diga: `aria-hidden`.
 */
export function Contornos({ variante = "hero", className = "" }: Props) {
  const seccion = variante === "seccion";

  return (
    <div
      aria-hidden="true"
      className={`fondo-contornos ${seccion ? "fondo-contornos--seccion" : ""} ${className}`}
    >
      <div className={`capa-contornos ${seccion ? "" : "capa-contornos--rapida"}`}>
        <svg viewBox="0 0 2400 800" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            {/* Un solo trazado de curvas, reutilizado dos veces. Los tres
                niveles llevan grosores distintos: en una carta topográfica
                la curva maestra se dibuja más gruesa cada cinco. */}
            <g id="curvas">
              <path
                d="M0 640 C 160 600, 300 690, 460 650 S 760 540, 920 590 S 1100 700, 1200 640"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M0 560 C 180 510, 320 610, 480 560 S 780 440, 940 500 S 1110 620, 1200 555"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M0 480 C 200 420, 340 530, 500 470 S 800 350, 960 410 S 1120 540, 1200 470"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M0 400 C 220 330, 360 450, 520 380 S 820 260, 980 325 S 1130 460, 1200 385"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M0 320 C 240 240, 380 370, 540 290 S 840 170, 1000 240 S 1140 380, 1200 300"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M0 240 C 260 150, 400 290, 560 200 S 860 80, 1020 155 S 1150 300, 1200 215"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M0 160 C 280 60, 420 210, 580 110 S 880 -10, 1040 70 S 1160 220, 1200 130"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
          </defs>

          <use href="#curvas" />
          <use href="#curvas" x="1200" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Coordenada en monoespaciada, del lenguaje de una ficha de campo.
 *
 * No es adorno: son las coordenadas reales del sitio que nombra el texto que
 * tiene al lado. Se marca como `dato` —la familia que el sitio reserva para
 * cifras— y se lee como lo que es.
 */
export function Coordenada({
  valor,
  className = "",
  style,
}: {
  valor: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`dato coordenada ${className}`} style={style}>
      {valor}
    </span>
  );
}

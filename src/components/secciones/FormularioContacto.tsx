"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { Campo } from "@/components/ui/Campo";
import { Casilla } from "@/components/ui/Casilla";
import { Enlace } from "@/components/ui/Enlace";
import {
  camposVacios,
  componerMensaje,
  ORDEN_CAMPOS,
  validarCampo,
  validarTodo,
  type CamposContacto,
  type CodigoError,
  type CodigoRespuesta,
  type ErroresContacto,
} from "@/lib/validacion";
import { interpolar, rutaEnIdioma, type Diccionario, type Idioma } from "@/idioma";
import { empresa, mailto, whatsapp } from "@/lib/site";

type Estado = "reposo" | "enviando" | "exito" | "error";

type Props = {
  idioma: Idioma;
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["contacto"]["formulario"];
  /** Rótulos ya en el idioma del visitante; ver src/lib/formulario.ts. */
  opcionesServicio: readonly { valor: string; rotulo: string }[];
};

/**
 * Formulario de contacto.
 *
 * Siete campos, ni uno de adorno: nombre, empresa, correo, teléfono
 * (opcional), tipo de servicio, mensaje y la autorización de tratamiento
 * de datos, que la Ley 1581 de 2012 exige antes de usar el correo de
 * alguien aunque sea para responderle. Los cortos van de dos en dos para
 * que el conjunto no parezca más largo de lo que es.
 *
 * **Validación.** En vivo, pero solo después del primer blur de cada
 * campo: no se regaña a quien todavía está escribiendo. Al enviar se
 * valida todo y el foco va al primer campo con problema, en orden visual.
 *
 * **Robots.** Un campo escondido —"sitio web"— que ninguna persona ve ni
 * puede tabular hasta él. Si llega relleno, el servidor contesta "enviado"
 * y no envía nada. No sustituye a un servicio anti-spam; para el volumen
 * de un formulario de contacto, basta.
 */
export function FormularioContacto({ idioma, textos, opcionesServicio }: Props) {
  const prefijo = useId();

  /* `validarCampo` devuelve códigos, no frases: el texto es cosa del
     diccionario. Sin este paso el campo mostraría «correoSinArroba». */
  const mensajeDe = (codigo: CodigoError | undefined) =>
    codigo ? textos.errores[codigo] : undefined;
  const [campos, setCampos] = useState<CamposContacto>(camposVacios);
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [tocados, setTocados] = useState<Partial<Record<keyof CamposContacto, boolean>>>(
    {},
  );
  const [trampa, setTrampa] = useState("");
  const [estado, setEstado] = useState<Estado>("reposo");
  const [mensajeError, setMensajeError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  // El aviso de error se monta con el cambio de estado, así que el foco se
  // mueve después del render, no en el mismo tick del setEstado.
  useEffect(() => {
    if (estado === "error") errorRef.current?.focus();
  }, [estado]);

  // El bloque de éxito entra cuando el formulario termina de salir, más
  // tarde que el cambio de estado: se enfoca al montarse.
  const enfocarAlMontar = useCallback((nodo: HTMLDivElement | null) => {
    nodo?.focus();
  }, []);

  const id = (campo: keyof CamposContacto | "sitioWeb") => `${prefijo}-${campo}`;

  /** Valida en vivo solo después del primer blur: no se regaña mientras escribe. */
  function alCambiar<K extends keyof CamposContacto>(campo: K, valor: CamposContacto[K]) {
    setCampos((previos) => ({ ...previos, [campo]: valor }));
    if (tocados[campo]) {
      setErrores((previos) => ({ ...previos, [campo]: validarCampo(campo, valor) }));
    }
  }

  function alSalir<K extends keyof CamposContacto>(campo: K) {
    setTocados((previos) => ({ ...previos, [campo]: true }));
    setErrores((previos) => ({ ...previos, [campo]: validarCampo(campo, campos[campo]) }));
  }

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const encontrados = validarTodo(campos);
    setErrores(encontrados);
    setTocados(Object.fromEntries(ORDEN_CAMPOS.map((c) => [c, true])));

    if (Object.keys(encontrados).length > 0) {
      // Lleva el foco al primer campo con problema, en orden visual.
      const primero = ORDEN_CAMPOS.find((c) => encontrados[c]);
      if (primero) document.getElementById(id(primero))?.focus();
      return;
    }

    setEstado("enviando");
    setMensajeError("");

    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campos, sitioWeb: trampa }),
      });

      if (!respuesta.ok) {
        /* El servidor responde con un código, no con una frase: se traduce
           aquí, que es donde se sabe en qué idioma está el visitante. */
        const cuerpo: { codigo?: CodigoRespuesta } = await respuesta
          .json()
          .catch(() => ({}));
        const codigo = cuerpo.codigo;
        setMensajeError(
          codigo && codigo in textos.respuestas
            ? textos.respuestas[codigo]
            : textos.errorGenerico,
        );
        setEstado("error");
        return;
      }

      setEstado("exito");
    } catch {
      setMensajeError(textos.errorGenerico);
      setEstado("error");
    }
  }

  const enviando = estado === "enviando";
  const servicioRotulo =
    opcionesServicio.find((o) => o.valor === campos.servicio)?.rotulo ?? "—";
  /** Respaldo si el envío falla: el mensaje ya escrito, listo para mandar. */
  const cuerpo = componerMensaje(campos, servicioRotulo);
  const respaldoWhatsapp = `${whatsapp}?text=${encodeURIComponent(cuerpo)}`;
  const respaldoCorreo = `${mailto}?subject=${encodeURIComponent(
    interpolar(textos.asuntoRespaldo, { empresa: campos.empresa.trim() || "—" }),
  )}&body=${encodeURIComponent(cuerpo)}`;

  const politica = rutaEnIdioma("/privacidad", idioma);

  return (
    <>
      {estado === "exito" ? (
        <div
          ref={enfocarAlMontar}
          tabIndex={-1}
          role="status"
          data-entrada="panel"
          className="con-regla con-regla--acento pt-8"
        >
          <p className="etiqueta text-accent-deep">{textos.exitoRotulo}</p>
          <h3 className="mt-4 text-xl">
            {interpolar(textos.exitoGracias, { nombre: campos.nombre.trim() })}
          </h3>
          <p className="medida mt-4 text-ink">
            {interpolar(textos.exitoRespuesta, { correo: campos.correo.trim() })}{" "}
            {textos.exitoUrgente}{" "}
            <Enlace href={whatsapp} externo className="dato">
              {empresa.telefono}
            </Enlace>
            .
          </p>
          <div className="mt-8">
            <Boton
              variante="secundario"
              onClick={() => {
                setCampos(camposVacios);
                setErrores({});
                setTocados({});
                setTrampa("");
                setEstado("reposo");
              }}
            >
              {textos.otroMensaje}
            </Boton>
          </div>
        </div>
      ) : (
        <form onSubmit={alEnviar} noValidate className="flex flex-col gap-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <Campo
              id={id("nombre")}
              etiqueta={textos.nombre}
              name="nombre"
              autoComplete="name"
              maxLength={200}
              value={campos.nombre}
              error={mensajeDe(errores.nombre)}
              disabled={enviando}
              onChange={(e) => alCambiar("nombre", e.target.value)}
              onBlur={() => alSalir("nombre")}
            />

            <Campo
              id={id("empresa")}
              etiqueta={textos.empresa}
              name="empresa"
              autoComplete="organization"
              maxLength={200}
              value={campos.empresa}
              error={mensajeDe(errores.empresa)}
              disabled={enviando}
              onChange={(e) => alCambiar("empresa", e.target.value)}
              onBlur={() => alSalir("empresa")}
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <Campo
              id={id("correo")}
              etiqueta={textos.correo}
              name="correo"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={200}
              value={campos.correo}
              error={mensajeDe(errores.correo)}
              disabled={enviando}
              onChange={(e) => alCambiar("correo", e.target.value)}
              onBlur={() => alSalir("correo")}
            />

            <Campo
              id={id("telefono")}
              etiqueta={textos.telefono}
              ayuda={textos.telefonoAyuda}
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={30}
              value={campos.telefono}
              error={mensajeDe(errores.telefono)}
              disabled={enviando}
              onChange={(e) => alCambiar("telefono", e.target.value)}
              onBlur={() => alSalir("telefono")}
            />
          </div>

          <Campo
            id={id("servicio")}
            etiqueta={textos.servicio}
            name="servicio"
            opciones={opcionesServicio}
            vacio={textos.servicioElegir}
            value={campos.servicio}
            error={mensajeDe(errores.servicio)}
            disabled={enviando}
            onChange={(e) => alCambiar("servicio", e.target.value)}
            onBlur={() => alSalir("servicio")}
          />

          <Campo
            id={id("mensaje")}
            etiqueta={textos.mensaje}
            ayuda={textos.mensajeAyuda}
            name="mensaje"
            multilinea
            maxLength={4000}
            value={campos.mensaje}
            error={mensajeDe(errores.mensaje)}
            disabled={enviando}
            onChange={(e) => alCambiar("mensaje", e.target.value)}
            onBlur={() => alSalir("mensaje")}
          />

          {/* Trampa para robots. Fuera del flujo visual y del árbol de
              accesibilidad, fuera del orden de tabulación y sin
              autocompletar, para que ningún navegador la rellene solo. El
              rótulo no pasa por el diccionario: no lo lee nadie. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor={id("sitioWeb")}>Sitio web</label>
            <input
              id={id("sitioWeb")}
              name="sitio_web"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trampa}
              onChange={(e) => setTrampa(e.target.value)}
            />
          </div>

          <Casilla
            id={id("aceptaDatos")}
            name="aceptaDatos"
            checked={campos.aceptaDatos}
            disabled={enviando}
            error={mensajeDe(errores.aceptaDatos)}
            onChange={(e) => {
              alCambiar("aceptaDatos", e.target.checked);
              /* Una casilla se valida al tocarla: no hay "mientras escribe". */
              setTocados((previos) => ({ ...previos, aceptaDatos: true }));
              setErrores((previos) => ({
                ...previos,
                aceptaDatos: validarCampo("aceptaDatos", e.target.checked),
              }));
            }}
            etiqueta={
              <>
                {textos.datosAntes}{" "}
                <Enlace href={politica} externo>
                  {textos.datosEnlace}
                </Enlace>
                {textos.datosDespues}
              </>
            }
          />

          {/* --- Error de envío: no deja al visitante sin salida --- */}
          {estado === "error" && (
            <div
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              data-entrada="aviso"
              className="con-regla con-regla--acento pt-6"
            >
              <p className="etiqueta text-accent-deep">{textos.errorRotulo}</p>
              <p className="medida mt-3 text-ink">
                {mensajeError} {textos.errorRespaldo}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Boton href={respaldoWhatsapp} variante="secundario" externo>
                  {textos.escribirWhatsapp}
                </Boton>
                <Boton href={respaldoCorreo} variante="secundario" externo>
                  {textos.escribirCorreo}
                </Boton>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6">
            <Boton type="submit" cargando={enviando}>
              {enviando ? textos.enviando : textos.enviar}
            </Boton>
            <p className="text-sm text-ink-muted">
              {textos.oEscribanos}{" "}
              <Enlace href={whatsapp} externo>
                WhatsApp
              </Enlace>
              .
            </p>
          </div>
        </form>
      )}
    </>
  );
}

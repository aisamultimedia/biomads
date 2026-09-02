"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { Campo } from "@/components/ui/Campo";
import { Enlace } from "@/components/ui/Enlace";
import {
  camposVacios,
  componerMensaje,
  validarCampo,
  validarTodo,
  type CamposContacto,
  type CodigoError,
  type CodigoRespuesta,
  type ErroresContacto,
} from "@/lib/validacion";
import { interpolar, type Diccionario } from "@/idioma";
import { empresa, mailto, whatsapp } from "@/lib/site";

type Estado = "reposo" | "enviando" | "exito" | "error";

export function FormularioContacto({
  textos,
}: {
  /** Es componente de cliente: el texto llega resuelto por props. */
  textos: Diccionario["contacto"]["formulario"];
}) {
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

  const id = (campo: keyof CamposContacto) => `${prefijo}-${campo}`;

  /** Valida en vivo solo después del primer blur: no se regaña mientras escribe. */
  function alCambiar(campo: keyof CamposContacto, valor: string) {
    setCampos((previos) => ({ ...previos, [campo]: valor }));
    if (tocados[campo]) {
      setErrores((previos) => ({ ...previos, [campo]: validarCampo(campo, valor) }));
    }
  }

  function alSalir(campo: keyof CamposContacto) {
    setTocados((previos) => ({ ...previos, [campo]: true }));
    setErrores((previos) => ({ ...previos, [campo]: validarCampo(campo, campos[campo]) }));
  }

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const encontrados = validarTodo(campos);
    setErrores(encontrados);
    setTocados({ nombre: true, empresa: true, correo: true, mensaje: true });

    if (Object.keys(encontrados).length > 0) {
      // Lleva el foco al primer campo con problema.
      const primero = (Object.keys(campos) as (keyof CamposContacto)[]).find(
        (c) => encontrados[c],
      );
      if (primero) document.getElementById(id(primero))?.focus();
      return;
    }

    setEstado("enviando");
    setMensajeError("");

    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campos),
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
  /** Respaldo si el envío falla: el mensaje ya escrito, listo para mandar. */
  const cuerpo = componerMensaje(campos);
  const respaldoWhatsapp = `${whatsapp}?text=${encodeURIComponent(cuerpo)}`;
  const respaldoCorreo = `${mailto}?subject=${encodeURIComponent(
    `Solicitud de propuesta — ${campos.empresa.trim() || "sitio web"}`,
  )}&body=${encodeURIComponent(cuerpo)}`;

  /* `mode="wait"`: el formulario termina de irse antes de que entre la
     confirmación. Nada se solapa ni salta de sitio. */
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
                setEstado("reposo");
              }}
            >
              {textos.otroMensaje}
            </Boton>
          </div>
        </div>
      ) : (
        <form onSubmit={alEnviar} noValidate className="flex flex-col gap-8">
          <Campo
            id={id("nombre")}
            etiqueta={textos.nombre}
            name="nombre"
            autoComplete="name"
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
            value={campos.empresa}
            error={mensajeDe(errores.empresa)}
            disabled={enviando}
            onChange={(e) => alCambiar("empresa", e.target.value)}
            onBlur={() => alSalir("empresa")}
          />

          <Campo
            id={id("correo")}
            etiqueta={textos.correo}
            name="correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={campos.correo}
            error={mensajeDe(errores.correo)}
            disabled={enviando}
            onChange={(e) => alCambiar("correo", e.target.value)}
            onBlur={() => alSalir("correo")}
          />

          <Campo
            id={id("mensaje")}
            etiqueta={textos.mensaje}
            ayuda={textos.mensajeAyuda}
            name="mensaje"
            multilinea
            value={campos.mensaje}
            error={mensajeDe(errores.mensaje)}
            disabled={enviando}
            onChange={(e) => alCambiar("mensaje", e.target.value)}
            onBlur={() => alSalir("mensaje")}
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

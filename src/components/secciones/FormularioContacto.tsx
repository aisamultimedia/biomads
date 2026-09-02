"use client";

import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { Campo } from "@/components/ui/Campo";
import { Enlace } from "@/components/ui/Enlace";
import { aviso, salida, vocabularioRegla } from "@/lib/motion";
import {
  camposVacios,
  componerMensaje,
  validarCampo,
  validarTodo,
  type CamposContacto,
  type ErroresContacto,
} from "@/lib/validacion";
import { empresa, mailto, whatsapp } from "@/lib/site";

type Estado = "reposo" | "enviando" | "exito" | "error";

/* El formulario solo necesita salir: entra con la página. */
const formulario = {
  visible: { opacity: 1 },
  salida: { opacity: 0, transition: salida },
};

export function FormularioContacto() {
  const prefijo = useId();
  const [campos, setCampos] = useState<CamposContacto>(camposVacios);
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [tocados, setTocados] = useState<Partial<Record<keyof CamposContacto, boolean>>>({});
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
        const cuerpo = await respuesta.json().catch(() => ({}));
        setMensajeError(
          typeof cuerpo.mensaje === "string"
            ? cuerpo.mensaje
            : "No pudimos enviar el mensaje.",
        );
        setEstado("error");
        return;
      }

      setEstado("exito");
    } catch {
      setMensajeError("No pudimos enviar el mensaje.");
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
    <AnimatePresence mode="wait" initial={false}>
      {estado === "exito" ? (
        <m.div
          key="exito"
          ref={enfocarAlMontar}
          tabIndex={-1}
          role="status"
          variants={vocabularioRegla.panel}
          initial="oculto"
          animate="visible"
          exit="salida"
          className="con-regla con-regla--acento pt-8"
        >
          <p className="etiqueta text-accent-deep">Mensaje enviado</p>
          <h3 className="mt-4 text-xl">Gracias, {campos.nombre.trim()}.</h3>
          <p className="medida mt-4 text-ink">
            Le respondemos a <span className="dato">{campos.correo.trim()}</span>. Si es
            urgente, escríbanos por WhatsApp al{" "}
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
              Enviar otro mensaje
            </Boton>
          </div>
        </m.div>
      ) : (
        <m.form
          key="formulario"
          onSubmit={alEnviar}
          noValidate
          variants={formulario}
          initial={false}
          animate="visible"
          exit="salida"
          className="flex flex-col gap-8"
        >
          <Campo
            id={id("nombre")}
            etiqueta="Nombre"
            name="nombre"
            autoComplete="name"
            value={campos.nombre}
            error={errores.nombre}
            disabled={enviando}
            onChange={(e) => alCambiar("nombre", e.target.value)}
            onBlur={() => alSalir("nombre")}
          />

          <Campo
            id={id("empresa")}
            etiqueta="Empresa o entidad"
            name="empresa"
            autoComplete="organization"
            value={campos.empresa}
            error={errores.empresa}
            disabled={enviando}
            onChange={(e) => alCambiar("empresa", e.target.value)}
            onBlur={() => alSalir("empresa")}
          />

          <Campo
            id={id("correo")}
            etiqueta="Correo"
            name="correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={campos.correo}
            error={errores.correo}
            disabled={enviando}
            onChange={(e) => alCambiar("correo", e.target.value)}
            onBlur={() => alSalir("correo")}
          />

          <Campo
            id={id("mensaje")}
            etiqueta="Mensaje"
            ayuda="El alcance y la autoridad ante la que responde nos bastan para empezar."
            name="mensaje"
            multilinea
            value={campos.mensaje}
            error={errores.mensaje}
            disabled={enviando}
            onChange={(e) => alCambiar("mensaje", e.target.value)}
            onBlur={() => alSalir("mensaje")}
          />

          {/* --- Error de envío: no deja al visitante sin salida --- */}
          <AnimatePresence>
            {estado === "error" && (
              <m.div
                key="error"
                ref={errorRef}
                tabIndex={-1}
                role="alert"
                variants={aviso}
                initial="oculto"
                animate="visible"
                exit="salida"
                className="con-regla con-regla--acento pt-6"
              >
                <p className="etiqueta text-accent-deep">No se pudo enviar</p>
                <p className="medida mt-3 text-ink">
                  {mensajeError} Su mensaje no se perdió: mándelo directo por cualquiera de
                  estas dos vías y llega igual.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Boton href={respaldoWhatsapp} variante="secundario" externo>
                    Enviarlo por WhatsApp
                  </Boton>
                  <Boton href={respaldoCorreo} variante="secundario" externo>
                    Enviarlo por correo
                  </Boton>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-6">
            <Boton type="submit" cargando={enviando}>
              {enviando ? "Enviando" : "Enviar mensaje"}
            </Boton>
            <p className="text-sm text-ink-muted">
              O escríbanos directo por{" "}
              <Enlace href={whatsapp} externo>
                WhatsApp
              </Enlace>
              .
            </p>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}

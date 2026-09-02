import type { Metadata } from "next";
import { Enlace } from "@/components/ui/Enlace";
import { Entrada } from "@/components/motion/Entrada";
import { TituloPorLineas } from "@/components/motion/TituloPorLineas";
import { diccionario, comoIdioma, interpolar } from "@/idioma";
import { empresa, mailto } from "@/lib/site";

/**
 * Política de tratamiento de datos personales.
 *
 * Es un documento, no una página de venta: sin revelados al scroll, sin
 * fotos, sin tarjetas. Un índice fijo a la izquierda en escritorio —para
 * que quien busca «cómo borro mis datos» no tenga que leer las trece
 * secciones— y el texto a la medida de lectura del resto del sitio.
 *
 * El texto vive en el diccionario (src/idioma/es.privacidad.ts), con la
 * cabecera que dice qué tiene que confirmar el abogado. Los datos del
 * responsable se rellenan desde src/lib/site.ts: si cambia el correo de
 * gerencia, cambia aquí sin tocar la política.
 */

export async function generateMetadata({
  params,
}: PageProps<"/[idioma]/privacidad">): Promise<Metadata> {
  const { idioma: segmento } = await params;
  const t = diccionario(comoIdioma(segmento));
  return { title: t.meta.tituloPrivacidad, description: t.meta.descripcionPrivacidad };
}

export default async function Pagina({ params }: PageProps<"/[idioma]/privacidad">) {
  const { idioma: segmento } = await params;
  const idioma = comoIdioma(segmento);
  const t = diccionario(idioma);
  const p = t.privacidad;

  const datos = {
    razonSocial: empresa.razonSocial,
    sede: empresa.sede,
    correo: empresa.correo,
    telefono: empresa.telefono,
    vigencia: p.vigencia,
  };
  const rellenar = (texto: string) => interpolar(texto, datos);

  return (
    <>
      {/* ---------------- Cabecera ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <Entrada as="p" tipo="lateral" className="etiqueta text-accent-deep">
          {p.rotulo}
        </Entrada>

        <TituloPorLineas
          indice={1}
          className="mt-8 text-3xl md:text-4xl"
          lineas={p.lineasTitulo}
        />

        <Entrada as="p" indice={4} className="medida-documento mt-8 text-lg text-ink-muted">
          {rellenar(p.entradilla)}
        </Entrada>

        <Entrada as="p" indice={5} className="mt-8 text-sm text-ink-muted">
          {p.vigenciaRotulo} <span className="dato text-ink">{p.vigencia}</span>
        </Entrada>
      </section>

      {/* ---------------- Índice + texto ---------------- */}
      <section className="mx-auto w-full max-w-ancho px-6 pb-24 md:pb-40">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-24">
          <nav aria-label={p.indiceRotulo} className="lg:sticky lg:top-32 lg:self-start">
            <p className="etiqueta text-ink-muted">{p.indiceRotulo}</p>
            <ol className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
              {p.secciones.map((s, i) => (
                <li key={s.id} className="flex items-baseline gap-3 text-sm">
                  <span className="dato text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <Enlace href={`#${s.id}`} className="text-ink">
                    {s.titulo}
                  </Enlace>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-16">
            {p.secciones.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-titulo`}>
                <p className="dato text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-titulo`} className="mt-2 font-titulo text-2xl text-ink md:text-3xl">
                  {s.titulo}
                </h2>

                {s.parrafos.map((texto) => (
                  <p key={texto} className="medida-documento mt-6 text-ink">
                    {rellenar(texto)}
                  </p>
                ))}

                {s.lista ? (
                  <ul className="medida-documento mt-6 flex flex-col gap-3 pl-5 text-ink">
                    {s.lista.map((item) => (
                      <li key={item} className="list-disc marker:text-accent-deep">
                        {rellenar(item)}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {s.parrafosFinales?.map((texto) => (
                  <p key={texto} className="medida-documento mt-6 text-ink">
                    {rellenar(texto)}
                  </p>
                ))}

                {s.enlace ? (
                  <p className="mt-6">
                    <Enlace href={s.enlace.url} externo flecha>
                      {s.enlace.texto}
                    </Enlace>
                  </p>
                ) : null}
              </section>
            ))}

            <div className="con-regla con-regla--acento pt-8">
              <p className="etiqueta text-accent-deep">{p.dudasRotulo}</p>
              <p className="mt-4 text-ink">
                {p.dudasTexto}{" "}
                <Enlace href={mailto} externo>
                  {empresa.correo}
                </Enlace>
                .
              </p>
              <p className="mt-8">
                <Enlace href={`/${idioma}`} flecha>
                  {p.volver}
                </Enlace>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

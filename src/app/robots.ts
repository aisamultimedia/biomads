import type { MetadataRoute } from "next";
import { sitioUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Página interna de trabajo: no tiene por qué salir en buscadores. */
      disallow: ["/estilo"],
    },
    sitemap: `${sitioUrl()}/sitemap.xml`,
  };
}

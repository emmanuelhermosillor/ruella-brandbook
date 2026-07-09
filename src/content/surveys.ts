// Ruella · content/surveys.ts — Encuestas por perfil (deck aprobado, 8 jul 2026)
// FUENTE DE VERDAD. Se responden en /aplicacion?token=… tras el clic del Correo 1.
// Regla: bandas, nunca cifras exactas. La encuesta ES el filtro de la casa.
import type { Lang } from "./copy";

export type SurveyQuestion = {
  id: string; // clave estable → columna en la pestaña "Aplicaciones"
  q: { es: string; en: string };
  // "select" = opciones cerradas · "text" = respuesta libre corta
  kind: "select" | "text";
  options?: { value: string; es: string; en: string }[];
  // "Otra" con campo libre al elegirla
  allowOther?: boolean;
  optional?: boolean;
};

export const surveys: Record<"investor" | "broker" | "developer", SurveyQuestion[]> = {
  broker: [
    {
      id: "plaza",
      q: { es: "¿En qué plaza(s) operas hoy?", en: "Where do you work today?" },
      kind: "select",
      allowOther: true,
      options: [
        { value: "los-cabos", es: "Los Cabos", en: "Los Cabos" },
        { value: "vallarta", es: "Puerto Vallarta", en: "Puerto Vallarta" },
        { value: "guadalajara", es: "Guadalajara", en: "Guadalajara" },
        { value: "valle-de-bravo", es: "Valle de Bravo", en: "Valle de Bravo" },
        { value: "riviera-maya", es: "Riviera Maya", en: "Riviera Maya" },
        { value: "cdmx", es: "CDMX", en: "Mexico City" },
      ],
    },
    {
      id: "experiencia",
      q: { es: "¿Cuántos años llevas en el segmento alto?", en: "How long have you worked the high end?" },
      kind: "select",
      options: [
        { value: "lt3", es: "Menos de 3", en: "Under 3 years" },
        { value: "3-7", es: "3 a 7", en: "3–7 years" },
        { value: "8-15", es: "8 a 15", en: "8–15 years" },
        { value: "gt15", es: "Más de 15", en: "Over 15 years" },
      ],
    },
    {
      id: "rango",
      q: { es: "¿En qué rango cerraron tus últimas operaciones?", en: "What range did your recent closings fall in?" },
      kind: "select",
      options: [
        { value: "lt500k", es: "Hasta 500 mil USD", en: "Up to $500K USD" },
        { value: "500k-1m", es: "500 mil a 1 M USD", en: "$500K–$1M USD" },
        { value: "1m-3m", es: "1 a 3 M USD", en: "$1M–$3M USD" },
        { value: "gt3m", es: "Más de 3 M USD", en: "Over $3M USD" },
      ],
    },
    {
      id: "clientes",
      q: { es: "¿Tienes hoy clientes buscando algo de este calibre?", en: "Do you have clients looking at this level today?" },
      kind: "select",
      options: [
        { value: "activos", es: "Sí, activos", en: "Yes, actively" },
        { value: "conversacion", es: "En conversación", en: "In conversation" },
        { value: "aun-no", es: "Aún no", en: "Not yet" },
      ],
    },
    {
      id: "operacion",
      q: { es: "¿Operas con agencia o independiente?", en: "With an agency, or independent?" },
      kind: "select",
      allowOther: false,
      options: [
        { value: "agencia", es: "Con agencia — ¿cuál?", en: "With an agency — which one?" },
        { value: "independiente", es: "Independiente", en: "Independent" },
      ],
      // Nota de implementación: si elige "agencia", mostrar campo corto para el nombre.
    },
    {
      id: "referencia",
      q: { es: "¿Quién te habló de Ruella?", en: "Who told you about Ruella?" },
      kind: "text",
    },
  ],

  investor: [
    {
      id: "plaza",
      q: { es: "¿Qué plaza te interesa?", en: "Which market interests you?" },
      kind: "select",
      allowOther: true,
      options: [
        { value: "los-cabos", es: "Los Cabos", en: "Los Cabos" },
        { value: "vallarta", es: "Puerto Vallarta", en: "Puerto Vallarta" },
        { value: "guadalajara", es: "Guadalajara", en: "Guadalajara" },
        { value: "valle-de-bravo", es: "Valle de Bravo", en: "Valle de Bravo" },
        { value: "riviera-maya", es: "Riviera Maya", en: "Riviera Maya" },
      ],
    },
    {
      id: "objetivo",
      q: { es: "¿Qué buscas en una propiedad así?", en: "What are you looking for in a property like this?" },
      kind: "select",
      options: [
        { value: "patrimonio", es: "Patrimonio y uso propio", en: "A home and a legacy" },
        { value: "renta", es: "Renta", en: "Rental income" },
        { value: "plusvalia", es: "Plusvalía", en: "Appreciation" },
        { value: "mezcla", es: "Una mezcla", en: "A blend of these" },
      ],
    },
    {
      id: "rango",
      q: { es: "¿En qué rango de inversión te mueves?", en: "What range are you working within?" },
      kind: "select",
      options: [
        { value: "500k-1m", es: "500 mil a 1 M USD", en: "$500K–$1M USD" },
        { value: "1m-2m", es: "1 a 2 M USD", en: "$1M–$2M USD" },
        { value: "2m-4m", es: "2 a 4 M USD", en: "$2M–$4M USD" },
        { value: "gt4m", es: "Más de 4 M USD", en: "Over $4M USD" },
        { value: "conversarlo", es: "Prefiero conversarlo", en: "I'd rather discuss it" },
      ],
    },
    {
      id: "experiencia",
      q: { es: "¿Has comprado en etapas tempranas antes?", en: "Have you bought early-stage before?" },
      kind: "select",
      options: [
        { value: "varias", es: "Varias veces", en: "Several times" },
        { value: "una", es: "Una vez", en: "Once" },
        { value: "primera", es: "Sería la primera", en: "This would be the first" },
      ],
    },
    {
      id: "referencia",
      q: { es: "¿Quién te acercó a Ruella?", en: "Who brought you to Ruella?" },
      kind: "text",
    },
    {
      id: "contexto",
      q: { es: "¿Algo que debamos saber antes de conversar?", en: "Anything we should know before we talk?" },
      kind: "text",
      optional: true,
    },
  ],

  developer: [
    {
      id: "proyecto",
      q: { es: "¿Cómo se llama el proyecto y en qué plaza vive?", en: "What is the project, and where does it live?" },
      kind: "text",
    },
    {
      id: "etapa",
      q: { es: "¿En qué etapa está?", en: "What stage is it in?" },
      kind: "select",
      options: [
        { value: "concepto", es: "Concepto", en: "Concept" },
        { value: "dictamen", es: "Dictamen técnico", en: "Technical review" },
        { value: "licencia", es: "Licencia", en: "Permitting" },
        { value: "obra", es: "Obra iniciada", en: "Under construction" },
      ],
    },
    {
      id: "tamano",
      q: { es: "¿Qué tamaño tiene la etapa que buscas colocar?", en: "How large is the stage you're looking to place?" },
      kind: "text",
    },
    {
      id: "calendario",
      q: { es: "¿Cuál es tu calendario?", en: "What is your timeline?" },
      kind: "text",
    },
    {
      id: "expectativa",
      q: { es: "¿Qué esperas de Ruella?", en: "What do you expect from Ruella?" },
      kind: "select",
      options: [
        { value: "absorcion", es: "Absorción temprana", en: "Early absorption" },
        { value: "sello", es: "El Visto Bueno y el sello", en: "The Review and the seal" },
        { value: "ambas", es: "Ambas", en: "Both" },
      ],
    },
    {
      id: "referencia",
      q: { es: "¿Quién te acercó a la casa?", en: "Who brought you to Ruella?" },
      kind: "text",
    },
  ],
} as const;

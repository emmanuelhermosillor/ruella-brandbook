// Ruella · content/copy.ts — v3 FINAL (deck aprobado, 8 jul 2026)
// FUENTE DE VERDAD. Los textos están curados con la voz de la casa; no se reescriben.
// ES = el anfitrión que recibe. EN = registro de club privado, nacido en inglés.
// Bilingüe nativo, nunca mezclado. Cero precios, cero unidades, cero inventario.
export type Lang = "es" | "en";

export const copy = {
  descriptor: { es: "Quietly first.", en: "Quietly first." },

  nav: {
    casa: { es: "La Casa", en: "The House" },
    circulo: { es: "El Círculo", en: "The Circle" },
    opening: { es: "El Opening", en: "The Opening" },
    acceso: { es: "Acceso", en: "Access" },
    cta: { es: "Solicitar acceso", en: "Request access" },
  },

  hero: {
    eyebrow: { es: "Ruella · Quietly first.", en: "Ruella · Quietly first." },
    title: { es: "Lo extraordinario es para muy pocos.", en: "The extraordinary, for the very few." },
    sub: { es: "Una casa de curaduría de real estate. Se entra por invitación.", en: "Curated real estate. By invitation only." },
    cta: { es: "Solicitar acceso", en: "Request access" },
  },

  casa: {
    label: { es: "La Casa", en: "The House" },
    title: { es: "No somos una inmobiliaria. Somos una casa que cura.", en: "We don't sell real estate. We curate it." },
    body1: {
      es: "Curamos las etapas tempranas de proyectos de lujo y abrimos el acceso a un círculo elegido con cuidado. Examinamos cada proyecto a fondo — si algo llega a ti por Ruella, es porque vale tu tiempo.",
      en: "We curate exceptional projects from their earliest stage and open them to a small, hand-picked circle. Everything is vetted, properly — if it reaches you through Ruella, it's worth your time.",
    },
    body2: {
      es: "Nuestra promesa es certeza: criterio en lo que elegimos, verdad en lo que ponemos frente a ti, y un lugar entre quienes hacen las cosas a conciencia.",
      en: "Our promise is certainty: judgment in what we choose, truth in what we place in front of you, and a seat among people who do things properly.",
    },
  },

  circulo: {
    label: { es: "El Círculo", en: "The Circle" },
    title: { es: "Se entra por una oportunidad. Se queda por la compañía.", en: "You come for an opportunity. You stay for the company." },
    sub: { es: "El inmueble es la ocasión; el círculo es el patrimonio.", en: "The property is the occasion. The circle is what lasts." },
    items: [
      {
        n: "01",
        href: "/inversionistas",
        title: { es: "Inversionistas", en: "Investors" },
        body: {
          es: "Producto que no está afuera, curado y con dictamen. Para decidir con calma.",
          en: "Curated, vetted opportunities you won't find listed. Decide at your own pace.",
        },
      },
      {
        n: "02",
        href: "/brokers",
        title: { es: "Brokers / Asesores", en: "Brokers" },
        body: {
          es: "Inventario que no está afuera. Tu comisión completa, sin split.",
          en: "Inventory no one else holds. Your commission stays whole.",
        },
      },
      {
        n: "03",
        href: "/desarrolladores",
        title: { es: "Desarrolladores", en: "Developers" },
        body: {
          es: "Absorción temprana sin quemar tu precio público. Un sello que el mercado respeta.",
          en: "Early absorption, your public pricing untouched. A seal the market respects.",
        },
      },
    ],
    more: { es: "Conocer más", en: "Learn more" },
  },

  opening: {
    label: { es: "Opening No. 001", en: "Opening No. 001" },
    place: { es: "The Cliff Club · Los Cabos", en: "The Cliff Club · Los Cabos" },
    body: {
      es: "Un nuevo proyecto llega a Ruella. Tu invitación está por llegar, a tu nombre.",
      en: "A new project is coming to Ruella. Your invitation will arrive with your name on it.",
    },
    cta: { es: "Solicitar acceso", en: "Request access" },
  },

  // Nota sobre el nombre — sección breve en /, después del Opening.
  nombre: {
    label: { es: "El nombre", en: "The name" },
    body: {
      es: "Ruella toma su nombre de Paul Durand-Ruel, el marchante que en 1872 vio valor donde el mercado aún no sabía mirar. De él tomamos una sola cosa: la disciplina de ver lo que otros no ven, y de elegir con criterio. El resto lo construimos nosotros.",
      en: "Ruella takes its name from Paul Durand-Ruel, the dealer who in 1872 saw value where the market had yet to look. From him we take one thing: the discipline of seeing what others miss, and choosing with judgment. The rest is ours to build.",
    },
  },

  acceso: {
    label: { es: "Acceso", en: "Access" },
    title: { es: "Esta puerta no aparece en buscadores.", en: "No one finds this page by accident." },
    body: {
      es: "Se entra por invitación, y toda invitación empieza por una conversación. Cuéntanos quién eres; te responde un humano de la casa.",
      en: "Entry is by invitation, and every invitation starts with a conversation. Tell us who you are — a real person will reply.",
    },

    // Gate ceremonial multi-paso. Todos los campos son obligatorios.
    // q = pregunta (display), note = línea de apoyo (mono, discreta),
    // error = validación en la voz de la casa.
    steps: {
      name: {
        q: { es: "Empecemos por tu nombre.", en: "Your name." },
        note: { es: "Así te recibe la casa.", en: "As you'd like to be addressed." },
        placeholder: { es: "Nombre y apellido", en: "First and last name" },
        error: { es: "Tu nombre es el primer paso.", en: "We'll need your name." },
      },
      email: {
        q: { es: "¿A qué correo te escribimos?", en: "Your email." },
        note: { es: "Ahí continúa tu solicitud.", en: "Everything that follows arrives there." },
        placeholder: { es: "nombre@correo.com", en: "name@email.com" },
        error: { es: "Revisa el correo: ahí continúa tu solicitud.", en: "Please check the email — everything that follows arrives there." },
      },
      phone: {
        q: { es: "Tu teléfono, con lada.", en: "Your phone, with country code." },
        note: { es: "Llamamos solo cuando la conversación lo pide.", en: "We call only when a conversation is warranted." },
        placeholder: { es: "322 000 0000", en: "555 000 0000" },
        error: { es: "Revisa el número, con lada incluida.", en: "Please check the number, including the country code." },
      },
      role: {
        q: { es: "¿Cuál es tu lugar en la mesa?", en: "In what capacity are you applying?" },
        options: {
          investor: { es: "Inversionista", en: "Investor" },
          broker: { es: "Broker / Asesor", en: "Broker" },
          developer: { es: "Desarrollador", en: "Developer" },
        },
        error: { es: "Elige tu lugar en la mesa.", en: "Please choose one." },
      },
      message: {
        q: { es: "¿Qué te trae a la puerta de Ruella?", en: "What brings you to Ruella?" },
        note: { es: "En tus palabras. Unas líneas bastan.", en: "In your own words. A few lines is enough." },
        placeholder: { es: "", en: "" },
        error: { es: "Unas líneas bastan — pero las necesitamos.", en: "A few lines is enough — but we do need them." },
      },
      consent: {
        text: {
          es: "He leído el aviso de privacidad y acepto que Ruella me contacte sobre mi solicitud.",
          en: "I have read the Privacy Notice and agree to be contacted about my application.",
        },
        privacyLink: { es: "Aviso de privacidad", en: "Privacy Notice" },
        error: { es: "Necesitamos tu consentimiento para continuar.", en: "We need your consent to continue." },
      },
    },

    // Navegación del gate (mono, discreta). El contador de paso va en
    // numerales mono ("02 / 06") — neutro, no se traduce.
    stepNav: {
      next: { es: "Continuar", en: "Continue" },
      back: { es: "Regresar", en: "Back" },
      submit: { es: "Solicitar acceso", en: "Request access" },
    },

    success: {
      title: { es: "Recibido.", en: "Thank you." },
      body: {
        es: "Revisa tu bandeja de entrada: tu siguiente paso ya va en camino.",
        en: "Check your inbox — your next step is on its way.",
      },
    },
    retry: { es: "Algo no salió. Intenta de nuevo.", en: "Something went wrong. Please try again." },

    // Etiquetas planas para aria-label / autocomplete (no display principal).
    form: {
      name: { es: "Nombre", en: "Name" },
      email: { es: "Correo", en: "Email" },
      phone: { es: "Teléfono", en: "Phone" },
      country: { es: "País", en: "Country" },
      role: { es: "Perfil", en: "Profile" },
      message: { es: "Mensaje", en: "Message" },
    },
  },

  perfiles: {
    brokers: {
      label: { es: "El Círculo · Brokers y Asesores", en: "The Circle · Brokers" },
      title: { es: "Tu comisión, completa. Tu cliente, a tu nombre.", en: "Your commission stays whole. Your client stays yours." },
      paras: {
        es: [
          "Los mejores asesores pasan su carrera peleando por el mismo inventario que tienen todos. Ruella trabaja al revés.",
          "No somos una agencia y no competimos contigo. Curamos proyectos que no están afuera y los abrimos a un círculo cerrado. Tú traes la relación; nosotros ponemos lo que nadie más tiene, y las reglas que te cuidan.",
          "No somos un master broker. Tu comisión no se reparte: es tuya, completa. Y tu cliente queda registrado a tu nombre: la casa nunca pasa por encima de ti.",
          "Se entra por invitación. Si tu oficio es el lujo y lo tratas como oficio, hay una silla que podría ser tuya.",
        ],
        en: [
          "The best brokers spend their careers fighting over the same inventory as everyone else. Ruella works the other way around.",
          "We're not an agency, and we don't compete with you. We curate projects that never get listed and open them to a closed circle. You bring the relationship; we bring what no one else holds — and rules that protect it.",
          "We're not a master broker. Your commission is never split — it's yours, whole. Your client is registered under your name, and we never go around you.",
          "Entry is by invitation. If the high end is your craft, there may be a seat here for you.",
        ],
      },
      cta: { es: "Solicitar acceso", en: "Request access" },
    },
    inversionistas: {
      label: { es: "El Círculo · Inversionistas", en: "The Circle · Investors" },
      title: { es: "El acceso es el verdadero lujo.", en: "Access is the real luxury." },
      paras: {
        es: [
          "Todo proyecto extraordinario tiene un tramo que no se anuncia: se abre, en privado, a un círculo elegido con cuidado. Ruella cura ese tramo y lo pone en tu mesa.",
          "Aquí no compras un folleto: compras un proyecto que pasó el examen de la casa. La mayoría no pasa; eso es exactamente lo que vale el que sí.",
          "Nunca un carrito, siempre una conversación. Un humano de la casa te acompaña de principio a fin, a tu ritmo, con condiciones por escrito y sujeto a disponibilidad.",
          "Si valoras el acceso que no se anuncia, hay una conversación que vale la pena tener.",
        ],
        en: [
          "Every exceptional project has a stage that's never advertised — opened privately, to a circle chosen with care. That is the stage Ruella curates.",
          "You're not buying a brochure here. You're buying a project that passed a demanding review — most don't, and that's precisely the point.",
          "Never a cart, always a conversation. Someone from Ruella walks with you from start to finish, at your pace, with terms in writing — subject to availability.",
          "If quiet access is what you value, this conversation is worth having.",
        ],
      },
      cta: { es: "Solicitar acceso", en: "Request access" },
    },
    desarrolladores: {
      label: { es: "El Círculo · Desarrolladores", en: "The Circle · Developers" },
      title: { es: "Absorción temprana. Tu precio público, intacto.", en: "Early absorption. Your public pricing, untouched." },
      paras: {
        es: [
          "Las primeras etapas piden lo más difícil: vender con convicción antes de que el mercado la tenga. Ruella existe para ese tramo.",
          "Colocamos tus primeras etapas dentro de un círculo curado — inversionistas y asesores bajo reglas claras — sin publicidad, sin ruido, y con tu lista pública protegida.",
          "Lo que Ruella firma pasó un dictamen, y se reporta con disciplina. Ese sello cuida tu proyecto tanto como al comprador.",
          "Trabajamos con pocos proyectos a la vez, elegidos con criterio. Si el tuyo tiene el calibre, hablemos.",
        ],
        en: [
          "The earliest stage asks the hardest thing of a developer: selling with conviction before the market has any. That stage is our specialty.",
          "We place it inside a curated circle — investors and brokers under clear rules — with no advertising, no noise, and your pricing protected.",
          "Nothing carries the Ruella name without passing our review, and everything we do is reported with discipline. That protects your project as much as the buyer.",
          "We take on a few projects at a time, chosen carefully. If yours has the caliber, let's talk.",
        ],
      },
      cta: { es: "Solicitar acceso", en: "Request access" },
    },
  },

  cookies: {
    body: {
      es: "La casa usa analítica para entender cómo se lee este sitio — solo con tu permiso, y con tus datos enmascarados.",
      en: "We use analytics to understand how this site is read — only with your permission, and always masked.",
    },
    accept: { es: "Permitir", en: "Allow" },
    decline: { es: "Ahora no", en: "Not now" },
    link: { es: "Aviso de privacidad", en: "Privacy Notice" },
  },

  notFound: {
    title: { es: "Esta página no existe. La casa, sí.", en: "This page doesn't exist. Everything else is right here." },
    cta: { es: "Volver al inicio", en: "Back to the start" },
  },

  privacidad: {
    label: { es: "La Casa", en: "The House" },
    title: { es: "Aviso de privacidad", en: "Privacy Notice" },
    intro: {
      es: "La discreción es parte de cómo trabaja esta casa. Capturamos lo mínimo, lo usamos solo para responderte, y no lo compartimos con nadie de más.",
      en: "Discretion is part of how we work. We collect the minimum, use it only to reply to you, and share it with no one beyond those who help us do so.",
    },
    updated: { es: "Última actualización: julio 2026", en: "Last updated: July 2026" },
    sections: [
      {
        h: { es: "Quién trata tus datos", en: "Who handles your details" },
        body: {
          es: "Ruella es responsable del tratamiento de los datos personales que nos compartes a través de este sitio. Para cualquier tema de privacidad, escríbenos a privacidad@ruella.mx.",
          en: "Ruella is responsible for the personal details you share with us through this site. For any privacy matter, write to privacidad@ruella.mx.",
        },
      },
      {
        h: { es: "Qué capturamos", en: "What we collect" },
        body: {
          es: "Solo lo que nos das al solicitar acceso y al completar tu aplicación: tu nombre, tu correo, tu teléfono, tu perfil (inversionista, broker / asesor o desarrollador), tu mensaje, el idioma en que nos escribes y tus respuestas a la aplicación. Nada más.",
          en: "Only what you give us when you request access and complete your application: your name, your email, your phone, your profile (investor, broker, or developer), your message, the language you write in, and your application answers. Nothing more.",
        },
      },
      {
        h: { es: "Para qué lo usamos", en: "What we use it for" },
        body: {
          es: "Para atender tu solicitud de acceso, ponernos en contacto contigo y llevar el registro de admisiones de la casa. No usamos tus datos para publicidad y no los vendemos.",
          en: "To handle your request for access, to get in touch with you, and to keep our admissions record. We don't use your details for advertising, and we never sell them.",
        },
      },
      {
        h: { es: "Dónde viven", en: "Where they live" },
        body: {
          es: "Tus datos pasan por proveedores que procesan por cuenta de la casa: Vercel (alojamiento del sitio), Resend (correo), Google (registro de admisiones) y Cloudflare (protección del formulario contra abuso automatizado). Si nos das tu permiso, Microsoft Clarity nos ayuda a entender cómo se lee el sitio — con lo que escribes siempre enmascarado. Ningún tercero de más.",
          en: "Your details pass through providers that process them on our behalf: Vercel (site hosting), Resend (email), Google (admissions record), and Cloudflare (protecting the form from automated abuse). If you give us your permission, Microsoft Clarity helps us understand how the site is read — with anything you type always masked. No third party beyond these.",
        },
      },
      {
        h: { es: "Analítica, con tu permiso", en: "Analytics, with your permission" },
        body: {
          es: "La analítica de este sitio permanece apagada hasta que tú la permitas, y puedes retirar tu permiso cuando quieras borrando los datos de este sitio en tu navegador. Las métricas de tráfico del alojamiento no usan cookies ni te identifican.",
          en: "This site's analytics stay off until you allow them, and you can withdraw your permission at any time by clearing this site's data in your browser. The hosting's traffic metrics use no cookies and never identify you.",
        },
      },
      {
        h: { es: "Tus derechos", en: "Your rights" },
        body: {
          es: "Puedes pedirnos acceso, rectificación, cancelación u oposición sobre tus datos (derechos ARCO, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares) escribiendo a privacidad@ruella.mx. Te respondemos en los plazos que marca la ley.",
          en: "You may ask us to access, correct, delete, or stop using your details (ARCO rights, under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties) by writing to privacidad@ruella.mx. We reply within the timeframes the law sets.",
        },
      },
      {
        h: { es: "Cambios a este aviso", en: "Changes to this notice" },
        body: {
          es: "Si este aviso cambia, la versión vigente vivirá siempre en esta página, con su fecha de actualización.",
          en: "If this notice changes, the current version will always live on this page, with its update date.",
        },
      },
    ],
  },

  // Encuesta post-correo (/aplicacion). Textos de marco; las preguntas viven
  // en src/content/surveys.ts.
  aplicacion: {
    label: { es: "Tu aplicación", en: "Your application" },
    intro: {
      es: "La casa lee cada respuesta. Contesta con calma; no hay respuestas correctas.",
      en: "Every answer is read personally. Take your time — there are no right answers.",
    },
    submit: { es: "Enviar aplicación", en: "Submit application" },
    done: {
      title: { es: "Gracias.", en: "Thank you." },
      body: {
        es: "Leemos cada aplicación personalmente y te escribimos en pocos días. A veces la respuesta es no — siempre con la puerta abierta.",
        en: "Every application is read personally; you'll hear from us within days. Sometimes the answer is no — and the door stays open.",
      },
    },
    invalidToken: {
      es: "Este enlace ya no es válido. Si crees que es un error, responde al correo que te enviamos.",
      en: "This link is no longer valid. If you believe this is a mistake, simply reply to our email.",
    },
    error: { es: "Algo no salió. Intenta de nuevo.", en: "Something went wrong. Please try again." },
    optional: { es: "Opcional", en: "Optional" },
    required: { es: "Esta respuesta hace falta.", en: "We'll need this one." },
  },

  footer: {
    disclaimer: {
      es: "Las proyecciones no constituyen garantía de rendimiento. Todo sujeto a disponibilidad.",
      en: "Projections are not a guarantee of returns. Subject to availability.",
    },
    privacy: { es: "Aviso de privacidad", en: "Privacy Notice" },
  },

  // Fotografía del banco de la casa (Death to Stock). alt = accesibilidad; caption = mono.
  figs: {
    hero: {
      alt: { es: "Campo dorado al atardecer entre árboles y muros de piedra.", en: "A golden field at dusk among trees and stone walls." },
      caption: { es: "Fig. 001 · Campo, luz de tarde · DTS", en: "Fig. 001 · Field, evening light · DTS" },
    },
    casa: {
      alt: { es: "Desayuno servido sobre lino blanco con charolas de plata.", en: "Breakfast set on white linen with silver trays." },
      caption: { es: "Plate 01 · La mesa · DTS", en: "Plate 01 · The table · DTS" },
    },
    opening: {
      alt: { es: "Cala frente al mar: lanchas sobre agua turquesa y roca de granito, costa de Los Cabos.", en: "A seafront cove: small boats on turquoise water and granite rock, the Los Cabos coast." },
      caption: { es: "Fig. 002 · Frente al mar · Los Cabos · DTS", en: "Fig. 002 · By the sea · Los Cabos · DTS" },
    },
    gate: {
      alt: { es: "Hojas verdes en penumbra, en calma.", en: "Green fronds in soft shade, at rest." },
      caption: { es: "Fig. 003 · En calma · DTS", en: "Fig. 003 · At rest · DTS" },
    },
    gateSuccess: {
      alt: { es: "La casa al caer la tarde, campo dorado.", en: "The house at dusk, a golden field." },
      caption: { es: "Fig. 004 · La casa, al caer la tarde · DTS", en: "Fig. 004 · The house, at dusk · DTS" },
    },
    emailBand: {
      alt: { es: "Manos en reposo sobre el musgo.", en: "Hands resting on moss." },
    },
  },
} as const;

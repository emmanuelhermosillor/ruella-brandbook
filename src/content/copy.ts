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
    opening: { es: "La Apertura", en: "The Opening" },
    acceso: { es: "Acceso", en: "Access" },
    cta: { es: "Solicitar acceso", en: "Request access" },
  },

  hero: {
    eyebrow: { es: "Ruella · Quietly first.", en: "Ruella · Quietly first." },
    title: { es: "Lo extraordinario es para muy pocos.", en: "The extraordinary, for the very few." },
    sub: {
      es: "Una casa que cura. Un círculo que permanece. Se entra por invitación.",
      en: "A house that curates. A circle that lasts. Entry by invitation.",
    },
    cta: { es: "Solicitar acceso", en: "Request access" },
  },

  casa: {
    label: { es: "La Casa", en: "The House" },
    title: {
      es: "El lujo inmobiliario es ruidoso, y casi todo ese ruido es gris.",
      en: "Luxury real estate is loud, and most of that noise is grey.",
    },
    body1: {
      es: "Ruella nace en contra de eso. No somos una inmobiliaria. Somos una casa que cura: analizamos cada proyecto a profundidad, establecemos el método, y damos el vamos solo cuando es digno de salir al mercado. El rigor, para nosotros, es la forma más alta de hospitalidad.",
      en: "Ruella exists against that. We are not a brokerage. We are a house that curates: we study a project to its depths, we set the method, and we give our word only when it deserves to reach the market. Rigour, to us, is the highest form of hospitality.",
    },
    body2: {
      es: "Pero lo que reunimos no son propiedades. Es gente. Los mejores negocios ocurren entre pares, dentro de un círculo elegido con cuidado. El inmueble es la ocasión; el círculo es el patrimonio.",
      en: "But what we gather is not properties. It is people. The best business happens between peers, inside a circle chosen with care. The property is the occasion; the circle is what you keep.",
    },
    seal: {
      es: "Una casa. Un círculo. Una forma de hacer las cosas.",
      en: "A house. A circle. A way of doing things.",
    },
    // Durand-Ruel como alusión; el origen se cuenta a fondo en materiales.
    nombre: {
      es: "El nombre viene de un marchante que en 1872 vio valor donde el mercado aún no sabía mirar.",
      en: "The name comes from a dealer who, in 1872, saw value where the market had yet to look.",
    },
  },

  respaldo: {
    label: { es: "El Respaldo", en: "The Backing" },
    title: {
      es: "Detrás de Ruella hay una obra construida, no una promesa.",
      en: "Behind Ruella there is a body of work, not a promise.",
    },
    body1: {
      es: "De Grubsa nace todo: la desarrolladora que lleva más de cuatro décadas construyendo y entregando. De esa escuela —la del oficio, el detalle y la palabra cumplida— viene la nuestra.",
      en: "Everything begins with Grubsa: the developer that has spent more than four decades building and delivering. That school — craft, detail, a word kept — is where ours comes from.",
    },
    body2: {
      es: "Ruella es parte de BAS Holding, el grupo que reúne bajo un mismo techo a Grubsa, a Adria Capital y a la casa: quien construye, quien desarrolla y quien coordina cómo el proyecto llega al mercado.",
      en: "Ruella is part of BAS Holding, the group that brings under one roof Grubsa, Adria Capital and the house itself: the one who builds, the one who develops, and the one who coordinates how a project reaches the market.",
    },
    body3: {
      es: "Para ti, eso significa una sola cosa: certeza. Cuando la casa confirma algo, está confirmado —porque lo confirmamos en la fuente, no de segunda mano.",
      en: "For you that means one thing: certainty. When the house confirms something, it is confirmed — because we confirm it at the source, not second-hand.",
    },
  },

  rol: {
    label: { es: "El Rol", en: "The Role" },
    title: {
      es: "Somos la mesa donde los tres lados se encuentran.",
      en: "We are the table where the three sides meet.",
    },
    body1: {
      es: "Ruella coordina la comercialización de los proyectos que cura. No es el desarrollador ni una agencia: es quien pone el sistema, las buenas prácticas y el estándar para que las cosas sucedan.",
      en: "Ruella coordinates how the projects it curates reach the market. Not the developer, not an agency: the one who sets the system, the standard and the practices that make things happen.",
    },
    body2: {
      es: "Atraemos a los asesores y a los inversionistas correctos, ponemos las reglas a la vista, y cuidamos que el precio y la palabra sean los mismos para todos. No competimos con quien vende —coordinamos para que venda mejor.",
      en: "We bring in the right brokers and the right investors, we put the rules in plain sight, and we make sure the price and the word are the same for everyone. We don't compete with whoever sells — we coordinate so they sell better.",
    },
    body3: {
      es: "El desarrollador, el inversionista y el asesor, en una misma mesa, bajo reglas claras. En esa mesa, todos ganan.",
      en: "Developer, investor and broker, at one table, under clear rules. At that table, everyone wins.",
    },
  },

  curaduria: {
    label: { es: "La Curaduría", en: "The Assessment" },
    title: { es: "Lo que no pasa, no llega a tu mesa.", en: "What doesn't pass never reaches your table." },
    body1: {
      es: "Todo lo que llega a la casa pasa por El Dictamen: nuestro propio análisis de cada proyecto, hecho con el rigor de quien va a poner su nombre encima. El terreno, los permisos, los números, la letra chica —lo que casi nadie estudia.",
      en: "Everything that enters the house goes through The Assessment: our own study of a project, done with the rigour of someone about to put their name on it. The land, the permits, the numbers, the fine print — what almost no one reads.",
    },
    body2: {
      es: "Cuando algo llega a ti por Ruella, ya cargó con la pregunta difícil. Tú recibes lo que quedó del lado correcto del filtro.",
      en: "By the time something reaches you through Ruella, it has already carried the difficult question. What you receive is what stayed on the right side of the filter.",
    },
    body3: {
      es: "Como en una casa de relojes, las preguntas correctas encaminan a cada cliente a la pieza que le corresponde.",
      en: "As in a watch house, the right questions lead each client to the piece that belongs to them.",
    },
  },

  circulo: {
    label: { es: "El Círculo", en: "The Circle" },
    title: { es: "Se entra por una oportunidad. Se queda por la compañía.", en: "You come for an opportunity. You stay for the company." },
    sub: { es: "El inmueble es la ocasión; el círculo es el patrimonio.", en: "The property is the occasion. The circle is what you keep." },
    items: [
      {
        n: "01",
        href: "/inversionistas",
        title: { es: "Para compradores e inversionistas", en: "For buyers & investors" },
        body: {
          es: "Lo que llega a ti ya cargó con la pregunta difícil.",
          en: "What reaches you already carried the difficult question.",
        },
      },
      {
        n: "02",
        href: "/brokers",
        title: { es: "Para asesores y agencias", en: "For agents & brokerages" },
        body: {
          es: "Inventario que no está afuera. Tu comisión completa, tu cliente tuyo.",
          en: "Inventory that isn't out there. Your commission whole, your client yours.",
        },
      },
      {
        n: "03",
        href: "/desarrolladores",
        title: { es: "Para desarrolladores", en: "For developers" },
        body: {
          es: "Tu proyecto llega al mercado con método —y tu precio público intacto.",
          en: "Your project reaches the market with method — and your public price intact.",
        },
      },
    ],
    more: { es: "Conocer más", en: "Learn more" },
  },

  opening: {
    label: { es: "La Apertura No. 001", en: "Opening No. 001" },
    place: { es: "The Cliff Club · Los Cabos", en: "The Cliff Club · Los Cabos" },
    body1: {
      es: "La primera apertura de la casa lleva un nombre: The Cliff Club, en Los Cabos. Una casa sobre un acantilado frente al Pacífico, abierta en el momento del ciclo en que llegar antes todavía vale.",
      en: "The first opening of the house has a name: The Cliff Club, in Los Cabos. A house on a cliff facing the Pacific, opened at the point in the cycle when arriving early still counts.",
    },
    body2: {
      es: "El dictamen técnico del proyecto ya está sellado —era el hito más exigente del camino— y el proceso de licencias supera la mitad del recorrido.",
      en: "Its technical assessment is already sealed — the most demanding milestone of the way — and licensing is past the halfway mark.",
    },
    body3: {
      es: "Es la primera —no la única. La casa abre torre a torre, plaza a plaza. Los que están desde el principio van primero en todo lo que sigue.",
      en: "It is the first — not the only. The house opens tower by tower, address by address. Those who are here from the beginning go first in everything that follows.",
    },
    note: { es: "Sujeto a disponibilidad.", en: "Subject to availability." },
    cta: { es: "Solicitar acceso", en: "Request access" },
  },

  acceso: {
    label: { es: "Acceso", en: "Access" },
    title: { es: "Empezar es una conversación, no un formulario.", en: "Starting is a conversation, not a form." },
    body: {
      es: "Nos sentamos, te contamos qué hay abierto y, si hay encaje, tu invitación llega a tu nombre. A veces decimos que no —con la puerta abierta; es honestidad sobre el momento, nunca sobre ti.",
      en: "We sit down, we tell you what is open, and if there's a fit, your invitation arrives with your name on it. Sometimes we say no — with the door open. It's honesty about the moment, never about you.",
    },
    invite: { es: "Cuando quieras, conversemos.", en: "Whenever you like, let's talk." },

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
    // Dos caminos dentro de una misma puerta: El Círculo (asesor) y Las Alianzas (agencia).
    brokers: {
      label: { es: "El Círculo · Para asesores y agencias", en: "The Circle · For agents & brokerages" },
      title: { es: "Tu comisión, completa. Tu cliente, a tu nombre.", en: "Your commission stays whole. Your client stays yours." },
      intro: {
        es: "Dos puertas, un mismo estándar: El Círculo, para el asesor que trabaja de tú a tú con su comprador; Las Alianzas, para la agencia que trae su marca y su equipo.",
        en: "Two ways in, one standard: The Circle, for the broker who works face to face with their buyer; The Alliances, for the house that brings its brand and its team.",
      },
      vias: [
        {
          label: { es: "El Círculo · El asesor", en: "The Circle · The broker" },
          items: {
            es: [
              "Inventario que no está afuera: curado, en etapa temprana, no quemado.",
              "La comisión completa, sin split, desde que entras.",
              "Tu cliente, registrado a tu nombre; la casa nunca compite contra ti.",
              "Un concierge que carga el expediente, lo legal y la coordinación: tu trabajo es la relación.",
              "Reglas a la vista, iguales para todos, y un lugar que crece cuando vendes — A · AA · AAA.",
            ],
            en: [
              "Inventory that isn't out there — curated, early, unburned.",
              "Your commission whole, no split, from the day you walk in.",
              "Your client registered under your name; the house never competes with you.",
              "A concierge who carries the file, the legal and the coordination: your work is the relationship.",
              "Rules in plain sight, the same for everyone, and a place that grows as you sell — A · AA · AAA.",
            ],
          },
          close: { es: "Se entra por invitación. Hay una silla que podría ser tuya.", en: "Entry is by invitation. There may be a seat here for you." },
        },
        {
          label: { es: "Las Alianzas · La agencia", en: "The Alliances · The brokerage" },
          items: {
            es: [
              "Inventario exclusivo, no quemado, en el momento del ciclo en que más deja —para tu equipo.",
              "Tu casa conserva lo suyo: tu marca, tu equipo, tu cartera, tu reparto.",
              "Un programa por niveles A · AA · AAA que se gana con desempeño, no con membrete.",
              "El registro protege a tu gente: la cartera de tu equipo es de tu equipo, hoy y siempre.",
            ],
            en: [
              "Exclusive inventory, unburned, at the point in the cycle where it pays most — for your team.",
              "Your house keeps what is yours: your brand, your team, your book, your split.",
              "A tiered programme — A · AA · AAA — earned by performance, not by letterhead.",
              "The register protects your people: your team's book belongs to your team, today and always.",
            ],
          },
          close: { es: "Coordinamos, no competimos. La paridad es innegociable.", en: "We coordinate, we don't compete. Parity is non-negotiable." },
        },
      ],
      cta: { es: "Solicitar acceso", en: "Request access" },
    },
    inversionistas: {
      label: { es: "El Círculo · Para compradores e inversionistas", en: "The Circle · For buyers & investors" },
      title: { es: "El acceso es el verdadero lujo.", en: "Access is the real luxury." },
      paras: {
        es: [
          "Todo proyecto extraordinario tiene un tramo que no se anuncia. Ese es el tramo que cura la casa.",
          "Lo que llega a ti ya cargó con la pregunta difícil —El Dictamen: el terreno, los permisos, los números, la letra chica. Tú recibes lo que quedó del lado correcto del filtro.",
          "Y detrás, una obra construida y no una promesa: Grubsa lleva más de cuatro décadas construyendo y entregando, y Ruella es parte del mismo grupo.",
          "Como en una casa de relojes, las preguntas correctas te encaminan a la pieza que te corresponde. Nunca un carrito, siempre una conversación —a tu ritmo, por escrito y sujeto a disponibilidad.",
          "El inmueble es la ocasión; el círculo es el patrimonio.",
        ],
        en: [
          "Every exceptional project has a stage that is never advertised. That is the stage the house curates.",
          "What reaches you already carried the difficult question — The Assessment: the land, the permits, the numbers, the fine print. You receive what stayed on the right side of the filter.",
          "And behind it, a body of work rather than a promise: Grubsa has been building and delivering for more than four decades, and Ruella is part of the same group.",
          "As in a watch house, the right questions lead you to the piece that belongs to you. Never a cart, always a conversation — at your pace, in writing, subject to availability.",
          "The property is the occasion; the circle is what you keep.",
        ],
      },
      cta: { es: "Solicitar acceso", en: "Request access" },
    },
    desarrolladores: {
      label: { es: "El Círculo · Para desarrolladores", en: "The Circle · For developers" },
      title: { es: "Absorción temprana. Tu precio público, intacto.", en: "Early absorption. Your public pricing, untouched." },
      paras: {
        es: [
          "Las primeras etapas piden lo más difícil: vender con convicción antes de que el mercado la tenga.",
          "Ruella coordina ese tramo. Ponemos el sistema, el estándar y las buenas prácticas —y convocamos a los asesores y a los inversionistas que lo hacen suceder. No competimos con quien vende; coordinamos para que venda mejor.",
          "Una regla por encima de todas: paridad. El precio y las condiciones del comprador son idénticos en todos los caminos, siempre. Tu precio público se queda donde tú lo pusiste.",
          "Nada lleva el nombre de Ruella sin pasar El Dictamen, y todo se reporta con disciplina —porque lo confirmamos en la fuente, no de segunda mano.",
          "Trabajamos con pocos proyectos a la vez, elegidos con criterio. Si el tuyo tiene el calibre, hablemos.",
        ],
        en: [
          "The earliest stage asks the hardest thing of a developer: selling with conviction before the market has any.",
          "Ruella coordinates that stage. We set the system, the standard and the practices — and we bring in the brokers and investors who make it happen. We don't compete with whoever sells; we coordinate so they sell better.",
          "One rule above the rest: parity. The buyer's price and terms are identical through every route, always. Your public price stays where you put it.",
          "Nothing carries the Ruella name without passing The Assessment, and everything is reported with discipline — because we confirm at the source, not second-hand.",
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
      es: "Ruella no promete rendimientos. Todo sujeto a disponibilidad. Nada de este material constituye asesoría legal o fiscal.",
      en: "Ruella does not promise returns. Subject to availability. Nothing here constitutes legal or tax advice.",
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

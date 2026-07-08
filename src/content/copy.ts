// Ruella · content/copy.ts — AMPLIADO para la fase Presencia v3
// Reemplaza el copy.ts actual. Conserva intactos los textos ya curados de la v1
// y añade: teléfono + consentimiento en el gate, rutas por perfil, banner de
// consentimiento y aviso de privacidad. Bilingüe nativo — se escribe, no se traduce.
export type Lang = "es" | "en";
export const copy = {
  descriptor: { es: "Quietly first.", en: "Quietly first." },
  nav: { casa:{es:"La Casa",en:"The House"}, circulo:{es:"El Círculo",en:"The Circle"}, opening:{es:"El Opening",en:"The Opening"}, acceso:{es:"Acceso",en:"Access"}, cta:{es:"Solicitar acceso",en:"Request access"} },
  hero: {
    eyebrow:{es:"Ruella · Quietly first.",en:"Ruella · Quietly first."},
    title:{es:"Lo extraordinario, antes de que el mundo lo vea.",en:"The extraordinary, before the world sees it."},
    sub:{es:"Una casa de curaduría. Un círculo cerrado. Acceso por invitación.",en:"A house of curation. A closed circle. Access by invitation."},
    cta:{es:"Solicitar acceso",en:"Request access"},
  },
  casa: {
    label:{es:"La Casa",en:"The House"},
    title:{es:"No vendemos inmuebles. Reunimos gente.",en:"We don't sell property. We bring people together."},
    body1:{es:"Curamos las etapas tempranas de proyectos de lujo y abrimos el acceso a un círculo elegido con cuidado. Examinamos lo que casi nadie examina; lo que no pasa, no llega a tu mesa.",en:"We curate the early stages of exceptional projects and open them to a circle chosen with care. We examine what almost no one examines; what doesn't pass never reaches your table."},
    body2:{es:"No prometemos rendimientos. Prometemos verdad en lo que ponemos frente a ti, y un lugar entre quienes hacen las cosas a conciencia.",en:"We don't promise returns. We promise truth in what we place before you, and a seat among those who do things with conscience."},
  },
  circulo: {
    label:{es:"El Círculo",en:"The Circle"},
    title:{es:"Se entra por una oportunidad. Se queda por la compañía.",en:"You come for an opportunity. You stay for the company."},
    items:[
      { n:"01", href:"/inversionistas", title:{es:"Inversionistas",en:"Investors"}, body:{es:"Producto curado, con dictamen. Precio de convicción, antes del mercado.",en:"Curated, vetted opportunities. Conviction pricing, ahead of the market."} },
      { n:"02", href:"/brokers", title:{es:"Brokers",en:"Brokers"}, body:{es:"Inventario que no está afuera. Comisión completa, sin split.",en:"Inventory no one else has. Your full commission, never split."} },
      { n:"03", href:"/desarrolladores", title:{es:"Desarrolladores",en:"Developers"}, body:{es:"Absorción temprana sin quemar tu precio público. Un sello que el mercado respeta.",en:"Early absorption without burning your public price. A seal the market respects."} },
    ],
    more:{es:"Conocer más",en:"Learn more"},
  },
  opening: { label:{es:"Opening No. 001",en:"Opening No. 001"}, place:{es:"The Cliff Club · Los Cabos",en:"The Cliff Club · Los Cabos"}, body:{es:"Un nuevo proyecto llega a Ruella. Tu invitación está por llegar, a tu nombre.",en:"A new project is coming to Ruella. Your invitation is on its way — addressed to you."}, cta:{es:"Solicitar acceso",en:"Request access"} },
  acceso: {
    label:{es:"Acceso",en:"Access"},
    title:{es:"Esta puerta no aparece en buscadores.",en:"This door doesn't appear in search engines."},
    body:{es:"El acceso a Ruella es por invitación. Si crees que es tu lugar, escríbenos: te responde un humano de la casa.",en:"Access to Ruella is by invitation. If you believe this is your place, write to us — a member of the house will reply."},
    form:{
      name:{es:"Nombre",en:"Name"},
      email:{es:"Correo",en:"Email"},
      phone:{es:"Teléfono · opcional",en:"Phone · optional"},
      role:{es:"Soy…",en:"I am…"},
      roles:{ investor:{es:"Inversionista",en:"Investor"}, broker:{es:"Broker",en:"Broker"}, developer:{es:"Desarrollador",en:"Developer"} },
      message:{es:"Mensaje",en:"Message"},
      consent:{es:"Leí el aviso de privacidad y acepto que la casa use estos datos para responderme.",en:"I've read the privacy notice and agree that the house may use these details to reply to me."},
      privacyLink:{es:"Aviso de privacidad",en:"Privacy notice"},
      submit:{es:"Solicitar acceso",en:"Request access"},
      success:{es:"Recibido. Te responde un humano de la casa.",en:"Received. A member of the house will be in touch."},
      retry:{es:"Intenta de nuevo",en:"Please try again"},
    },
  },
  perfiles: {
    brokers: {
      label:{es:"El Círculo · Brokers",en:"The Circle · Brokers"},
      title:{es:"Tu comisión, completa. Tu cliente, a tu nombre.",en:"Your commission, in full. Your client, in your name."},
      paras:{
        es:[
          "Los mejores asesores pasan su carrera peleando por el mismo inventario que tienen todos. Ruella trabaja al revés.",
          "No somos una agencia y no competimos contigo. Curamos las etapas tempranas de proyectos de lujo y las abrimos a un círculo cerrado. Tú traes la relación; nosotros ponemos lo que nadie más tiene, y las reglas que te cuidan.",
          "No somos un master broker. Tu comisión no se reparte: es tuya, completa. El inventario que abrimos para ti no está afuera. Y tu cliente queda registrado a tu nombre: la casa respeta tu relación, siempre.",
          "Se entra por invitación. Si tu oficio es el lujo y lo tratas como oficio, hay una silla que podría ser tuya.",
        ],
        en:[
          "The best brokers spend their careers fighting over the same inventory everyone else has. Ruella works the other way around.",
          "We are not an agency, and we don't compete with you. We curate the early stages of luxury projects and open them to a closed circle. You bring the relationship; we bring what no one else has, and the rules that protect you.",
          "We are not a master broker. Your commission isn't split — it's yours, in full. The inventory we open to you isn't available anywhere else. And your client is registered in your name: the house honors your relationship, always.",
          "Entry is by invitation. If luxury is your craft, and you treat it as one, there may be a seat for you.",
        ],
      },
      cta:{es:"Solicitar acceso",en:"Request access"},
    },
    inversionistas: {
      label:{es:"El Círculo · Inversionistas",en:"The Circle · Investors"},
      title:{es:"Valor donde el mercado todavía no sabe mirar.",en:"Value where the market hasn't yet learned to look."},
      paras:{
        es:[
          "Todo proyecto extraordinario tiene un momento anterior al mercado: el tramo donde el precio todavía premia a quien sabe leer valor temprano. Ruella cura ese momento y lo abre, con calma, a un círculo de coleccionistas.",
          "Aquí no compras un folleto: compras un proyecto que pasó el examen de la casa. La mayoría no pasa; eso es exactamente lo que compra el que sí.",
          "Nunca un carrito, siempre una conversación. Un humano de la casa te acompaña de principio a fin, a tu ritmo, con condiciones por escrito y sujeto a disponibilidad.",
          "Si coleccionas valor donde otros todavía no saben mirar, hay una conversación que vale la pena tener.",
        ],
        en:[
          "Every extraordinary project has a moment before the market: the stretch where price still rewards those who can read value early. Ruella curates that moment and opens it, calmly, to a circle of collectors.",
          "You're never buying a brochure here — you're buying a project that passed the house's examination. Most don't; that is precisely what the ones that do are worth.",
          "Never a cart, always a conversation. A member of the house walks with you from beginning to end, at your pace, with terms in writing and subject to availability.",
          "If you collect value where others haven't yet learned to look, there's a conversation worth having.",
        ],
      },
      cta:{es:"Solicitar acceso",en:"Request access"},
    },
    desarrolladores: {
      label:{es:"El Círculo · Desarrolladores",en:"The Circle · Developers"},
      title:{es:"Absorción temprana. Tu precio público, intacto.",en:"Early absorption. Your public price, untouched."},
      paras:{
        es:[
          "Las etapas tempranas piden lo más difícil: vender con convicción antes de que el mercado la tenga. Ruella existe para ese tramo.",
          "Colocamos tus primeras etapas dentro de un círculo curado — inversionistas y asesores bajo reglas claras — sin publicidad, sin ruido, y con tu lista pública protegida.",
          "Lo que Ruella firma pasó un dictamen, y se reporta con disciplina. Ese sello cuida tu proyecto tanto como al comprador.",
          "Trabajamos con pocos proyectos a la vez, elegidos con criterio. Si el tuyo tiene el calibre, hablemos.",
        ],
        en:[
          "Early stages ask for the hardest thing: selling with conviction before the market has any. Ruella exists for that stretch.",
          "We place your first stages inside a curated circle — investors and brokers under clear rules — with no advertising, no noise, and your public list protected.",
          "Whatever Ruella signs has passed an examination, and is reported with discipline. That seal protects your project as much as it protects the buyer.",
          "We work with a few projects at a time, chosen with judgment. If yours has the caliber, let's talk.",
        ],
      },
      cta:{es:"Solicitar acceso",en:"Request access"},
    },
  },
  cookies: {
    body:{es:"La casa usa analítica para entender cómo se lee este sitio — solo con tu permiso, y con tus datos enmascarados.",en:"The house uses analytics to understand how this site is read — only with your permission, and with your details masked."},
    accept:{es:"Permitir",en:"Allow"},
    decline:{es:"Ahora no",en:"Not now"},
    link:{es:"Aviso de privacidad",en:"Privacy notice"},
  },
  privacidad: {
    label:{es:"La Casa",en:"The House"},
    title:{es:"Aviso de privacidad",en:"Privacy notice"},
    intro:{es:"La discreción es parte de cómo trabaja esta casa. Capturamos lo mínimo, lo usamos solo para responderte, y no lo compartimos con nadie de más.",en:"Discretion is part of how this house works. We collect the minimum, use it only to reply to you, and share it with no one beyond those who help us do so."},
    updated:{es:"Última actualización: julio 2026",en:"Last updated: July 2026"},
    sections:[
      {
        h:{es:"Quién trata tus datos",en:"Who handles your details"},
        body:{es:"Ruella es responsable del tratamiento de los datos personales que nos compartes a través de este sitio. Para cualquier tema de privacidad, escríbenos a privacidad@ruella.mx.",en:"Ruella is responsible for the personal details you share with us through this site. For any privacy matter, write to privacidad@ruella.mx."},
      },
      {
        h:{es:"Qué capturamos",en:"What we collect"},
        body:{es:"Solo lo que nos das en el formulario de acceso: tu nombre, tu correo, tu teléfono si decides compartirlo, tu perfil (inversionista, broker o desarrollador), tu mensaje y el idioma en que nos escribes. Nada más.",en:"Only what you give us in the access form: your name, your email, your phone if you choose to share it, your profile (investor, broker, or developer), your message, and the language you write to us in. Nothing more."},
      },
      {
        h:{es:"Para qué lo usamos",en:"What we use it for"},
        body:{es:"Para atender tu solicitud de acceso, ponernos en contacto contigo y llevar el registro de admisiones de la casa. No usamos tus datos para publicidad y no los vendemos.",en:"To handle your request for access, to get in touch with you, and to keep the house's admissions record. We don't use your details for advertising, and we never sell them."},
      },
      {
        h:{es:"Dónde viven",en:"Where they live"},
        body:{es:"Tus datos pasan por proveedores que procesan por cuenta de la casa: Vercel (alojamiento del sitio), Resend (correo) y Google (registro de admisiones). Si nos das tu permiso, Microsoft Clarity nos ayuda a entender cómo se lee el sitio — con lo que escribes siempre enmascarado. Ningún tercero de más.",en:"Your details pass through providers that process them on the house's behalf: Vercel (site hosting), Resend (email), and Google (admissions record). If you give us your permission, Microsoft Clarity helps us understand how the site is read — with anything you type always masked. No third party beyond these."},
      },
      {
        h:{es:"Analítica, con tu permiso",en:"Analytics, with your permission"},
        body:{es:"La analítica de este sitio permanece apagada hasta que tú la permitas, y puedes retirar tu permiso cuando quieras borrando los datos de este sitio en tu navegador. Las métricas de tráfico del alojamiento no usan cookies ni te identifican.",en:"This site's analytics stay off until you allow them, and you can withdraw your permission at any time by clearing this site's data in your browser. The hosting's traffic metrics use no cookies and never identify you."},
      },
      {
        h:{es:"Tus derechos",en:"Your rights"},
        body:{es:"Puedes pedirnos acceso, rectificación, cancelación u oposición sobre tus datos (derechos ARCO, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares) escribiendo a privacidad@ruella.mx. Te respondemos en los plazos que marca la ley.",en:"You may ask us to access, correct, delete, or stop using your details (ARCO rights, under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties) by writing to privacidad@ruella.mx. We reply within the timeframes the law sets."},
      },
      {
        h:{es:"Cambios a este aviso",en:"Changes to this notice"},
        body:{es:"Si este aviso cambia, la versión vigente vivirá siempre en esta página, con su fecha de actualización.",en:"If this notice changes, the current version will always live on this page, with its update date."},
      },
    ],
  },
  footer: {
    disclaimer:{es:"Las proyecciones no constituyen garantía de rendimiento. Todo sujeto a disponibilidad.",en:"Projections are not a guarantee of returns. Subject to availability."},
    privacy:{es:"Aviso de privacidad",en:"Privacy notice"},
  },
} as const;

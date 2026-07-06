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
      { n:"01", title:{es:"Inversionistas",en:"Investors"}, body:{es:"Producto curado, con dictamen. Precio de convicción, antes del mercado.",en:"Curated, vetted opportunities. Conviction pricing, ahead of the market."} },
      { n:"02", title:{es:"Brokers",en:"Brokers"}, body:{es:"Inventario que no está afuera. Comisión completa, sin split.",en:"Inventory no one else has. Your full commission, never split."} },
      { n:"03", title:{es:"Desarrolladores",en:"Developers"}, body:{es:"Absorción temprana sin quemar tu precio público. Un sello que el mercado respeta.",en:"Early absorption without burning your public price. A seal the market respects."} },
    ],
  },
  opening: { label:{es:"Opening No. 001",en:"Opening No. 001"}, place:{es:"The Cliff Club · Los Cabos",en:"The Cliff Club · Los Cabos"}, body:{es:"Un nuevo proyecto llega a Ruella. Tu invitación está por llegar, a tu nombre.",en:"A new project is coming to Ruella. Your invitation is on its way — addressed to you."}, cta:{es:"Solicitar acceso",en:"Request access"} },
  acceso: {
    label:{es:"Acceso",en:"Access"},
    title:{es:"Esta puerta no aparece en buscadores.",en:"This door doesn't appear in search engines."},
    body:{es:"El acceso a Ruella es por invitación. Si crees que es tu lugar, escríbenos: te responde un humano de la casa.",en:"Access to Ruella is by invitation. If you believe this is your place, write to us — a member of the house will reply."},
    form:{ name:{es:"Nombre",en:"Name"}, email:{es:"Correo",en:"Email"}, role:{es:"Soy…",en:"I am…"}, roles:{ investor:{es:"Inversionista",en:"Investor"}, broker:{es:"Broker",en:"Broker"}, developer:{es:"Desarrollador",en:"Developer"} }, message:{es:"Mensaje",en:"Message"}, submit:{es:"Solicitar acceso",en:"Request access"}, success:{es:"Recibido. Te responde un humano de la casa.",en:"Received. A member of the house will be in touch."} },
  },
  footer: { disclaimer:{es:"Las proyecciones no constituyen garantía de rendimiento. Todo sujeto a disponibilidad.",en:"Projections are not a guarantee of returns. Subject to availability."} },
} as const;

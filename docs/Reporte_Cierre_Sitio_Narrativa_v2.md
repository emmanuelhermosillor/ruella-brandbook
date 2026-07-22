# Reporte de cierre · Sitio ruella.mx — Narrativa v2 + Hero Video Loop
**Ciclo cerrado el 22 jul 2026** · repo `emmanuelhermosillor/ruella` · rama `narrativa-v2` → `main`
Para: `08 · Ruella/04. Web y Producto/` · verificación: Torre de Control

---

## 1 · Estado final

| | |
|---|---|
| **Producción** | https://ruella.mx — viva, `main` en `11f135a` |
| Lighthouse (desktop) | perf **100** · SEO **100** · a11y 96 |
| LCP / CLS | 0.5–0.6 s · **0** |
| Gate → Sheet de Admisiones | **verificado E2E en prod** (ver §6) |
| Idioma | EN por defecto, ES completo tras el switch |
| Movimiento | activo, validado en iPhone real |

---

## 2 · Qué cambió, por frente

### Frente A · Narrativa v2 + EN-first + multi-persona
- **Idioma**: inglés por defecto (`useLang` arranca en `en`, `<html lang="en">`), español íntegro tras el switch EN | ES, elección persistente y `?lang=es` enlazable. Metadata y OG en inglés con `es_MX` alterno y hreflang `en`/`es`/`x-default`. Títulos y descripciones de las tres puertas en inglés.
- **El Respaldo** (sección nueva): de Grubsa nace todo (40+ años) · BAS Holding es el grupo · Ruella es parte de él. La tríada —quien construye, quien desarrolla, quien coordina— como forma memorable del organigrama. La sociedad interna nunca se menciona.
- **El Rol** (sección nueva): la mesa donde se encuentran desarrollador, inversionista y asesor. Deslinde en positivo: se retiraron "no somos una agencia", "no competimos contigo", "no somos un master broker".
- **La Curaduría** (sección nueva): El Dictamen, la pregunta difícil, el lado correcto del filtro y la casa de relojes — la bisagra que justifica tres puertas.
- **Las tres puertas** nombran al perfil: For buyers & investors · For agents & brokerages · For developers. `/brokers` se abre en dos caminos: El Círculo (asesor) y Las Alianzas (agencia), con A · AA · AAA nombrados y jamás explicados.
- **La Apertura No. 001**: acantilado frente al Pacífico, dictamen sellado como el hito más exigente, licencias "past the halfway mark" — la forma del brochure, sin poner una cifra en la vitrina. Sujeto a disponibilidad.
- **El Camino**: el gate se reencuadró ("Empezar es una conversación, no un formulario", con el "a veces decimos que no —con la puerta abierta"). **Su lógica no se tocó.**
- **Footer**: disclaimer del brochure. **Durand-Ruel**: de sección completa a una línea en La Casa.

### Frente B · Hero Video Loop
- Loop ambiental de **21.4 s**, nueve láminas, en lugar de la foto: mar · siluetas · hierba y agua · punta rocosa · pies en la espuma · luz entre hojas · hombros frente al mar · orilla · mar.
- Curaduría sobre 41 clips: descartado todo lo urbano en B/N (14 clips), el material de bar (11), los salares (no anclan en Cabos) y las tomas donde la gente domina el cuadro. El lifestyle entra solo de espaldas, a contraluz y a distancia.
- Grading unificado por clip (saturación 0.74–0.82, calidez leve, negros levantados al crema de la casa).
- Pesos: desktop mp4 3.31 MB / webm 3.25 MB (1280×720) · móvil mp4 1.49 MB / webm 1.81 MB (960×540) · poster 80 KB.
- Costura del loop medida en 1.99 contra 2.07–4.92 de movimiento normal del propio material: imperceptible.

### Ritmo de espacios
Padding de sección era 130/130 → **260 px entre bloques**, con secciones de ~640 px.
Escala nueva derivada de ese valor: **56/84** estándar y **68/104** ceremonial (La Casa, El Respaldo); móvil más apretado que desktop. Entre secciones: **168 px**.

### Movimiento Galería
Fundido + recorrido (12 px desktop / 18 px móvil), 560/650 ms, `cubic-bezier(0.22, 1, 0.36, 1)`, una sola vez, escalonado de 70 ms entre hermanos y `scale(1.015 → 1)` en imágenes. Solo `opacity` y `transform`. Interruptor único: `MOTION` en `Reveal.tsx`.

---

## 3 · Causas raíz del ciclo (las tres)

### 3.1 · El video no se veía en móvil
**No era el codec** (H.264 High, yuv420p, level 3.1 — correcto), **ni los headers** (`video/mp4`, Range 206), **ni `canplay`**, **ni `requestIdleCallback`** (no se usa en el repo).
**Causa: el componente no se montaba debajo de 768 px.** Fue mi decisión del ciclo del hero —"poster en móvil por datos y batería"—, documentada y aprobada dentro de un reporte, que se convirtió en un bug de percepción: nadie esperaba un hero distinto en el teléfono.
**Fix**: corre en todos los tamaños (solo `prefers-reduced-motion` lo apaga), con copia ligera para celular. Y la revelación dejó de colgar de un solo evento: `play()` + `playing` + `loadeddata` + plazo de respaldo, con reintento al volver a la pestaña y al primer toque.

### 3.2 · El revelado dejaba bloques en blanco en iOS (bloqueante)
**Causa: CSS estático que ocultaba.** `html.reveal-on .reveal { opacity: 0 }`, con un script inline que ponía `.reveal-on` **antes** de la hidratación. Desde ese instante el contenido dependía de que React hidratara para volver a existir; en iOS Safari, con hidratación lenta o parcial, no volvía. Mi "visible por defecto" cubría el caso *sin JS*, no el de *JS a medias*.
Efecto colateral: las etiquetas FIG. quedaban semitransparentes, porque `mix-blend-difference` dentro de un padre con opacidad intermedia rompe el blend.
**Fix**: ninguna regla de CSS oculta nada. Solo el efecto puede ocultar, en el instante de animar y únicamente si el bloque está bien por debajo del pliegue.

### 3.3 · El movimiento no se percibía (doble fallo)
1. **Plazo global al cargar**: el respaldo de seguridad revelaba todo a los pocos segundos del load, así que cuando el usuario llegaba scrolleando ya no quedaba nada por entrar. Ahora el plazo se arma **por elemento y solo al asomar al viewport** (800 ms).
2. **Sistema inerte por hidratación**: al hidratar, las imágenes aún no han medido, la página es más corta y casi ningún bloque parece estar fuera de pantalla → **0 elementos preparados**. Ahora se re-arma tras `load`: 18 elementos preparados en un viewport de teléfono.

---

## 4 · Reglas nuevas de composición (aplican de aquí en adelante)

1. **La figura abre su sección**, no la cierra.
2. **Nunca dos figuras adyacentes entre fronteras de secciones** en el flujo móvil. Verificado: 759 px de texto entre la figura de La Apertura y la del Acceso.
3. **Pies de figura sin `mix-blend`**: crema sólido sobre un velo grafito muy suave (38 % que se desvanece). Estado final siempre a opacidad completa y legible sobre cualquier foto.
4. **Formato por dispositivo**: el 16/7 asfixia en teléfono; las figuras panorámicas pasan a 4/3 en móvil.
5. **Nada se oculta por CSS estático.** Si un efecto necesita ocultar, lo hace desde JS en el instante de animar, y con plazo de seguridad por elemento.

---

## 5 · Commits del ciclo

| Commit | Qué |
|---|---|
| `d85ca36` | Hero: loop ambiental sobre poster (primera versión, 12.8 s) |
| `dc75fd5` | Hero: loop más largo con lifestyle y textura (21.4 s) |
| `e76af4f` | Narrativa v2: EN-first, El Respaldo, las tres puertas |
| `b881a57` | Fix video en móvil + metadata EN de las páginas persona |
| `ac531dc` | Copy v2.1 (voz del brochure) + ritmo de espacios + movimiento |
| `3a33c50` | Fix bloqueante iOS: el CSS deja de ocultar · movimiento en pausa |
| `11f135a` | Movimiento perceptible + composición de figuras en móvil |

Previews del ciclo (Vercel, protegidos con autenticación): `ar73zjmzj`, `gelpabnvl` (el validado en iPhone).
Documentos de trabajo: `docs/COPY_v2_revision.md`, `docs/COPY_v2.1_revision.md`.

---

## 6 · Verificación en producción

- Contenido v2.1 servido en `https://ruella.mx` (comprobadas las seis frases ancla, incluido el disclaimer).
- Assets vivos: `hero-loop-v2.webm/mp4`, `hero-loop-mobile-v3.mp4`, `hero-poster-v2.jpg`.
- Metadata EN + hreflang `en`/`es`/`x-default`; títulos de las tres puertas en inglés.
- **Gate E2E en producción**: recorrido completo de los seis pasos → `POST /api/access` → 200 en 2.67 s → pantalla "Thank you. Check your inbox". Turnstile pasó.
  ⚠️ **Quedó un registro de prueba que hay que borrar del Sheet**: nombre `PRUEBA DEPLOY 22 JUL — BORRAR`, correo `prueba-deploy@ruella.mx`, perfil Broker.
- Movimiento y ausencia de bloques en blanco: **validados por Emmanuel en iPhone real**.

---

## 7 · Pendientes

1. Borrar el registro de prueba del Sheet de Admisiones (§6).
2. `docs/COPY_v2*.md` viven en el repo (público). Si estorban, se mueven a Drive y se borran de ahí.
3. Contraste de color en textos secundarios sobre fondo grafito (a11y 96, no 100): es del design system, quedó fuera de alcance.
4. Las tres rutas conservan slug en español (`/brokers`, `/inversionistas`, `/desarrolladores`) por decisión de no romper enlaces en circulación.
5. `Arquitectura_Narrativa_v2.md` (Drive) nunca se pudo leer desde aquí: el conector de Drive pide autorización. El copy salió del brochure y del brief.

---

## 8 · Autocrítica

- **Metí dos bugs de mi propia mano en el mismo ciclo, y los dos por el mismo vicio**: optimizar por elegancia técnica antes de garantizar el caso peor. El gate de 768 px y el CSS que ocultaba eran decisiones "limpias" que fallaban justo donde más importaba — el teléfono de la persona que iba a presentarlo.
- **El segundo llegó a un preview que Emmanuel abrió**. Debí haber asumido antes que no podía verificar movimiento con mis herramientas (el panel corre con la pestaña oculta; Chrome headless no pinta) y haber pedido validación en dispositivo desde el primer intento, en vez de reportar "verificado" apoyado en pruebas indirectas.
- **La primera curaduría del video fue optimista**: juzgué clips en miniatura y dos con manos en primer plano llegaron a un render que hubo que rehacer. La lección quedó escrita: un clip se juzga a tamaño hero.
- **Un commit se me fue a `main` por descuido** (no se pusheó; se movió a la rama y `main` volvió a su sitio). Trabajar con dos ramas vivas pide revisar en qué rama estoy antes de cada commit.
- **Lo que sí sostengo**: cuando el movimiento no quedó verificable a tiempo, lo apagué con un flag en vez de apostar. Un sitio quieto y completo gana a uno animado y roto — y esa decisión estuvo lista antes de que hiciera falta tomarla.

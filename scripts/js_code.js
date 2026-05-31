// ── CONSTANTS ──
  const CONTACT_EMAIL = 'jcarloscsva@gmail.com';

// ── CLIENT LOGOS ──
  const BASE = 'https://jcastillo.es/images/';

  const logosEN = [
    { file: 'pepsico.png',        alt: 'PepsiCo' },
    { file: 'bancosantander.png', alt: 'Banco Santander' },
    { file: 'metlife.png',        alt: 'MetLife' },
    { file: 'repsol.png',         alt: 'Repsol' },
    { file: 'orange.png',         alt: 'Orange' },
    { file: 'realmadrid.png',     alt: 'Real Madrid' },
    { file: 'arsenal.png',        alt: 'Arsenal FC' },
    { file: 'leroymerlin.png',    alt: 'Leroy Merlin' },
    { file: 'avivaireland.png',   alt: 'Aviva Ireland' },
    { file: 'riuHotels.svg',      alt: 'Riu Hotels' },
    { file: 'idealista.png',      alt: 'Idealista' },
    { file: 'smartbox.png',       alt: 'Smartbox' },
    { file: 'tradeinn.png',       alt: 'Trade Inn' },
    { file: 'tigerbrands.png',    alt: 'Tiger Brands' },
    { file: 'scalpers.png',       alt: 'Scalpers' },
    { file: 'unidadeditorial.svg',alt: 'Unidad Editorial' },
  ];

  const logosES = [
    { file: 'bancosantander.png', alt: 'Banco Santander' },
    { file: 'realmadrid.png',     alt: 'Real Madrid' },
    { file: 'repsol.png',         alt: 'Repsol' },
    { file: 'orange.png',         alt: 'Orange' },
    { file: 'idealista.png',      alt: 'Idealista' },
    { file: 'leroyMerlin.png',    alt: 'Leroy Merlin' },
    { file: 'scalpers.png',       alt: 'Scalpers' },
    { file: 'unidadEditorial.svg',alt: 'Unidad Editorial' },
    { file: 'pepsiCo.png',        alt: 'PepsiCo' },
    { file: 'metlife.png',        alt: 'MetLife' },
    { file: 'arsenal.png',        alt: 'Arsenal FC' },
    { file: 'avivaireland.png',   alt: 'Aviva Ireland' },
    { file: 'riuhotels.svg',      alt: 'Riu Hotels' },
    { file: 'smartbox.png',       alt: 'Smartbox' },
    { file: 'tradeinn.png',       alt: 'Trade Inn' },
    { file: 'bigerbrands.png',    alt: 'Tiger Brands' },
  ];

  function renderLogos(lang) {
    const container = document.getElementById('client-logos-container');
    if (!container) return;
    const list = lang === 'es' ? logosES : logosEN;
    container.innerHTML = list.map(l =>
      `<div class="client-logo-item"><img src="${BASE}${l.file}" alt="${l.alt}"></div>`
    ).join('');
  }

  // ── SCROLL REVEAL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function initObservers() {
    document.querySelectorAll('.metric-item').forEach((el, i) => {
      el.dataset.delay = i * 100;
      observer.observe(el);
    });

    document.querySelectorAll('.tl-item').forEach((el, i) => {
      el.dataset.delay = i * 80;
      observer.observe(el);
    });

    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) countObserver.observe(metricsSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObservers);
  } else {
    initObservers();
  }

  // ── NUMBER COUNT-UP ──
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = entry.target.querySelectorAll('.metric-number');
        numbers.forEach(el => {
          // Skip elements marked as non-numeric (e.g. "Tier-1")
          if (el.closest('[data-no-count]')) return;
          const text = el.textContent;
          const match = text.match(/(\d+)/);
          if (match) {
            const target = parseInt(match[1]);
            const suffix = el.innerHTML.replace(/\d+/, '');
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              el.innerHTML = current + suffix;
              if (current >= target) clearInterval(timer);
            }, 30);
          }
        });
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // ── FORM ──
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById('form-msg');
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    msg.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
    msg.style.color = 'var(--muted)';

    try {
      const response = await fetch('https://formspree.io/f/mrearelb', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        msg.textContent = currentLang === 'es' ? 'Mensaje enviado — gracias.' : 'Message sent — thank you.';
        msg.style.color = '#c9a84c';
        form.reset();
      } else {
        msg.textContent = currentLang === 'es'
          ? `Error al enviar. Escríbeme directamente a ${CONTACT_EMAIL}`
          : `Error sending. Please email ${CONTACT_EMAIL} directly.`;
        msg.style.color = '#e07070';
      }
    } catch(err) {
      msg.textContent = currentLang === 'es'
        ? `Error de red. Escríbeme a ${CONTACT_EMAIL}`
        : `Network error. Please email ${CONTACT_EMAIL} directly.`;
      msg.style.color = '#e07070';
    }

    btn.disabled = false;
    setTimeout(() => msg.textContent = '', 6000);
  }

  // ── NAV active state on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
  });

  // ── POOL DE RECOMENDACIONES ──
  const allRecommendations = [
      { id: 'jerome',    name: 'Jérôme Buniet',              job: 'Director, Technical Services' },
      { id: 'siba',      name: 'Siba Moyo',                  job: 'Senior Solution Architect · ESP Solutions' },
      { id: 'oscar',     name: 'Óscar de Diego González',    job: 'Senior Solution Architect · Zeta Global' },
      { id: 'joffrey',   name: 'Joffrey Guichard',           job: 'Engagement Manager · Marigold' },
      { id: 'javier',    name: 'Javier González',            job: 'Marketing Cloud Senior Consultant & PM' },
      { id: 'francisco', name: 'Francisco Javier Guerrero',  job: 'Director fundador · Grupo Mimesa' },
      { id: 'maria',     name: 'María Rico',                 job: 'Head of Product and Clients · MDirector' },
      { id: 'sarah',     name: 'Sarah Higgins',              job: 'Senior Director of Customer Success' },
      { id: 'juanb',     name: 'Juan B. Martínez Guillén',   job: 'Sr. Marketing Automation Campaign Manager' },
      { id: 'sylvain',   name: 'Sylvain Thoméré',            job: 'Solutions Consultant · Zeta Global' },
      { id: 'miguel',    name: 'Miguel Poyatos',             job: 'VP Client Success Europe · Zeta Global' },
      { id: 'julienl',   name: 'Julien Lengagne',            job: 'EMEA Solution Architect' },
      { id: 'william',   name: 'William Doublet',            job: 'Lead Solutions Architect' },
      { id: 'jack',      name: 'Jack Ruane',                 job: 'Customer Success Director · ZETA Global' },
      { id: 'julienb',   name: 'Julien Bestagne',            job: 'Project Manager · Marigold' },
      { id: 'ramon',     name: 'Ramón García',               job: 'Senior Project Manager · Straumann' },
      { id: 'dennis',    name: 'Dennis Giordano',            job: 'Regional Director (EMEA) · IT Support Operations' },
      { id: 'julio',     name: 'Julio Sanz Velasco',         job: 'Client Success Director · Zeta Global' }
  ];

  // ── LANGUAGE SYSTEM ──
  const translations = {
    en: {
      // Nav
      'nav-profile': 'Profile',
      'nav-expertise': 'Expertise',
      'nav-career': 'Career',
      'nav-contact': 'Contact',
      'nav-cv': 'View CV →',
      // Hero
      'hero-eyebrow': 'Enterprise SaaS Project & Engagement Manager · EMEA · 15+ Years',
      'hero-subtitle': 'I\'ve spent over 15 years managing enterprise SaaS implementations across EMEA for organisations including <strong>PepsiCo, Real Madrid, Banco Santander, Arsenal FC and MetLife</strong>.<br><br>My work is about making complex projects actually succeed: coordinating teams across functions and geographies, bringing clarity when things get uncertain, and staying with the client until real value is demonstrated — not just until go-live.',
      'scroll-hint': 'Metrics',
      'cta-contact': 'Get in Touch',
      'cta-cv': 'View Full CV',
      'cta-download': 'Download CV',
      // Metrics
      'metric-1-label': 'Years delivering<br>enterprise SaaS',
      'metric-2-label': 'Faster delivery<br><em>avg. across EMEA programmes</em>',
      'metric-3-label': 'Client satisfaction<br><em>increase vs. baseline</em>',
      'metric-4-label': 'PepsiCo · Arsenal FC<br>Hiscox · Kraft Heinz',
      'metric-5-label': 'SaaS implementations delivered<br><em>96% success rate</em>',
      'metric-6-label': 'Reduction in delivery<br>overhead across programmes',
      'metric-7-label': 'RFPs shaped &amp; won<br>for enterprise prospects',
      'metric-8-label': 'Departments coordinated<br>across 7 stakeholder layers',
      // About
      'section-tag-about': 'Profile',
      'about-heading': 'A PM who<br>rolls up<br><em>his sleeves</em>',
      'about-text-1': 'I don\'t just manage projects — I <strong>build the infrastructure that makes great delivery possible</strong>. PMO governance, onboarding functions, reporting frameworks, escalation paths — I design them, implement them, and make sure they outlast my involvement.',
      'about-text-2': 'My background in computer science means I speak fluently with engineers, architects, and technical teams. I participate actively in technical decisions, not as an observer but as a contributor — giving my teams confidence and clarity when the complexity is highest. And when a critical moment demands it, I don\'t hesitate to step in and do the technical work myself to keep the programme on track.',
      'about-text-3': 'I\'ve been trusted with some of the most demanding enterprise SaaS programmes across EMEA — organisations where failure carries real consequences. That trust has been built over 15 years of consistent delivery, honest communication, and a refusal to accept that "it\'s complicated" is an answer.',
      'clients-label': 'Successful engagements',
      // Expertise
      'section-tag-expertise': 'What I bring',
      'expertise-heading': 'Six areas of<br>sustained impact',
      'card-1-title': 'Enterprise SaaS Delivery',
      'card-1-desc': 'I take end-to-end ownership of complex, multi-stakeholder implementations. From discovery through go-live stabilisation — always on time, always with full accountability.',
      'card-2-title': 'PMO Design & Governance',
      'card-2-desc': 'I built PMO frameworks at Marigold that were adopted globally. I design governance standards, risk models, KPI frameworks and reporting structures that create delivery consistency at scale.',
      'card-3-title': 'Programme Turnaround',
      'card-3-desc': 'I\'ve been brought in to rescue critical programmes. I diagnose root causes, reset client relationships and rebuild delivery trajectories — I cut cost overrun from 150% to 105% in one such engagement.',
      'card-4-title': 'Cross-Regional Leadership',
      'card-4-desc': 'I manage delivery across EMEA time zones, cultures and stakeholder layers. I\'m equally effective in C-suite presentations and technical deep-dives with engineering teams.',
      'card-5-title': 'Solution Architecture & Technical Leadership',
      'card-5-desc': 'With a computer science background and 3 years leading a team of Solution Architects, I bridge the gap between business requirements and technical execution. I can step into a Solution Architect role — translating complex client needs into platform design, validating technical approaches, and making architecture decisions with confidence. My teams deliver better because I understand what they\'re building.',
      'card-6-title': 'AI-Augmented Delivery',
      'card-6-desc': 'I don\'t just know AI is coming — I already work with it every day. I use AI to anticipate project risks before they surface, generate performance reports, and sharpen client communications. Beyond PM tooling, I build automations with n8n, develop custom chatbots, and am currently completing a formal AI course (CenteIA) covering concepts, trends, and workflow automation. I bring AI into the delivery process not as a talking point, but as a working practice.',
      'section-tag-career': 'Career',
      'career-heading': 'A progression built<br>on <em>results</em>',
      'tl-1-period': 'Jan 2022 – Feb 2026',
      'tl-1-role': 'Lead Project Manager, EMEA',
      'tl-1-desc': 'I led EMEA\'s highest-risk enterprise SaaS programmes while shaping the Global PMO through standardised governance. I managed concurrent programmes for PepsiCo, Arsenal FC, Hiscox, Aviva Ireland and Kraft Heinz.',
      'tl-2-period': 'Jul 2019 – Jan 2022',
      'tl-2-role': 'Senior Project Manager, EMEA',
      'tl-2-desc': 'Promoted to a regional delivery role, I led full lifecycle implementations across Africa, Southern Europe and UK — Tiger Brands, Riu Hotels, MetLife, Leroy Merlin — coordinating across technical, product and client teams.',
      'tl-3-period': 'Sep 2016 – Jul 2019',
      'tl-3-role': 'Senior Manager, Client Onboarding & Implementation',
      'tl-3-desc': 'I built the Spain onboarding function from zero. I defined workflows, KPIs and templates that became the operational backbone of the practice, reducing delivery time from 7 to 4 months.',
      'tl-4-period': 'Dec 2013 – Sep 2016',
      'tl-4-role': 'Technical Project Manager',
      'tl-4-desc': 'I delivered data integration and cross-channel marketing platform implementations for Inditex, Leroy Merlin, AON and Cortefiel. I reduced operational task time by 25% and automated reporting pipelines.',
      'tl-5-period': 'Aug 2011 – Dec 2013',
      'tl-5-role': 'Technical Account Executive',
      'tl-5-desc': 'I managed 50+ accounts across finance, retail and telco, supporting pre-sales for Vodafone, Banco Santander, Decathlon and Estée Lauder.',
      'section-tag-contact': 'Contact',
      'contact-heading': 'If you think we could<br>be a good fit,<br><em>reach out</em>',
      'contact-sub': 'Available for Senior PM, Head of Delivery, PMO Lead and Senior Solution Architect roles across EMEA.',
      'label-name': 'Your Name',
      'label-company': 'Company',
      'label-email': 'Email',
      'label-message': 'Message',
      'placeholder-name': 'Sarah Clarke',
      'placeholder-company': 'Acme Corp',
      'placeholder-email': 'sarah@acme.com',
      'placeholder-message': 'Tell me about the role or opportunity...',
      'btn-send': 'Send Message',
      'form-success': 'Message sent — thank you.',
      // Footer
      'footer-profile': 'Profile',
      'footer-expertise': 'Expertise',
      'footer-career': 'Career',
      'footer-cv': 'Full CV',
      'nav-recommendations': 'Recommendations',
      "rec-eyebrow": "LinkedIn",
      "rec-title": "What my <em>peers</em> say",
      "cta-linkedin": "View all on LinkedIn",
      "rec-jerome":    "\"He was highly appreciated by both clients and colleagues for being approachable, available, and always willing to go the extra mile to ensure satisfaction.\"",
      "rec-siba":      "\"He is also technically knowledgeable, which helps him understand project challenges and support teams in moving forward. He brings structure to complex situations and keeps delivery on track.\"",
      "rec-oscar":     "\"Su perfil destaca por una combinación muy valiosa de versatilidad, capacidad de adaptación y orientación a la coordinación de personas y objetivos, lo que le permite desenvolverse con soltura en distintos contextos, culturas y modelos de trabajo.\"",
      "rec-joffrey":   "\"Juan is a professional and an effective project/program manager — always available to help and always happy to take on new challenges.\"",
      "rec-javier":    "\"There are professionals who execute and those who transform; Juan Carlos undoubtedly belongs to the latter. He has an almost instinctive ability to read complex situations and turn them into improvement opportunities.\"",
      "rec-francisco": "\"His attitude, commitment and results-orientation make him a very valuable professional for any organisation.\"",
      "rec-maria":     "\"He always works with a good mood, is willing to help his colleagues and gives his best when challenges and the most demanding situations appear. He is a person you can fully trust.\"",
      "rec-sarah":     "\"What truly sets Juan Carlos apart is his rare combination of strong technical understanding and excellent project leadership — successfully delivering projects ahead of schedule, within budget, and to consistently outstanding feedback from stakeholders.\"",
      "rec-juanb":     "\"An experienced Project Manager with a brutal knowledge of the SaaS world and Marketing Automation — always achieving client satisfaction and contributing to a positive work environment.\"",
      "rec-sylvain":   "\"When you're managing complex projects and acting as the central point of contact, being able to cut through the noise and communicate clearly is critical. Juan Carlos does this extremely well.\"",
      "rec-miguel":    "\"Throughout 14 years, he has consistently demonstrated exceptional professionalism: highly effective, collaborative, and dedicated to the customer. I strongly recommend Juan Carlos — a true asset to any team or project.\"",
      "rec-julienl":   "\"Beyond his strong project management skills, Juan-Carlos is also highly involved in both functional and technical aspects — enabling him to effectively support and guide the teams responsible for implementation.\"",
      "rec-william":   "\"He is an exceptional communicator, equally effective with technical teams and senior stakeholders. He builds trust, manages risk proactively, all whilst protecting both project budgets and the delivery teams.\"",
      "rec-jack":      "\"Juan Carlos is hands down one of the best colleagues I have ever had. He possesses a rare combination of high energy and rigorous strategic thinking — an immense asset to any organization.\"",
      "rec-julienb":   "\"What truly distinguishes Juan Carlos is his sincere dedication to supporting and mentoring his colleagues. His professionalism, expertise, and interpersonal finesse are truly admirable.\"",
      "rec-ramon":   "\"I can say without hesitation that he is one of those rare professionals who consistently elevates every project, team, and conversation he is part of.\"",
      "rec-dennis":  "\"He has a way of staying calm, focused, and solution oriented, helping everyone move forward with clarity and confidence.\"",
      "rec-julio":   "\"Juan Carlos consistently demonstrates exceptional expertise in managing complex implementations for large-scale clients.\"",
      'scroll-hint': 'Key Metrics',
      'fast-contact-tip': "Let's talk",
      'contact-phone': 'Phone'
    },
    es: {
      'nav-profile': 'Perfil',
      'nav-expertise': 'Especialidad',
      'nav-career': 'Trayectoria',
      'nav-contact': 'Contacto',
      'nav-cv': 'Ver CV →',
      'hero-eyebrow': 'Enterprise SaaS Project & Engagement Manager · EMEA · +15 Años',
      'hero-subtitle': 'Llevo más de 15 años gestionando implementaciones SaaS enterprise en EMEA para organizaciones como <strong>PepsiCo, Real Madrid, Banco Santander, Arsenal FC y MetLife</strong>.<br><br>Mi trabajo consiste en que proyectos complejos realmente salgan adelante: coordinar equipos de distintas áreas y países, poner orden cuando hay incertidumbre y acompañar al cliente hasta demostrar valor real, no solo hasta el go live.',
      'scroll-hint': 'Métricas',
      'cta-contact': 'Contactar',
      'cta-cv': 'Ver CV Completo',
      'cta-download': 'Descargar CV',
      'metric-1-label': 'Años liderando<br>implementaciones SaaS',
      'metric-2-label': 'Entregas más rápidas<br><em>media en programas EMEA</em>',
      'metric-3-label': 'Aumento en<br><em>satisfacción del cliente</em>',
      'metric-4-label': 'PepsiCo · Arsenal FC<br>Hiscox · Kraft Heinz',
      'metric-5-label': 'Implementaciones SaaS entregadas<br><em>Tasa de éxito del 96%</em>',
      'metric-6-label': 'Reducción del overhead<br>en entrega de programas',
      'metric-7-label': 'RFPs gestionadas &amp; ganadas<br>para prospects enterprise',
      'metric-8-label': 'Departamentos coordinados<br>con 7 capas de stakeholders',
      'section-tag-about': 'Perfil',
      'about-heading': 'Un PM que<br>se remanga<br><em>cuando hace falta</em>',
      'about-text-1': 'No me limito a gestionar proyectos — <strong>construyo la infraestructura que hace posible una entrega excelente</strong>. Gobernanza PMO, funciones de onboarding, marcos de reporting, protocolos de escalado — los diseño, los implemento y me aseguro de que sigan funcionando cuando ya no estoy.',
      'about-text-2': 'Mi formación en informática me permite hablar con fluidez con ingenieros, arquitectos y equipos técnicos. Participo activamente en las decisiones técnicas del proyecto, no como observador sino como contribuidor — aportando confianza y claridad al equipo en los momentos de mayor complejidad. Y cuando un momento crítico lo requiere, no dudo en hacer yo mismo el trabajo técnico para asegurar la buena ejecución del programa.',
      'about-text-3': 'Me han confiado algunos de los programas SaaS enterprise más exigentes de EMEA — organizaciones donde el fracaso tiene consecuencias reales. Esa confianza se ha construido durante 15 años de entrega consistente, comunicación honesta y una negativa absoluta a aceptar que "es complicado" sea una respuesta.',
      'clients-label': 'Proyectos completados con éxito',
      'section-tag-expertise': 'Mi propuesta de valor',
      'expertise-heading': 'Seis áreas de<br>impacto sostenido',
      'card-1-title': 'Entrega SaaS Enterprise',
      'card-1-desc': 'Asumo la responsabilidad end-to-end de implementaciones complejas con múltiples stakeholders. Desde el discovery hasta la estabilización post go-live, siempre a tiempo, siempre con accountability.',
      'card-2-title': 'Diseño de PMO y Gobernanza',
      'card-2-desc': 'Construí marcos PMO en Marigold que fueron adoptados globalmente. Diseño estándares de gobernanza, modelos de riesgo, marcos de KPI y estructuras de reporting que crean consistencia en la entrega a escala.',
      'card-3-title': 'Rescate de Programas',
      'card-3-desc': 'Me han llamado para rescatar programas críticos. Diagnostico las causas raíz, restablezco las relaciones con los clientes y reconstruyo las trayectorias de entrega — en un caso reduje el sobrecoste del 150% al 105%.',
      'card-4-title': 'Liderazgo Multi-Regional',
      'card-4-desc': 'Gestiono entregas en múltiples zonas horarias, culturas y niveles de stakeholders en EMEA. Soy igual de efectivo en presentaciones al C-suite que en sesiones técnicas con equipos de ingeniería.',
      'card-5-title': 'Arquitectura de Solución y Liderazgo Técnico',
      'card-5-desc': 'Con formación en informática y 3 años liderando un equipo de Solution Architects, soy el puente entre los requisitos de negocio y la ejecución técnica. Puedo asumir un rol de Solution Architect — traduciendo las necesidades del cliente en diseño de plataforma, validando enfoques técnicos y tomando decisiones de arquitectura con criterio. Mis equipos entregan mejor porque entiendo lo que están construyendo.',
      'card-6-title': 'Entrega Potenciada por IA',
      'card-6-desc': 'No me limito a saber que la IA está llegando — ya la uso en mi día a día. La utilizo para anticipar riesgos del proyecto antes de que afloren, generar informes de rendimiento y optimizar las comunicaciones con el cliente. Más allá del uso en PM, construyo automatizaciones con n8n, desarrollo chatbots personalizados y estoy completando un curso formal de IA (CenteIA) sobre conceptos, tendencias y automatización de flujos de trabajo. Integro la IA en el proceso de entrega no como argumento de venta, sino como práctica real.',
      'section-tag-career': 'Trayectoria',
      'career-heading': 'Una progresión basada<br>en <em>resultados</em>',
      'tl-1-period': 'Ene 2022 – Feb 2026',
      'tl-1-role': 'Lead Project Manager, EMEA',
      'tl-1-desc': 'Lideré los programas SaaS enterprise de mayor riesgo en EMEA mientras daba forma al PMO Global mediante gobernanza estandarizada. Gestioné programas concurrentes para PepsiCo, Arsenal FC, Hiscox, Aviva Ireland y Kraft Heinz.',
      'tl-2-period': 'Jul 2019 – Ene 2022',
      'tl-2-role': 'Senior Project Manager, EMEA',
      'tl-2-desc': 'Promocionado a un rol de entrega regional, lideré implementaciones de ciclo completo en África, Europa del Sur y Reino Unido — Tiger Brands, Riu Hotels, MetLife, Leroy Merlin — coordinando equipos técnicos, de producto y de cliente.',
      'tl-3-period': 'Sep 2016 – Jul 2019',
      'tl-3-role': 'Senior Manager, Onboarding e Implementación de Clientes',
      'tl-3-desc': 'Construí la función de onboarding en España desde cero. Definí flujos de trabajo, KPIs y plantillas que se convirtieron en la columna vertebral operativa de la práctica, reduciendo el tiempo de entrega de 7 a 4 meses.',
      'tl-4-period': 'Dic 2013 – Sep 2016',
      'tl-4-role': 'Technical Project Manager',
      'tl-4-desc': 'Entregué implementaciones de integración de datos y plataformas de marketing multi-canal para Inditex, Leroy Merlin, AON y Cortefiel. Reduje el tiempo de ejecución operativa un 25% y automaticé los pipelines de reporting.',
      'tl-5-period': 'Ago 2011 – Dic 2013',
      'tl-5-role': 'Technical Account Executive',
      'tl-5-desc': 'Gestioné más de 50 cuentas en finanzas, retail y telco, apoyando la pre-venta para Vodafone, Banco Santander, Decathlon y Estée Lauder.',
      'section-tag-contact': 'Contacto',
      'contact-heading': 'Si crees que podemos<br>encajar,<br><em>escríbeme</em>',
      'contact-sub': 'Disponible para roles de PM Senior, Head of Delivery, PMO Lead y Senior Solution Architect en EMEA, tanto en formato permanente como en contrato.',
      'label-name': 'Tu nombre',
      'label-company': 'Empresa',
      'label-email': 'Email',
      'label-message': 'Mensaje',
      'placeholder-name': 'Sara García',
      'placeholder-company': 'Empresa S.A.',
      'placeholder-email': 'sara@empresa.com',
      'placeholder-message': 'Cuéntame sobre el rol u oportunidad...',
      'btn-send': 'Enviar mensaje',
      'form-success': 'Mensaje enviado — gracias.',
      'footer-profile': 'Perfil',
      'footer-expertise': 'Especialidad',
      'footer-career': 'Trayectoria',
      'footer-cv': 'CV Completo',
      'nav-recommendations': 'Recomendaciones',
      "rec-eyebrow": "LinkedIn",
      "rec-title": "Recomendaciones de <em>compañeros</em>",
      "cta-linkedin": "Ver todas en LinkedIn",
      "rec-jerome":    "\"Era muy apreciado tanto por clientes como por compañeros por su accesibilidad, disponibilidad y su disposición a hacer siempre ese esfuerzo extra para garantizar la satisfacción.\"",
      "rec-siba":      "\"Aporta estructura a situaciones complejas y mantiene la entrega en marcha. Su conocimiento técnico le ayuda a comprender los desafíos del proyecto y apoyar a los equipos.\"",
      "rec-oscar":     "\"Su perfil destaca por una combinación muy valiosa de versatilidad, capacidad de adaptación y orientación a la coordinación de personas y objetivos, lo que le permite desenvolverse con soltura en distintos contextos, culturas y modelos de trabajo.\"",
      "rec-joffrey":   "\"Juan es un profesional y un gestor de proyectos eficaz — siempre disponible para ayudar y siempre dispuesto a asumir nuevos retos.\"",
      "rec-javier":    "\"Hay profesionales que ejecutan y profesionales que transforman; Juan Carlos pertenece, sin duda, a los segundos. Posee una capacidad casi instintiva para leer situaciones complejas y convertirlas en oportunidades de mejora.\"",
      "rec-francisco": "\"Su actitud, compromiso y orientación a resultados lo convierten en un profesional muy valioso para cualquier organización.\"",
      "rec-maria":     "\"Trabaja siempre de buen humor, está dispuesto a ayudar a sus compañeros y da lo mejor de sí cuando aparecen los retos más exigentes. Es, sin duda, una persona en la que se puede confiar plenamente.\"",
      "rec-sarah":     "\"Lo que realmente distingue a Juan Carlos es su rara combinación de sólida comprensión técnica y excelente liderazgo de proyectos, entregando con éxito antes de lo previsto, dentro del presupuesto y con un feedback consistentemente sobresaliente de los stakeholders.\"",
      "rec-juanb":     "\"Un experimentado Project Manager con un conocimiento brutal del mundo SaaS y Marketing Automation — siempre consiguiendo la satisfacción del cliente y contribuyendo a un ambiente laboral positivo.\"",
      "rec-sylvain":   "\"Cuando se gestionan proyectos complejos actuando como punto central de contacto, ser capaz de ir al grano y comunicar con claridad es fundamental. Juan Carlos hace esto excepcionalmente bien.\"",
      "rec-miguel":    "\"Durante 14 años ha demostrado de forma constante un profesionalismo excepcional: muy eficaz, colaborativo y dedicado al cliente. Recomiendo firmemente a Juan Carlos — un verdadero activo para cualquier equipo o proyecto.\"",
      "rec-julienl":   "\"Más allá de sus sólidas habilidades de gestión de proyectos, Juan-Carlos también está muy involucrado en los aspectos funcionales y técnicos, lo que le permite apoyar y guiar eficazmente a los equipos responsables de la implementación.\"",
      "rec-william":   "\"Es un comunicador excepcional, igualmente eficaz con equipos técnicos y stakeholders senior. Genera confianza, gestiona el riesgo de forma proactiva y protege tanto los presupuestos como a los equipos de entrega.\"",
      "rec-jack":      "\"Juan Carlos es sin duda uno de los mejores compañeros que he tenido. Posee una rara combinación de alta energía y pensamiento estratégico riguroso — un activo inmenso para cualquier organización.\"",
      "rec-julienb":   "\"Lo que realmente distingue a Juan Carlos es su sincera dedicación a apoyar y mentorizar a sus compañeros. Su profesionalismo, experiencia y delicadeza interpersonal son verdaderamente admirables.\"",
      "rec-ramon":   "\"Puedo decir sin dudarlo que es uno de esos profesionales excepcionales que eleva consistentemente cada proyecto, equipo y conversación del que forma parte.\"",
      "rec-dennis":  "\"Tiene una habilidad especial para mantener la calma, el foco y la orientación a soluciones, ayudando a todos a avanzar con claridad y confianza.\"",
      "rec-julio":   "\"Juan Carlos demuestra de forma consistente una experiencia excepcional en la gestión de implementaciones complejas para clientes de gran escala.\"",
      'scroll-hint': 'Métricas Clave',
      'fast-contact-tip': 'Hablemos',
      'contact-phone': 'Teléfono'
    }
  };

  let currentLang = 'en';

  function setLang(lang) {
    
    currentLang = lang;
    const t = translations[lang];
    if (!t) return;

    const fastContact = document.getElementById('fast-contact');
    if (fastContact) fastContact.setAttribute('data-tooltip', t['fast-contact-tip']);

    const metricsLabel = document.querySelector('.scroll-hint span');
    if (metricsLabel) metricsLabel.textContent = t['scroll-hint'];

    // 1. DIBUJAR RECOMENDACIONES ALEATORIAS ANTES DE TRADUCIR
    const container = document.getElementById('rec-grid');
    
    if (container) {
      // Barajar y elegir 6
      const shuffled = [...allRecommendations].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 6);

      // Inyectar HTML
      container.innerHTML = selected.map(rec => `
        <div class="rec-card">
          <p class="rec-quote" data-t="rec-${rec.id}"></p>
          <div class="rec-author-info">
            <span class="rec-author-name">${rec.name}</span>
            <span class="rec-author-job">- ${rec.job}</span>
          </div>
        </div>
      `).join('');
      document.body.classList.add("lang-ready");
    }

    // 2. ACTUALIZACIÓN AUTOMÁTICA DE TEXTOS (La "Magia")
    // Buscamos todos los elementos con data-t y los traducimos según su tipo
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        const translation = t[key];
        
        if (translation) {
            // Si el elemento es un input o textarea, traducimos el placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } 
            // Si la clave de traducción sugiere HTML (como headings o textos largos)
            else if (key.includes('subtitle') || key.includes('heading') || key.includes('text') || key.includes('label') || key.includes('rec-')) {
                el.innerHTML = translation;
            } 
            // Para todo lo demás, texto plano (más seguro)
            else {
                el.textContent = translation;
            }
        }
    });

    // 3. CASOS ESPECIALES (Enlaces dinámicos)
    const isEs = lang === 'es';
    const cvUrl = isEs ? 'ES.pdf' : 'EN.pdf';
    const fullCvUrl = isEs ? 'cv_completo.html' : 'full_cv.html';

    // Actualizar todos los enlaces de descarga de PDF
    const pdfLinks = [document.getElementById('nav-cv-link'), document.querySelector('[data-t="cta-download"]')];
    pdfLinks.forEach(link => {
        if (link) link.href = `https://jcastillo.es/cv_pdf/JuanCarlos_Castillo_CV_${cvUrl}`;
    });

    // Actualizar enlace a CV completo
    const cvBtn = document.querySelector('[data-t="cta-cv"]');
    if (cvBtn) cvBtn.href = `https://jcastillo.es/cv_html/${fullCvUrl}`;

    // 4. ESTADOS DE INTERFAZ
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-es').classList.toggle('active', lang === 'es');
    document.documentElement.lang = lang;

    // 5. FUNCIONES EXTERNAS Y PERSISTENCIA
    if (typeof renderLogos === 'function') renderLogos(lang);
    try { localStorage.setItem('landing-lang', lang); } catch(e) {}

  }

  // ── LÓGICA DE INICIO (ANTI-PARPADEO) ──
  (function initLanguage() {
    let langToSet = 'en'; // Inglés por defecto, como preferías

    try {
      const savedLang = localStorage.getItem('landing-lang');
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');

      if (urlLang === 'es' || urlLang === 'en') {
        langToSet = urlLang;
      } else if (savedLang === 'es' || savedLang === 'en') {
        langToSet = savedLang;
      }
    } catch (e) { console.error("Error loading lang", e); }

    // Ejecutamos en cuanto el DOM está listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setLang(langToSet));
    } else {
      setLang(langToSet);
    }
  })();

  function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Cambia el icono: Luna si estás en modo claro, Sol si estás en oscuro
    if (icon) {
        icon.textContent = isLight ? '☾' : '☀︎';
    }
}
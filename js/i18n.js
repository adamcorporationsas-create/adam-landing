/* ==========================================================================
   I18N - Internacionalización ES/EN con persistencia
   ========================================================================== */

const i18n = (() => {
  const STORAGE_KEY = 'adam-lang';

  const translations = {
    es: {
      'skip-link': 'Ir al contenido principal',

      'nav.servicios': 'Servicios',
      'nav.como-funciona': '¿Cómo funciona?',
      'nav.capacidades': 'Capacidades',
      'nav.casos-de-uso': 'Casos de uso',
      'nav.contacto': 'Contacto',
      'nav.escribenos': 'Escríbenos',

      'hero.tag': 'Inteligencia Artificial para tu empresa',
      'hero.title-before': 'Transformamos la forma en que tu empresa ',
      'hero.title-highlight': 'trabaja',
      'hero.desc': 'Asistentes virtuales inteligentes que atienden, venden, automatizan y optimizan procesos las 24 horas del día.',
      'hero.cta-demo': 'Solicita una demo',
      'hero.cta-servicios': 'Ver servicios',

      'servicios.label': 'Servicios',
      'servicios.title': 'Soluciones de IA para tu negocio',
      'servicios.subtitle': 'Dos líneas de servicio diseñadas para transformar la operación de tu empresa. Hacé clic en cada una para ver todos los detalles.',
      'servicios.card1.title': 'Asistentes Virtuales con IA',
      'servicios.card1.desc': 'Agentes inteligentes que entienden el contexto, se adaptan a diferentes escenarios y toman decisiones según la información disponible.',
      'servicios.card1.feat1': 'Atención al cliente 24/7',
      'servicios.card1.feat2': 'Calificación automática de leads',
      'servicios.card1.feat3': 'Operación multicanal y multilingüe',
      'servicios.card1.feat4': 'Escalamiento inteligente a humanos',
      'servicios.card1.feat5': 'Análisis de datos y reportes',
      'servicios.card1.cta': 'Ver información completa →',
      'servicios.card2.title': 'Automatización de Procesos',
      'servicios.card2.desc': 'Eliminamos tareas manuales y repetitivas con flujos automáticos, escalables y adaptados a cada negocio.',
      'servicios.card2.feat1': 'Automatización de tareas web',
      'servicios.card2.feat2': 'Procesos ETL y consolidación de datos',
      'servicios.card2.feat3': 'Generación automática de reportes',
      'servicios.card2.feat4': 'Descarga y organización de documentos',
      'servicios.card2.feat5': 'Integración entre sistemas',
      'servicios.card2.cta': 'Ver información completa →',

      'proceso.label': 'Metodología',
      'proceso.title': '¿Cómo trabajamos?',
      'proceso.subtitle': 'Un proceso probado para llevar inteligencia artificial a tu empresa.',
      'proceso.step1.title': 'Diagnóstico',
      'proceso.step1.text': 'Analizamos tus procesos actuales y detectamos oportunidades de mejora.',
      'proceso.step2.title': 'Definición',
      'proceso.step2.text': 'Establecemos el alcance y definimos la solución a tu medida.',
      'proceso.step3.title': 'Entrenamiento',
      'proceso.step3.text': 'Configuramos y entrenamos el asistente con tu información.',
      'proceso.step4.title': 'Integración',
      'proceso.step4.text': 'Conectamos con tus canales y sistemas existentes.',
      'proceso.step5.title': 'Pruebas',
      'proceso.step5.text': 'Validamos el funcionamiento y optimizamos los resultados.',
      'proceso.step6.title': 'Entrega',
      'proceso.step6.text': 'Ponemos en producción y capacitamos a tu equipo.',

      'capacidades.label': 'Capacidades',
      'capacidades.title': '¿Qué puede hacer ADAM por tu empresa?',
      'capacidades.subtitle': 'Reducimos tiempos operativos, mejoramos la experiencia de clientes y empleados, y escalamos tus procesos con IA.',
      'capacidades.card1.title': 'Atención 24/7',
      'capacidades.card1.text': 'Tus clientes siempre atendidos, sin horarios ni demoras.',
      'capacidades.card2.title': 'Reducción de costos',
      'capacidades.card2.text': 'Automatizamos tareas repetitivas y liberas a tu equipo para lo importante.',
      'capacidades.card3.title': 'Menos errores',
      'capacidades.card3.text': 'Eliminamos errores humanos en procesos repetitivos y críticos.',
      'capacidades.card4.title': 'Operación multicanal',
      'capacidades.card4.text': 'WhatsApp, web, email y más desde una misma plataforma inteligente.',
      'capacidades.card5.title': 'Escalabilidad',
      'capacidades.card5.text': 'Crece sin necesidad de aumentar tu equipo. La IA escala con vos.',
      'capacidades.card6.title': 'Datos y reportes',
      'capacidades.card6.text': 'Información en tiempo real para tomar mejores decisiones.',

      'casos.label': 'Casos de uso',
      'casos.title': 'Soluciones para cada área',
      'casos.subtitle': 'IA aplicada a los desafíos reales de tu empresa.',
      'casos.card1.tag': 'Ventas',
      'casos.card1.title': 'Calificación de prospectos',
      'casos.card1.text': 'Responde consultas automáticamente, califica leads y da seguimiento a cotizaciones.',
      'casos.card2.tag': 'Atención',
      'casos.card2.title': 'Gestión de PQRS',
      'casos.card2.text': 'Atiende solicitudes, genera tickets de soporte y mide satisfacción al instante.',
      'casos.card3.tag': 'RR.HH.',
      'casos.card3.title': 'Onboarding automatizado',
      'casos.card3.text': 'Responde preguntas frecuentes, gestiona vacaciones y acompaña a nuevos colaboradores.',
      'casos.card4.tag': 'Finanzas',
      'casos.card4.title': 'Reportes automáticos',
      'casos.card4.text': 'Descarga facturas, consolida información financiera y genera reportes sin intervención manual.',
      'casos.card5.tag': 'Proyectos',
      'casos.card5.title': 'Dashboard en tiempo real',
      'casos.card5.text': 'Seguimiento automático de tareas, alertas de riesgos y generación de actas e informes.',
      'casos.card6.tag': 'Operaciones',
      'casos.card6.title': 'Automatización de procesos',
      'casos.card6.text': 'Elimina tareas manuales, extrae datos de portales web y sincroniza sistemas sin intervención.',

      'tecnologias.label': 'Tecnología',
      'tecnologias.title': 'Stack tecnológico',
      'tecnologias.subtitle': 'Usamos las mejores herramientas del mercado para construir soluciones robustas y escalables.',
      'tecnologias.item1.name': 'GPT',
      'tecnologias.item1.label': 'OpenAI',
      'tecnologias.item2.name': 'Claude',
      'tecnologias.item2.label': 'Anthropic',
      'tecnologias.item3.name': 'n8n',
      'tecnologias.item3.label': 'Automatización',
      'tecnologias.item4.name': 'Make',
      'tecnologias.item4.label': 'Integración',
      'tecnologias.item5.name': 'Python',
      'tecnologias.item5.label': 'Desarrollo',
      'tecnologias.item6.name': 'Playwright',
      'tecnologias.item6.label': 'Web automation',
      'tecnologias.item7.name': 'RAG',
      'tecnologias.item7.label': 'Base de conocimiento',
      'tecnologias.item8.name': 'WhatsApp API',
      'tecnologias.item8.label': 'Business',

      'contacto.label': 'Contacto',
      'contacto.title': '¿Listo para transformar tu empresa?',
      'contacto.text': 'Cuéntanos qué necesitas y te mostramos cómo la inteligencia artificial puede potenciar tu negocio.',
      'contacto.whatsapp': 'Escríbenos por WhatsApp',
      'contacto.form.header': 'Cuéntanos tu proyecto y te contactamos a la brevedad.',
      'contacto.form.nombre': 'Nombre',
      'contacto.form.nombre-placeholder': 'Tu nombre',
      'contacto.form.email': 'Correo electrónico',
      'contacto.form.email-placeholder': 'tu@correo.com',
      'contacto.form.telefono': 'Teléfono',
      'contacto.form.telefono-placeholder': '+57 321 640 3049',
      'contacto.form.empresa': 'Empresa',
      'contacto.form.empresa-placeholder': 'Nombre de tu empresa',
      'contacto.form.mensaje': 'Mensaje',
      'contacto.form.mensaje-placeholder': 'Cuéntanos en qué podemos ayudarte...',
      'contacto.form.enviar': 'Enviar mensaje',
      'contacto.form.footnote': 'Sin compromiso. Te responderemos a la brevedad.',
      'contacto.form.error-nombre': 'El nombre es obligatorio',
      'contacto.form.error-telefono': 'El teléfono es obligatorio',
      'contacto.form.error-empresa': 'La empresa es obligatoria',
      'contacto.form.error-email': 'Ingresá un correo válido',
      'contacto.form.error-mensaje': 'El mensaje no puede estar vacío',
      'contacto.form.success-title': 'Mensaje enviado',
      'contacto.form.success-text': 'Gracias por contactarnos. Te responderemos a la brevedad.',
      'contacto.form.send-another': 'Enviar otro mensaje',

      'footer.desc': 'Inteligencia artificial para transformar tu empresa.',
      'footer.nav-title': 'Navegación',
      'footer.contacto-title': 'Contacto',
      'footer.whatsapp': 'WhatsApp: +57 321 640 3049',
      'footer.email': 'adamcorporationsas@gmail.com',
      'footer.copyright': '© 2026 ADAM. Todos los derechos reservados.',

      // Shared service page
      'service.hero.back': 'Volver a servicios',
      'service.hero.tag': 'Servicio',
      'service.block.capacidades': 'Capacidades principales',
      'service.block.canales': 'Canales disponibles',
      'service.block.casos-uso': 'Casos de uso por área',
      'service.block.tecnologias': 'Tecnologías utilizadas',
      'service.block.metodologia': 'Metodología de trabajo',
      'service.block.servicios': 'Servicios principales',
      'service.block.beneficios': 'Beneficios clave',
      'service.porque-adam': '¿Por qué ADAM?',
      'service.cta.whatsapp': 'Contactanos por WhatsApp',
      'service.cta.back-home': 'Volver al inicio',

      // Asistentes page
      'asistentes.title': 'Asistentes Virtuales con IA',
      'asistentes.lead': 'Agentes inteligentes que entienden el contexto, se adaptan a diferentes escenarios y toman decisiones según la información disponible.',
      'asistentes.diferenciador': '<strong>A diferencia de los chatbots tradicionales</strong> basados en respuestas predefinidas, nuestros asistentes utilizan modelos avanzados de IA (LLMs) que entienden el contexto de las conversaciones, pueden adaptarse a diferentes escenarios y tomar decisiones según la información disponible.',
      'asistentes.item1': 'Atención al cliente <strong>24/7</strong> sin interrupciones',
      'asistentes.item2': 'Calificación automática de prospectos y leads',
      'asistentes.item3': 'Escalamiento inteligente a agentes humanos cuando sea necesario',
      'asistentes.item4': 'Operación <strong>multicanal</strong>: WhatsApp Business, sitio web, correo electrónico, Telegram',
      'asistentes.item5': 'Soporte <strong>multilingüe</strong>',
      'asistentes.item6': 'Recolección y análisis de datos de cada interacción',
      'asistentes.item7': 'Integración con CRM, ERP, bases de datos y sistemas empresariales',
      'asistentes.channel1': 'WhatsApp Business',
      'asistentes.channel2': 'Widget web',
      'asistentes.channel3': 'Correo electrónico',
      'asistentes.channel4': 'Telegram',
      'asistentes.area.ventas': 'Ventas y Comercial',
      'asistentes.area.ventas.item1': 'Calificación de prospectos',
      'asistentes.area.ventas.item2': 'Respuesta automática a consultas',
      'asistentes.area.ventas.item3': 'Seguimiento de cotizaciones',
      'asistentes.area.ventas.item4': 'Recuperación de clientes potenciales',
      'asistentes.area.atencion': 'Atención al Cliente',
      'asistentes.area.atencion.item1': 'Gestión de PQRS',
      'asistentes.area.atencion.item2': 'Seguimiento de pedidos y servicios',
      'asistentes.area.atencion.item3': 'Generación de tickets de soporte',
      'asistentes.area.atencion.item4': 'Encuestas de satisfacción',
      'asistentes.area.rrhh': 'Recursos Humanos',
      'asistentes.area.rrhh.item1': 'Respuesta a preguntas frecuentes',
      'asistentes.area.rrhh.item2': 'Gestión de vacaciones y permisos',
      'asistentes.area.rrhh.item3': 'Onboarding de nuevos colaboradores',
      'asistentes.area.rrhh.item4': 'Encuestas organizacionales',
      'asistentes.area.finanzas': 'Finanzas y Administración',
      'asistentes.area.finanzas.item1': 'Consulta de facturas y estados de cuenta',
      'asistentes.area.finanzas.item2': 'Recordatorios de pago',
      'asistentes.area.finanzas.item3': 'Atención a proveedores',
      'asistentes.step1': 'Diagnóstico del negocio',
      'asistentes.step2': 'Definición del alcance',
      'asistentes.step3': 'Entrenamiento del asistente',
      'asistentes.step4': 'Integración con canales y sistemas',
      'asistentes.step5': 'Pruebas y optimización',
      'asistentes.step6': 'Entrega y capacitación',
      'asistentes.cta.title': '¿Listo para implementar un asistente virtual en tu empresa?',
      'asistentes.cta.text': 'Transformá la atención al cliente, automatizá ventas y optimizá cada interacción con inteligencia artificial.',

      // Automatización page
      'automatizacion.title': 'Automatización de Procesos',
      'automatizacion.lead': 'Eliminamos tareas manuales y repetitivas mediante flujos de trabajo automáticos, escalables y adaptados a cada negocio.',
      'automatizacion.diferenciador': 'Transformamos procesos repetitivos y operativos en automatizaciones inteligentes que funcionan de manera autónoma, permitiendo que los equipos se concentren en actividades estratégicas de mayor valor.',
      'automatizacion.item1': '<strong>Automatización de procesos manuales</strong> — Gestión de formularios, actualizaciones de registros, validaciones y notificaciones automáticas.',
      'automatizacion.item2': '<strong>Automatización de tareas web</strong> — Acciones en portales web, consultas, registros y extracción de información de plataformas sin API.',
      'automatizacion.item3': '<strong>Procesos ETL</strong> — Extracción, transformación y carga automática de datos entre bases de datos, APIs, hojas de cálculo, CRM y ERP.',
      'automatizacion.item4': '<strong>Descarga automática de documentos</strong> — Obtención y organización automática de facturas, certificados, extractos y reportes críticos.',
      'automatizacion.item5': '<strong>Generación automática de reportes</strong> — Creación y distribución de reportes en Excel, PDF o dashboards con información en tiempo real.',
      'automatizacion.item6': '<strong>Consolidaciones contables y administrativas</strong> — Integración automática de información financiera y operativa de múltiples fuentes.',
      'automatizacion.beneficio1.value': '-70%',
      'automatizacion.beneficio1.label': 'Reducción de tiempos operativos',
      'automatizacion.beneficio2.value': '24/7',
      'automatizacion.beneficio2.label': 'Ejecución continua sin intervención',
      'automatizacion.beneficio3.value': '0',
      'automatizacion.beneficio3.label': 'Errores humanos en procesos automatizados',
      'automatizacion.area.finanzas': 'Finanzas y Contabilidad',
      'automatizacion.area.finanzas.item1': 'Descarga automática de facturas electrónicas',
      'automatizacion.area.finanzas.item2': 'Conciliaciones bancarias',
      'automatizacion.area.finanzas.item3': 'Alertas tributarias',
      'automatizacion.area.finanzas.item4': 'Estados financieros automáticos',
      'automatizacion.area.ventas': 'Ventas y CRM',
      'automatizacion.area.ventas.item1': 'Sincronización de leads',
      'automatizacion.area.ventas.item2': 'Actualización automática de embudos comerciales',
      'automatizacion.area.ventas.item3': 'Seguimiento de cotizaciones',
      'automatizacion.area.ventas.item4': 'Integración e-commerce, CRM y ERP',
      'automatizacion.area.correos': 'Correos y Comunicaciones',
      'automatizacion.area.correos.item1': 'Clasificación automática de correos',
      'automatizacion.area.correos.item2': 'Respuestas automáticas',
      'automatizacion.area.correos.item3': 'Enrutamiento inteligente de mensajes',
      'automatizacion.area.correos.item4': 'Seguimiento de correos sin respuesta',
      'automatizacion.area.rrhh': 'Recursos Humanos',
      'automatizacion.area.rrhh.item1': 'Onboarding automatizado de nuevos colaboradores',
      'automatizacion.area.rrhh.item2': 'Gestión de vacaciones y permisos',
      'automatizacion.area.rrhh.item3': 'Reportes de productividad',
      'automatizacion.area.rrhh.item4': 'Recordatorios de procesos internos',
      'automatizacion.step1': 'Levantamiento y análisis de procesos',
      'automatizacion.step2': 'Priorización de oportunidades',
      'automatizacion.step3': 'Diseño de la solución',
      'automatizacion.step4': 'Desarrollo e integración',
      'automatizacion.step5': 'Pruebas y validación',
      'automatizacion.step6': 'Implementación en producción',
      'automatizacion.step7': 'Capacitación y documentación',
      'automatizacion.dif-item1': 'Soluciones 100% personalizadas a cada negocio',
      'automatizacion.dif-item2': 'Conocimiento del contexto empresarial local',
      'automatizacion.dif-item3': 'Comunicación directa con el equipo técnico',
      'automatizacion.dif-item4': 'Seguridad y confidencialidad de la información',
      'automatizacion.dif-item5': 'Acompañamiento continuo después de la implementación',
      'automatizacion.dif-item6': 'Resultados medibles y orientados al retorno de inversión',
      'automatizacion.cta.title': '¿Listo para automatizar tus procesos?',
      'automatizacion.cta.text': 'Eliminá tareas manuales, reducí errores y liberá a tu equipo para lo que realmente importa.',

      'whatsapp.aria': 'Contactar por WhatsApp',

      'scroll-top.aria': 'Volver al inicio',
    },

    en: {
      'skip-link': 'Skip to main content',

      'nav.servicios': 'Services',
      'nav.como-funciona': 'How it works',
      'nav.capacidades': 'Capabilities',
      'nav.casos-de-uso': 'Use cases',
      'nav.contacto': 'Contact',
      'nav.escribenos': 'Write us',

      'hero.tag': 'Artificial Intelligence for Your Business',
      'hero.title-before': 'We transform the way your company ',
      'hero.title-highlight': 'works',
      'hero.desc': 'Smart virtual assistants that handle, sell, automate, and optimize processes 24 hours a day.',
      'hero.cta-demo': 'Request a demo',
      'hero.cta-servicios': 'View services',

      'servicios.label': 'Services',
      'servicios.title': 'AI Solutions for Your Business',
      'servicios.subtitle': 'Two service lines designed to transform your business operations. Click each one for full details.',
      'servicios.card1.title': 'AI Virtual Assistants',
      'servicios.card1.desc': 'Intelligent agents that understand context, adapt to different scenarios, and make decisions based on available information.',
      'servicios.card1.feat1': '24/7 customer support',
      'servicios.card1.feat2': 'Automatic lead qualification',
      'servicios.card1.feat3': 'Multichannel & multilingual operation',
      'servicios.card1.feat4': 'Smart escalation to humans',
      'servicios.card1.feat5': 'Data analysis & reporting',
      'servicios.card1.cta': 'View full info →',
      'servicios.card2.title': 'Process Automation',
      'servicios.card2.desc': 'We eliminate manual and repetitive tasks with automated, scalable workflows tailored to your business.',
      'servicios.card2.feat1': 'Web task automation',
      'servicios.card2.feat2': 'ETL processes & data consolidation',
      'servicios.card2.feat3': 'Automatic report generation',
      'servicios.card2.feat4': 'Document download & organization',
      'servicios.card2.feat5': 'Cross-system integration',
      'servicios.card2.cta': 'View full info →',

      'proceso.label': 'Methodology',
      'proceso.title': 'How We Work',
      'proceso.subtitle': 'A proven process to bring artificial intelligence to your business.',
      'proceso.step1.title': 'Diagnosis',
      'proceso.step1.text': 'We analyze your current processes and identify improvement opportunities.',
      'proceso.step2.title': 'Definition',
      'proceso.step2.text': 'We establish the scope and define a tailored solution.',
      'proceso.step3.title': 'Training',
      'proceso.step3.text': 'We configure and train the assistant with your information.',
      'proceso.step4.title': 'Integration',
      'proceso.step4.text': 'We connect with your existing channels and systems.',
      'proceso.step5.title': 'Testing',
      'proceso.step5.text': 'We validate performance and optimize results.',
      'proceso.step6.title': 'Delivery',
      'proceso.step6.text': 'We launch into production and train your team.',

      'capacidades.label': 'Capabilities',
      'capacidades.title': 'What Can ADAM Do for Your Business?',
      'capacidades.subtitle': 'We reduce operational times, improve customer and employee experience, and scale your processes with AI.',
      'capacidades.card1.title': '24/7 Support',
      'capacidades.card1.text': 'Your customers always attended, no schedules or delays.',
      'capacidades.card2.title': 'Cost Reduction',
      'capacidades.card2.text': 'We automate repetitive tasks so your team can focus on what matters.',
      'capacidades.card3.title': 'Fewer Errors',
      'capacidades.card3.text': 'We eliminate human errors in repetitive and critical processes.',
      'capacidades.card4.title': 'Multichannel',
      'capacidades.card4.text': 'WhatsApp, web, email and more from a single intelligent platform.',
      'capacidades.card5.title': 'Scalability',
      'capacidades.card5.text': 'Grow without needing to grow your team. AI scales with you.',
      'capacidades.card6.title': 'Data & Reports',
      'capacidades.card6.text': 'Real-time information to make better decisions.',

      'casos.label': 'Use Cases',
      'casos.title': 'Solutions for Every Area',
      'casos.subtitle': 'AI applied to your company\'s real challenges.',
      'casos.card1.tag': 'Sales',
      'casos.card1.title': 'Lead Qualification',
      'casos.card1.text': 'Answers inquiries automatically, qualifies leads, and follows up on quotes.',
      'casos.card2.tag': 'Support',
      'casos.card2.title': 'Request Management',
      'casos.card2.text': 'Handles requests, generates support tickets, and measures satisfaction instantly.',
      'casos.card3.tag': 'HR',
      'casos.card3.title': 'Automated Onboarding',
      'casos.card3.text': 'Answers FAQs, manages time off, and supports new hires.',
      'casos.card4.tag': 'Finance',
      'casos.card4.title': 'Automatic Reports',
      'casos.card4.text': 'Downloads invoices, consolidates financial data, and generates reports without manual work.',
      'casos.card5.tag': 'Projects',
      'casos.card5.title': 'Real-time Dashboard',
      'casos.card5.text': 'Automatic task tracking, risk alerts, and report generation.',
      'casos.card6.tag': 'Operations',
      'casos.card6.title': 'Process Automation',
      'casos.card6.text': 'Eliminates manual tasks, extracts web data, and syncs systems seamlessly.',

      'tecnologias.label': 'Technology',
      'tecnologias.title': 'Tech Stack',
      'tecnologias.subtitle': 'We use the best tools in the market to build robust and scalable solutions.',
      'tecnologias.item1.name': 'GPT',
      'tecnologias.item1.label': 'OpenAI',
      'tecnologias.item2.name': 'Claude',
      'tecnologias.item2.label': 'Anthropic',
      'tecnologias.item3.name': 'n8n',
      'tecnologias.item3.label': 'Automation',
      'tecnologias.item4.name': 'Make',
      'tecnologias.item4.label': 'Integration',
      'tecnologias.item5.name': 'Python',
      'tecnologias.item5.label': 'Development',
      'tecnologias.item6.name': 'Playwright',
      'tecnologias.item6.label': 'Web automation',
      'tecnologias.item7.name': 'RAG',
      'tecnologias.item7.label': 'Knowledge base',
      'tecnologias.item8.name': 'WhatsApp API',
      'tecnologias.item8.label': 'Business',

      'contacto.label': 'Contact',
      'contacto.title': 'Ready to Transform Your Business?',
      'contacto.text': 'Tell us what you need and we\'ll show you how AI can boost your business.',
      'contacto.whatsapp': 'Write us on WhatsApp',
      'contacto.form.header': 'Tell us about your project and we\'ll get back to you shortly.',
      'contacto.form.nombre': 'Name',
      'contacto.form.nombre-placeholder': 'Your name',
      'contacto.form.email': 'Email',
      'contacto.form.email-placeholder': 'you@email.com',
      'contacto.form.telefono': 'Phone',
      'contacto.form.telefono-placeholder': '+57 321 640 3049',
      'contacto.form.empresa': 'Company',
      'contacto.form.empresa-placeholder': 'Your company name',
      'contacto.form.mensaje': 'Message',
      'contacto.form.mensaje-placeholder': 'Tell us how we can help you...',
      'contacto.form.enviar': 'Send message',
      'contacto.form.footnote': 'No obligation. We\'ll get back to you shortly.',
      'contacto.form.error-nombre': 'Name is required',
      'contacto.form.error-telefono': 'Phone is required',
      'contacto.form.error-empresa': 'Company is required',
      'contacto.form.error-email': 'Enter a valid email',
      'contacto.form.error-mensaje': 'Message cannot be empty',
      'contacto.form.success-title': 'Message sent',
      'contacto.form.success-text': 'Thank you for contacting us. We\'ll get back to you shortly.',
      'contacto.form.send-another': 'Send another message',

      'footer.desc': 'Artificial intelligence to transform your business.',
      'footer.nav-title': 'Navigation',
      'footer.contacto-title': 'Contact',
      'footer.whatsapp': 'WhatsApp: +57 321 640 3049',
      'footer.email': 'adamcorporationsas@gmail.com',
      'footer.copyright': '© 2026 ADAM. All rights reserved.',

      // Shared service page
      'service.hero.back': 'Back to services',
      'service.hero.tag': 'Service',
      'service.block.capacidades': 'Core Capabilities',
      'service.block.canales': 'Available Channels',
      'service.block.casos-uso': 'Use Cases by Area',
      'service.block.tecnologias': 'Technologies Used',
      'service.block.metodologia': 'Methodology',
      'service.block.servicios': 'Main Services',
      'service.block.beneficios': 'Key Benefits',
      'service.porque-adam': 'Why ADAM?',
      'service.cta.whatsapp': 'Contact us on WhatsApp',
      'service.cta.back-home': 'Back to home',

      // Asistentes page
      'asistentes.title': 'AI Virtual Assistants',
      'asistentes.lead': 'Intelligent agents that understand context, adapt to different scenarios, and make decisions based on available information.',
      'asistentes.diferenciador': '<strong>Unlike traditional chatbots</strong> based on predefined responses, our assistants use advanced AI models (LLMs) that understand conversation context, adapt to different scenarios, and make decisions based on available information.',
      'asistentes.item1': '<strong>24/7</strong> customer support without interruptions',
      'asistentes.item2': 'Automatic lead scoring and qualification',
      'asistentes.item3': 'Smart escalation to human agents when needed',
      'asistentes.item4': '<strong>Multichannel</strong> operation: WhatsApp Business, website, email, Telegram',
      'asistentes.item5': '<strong>Multilingual</strong> support',
      'asistentes.item6': 'Data collection and analysis from every interaction',
      'asistentes.item7': 'Integration with CRM, ERP, databases and enterprise systems',
      'asistentes.channel1': 'WhatsApp Business',
      'asistentes.channel2': 'Web widget',
      'asistentes.channel3': 'Email',
      'asistentes.channel4': 'Telegram',
      'asistentes.area.ventas': 'Sales & Commercial',
      'asistentes.area.ventas.item1': 'Lead qualification',
      'asistentes.area.ventas.item2': 'Automated inquiry responses',
      'asistentes.area.ventas.item3': 'Quote follow-up',
      'asistentes.area.ventas.item4': 'Lead recovery',
      'asistentes.area.atencion': 'Customer Service',
      'asistentes.area.atencion.item1': 'PQRS management',
      'asistentes.area.atencion.item2': 'Order and service tracking',
      'asistentes.area.atencion.item3': 'Support ticket generation',
      'asistentes.area.atencion.item4': 'Satisfaction surveys',
      'asistentes.area.rrhh': 'Human Resources',
      'asistentes.area.rrhh.item1': 'FAQ responses',
      'asistentes.area.rrhh.item2': 'Vacation and leave management',
      'asistentes.area.rrhh.item3': 'New employee onboarding',
      'asistentes.area.rrhh.item4': 'Organizational surveys',
      'asistentes.area.finanzas': 'Finance & Administration',
      'asistentes.area.finanzas.item1': 'Invoice and account statement inquiries',
      'asistentes.area.finanzas.item2': 'Payment reminders',
      'asistentes.area.finanzas.item3': 'Vendor support',
      'asistentes.step1': 'Business diagnosis',
      'asistentes.step2': 'Scope definition',
      'asistentes.step3': 'Assistant training',
      'asistentes.step4': 'Channel and system integration',
      'asistentes.step5': 'Testing and optimization',
      'asistentes.step6': 'Delivery and training',
      'asistentes.cta.title': 'Ready to implement a virtual assistant in your company?',
      'asistentes.cta.text': 'Transform customer service, automate sales, and optimize every interaction with artificial intelligence.',

      // Automatización page
      'automatizacion.title': 'Process Automation',
      'automatizacion.lead': 'We eliminate manual and repetitive tasks through automated, scalable workflows tailored to each business.',
      'automatizacion.diferenciador': 'We transform repetitive operational processes into intelligent automations that run autonomously, allowing teams to focus on higher-value strategic activities.',
      'automatizacion.item1': '<strong>Manual process automation</strong> — Form management, record updates, validations, and automatic notifications.',
      'automatizacion.item2': '<strong>Web task automation</strong> — Actions on web portals, queries, registrations, and data extraction from platforms without APIs.',
      'automatizacion.item3': '<strong>ETL processes</strong> — Automated data extraction, transformation, and loading between databases, APIs, spreadsheets, CRM and ERP.',
      'automatizacion.item4': '<strong>Automatic document downloads</strong> — Automated retrieval and organization of invoices, certificates, statements, and critical reports.',
      'automatizacion.item5': '<strong>Automatic report generation</strong> — Creation and distribution of reports in Excel, PDF, or dashboards with real-time information.',
      'automatizacion.item6': '<strong>Accounting and administrative consolidation</strong> — Automated integration of financial and operational information from multiple sources.',
      'automatizacion.beneficio1.value': '-70%',
      'automatizacion.beneficio1.label': 'Reduction in operational time',
      'automatizacion.beneficio2.value': '24/7',
      'automatizacion.beneficio2.label': 'Continuous execution without intervention',
      'automatizacion.beneficio3.value': '0',
      'automatizacion.beneficio3.label': 'Human errors in automated processes',
      'automatizacion.area.finanzas': 'Finance & Accounting',
      'automatizacion.area.finanzas.item1': 'Automatic e-invoice download',
      'automatizacion.area.finanzas.item2': 'Bank reconciliations',
      'automatizacion.area.finanzas.item3': 'Tax alerts',
      'automatizacion.area.finanzas.item4': 'Automatic financial statements',
      'automatizacion.area.ventas': 'Sales & CRM',
      'automatizacion.area.ventas.item1': 'Lead synchronization',
      'automatizacion.area.ventas.item2': 'Automatic sales funnel updates',
      'automatizacion.area.ventas.item3': 'Quote follow-up',
      'automatizacion.area.ventas.item4': 'E-commerce, CRM and ERP integration',
      'automatizacion.area.correos': 'Email & Communications',
      'automatizacion.area.correos.item1': 'Automatic email classification',
      'automatizacion.area.correos.item2': 'Automatic replies',
      'automatizacion.area.correos.item3': 'Smart message routing',
      'automatizacion.area.correos.item4': 'Unanswered email follow-up',
      'automatizacion.area.rrhh': 'Human Resources',
      'automatizacion.area.rrhh.item1': 'Automated new employee onboarding',
      'automatizacion.area.rrhh.item2': 'Vacation and leave management',
      'automatizacion.area.rrhh.item3': 'Productivity reports',
      'automatizacion.area.rrhh.item4': 'Internal process reminders',
      'automatizacion.step1': 'Process assessment and analysis',
      'automatizacion.step2': 'Opportunity prioritization',
      'automatizacion.step3': 'Solution design',
      'automatizacion.step4': 'Development and integration',
      'automatizacion.step5': 'Testing and validation',
      'automatizacion.step6': 'Production deployment',
      'automatizacion.step7': 'Training and documentation',
      'automatizacion.dif-item1': '100% customized solutions for each business',
      'automatizacion.dif-item2': 'Knowledge of local business context',
      'automatizacion.dif-item3': 'Direct communication with the technical team',
      'automatizacion.dif-item4': 'Information security and confidentiality',
      'automatizacion.dif-item5': 'Continuous support after implementation',
      'automatizacion.dif-item6': 'Measurable results focused on ROI',
      'automatizacion.cta.title': 'Ready to automate your processes?',
      'automatizacion.cta.text': 'Eliminate manual tasks, reduce errors, and free your team for what really matters.',

      'whatsapp.aria': 'Contact us on WhatsApp',

      'scroll-top.aria': 'Back to top',
    },
  };

  const get = (key, lang) => {
    if (!translations[lang]) return '';
    return translations[lang][key] || '';
  };

  const translateElement = (el, lang) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const text = get(key, lang);
    if (text) el.innerHTML = text;
  };

  const translatePlaceholder = (el, lang) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const text = get(key, lang);
    if (text) el.placeholder = text;
  };

  const translateAlt = (el, lang) => {
    const key = el.getAttribute('data-i18n-alt');
    if (!key) return;
    const text = get(key, lang);
    if (text) el.alt = text;
  };

  const translateAria = (el, lang) => {
    const key = el.getAttribute('data-i18n-aria');
    if (!key) return;
    const text = get(key, lang);
    if (text) el.setAttribute('aria-label', text);
  };

  const translateFormErrors = (lang) => {
    document.querySelectorAll('.form__error').forEach((el) => {
      const forInput = el.previousElementSibling;
      if (!forInput) return;
      const id = forInput.id;
      if (id === 'nombre') {
        el.textContent = get('contacto.form.error-nombre', lang);
      } else if (id === 'telefono') {
        el.textContent = get('contacto.form.error-telefono', lang);
      } else if (id === 'email') {
        el.textContent = get('contacto.form.error-email', lang);
      } else if (id === 'empresa') {
        el.textContent = get('contacto.form.error-empresa', lang);
      } else if (id === 'mensaje') {
        el.textContent = get('contacto.form.error-mensaje', lang);
      }
    });
  };

  const setLanguage = (lang) => {
    if (!translations[lang]) return;

    localStorage.setItem(STORAGE_KEY, lang);

    // Text content
    document.querySelectorAll('[data-i18n]').forEach((el) => translateElement(el, lang));

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => translatePlaceholder(el, lang));

    // Alt texts
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => translateAlt(el, lang));

    // Aria labels
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => translateAria(el, lang));

    // Form errors
    translateFormErrors(lang);

    // Update switcher UI
    document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('lang-switcher__btn--active', isActive);
    });

    // Dispatch event for other scripts
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  };

  const getCurrentLang = () => {
    return localStorage.getItem(STORAGE_KEY) || 'es';
  };

  const init = () => {
    const lang = getCurrentLang();
    setLanguage(lang);
  };

  const api = { init, setLanguage, getCurrentLang };
  window.i18n = api;
  return api;
})();

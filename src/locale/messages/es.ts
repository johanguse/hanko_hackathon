export default {
  home: {
    title: 'Transforma tus fotos con AI Magic',
    subtitle:
      'Descubre el poder de la IA y lleva tus imágenes al siguiente nivel con solo un clic',
    features: 'Explorar características',
  },
  footer: {
    content: 'Diseñado y construido por {fullName}',
  },
  siteConfig: {
    title: 'Johan Guse | Desarrollador Frontend',
    description:
      'Portafolio web personal, donde puedes encontrar información sobre mí, mis habilidades, mi experiencia laboral y mis proyectos.',
    menuNav: {
      aboutMe: 'Sobre mi',
      projects: 'Proyectos',
      experience: 'Experiencia',
      education: 'Educación',
      skills: 'Habilidades',
      dashboard: 'Dashboard',
    },
    socialLinks: {
      github: 'ir a Github',
      LinkedIn: 'ir a LinkedIn',
      twitter: 'ir a Twitter',
    },
  },
  commons: {
    sidebarNav: 'Menú de navegación lateral',
    openSidebarNav: 'Abrir menú de navegación lateral',
    closeSidebarNav: 'Cerrar menú de navegación lateral',
    openLanguageMenu: 'Abrir menú de cambio de idioma',
    changeToSpanish: 'Cambiar a Español',
    changeToEnglish: 'Cambiar a Inglés',
    toggleTheme: 'Cambiar tema',
    English: 'Inglés',
    Spanish: 'Español',
    themeColor: {
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
    },
    dashboard: {
      overview: 'Resumen',
      generate: 'Generar Avatar',
      settings: 'Configuración',
      account: 'Cuenta',
      logout: 'Cerrar sesión',
      remain: 'Restante',
      credits: 'Créditos',
      overviewTitle: 'Avatares generados',
      overviewSubtitle: 'Lista de avatares generados.',
      generatePage: {
        title: 'Genera tu avatar',
        subtitle: 'Recibe en tu correo el avatar que acabas de generar.',
        email: 'Email',
        gender: 'Genero',
        genderPlaceholder: 'Selecciona tu genero',
        male: 'Masculino',
        female: 'Femenino',
        file: 'Sube tu imagen',
        userPrompt: 'Agrega una descripción personal para tu avatar ',
        userPromptOptional: '(opcional)',
        userPromptHelper: 'Copia las pautas de imagen de ',
        userPromptPlaceholder:
          'Copia las pautas de imagen de https://lexica.art',
        button: 'Generar avatar',
      },
    },
    auth: {
      loginTitle: 'Iniciar sesión',
      loginSubtitle:
        'Introduce tu email a continuación para acceder a tu cuenta.',
      loginButton: 'Iniciar sesión',
      loginFooterText: 'Si no tienes una cuenta, te crearemos una',
      registerTitle: 'Registrar',
      registerSubtitle:
        'Introduce tu email a continuación para crear una cuenta.',
      registerFooterText:
        'Si ya tienes una cuenta, ingresa tu email para iniciar sesión.',
      termsText: 'Al crear una cuenta, usted acepta nuestros',
      termsTermsAndConditions: 'Términos y condiciones',
      termsPrivacyPolicy: 'Política de privacidad',
      termsCookiePolicy: 'Política de cookies',
    },
  },
} as const

export default {
  home: {
    title: 'Transform Your Photos with AI Magic',
    subtitle:
      'Discover the power of AI and take your images to the next level with just one click',
    features: 'Explore features',
    featureTitle: 'AI Avatar',
    featureSubtitle: 'Take your photos to the next level with AI magic.',
    featureButton: 'Create one now',
    featureAfter: 'After',
    featureBefore: 'Before',
  },
  footer: {
    content: 'Designed & Built by {fullName}',
  },
  siteConfig: {
    title: 'AI Magic',
    description:
      'Discover the power of AI and take your images to the next level with just one click',
    menuNav: {
      aboutMe: 'About me',
      projects: 'Projects',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      dashboard: 'Dashboard',
    },
    socialLinks: {
      github: 'go to Github',
      LinkedIn: 'go to LinkedIn',
      twitter: 'go to Twitter',
    },
  },
  commons: {
    sidebarNav: 'Sidebar nav',
    openSidebarNav: 'Open sidebar nav',
    closeSidebarNav: 'Close sidebar nav',
    openLanguageMenu: 'Open change language menu',
    changeToSpanish: 'Change to Spanish',
    changeToEnglish: 'Change to english',
    toggleTheme: 'Toggle theme',
    English: 'English',
    Spanish: 'Spanish',
    themeColor: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    loading: 'Loading...',
    dashboard: {
      createFirstAvatar: 'Create your first avatar',
      buttonGenerate: 'Generate avatar',
      collection: 'Collection',
      overview: 'Overview',
      generate: 'Generate Avatar',
      settings: 'Settings',
      account: 'Account',
      logout: 'Logout',
      'remainCredits#zero': 'No credits remain',
      'remainCredits#one': '1 credit',
      'remainCredits#other': '{count} credits',
      overviewTitle: 'Generated Avatars',
      overviewSubtitle: 'A list of generated avatars.',
      generatePage: {
        title: 'Generate your Avatar',
        subtitle: 'Receive in your email the avatar you just generated.',
        email: 'Email address',
        gender: 'Gender',
        genderPlaceholder: 'Select your gender',
        male: 'Male',
        female: 'Female',
        file: 'Upload your picture',
        userPrompt: 'Add custom prompt for your avatar ',
        userPromptOptional: '(Optional)',
        userPromptHelper: 'Copy image prompts from ',
        userPromptPlaceholder: 'Copy image prompts from https://lexica.art',
        button: 'Generate Avatar',
      },
      resultPage: {
        thanks: 'Thank you!',
        generationFail: 'Feneration failed',
        whenImageIsReady:
          'Your image will be delivered to your email, once it is ready!',
        buttonAnother: 'Generate another',
      },
      outOfCredits: {
        title: 'Out of credits',
        subtitle: 'Please purchase more credits.',
      },
    },
    auth: {
      loginTitle: 'Sign in',
      loginSubtitle: 'Enter your email below to receive an account access.',
      loginFooterText:
        "If you don't have an account, we'll whip one up for ya.",
      registerTitle: 'Register',
      registerSubtitle: 'Enter your email below to create an account.',
      registerFooterText:
        'If you already have an account, type in your email above to login.',
      termsText: 'By creating an account, you agree to our',
      termsTermsAndConditions: 'Terms and Conditions',
      termsPrivacyPolicy: 'Privacy Policy',
      termsCookiePolicy: 'Cookie Policy',
    },
  },
} as const

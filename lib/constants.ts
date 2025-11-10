/**
 * ثوابت التطبيق
 */

// API Endpoints
export const API_ENDPOINTS = {
  CHAT: '/api/trpc/chat',
  AUTH: '/api/trpc/auth',
  IMAGE: '/api/trpc/image',
  MEMORY: '/api/trpc/memory',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'sevenai-theme',
  SIDEBAR_WIDTH: 'sidebar-width',
  LAST_CONVERSATION: 'last-conversation-id',
  USER_PREFERENCES: 'user-preferences',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  SIDEBAR: {
    DEFAULT_WIDTH: 280,
    MIN_WIDTH: 200,
    MAX_WIDTH: 480,
  },
  CHAT: {
    MAX_MESSAGE_LENGTH: 4000,
    TYPING_SPEED: 15,
    SCROLL_DELAY: 100,
  },
  ANIMATIONS: {
    DURATION: 300,
    STAGGER_DELAY: 100,
  },
} as const;

// Feature Flags
export const FEATURES = {
  DEEP_THINKING: true,
  IMAGE_GENERATION: true,
  IMAGE_ANALYSIS: true,
  VOICE_INPUT: false,
  DARK_MODE: true,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Colors
export const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  accent: 'hsl(var(--accent))',
  muted: 'hsl(var(--muted))',
  destructive: 'hsl(var(--destructive))',
} as const;

// Messages
export const MESSAGES = {
  ERRORS: {
    GENERIC: 'حدث خطأ غير متوقع',
    NETWORK: 'خطأ في الاتصال بالشبكة',
    AUTH: 'يرجى تسجيل الدخول',
    RATE_LIMIT: 'تم تجاوز الحد المسموح من الطلبات',
  },
  SUCCESS: {
    MESSAGE_SENT: 'تم إرسال الرسالة',
    CONVERSATION_DELETED: 'تم حذف المحادثة',
    IMAGE_GENERATED: 'تم توليد الصورة',
  },
  INFO: {
    LOADING: 'جاري التحميل...',
    THINKING: 'جاري التفكير...',
    GENERATING: 'جاري التوليد...',
  },
} as const;

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  ARABIC: /[\u0600-\u06FF]/,
  ENGLISH: /[a-zA-Z]/,
} as const;

// Limits
export const LIMITS = {
  MAX_CONVERSATIONS: 100,
  MAX_MESSAGES_PER_CONVERSATION: 1000,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

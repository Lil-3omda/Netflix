export const NETFLIX_CONSTANTS = {
  BRAND_NAME: 'Netflix',
  ADMIN_BRAND_NAME: 'Netflix Admin',
  COLORS: {
    PRIMARY: '#E50914',
    SECONDARY: '#221F1F',
    BACKGROUND: '#000000',
    TEXT_PRIMARY: '#FFFFFF',
    TEXT_SECONDARY: '#B3B3B3'
  },
  API_ENDPOINTS: {
    CONTENT: '/api/content',
    USERS: '/api/users',
    ANALYTICS: '/api/analytics',
    CHATBOT: '/api/chatbot'
  }
};

export const SUBSCRIPTION_TYPES = {
  BASIC: 'Basic',
  STANDARD: 'Standard',
  PREMIUM: 'Premium'
} as const;

export const CONTENT_TYPES = {
  MOVIE: 'Movie',
  SERIES: 'Series',
  DOCUMENTARY: 'Documentary'
} as const;
const API_CONFIG = {
  BASE_URL: 'https://api.daily-practices.local',
  PRACTICES: {
    list: '/api/practices',
    markComplete: (id: string) => `/api/practices/${id}/complete`,
    rate: (id: string) => `/api/practices/${id}/rating`,
  },
  MOCK: {
    latencyMs: 700,
    failureRate: 0,
    seedCount: 120,
    pageSize: 12,
  },
} as const;

export default API_CONFIG;

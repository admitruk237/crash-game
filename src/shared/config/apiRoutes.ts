export const API_ROUTES = {
  balance: '/api/balance',
  history: (limit: number) => `/api/history?limit=${limit}`,
  roundsRecent: (limit: number) => `/api/rounds/recent?limit=${limit}`,
  claim: '/api/bonus/claim',
} as const;

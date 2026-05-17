export const API_ROUTES = {
  balance: '/api/balance',
  roundsRecent: (limit: number) => `/api/rounds/recent?limit=${limit}`,
  claim: '/api/bonus/claim',
} as const;

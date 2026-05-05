export const GAME_PHASES = {
  WAITING: 'waiting',
  RUNNING: 'running',
  CRASHED: 'crashed',
} as const;

export const CONNECTION_STATUS = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected',
} as const;

export const BET_STATUS = {
  PLACED: 'placed',
  CASHED_OUT: 'cashedOut',
  LOST: 'lost',
} as const;

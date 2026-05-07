export const Phases = {
  WAITING: 'waiting',
  RUNNING: 'running',
  CRASHED: 'crashed',
} as const;

export type Phase = (typeof Phases)[keyof typeof Phases];

export type BetStatus = 'placed' | 'cashed_out' | 'lost';

export type RoundTier = 'low' | 'mid' | 'high';

export type RejectReason =
  | 'betting_closed'
  | 'already_has_bet'
  | 'no_active_bet'
  | 'not_running'
  | 'insufficient_balance'
  | 'invalid_auto_cashout'
  | 'invalid_payload';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

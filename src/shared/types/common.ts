export type Phase = 'waiting' | 'running' | 'crashed';

export type BetStatus = 'placed' | 'cashedOut' | 'lost';

export type RejectReason =
  | 'betting_closed'
  | 'already_has_bet'
  | 'no_active_bet'
  | 'not_running'
  | 'insufficient_balance'
  | 'invalid_auto_cashout'
  | 'invalid_payload';

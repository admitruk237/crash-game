import { type BetStatus, type RoundTier } from './common';

export interface Balance {
  balance: number;
}
export interface HistoryBet {
  betId: string;
  roundId: string;
  amount: number;
  autoCashOutAt: number | null;
  status: BetStatus;
  multiplier: number | null;
  winAmount: number | null;
  profit: number | null;
  placedAt: string;
  settledAt: string | null;
}
export interface RecentRound {
  roundId: string;
  crashPoint: number;
  crashedAt: string;
  tier: RoundTier;
}

export interface ClaimResponse {
  claimed: boolean;
  amount: number;
  balance: number;
  claimedAt: string;
  nextClaimAt: string;
  retryAfterMs: number;
  error?: string | null;
}

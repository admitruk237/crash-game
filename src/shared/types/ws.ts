import type { BetStatus, Phase, RejectReason, RoundTier } from './common';

interface ActiveBet {
  amount: number;
  autoCashOutAt: number | null;
  status: BetStatus;
}

export interface PublicPlayer {
  username: string;
  amount: number;
  status: BetStatus;
  multiplier: number | null;
}

export interface RoundStateEvent {
  phase: Phase;
  roundId: string;
  startedAt: string | null;
  endsAt: string | null;
  currentMultiplier: number;
  elapsedMs?: number;
  crashPoint: number | null;
  yourBet: ActiveBet | null;
  players: PublicPlayer[];
}

export interface RoundWaitingEvent {
  roundId: string;
  endsAt: string;
  players: PublicPlayer[];
}

export interface RoundStartEvent {
  roundId: string;
  startedAt: string;
  players: PublicPlayer[];
}

export interface RoundTickEvent {
  roundId: string;
  multiplier: number;
  elapsedMs: number;
}

export interface RoundCrashEvent {
  roundId: string;
  crashPoint: number;
  tier: RoundTier;
  players: PublicPlayer[];
}

export interface BetPlacedEvent {
  betId: string;
  roundId: string;
  amount: number;
  autoCashOutAt: number | null;
  balance: number;
}

export interface BetCashedOutEvent {
  betId: string;
  multiplier: number;
  winAmount: number;
  profit: number;
  balance: number;
}

export interface BetLostEvent {
  betId: string;
  crashPoint: number;
  balance: number;
}

export interface BetRejectedEvent {
  reason: RejectReason;
  message: string;
}

export interface PlayersBetEvent {
  username: string;
  amount: number;
}

export interface PlayersCashoutEvent {
  username: string;
  multiplier: number;
  winAmount: number;
}

export interface PlayersLostEvent {
  username: string;
  amount: number;
}

export interface BetPlacePayload {
  amount: number;
  autoCashOutAt: number | null;
}

export type BetCashoutPayload = Record<string, never>;

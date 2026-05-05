import type { BetStatus, Phase, RejectReason } from './common';

interface ActiveBet {
  amount: number;
  autoCashOutAt: number | null;
  status: BetStatus;
}

export interface RoundStateEvent {
  phase: Phase;
  roundId: string;
  startedAt: string | null;
  endsAt: string | null;
  currentMultiplier: number;
  crashPoint: number | null;
  yourBet: ActiveBet | null;
  playerCount: number;
}

export interface RoundWaitingEvent {
  roundId: string;
  endsAt: string;
  playerCount: number;
}

export interface RoundStartEvent {
  roundId: string;
  startedAt: string;
  playerCount: number;
}

export interface RoundTickEvent {
  roundId: string;
  multiplier: number;
  elapsedMs: number;
}

export interface RoundCrashEvent {
  roundId: string;
  crashPoint: number;
  playerCount: number;
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

export interface BetPlacePayload {
  amount: number;
  autoCashOutAt: number | null;
}

export type BetCashoutPayload = Record<string, never>;

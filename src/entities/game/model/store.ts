import { create } from 'zustand';
import { CONNECTION_STATUS, GAME_PHASES } from '@/shared/config/gameConstants';
import type { BetStatus, Phase } from '@/shared/types/common';

interface MyBet {
  betId: string;
  amount: number;
  autoCashOutAt: number | null;
  status: BetStatus;
}

interface GameState {
  phase: Phase;
  roundId: string | null;
  startedAt: Date | null;
  endsAt: Date | null;
  multiplier: number;
  crashPoint: number | null;
  playerCount: number;
  myBet: MyBet | null;
  balance: number | null;
  actionInFlight: boolean;
  connectionStatus: keyof typeof CONNECTION_STATUS | string;
  setPhase: (phase: Phase) => void;
  setRoundId: (id: string | null) => void;
  setStartedAt: (date: Date | null) => void;
  setEndsAt: (date: Date | null) => void;
  setMultiplier: (m: number) => void;
  setCrashPoint: (cp: number | null) => void;
  setPlayerCount: (n: number) => void;
  setMyBet: (bet: MyBet | null) => void;
  setBalance: (b: number) => void;
  setActionInFlight: (v: boolean) => void;
  setConnectionStatus: (s: any) => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: GAME_PHASES.WAITING,
  roundId: null,
  startedAt: null,
  endsAt: null,
  multiplier: 1,
  crashPoint: null,
  playerCount: 0,
  myBet: null,
  balance: null,
  actionInFlight: false,
  connectionStatus: CONNECTION_STATUS.CONNECTING,
  setPhase: (phase) => set({ phase }),
  setRoundId: (roundId) => set({ roundId }),
  setStartedAt: (startedAt) => set({ startedAt }),
  setEndsAt: (endsAt) => set({ endsAt }),
  setMultiplier: (multiplier) => set({ multiplier }),
  setCrashPoint: (crashPoint) => set({ crashPoint }),
  setPlayerCount: (playerCount) => set({ playerCount }),
  setMyBet: (myBet) => set({ myBet }),
  setBalance: (balance) => set({ balance }),
  setActionInFlight: (actionInFlight) => set({ actionInFlight }),
  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
}));

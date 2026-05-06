import { create } from 'zustand';
import type { BetStatus, ConnectionStatus, Phase } from '@/shared/types/common';
import type { PublicPlayer } from '@/shared/types/ws';

interface MyBet {
  betId?: string;
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
  players: PublicPlayer[];
  myBet: MyBet | null;
  balance: number | null;
  actionInFlight: boolean;
  connectionStatus: ConnectionStatus;
  setPhase: (phase: Phase) => void;
  setRoundId: (id: string | null) => void;
  setStartedAt: (date: Date | null) => void;
  setEndsAt: (date: Date | null) => void;
  setMultiplier: (m: number) => void;
  setCrashPoint: (cp: number | null) => void;
  setPlayers: (players: PublicPlayer[]) => void;
  setMyBet: (bet: MyBet | null) => void;
  setBalance: (b: number) => void;
  setActionInFlight: (v: boolean) => void;
  setConnectionStatus: (s: ConnectionStatus) => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: 'waiting',
  roundId: null,
  startedAt: null,
  endsAt: null,
  multiplier: 1,
  crashPoint: null,
  players: [],
  myBet: null,
  balance: null,
  actionInFlight: false,
  connectionStatus: 'connecting',
  setPhase: (phase) => set({ phase }),
  setRoundId: (roundId) => set({ roundId }),
  setStartedAt: (startedAt) => set({ startedAt }),
  setEndsAt: (endsAt) => set({ endsAt }),
  setMultiplier: (multiplier) => set({ multiplier }),
  setCrashPoint: (crashPoint) => set({ crashPoint }),
  setPlayers: (players) => set({ players }),
  setMyBet: (myBet) => set({ myBet }),
  setBalance: (balance) => set({ balance }),
  setActionInFlight: (actionInFlight) => set({ actionInFlight }),
  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
}));

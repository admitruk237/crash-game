import { create } from 'zustand';
import type { BetStatus, ConnectionStatus, Phase, PublicPlayer } from '@/shared/types';

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
  displayedMultiplier: number;
  crashPoint: number | null;
  players: PublicPlayer[];
  myBet: MyBet | null;
  actionInFlight: boolean;
  connectionStatus: ConnectionStatus;
  setPhase: (phase: Phase) => void;
  setRoundId: (id: string | null) => void;
  setStartedAt: (date: Date | null) => void;
  setEndsAt: (date: Date | null) => void;
  setMultiplier: (m: number) => void;
  setDisplayedMultiplier: (m: number) => void;
  setCrashPoint: (cp: number | null) => void;
  setPlayers: (players: PublicPlayer[]) => void;
  setMyBet: (bet: MyBet | null) => void;
  setActionInFlight: (v: boolean) => void;
  setConnectionStatus: (s: ConnectionStatus) => void;
  reset: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: 'waiting',
  roundId: null,
  startedAt: null,
  endsAt: null,
  multiplier: 1,
  displayedMultiplier: 1,
  crashPoint: null,
  players: [],
  myBet: null,
  actionInFlight: false,
  connectionStatus: 'connecting',
  setPhase: (phase) => set({ phase }),
  setRoundId: (roundId) => set({ roundId }),
  setStartedAt: (startedAt) => set({ startedAt }),
  setEndsAt: (endsAt) => set({ endsAt }),
  setMultiplier: (multiplier) => set({ multiplier }),
  setDisplayedMultiplier: (displayedMultiplier) => set({ displayedMultiplier }),
  setCrashPoint: (crashPoint) => set({ crashPoint }),
  setPlayers: (players) => set({ players }),
  setMyBet: (myBet) => set({ myBet }),
  setActionInFlight: (actionInFlight) => set({ actionInFlight }),
  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
  reset: () =>
    set({
      phase: 'waiting',
      roundId: null,
      startedAt: null,
      endsAt: null,
      multiplier: 1,
      crashPoint: null,
      players: [],
      myBet: null,
      actionInFlight: false,
    }),
}));

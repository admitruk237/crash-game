import { create } from 'zustand';
import type { RecentRound } from '@/shared/types/api';

interface RecentState {
  rounds: RecentRound[];
  setInitial: (rounds: RecentRound[]) => void;
  prepend: (round: RecentRound) => void;
}

export const useRecentStore = create<RecentState>((set) => ({
  rounds: [],
  setInitial: (rounds) => set({ rounds }),
  prepend: (round) => set((s) => ({ rounds: [round, ...s.rounds].slice(0, 20) })),
}));

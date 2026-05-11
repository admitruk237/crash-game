import { DEFAULT_AUTO_CASH_OUT, DEFAULT_BET_AMOUNT } from '@/shared/config/game';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameControlsState {
  betAmount: string;
  isAutoCashOutEnabled: boolean;
  autoCashOutMultiplier: string;
  setBetAmount: (amount: string) => void;
  setAutoCashOutEnabled: (enabled: boolean) => void;
  setAutoCashOutMultiplier: (multiplier: string) => void;
  halfBet: () => void;
  doubleBet: () => void;
  maxBet: (balance: number) => void;
}

type PersistedControls = Pick<
  GameControlsState,
  'betAmount' | 'autoCashOutMultiplier' | 'isAutoCashOutEnabled'
>;

export const useGameControlsStore = create<GameControlsState>()(
  persist(
    (set, get) => ({
      betAmount: DEFAULT_BET_AMOUNT,
      isAutoCashOutEnabled: false,
      autoCashOutMultiplier: DEFAULT_AUTO_CASH_OUT,
      setBetAmount: (betAmount) => set({ betAmount }),
      setAutoCashOutEnabled: (isAutoCashOutEnabled) => set({ isAutoCashOutEnabled }),
      setAutoCashOutMultiplier: (autoCashOutMultiplier) => set({ autoCashOutMultiplier }),
      halfBet: () => {
        const current = parseFloat(get().betAmount) || 0;
        set({ betAmount: (current / 2).toFixed(2) });
      },
      doubleBet: () => {
        const current = parseFloat(get().betAmount) || 0;
        set({ betAmount: (current * 2).toFixed(2) });
      },
      maxBet: (balance) => {
        set({ betAmount: balance.toFixed(2) });
      },
    }),
    {
      name: 'game-controls-storage',
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<PersistedControls>;
        const merged: GameControlsState = { ...currentState, ...persisted };

        if (!merged.betAmount?.trim()) merged.betAmount = DEFAULT_BET_AMOUNT;
        if (!merged.autoCashOutMultiplier?.trim()) {
          merged.autoCashOutMultiplier = DEFAULT_AUTO_CASH_OUT;
        }

        return merged;
      },
    }
  )
);

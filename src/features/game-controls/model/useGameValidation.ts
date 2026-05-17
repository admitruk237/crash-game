'use client';

import { useShallow } from 'zustand/react/shallow';
import { useBalance, useIsBettingLocked } from '@/entities/game';
import { useGameControlsStore } from './store';
import { MIN_AUTO_CASH_OUT } from '@/shared/config';

export interface GameValidation {
  isLocked: boolean;
  balance: number | undefined;
  canPlaceBet: boolean;
}

export const useGameValidation = (): GameValidation => {
  const { betAmount, autoCashOutMultiplier, isAutoCashOutEnabled } = useGameControlsStore(
    useShallow((s) => ({
      betAmount: s.betAmount,
      autoCashOutMultiplier: s.autoCashOutMultiplier,
      isAutoCashOutEnabled: s.isAutoCashOutEnabled,
    }))
  );
  const isLocked = useIsBettingLocked();
  const { data: balanceData } = useBalance();
  const balance = balanceData?.balance;

  const amount = parseFloat(betAmount);
  const mult = parseFloat(autoCashOutMultiplier);

  const isBetValid = Number.isFinite(amount) && amount > 0;
  const isAutoCashOutValid =
    !isAutoCashOutEnabled || (Number.isFinite(mult) && mult >= MIN_AUTO_CASH_OUT);

  return {
    isLocked,
    balance,
    canPlaceBet: isBetValid && isAutoCashOutValid,
  };
};

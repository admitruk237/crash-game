import { useShallow } from 'zustand/react/shallow';
import { useIsBettingLocked } from '@/entities/game/model/selectors';
import { useBalance } from '@/entities/game/api/useBalance';
import { useGameControlsStore } from './store';
import {
  MIN_BET_AMOUNT,
  MAX_BET_AMOUNT,
  MIN_AUTO_CASH_OUT,
  MAX_AUTO_CASH_OUT,
} from '@/shared/config/game';

export type GameValidation = ReturnType<typeof useGameValidation>;

export const useGameValidation = () => {
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
  const isBetEmpty = betAmount.trim() === '';
  const isBetTooLow = !isBetEmpty && amount < MIN_BET_AMOUNT;
  const isBetTooHigh = !isBetEmpty && balance !== undefined && amount > balance;
  const isBetExceedsMax = !isBetEmpty && amount > MAX_BET_AMOUNT;

  const isBetValid = !isBetEmpty && !isBetTooLow && !isBetTooHigh && !isBetExceedsMax;

  const mult = parseFloat(autoCashOutMultiplier);
  const isMultEmpty = autoCashOutMultiplier.trim() === '';
  const isMultTooLow = !isMultEmpty && mult < MIN_AUTO_CASH_OUT;
  const isMultTooHigh = !isMultEmpty && mult > MAX_AUTO_CASH_OUT;

  const isAutoCashOutValid =
    !isAutoCashOutEnabled || (!isMultEmpty && !isMultTooLow && !isMultTooHigh);

  return {
    bet: {
      amount,
      isEmpty: isBetEmpty,
      tooLow: isBetTooLow,
      tooHigh: isBetTooHigh,
      exceedsMax: isBetExceedsMax,
      isValid: isBetValid,
    },

    autoCashOut: {
      multiplier: mult,
      isEmpty: isMultEmpty,
      tooLow: isMultTooLow,
      tooHigh: isMultTooHigh,
      isValid: isAutoCashOutValid,
    },

    isLocked,
    balance,
    canPlaceBet: isBetValid && isAutoCashOutValid,
  };
};

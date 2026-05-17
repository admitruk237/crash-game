'use client';

import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '@/entities/game';
import { getSocket, soundManager, useSocketEvent } from '@/shared/lib';
import { COEF_SOUND_INTERVAL_TICKS, SOUND_NAMES } from '@/shared/config';
import { useGameControlsStore } from './store';
import type { BetCashedOutEvent, BetLostEvent, BetPlacedEvent } from '@/shared/types';
import { toast } from 'sonner';

export const useGameActions = () => {
  const { actionInFlight, setActionInFlight, myBet } = useGameStore(
    useShallow((s) => ({
      actionInFlight: s.actionInFlight,
      setActionInFlight: s.setActionInFlight,
      myBet: s.myBet,
    }))
  );
  const { betAmount, isAutoCashOutEnabled, autoCashOutMultiplier, setBetAmount } =
    useGameControlsStore(
      useShallow((s) => ({
        betAmount: s.betAmount,
        isAutoCashOutEnabled: s.isAutoCashOutEnabled,
        autoCashOutMultiplier: s.autoCashOutMultiplier,
        setBetAmount: s.setBetAmount,
      }))
    );

  useSocketEvent<BetPlacedEvent>('bet:placed', ({ balance }) => {
    const currentAmount = parseFloat(betAmount);
    if (currentAmount > balance) {
      setBetAmount((Math.floor(balance * 100) / 100).toFixed(2));
    }
  });

  const placeBet = () => {
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0 || actionInFlight) return;

    setActionInFlight(true);
    getSocket().emit('bet:place', {
      amount,
      autoCashOutAt: isAutoCashOutEnabled ? parseFloat(autoCashOutMultiplier) : null,
    });
  };

  const cashOut = () => {
    if (actionInFlight || !myBet) return;

    setActionInFlight(true);
    getSocket().emit('bet:cashout', {});
  };

  const soundHandlers = {
    onTick: (count: number) => {
      if (count % COEF_SOUND_INTERVAL_TICKS === 0) {
        soundManager.play(SOUND_NAMES.COEF);
      }
    },
    onCashedOut: (e: BetCashedOutEvent) => {
      soundManager.play(SOUND_NAMES.CASHOUT);
      toast.success(`You won $${e.winAmount.toFixed(2)}`, {
        description: `Cashed out at ${e.multiplier}×`,
        className: 'toast-claim',
        duration: 5000,
      });
    },
    onLost: (e: BetLostEvent) => {
      toast.error(`You lost $${myBet?.amount.toFixed(2) || 0}`, {
        description: `Crashed at ${e.crashPoint}×`,
        className: 'toast-error',
        duration: 5000,
      });
    },
  };

  return {
    placeBet,
    cashOut,
    isActionLoading: actionInFlight,
    soundHandlers,
  };
};

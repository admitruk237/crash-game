'use client';

import { useGameStore } from '@/entities/game';
import { getSocket, soundManager } from '@/shared/lib';
import { COEF_SOUND_INTERVAL_TICKS } from '@/shared/config';
import { useGameControlsStore } from './store';
import type { BetCashedOutEvent, BetLostEvent } from '@/shared/types';
import { toast } from 'sonner';

export const useGameActions = () => {
  const actionInFlight = useGameStore((s) => s.actionInFlight);
  const setActionInFlight = useGameStore((s) => s.setActionInFlight);
  const myBet = useGameStore((s) => s.myBet);
  const { betAmount, isAutoCashOutEnabled, autoCashOutMultiplier } = useGameControlsStore();

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
        soundManager.play('coef');
      }
    },
    onCashedOut: (e: BetCashedOutEvent) => {
      soundManager.play('cashout');
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

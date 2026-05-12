'use client';

import { useGameStore } from '@/entities/game';
import { getSocket, soundManager } from '@/shared/lib';
import { COEF_SOUND_INTERVAL_TICKS } from '@/shared/config';
import { useGameControlsStore } from './store';

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
    onCashedOut: () => {
      soundManager.play('cashout');
    },
  };

  return {
    placeBet,
    cashOut,
    isActionLoading: actionInFlight,
    soundHandlers,
  };
};

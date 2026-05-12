'use client';

import { useGameStore } from '@/entities/game';
import { getSocket, soundManager } from '@/shared/lib';
import { useGameControlsStore } from './store';

export const useGameActions = () => {
  const { actionInFlight, setActionInFlight, myBet } = useGameStore();
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
      if (count % 3 === 0) {
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

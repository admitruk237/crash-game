'use client';

import { useGameStore } from '@/entities/game/model/store';
import { getSocket } from '@/shared/lib/socket';
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

  return {
    placeBet,
    cashOut,
    isActionLoading: actionInFlight,
  };
};

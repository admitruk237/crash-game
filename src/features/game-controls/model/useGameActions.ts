'use client';

import { useGameStore } from '@/entities/game/model/store';
import { getSocket } from '@/shared/lib/socket';
import { useGameControlsStore } from './store';

export const useGameActions = () => {
  const { actionInFlight, setActionInFlight, myBet } = useGameStore();
  const { betAmount, isAutoCashOutEnabled, autoCashOutMultiplier } = useGameControlsStore();
  const socket = getSocket();

  const placeBet = () => {
    if (actionInFlight) return;

    setActionInFlight(true);
    socket.emit('bet:place', {
      amount: parseFloat(betAmount),
      autoCashOutAt: isAutoCashOutEnabled ? parseFloat(autoCashOutMultiplier) : null,
    });
  };

  const cashOut = () => {
    if (actionInFlight || !myBet) return;

    setActionInFlight(true);
    socket.emit('bet:cashout', {});
  };

  return {
    placeBet,
    cashOut,
    isActionLoading: actionInFlight,
  };
};

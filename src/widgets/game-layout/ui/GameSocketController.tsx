'use client';

import { useGameSocket } from '@/entities/game';
import { useGameActions } from '@/features/game-controls';

export const GameSocketController = () => {
  const { soundHandlers } = useGameActions();
  useGameSocket(soundHandlers);
  return null;
};

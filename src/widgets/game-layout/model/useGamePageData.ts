'use client';

import { useRecentRounds } from '@/entities/history';
import { useGameStore } from '@/entities/game';

export const useGamePageData = () => {
  const { data: recentData, isLoading: isHistoryLoading } = useRecentRounds(20);
  const players = useGameStore((s) => s.players);
  const rounds = recentData?.rounds ?? [];

  return {
    rounds,
    players,
    isHistoryLoading,
  };
};

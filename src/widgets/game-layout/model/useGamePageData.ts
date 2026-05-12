'use client';

import { useRecentRounds } from '@/entities/history/api/useRecentRounds';
import { useGameStore } from '@/entities/game/model/store';

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

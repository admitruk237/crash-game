'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, useSocketEvent } from '@/shared/lib';
import { API_ROUTES } from '@/shared/config';
import { historyQueryKey } from '../model/queryKeys';
import { type RecentRound } from '@/shared/types';

export const useRecentRounds = (limit: number) => {
  const qc = useQueryClient();

  useSocketEvent(['round:crashed'], () => {
    qc.invalidateQueries({ queryKey: historyQueryKey.roundsRecent });
  });

  return useQuery({
    queryKey: [...historyQueryKey.roundsRecent, limit],
    queryFn: () => apiClient<{ rounds: RecentRound[] }>(API_ROUTES.roundsRecent(limit)),
  });
};

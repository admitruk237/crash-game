import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../model/queryKeys';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { type RecentRound } from '@/shared/types/api';
import { useRecentStore } from '../model/recentStore';

export const useRecentRounds = (limit = 10) => {
  const setInitial = useRecentStore((s) => s.setInitial);
  const query = useQuery({
    queryKey: [...queryKey.roundsRecent, limit],
    queryFn: async () => {
      const { rounds } = await apiClient<{ rounds: RecentRound[] }>(API_ROUTES.roundsRecent(limit));
      return rounds;
    },
  });

  useEffect(() => {
    if (query.data) {
      setInitial(query.data);
    }
  }, [query.data, setInitial]);

  return query;
};

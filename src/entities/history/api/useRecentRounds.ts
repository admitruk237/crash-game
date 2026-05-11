import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { historyQueryKey } from '../model/queryKeys';
import { type RecentRound } from '@/shared/types/api';
import { useSocketEvent } from '@/shared/lib/hooks/useSocketEvent';

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

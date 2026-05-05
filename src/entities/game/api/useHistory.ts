import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { type HistoryBet } from '@/shared/types/api';
import { getSocket } from '@/shared/lib/socket';
import { WS_EVENTS } from '@/shared/config/wsEvents';

export const useHistory = (limit: number) => {
  const qc = useQueryClient();

  useEffect(() => {
    const s = getSocket();
    const invalidate = () => qc.invalidateQueries({ queryKey: queryKey.history });

    s.on(WS_EVENTS.BET_CASHED_OUT, invalidate);
    s.on(WS_EVENTS.BET_LOST, invalidate);

    return () => {
      s.off(WS_EVENTS.BET_CASHED_OUT, invalidate);
      s.off(WS_EVENTS.BET_LOST, invalidate);
    };
  }, [qc]);

  return useQuery({
    queryKey: [...queryKey.history, limit],
    queryFn: () => apiClient<{ bets: HistoryBet[] }>(API_ROUTES.history(limit)),
  });
};

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { type HistoryBet } from '@/shared/types/api';
import { getSocket } from '@/shared/lib/socket';

export const useHistory = (limit: number) => {
  const qc = useQueryClient();

  useEffect(() => {
    const s = getSocket();
    const invalidate = () => qc.invalidateQueries({ queryKey: queryKey.history });

    s.on('bet:cashedOut', invalidate);
    s.on('bet:lost', invalidate);

    return () => {
      s.off('bet:cashedOut', invalidate);
      s.off('bet:lost', invalidate);
    };
  }, [qc]);

  return useQuery({
    queryKey: [...queryKey.history, limit],
    queryFn: () => apiClient<{ bets: HistoryBet[] }>(API_ROUTES.history(limit)),
  });
};

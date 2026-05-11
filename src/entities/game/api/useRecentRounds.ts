import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { getSocket } from '@/shared/lib/socket';
import type { RecentRound } from '@/shared/types/api';
import type { RoundCrashEvent } from '@/shared/types/ws';

interface RecentRoundsResponse {
  rounds: RecentRound[];
}

export const useRecentRounds = (limit = 20) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let s: ReturnType<typeof getSocket> | null = null;
    try {
      s = getSocket();
    } catch {
      return;
    }

    const onCrash = (e: RoundCrashEvent) => {
      queryClient.setQueryData<RecentRoundsResponse>([...queryKey.roundsRecent, limit], (old) => ({
        rounds: [
          {
            roundId: e.roundId,
            crashPoint: e.crashPoint,
            crashedAt: new Date().toISOString(),
            tier: e.tier,
          },
          ...(old?.rounds ?? []),
        ].slice(0, limit),
      }));
    };

    s.on('round:crash', onCrash);

    return () => {
      if (s) {
        s.off('round:crash', onCrash);
      }
    };
  }, [queryClient, limit]);

  return useQuery({
    queryKey: [...queryKey.roundsRecent, limit],
    queryFn: () => apiClient<RecentRoundsResponse>(API_ROUTES.roundsRecent(limit)),
    staleTime: Infinity,
  });
};

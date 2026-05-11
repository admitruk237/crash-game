import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { getSocket } from '@/shared/lib/socket';
import type { Balance } from '@/shared/types/api';

export const useBalance = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let s: ReturnType<typeof getSocket> | null = null;
    try {
      s = getSocket();
    } catch {
      return;
    }

    const setBalance = (payload: { balance: number }) => {
      queryClient.setQueryData<Balance>(queryKey.balance, { balance: payload.balance });
    };

    s.on('bet:placed', setBalance);
    s.on('bet:cashedOut', setBalance);
    s.on('bet:lost', setBalance);

    return () => {
      if (s) {
        s.off('bet:placed', setBalance);
        s.off('bet:cashedOut', setBalance);
        s.off('bet:lost', setBalance);
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: queryKey.balance,
    queryFn: () => apiClient<Balance>(API_ROUTES.balance),
    staleTime: Infinity,
  });
};
